import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
};

export const metadata = {
  metadataBase: new URL('https://bugzero.solutions'),
  title: {
    default: 'BugZero Cyber | #1 Cybersecurity Company India | VAPT',
    template: '%s | BugZero',
  },
  description:
    "India's #1 DPIIT-recognized cybersecurity startup. Expert VAPT, pen testing, cloud security & bug bounty for enterprises and government. 500+ audits completed.",
  keywords: [
    'cybersecurity company India',
    'VAPT testing India',
    'penetration testing India',
    'bug bounty India',
    'cloud security audit India',
    'web application security testing',
    'network security assessment India',
    'cybersecurity startup India',
    'ethical hacking services India',
    'information security consulting India',
    'DPIIT recognized cybersecurity',
    'ISO 27001 compliance India',
    'CERT-In compliance India',
    'VAPT services India 2025',
    'cybersecurity services India',
    'security audit India',
    'OWASP testing India',
    'PCI DSS compliance India',
    'SOC 2 readiness India',
    'red team testing India',
  ],
  authors: [{ name: 'BugZero Cyber Solutions', url: 'https://bugzero.solutions' }],
  creator: 'BugZero Cyber Solutions',
  publisher: 'BugZero Cyber Solutions',
  category: 'Cybersecurity',
  classification: 'Business/Technology',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bugzero.solutions',
    siteName: 'BugZero Cyber Solutions',
    title: 'BugZero Cyber Solutions | #1 Cybersecurity Company India',
    description:
      "India's most trusted cybersecurity startup. Expert VAPT, penetration testing, cloud security & bug bounty services. DPIIT Recognized.",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: "BugZero Cyber Solutions - Securing India's Digital Future",
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bugzerocyber',
    creator: '@bugzerocyber',
    title: 'BugZero Cyber Solutions | #1 Cybersecurity Company India',
    description:
      "India's most trusted cybersecurity startup. Expert VAPT, penetration testing, cloud security & bug bounty services.",
    images: ['/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://bugzero.solutions',
  },
  verification: {},
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#00BFFF' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#000d1a',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
        <link rel="dns-prefetch" href="https://cdn.razorpay.com" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <Navigation />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
