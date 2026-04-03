import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import AdminDashboardClient from '@/components/portal/AdminDashboardClient'

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile?.role || !['admin', 'super_admin'].includes(profile.role)) {
    redirect('/portal/dashboard')
  }

  return <AdminDashboardClient />
}
