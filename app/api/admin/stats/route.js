import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import Booking from '@/lib/models/Booking';
import Subscriber from '@/lib/models/Subscriber';
import ScanResult from '@/lib/models/ScanResult';
import EmailQueue from '@/lib/models/EmailQueue';

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const [totalLeads, newToday, hotLeads, leads, bookings, subscribers, scans, emails] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: todayStart } }),
      Lead.countDocuments({ priority: 'hot' }),
      Lead.find().sort({ createdAt: -1 }).limit(50).lean(),
      Booking.countDocuments(),
      Subscriber.countDocuments({ isActive: true }),
      ScanResult.countDocuments(),
      EmailQueue.countDocuments(),
    ]);

    // Leads by source
    const leadsBySource = await Lead.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
    ]);

    // Leads by service
    const leadsByService = await Lead.aggregate([
      { $match: { service: { $ne: '' } } },
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Leads by status
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Weekly trend
    const weeklyLeads = await Lead.aggregate([
      { $match: { createdAt: { $gte: weekAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        overview: { totalLeads, newToday, hotLeads, totalBookings: bookings, totalSubscribers: subscribers, totalScans: scans, totalEmails: emails },
        leads,
        analytics: { leadsBySource, leadsByService, leadsByStatus, weeklyLeads },
      },
    });
  } catch (error) {
    console.error('GET /api/admin/stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
