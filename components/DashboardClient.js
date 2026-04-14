'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Shield, LogOut, Mail, User, Clock, Loader2, CalendarDays } from 'lucide-react'

export default function DashboardClient({ user }) {
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    } catch {
      setLoggingOut(false)
    }
  }

  const fmt = (iso) =>
    iso
      ? new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
      : 'N/A'

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 " />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 border border-red-200">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500">Security Portal</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-red-500/10 border border-red-500/20 text-red-400
                       hover:bg-red-500/20 hover:border-red-500/30
                       transition-all duration-300 text-sm font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed"
          >
            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            {loggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>

        {/* User Profile Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-5">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border-2 border-red-200 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
                <User className="w-8 h-8 text-red-600" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold font-heading text-gray-900 truncate">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-gray-500 text-sm truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="badge-blue trust-badge text-xs">
                  {user.provider === 'google' ? 'Google Account' : user.provider}
                </span>
                <span className="badge-green trust-badge text-xs">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Last Sign-In</span>
            </div>
            <p className="text-gray-900 font-medium text-sm">{fmt(user.lastSignIn)}</p>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-4 h-4 text-red-700" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Member Since</span>
            </div>
            <p className="text-gray-900 font-medium text-sm">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })
                : 'N/A'}
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Auth Provider</span>
            </div>
            <p className="text-gray-900 font-medium text-sm capitalize">{user.provider}</p>
          </div>
        </div>

        {/* Security Status */}
        <div className="mt-4 bg-white border border-gray-200 shadow-sm rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-50 animate-pulse" />
              <span className="text-sm text-gray-500">Session Active</span>
            </div>
            <span className="text-xs text-gray-500/60">Encrypted &amp; Secured</span>
          </div>
        </div>
      </div>
    </div>
  )
}
