import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from '@/lib/blogPosts';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateArticleSchema, generateBreadcrumbSchema, generateWebPageSchema, siteConfig } from '@/lib/seo';
import { Calendar, Clock, Tag, ArrowRight, ChevronRight, BookOpen, User, Shield } from 'lucide-react';

const categoryServiceLinks = {
  VAPT: [
    { label: 'Web Application VAPT', href: '/services/web-application-vapt' },
    { label: 'Penetration Testing', href: '/services/penetration-testing' },
    { label: 'Network Security Assessment', href: '/services/network-security' },
  ],
  'Threat Intelligence': [
    { label: 'Security Consulting', href: '/services/compliance-consulting' },
    { label: 'Penetration Testing', href: '/services/penetration-testing' },
    { label: 'Cloud Security Audit', href: '/services/cloud-security-audit' },
  ],
  'Bug Bounty': [
    { label: 'Bug Bounty Management', href: '/services/bug-bounty-management' },
    { label: 'Web Application VAPT', href: '/services/web-application-vapt' },
    { label: 'Responsible Disclosure', href: '/responsible-disclosure' },
  ],
  Education: [
    { label: 'Web Application VAPT', href: '/services/web-application-vapt' },
    { label: 'Penetration Testing', href: '/services/penetration-testing' },
    { label: 'All Services', href: '/services' },
  ],
  'Cloud Security': [
    { label: 'Cloud Security Audit', href: '/services/cloud-security-audit' },
    { label: 'Penetration Testing', href: '/services/penetration-testing' },
    { label: 'Compliance Consulting', href: '/services/compliance-consulting' },
  ],
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const title = post.metaTitle || `${post.title} | BugZero Blog`;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    keywords: post.tags.join(', ') + ', cybersecurity India, BugZero',
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog/${slug}`,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.image || '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image || '/opengraph-image.png'],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: `/blog/${slug}`, label: post.title },
  ];

  const schemas = [
    generateArticleSchema({
      title: post.title,
      description: post.metaDescription || post.excerpt,
      slug,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: post.author,
      image: post.image,
    }),
    generateWebPageSchema({
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: `/blog/${slug}`,
      breadcrumbs,
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      {/* ─── HERO ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-600 mb-8 flex-wrap">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-red-600 transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="trust-badge badge-blue text-xs">{post.category}</span>
            <span className="text-sm text-gray-600 flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            <span className="text-sm text-gray-600 flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.datePublished).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6 leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-red-50 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-900" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{post.author}</div>
              <div className="text-xs text-gray-500">BugZero Cyber Solutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Article body */}
            <article className="lg:col-span-2 prose  prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-red-600 max-w-none">
              {post.content.split('\n\n').map((block, i) => {
                if (block.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold font-heading text-gray-900 mt-10 mb-4">{block.slice(3)}</h2>;
                }
                if (block.startsWith('**') && block.endsWith('**')) {
                  return <p key={i} className="text-base font-semibold text-gray-900 mt-4">{block.slice(2, -2)}</p>;
                }
                if (block.includes('\n- ')) {
                  const [intro, ...items] = block.split('\n- ');
                  return (
                    <div key={i}>
                      {intro && <p className="text-gray-700 mb-2">{intro}</p>}
                      <ul className="space-y-2 list-none pl-0">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>') }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return <p key={i} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>') }} />;
              })}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 sticky top-24">
                <h3 className="text-sm font-bold text-gray-900 font-heading mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-gray-600">
                      <Tag className="w-3 h-3" />{tag}
                    </span>
                  ))}
                </div>

                {categoryServiceLinks[post.category] && (
                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 font-heading mb-3 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-red-600" /> Related Services
                    </h3>
                    <ul className="space-y-1.5 mb-4">
                      {categoryServiceLinks[post.category].map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-xs text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1.5">
                            <ChevronRight className="w-3 h-3" />{link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900 font-heading mb-3">Need a Security Assessment?</h3>
                  <p className="text-xs text-gray-700 mb-3">Get a free security consultation from our certified experts.</p>
                  <Link href="/contact" className="btn-primary w-full justify-center text-sm py-2.5">
                    Get Free Assessment <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── RELATED POSTS ─── */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 font-heading mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 group hover:border-red-200 transition-all block">
                  <span className="trust-badge badge-blue text-[10px] mb-3 inline-flex">{p.category}</span>
                  <h3 className="text-base font-bold text-gray-900 font-heading mb-2 group-hover:text-red-600 transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-700 line-clamp-2">{p.excerpt}</p>
                  <span className="mt-3 text-xs text-red-600 flex items-center gap-1 font-medium">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/blog" className="btn-secondary inline-flex">
                View All Articles <BookOpen className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
