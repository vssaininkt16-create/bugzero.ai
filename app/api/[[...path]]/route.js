export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

function getPath(request) {
  const url = new URL(request.url);
  const fullPath = url.pathname;
  // Remove '/api' prefix
  return fullPath.replace(/^\/api/, '') || '/';
}

export async function GET(request) {
  const path = getPath(request);

  try {
    if (path === '/health') {
      return NextResponse.json({ status: 'ok', service: 'BugZero API', timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const path = getPath(request);

  try {
    if (path === '/contact') {
      const body = await request.json();
      const { name, email, phone, company, message, service, source } = body;

      if (!name || !email) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
      }

      const supabase = createAdminClient();
      const { data: lead, error } = await supabase
        .from('leads')
        .insert({ name, email, phone: phone || '', company: company || '', message: message || '', service: service || '', source: source || 'contact_form', status: 'new', priority: 'warm' })
        .select('id')
        .single();
      if (error) throw error;

      return NextResponse.json({ 
        success: true, 
        message: 'Thank you! We will get back to you within 2 hours.',
        data: { id: lead.id }
      }, { status: 201 });
    }

    if (path === '/newsletter') {
      const body = await request.json();
      const { email } = body;

      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }

      const supabase = createAdminClient();
      const { data: sub, error } = await supabase
        .from('subscribers')
        .insert({ email, name: 'Newsletter Subscriber', source: 'newsletter', is_active: true })
        .select('id')
        .single();
      if (error && error.code !== '23505') throw error;

      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to our newsletter!',
        data: { id: sub?.id }
      }, { status: 201 });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
