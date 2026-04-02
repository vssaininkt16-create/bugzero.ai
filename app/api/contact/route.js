import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

function sanitize(value) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, 2000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const full_name = sanitize(body.name || body.full_name);
    const email     = sanitize(body.email);
    const phone     = sanitize(body.phone);
    const company   = sanitize(body.company);
    const service   = sanitize(body.service);
    const message   = sanitize(body.message);
    const source    = sanitize(body.source);

    if (!full_name) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const supabase = await createClient();

    let userId = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    } catch {
      // anonymous submission — no user session
    }

    const { error } = await supabase
      .from('contact_requests')
      .insert([{
        full_name,
        email,
        phone:   phone   || null,
        company: company || null,
        service: service || null,
        message,
        source:  source  || 'contact_page',
        status:  'pending',
        user_id: userId,
      }]);

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error, null, 2));
      const isDev = process.env.NODE_ENV === 'development';
      return NextResponse.json(
        { error: isDev ? `DB error: ${error.message} (code: ${error.code})` : 'Failed to submit your request. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Request submitted successfully.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
