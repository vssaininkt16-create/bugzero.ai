'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Shield, Activity, AlertTriangle, CheckCircle, Clock, Lock, Smartphone,
  Key, Bell, User, TrendingUp, TrendingDown, ChevronRight, Eye, Globe,
  Zap, Target, FileText, Settings, ArrowUpRight, BarChart3, Circle
} from 'lucide-react'

const STATS = [
  { label: 'Security Score', value: '87', unit: '/100', icon: Shield, color: 'cyber-blue', trend: '+5', up: true },
  { label: 'Active Sessions', value: '2', unit: '', icon: Smartphone, color: 'cyber-green', trend: 'Secure', up: true },
  { label: 'Security Alerts', value: '1', unit: '', icon: AlertTriangle, color: 'yellow-400', trend: 'Low Risk', up: null },
  { label: 'Last Login', value: '2m', unit: ' ago', icon: Clock, color: 'cyber-purple', trend: 'This device', up: null },
]

const RECENT_ACTIVITY = [
  { type: 'login', msg: 'Login from Chrome/Windows', time: '2 min ago', icon: CheckCircle, color: 'text-cyber-green' },
  { type: 'settings', msg: 'Password updated', time: '2 hours ago', icon: Key, color: 'text-cyber-blue' },
  { type: 'alert', msg: 'New device login detected', time: '5 hours ago', icon: AlertTriangle, color: 'text-yellow-400' },
  { type: 'login', msg: 'Login from Mumbai, India', time: 'Yesterday', icon: Globe, color: 'text-cyber-muted' },
  { type: 'settings', msg: '2FA verification completed', time: '3 days ago', icon: Shield, color: 'text-cyber-purple' },
]

const SECURITY_CHECKS = [
  { label: 'Strong Password', status: true },
  { label: 'Email Verified', status: true },
  { label: '2FA Enabled', status: false },
  { label: 'Recovery Email Set', status: true },
  { label: 'Recent Device Review', status: false },
]

const QUICK_ACTIONS = [
  { label: 'Enable 2FA', href: '/portal/security', icon: Shield, color: 'cyber-blue', desc: 'Boost your protection' },
  { label: 'View Sessions', href: '/portal/sessions', icon: Smartphone, color: 'cyber-green', desc: 'Manage active devices' },
  { label: 'Audit Log', href: '/portal/audit', icon: FileText, color: 'cyber-purple', desc: 'Review account activity' },
  { label: 'Settings', href: '/portal/settings', icon: Settings, color: 'yellow-400', desc: 'Configure your account' },
]

export default function UserDashboardClient({ user }) {
  const [activityPage] = useState(0)
  const score = 87
  const circumference = 2 * Math.PI * 54
  const dashOffset = circumference - (score / 100) * circumference

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Welcome back, <span className="gradient-text-blue">{user?.name?.split(' ')[0] || 'User'}</span> 👋
          </h1>
          <p className="text-cyber-muted text-sm mt-1">Here's your security overview — {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`trust-badge ${user?.role === 'admin' ? 'badge-purple' : 'badge-blue'} uppercase text-[10px] tracking-wider`}>
            {user?.role || 'user'}
          </span>
          {user?.twoFactorEnabled ? (
            <span className="trust-badge badge-green text-[10px]"><CheckCircle className="w-3 h-3" /> 2FA Active</span>
          ) : (
            <span className="trust-badge badge-saffron text-[10px]"><AlertTriangle className="w-3 h-3" /> 2FA Off</span>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="cyber-card rounded-2xl p-5 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-16 h-16 bg-${s.color}/5 rounded-full -mr-4 -mt-4`} />
              <div className={`w-9 h-9 rounded-xl bg-${s.color}/10 border border-${s.color}/20 flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 text-${s.color}`} />
              </div>
              <p className="text-xs text-cyber-muted uppercase tracking-wider mb-1">{s.label}</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold font-heading text-white">{s.value}</span>
                <span className="text-sm text-cyber-muted mb-0.5">{s.unit}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {s.up === true && <TrendingUp className="w-3 h-3 text-cyber-green" />}
                {s.up === false && <TrendingDown className="w-3 h-3 text-red-400" />}
                <span className="text-[11px] text-cyber-muted">{s.trend}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security score */}
        <div className="cyber-card rounded-2xl p-6 flex flex-col items-center">
          <h2 className="text-sm font-semibold text-cyber-muted uppercase tracking-wider mb-4">Security Score</h2>
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke="url(#scoreGrad)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-heading text-white">{score}</span>
              <span className="text-xs text-cyber-muted">/ 100</span>
            </div>
          </div>
          <div className="w-full mt-4 space-y-2">
            {SECURITY_CHECKS.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-cyber-muted">{c.label}</span>
                {c.status ? (
                  <CheckCircle className="w-4 h-4 text-cyber-green" />
                ) : (
                  <Circle className="w-4 h-4 text-red-400/60" />
                )}
              </div>
            ))}
          </div>
          {!user?.twoFactorEnabled && (
            <Link href="/portal/security" className="mt-4 w-full text-center text-xs py-2.5 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/20 transition-all">
              Enable 2FA to reach 95+ →
            </Link>
          )}
        </div>

        {/* Recent Activity */}
        <div className="cyber-card rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyber-blue" />Recent Activity
            </h2>
            <Link href="/portal/audit" className="text-xs text-cyber-blue hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors ${i < 2 ? 'bg-white/2' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    i === 0 ? 'bg-cyber-green/15 border border-cyber-green/20' :
                    i === 2 ? 'bg-yellow-400/10 border border-yellow-400/20' : 'bg-white/5 border border-cyber-border'
                  }`}>
                    <Icon className={`w-3.5 h-3.5 ${a.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{a.msg}</p>
                    <p className="text-[11px] text-cyber-muted mt-0.5">{a.time}</p>
                  </div>
                  {i < 2 && <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue shrink-0 mt-2" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-cyber-muted uppercase tracking-wider mb-4 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" /> Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((a, i) => {
            const Icon = a.icon
            return (
              <Link key={i} href={a.href}
                className={`group cyber-card rounded-2xl p-5 hover:border-${a.color}/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300`}>
                <div className={`w-10 h-10 rounded-xl bg-${a.color}/10 border border-${a.color}/20 flex items-center justify-center mb-3 group-hover:bg-${a.color}/20 transition-all`}>
                  <Icon className={`w-5 h-5 text-${a.color}`} />
                </div>
                <p className="text-sm font-semibold text-white mb-0.5">{a.label}</p>
                <p className="text-[11px] text-cyber-muted">{a.desc}</p>
                <ChevronRight className="w-4 h-4 text-cyber-muted group-hover:text-white group-hover:translate-x-1 transition-all mt-2" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Alert banner */}
      {!user?.twoFactorEnabled && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-yellow-400/5 border border-yellow-400/20">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-yellow-400">Two-Factor Authentication is disabled</p>
            <p className="text-xs text-cyber-muted mt-0.5">Your account is 4× more vulnerable without 2FA. Enable it now for better protection.</p>
          </div>
          <Link href="/portal/security" className="shrink-0 px-4 py-2 rounded-xl bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 text-xs font-semibold hover:bg-yellow-400/25 transition-all">
            Enable Now
          </Link>
        </div>
      )}
    </div>
  )
}
