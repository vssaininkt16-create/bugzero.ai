import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from '@/lib/blogPosts';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateArticleSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo';
import { Calendar, Clock, Tag, ArrowRight, ChevronRight, BookOpen, User } from 'lucide-react';

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | BugZero Cyber Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${slug}`,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      tags: post.tags,
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
      description: post.excerpt,
      slug,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: post.author,
      image: post.image,
    }),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      {/* ─── HERO ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] radial-glow-blue" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-cyber-blue transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-cyber-blue transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="trust-badge badge-blue text-xs">{post.category}</span>
            <span className="text-sm text-gray-400 flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            <span className="text-sm text-gray-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.datePublished).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-6 leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{post.author}</div>
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
            <article className="lg:col-span-2 prose prose-invert prose-headings:font-heading prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-cyber-blue max-w-none">
              {post.content.split('\n\n').map((block, i) => {
                if (block.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold font-heading text-white mt-10 mb-4">{block.slice(3)}</h2>;
                }
                if (block.startsWith('**') && block.endsWith('**')) {
                  return <p key={i} className="text-base font-semibold text-white mt-4">{block.slice(2, -2)}</p>;
                }
                if (block.includes('\n- ')) {
                  const [intro, ...items] = block.split('\n- ');
                  return (
                    <div key={i}>
                      {intro && <p className="text-gray-300 mb-2">{intro}</p>}
                      <ul className="space-y-2 list-none pl-0">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue mt-2 shrink-0" />
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return <p key={i} className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
              })}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="cyber-card rounded-xl p-5 sticky top-24">
                <h3 className="text-sm font-bold text-white font-heading mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-cyber-blue/5 border border-cyber-blue/10 text-gray-400">
                      <Tag className="w-3 h-3" />{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-cyber-border">
                  <h3 className="text-sm font-bold text-white font-heading mb-3">Need a Security Assessment?</h3>
                  <p className="text-xs text-gray-400 mb-3">Get a free security consultation from our certified experts.</p>
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
        <section className="py-12 sm:py-16 border-t border-cyber-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-white font-heading mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="cyber-card rounded-xl p-5 group hover:border-cyber-blue/40 transition-all block">
                  <span className="trust-badge badge-blue text-[10px] mb-3 inline-flex">{p.category}</span>
                  <h3 className="text-base font-bold text-white font-heading mb-2 group-hover:text-cyber-blue transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{p.excerpt}</p>
                  <span className="mt-3 text-xs text-cyber-blue flex items-center gap-1 font-medium">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
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
