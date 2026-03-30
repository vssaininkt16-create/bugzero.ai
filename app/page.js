import HomePageClient from '@/components/HomePageClient';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  pageMetadata,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
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
  { question: 'What is VAPT testing?', answer: 'VAPT (Vulnerability Assessment and Penetration Testing) is a security testing methodology that identifies and exploits vulnerabilities in your systems. BugZero offers comprehensive VAPT services for web applications, APIs, networks, and mobile apps across India.' },
  { question: 'How much does a cybersecurity audit cost in India?', answer: 'BugZero cybersecurity audits start at Rs 25,000 for a single web application VAPT. Enterprise packages with multiple assessments start at Rs 75,000 per quarter. Contact us for a custom quote.' },
  { question: 'Is BugZero DPIIT recognized?', answer: 'Yes, BugZero Cyber Solutions is officially recognized by DPIIT (Department for Promotion of Industry and Internal Trade) under the Startup India initiative.' },
  { question: 'What cybersecurity services does BugZero offer?', answer: 'BugZero offers Web Application VAPT, API Security Testing, Network Security Assessment, Cloud Security Audit, Mobile App Security, Bug Bounty Management, Security Code Review, Database Security, and Compliance Consulting (ISO 27001, PCI DSS, SOC 2).' },
  { question: 'How quickly does BugZero respond to security incidents?', answer: 'BugZero provides a 2-hour response guarantee for all client inquiries and security incidents. Our 24/7 SOC team is always available for enterprise clients.' },
];

export default function HomePage() {
  const schemas = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
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
