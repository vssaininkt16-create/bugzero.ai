'use client'

import { useState } from 'react'
import {
  Users, Shield, AlertTriangle, TrendingUp, Crown, CheckCircle, Clock,
  Search, Filter, MoreVertical, User, ChevronDown, Activity, Ban, Key,
  Download, RefreshCw, Loader2, X, Eye, Settings
} from 'lucide-react'

const DEMO_USERS = [
  { id: 'u1', name: 'Vishal Saini', email: 'vishal@bugzero.io', role: 'super_admin', status: 'active', twoFA: true, lastLogin: '2m ago', signedUp: 'Mar 1, 2026', secScore: 95 },
  { id: 'u2', name: 'Riya Sharma', email: 'riya@bugzero.io', role: 'admin', status: 'active', twoFA: true, lastLogin: '1h ago', signedUp: 'Mar 5, 2026', secScore: 88 },
  { id: 'u3', name: 'Arjun Mehta', email: 'arjun@test.com', role: 'user', status: 'active', twoFA: false, lastLogin: '3h ago', signedUp: 'Mar 12, 2026', secScore: 64 },
  { id: 'u4', name: 'Priya Nair', email: 'priya@company.com', role: 'user', status: 'suspended', twoFA: false, lastLogin: '5 days ago', signedUp: 'Feb 28, 2026', secScore: 45 },
  { id: 'u5', name: 'Karan Singh', email: 'karan@startup.in', role: 'user', status: 'active', twoFA: true, lastLogin: '2 days ago', signedUp: 'Mar 20, 2026', secScore: 79 },
  { id: 'u6', name: 'Ananya Verma', email: 'ananya@agency.io', role: 'user', status: 'pending', twoFA: false, lastLogin: 'Never', signedUp: 'Apr 1, 2026', secScore: 30 },
]

const ROLES = ['user', 'admin', 'super_admin']

const ROLE_STYLE = {
  super_admin: 'badge-purple',
  admin: 'badge-blue',
  user: 'badge-green',
}

const STATUS_STYLE = {
  active: 'badge-green',
  suspended: 'text-red-400 border-red-500/30 bg-red-500/10 border',
  pending: 'badge-saffron',
}

function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="cyber-card rounded-2xl p-5">
      <div className={`w-9 h-9 rounded-xl bg-${color}/10 border border-${color}/20 flex items-center justify-center mb-3`}>
        <Icon className={`w-4 h-4 text-${color}`} />
      </div>
      <p className="text-2xl font-bold font-heading text-white">{value}</p>
      <p className="text-xs text-cyber-muted mt-0.5 uppercase tracking-wider">{label}</p>
      {sub && <p className="text-[11px] text-cyber-muted/60 mt-1">{sub}</p>}
    </div>
  )
}

