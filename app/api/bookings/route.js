export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { sendBookingConfirmation } from '@/lib/email';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, date, time } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Name, email, date, and time are required' }, { status: 400 });
    }

    const bookingId = 'BZ-BOOK-' + Date.now().toString(36).toUpperCase();
    const supabase = createAdminClient();

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        booking_id: bookingId,
        name,
        email,
        phone: body.phone || '',
        company: body.company || '',
        service: body.service || '',
        date,
        time,
        message: body.message || '',
        status: 'pending',
      })
      .select('id, booking_id')
      .single();

    if (error) throw error;

    sendBookingConfirmation({ ...body, bookingId, id: booking.id }).catch(err => console.error('Booking email error:', err));

    return NextResponse.json({
      success: true,
      message: 'Consultation booked! Check your email for confirmation.',
      data: { id: booking.id, bookingId: booking.booking_id },
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/bookings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
