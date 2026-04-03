'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Users, TrendingUp, BarChart3, Mail, Search, Filter,
  Download, Trash2, CheckCircle, Clock, Star, LogOut, RefreshCw,
  ChevronDown, Building2, Eye, Loader2, AlertTriangle
} from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const COLORS = ['#00d4ff', '#7c3aed', '#10b981', '#ff6b00', '#ef4444', '#eab308'];
const STATUS_COLORS = { new: 'text-cyber-blue', contacted: 'text-yellow-400', qualified: 'text-cyber-purple', converted: 'text-cyber-green', lost: 'text-red-400' };
const STATUS_CSS_COLORS = { new: '#00d4ff', contacted: '#facc15', qualified: '#a78bfa', converted: '#10b981', lost: '#f87171' };
const PRIORITY_COLORS = { hot: 'bg-red-500/20 text-red-400 border-red-500/30', warm: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', cold: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };

export default function AdminDashboard() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [authStatus, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authStatus === 'authenticated') fetchData();
  }, [authStatus]);

  const updateLeadStatus = async (id, updates) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchData();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const deleteLead = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const exportCSV = () => {
    if (!data?.leads) return;
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Priority', 'Source', 'Date'];
    const rows = data.leads.map(l => [
      l.name, l.email, l.phone, l.company, l.service, l.budget, l.status, l.priority, l.source, new Date(l.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c || ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `bugzero-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (authStatus === 'loading' || (authStatus === 'authenticated' && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyber-blue animate-spin" />
      </div>
    );
  }

  if (authStatus === 'unauthenticated') return null;
  if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-400">Failed to load data</div>;

  const filteredLeads = (data.leads || []).filter(l => {
    if (statusFilter && l.status !== statusFilter) return false;
    if (priorityFilter && l.priority !== priorityFilter) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      return l.name?.toLowerCase().includes(s) || l.email?.toLowerCase().includes(s) || l.company?.toLowerCase().includes(s);
    }
    return true;
  });

  const o = data.overview;
  const pieData = (data.analytics?.leadsBySource || []).map(s => ({ name: s._id || 'unknown', value: s.count }));
  const barData = (data.analytics?.leadsByService || []).slice(0, 6).map(s => ({ name: (s._id || '').substring(0, 15), count: s.count }));
  const lineData = (data.analytics?.weeklyLeads || []).map(d => ({ date: d._id?.substring(5), leads: d.count }));

  return (
    <div className="min-h-screen bg-cyber-bg">
      {/* Top Bar */}
      <div className="border-b border-cyber-border bg-cyber-dark/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyber-blue" />
            <span className="text-lg font-bold text-white font-heading">Bug<span className="text-cyber-blue">Zero</span> Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-400">{session?.user?.email}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-cyber-border pb-3">
          {['overview', 'leads', 'analytics'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                tab === t ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Overview Cards */}
        {tab === 'overview' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {[
                { label: 'Total Leads', value: o.totalLeads, icon: Users, color: 'text-cyber-blue' },
                { label: 'New Today', value: o.newToday, icon: TrendingUp, color: 'text-cyber-green' },
                { label: 'Hot Leads', value: o.hotLeads, icon: Star, color: 'text-red-400' },
                { label: 'Bookings', value: o.totalBookings, icon: Clock, color: 'text-cyber-purple' },
                { label: 'Subscribers', value: o.totalSubscribers, icon: Mail, color: 'text-cyber-saffron' },
                { label: 'Scans', value: o.totalScans, icon: Eye, color: 'text-cyan-400' },
                { label: 'Emails Queued', value: o.totalEmails, icon: Mail, color: 'text-gray-400' },
              ].map((card, i) => (
                <div key={i} className="cyber-card rounded-xl p-4">
                  <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
                  <div className="text-2xl font-bold text-white font-heading">{card.value}</div>
                  <div className="text-xs text-gray-500">{card.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Leads Preview */}
            <h3 className="text-lg font-bold text-white mb-3">Recent Leads</h3>
            <div className="cyber-card rounded-xl overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyber-border">
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Email</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Company</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Service</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Priority</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.leads || []).slice(0, 10).map((lead) => (
                      <tr key={lead.id} className="border-b border-cyber-border/50 hover:bg-white/5">
                        <td className="px-4 py-3 text-white">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-300">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-300">{lead.company || '-'}</td>
                        <td className="px-4 py-3 text-gray-300">{(lead.service || '-').substring(0, 20)}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${PRIORITY_COLORS[lead.priority]}`}>{lead.priority?.toUpperCase()}</span></td>
                        <td className="px-4 py-3"><span className={`text-xs font-medium ${STATUS_COLORS[lead.status]}`}>{lead.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Leads Tab */}
        {tab === 'leads' && (
          <>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Search leads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-cyber-card border border-cyber-border text-white text-sm focus:border-cyber-blue outline-none" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-cyber-card border border-cyber-border text-white text-sm focus:border-cyber-blue outline-none appearance-none">
                <option value="">All Status</option>
                {['new', 'contacted', 'qualified', 'converted', 'lost'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-cyber-card border border-cyber-border text-white text-sm focus:border-cyber-blue outline-none appearance-none">
                <option value="">All Priority</option>
                {['hot', 'warm', 'cold'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <button onClick={exportCSV} className="btn-secondary text-xs px-3 py-2">
                <Download className="w-3 h-3" /> Export CSV
              </button>
            </div>

            <div className="cyber-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyber-border">
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Name</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Email</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Company</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Service</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Source</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Priority</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Status</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Date</th>
                      <th className="text-left px-3 py-3 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-cyber-border/50 hover:bg-white/5">
                        <td className="px-3 py-2 text-white font-medium">{lead.name}</td>
                        <td className="px-3 py-2 text-gray-300 text-xs">{lead.email}</td>
                        <td className="px-3 py-2 text-gray-300 text-xs">{lead.company || '-'}</td>
                        <td className="px-3 py-2 text-gray-300 text-xs max-w-[120px] truncate">{lead.service || '-'}</td>
                        <td className="px-3 py-2 text-gray-400 text-xs">{lead.source}</td>
                        <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${PRIORITY_COLORS[lead.priority]}`}>{lead.priority?.toUpperCase()}</span></td>
                        <td className="px-3 py-2">
                          <select value={lead.status} onChange={e => updateLeadStatus(lead.id, { status: e.target.value })}
                            className="bg-transparent text-xs font-medium outline-none cursor-pointer" style={{ color: STATUS_CSS_COLORS[lead.status] || '#94a3b8' }}>
                            {['new', 'contacted', 'qualified', 'converted', 'lost'].map(s => <option key={s} value={s} className="bg-cyber-bg text-white">{s}</option>)}
                          </select>
                        </td>
                        <td className="px-3 py-2 text-gray-500 text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                        <td className="px-3 py-2">
                          <button onClick={() => deleteLead(lead.id)} className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-gray-500">No leads found</div>
              )}
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {tab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Leads by Source */}
            <div className="cyber-card rounded-xl p-5">
              <h3 className="text-base font-bold text-white mb-4">Leads by Source</h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-gray-500 text-center py-12">No data yet</p>}
            </div>

            {/* Leads by Service */}
            <div className="cyber-card rounded-xl p-5">
              <h3 className="text-base font-bold text-white mb-4">Leads by Service</h3>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-gray-500 text-center py-12">No data yet</p>}
            </div>

            {/* Weekly Trend */}
            <div className="cyber-card rounded-xl p-5 md:col-span-2">
              <h3 className="text-base font-bold text-white mb-4">Weekly Lead Trend</h3>
              {lineData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="leads" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : <p className="text-gray-500 text-center py-12">No data yet</p>}
            </div>

            {/* Leads by Status */}
            <div className="cyber-card rounded-xl p-5 md:col-span-2">
              <h3 className="text-base font-bold text-white mb-4">Leads by Status</h3>
              <div className="flex flex-wrap gap-4">
                {(data.analytics?.leadsByStatus || []).map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full`} style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-sm text-gray-300">{s._id}: <span className="text-white font-bold">{s.count}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
