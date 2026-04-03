import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import PortalLayout from '@/components/portal/PortalLayout'

export const metadata = {
  title: {
    default: 'Security Portal',
    template: '%s | BugZero Portal',
  },
}

export default async function PortalRootLayout({ children }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Fetch full profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const userData = {
    id: user.id,
    name: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || 'User',
    email: profile?.email || user.email,
    avatar: profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
    provider: user.app_metadata?.provider || 'email',
    role: profile?.role || 'user',
    securityLevel: profile?.security_level || 'Standard',
    twoFactorEnabled: profile?.two_factor_enabled || false,
    lastSignIn: user.last_sign_in_at,
    createdAt: user.created_at,
    phone: profile?.phone || null,
    location: profile?.location || null,
    bio: profile?.bio || null,
    website: profile?.website || null,
    company: profile?.company || null,
  }

  return <PortalLayout user={userData}>{children}</PortalLayout>
}
