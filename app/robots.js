import { siteConfig } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/'],
        disallow: ['/admin/', '/api/', '/portal/', '/account/', '/dashboard/'],
      },
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: [
          '/admin/',
          '/api/',
          '/portal/',
          '/account/',
          '/dashboard/',
          '/_next/webpack-hmr',
        ],
      },
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 2,
        allow: '/',
        disallow: ['/admin/', '/api/', '/portal/'],
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 2,
        allow: '/',
        disallow: ['/admin/', '/api/', '/portal/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
