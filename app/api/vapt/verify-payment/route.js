export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      razorpay_payment_link_id,
      razorpay_payment_link_reference_id,
      razorpay_payment_link_status,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json({ error: 'Payment verification not configured' }, { status: 503 });
    }

    if (!razorpay_payment_id) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 });
    }

    let isValid = false;

    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const generated = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
      isValid = generated === razorpay_signature;
    } else if (
      razorpay_payment_link_id &&
      razorpay_payment_link_reference_id &&
      razorpay_payment_link_status &&
      razorpay_signature
    ) {
      const generated = crypto
        .createHmac('sha256', keySecret)
        .update(
          `${razorpay_payment_link_id}|${razorpay_payment_link_reference_id}|${razorpay_payment_link_status}|${razorpay_payment_id}`
        )
        .digest('hex');
      isValid = generated === razorpay_signature;
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from('vapt_orders')
      .select('id, access_token')
      .eq('razorpay_payment_id', razorpay_payment_id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        success: true,
        access_token: existing.access_token,
        order_id: existing.id,
        already_processed: true,
      });
    }

    const { data: order, error } = await supabase
      .from('vapt_orders')
      .insert({
        name: name || 'Customer',
        email: email || '',
        razorpay_order_id: razorpay_order_id || null,
        razorpay_payment_id,
        razorpay_signature,
        status: 'paid',
      })
      .select('id, access_token')
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      access_token: order.access_token,
      order_id: order.id,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
