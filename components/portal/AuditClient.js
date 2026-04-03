'use client'

import { useState } from 'react'
import {
  Activity, Shield, Key, LogIn, Settings, AlertTriangle, CheckCircle, Search,
  Download, Filter, ChevronDown, Globe, Smartphone, Monitor, Clock
} from 'lucide-react'

const AUDIT_EVENTS = [
  { id: 1, action: 'login', desc: 'Signed in successfully', method: 'Email/Password', device: 'Chrome · Windows', ip: '49.204.x.x', location: 'Mumbai', time: '2026-04-03T12:32:00Z', status: 'success' },
  { id: 2, action: 'password_change', desc: 'Password changed', method: 'Account Settings', device: 'Chrome · Windows', ip: '49.204.x.x', location: 'Mumbai', time: '2026-04-03T10:15:00Z', status: 'success' },
  { id: 3, action: 'login_failed', desc: 'Failed login attempt', method: 'Email/Password', device: 'Unknown', ip: '203.x.x.x', location: 'Unknown', time: '2026-04-03T09:01:00Z', status: 'failed' },
  { id: 4, action: 'profile_update', desc: 'Profile information updated', method: 'Profile Settings', device: 'Safari · iPhone', ip: '183.82.x.x', location: 'Delhi', time: '2026-04-02T20:45:00Z', status: 'success' },
  { id: 5, action: '2fa_enabled', desc: 'Two-factor authentication enabled', method: 'Security Settings', device: 'Chrome · Windows', ip: '49.204.x.x', location: 'Mumbai', time: '2026-04-02T18:30:00Z', status: 'success' },
  { id: 6, action: 'session_revoke', desc: 'Session revoked from another device', method: 'Sessions Page', device: 'Chrome · Windows', ip: '49.204.x.x', location: 'Mumbai', time: '2026-04-02T15:12:00Z', status: 'success' },
  { id: 7, action: 'login', desc: 'Signed in via Google OAuth', method: 'Google OAuth', device: 'Safari · MacBook', ip: '117.200.x.x', location: 'Bangalore', time: '2026-04-01T09:00:00Z', status: 'success' },
  { id: 8, action: 'avatar_upload', desc: 'Profile picture updated', method: 'Profile Settings', device: 'Chrome · Windows', ip: '49.204.x.x', location: 'Mumbai', time: '2026-03-31T14:20:00Z', status: 'success' },
]

const ACTION_META = {
  login: { icon: LogIn, label: 'Login', color: 'text-cyber-green', bg: 'bg-cyber-green/10 border-cyber-green/20' },
  password_change: { icon: Key, label: 'Password Change', color: 'text-cyber-blue', bg: 'bg-cyber-blue/10 border-cyber-blue/20' },
  login_failed: { icon: AlertTriangle, label: 'Failed Login', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  profile_update: { icon: Settings, label: 'Profile Update', color: 'text-cyber-purple', bg: 'bg-cyber-purple/10 border-cyber-purple/20' },
  '2fa_enabled': { icon: Shield, label: '2FA Enabled', color: 'text-cyber-green', bg: 'bg-cyber-green/10 border-cyber-green/20' },
  session_revoke: { icon: Activity, label: 'Session Revoked', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  avatar_upload: { icon: Settings, label: 'Avatar Upload', color: 'text-cyber-blue', bg: 'bg-cyber-blue/10 border-cyber-blue/20' },
}

function fmtTime(iso) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now - d
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString('en-IN', { dateStyle: 'medium' }) + ' · ' + d.toLocaleTimeString('en-IN', { timeStyle: 'short' })
}

export default function AuditClient() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = AUDIT_EVENTS.filter(e => {
    const matchSearch = search === '' || e.desc.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || e.status === filter || e.action === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Audit Log</h1>
          <p className="text-cyber-muted text-sm mt-1">Complete history of account activity and security events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-sm font-medium hover:bg-cyber-blue/20 transition-all">
          <Download className="w-4 h-4" />Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted pointer-events-none" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-white placeholder-cyber-muted/50 text-sm focus:outline-none focus:border-cyber-blue/40 transition-all" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-white text-sm focus:outline-none focus:border-cyber-blue/40 transition-all">
          <option value="all">All Events</option>
          <option value="success">Successful</option>
          <option value="failed">Failed</option>
          <option value="login">Login Events</option>
          <option value="password_change">Password Changes</option>
        </select>
      </div>

      {/* Table */}
      <div className="cyber-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left px-6 py-3.5 text-[11px] text-cyber-muted uppercase tracking-wider">Event</th>
                <th className="text-left px-4 py-3.5 text-[11px] text-cyber-muted uppercase tracking-wider hidden md:table-cell">Method</th>
                <th className="text-left px-4 py-3.5 text-[11px] text-cyber-muted uppercase tracking-wider hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3.5 text-[11px] text-cyber-muted uppercase tracking-wider hidden lg:table-cell">Device</th>
                <th className="text-right px-6 py-3.5 text-[11px] text-cyber-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/50">
              {filtered.map(event => {
                const meta = ACTION_META[event.action] || ACTION_META.login
                const Icon = meta.icon
                return (
                  <tr key={event.id} className="hover:bg-white/2 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${meta.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${meta.color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{event.desc}</p>
                          <p className="text-[11px] text-cyber-muted mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />{fmtTime(event.time)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs text-cyber-muted">{event.method}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs text-cyber-muted flex items-center gap-1">
                        <Globe className="w-3 h-3" />{event.location}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs text-cyber-muted">{event.device}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {event.status === 'success' ? (
                        <span className="trust-badge badge-green text-[10px]"><CheckCircle className="w-3 h-3" /> OK</span>
                      ) : (
                        <span className="trust-badge text-[10px] text-red-400 border-red-500/30 bg-red-500/10 border"><AlertTriangle className="w-3 h-3" /> Failed</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-10 h-10 text-cyber-muted mx-auto mb-3" />
            <p className="text-sm text-cyber-muted">No events match your filter</p>
          </div>
        )}
      </div>

      <p className="text-xs text-cyber-muted text-center">Showing {filtered.length} of {AUDIT_EVENTS.length} events · Logs retained for 90 days</p>
    </div>
  )
}
