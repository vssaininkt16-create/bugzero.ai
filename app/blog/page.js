import Link from 'next/link';
import { blogPosts } from '@/lib/blogPosts';
import SchemaMarkup from '@/components/SchemaMarkup';
import { pageMetadata, generateWebPageSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo';
import { Calendar, Clock, Tag, ArrowRight, ChevronRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: pageMetadata.blog.title,
  description: pageMetadata.blog.description,
  keywords: pageMetadata.blog.keywords,
  alternates: { canonical: pageMetadata.blog.canonical },
  openGraph: {
    title: pageMetadata.blog.title,
    description: pageMetadata.blog.description,
    url: pageMetadata.blog.canonical,
  },
};

const categories = ['All', 'VAPT', 'Threat Intelligence', 'Bug Bounty', 'Cloud Security', 'Education'];

export default function BlogPage() {
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
  ];

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'BugZero Cybersecurity Blog',
    description: pageMetadata.blog.description,
    url: `${siteConfig.url}/blog`,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.datePublished,
      author: { '@type': 'Person', name: post.author },
    })),
  };

  const schemas = [
    generateWebPageSchema({
      title: pageMetadata.blog.title,
      description: pageMetadata.blog.description,
      url: '/blog',
      breadcrumbs,
    }),
    blogListSchema,
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      {/* ─── HERO ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] radial-glow-blue" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Cybersecurity Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-6">
            Security <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Expert cybersecurity insights, VAPT guides, threat intelligence, and security best practices from India&apos;s leading security team.
          </p>
        </div>
      </section>

      {/* ─── POSTS GRID ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured posts */}
          {blogPosts.filter((p) => p.featured).length > 0 && (
            <div className="mb-16">
              <h2 className="text-xl font-bold text-white font-heading mb-6">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.filter((p) => p.featured).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="cyber-card rounded-xl p-6 group hover:border-cyber-blue/40 transition-all block">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="trust-badge badge-blue text-[10px]">{post.category}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-heading mb-3 group-hover:text-cyber-blue transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(post.datePublished).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <span className="text-sm text-cyber-blue flex items-center gap-1 font-medium">Read More <ArrowRight className="w-4 h-4" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All posts */}
          <h2 className="text-xl font-bold text-white font-heading mb-6">All Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="cyber-card rounded-xl p-6 group hover:border-cyber-blue/40 transition-all block flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="trust-badge badge-blue text-[10px]">{post.category}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white font-heading mb-2 group-hover:text-cyber-blue transition-colors leading-snug flex-1">{post.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-cyber-blue/5 border border-cyber-blue/10 text-gray-400">
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-cyber-border">
                  <span className="text-xs text-gray-500">{new Date(post.datePublished).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className="text-xs text-cyber-blue flex items-center gap-1 font-medium">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20" />
            <div className="absolute inset-[1px] rounded-2xl bg-cyber-bg/80 backdrop-blur-xl" />
            <div className="relative z-10 p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-4">Want a Free Security Assessment?</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">Apply what you&apos;ve learned. Let our experts assess your security posture and give you a personalized roadmap.</p>
              <Link href="/contact" className="btn-primary text-base px-8 py-4 inline-flex">
                Get Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
