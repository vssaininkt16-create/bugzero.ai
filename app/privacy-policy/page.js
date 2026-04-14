import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { pageMetadata, generateWebPageSchema } from '@/lib/seo';
import { Shield, ChevronRight } from 'lucide-react';

export const metadata = {
  title: pageMetadata.privacyPolicy.title,
  description: pageMetadata.privacyPolicy.description,
  keywords: pageMetadata.privacyPolicy.keywords,
  alternates: { canonical: pageMetadata.privacyPolicy.canonical },
};

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect the following types of information when you use our website or services:

**Personal Information:** Name, email address, phone number, and company name when you fill out contact forms or request assessments.

**Usage Data:** IP address, browser type, pages visited, time spent on pages, and referring URLs through analytics tools.

**Communication Data:** Messages and correspondence when you contact us via email, forms, or chat.

**Technical Data:** Security assessment data collected during engagements, which is handled under strict confidentiality agreements.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use collected information for the following purposes:

- To respond to your inquiries and provide requested cybersecurity services
- To send service proposals, reports, and security recommendations
- To improve our website and service quality
- To send relevant cybersecurity updates and newsletters (with your consent)
- To comply with legal obligations under Indian law
- To prevent fraud and ensure the security of our systems

We do NOT sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: '3. Data Protection & Security',
    content: `As a cybersecurity company, we practice what we preach. Your data is protected by:

- End-to-end encryption for all data in transit (TLS 1.3)
- Encrypted storage for all personal and client data
- Role-based access control — only authorized personnel access client data
- Regular security audits of our own systems
- Strict data retention policies — client data deleted after project completion unless retention is required by law
- ISO 27001-aligned information security management practices`,
  },
  {
    title: '4. Data Sharing',
    content: `We may share your information only in the following limited circumstances:

**Service Providers:** Trusted third-party service providers (e.g., email, hosting, analytics) who process data on our behalf under strict data processing agreements.

**Legal Requirements:** When required by Indian law, court orders, or regulatory authorities including CERT-In.

**Business Transfers:** In the event of a merger or acquisition, your data may be transferred with appropriate protections.

We never share client security assessment data, vulnerability findings, or confidential business information.`,
  },
  {
    title: '5. Cookies & Tracking',
    content: `Our website uses cookies and similar technologies to:

- Maintain session state and website functionality
- Analyze traffic patterns via Google Analytics (anonymized)
- Remember your preferences

You can control cookie settings through your browser. Disabling cookies may affect website functionality. We do not use advertising cookies or cross-site tracking.`,
  },
  {
    title: '6. Your Rights Under DPDP Act 2023',
    content: `Under India's Digital Personal Data Protection Act 2023, you have the right to:

- **Access:** Request a copy of personal data we hold about you
- **Correction:** Request correction of inaccurate personal data
- **Erasure:** Request deletion of your personal data
- **Grievance Redressal:** Contact our Data Protection Officer for complaints

To exercise these rights, contact us at: privacy@bugzero.solutions

We will respond to all valid requests within 30 days.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain personal data only as long as necessary:

- Contact form submissions: 2 years from last interaction
- Client project data: Duration of engagement + 1 year (or as required by law)
- Marketing data: Until you unsubscribe
- Legal records: As required by Indian law (typically 7 years)

Security assessment reports are retained for the agreed period specified in the service agreement.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `Our services are directed at businesses and organizations, not individuals under 18 years of age. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a minor, please contact us immediately.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. We will notify you of material changes by posting the updated policy on our website with a revised date. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '10. Contact Us',
    content: `For privacy-related inquiries, requests, or complaints:

**Data Protection Officer**
BugZero Cyber Solutions
Email: privacy@bugzero.solutions
General: contact@bugzero.solutions

We take all privacy concerns seriously and will respond within 5 business days.`,
  },
];

export default function PrivacyPolicyPage() {
  const schemas = [
    generateWebPageSchema({
      title: pageMetadata.privacyPolicy.title,
      description: pageMetadata.privacyPolicy.description,
      url: '/privacy-policy',
      breadcrumbs: [
        { href: '/', label: 'Home' },
        { href: '/privacy-policy', label: 'Privacy Policy' },
      ],
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900">Privacy Policy</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-700 text-sm">Last Updated: March 2025 | Effective Date: January 2025</p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            BugZero Cyber Solutions (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data in compliance with India&apos;s Digital Personal Data Protection Act 2023 and applicable cybersecurity regulations.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 font-heading mb-4">{section.title}</h2>
              <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                {section.content.split('\n\n').map((para, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>').replace(/\n/g, '<br/>') }} />
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/terms-of-service" className="btn-secondary text-sm px-6 py-3 justify-center">Terms of Service</Link>
            <Link href="/responsible-disclosure" className="btn-secondary text-sm px-6 py-3 justify-center">Responsible Disclosure</Link>
            <Link href="/contact" className="btn-primary text-sm px-6 py-3 justify-center">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
