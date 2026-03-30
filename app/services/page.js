import ServicesPageClient from '@/components/ServicesPageClient';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  pageMetadata,
  generateServiceSchema,
  generateWebPageSchema,
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

  const schemas = [
    generateWebPageSchema({
      title: pageMetadata.services.title,
      description: pageMetadata.services.description,
      url: '/services',
      breadcrumbs,
    }),
    generateServiceSchema({ name: 'Web Application VAPT', description: 'Comprehensive web application vulnerability assessment and penetration testing covering OWASP Top 10.', url: '/services/web-application-vapt', price: '25000', category: 'VAPT' }),
    generateServiceSchema({ name: 'Penetration Testing', description: 'Advanced manual penetration testing simulating real-world attacks for enterprises and government.', url: '/services/penetration-testing', price: '45000', category: 'Penetration Testing' }),
    generateServiceSchema({ name: 'Cloud Security Audit', description: 'Security assessment of AWS, Azure, and GCP cloud infrastructure including IAM and configuration review.', url: '/services/cloud-security-audit', price: '40000', category: 'Cloud Security' }),
    generateServiceSchema({ name: 'Bug Bounty Management', description: 'Design, launch, and manage vulnerability reward programs for organizations.', url: '/services/bug-bounty-management', category: 'Bug Bounty' }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <ServicesPageClient />
    </>
  );
}