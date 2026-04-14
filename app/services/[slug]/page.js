import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/servicesData';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  generateServiceSchema,
  generateFAQSchema,
  generateWebPageSchema,
  siteConfig,
} from '@/lib/seo';
import {
  Globe, Server, Cloud, Smartphone, Bug, Code, Database,
  Shield, ShieldCheck, CheckCircle, ArrowRight, ChevronRight,
  Star, Lock, Mail
} from 'lucide-react';

const iconMap = { Globe, Server, Cloud, Smartphone, Bug, Code, Database, Shield, ShieldCheck, Lock };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Shield;

  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: `/services/${slug}`, label: service.title },
  ];

  const schemas = [
    generateWebPageSchema({
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${slug}`,
      breadcrumbs,
    }),
    generateServiceSchema({
      name: service.title,
      description: service.metaDescription,
      url: `/services/${slug}`,
      price: service.price,
      category: service.category,
    }),
    ...(service.faq ? [generateFAQSchema(service.faq)] : []),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      {/* ─── HERO ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] " />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-red-600 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {service.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-medium mb-4">
                  <Star className="w-3.5 h-3.5" /> {service.badge}
                </span>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900 leading-tight">
                  {service.title}
                </h1>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{service.summary}</p>
              <div className="flex items-center gap-4 mb-8">
                {service.price && (
                  <div>
                    <span className="text-2xl font-bold text-gray-900 font-heading">{service.priceDisplay}</span>
                    <span className="text-sm text-gray-500 ml-1">onwards</span>
                  </div>
                )}
                {!service.price && (
                  <span className="text-xl font-bold text-red-600 font-heading">Custom Pricing</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4 justify-center">
                  Request Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="btn-secondary text-base px-8 py-4 justify-center">
                  All Services <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Quick info card */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 lg:mt-0">
              <h2 className="text-lg font-bold text-gray-900 font-heading mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" /> What&apos;s Included
              </h2>
              <ul className="space-y-2.5">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-700 mb-3">Need a custom scope? Talk to our experts.</p>
                <a href="mailto:contact@bugzero.solutions" className="flex items-center gap-2 text-sm text-red-600 hover:underline">
                  <Mail className="w-4 h-4" /> contact@bugzero.solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE TEST ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">Coverage</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-2 mb-6">What We Test & Cover</h2>
              <ul className="space-y-3">
                {service.whatWeTest.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-red-700 text-sm font-semibold tracking-wider uppercase">About This Service</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-2 mb-6">Service Overview</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {service.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">FAQ</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-2">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
                  <h3 className="text-base font-semibold text-gray-900 font-heading mb-2">{item.question}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-red-50 to-red-50" />
            <div className="absolute inset-[1px] rounded-2xl bg-gray-50 " />
            <div className="relative z-10 p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mb-4">
                Ready to Get Started with {service.shortTitle}?
              </h2>
              <p className="text-gray-700 mb-8 max-w-xl mx-auto">
                Our certified security experts will analyze your requirements and provide a detailed proposal within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-base px-8 py-4 justify-center">
                  Request Free Consultation <ArrowRight className="w-5 h-5" />
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
