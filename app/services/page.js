import ServicesPageClient from '@/components/ServicesPageClient';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  pageMetadata,
  generateServiceSchema,
  generateWebPageSchema,
  generateFAQSchema,
  generateHowToSchema,
} from '@/lib/seo';

export const metadata = {
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
  keywords: pageMetadata.services.keywords,
  alternates: { canonical: pageMetadata.services.canonical },
  openGraph: {
    title: pageMetadata.services.title,
    description: pageMetadata.services.description,
    url: pageMetadata.services.canonical,
  },
};

export default function ServicesPage() {
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Cybersecurity Services' },
  ];

  const howToSchema = generateHowToSchema({
    name: 'How to Get a Cybersecurity Assessment in India',
    description: 'A step-by-step guide to getting a professional VAPT or cybersecurity assessment from BugZero in India.',
    steps: [
      { name: 'Request a Free Consultation', text: 'Contact BugZero via the form or email. Our experts respond within 2 hours to understand your security requirements.', url: '/contact' },
      { name: 'Define Scope and Requirements', text: 'Our security engineers work with you to define the assessment scope — which applications, networks, or cloud infrastructure to test.', url: '/contact' },
      { name: 'Receive a Custom Proposal', text: 'Get a detailed proposal with methodology, timeline, deliverables, and pricing within 24 hours of scope discussion.', url: '/get-proposal' },
      { name: 'Assessment Execution', text: 'Our certified ethical hackers (CEH, OSCP) conduct the security assessment following OWASP, PTES, and NIST methodologies.', url: '/services' },
      { name: 'Receive Detailed Reports', text: 'Get executive summary and technical reports with CVSS-scored findings, proof of concept, and risk-prioritized remediation roadmap.', url: '/services' },
      { name: 'Remediation and Re-testing', text: 'After you fix the vulnerabilities, BugZero performs a free re-test to verify all issues are resolved and issues a clean certificate.', url: '/contact' },
    ],
  });

  const servicesFAQs = [
    { question: 'What is the difference between VAPT and penetration testing?', answer: 'VAPT combines Vulnerability Assessment (automated scanning) with Penetration Testing (manual exploitation). Penetration testing alone is purely manual, simulating advanced adversarial attacks. VAPT is ideal for most businesses; penetration testing is recommended for high-value systems or regulatory requirements.' },
    { question: 'How much do BugZero cybersecurity services cost?', answer: 'BugZero services start at ₹20,000 for API security testing, ₹25,000 for web application VAPT, ₹30,000 for mobile app security, ₹35,000 for network assessment, and ₹40,000 for cloud security audit. Enterprise packages start at ₹75,000/quarter. Compliance consulting and bug bounty management are custom-priced.' },
    { question: 'Which industries does BugZero serve?', answer: 'BugZero serves BFSI (banking, insurance, fintech), healthcare, government, e-commerce, telecom, education, and IT companies across India. We have experience with CERT-In, RBI, SEBI, and IRDAI compliance requirements.' },
    { question: 'Is re-testing included in the VAPT engagement?', answer: 'Yes. All BugZero VAPT engagements include one round of re-testing after you remediate the identified vulnerabilities, at no additional cost.' },
  ];

  const schemas = [
    generateWebPageSchema({
      title: pageMetadata.services.title,
      description: pageMetadata.services.description,
      url: '/services',
      breadcrumbs,
    }),
    howToSchema,
    generateFAQSchema(servicesFAQs),
    generateServiceSchema({ name: 'Web Application VAPT', description: 'Comprehensive web application vulnerability assessment and penetration testing covering OWASP Top 10.', url: '/services/web-application-vapt', price: '25000', category: 'VAPT' }),
    generateServiceSchema({ name: 'Penetration Testing', description: 'Advanced manual penetration testing simulating real-world attacks for enterprises and government.', url: '/services/penetration-testing', price: '45000', category: 'Penetration Testing' }),
    generateServiceSchema({ name: 'API Security Testing', description: 'REST, GraphQL, and SOAP API security testing covering OWASP API Top 10 vulnerabilities.', url: '/services/api-security-testing', price: '20000', category: 'API Security' }),
    generateServiceSchema({ name: 'Network Security Assessment', description: 'Complete network infrastructure penetration testing and security assessment.', url: '/services/network-security', price: '35000', category: 'Network Security' }),
    generateServiceSchema({ name: 'Cloud Security Audit', description: 'Security assessment of AWS, Azure, and GCP cloud infrastructure including IAM and configuration review.', url: '/services/cloud-security-audit', price: '40000', category: 'Cloud Security' }),
    generateServiceSchema({ name: 'Mobile App Security Testing', description: 'Android and iOS mobile application security testing following OWASP Mobile Top 10.', url: '/services/mobile-app-security', price: '30000', category: 'Mobile Security' }),
    generateServiceSchema({ name: 'Bug Bounty Management', description: 'Design, launch, and manage vulnerability reward programs for organizations.', url: '/services/bug-bounty-management', category: 'Bug Bounty' }),
    generateServiceSchema({ name: 'ISO 27001 Compliance Consulting', description: 'Expert consulting for ISO 27001, SOC 2, PCI DSS, GDPR, and HIPAA compliance in India.', url: '/services/compliance-consulting', category: 'Compliance' }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <ServicesPageClient />
    </>
  );
}