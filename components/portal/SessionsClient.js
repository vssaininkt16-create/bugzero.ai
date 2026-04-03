'use client'

import { useState } from 'react'
import { Smartphone, Monitor, Tablet, Globe, CheckCircle, AlertTriangle, LogOut, Loader2, MapPin, Clock, Shield } from 'lucide-react'

const DEMO_SESSIONS = [
  {
    id: 's1', device: 'Chrome on Windows', type: 'desktop', os: 'Windows 11',
    browser: 'Chrome 122', location: 'Mumbai, India', ip: '49.204.xxx.xxx',
    lastActive: '2 minutes ago', createdAt: '2 Apr 2026, 11:32 AM', current: true, trusted: true,
  },
  {
    id: 's2', device: 'Safari on iPhone 14', type: 'mobile', os: 'iOS 17.2',
    browser: 'Safari', location: 'Delhi, India', ip: '183.82.xxx.xxx',
    lastActive: '3 hours ago', createdAt: '1 Apr 2026, 08:14 PM', current: false, trusted: true,
  },
  {
    id: 's3', device: 'Firefox on MacBook', type: 'desktop', os: 'macOS Ventura',
    browser: 'Firefox 124', location: 'Bangalore, India', ip: '117.200.xxx.xxx',
    lastActive: '2 days ago', createdAt: '31 Mar 2026, 03:45 PM', current: false, trusted: false,
  },
  {
    id: 's4', device: 'Chrome on Android', type: 'mobile', os: 'Android 14',
    browser: 'Chrome Mobile', location: 'Unknown', ip: '203.xxx.xxx.xxx',
    lastActive: '5 days ago', createdAt: '28 Mar 2026, 06:00 PM', current: false, trusted: false,
  },
]

function DeviceIcon({ type }) {
  const cls = "w-5 h-5 text-cyber-blue"
  if (type === 'mobile') return <Smartphone className={cls} />
  if (type === 'tablet') return <Tablet className={cls} />
  return <Monitor className={cls} />
}

export default function SessionsClient() {
  const [sessions, setSessions] = useState(DEMO_SESSIONS)
  const [revoking, setRevoking] = useState(null)
  const [revokingAll, setRevokingAll] = useState(false)

  const revokeSession = async (id) => {
    setRevoking(id)
    await new Promise(r => setTimeout(r, 1000))
    setSessions(prev => prev.filter(s => s.id !== id))
    setRevoking(null)
  }

  const revokeAll = async () => {
    setRevokingAll(true)
    await new Promise(r => setTimeout(r, 1200))
    setSessions(prev => prev.filter(s => s.current))
    setRevokingAll(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Active Sessions</h1>
          <p className="text-cyber-muted text-sm mt-1">Manage all devices where your account is signed in</p>
        </div>
        <button onClick={revokeAll} disabled={revokingAll || sessions.filter(s => !s.current).length === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all disabled:opacity-40">
          {revokingAll ? <><Loader2 className="w-4 h-4 animate-spin" />Revoking...</> : <><LogOut className="w-4 h-4" />Revoke All Others</>}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Sessions', value: sessions.length, icon: Globe, color: 'cyber-blue' },
          { label: 'Trusted Devices', value: sessions.filter(s => s.trusted).length, icon: Shield, color: 'cyber-green' },
          { label: 'Suspicious', value: sessions.filter(s => !s.trusted && !s.current).length, icon: AlertTriangle, color: 'yellow-400' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="cyber-card rounded-2xl p-4 text-center">
              <Icon className={`w-5 h-5 text-${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white font-heading">{stat.value}</p>
              <p className="text-[11px] text-cyber-muted mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Session list */}
      <div className="space-y-3">
        {sessions.map(session => (
          <div key={session.id} className={`cyber-card rounded-2xl p-5 ${session.current ? 'border-cyber-blue/20' : !session.trusted ? 'border-yellow-400/15' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                session.current ? 'bg-cyber-blue/15 border border-cyber-blue/20' :
                !session.trusted ? 'bg-yellow-400/10 border border-yellow-400/20' :
                'bg-white/5 border border-cyber-border'
              }`}>
                <DeviceIcon type={session.type} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{session.device}</p>
                  {session.current && <span className="trust-badge badge-green text-[10px]"><CheckCircle className="w-3 h-3" /> Current</span>}
                  {!session.trusted && !session.current && <span className="trust-badge badge-saffron text-[10px]"><AlertTriangle className="w-3 h-3" /> Unrecognized</span>}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-cyber-muted">
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{session.ip}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{session.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Active {session.lastActive}</span>
                </div>
                <p className="text-[11px] text-cyber-muted/60 mt-1">{session.os} · {session.browser} · Signed in {session.createdAt}</p>
              </div>

              {!session.current && (
                <button onClick={() => revokeSession(session.id)} disabled={revoking === session.id}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all disabled:opacity-50 flex items-center gap-1.5">
                  {revoking === session.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <LogOut className="w-3 h-3" />}
                  {revoking === session.id ? '' : 'Revoke'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {sessions.length === 1 && (
        <div className="text-center py-8 text-cyber-muted">
          <CheckCircle className="w-10 h-10 mx-auto mb-2 text-cyber-green" />
          <p className="text-sm font-medium text-white">All other sessions revoked</p>
          <p className="text-xs mt-1">Only your current session is active</p>
        </div>
      )}
    </div>
  )
}
