'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp, Target, DollarSign, Users, Building2, Award,
  ChevronRight, ArrowRight, Shield, ShieldCheck, Globe, Zap,
  BarChart3, PieChart, Briefcase, BookOpen, CheckCircle,
  AlertTriangle, Lock, Server, Calendar, Mail, Phone, Download,
  ExternalLink, IndianRupee, Lightbulb, Rocket
} from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import SectionWrapper from '@/components/SectionWrapper';

/* ─── Data Constants ─── */
const problemStats = [
  { value: '₹1.25 Lakh Cr', label: 'Lost to cybercrime annually in India', icon: AlertTriangle, color: 'text-red-400' },
  { value: '74%', label: 'Indian companies face cyber attacks yearly', icon: Shield, color: 'text-red-600' },
  { value: '3%', label: 'Indian SMEs have proper security', icon: Lock, color: 'text-yellow-400' },
  { value: '300%', label: 'YoY increase in government data breaches', icon: TrendingUp, color: 'text-red-400' },
];

const solutionItems = [
  { title: 'End-to-End Cybersecurity Services', desc: 'Comprehensive VAPT, network security, cloud audits, and compliance consulting.', icon: ShieldCheck },
  { title: 'AI-Powered Threat Detection', desc: 'Machine learning-based vulnerability scanning and real-time threat monitoring.', icon: Zap },
  { title: 'Automated Security Platform', desc: 'SaaS-based continuous security monitoring with instant alerts and remediation.', icon: Server },
  { title: 'Training & Certification Programs', desc: 'Building India\'s next generation of cybersecurity professionals.', icon: BookOpen },
];

const marketData = {
  tam: { value: '₹35,000 Cr', label: 'Total Addressable Market', desc: 'India cybersecurity market by 2027', color: 'bg-red-600' },
  sam: { value: '₹8,000 Cr', label: 'Serviceable Addressable Market', desc: 'SME + Government segment', color: 'bg-red-50' },
  som: { value: '₹500 Cr', label: 'Serviceable Obtainable Market', desc: 'Realistic 5-year target', color: 'bg-green-50' },
};

const businessModel = [
  { title: 'Project Revenue', desc: 'VAPT assessments, security consulting, and compliance audits', pct: '45%', icon: Briefcase },
  { title: 'SaaS Subscription', desc: 'Continuous security monitoring platform', pct: '30%', icon: Server },
  { title: 'Training Programs', desc: 'Cybersecurity training and certification', pct: '15%', icon: BookOpen },
  { title: 'Government Contracts', desc: 'Government department security audits', pct: '10%', icon: Building2 },
];

const traction = [
  { label: 'Annual Recurring Revenue', value: 'Growing', icon: TrendingUp },
  { label: 'Enterprise Clients', value: '50+', icon: Building2 },
  { label: 'Certified Professionals', value: '10+', icon: Users },
  { label: 'Year-over-Year Growth', value: '200%', icon: BarChart3 },
  { label: 'Security Audits Completed', value: '500+', icon: ShieldCheck },
  { label: 'States Covered', value: '15+', icon: Globe },
];

const fundUtilization = [
  { label: 'Product Development', pct: 40, desc: 'AI security platform & automation tools', color: 'bg-red-600', textColor: 'text-red-600' },
  { label: 'Team Expansion', pct: 25, desc: '10 new security engineers & researchers', color: 'bg-red-50', textColor: 'text-red-700' },
  { label: 'Marketing & BD', pct: 20, desc: 'Government contracts & enterprise sales', color: 'bg-green-50', textColor: 'text-green-600' },
  { label: 'Infrastructure', pct: 15, desc: 'Certifications, labs & cloud infrastructure', color: 'bg-orange-50', textColor: 'text-red-600' },
];

