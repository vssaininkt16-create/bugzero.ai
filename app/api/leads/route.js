export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
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
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: leads, count: leads.length });
  } catch (error) {
    console.error('GET /api/leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const priority = scoreLead(body);
    const lead = await Lead.create({ ...body, priority });

    // Send email notifications (async, don't block response)
    sendLeadNotification(lead).catch(err => console.error('Email error:', err));

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will get back to you within 2 hours.',
      data: { id: lead._id, priority },
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
