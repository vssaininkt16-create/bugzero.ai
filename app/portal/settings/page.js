import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SettingsClient from '@/components/portal/SettingsClient'

export const metadata = { title: 'Account Settings' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const userData = {
    id: user.id,
    twoFactorEnabled: profile?.two_factor_enabled || false,
    preferences: profile?.preferences || {},
  }

  return <SettingsClient user={userData} />
}
