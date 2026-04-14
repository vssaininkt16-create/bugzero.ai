'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, ShieldCheck, Users, Award, Globe, Target, Zap, BookOpen,
  CheckCircle, Calendar, ArrowRight, TrendingUp, Building2, MapPin,
  Star, Flag, Heart, Eye, Rocket, ChevronRight, Bug
} from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import SectionWrapper from '@/components/SectionWrapper';
import AnimatedCounter from '@/components/AnimatedCounter';

const teamMembers = [
  { name: 'Founder & CEO', role: 'Chief Executive Officer', bio: "Visionary cybersecurity leader with extensive experience in offensive security, building India's next-gen cybersecurity company.", certs: ['CEH', 'OSCP'] },
  { name: 'CTO', role: 'Chief Technology Officer', bio: 'Expert in building scalable security platforms. Leading the development of AI-powered threat detection systems.', certs: ['CISSP', 'AWS Security'] },
  { name: 'Head of Operations', role: 'VP Operations', bio: 'Streamlining security delivery processes to ensure world-class service quality for every client engagement.', certs: ['PMP', 'ISO 27001 LA'] },
  { name: 'Lead Security Researcher', role: 'Principal Researcher', bio: "Discovered critical vulnerabilities in major platforms. Leading BugZero's advanced security research team.", certs: ['OSCP', 'CRTP'] },
];

const timeline = [
  { year: '2024', quarter: 'Q1', title: 'Company Founded', desc: "BugZero Cyber Solutions established with a mission to secure India's digital future.", icon: Rocket },
  { year: '2024', quarter: 'Q3', title: 'First 10 Clients', desc: 'Secured first 10 enterprise clients across banking, healthcare, and fintech sectors.', icon: Building2 },
  { year: '2025', quarter: 'Q1', title: 'DPIIT Recognition', desc: 'Officially recognized by DPIIT under the Startup India initiative.', icon: Award },
  { year: '2025', quarter: 'Q2', title: '50+ Enterprise Clients', desc: 'Crossed 50 enterprise clients milestone across 15+ states in India.', icon: TrendingUp },
  { year: '2026', quarter: 'Target', title: '₹1 Crore Government Grant', desc: 'Targeting government grant funding to accelerate platform development and expansion.', icon: Target },
  { year: '2027', quarter: 'Vision', title: 'Pan-India Expansion', desc: "Becoming India's #1 cybersecurity company securing 1000+ organizations.", icon: Globe },
];

const impactStats = [
  { target: 15, suffix: '+', label: 'States Covered', icon: MapPin },
  { target: 10000, suffix: '+', label: 'Vulnerabilities Found', icon: Bug },
  { target: 5000, suffix: '+', label: 'Training Hours Delivered', icon: BookOpen },
  { target: 4, suffix: '', label: 'Industries Served', icon: Building2 },
];

const certifications = [
  { name: 'ISO 27001 Compliance', desc: 'Information Security Management System certification', icon: Shield },
  { name: 'OWASP Member', desc: 'Active member of the Open Web Application Security Project', icon: Globe },
  { name: 'NASSCOM Member', desc: 'Member of National Association of Software & Service Companies', icon: Building2 },
  { name: 'Startup India Recognized', desc: 'Officially recognized under DPIIT Startup India initiative', icon: Award },
  { name: 'MeitY Empanelled (Target)', desc: 'Working towards MeitY empanelment for government projects', icon: Target },
  { name: 'Cyber Surakshit Bharat', desc: "Partner in MeitY's cybersecurity awareness initiative", icon: ShieldCheck },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function AboutPageClient() {
  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            About BugZero Cyber Solutions
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-heading text-gray-900 mb-6">
            Our <span className="gradient-text">Mission</span> & Story
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building India&apos;s most trusted cybersecurity company, one audit at a time.
          </motion.p>
        </div>
      </section>

      <TrustBadges />

      {/* ─── MISSION & VISION ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeUp} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To make India&apos;s cyberspace the safest in the world by empowering organizations with elite security expertise, cutting-edge technology, and unwavering commitment to digital protection.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Become India&apos;s #1 cybersecurity company by 2027, securing 1,000+ organizations and training 10,000 cybersecurity professionals to build a safer digital India for future generations.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── TEAM ─── */}
      <SectionWrapper className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Our Team</span>
            <h2 className="text-3xl lg:text-5xl font-semibold font-heading text-gray-900 mt-2">Leadership Team</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">A team of certified security experts with decades of combined experience.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition">
                <div className="w-20 h-20 rounded-full bg-red-600 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white/80" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-heading">{member.name}</h3>
                <p className="text-sm text-red-600 mb-2">{member.role}</p>
                <p className="text-xs text-gray-500 mb-3">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {member.certs.map((cert, j) => (
                    <span key={j} className="trust-badge badge-blue text-[10px]">{cert}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── TIMELINE ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Our Journey</span>
            <h2 className="text-3xl lg:text-5xl font-semibold font-heading text-gray-900 mt-2">Company Timeline</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-0">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 text-red-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2" />}
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1 hover:shadow-sm transition">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-red-600">{item.year}</span>
                    <span className="text-xs text-gray-400">{item.quarter}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 font-heading mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── IMPACT NUMBERS ─── */}
      <SectionWrapper className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Our Impact</span>
            <h2 className="text-3xl lg:text-5xl font-semibold font-heading text-gray-900 mt-2">Impact in Numbers</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {impactStats.map((stat, i) => (
              <AnimatedCounter key={i} target={stat.target} suffix={stat.suffix} label={stat.label} icon={stat.icon} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── CERTIFICATIONS ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Certifications & Awards</span>
            <h2 className="text-3xl lg:text-5xl font-semibold font-heading text-gray-900 mt-2">Recognition & Compliance</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <cert.icon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 font-heading">{cert.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── CTA ─── */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
            <div className="relative z-10 p-8 sm:p-12 text-center">
              <h2 className="text-3xl lg:text-5xl font-semibold font-heading text-gray-900 mb-4">
                Join India&apos;s Cybersecurity Mission
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Partner with us to build a safer digital India. Whether you&apos;re an enterprise, government body, or investor, we&apos;d love to connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-red-600 text-white text-base font-semibold px-8 py-4 rounded-lg hover:bg-red-700 transition-all inline-flex items-center justify-center gap-2">
                  Get in Touch <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/funding" className="btn-secondary text-base px-8 py-4 justify-center">
                  Investment Opportunity <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
