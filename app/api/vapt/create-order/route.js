export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

const RAZORPAY_FALLBACK_URL = 'https://rzp.io/rzp/4suasCpv';
const AMOUNT_PAISE = 99900; // ₹999 in paise

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({
        error: 'Payment gateway not configured',
        fallback_url: RAZORPAY_FALLBACK_URL,
      }, { status: 503 });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: AMOUNT_PAISE,
        currency: 'INR',
        receipt: `vapt_${Date.now()}`,
        notes: {
          customer_name: name || '',
          customer_email: email || '',
          product: 'VAPT Basic ₹999',
        },
      }),
    });

    if (!orderRes.ok) {
      const errData = await orderRes.json().catch(() => ({}));
      console.error('Razorpay order creation failed:', errData);
      return NextResponse.json({
        error: errData?.error?.description || 'Failed to create order',
        fallback_url: RAZORPAY_FALLBACK_URL,
      }, { status: 502 });
    }

    const order = await orderRes.json();

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({
      error: error.message,
      fallback_url: RAZORPAY_FALLBACK_URL,
    }, { status: 500 });
  }
}