const govSchemes = [
  { name: 'Startup India Seed Fund Scheme (SISFS)', desc: 'Up to ₹50 Lakhs for proof of concept and prototype development.', status: 'Eligible' },
  { name: 'MeitY Startup Hub', desc: 'Grants and incubation support for cybersecurity startups.', status: 'Eligible' },
  { name: 'NASSCOM Foundation', desc: 'Technology for social impact grants and mentorship programs.', status: 'Member' },
  { name: 'SIDBI Fund of Funds', desc: 'Venture capital support through government-backed funds.', status: 'Eligible' },
  { name: 'National Cyber Security Policy Grants', desc: 'Government grants for cybersecurity innovation and research.', status: 'Target' },
  { name: 'Cyber Surakshit Bharat Program', desc: 'MeitY initiative for building cybersecurity awareness and capability.', status: 'Partner' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function FundingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company: formData.organization, source: 'funding_page', service: 'Investment Inquiry' }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] " />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] -purple" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-medium mb-6">
              <IndianRupee className="w-4 h-4" />
              Investment & Partnership Opportunity
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6"
          >
            Invest in India&apos;s <span className="text-red-600">Cybersecurity Future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8"
          >
            The Indian cybersecurity market is projected to reach <span className="text-gray-900 font-semibold">₹35,000 Crore by 2027</span>.
            BugZero is positioned to capture this explosive growth with a seed funding ask of <span className="text-red-600 font-semibold">₹1 Crore</span>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/pitch-deck" className="btn-primary text-base px-8 py-4 justify-center">
              View Pitch Deck
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://calendly.com/bugzero-solutions" target="_blank" rel="noopener noreferrer" className="btn-secondary text-base px-8 py-4 justify-center">
              Schedule Meeting
              <Calendar className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── EXECUTIVE SUMMARY ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Executive Summary</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">The Opportunity</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div {...fadeUp} className="bg-white border border-gray-200 shadow-sm rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 font-heading mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-600" /> Market Context
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />India&apos;s cybersecurity market projected to reach ₹35,000 Crore by 2027</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />74% of Indian companies face cyber attacks annually</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />Critical shortage of 1 million+ cybersecurity professionals in India</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />Government actively promoting cybersecurity through Digital India</li>
              </ul>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 shadow-sm rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 font-heading mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-red-600" /> Our Proposition
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />Comprehensive cybersecurity services for SMEs and enterprises</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />AI-powered security scanning platform (SaaS model)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />Team of CEH, OSCP, CISSP certified professionals</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />Seed funding ask: ₹1 Crore for platform development & expansion</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── THE PROBLEM ─── */}
      <SectionWrapper className="bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-400 text-sm font-semibold tracking-wider uppercase">The Problem</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">India&apos;s Cybersecurity Crisis</h2>
            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
              India faces an unprecedented cybersecurity challenge that threatens its digital economy.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 font-heading mb-1">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── OUR SOLUTION ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-green-600 text-sm font-semibold tracking-wider uppercase">Our Solution</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">How BugZero Solves This</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {solutionItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex gap-4"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 font-heading mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── MARKET OPPORTUNITY ─── */}
      <SectionWrapper className="bg-gradient-to-b from-transparent via-red-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-700 text-sm font-semibold tracking-wider uppercase">Market Opportunity</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">Massive Addressable Market</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {Object.entries(marketData).map(([key, data], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 text-center relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${data.color}`} />
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{key.toUpperCase()}</div>
                <div className="text-3xl font-bold text-gray-900 font-heading mb-1">{data.value}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">{data.label}</div>
                <div className="text-xs text-gray-500">{data.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── BUSINESS MODEL ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Business Model</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">Diversified Revenue Streams</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessModel.map((bm, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-3">
                  <bm.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-600 font-heading mb-1">{bm.pct}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{bm.title}</h3>
                <p className="text-xs text-gray-700">{bm.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── TRACTION ─── */}
      <SectionWrapper className="bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-green-600 text-sm font-semibold tracking-wider uppercase">Traction & Milestones</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">Proven Track Record</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {traction.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-center"
              >
                <t.icon className="w-5 h-5 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 font-heading">{t.value}</div>
                <div className="text-xs text-gray-600 mt-1">{t.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── FUND UTILIZATION ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Fund Utilization</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">
              How We&apos;ll Use <span className="text-red-600">₹1 Crore</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Visual bar chart */}
            <div className="space-y-6 mb-10">
              {fundUtilization.map((fu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{fu.label}</span>
                    <span className={`text-sm font-bold ${fu.textColor}`}>{fu.pct}% (₹{(fu.pct * 1).toFixed(0)} Lakhs)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white border border-gray-200 shadow-sm border border-gray-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${fu.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                      className={`h-full rounded-full ${fu.color}`}
                    />
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{fu.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── GOVERNMENT SCHEMES ─── */}
      <SectionWrapper className="bg-gradient-to-b from-transparent via-cyber-saffron/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Government Schemes</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mt-2">Eligible Government Programs</h2>
            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
              BugZero qualifies for multiple government funding and support programs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {govSchemes.map((gs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 font-heading pr-2">{gs.name}</h3>
                  <span className={`trust-badge text-[10px] shrink-0 ${
                    gs.status === 'Member' || gs.status === 'Partner' ? 'badge-green' :
                    gs.status === 'Eligible' ? 'badge-blue' : 'badge-saffron'
                  }`}>
                    {gs.status}
                  </span>
                </div>
                <p className="text-xs text-gray-700">{gs.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── CTA / CONTACT SECTION ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - CTAs */}
            <motion.div {...fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-6">
                Ready to Partner with Us?
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Whether you represent a government body, investment fund, or corporate partner,
                we&apos;d love to discuss how BugZero can align with your objectives for a safer digital India.
              </p>
              <div className="space-y-4">
                <Link href="/pitch-deck" className="btn-primary w-full sm:w-auto text-base px-8 py-4 justify-center">
                  <Download className="w-5 h-5" />
                  View Interactive Pitch Deck
                </Link>
                <a
                  href="https://calendly.com/bugzero-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full sm:w-auto text-base px-8 py-4 justify-center"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a Meeting
                </a>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-red-600" />
                  <span>invest@bugzero.solutions</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>+91-XXXXX-XXXXX</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 font-heading mb-6">Contact for Investment</h3>
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                    <p className="text-gray-700">We&apos;ll get back to you within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Organization</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                        placeholder="Organization / Fund name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors resize-none"
                        placeholder="Tell us about your interest..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Send Inquiry'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
