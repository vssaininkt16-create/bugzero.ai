export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      { count: totalLeads },
      { count: newToday },
      { count: hotLeads },
      { data: leads },
      { count: totalBookings },
      { count: totalSubscribers },
      { count: totalScans },
    ] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('priority', 'hot'),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('bookings').select('*', { count: 'exact', head: true }),
      supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('vapt_scans').select('*', { count: 'exact', head: true }),
    ]);

    // Analytics: group by source
    const { data: allLeads } = await supabase
      .from('leads')
      .select('source, service, status, created_at')
      .gte('created_at', weekAgo.toISOString());

    const { data: allLeadsForAnalytics } = await supabase
      .from('leads')
      .select('source, service, status');

    const groupBy = (arr, key) =>
      (arr || []).reduce((acc, row) => {
        const val = row[key] || 'unknown';
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

    const toArray = (obj) =>
      Object.entries(obj)
        .map(([_id, count]) => ({ _id, count }))
        .sort((a, b) => b.count - a.count);

    const leadsBySource = toArray(groupBy(allLeadsForAnalytics, 'source'));
    const leadsByService = toArray(groupBy((allLeadsForAnalytics || []).filter(l => l.service), 'service')).slice(0, 10);
    const leadsByStatus = toArray(groupBy(allLeadsForAnalytics, 'status'));

    const weeklyMap = (allLeads || []).reduce((acc, row) => {
      const date = row.created_at?.slice(0, 10);
      if (date) acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const weeklyLeads = Object.entries(weeklyMap)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => a._id.localeCompare(b._id));

    return NextResponse.json({
      success: true,
      data: {
        overview: { totalLeads, newToday, hotLeads, totalBookings, totalSubscribers, totalScans, totalEmails: 0 },
        leads: leads || [],
        analytics: { leadsBySource, leadsByService, leadsByStatus, weeklyLeads },
      },
    });
  } catch (error) {
    console.error('GET /api/admin/stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
