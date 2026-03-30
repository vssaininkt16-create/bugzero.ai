export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/lib/models/Subscriber';

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const sub = await Subscriber.findOne({ email });
    if (!sub) return NextResponse.json({ error: 'Email not found' }, { status: 404 });

    sub.isActive = false;
    await sub.save();
    return NextResponse.json({ success: true, message: 'Successfully unsubscribed.' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
