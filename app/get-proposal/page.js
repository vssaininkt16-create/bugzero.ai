'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, ArrowRight, CheckCircle, Loader2, Download,
  Shield, Building2, Clock, ChevronRight, Mail
} from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import Link from 'next/link';

const servicesList = [
  'Web Application VAPT',
  'API Security Testing',
  'Network Security Assessment',
  'Cloud Security Audit',
  'Mobile App Security',
  'Bug Bounty Management',
  'Security Code Review',
  'Database Security',
  'Compliance Consulting',
  'Cybersecurity Training',
];

const companySizes = ['Startup (1-10)', 'SME (11-100)', 'Mid-Market (101-500)', 'Enterprise (500+)', 'Government'];
const budgetRanges = ['Under ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹5,00,000', 'Above ₹5,00,000', 'Need guidance on budget'];
const timelines = ['Urgent (within 1 week)', '1 Month', '3 Months', 'Flexible / Ongoing'];

export default function GetProposalPage() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', website: '',
    services: [], companySize: '', budget: '', timeline: '', description: '',
  });
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState('');

  const toggleService = (s) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(s) ? prev.services.filter(x => x !== s) : [...prev.services, s],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.services.length === 0) { setError('Please select at least one service.'); return; }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setProposal(data.data);
      } else {
        setError(data.error || 'Failed to generate proposal');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const generatePDFContent = () => {
    if (!proposal) return;
    // Create printable view
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
      <head><title>BugZero Proposal - ${proposal.proposalId}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; color: #1a1a2e; }
        h1 { color: #00d4ff; } h2 { color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #f0f8ff; }
        .header { text-align: center; border-bottom: 3px solid #00d4ff; padding-bottom: 20px; margin-bottom: 30px; }
        .badge { background: #e0f7ff; color: #006080; padding: 4px 12px; border-radius: 12px; font-size: 12px; }
        @media print { body { margin: 20px; } }
      </style>
      </head>
      <body>
        <div class="header">
          <h1>BugZero Cyber Solutions</h1>
          <p className="text-gray-700">Security Proposal</p>
          <span class="badge">DPIIT Recognized</span>
          <span class="badge">ISO 27001</span>
        </div>
        <p className="text-gray-700"><strong>Proposal ID:</strong> ${proposal.proposalId}</p>
        <p className="text-gray-700"><strong>Date:</strong> ${new Date(proposal.date).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Prepared for:</strong> ${proposal.client.name} - ${proposal.client.company || 'N/A'}</p>
        <h2>Selected Services</h2>
        <table>
          <tr><th>Service</th><th>Starting Price</th></tr>
          ${proposal.services.map(s => `<tr><td>${s.name}</td><td>${s.startingPrice}</td></tr>`).join('')}
        </table>
        <h2>Project Details</h2>
        <p className="text-gray-700"><strong>Company Size:</strong> ${proposal.companySize}</p>
        <p className="text-gray-700"><strong>Budget Range:</strong> ${proposal.budget}</p>
        <p className="text-gray-700"><strong>Timeline:</strong> ${proposal.timeline}</p>
        <p className="text-gray-700"><strong>Description:</strong> ${proposal.description || 'To be discussed'}</p>
        <h2>Our Process</h2>
        <ol>
          <li>Free 30-minute consultation to understand requirements</li>
          <li>Detailed scope definition and proposal finalization</li>
          <li>Security assessment execution (5-15 business days)</li>
          <li>Comprehensive report with remediation guidance</li>
          <li>Free re-testing after fixes</li>
        </ol>
        <h2>Why BugZero?</h2>
        <ul>
          <li>DPIIT Recognized Startup | ISO 27001 Compliant</li>
          <li>10+ CEH, OSCP, CISSP Certified Professionals</li>
          <li>500+ Security Audits | 50+ Enterprise Clients</li>
          <li>95% Client Retention Rate</li>
        </ul>
        <hr/>
        <p style="text-align:center;color:#666;">Contact: contact@bugzero.solutions | bugzero.solutions</p>
        <script>window.print();</script>
      </body></html>
    `);
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-6">
            <FileText className="w-4 h-4" /> Auto Proposal Generator
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-6">
            Get Your <span className="text-red-600">Security Proposal</span> in Seconds
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto">
            Tell us about your requirements and we&apos;ll generate a professional security proposal instantly.
          </motion.p>
        </div>
      </section>

      <TrustBadges />

      {/* Form / Result */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {proposal ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 font-heading mb-2">Proposal Generated!</h2>
              <p className="text-gray-700 mb-2">Proposal ID: <span className="text-red-600 font-mono">{proposal.proposalId}</span></p>
              <p className="text-sm text-gray-700 mb-6">A copy has been sent to your email.</p>

              <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 text-left mb-6 max-w-lg mx-auto">
                <h3 className="font-bold text-gray-900 mb-3">Proposal Summary</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700"><span className="text-gray-600">Client:</span> <span className="text-gray-900 ml-2">{proposal.client.name}</span></p>
                  <p className="text-gray-700"><span className="text-gray-600">Company:</span> <span className="text-gray-900 ml-2">{proposal.client.company || 'N/A'}</span></p>
                  <p className="text-gray-700"><span className="text-gray-600">Services:</span></p>
                  <ul className="ml-4 space-y-1">
                    {proposal.services.map((s, i) => (
                      <li key={i} className="flex items-center justify-between text-gray-700">
                        <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-600" /> {s.name}</span>
                        <span className="text-red-600 font-medium">{s.startingPrice}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700"><span className="text-gray-600">Timeline:</span> <span className="text-gray-900 ml-2">{proposal.timeline || 'TBD'}</span></p>
                  <p className="text-gray-700"><span className="text-gray-600">Budget:</span> <span className="text-gray-900 ml-2">{proposal.budget || 'TBD'}</span></p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={generatePDFContent} className="btn-primary justify-center">
                  <Download className="w-4 h-4" /> Download as PDF
                </button>
                <Link href="/contact" className="btn-secondary justify-center">
                  <Mail className="w-4 h-4" /> Schedule Discussion
                </Link>
              </div>
            </div>

            <div className="text-center">
              <button onClick={() => { setProposal(null); setForm({...form, services: []}); }}
                className="text-sm text-gray-600 hover:text-red-600 underline">
                Generate another proposal
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 font-heading mb-6">Fill in Your Requirements</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Your Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Company Name</label>
                    <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="Company" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Website URL</label>
                    <input type="text" value={form.website} onChange={e => setForm({...form, website: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="https://..." />
                  </div>
                </div>

                {/* Services Selection */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Services Needed * (select all that apply)</label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {servicesList.map((s, i) => (
                      <button key={i} type="button" onClick={() => toggleService(s)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-all border ${
                          form.services.includes(s)
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : 'bg-white border border-gray-200 shadow-sm border-gray-200 text-gray-700 hover:border-red-200'
                        }`}>
                        <CheckCircle className={`w-4 h-4 shrink-0 ${form.services.includes(s) ? 'text-red-600' : 'text-gray-600'}`} />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Company Size</label>
                    <select value={form.companySize} onChange={e => setForm({...form, companySize: e.target.value})}
                      className="w-full px-3 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none appearance-none">
                      <option value="">Select...</option>
                      {companySizes.map((s,i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Budget Range</label>
                    <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}
                      className="w-full px-3 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none appearance-none">
                      <option value="">Select...</option>
                      {budgetRanges.map((s,i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Timeline</label>
                    <select value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})}
                      className="w-full px-3 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none appearance-none">
                      <option value="">Select...</option>
                      {timelines.map((s,i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Brief Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none resize-none"
                    placeholder="Describe your security requirements, concerns, or specific needs..." />
                </div>

                {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</p>}

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <>Generate Proposal <ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
