export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const supabase = createAdminClient();
    const { data: sub } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (!sub) return NextResponse.json({ error: 'Email not found' }, { status: 404 });

    await supabase.from('subscribers').update({ is_active: false }).eq('id', sub.id);
    return NextResponse.json({ success: true, message: 'Successfully unsubscribed.' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
