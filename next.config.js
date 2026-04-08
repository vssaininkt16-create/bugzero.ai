/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://checkout.razorpay.com https://cdn.razorpay.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://checkout.razorpay.com",
      "font-src 'self' https://fonts.gstatic.com https://checkout.razorpay.com",
      "img-src 'self' data: blob: https: https://*.razorpay.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.supabase.co https://api.razorpay.com https://lumberjack.razorpay.com https://*.razorpay.com https://text.pollinations.ai https://openrouter.ai",
      "frame-src https://accounts.google.com https://api.razorpay.com https://*.razorpay.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://*.razorpay.com",
    ].join('; '),
  },
];

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/services/vapt', destination: '/services/web-application-vapt', permanent: true },
      { source: '/services/pentest', destination: '/services/penetration-testing', permanent: true },
      { source: '/services/cloud', destination: '/services/cloud-security-audit', permanent: true },
      { source: '/services/api', destination: '/services/api-security-testing', permanent: true },
      { source: '/services/mobile', destination: '/services/mobile-app-security', permanent: true },
      { source: '/services/network', destination: '/services/network-security', permanent: true },
      { source: '/services/compliance', destination: '/services/compliance-consulting', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-of-service', permanent: true },
      { source: '/disclosure', destination: '/responsible-disclosure', permanent: true },
      { source: '/scan', destination: '/free-security-scan', permanent: true },
      { source: '/vapt', destination: '/services/web-application-vapt', permanent: true },
      { source: '/pentest', destination: '/services/penetration-testing', permanent: true },
    ];
  },
};

module.exports = nextConfig;
