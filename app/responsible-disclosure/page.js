import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { pageMetadata, generateWebPageSchema } from '@/lib/seo';
import { Bug, ChevronRight, Shield, CheckCircle, AlertTriangle, Mail } from 'lucide-react';

export const metadata = {
  title: pageMetadata.responsibleDisclosure.title,
  description: pageMetadata.responsibleDisclosure.description,
  keywords: pageMetadata.responsibleDisclosure.keywords,
  alternates: { canonical: pageMetadata.responsibleDisclosure.canonical },
};

const scope = [
  'bugzero.ai — main website and all subdomains',
  'bugzero.solutions — company domain',
  'All BugZero-owned web applications and APIs',
  'BugZero client portal and dashboard systems',
];

const outOfScope = [
  'Denial of Service (DoS/DDoS) attacks',
  'Social engineering attacks against BugZero staff',
  'Physical security attacks',
  'Vulnerabilities in third-party services we use',
  'Automated scanning without prior permission',
  'Vulnerabilities requiring unlikely user interaction',
];

const process = [
  { step: '1', title: 'Discover', desc: 'Find a potential security vulnerability in BugZero systems within the defined scope.' },
  { step: '2', title: 'Document', desc: 'Document the vulnerability with steps to reproduce, potential impact, and any supporting evidence (screenshots, PoC).' },
  { step: '3', title: 'Report', desc: 'Submit your report to security@bugzero.solutions with the subject line "Responsible Disclosure: [Brief Description]".' },
  { step: '4', title: 'Acknowledge', desc: "We'll acknowledge receipt within 24 hours and provide a tracking reference number." },
  { step: '5', title: 'Triage', desc: "Our security team will investigate and validate your finding within 7 business days." },
  { step: '6', title: 'Resolution', desc: "We'll work to remediate validated vulnerabilities and notify you when fixed. Recognition provided upon request." },
];

export default function ResponsibleDisclosurePage() {
  const schemas = [
    generateWebPageSchema({
      title: pageMetadata.responsibleDisclosure.title,
      description: pageMetadata.responsibleDisclosure.description,
      url: '/responsible-disclosure',
      breadcrumbs: [
        { href: '/', label: 'Home' },
        { href: '/responsible-disclosure', label: 'Responsible Disclosure' },
      ],
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] radial-glow-blue" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-cyber-blue transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Responsible Disclosure</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Bug className="w-8 h-8 text-cyber-green" />
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">Responsible Disclosure Policy</h1>
          </div>
          <p className="text-gray-400 text-sm mb-4">Last Updated: March 2025</p>
          <p className="text-gray-300 leading-relaxed">
            BugZero Cyber Solutions values the security research community. We believe that working with skilled security researchers to identify and fix vulnerabilities helps make our systems and our clients safer. If you have discovered a security vulnerability in our systems, we encourage you to report it responsibly.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Safe Harbor */}
          <div className="cyber-card rounded-xl p-6 border-cyber-green/30 bg-cyber-green/5">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-cyber-green shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold text-white font-heading mb-2">Safe Harbor</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  If you conduct security research in good faith, follow this policy, and report vulnerabilities responsibly, BugZero Cyber Solutions will not pursue legal action against you. We consider your research authorized and will work with you to understand and resolve the issue quickly.
                </p>
              </div>
            </div>
          </div>

          {/* Disclosure Process */}
          <div className="cyber-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white font-heading mb-6">Disclosure Process</h2>
            <div className="space-y-4">
              {process.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyber-blue/20 border border-cyber-blue/30 flex items-center justify-center shrink-0 text-cyber-blue text-sm font-bold">{item.step}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-white font-heading">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="cyber-card rounded-xl p-6">
              <h2 className="text-base font-bold text-white font-heading mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyber-green" /> In Scope
              </h2>
              <ul className="space-y-2">
                {scope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyber-green shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cyber-card rounded-xl p-6">
              <h2 className="text-base font-bold text-white font-heading mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" /> Out of Scope
              </h2>
              <ul className="space-y-2">
                {outOfScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-400/70 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guidelines */}
          <div className="cyber-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white font-heading mb-4">Researcher Guidelines</h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-3">
              <p>To qualify for safe harbor protection and potential recognition, please follow these guidelines:</p>
              <ul className="space-y-2 pl-2">
                {[
                  'Do not access, modify, or delete data that does not belong to you',
                  'Do not exploit vulnerabilities beyond what is necessary to demonstrate the issue',
                  'Do not perform testing that could impact service availability',
                  'Do not share vulnerability details publicly until we have confirmed the fix',
                  'Provide detailed reproduction steps to help us verify and fix quickly',
                  'Give us reasonable time (90 days) to address the issue before public disclosure',
                ].map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue mt-2 shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recognition */}
          <div className="cyber-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white font-heading mb-3">Recognition & Rewards</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              While this is a non-monetary vulnerability disclosure program (VDP), we recognize the valuable contribution of security researchers:
            </p>
            <ul className="space-y-2">
              {[
                'Public acknowledgment in our Security Hall of Fame (with your consent)',
                'LinkedIn recommendation from BugZero leadership',
                'Certificate of appreciation for responsible disclosure',
                'Potential future collaboration opportunities',
              ].map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyber-green shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Report Button */}
          <div className="cyber-card rounded-xl p-6 text-center">
            <Bug className="w-12 h-12 text-cyber-green mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white font-heading mb-2">Found a Vulnerability?</h2>
            <p className="text-gray-400 text-sm mb-6">Report it responsibly and help us make BugZero and the internet safer.</p>
            <a href="mailto:security@bugzero.solutions?subject=Responsible%20Disclosure:%20[Brief%20Description]" className="btn-primary inline-flex text-base px-8 py-4">
              <Mail className="w-5 h-5" /> Report to security@bugzero.solutions
            </a>
            <p className="text-xs text-gray-500 mt-3">We acknowledge all reports within 24 hours</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/privacy-policy" className="btn-secondary text-sm px-6 py-3 justify-center">Privacy Policy</Link>
            <Link href="/terms-of-service" className="btn-secondary text-sm px-6 py-3 justify-center">Terms of Service</Link>
          </div>
        </div>
      </section>
    </>
  );
}
