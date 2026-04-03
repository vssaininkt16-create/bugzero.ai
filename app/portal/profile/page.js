import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ProfileClient from '@/components/portal/ProfileClient'

export const metadata = { title: 'Profile' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const userData = {
    id: user.id,
    name: profile?.full_name || user.user_metadata?.full_name || '',
    email: profile?.email || user.email,
    avatar: profile?.avatar_url || user.user_metadata?.avatar_url || null,
    role: profile?.role || 'user',
    provider: user.app_metadata?.provider || 'email',
    phone: profile?.phone || '',
    location: profile?.location || '',
    website: profile?.website || '',
    company: profile?.company || '',
    bio: profile?.bio || '',
    createdAt: user.created_at,
    twoFactorEnabled: profile?.two_factor_enabled || false,
  }

  return <ProfileClient user={userData} />
}
