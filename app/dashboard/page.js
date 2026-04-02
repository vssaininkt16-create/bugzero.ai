import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardClient from '@/components/DashboardClient'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, avatar_url')
    .eq('id', user.id)
    .single()

  const userData = {
    id: user.id,
    name: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || 'User',
    email: profile?.email || user.email,
    avatar: profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
    provider: user.app_metadata?.provider || 'email',
    lastSignIn: user.last_sign_in_at,
    createdAt: user.created_at,
  }

  return <DashboardClient user={userData} />
}
