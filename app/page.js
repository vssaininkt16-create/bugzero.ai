import HomePageClient from '@/components/HomePageClient';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  pageMetadata,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from '@/lib/seo';

export const metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  alternates: { canonical: pageMetadata.home.canonical },
  openGraph: {
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    url: pageMetadata.home.canonical,
    type: 'website',
  },
};

const homeFAQs = [
  {
    question: 'What is VAPT testing and why does my business need it?',
    answer: 'VAPT (Vulnerability Assessment and Penetration Testing) is a comprehensive security testing methodology combining automated scanning and manual exploitation to identify real vulnerabilities in your systems. CERT-In now mandates periodic VAPT for organizations in critical sectors. BugZero offers VAPT for web applications, APIs, networks, mobile apps, and cloud infrastructure across India, starting at ₹25,000.',
  },
  {
    question: 'How much does a cybersecurity audit cost in India?',
    answer: 'BugZero cybersecurity audits start at ₹25,000 for a single web application VAPT. API security testing starts at ₹20,000, network assessments at ₹35,000, and cloud security audits at ₹40,000. Enterprise quarterly packages start at ₹75,000 covering up to 3 application VAPTs. Contact us for a custom quote.',
  },
  {
    question: 'Is BugZero DPIIT recognized? What certifications do your testers hold?',
    answer: 'Yes, BugZero Cyber Solutions is officially recognized by DPIIT (Department for Promotion of Industry and Internal Trade) under the Startup India initiative. Our ethical hackers hold industry certifications including CEH (Certified Ethical Hacker), OSCP (Offensive Security Certified Professional), CISSP, and AWS Security Specialty.',
  },
  {
    question: 'What cybersecurity services does BugZero offer?',
    answer: 'BugZero offers 10 specialized cybersecurity services: Web Application VAPT, Penetration Testing, API Security Testing, Network Security Assessment, Cloud Security Audit (AWS/Azure/GCP), Mobile App Security (Android/iOS), Bug Bounty Program Management, Security Code Review, Database Security Assessment, and Compliance Consulting for ISO 27001, PCI DSS, SOC 2, GDPR, and CERT-In guidelines.',
  },
  {
    question: 'How quickly does BugZero respond and how long does a VAPT take?',
    answer: 'BugZero provides a 2-hour response guarantee for all client inquiries. A standard web application VAPT takes 3-7 business days. Network assessments take 5-10 days. Enterprise-level full-scope penetration tests take 2-4 weeks. All reports include detailed remediation guidance and one round of re-testing.',
  },
  {
    question: 'Does BugZero help with CERT-In and RBI compliance?',
    answer: 'Yes, BugZero helps organizations meet CERT-In cybersecurity directives including mandatory 6-hour incident reporting, RBI cybersecurity framework for banks and NBFCs, SEBI guidelines for financial entities, and DPDP Act (Digital Personal Data Protection Act) 2023 compliance. We serve government, BFSI, healthcare, fintech, and enterprise sectors across India.',
  },
];

export default function HomePage() {
  const schemas = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema([{ href: '/', label: 'Home' }]),
    generateFAQSchema(homeFAQs),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <HomePageClient />
    </>
  );
}
