export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createAdminClient } from '@/utils/supabase/admin';

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = params.id;
    const body = await request.json();
    const supabase = createAdminClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error || !lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error('PATCH /api/leads/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = params.id;
    const supabase = createAdminClient();

    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    console.error('DELETE /api/leads/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
