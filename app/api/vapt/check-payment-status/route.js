export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const payment_id = searchParams.get('payment_id');
    const order_id = searchParams.get('order_id');

    if (!payment_id && !order_id) {
      return NextResponse.json({ error: 'payment_id or order_id is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    let query = supabase.from('vapt_orders').select('id, access_token, status, created_at');

    if (payment_id) {
      query = query.eq('razorpay_payment_id', payment_id);
    } else {
      query = query.eq('razorpay_order_id', order_id);
    }

    const { data: order, error } = await query.maybeSingle();

    if (error) throw error;

    if (!order) {
      return NextResponse.json({ found: false, status: 'not_found' });
    }

    return NextResponse.json({
      found: true,
      status: order.status,
      access_token: order.status === 'paid' ? order.access_token : undefined,
    });
  } catch (error) {
    console.error('Check payment status error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
