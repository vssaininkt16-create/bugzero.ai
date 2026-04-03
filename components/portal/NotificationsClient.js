'use client'

import { useState } from 'react'
import { Bell, CheckCircle, AlertTriangle, Key, Shield, X, Settings, Info } from 'lucide-react'

const INITIAL_NOTIFS = [
  { id: 1, type: 'alert', icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', title: 'New device login detected', desc: 'Firefox on MacBook signed in from Bangalore, India 2 days ago.', time: '2 days ago', read: false, action: '/portal/sessions' },
  { id: 2, type: 'security', icon: Key, color: 'text-cyber-blue', bg: 'bg-cyber-blue/10 border-cyber-blue/20', title: 'Password changed successfully', desc: 'Your account password was updated. If this wasn\'t you, secure your account now.', time: '2 hours ago', read: false, action: '/portal/security' },
  { id: 3, type: 'success', icon: CheckCircle, color: 'text-cyber-green', bg: 'bg-cyber-green/10 border-cyber-green/20', title: 'Email verified', desc: 'Your email address has been successfully verified.', time: '5 days ago', read: true, action: null },
  { id: 4, type: 'info', icon: Info, color: 'text-cyber-purple', bg: 'bg-cyber-purple/10 border-cyber-purple/20', title: 'System maintenance notice', desc: 'BugZero portal will undergo scheduled maintenance on Sunday, 06 Apr 2026 02:00–04:00 IST.', time: '1 week ago', read: true, action: null },
  { id: 5, type: 'alert', icon: Shield, color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', title: '2FA is not enabled', desc: 'Your account is at higher risk. Enable two-factor authentication to protect your account.', time: '1 week ago', read: false, action: '/portal/security' },
]

export default function NotificationsClient() {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS)
  const [filter, setFilter] = useState('all')

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const dismiss = (id) => setNotifs(prev => prev.filter(n => n.id !== id))
  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const unread = notifs.filter(n => !n.read).length
  const filtered = filter === 'unread' ? notifs.filter(n => !n.read) : notifs

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            Notifications
            {unread > 0 && <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">{unread}</span>}
          </h1>
          <p className="text-cyber-muted text-sm mt-1">Security alerts and account activity notifications</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-xl bg-white/5 border border-cyber-border p-1">
            {['all', 'unread'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${filter === f ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30' : 'text-cyber-muted hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="px-3 py-1.5 text-xs text-cyber-muted hover:text-white border border-cyber-border rounded-xl hover:border-cyber-blue/30 transition-all">
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(notif => {
          const Icon = notif.icon
          return (
            <div key={notif.id} onClick={() => markRead(notif.id)}
              className={`cyber-card rounded-2xl p-5 cursor-pointer transition-all hover:border-cyber-blue/20 ${!notif.read ? 'border-cyber-blue/20' : 'opacity-70'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${notif.bg}`}>
                  <Icon className={`w-5 h-5 ${notif.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white">{notif.title}</p>
                        {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue shrink-0" />}
                      </div>
                      <p className="text-xs text-cyber-muted mt-1 leading-relaxed">{notif.desc}</p>
                      <p className="text-[11px] text-cyber-muted/60 mt-2">{notif.time}</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); dismiss(notif.id) }}
                      className="text-cyber-muted hover:text-white transition-colors shrink-0 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {notif.action && (
                    <a href={notif.action} onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 mt-3 text-xs text-cyber-blue hover:underline font-medium">
                      <Settings className="w-3 h-3" />Review Now →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 cyber-card rounded-2xl">
          <Bell className="w-12 h-12 text-cyber-muted mx-auto mb-3" />
          <p className="text-sm font-medium text-white">All caught up!</p>
          <p className="text-xs text-cyber-muted mt-1">No {filter === 'unread' ? 'unread ' : ''}notifications</p>
        </div>
      )}
    </div>
  )
}
