import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const body = await request.json();

    const lead = await Lead.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error('PATCH /api/leads/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const id = params.id;

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    console.error('DELETE /api/leads/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
