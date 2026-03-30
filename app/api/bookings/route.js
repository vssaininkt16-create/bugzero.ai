export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendBookingConfirmation } from '@/lib/email';

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, date, time } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Name, email, date, and time are required' }, { status: 400 });
    }

    const booking = await Booking.create(body);

    sendBookingConfirmation(booking).catch(err => console.error('Booking email error:', err));

    return NextResponse.json({
      success: true,
      message: 'Consultation booked! Check your email for confirmation.',
      data: { id: booking._id, bookingId: booking.bookingId },
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/bookings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
