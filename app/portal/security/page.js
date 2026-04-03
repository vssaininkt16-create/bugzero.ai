import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SecurityClient from '@/components/portal/SecurityClient'

export const metadata = { title: 'Security' }

export default async function SecurityPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const userData = {
    id: user.id,
    email: user.email,
    provider: user.app_metadata?.provider || 'email',
    twoFactorEnabled: profile?.two_factor_enabled || false,
    role: profile?.role || 'user',
  }

  return <SecurityClient user={userData} />
}