export default function AdminDashboardClient() {
  const [users, setUsers] = useState(DEMO_USERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState(null)
  const [loading, setLoading] = useState(null)
  const [editUser, setEditUser] = useState(null)
  const [newRole, setNewRole] = useState('')

  const filtered = users.filter(u => {
    const matchSearch = search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const suspendUser = async (id) => {
    setLoading(id + '_suspend')
    await new Promise(r => setTimeout(r, 800))
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u))
    setLoading(null)
    setOpenMenu(null)
  }

  const changeRole = async () => {
    if (!editUser || !newRole) return
    setLoading(editUser.id + '_role')
    await new Promise(r => setTimeout(r, 800))
    setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, role: newRole } : u))
    setLoading(null)
    setEditUser(null)
    setNewRole('')
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    twofa: users.filter(u => u.twoFA).length,
    alerts: users.filter(u => u.status === 'pending' || u.secScore < 50).length,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-cyber-purple" />
            <h1 className="text-2xl font-bold font-heading text-white">Admin Dashboard</h1>
          </div>
          <p className="text-cyber-muted text-sm">Manage users, roles, and platform security</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-cyber-muted text-sm hover:text-white hover:border-cyber-blue/30 transition-all">
            <Download className="w-4 h-4" />Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-blue text-sm font-semibold hover:bg-cyber-blue/25 transition-all">
            <RefreshCw className="w-4 h-4" />Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.total} icon={Users} color="cyber-blue" />
        <StatCard label="Active" value={stats.active} icon={CheckCircle} color="cyber-green" sub={`${Math.round(stats.active / stats.total * 100)}% of total`} />
        <StatCard label="2FA Enabled" value={stats.twofa} icon={Shield} color="cyber-purple" sub={`${Math.round(stats.twofa / stats.total * 100)}% adoption`} />
        <StatCard label="Alerts" value={stats.alerts} icon={AlertTriangle} color="yellow-400" sub="Needs attention" />
      </div>

      {/* Security overview bar */}
      <div className="cyber-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-white flex items-center gap-2"><TrendingUp className="w-4 h-4 text-cyber-green" />Platform Security Health</p>
          <span className="trust-badge badge-green text-[10px]">Good</span>
        </div>
        <div className="h-2.5 bg-cyber-border rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-green transition-all duration-1000" style={{ width: '72%' }} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-cyber-muted">72% users have strong security posture</p>
          <p className="text-xs text-cyber-muted">72 / 100</p>
        </div>
      </div>

      {/* User table */}
      <div className="cyber-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-cyber-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <h2 className="text-sm font-semibold text-white flex-1">User Management</h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyber-muted pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                  className="w-full sm:w-44 pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-cyber-border text-white placeholder-cyber-muted/50 text-xs focus:outline-none focus:border-cyber-blue/40 transition-all" />
              </div>
              <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-cyber-border text-white text-xs focus:outline-none focus:border-cyber-blue/40 transition-all">
                <option value="all">All Roles</option>
                {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-cyber-border text-white text-xs focus:outline-none focus:border-cyber-blue/40 transition-all">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyber-border bg-white/2">
                <th className="text-left px-6 py-3 text-[11px] text-cyber-muted uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-[11px] text-cyber-muted uppercase tracking-wider hidden md:table-cell">Role</th>
                <th className="text-left px-4 py-3 text-[11px] text-cyber-muted uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-[11px] text-cyber-muted uppercase tracking-wider hidden lg:table-cell">2FA</th>
                <th className="text-left px-4 py-3 text-[11px] text-cyber-muted uppercase tracking-wider hidden xl:table-cell">Sec. Score</th>
                <th className="text-left px-4 py-3 text-[11px] text-cyber-muted uppercase tracking-wider hidden md:table-cell">Last Login</th>
                <th className="text-right px-6 py-3 text-[11px] text-cyber-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/50">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-cyber-blue">{user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-[11px] text-cyber-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className={`trust-badge ${ROLE_STYLE[user.role]} text-[10px] capitalize`}>{user.role.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`trust-badge ${STATUS_STYLE[user.status]} text-[10px] capitalize`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    {user.twoFA
                      ? <span className="trust-badge badge-green text-[10px]"><CheckCircle className="w-3 h-3" /> On</span>
                      : <span className="trust-badge text-[10px] text-red-400 border-red-500/20 bg-red-500/10 border"><X className="w-3 h-3" /> Off</span>
                    }
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-cyber-border rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${user.secScore >= 80 ? 'bg-cyber-green' : user.secScore >= 60 ? 'bg-cyber-blue' : user.secScore >= 40 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${user.secScore}%` }} />
                      </div>
                      <span className="text-[11px] text-cyber-muted">{user.secScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-[11px] text-cyber-muted flex items-center gap-1"><Clock className="w-3 h-3" />{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      className="p-1.5 rounded-lg text-cyber-muted hover:text-white hover:bg-white/10 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenu === user.id && (
                      <div className="absolute right-4 top-12 w-44 bg-[#0a1628] border border-cyber-border rounded-xl shadow-2xl z-20 overflow-hidden">
                        <button onClick={() => { setEditUser(user); setNewRole(user.role); setOpenMenu(null) }}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-cyber-muted hover:text-white hover:bg-white/5 w-full transition-colors">
                          <Key className="w-3.5 h-3.5" />Change Role
                        </button>
                        <button onClick={() => suspendUser(user.id)}
                          disabled={loading === user.id + '_suspend'}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors disabled:opacity-50">
                          {loading === user.id + '_suspend' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Ban className="w-3.5 h-3.5" />}
                          {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <Users className="w-8 h-8 text-cyber-muted mx-auto mb-2" />
            <p className="text-sm text-cyber-muted">No users match your query</p>
          </div>
        )}

        <div className="px-6 py-3 border-t border-cyber-border flex items-center justify-between">
          <p className="text-xs text-cyber-muted">Showing {filtered.length} of {users.length} users</p>
          <span className="text-xs text-cyber-muted">Last synced: just now</span>
        </div>
      </div>

      {/* Change Role Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
          <div className="bg-[#0a1628] border border-cyber-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-cyber-purple/15 border border-cyber-purple/20 flex items-center justify-center">
                <Key className="w-4 h-4 text-cyber-purple" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Change Role</h3>
                <p className="text-[11px] text-cyber-muted">{editUser.name}</p>
              </div>
              <button onClick={() => setEditUser(null)} className="ml-auto text-cyber-muted hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">New Role</label>
            <select value={newRole} onChange={e => setNewRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-white text-sm focus:outline-none focus:border-cyber-blue/40 transition-all mb-5">
              {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
            </select>
            <div className="flex gap-3">
              <button onClick={() => setEditUser(null)} className="flex-1 py-2.5 rounded-xl border border-cyber-border text-cyber-muted text-sm hover:text-white transition-all">Cancel</button>
              <button onClick={changeRole} disabled={loading === editUser.id + '_role' || newRole === editUser.role}
                className="flex-1 py-2.5 rounded-xl bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-blue text-sm font-semibold hover:bg-cyber-blue/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading === editUser.id + '_role' ? <><Loader2 className="w-4 h-4 animate-spin" />Updating...</> : 'Apply Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
