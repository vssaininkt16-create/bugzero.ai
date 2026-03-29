'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Globe, Server, Cloud, Smartphone, Bug, Code, Database,
  Shield, ShieldCheck, BookOpen, Award, ChevronRight, ArrowRight,
  CheckCircle, Star, Zap, Crown, Building2, Lock
} from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import SectionWrapper from '@/components/SectionWrapper';

const services = [
  {
    title: 'Web Application VAPT',
    desc: 'Comprehensive vulnerability assessment and penetration testing for web applications. OWASP Top 10 coverage, business logic testing, and detailed remediation reports.',
    icon: Globe,
    price: '₹25,000',
    badge: 'Most Popular',
    badgeColor: 'badge-blue',
    features: ['OWASP Top 10 Testing', 'Business Logic Flaws', 'Authentication Bypass', 'SQL Injection & XSS', 'Detailed Report with POC'],
  },
  {
    title: 'API Security Testing',
    desc: 'In-depth security testing of REST and GraphQL APIs. Covers authentication, authorization, data exposure, and rate limiting vulnerabilities.',
    icon: Code,
    price: '₹20,000',
    badge: null,
    features: ['REST & GraphQL APIs', 'Auth Token Testing', 'IDOR & Data Exposure', 'Rate Limit Bypass', 'API Documentation Review'],
  },
  {
    title: 'Network Security Assessment',
    desc: 'Complete network infrastructure assessment including internal/external penetration testing, firewall review, and segmentation analysis.',
    icon: Server,
    price: '₹35,000',
    badge: 'Government Grade',
    badgeColor: 'badge-saffron',
    features: ['External Pen Testing', 'Internal Network Audit', 'Firewall Configuration', 'VLAN Segmentation', 'Wireless Security'],
  },
  {
    title: 'Cloud Security Audit',
    desc: 'Security assessment of cloud infrastructure on AWS, Azure, and GCP. Configuration review, IAM audit, and compliance checks.',
    icon: Cloud,
    price: '₹40,000',
    badge: 'Enterprise',
    badgeColor: 'badge-purple',
    features: ['AWS / Azure / GCP', 'IAM & Access Control', 'S3/Blob Misconfig', 'Compliance Mapping', 'Cost Optimization Tips'],
  },
  {
    title: 'Mobile App Security',
    desc: 'Security testing for Android and iOS applications including static analysis, dynamic analysis, and backend API testing.',
    icon: Smartphone,
    price: '₹30,000',
    badge: null,
    features: ['Android & iOS Apps', 'Static Analysis (SAST)', 'Dynamic Analysis (DAST)', 'Backend API Testing', 'Data Storage Security'],
  },
  {
    title: 'Bug Bounty Program Management',
    desc: 'Design, launch, and manage your bug bounty program. Triage, validate, and report vulnerabilities from security researchers worldwide.',
    icon: Bug,
    price: 'Custom',
    badge: null,
    features: ['Program Design', 'Policy & Scope Definition', 'Researcher Triage', 'Vulnerability Validation', 'Monthly Reporting'],
  },
  {
    title: 'Security Code Review',
    desc: 'Manual and automated source code review to identify security vulnerabilities in your application codebase.',
    icon: Code,
    price: 'Custom',
    badge: null,
    features: ['Manual Code Review', 'SAST Tool Integration', 'Secure Coding Guide', 'CI/CD Pipeline Security', 'Developer Training'],
  },
  {
    title: 'Database Security Assessment',
    desc: 'Comprehensive database security audit covering access controls, encryption, configuration hardening, and data protection.',
    icon: Database,
    price: 'Custom',
    badge: 'Government Grade',
    badgeColor: 'badge-saffron',
    features: ['Access Control Audit', 'Encryption Review', 'Configuration Hardening', 'Backup Security', 'Compliance Check'],
  },
  {
    title: 'Security Consulting & Compliance',
    desc: 'Expert consulting for ISO 27001, SOC 2, PCI DSS, HIPAA, and GDPR compliance. Gap analysis and implementation support.',
    icon: Shield,
    price: 'Custom',
    badge: null,
    features: ['ISO 27001 Compliance', 'SOC 2 Readiness', 'PCI DSS Audit', 'GDPR Assessment', 'Policy Development'],
  },
  {
    title: 'Cybersecurity Internship Program',
    desc: 'Structured internship program for aspiring cybersecurity professionals. Hands-on training with real-world projects.',
    icon: BookOpen,
    price: 'Contact Us',
    badge: 'Training',
    badgeColor: 'badge-green',
    features: ['Hands-on Training', 'Real Project Experience', 'Mentorship Program', 'Certification Prep', 'Placement Assistance'],
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    desc: 'For startups and small businesses',
    price: '₹25,000',
    period: 'per assessment',
    color: 'border-cyber-blue',
    icon: Zap,
    features: [
      'Single application VAPT',
      'OWASP Top 10 coverage',
      'Executive summary report',
      'Email support',
      '7-day turnaround',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    desc: 'For growing enterprises',
    price: '₹75,000',
    period: 'per quarter',
    color: 'border-cyber-purple',
    icon: Crown,
    features: [
      'Up to 3 application VAPTs',
      'Network security assessment',
      'Cloud configuration audit',
      'Detailed technical report',
      'Priority support',
      'Re-testing included',
    ],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Enterprise',
    desc: 'For large organizations & government',
    price: 'Custom',
    period: 'annual contract',
    color: 'border-cyber-saffron',
    icon: Building2,
    features: [
      'Unlimited assessments',
      'Dedicated security team',
      '24/7 SOC monitoring',
      'Compliance consulting',
      'Executive briefings',
      'On-site support',
      'SLA guaranteed',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] radial-glow-blue" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-sm font-medium mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            Comprehensive Cybersecurity Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6"
          >
            Elite Security <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            From penetration testing to compliance consulting, we offer end-to-end cybersecurity
            solutions trusted by enterprises and government organizations.
          </motion.p>
        </div>
      </section>

      <TrustBadges />

      {/* ─── SERVICES GRID ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-cyber-blue text-sm font-semibold tracking-wider uppercase">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">
              10 Specialized Security Services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="cyber-card rounded-xl p-6 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-cyber-blue" />
                  </div>
                  {service.badge && (
                    <span className={`trust-badge text-[10px] ${service.badgeColor}`}>
                      {service.badge === 'Most Popular' && <Star className="w-3 h-3" />}
                      {service.badge === 'Government Grade' && <Award className="w-3 h-3" />}
                      {service.badge === 'Enterprise' && <Crown className="w-3 h-3" />}
                      {service.badge === 'Training' && <BookOpen className="w-3 h-3" />}
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white font-heading mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{service.desc}</p>

                {/* Features */}
                <ul className="space-y-1.5 mb-4 flex-1">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-green shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-white font-heading">{service.price}</span>
                    {service.price !== 'Custom' && service.price !== 'Contact Us' && (
                      <span className="text-xs text-gray-500 ml-1">onwards</span>
                    )}
                  </div>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold text-cyber-blue hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Get Quote <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── PRICING TIERS ─── */}
      <SectionWrapper className="bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-cyber-purple text-sm font-semibold tracking-wider uppercase">Pricing Plans</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">
              Flexible Pricing for Every Scale
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Choose a plan that fits your security needs. All plans include detailed reporting and remediation guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative cyber-card rounded-xl p-6 flex flex-col ${
                  tier.popular ? 'border-cyber-purple/50 ring-1 ring-cyber-purple/20' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="trust-badge badge-purple text-xs">
                      <Star className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <div className="w-12 h-12 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center mx-auto mb-3">
                    <tier.icon className="w-6 h-6 text-cyber-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">{tier.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{tier.desc}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white font-heading">{tier.price}</span>
                    <span className="text-sm text-gray-500 block mt-1">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-cyber-green shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full py-3 rounded-lg text-center text-sm font-semibold transition-all ${
                    tier.popular
                      ? 'btn-primary justify-center'
                      : 'btn-secondary justify-center'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── CTA ─── */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20" />
            <div className="absolute inset-[1px] rounded-2xl bg-cyber-bg/80 backdrop-blur-xl" />

            <div className="relative z-10 p-8 sm:p-12 text-center">
              <Lock className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Our security experts will analyze your infrastructure and recommend the most effective security strategy.
                Free 30-minute consultation included.
              </p>
              <Link href="/contact" className="btn-primary text-base px-8 py-4 inline-flex">
                Request Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
