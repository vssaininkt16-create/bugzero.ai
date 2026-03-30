import AboutPageClient from '@/components/AboutPageClient';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  pageMetadata,
  generateOrganizationSchema,
  generateWebPageSchema,
} from '@/lib/seo';

export const metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,
  alternates: { canonical: pageMetadata.about.canonical },
  openGraph: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    url: pageMetadata.about.canonical,
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateWebPageSchema({
      title: pageMetadata.about.title,
      description: pageMetadata.about.description,
      url: '/about',
      breadcrumbs,
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <AboutPageClient />
    </>
  );
}