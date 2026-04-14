import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { pageMetadata, generateWebPageSchema } from '@/lib/seo';
import { FileText, ChevronRight } from 'lucide-react';

export const metadata = {
  title: pageMetadata.termsOfService.title,
  description: pageMetadata.termsOfService.description,
  keywords: pageMetadata.termsOfService.keywords,
  alternates: { canonical: pageMetadata.termsOfService.canonical },
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing the BugZero Cyber Solutions website (bugzero.solutions) or engaging our cybersecurity services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.

These terms constitute a legally binding agreement between you (the client or website visitor) and BugZero Cyber Solutions, a DPIIT-recognized startup incorporated under Indian law.`,
  },
  {
    title: '2. Services Description',
    content: `BugZero Cyber Solutions provides professional cybersecurity services including but not limited to:

- Vulnerability Assessment and Penetration Testing (VAPT)
- Web, mobile, API, network, and cloud security testing
- Bug bounty program management
- Security consulting and compliance services
- Security awareness training

All services are delivered by certified security professionals and governed by individual service agreements or statements of work (SOWs) executed prior to engagement.`,
  },
  {
    title: '3. Authorized Testing & Scope',
    content: `**Explicit Written Authorization Required:** All security testing services require explicit written authorization from the authorized owner of the systems being tested. BugZero will not conduct any security testing without a signed engagement agreement.

**Scope Limitation:** Testing is strictly limited to the scope defined in the signed service agreement. Testing any systems outside the agreed scope is prohibited and may be illegal.

**Client Responsibility:** The client warrants that they have full legal authority to authorize security testing of the systems within scope. BugZero bears no liability for unauthorized testing based on incorrect client representations.`,
  },
  {
    title: '4. Confidentiality',
    content: `Both parties agree to maintain strict confidentiality:

- All security findings, vulnerability reports, and assessment results are confidential
- BugZero will not disclose client information to third parties without written consent
- Clients agree not to disclose BugZero's proprietary methodologies, tools, or processes
- Confidentiality obligations survive termination of the service agreement

A separate Non-Disclosure Agreement (NDA) may be executed for sensitive engagements.`,
  },
  {
    title: '5. Payment Terms',
    content: `- **Invoicing:** Invoices are issued upon project commencement or milestone completion as specified in the SOW
- **Payment Schedule:** 50% advance payment required before project start; balance due upon report delivery
- **Late Payment:** Overdue invoices accrue interest at 2% per month
- **Taxes:** All fees are exclusive of GST, which will be charged at applicable rates
- **Refunds:** No refunds after security testing has commenced, as the work product (vulnerability findings) cannot be returned`,
  },
  {
    title: '6. Intellectual Property',
    content: `- **Client Systems:** All intellectual property in client systems remains with the client
- **BugZero Tools & Methodology:** BugZero retains ownership of all proprietary tools, scripts, and testing methodologies
- **Reports:** Security assessment reports are the property of the client upon full payment
- **Anonymized Data:** BugZero may use anonymized, non-identifiable security data for research and statistics`,
  },
  {
    title: '7. Limitation of Liability',
    content: `To the maximum extent permitted by Indian law:

- BugZero's total liability for any claim shall not exceed the fees paid for the specific engagement
- BugZero is not liable for indirect, incidental, or consequential damages
- BugZero is not liable for security incidents that occur after the assessment if recommendations were not implemented
- BugZero is not liable for vulnerabilities not discovered during the agreed scope of testing

These limitations reflect a fair allocation of risk and are a fundamental basis of the service pricing.`,
  },
  {
    title: '8. Prohibited Uses',
    content: `You may not use BugZero services or website to:

- Test systems you do not own or have authorization to test
- Conduct illegal security activities
- Infringe upon the rights of third parties
- Violate any applicable Indian or international law
- Attempt to hack or compromise BugZero's own systems or infrastructure

Violation of these terms will result in immediate service termination and may be reported to law enforcement authorities.`,
  },
  {
    title: '9. Governing Law & Dispute Resolution',
    content: `These Terms are governed by the laws of India. Any disputes arising from these Terms shall be:

1. First attempted to be resolved through good-faith negotiation
2. Submitted to mediation if negotiation fails
3. Resolved through arbitration under the Arbitration and Conciliation Act, 1996 if mediation fails

The courts of [City, India] shall have jurisdiction for any matters requiring judicial intervention.`,
  },
  {
    title: '10. Changes to Terms',
    content: `BugZero reserves the right to modify these Terms at any time. Material changes will be communicated via email or prominent website notice at least 30 days before taking effect. Continued use of services after changes constitutes acceptance.`,
  },
];

export default function TermsOfServicePage() {
  const schemas = [
    generateWebPageSchema({
      title: pageMetadata.termsOfService.title,
      description: pageMetadata.termsOfService.description,
      url: '/terms-of-service',
      breadcrumbs: [
        { href: '/', label: 'Home' },
        { href: '/terms-of-service', label: 'Terms of Service' },
      ],
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900">Terms of Service</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-red-700" />
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-700 text-sm">Last Updated: March 2025 | Effective Date: January 2025</p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Please read these Terms of Service carefully before using BugZero Cyber Solutions&apos; website or engaging our cybersecurity services. These terms govern the relationship between BugZero Cyber Solutions and our clients and website visitors.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
            <Link href="/privacy-policy" className="btn-secondary text-sm px-6 py-3 justify-center">Privacy Policy</Link>
            <Link href="/responsible-disclosure" className="btn-secondary text-sm px-6 py-3 justify-center">Responsible Disclosure</Link>
            <Link href="/contact" className="btn-primary text-sm px-6 py-3 justify-center">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
