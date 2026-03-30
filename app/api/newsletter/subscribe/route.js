export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/lib/models/Subscriber';
import { sendWelcomeNewsletter } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, name, source } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return NextResponse.json({ success: true, message: 'Welcome back! You have been re-subscribed.' });
      }
      return NextResponse.json({ success: true, message: 'You are already subscribed!' });
    }

    await Subscriber.create({ email, name: name || '', source: source || 'footer' });
    sendWelcomeNewsletter(email).catch(err => console.error('Welcome email error:', err));

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/newsletter/subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
