'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
  Shield, LayoutDashboard, User, Settings, Bell, Lock, LogOut, ChevronRight,
  Menu, X, Activity, Users, FileText, Smartphone, AlertTriangle, Crown,
  Globe, Key, Eye, ChevronDown, Loader2, CheckCircle, Wifi, WifiOff
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
  { label: 'Profile', href: '/portal/profile', icon: User },
  { label: 'Account Settings', href: '/portal/settings', icon: Settings },
  { label: 'Security', href: '/portal/security', icon: Lock },
  { label: 'Notifications', href: '/portal/notifications', icon: Bell },
  { label: 'Sessions', href: '/portal/sessions', icon: Smartphone },
  { label: 'Audit Log', href: '/portal/audit', icon: Activity },
]

const ADMIN_ITEMS = [
  { label: 'Admin Dashboard', href: '/portal/admin', icon: Crown },
  { label: 'User Management', href: '/portal/admin/users', icon: Users },
]

export default function PortalLayout({ children, user }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [online, setOnline] = useState(true)
  const profileRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    setOnline(navigator.onLine)
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileMenuOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    } catch {
      setLoggingOut(false)
      setShowLogoutModal(false)
    }
  }

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin'
  const secLevel = user?.securityLevel || 'Standard'
  const secColor = secLevel === 'High' ? 'text-cyber-green' : secLevel === 'Critical' ? 'text-red-400' : 'text-yellow-400'

  const NavLink = ({ item }) => {
    const Icon = item.icon
    const active = pathname === item.href || pathname.startsWith(item.href + '/')
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
          active
            ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20'
            : 'text-cyber-muted hover:bg-white/5 hover:text-white border border-transparent'
        }`}
      >
        <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyber-blue' : 'group-hover:text-cyber-blue transition-colors'}`} />
        <span className="truncate">{item.label}</span>
        {active && <ChevronRight className="w-3 h-3 ml-auto shrink-0 text-cyber-blue" />}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-bg flex relative -mt-16 lg:-mt-20 pt-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 w-64 bg-[#060d1f] border-r border-cyber-border flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-cyber-border shrink-0">
          <div className="w-8 h-8 rounded-lg bg-cyber-blue/15 border border-cyber-blue/30 flex items-center justify-center">
            <Shield className="w-4 h-4 text-cyber-blue" />
          </div>
          <div>
            <span className="font-bold text-white text-sm font-heading">BugZero</span>
            <span className="text-[10px] text-cyber-muted block -mt-0.5">Security Portal</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-cyber-muted hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map(item => <NavLink key={item.href} item={item} />)}

          {isAdmin && (
            <>
              <div className="my-3 px-2">
                <div className="h-px bg-cyber-border" />
                <span className="text-[10px] text-cyber-muted uppercase tracking-widest px-1 mt-3 block">Admin Panel</span>
              </div>
              {ADMIN_ITEMS.map(item => <NavLink key={item.href} item={item} />)}
            </>
          )}
        </nav>

        {/* User mini card */}
        <div className="p-3 border-t border-cyber-border shrink-0">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/3">
            <div className="relative shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-cyber-blue/30" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-cyber-blue" />
                </div>
              )}
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#060d1f] ${online ? 'bg-cyber-green' : 'bg-red-400'}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate">{user?.name || 'User'}</p>
              <p className="text-cyber-muted text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Topnav */}
        <header className="h-16 bg-[#060d1f]/95 backdrop-blur-xl border-b border-cyber-border flex items-center gap-4 px-4 lg:px-6 shrink-0 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-cyber-muted hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb / title */}
          <div className="flex-1 min-w-0">
            <div className="hidden sm:flex items-center gap-1 text-xs text-cyber-muted">
              <Globe className="w-3 h-3" />
              <span>/</span>
              <span>portal</span>
              <span>/</span>
              <span className="text-white capitalize">{pathname.split('/').pop() || 'dashboard'}</span>
            </div>
          </div>

          {/* Status pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20">
            {online ? <Wifi className="w-3 h-3 text-cyber-green" /> : <WifiOff className="w-3 h-3 text-red-400" />}
            <span className="text-[11px] font-medium text-cyber-green">{online ? 'Secure' : 'Offline'}</span>
          </div>

          {/* Security level */}
          <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-cyber-border`}>
            <Eye className="w-3 h-3 text-cyber-muted" />
            <span className={`text-[11px] font-medium ${secColor}`}>{secLevel}</span>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-xl bg-white/5 border border-cyber-border hover:border-cyber-blue/30 hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-cyber-muted hover:text-white"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">3</span>
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-[#0a1628] border border-cyber-border rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-cyber-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">3 new</span>
                </div>
                <div className="divide-y divide-cyber-border max-h-64 overflow-y-auto">
                  {[
                    { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', title: 'Login from new device', sub: 'Chrome · Windows · 5m ago' },
                    { icon: Key, color: 'text-cyber-blue', bg: 'bg-cyber-blue/10', title: 'Password changed', sub: '2 hours ago' },
                    { icon: CheckCircle, color: 'text-cyber-green', bg: 'bg-cyber-green/10', title: 'Email verified', sub: 'Yesterday' },
                  ].map((n, i) => {
                    const NIcon = n.icon
                    return (
                      <div key={i} className="px-4 py-3 hover:bg-white/3 transition-colors cursor-pointer flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-lg ${n.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <NIcon className={`w-3.5 h-3.5 ${n.color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{n.title}</p>
                          <p className="text-[11px] text-cyber-muted mt-0.5">{n.sub}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="px-4 py-2.5 border-t border-cyber-border">
                  <Link href="/portal/notifications" className="text-xs text-cyber-blue hover:underline" onClick={() => setNotifOpen(false)}>
                    View all notifications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-cyber-border hover:border-cyber-blue/30 hover:bg-white/10 transition-all duration-200"
            >
              <div className="relative">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full border border-cyber-blue/30" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-cyber-blue/15 border border-cyber-blue/20 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-cyber-blue" />
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyber-green border border-[#060d1f]" />
              </div>
              <span className="text-sm text-white font-medium hidden sm:block max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'User'}</span>
              <ChevronDown className={`w-3 h-3 text-cyber-muted transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-[#0a1628] border border-cyber-border rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-cyber-border">
                  <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                  <p className="text-[11px] text-cyber-muted truncate">{user?.email}</p>
                  {isAdmin && <span className="mt-1 inline-block text-[10px] bg-cyber-purple/20 text-purple-400 border border-cyber-purple/30 px-2 py-0.5 rounded-full uppercase tracking-wider">{user?.role}</span>}
                </div>
                <div className="py-1">
                  {[
                    { href: '/portal/profile', label: 'Profile', icon: User },
                    { href: '/portal/settings', label: 'Account Settings', icon: Settings },
                    { href: '/portal/security', label: 'Security', icon: Lock },
                  ].map(item => {
                    const IIcon = item.icon
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-cyber-muted hover:text-white hover:bg-white/5 transition-colors">
                        <IIcon className="w-4 h-4" />{item.label}
                      </Link>
                    )
                  })}
                </div>
                <div className="border-t border-cyber-border py-1">
                  <button onClick={() => { setProfileMenuOpen(false); setShowLogoutModal(true) }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full">
                    <LogOut className="w-4 h-4" />Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
          <div className="bg-[#0a1628] border border-cyber-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mx-auto mb-4">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white text-center font-heading mb-1">Sign out?</h3>
            <p className="text-sm text-cyber-muted text-center mb-6">Your session will be terminated and you'll need to sign in again.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} disabled={loggingOut}
                className="flex-1 py-2.5 rounded-xl border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-blue/30 transition-all text-sm">
                Cancel
              </button>
              <button onClick={handleLogout} disabled={loggingOut}
                className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {loggingOut ? <><Loader2 className="w-4 h-4 animate-spin" />Signing out...</> : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
