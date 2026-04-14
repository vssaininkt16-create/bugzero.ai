import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { pageMetadata, generateWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import {
  Building2, Heart, Globe, Shield, ArrowRight, ChevronRight,
  CheckCircle, ShieldCheck, Award, Zap, Lock
} from 'lucide-react';

export const metadata = {
  title: pageMetadata.solutions.title,
  description: pageMetadata.solutions.description,
  keywords: pageMetadata.solutions.keywords,
  alternates: { canonical: pageMetadata.solutions.canonical },
  openGraph: {
    title: pageMetadata.solutions.title,
    description: pageMetadata.solutions.description,
    url: pageMetadata.solutions.canonical,
  },
};

const solutions = [
  {
    id: 'bfsi',
    title: 'BFSI Cybersecurity',
    subtitle: 'Banking, Financial Services & Insurance',
    icon: Building2,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    description: 'Comprehensive cybersecurity solutions for banks, NBFCs, insurance companies, and financial institutions. RBI-compliant security audits, PCI DSS certification support, and 24/7 fraud monitoring.',
    challenges: ['RBI Cybersecurity Framework compliance', 'Core banking system security', 'UPI & payment gateway protection', 'Mobile banking app security', 'SWIFT network security'],
    services: ['VAPT for banking applications', 'PCI DSS compliance audit', 'ATM network security', 'Fraud detection system review', 'API security for fintech integrations'],
    compliance: ['RBI Guidelines', 'PCI DSS', 'ISO 27001', 'SEBI CSCRF'],
    relatedServices: [
      { label: 'Web Application VAPT', href: '/services/web-application-vapt' },
      { label: 'API Security Testing', href: '/services/api-security-testing' },
      { label: 'Compliance Consulting', href: '/services/compliance-consulting' },
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare Cybersecurity',
    subtitle: 'Hospitals, Clinics & Health Tech',
    icon: Heart,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    description: 'Specialized cybersecurity for hospitals, diagnostic labs, health tech platforms, and pharmaceutical companies. Protect patient data, medical devices, and critical healthcare infrastructure.',
    challenges: ['Patient data (PHI/ePHI) protection', 'Medical device IoT security', 'EHR/EMR system vulnerabilities', 'Hospital network segmentation', 'Ransomware targeting healthcare'],
    services: ['Health app security testing', 'Medical device security audit', 'Healthcare data compliance', 'Network security for hospital IT', 'Telemedicine platform security'],
    compliance: ['HIPAA', 'ISO 27001', 'DPDP Act 2023', 'MoHFW Guidelines'],
    relatedServices: [
      { label: 'Mobile App Security', href: '/services/mobile-app-security' },
      { label: 'Network Security Assessment', href: '/services/network-security' },
      { label: 'Compliance Consulting', href: '/services/compliance-consulting' },
    ],
  },
  {
    id: 'government',
    title: 'Government & PSU Security',
    subtitle: 'Central & State Government, PSUs',
    icon: Shield,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    description: 'Government-grade cybersecurity solutions for central ministries, state departments, PSUs, and critical national infrastructure. CERT-In compliant audits with highest security standards.',
    challenges: ['Critical infrastructure protection', 'Citizen data privacy', 'E-governance portal security', 'Supply chain security for government IT', 'State-sponsored threat actors'],
    services: ['CERT-In compliant security audits', 'Government portal VAPT', 'Critical infrastructure assessment', 'Aadhaar & UIDAI system security', 'NIC network security review'],
    compliance: ['CERT-In Guidelines', 'NCSP 2020', 'ISO 27001', 'DPDP Act 2023'],
    relatedServices: [
      { label: 'Network Security Assessment', href: '/services/network-security' },
      { label: 'Penetration Testing', href: '/services/penetration-testing' },
      { label: 'Compliance Consulting', href: '/services/compliance-consulting' },
    ],
  },
  {
    id: 'fintech',
    title: 'Fintech Cybersecurity',
    subtitle: 'Startups, Payment & Lending Platforms',
    icon: Zap,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    description: 'Tailored security for fintech startups, lending platforms, wealth management apps, and payment processors. Build security-first products that earn customer trust from day one.',
    challenges: ['Rapid development vs. security balance', 'API security for open banking', 'KYC/AML data protection', 'Fraud prevention systems', 'RBI fintech compliance'],
    services: ['Startup security program', 'API penetration testing', 'Bug bounty program setup', 'Security architecture review', 'Compliance readiness (PCI DSS, ISO 27001)'],
    compliance: ['RBI Fintech Guidelines', 'PCI DSS', 'SOC 2', 'ISO 27001'],
    relatedServices: [
      { label: 'API Security Testing', href: '/services/api-security-testing' },
      { label: 'Bug Bounty Management', href: '/services/bug-bounty-management' },
      { label: 'Mobile App Security', href: '/services/mobile-app-security' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail',
    subtitle: 'Online Retail, Marketplaces & D2C Brands',
    icon: Globe,
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    description: 'End-to-end security for e-commerce platforms, online marketplaces, and D2C brands. Protect customer payment data, prevent fraud, and ensure PCI DSS compliance.',
    challenges: ['Customer payment data protection', 'Account takeover (ATO) attacks', 'Bot attacks and inventory fraud', 'Third-party plugin vulnerabilities', 'Peak season DDoS protection'],
    services: ['E-commerce platform VAPT', 'Payment gateway security', 'Customer data protection audit', 'Fraud detection review', 'PCI DSS compliance assessment'],
    compliance: ['PCI DSS', 'DPDP Act 2023', 'ISO 27001', 'GDPR (for international)'],
    relatedServices: [
      { label: 'Web Application VAPT', href: '/services/web-application-vapt' },
      { label: 'API Security Testing', href: '/services/api-security-testing' },
      { label: 'Bug Bounty Management', href: '/services/bug-bounty-management' },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Security',
    subtitle: 'Large Corporations & Multinationals',
    icon: Award,
    color: 'text-gray-900',
    bg: 'bg-gray-50',
    border: 'border-white/10',
    description: 'Comprehensive enterprise security programs for large corporations, IT companies, and multinationals operating in India. Managed security services, dedicated security teams, and boardroom-ready reporting.',
    challenges: ['Complex hybrid IT infrastructure', 'Multi-cloud security governance', 'Insider threat management', 'Third-party vendor risk', 'Mergers & acquisitions security'],
    services: ['Enterprise security program', 'Managed VAPT services', 'Red team / Blue team exercises', 'Security awareness training', 'CISO advisory services'],
    compliance: ['ISO 27001', 'SOC 2', 'GDPR', 'DPDP Act 2023', 'Industry-specific'],
    relatedServices: [
      { label: 'Penetration Testing', href: '/services/penetration-testing' },
      { label: 'Cloud Security Audit', href: '/services/cloud-security-audit' },
      { label: 'Compliance Consulting', href: '/services/compliance-consulting' },
    ],
  },
];

export default function SolutionsPage() {
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/solutions', label: 'Solutions' },
  ];

  const schemas = [
    generateWebPageSchema({
      title: pageMetadata.solutions.title,
      description: pageMetadata.solutions.description,
      url: '/solutions',
      breadcrumbs,
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      {/* ─── HERO ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] " />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            Industry-Specific Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
            Cybersecurity <span className="gradient-text">Solutions</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored cybersecurity solutions for every industry. From BFSI to healthcare, government to fintech — we understand your sector&apos;s unique threats and compliance requirements.
          </p>
        </div>
      </section>

      {/* ─── SOLUTIONS ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {solutions.map((sol, i) => (
            <div key={sol.id} id={sol.id} className={`grid lg:grid-cols-2 gap-10 items-start ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={i % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <div className={`w-14 h-14 rounded-xl ${sol.bg} border ${sol.border} flex items-center justify-center mb-4`}>
                  <sol.icon className={`w-7 h-7 ${sol.color}`} />
                </div>
                <span className={`text-xs font-semibold tracking-wider uppercase ${sol.color}`}>{sol.subtitle}</span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-1 mb-4">{sol.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{sol.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Compliance We Address</h3>
                  <div className="flex flex-wrap gap-2">
                    {sol.compliance.map((c, j) => (
                      <span key={j} className="trust-badge badge-blue text-xs">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary inline-flex text-sm px-6 py-3">
                    Get {sol.title.split(' ')[0]} Security Assessment <ArrowRight className="w-4 h-4" />
                  </Link>
                  {sol.relatedServices && (
                    <div className="flex flex-wrap gap-2 mt-2 w-full">
                      {sol.relatedServices.map((srv) => (
                        <Link key={srv.href} href={srv.href} className="text-xs text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1 border border-gray-200 hover:border-red-200 rounded-lg px-3 py-1.5">
                          <CheckCircle className="w-3 h-3" /> {srv.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={`space-y-4 ${i % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-900 font-heading mb-3">Key Challenges We Solve</h3>
                  <ul className="space-y-2">
                    {sol.challenges.map((c, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <Lock className="w-3.5 h-3.5 text-red-600/70 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-900 font-heading mb-3">Services We Provide</h3>
                  <ul className="space-y-2">
                    {sol.services.map((s, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-red-50 to-gray-100" />
            <div className="absolute inset-[1px] rounded-2xl bg-gray-50 backdrop-blur-xl" />
            <div className="relative z-10 p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mb-4">Don&apos;t See Your Industry?</h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">We serve organizations across all sectors. Contact us to discuss your specific security requirements and get a custom solution.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-base px-8 py-4 justify-center">
                  Discuss Your Requirements <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="btn-secondary text-base px-8 py-4 justify-center">
                  View All Services <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
