import ContactPageClient from '@/components/ContactPageClient';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  pageMetadata,
  generateWebPageSchema,
  siteConfig,
} from '@/lib/seo';

export const metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
  alternates: { canonical: pageMetadata.contact.canonical },
  openGraph: {
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    url: pageMetadata.contact.canonical,
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
  ];

  const contactPointSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact BugZero Cyber Solutions',
    description: pageMetadata.contact.description,
    url: pageMetadata.contact.canonical,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
  };

  const schemas = [
    contactPointSchema,
    generateWebPageSchema({
      title: pageMetadata.contact.title,
      description: pageMetadata.contact.description,
      url: '/contact',
      breadcrumbs,
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <ContactPageClient />
    </>
  );
}