export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { sendWelcomeNewsletter } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from('subscribers')
      .select('id, is_active')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      if (!existing.is_active) {
        await supabase.from('subscribers').update({ is_active: true }).eq('id', existing.id);
        return NextResponse.json({ success: true, message: 'Welcome back! You have been re-subscribed.' });
      }
      return NextResponse.json({ success: true, message: 'You are already subscribed!' });
    }

    const { error } = await supabase
      .from('subscribers')
      .insert({ email, name: name || '', source: source || 'footer', is_active: true });
    if (error) throw error;

    sendWelcomeNewsletter(email).catch(err => console.error('Welcome email error:', err));

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/newsletter/subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
