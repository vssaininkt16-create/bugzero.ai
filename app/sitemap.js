import { siteConfig } from '@/lib/seo';

export default function sitemap() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/free-security-scan`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/vapt-basic-999`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/get-proposal`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/funding`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/responsible-disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const servicePages = [
    'web-application-vapt',
    'penetration-testing',
    'api-security-testing',
    'network-security',
    'cloud-security-audit',
    'mobile-app-security',
    'bug-bounty-management',
    'security-code-review',
    'database-security',
    'compliance-consulting',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogSlugs = [
    { slug: 'vapt-testing-guide-india-2025', priority: 0.8 },
    { slug: 'top-cybersecurity-threats-india-2025', priority: 0.8 },
    { slug: 'bug-bounty-programs-guide', priority: 0.7 },
    { slug: 'penetration-testing-vs-vulnerability-assessment', priority: 0.75 },
    { slug: 'cloud-security-best-practices-india', priority: 0.7 },
  ].map(({ slug, priority }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
  }));

  return [...staticPages, ...servicePages, ...blogSlugs];
}
