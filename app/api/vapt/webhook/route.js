export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const expected = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');
      if (expected !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    if (eventType === 'payment.captured' || eventType === 'payment_link.paid') {
      const payment = event.payload?.payment?.entity || event.payload?.payment_link?.entity;
      if (!payment) {
        return NextResponse.json({ received: true });
      }

      const supabase = createAdminClient();

      const { data: existing } = await supabase
        .from('vapt_orders')
        .select('id')
        .eq('razorpay_payment_id', payment.id)
        .maybeSingle();

      if (!existing) {
        await supabase.from('vapt_orders').insert({
          name: payment.notes?.customer_name || payment.email || 'Customer',
          email: payment.email || payment.notes?.customer_email || '',
          razorpay_order_id: payment.order_id || null,
          razorpay_payment_id: payment.id,
          razorpay_signature: 'webhook',
          status: 'paid',
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
