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
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5">
      <div className={`w-9 h-9 rounded-xl bg-${color}/10 border border-${color}/20 flex items-center justify-center mb-3`}>
        <Icon className={`w-4 h-4 text-${color}`} />
      </div>
      <p className="text-2xl font-bold font-heading text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wider">{label}</p>
      {sub && <p className="text-[11px] text-gray-500/60 mt-1">{sub}</p>}
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
            <Crown className="w-5 h-5 text-red-700" />
            <h1 className="text-2xl font-bold font-heading text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-500 text-sm">Manage users, roles, and platform security</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 text-sm hover:text-red-600 hover:border-red-200 transition-all">
            <Download className="w-4 h-4" />Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-all">
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
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-900 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-600" />Platform Security Health</p>
          <span className="trust-badge badge-green text-[10px]">Good</span>
        </div>
        <div className="h-2.5 bg-cyber-border rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-red-50 to-red-50 transition-all duration-1000" style={{ width: '72%' }} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">72% users have strong security posture</p>
          <p className="text-xs text-gray-500">72 / 100</p>
        </div>
      </div>

      {/* User table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <h2 className="text-sm font-semibold text-gray-900 flex-1">User Management</h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                  className="w-full sm:w-44 pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-cyber-muted/50 text-xs focus:outline-none focus:border-red-200 transition-all" />
              </div>
              <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-200 transition-all">
                <option value="all">All Roles</option>
                {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-200 transition-all">
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
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 text-[11px] text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-[11px] text-gray-500 uppercase tracking-wider hidden md:table-cell">Role</th>
                <th className="text-left px-4 py-3 text-[11px] text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-[11px] text-gray-500 uppercase tracking-wider hidden lg:table-cell">2FA</th>
                <th className="text-left px-4 py-3 text-[11px] text-gray-500 uppercase tracking-wider hidden xl:table-cell">Sec. Score</th>
                <th className="text-left px-4 py-3 text-[11px] text-gray-500 uppercase tracking-wider hidden md:table-cell">Last Login</th>
                <th className="text-right px-6 py-3 text-[11px] text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/50">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-50 to-gray-50 border border-red-200 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-red-600">{user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-[11px] text-gray-500">{user.email}</p>
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
                        <div className={`h-full rounded-full ${user.secScore >= 80 ? 'bg-green-50' : user.secScore >= 60 ? 'bg-red-600' : user.secScore >= 40 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${user.secScore}%` }} />
                      </div>
                      <span className="text-[11px] text-gray-500">{user.secScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-[11px] text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover: transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenu === user.id && (
                      <div className="absolute right-4 top-12 w-44 bg-[#0a1628] border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden">
                        <button onClick={() => { setEditUser(user); setNewRole(user.role); setOpenMenu(null) }}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 hover:text-red-600 hover:bg-gray-50 w-full transition-colors">
                          <Key className="w-3.5 h-3.5" />Change Role
                        </button>
                        <button onClick={() => suspendUser(user.id)}
                          disabled={loading === user.id + '_suspend'}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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
            <Users className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No users match your query</p>
          </div>
        )}

        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {users.length} users</p>
          <span className="text-xs text-gray-500">Last synced: just now</span>
        </div>
      </div>

      {/* Change Role Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/70  z-[100] flex items-center justify-center px-4">
          <div className="bg-[#0a1628] border border-gray-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                <Key className="w-4 h-4 text-red-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Change Role</h3>
                <p className="text-[11px] text-gray-500">{editUser.name}</p>
              </div>
              <button onClick={() => setEditUser(null)} className="ml-auto text-gray-500 hover:text-red-600"><X className="w-4 h-4" /></button>
            </div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">New Role</label>
            <select value={newRole} onChange={e => setNewRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-red-200 transition-all mb-5">
              {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
            </select>
            <div className="flex gap-3">
              <button onClick={() => setEditUser(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm hover:text-red-600 transition-all">Cancel</button>
              <button onClick={changeRole} disabled={loading === editUser.id + '_role' || newRole === editUser.role}
                className="flex-1 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading === editUser.id + '_role' ? <><Loader2 className="w-4 h-4 animate-spin" />Updating...</> : 'Apply Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
