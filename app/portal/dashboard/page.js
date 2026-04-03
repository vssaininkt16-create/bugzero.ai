import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import UserDashboardClient from '@/components/portal/UserDashboardClient'

export const metadata = {
  title: 'Dashboard',
}

export default async function PortalDashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const userData = {
    id: user.id,
    name: profile?.full_name || user.user_metadata?.full_name || 'User',
    email: profile?.email || user.email,
    avatar: profile?.avatar_url || user.user_metadata?.avatar_url || null,
    role: profile?.role || 'user',
    twoFactorEnabled: profile?.two_factor_enabled || false,
    securityLevel: profile?.security_level || 'Standard',
  }

  return <UserDashboardClient user={userData} />
}
