export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createAdminClient } from '@/utils/supabase/admin';
import { sendLeadNotification } from '@/lib/email';

function scoreLead(data) {
  const budget = (data.budget || '').toLowerCase();
  const company = (data.company || '').toLowerCase();
  const govKeywords = ['government', 'bank', 'hospital', 'ministry', 'department', 'defence', 'army', 'navy', 'police', 'railway'];

  if (govKeywords.some(k => company.includes(k))) return 'hot';
  if (budget.includes('lakh') || budget.includes('crore') || budget.includes('100000') || parseInt(budget) >= 100000) return 'hot';
  if (budget.includes('25') || budget.includes('50') || budget.includes('75') || (parseInt(budget) >= 25000 && parseInt(budget) < 100000)) return 'warm';
  if (parseInt(budget) > 0 && parseInt(budget) < 25000) return 'cold';
  return 'warm';
}

export async function GET(request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    const supabase = createAdminClient();
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);
    if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`);

    const { data: leads, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: leads, count: leads.length });
  } catch (error) {
    console.error('GET /api/leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const priority = scoreLead(body);
    const supabase = createAdminClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: body.phone || '',
        company: body.company || '',
        website: body.website || '',
        message: body.message || '',
        service: body.service || '',
        budget: body.budget || '',
        source: body.source || 'contact_form',
        status: 'new',
        priority,
      })
      .select('id, priority')
      .single();

    if (error) throw error;

    sendLeadNotification({ ...body, id: lead.id, priority }).catch(err => console.error('Email error:', err));

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will get back to you within 2 hours.',
      data: { id: lead.id, priority },
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
