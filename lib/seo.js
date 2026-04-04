// ─── Site-wide SEO Configuration ───────────────────────────────────────────
export const siteConfig = {
  name: 'BugZero Cyber Solutions',
  shortName: 'BugZero',
  tagline: "Securing India's Digital Future",
  url: 'https://bugzero.solutions',
  description:
    "India's most trusted cybersecurity startup. DPIIT Recognized. Expert VAPT, penetration testing, cloud security, bug bounty, and compliance services for enterprises and government organizations across India.",
  email: 'contact@bugzero.solutions',
  phone: '+91-XXXXX-XXXXX',
  foundingYear: '2024',
  social: {
    linkedin: 'https://www.linkedin.com/company/bugzero-cyber-solutions/',
    twitter: 'https://twitter.com/bugzerocyber',
    github: 'https://github.com/bugzerocyber',
  },
  twitterHandle: '@bugzerocyber',
  defaultOgImage: '/og-image.png',
  logo: '/logo.png',
};

// ─── Per-page Metadata ───────────────────────────────────────────────────────
export const pageMetadata = {
  home: {
    title: 'BugZero Cyber Solutions | #1 Cybersecurity Company India | VAPT & Pen Testing',
    description:
      "India's most trusted cybersecurity startup. Expert VAPT, penetration testing, cloud security, bug bounty management & compliance consulting. DPIIT Recognized. 500+ security audits. Protecting enterprises & government.",
    keywords:
      'cybersecurity company India, VAPT India, penetration testing services India, bug bounty management, cloud security audit, cybersecurity startup India, DPIIT recognized cybersecurity, ethical hacking India',
    canonical: 'https://bugzero.solutions/',
  },
  services: {
    title: 'Cybersecurity Services India | VAPT, Penetration Testing, Cloud Security | BugZero',
    description:
      'Comprehensive cybersecurity services: Web Application VAPT, API security testing, network penetration testing, cloud security audit, mobile app security & bug bounty management. Starting ₹25,000. Free consultation.',
    keywords:
      'cybersecurity services India, web application VAPT, API security testing, network penetration testing, cloud security audit India, mobile app security testing, bug bounty management India',
    canonical: 'https://bugzero.solutions/services',
  },
  solutions: {
    title: 'Cybersecurity Solutions by Industry | BFSI, Healthcare, Government | BugZero',
    description:
      'Industry-specific cybersecurity solutions for BFSI, healthcare, government, fintech, and enterprises. Tailored security strategies, compliance frameworks, and managed security services across India.',
    keywords:
      'cybersecurity solutions India, banking security solutions, healthcare cybersecurity India, government cybersecurity, fintech security solutions, enterprise security India, BFSI security',
    canonical: 'https://bugzero.solutions/solutions',
  },
  about: {
    title: "About BugZero Cyber Solutions | India's Leading Cybersecurity Startup",
    description:
      "India's fastest-growing cybersecurity startup. DPIIT Recognized, ISO 27001, NASSCOM & OWASP member. Our certified ethical hackers (CEH, OSCP, CISSP) protect enterprises and government organizations across 15+ states.",
    keywords:
      'about BugZero cybersecurity, cybersecurity startup India DPIIT, certified ethical hackers India, OSCP CISSP certified India, cybersecurity company about us',
    canonical: 'https://bugzero.solutions/about',
  },
  contact: {
    title: 'Contact BugZero | Request Free Cybersecurity Assessment India',
    description:
      "Get a free cybersecurity assessment from India's top security experts. Contact BugZero Cyber Solutions for VAPT, penetration testing, and security consulting. 2-hour response guarantee.",
    keywords:
      'contact cybersecurity company India, free security assessment India, request VAPT quote, cybersecurity consultation India, security audit request India',
    canonical: 'https://bugzero.solutions/contact',
  },
  blog: {
    title: 'Cybersecurity Blog | VAPT Insights, Security Tips & Threat Intelligence | BugZero',
    description:
      "Expert cybersecurity insights, VAPT guides, penetration testing tutorials, threat intelligence reports, and security best practices from India's leading cybersecurity experts at BugZero.",
    keywords:
      'cybersecurity blog India, VAPT guide, penetration testing tutorial, cybersecurity tips India, threat intelligence blog, security vulnerability blog, ethical hacking blog',
    canonical: 'https://bugzero.solutions/blog',
  },
  freeScan: {
    title: 'Free Website Security Scan | Instant Vulnerability Check | BugZero',
    description:
      "Get an instant free security scan for your website. Detect vulnerabilities, misconfigurations, and security risks in seconds. No registration required. Powered by BugZero's security engine.",
    keywords:
      'free website security scan India, free vulnerability scanner, website security check India, free VAPT scan online, website vulnerability test free',
    canonical: 'https://bugzero.solutions/free-security-scan',
  },
  privacyPolicy: {
    title: 'Privacy Policy | BugZero Cyber Solutions',
    description:
      'Read the privacy policy of BugZero Cyber Solutions. We are committed to protecting your personal data and maintaining full transparency about how we collect, use, and safeguard your information.',
    keywords: 'BugZero privacy policy, cybersecurity company privacy, data protection policy India',
    canonical: 'https://bugzero.solutions/privacy-policy',
  },
  termsOfService: {
    title: 'Terms of Service | BugZero Cyber Solutions',
    description:
      'Review the terms and conditions governing the use of BugZero Cyber Solutions services, website, and security assessments. Clear, fair, and compliant with Indian law.',
    keywords: 'BugZero terms of service, cybersecurity service terms, security audit terms and conditions',
    canonical: 'https://bugzero.solutions/terms-of-service',
  },
  responsibleDisclosure: {
    title: 'Responsible Disclosure Policy | BugZero Cyber Solutions',
    description:
      'BugZero Cyber Solutions responsible disclosure policy for security researchers. Report vulnerabilities responsibly and help us secure the digital ecosystem. Bug bounty and CVE reporting guidelines.',
    keywords:
      'responsible disclosure cybersecurity India, vulnerability disclosure policy, bug bounty reporting, CVE disclosure India',
    canonical: 'https://bugzero.solutions/responsible-disclosure',
  },
};

// ─── JSON-LD Schema Generators ───────────────────────────────────────────────

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, 'BugZero', 'BugZero Cyber'],
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      '@id': `${siteConfig.url}/#logo`,
      url: `${siteConfig.url}/logo.png`,
      contentUrl: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
      caption: siteConfig.name,
    },
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/og-image.png`,
    },
    description: siteConfig.description,
    foundingDate: siteConfig.foundingYear,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: siteConfig.email,
        telephone: siteConfig.phone,
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteConfig.email,
        availableLanguage: 'English',
      },
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.github,
    ],
    knowsAbout: [
      'Cybersecurity',
      'Vulnerability Assessment and Penetration Testing',
      'Bug Bounty Programs',
      'Cloud Security',
      'Network Security',
      'Web Application Security',
      'Mobile Application Security',
      'API Security Testing',
      'Information Security',
      'ISO 27001 Compliance',
      'SOC 2 Compliance',
      'PCI DSS Compliance',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cybersecurity Services India',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Application VAPT', url: `${siteConfig.url}/services/web-application-vapt` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Penetration Testing', url: `${siteConfig.url}/services/penetration-testing` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'API Security Testing', url: `${siteConfig.url}/services/api-security-testing` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Security Audit', url: `${siteConfig.url}/services/cloud-security-audit` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Security', url: `${siteConfig.url}/services/mobile-app-security` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bug Bounty Management', url: `${siteConfig.url}/services/bug-bounty-management` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Network Security Assessment', url: `${siteConfig.url}/services/network-security` } },
      ],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${siteConfig.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function generateServiceSchema({ name, description, url, price, category }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: category || 'Cybersecurity',
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/contact`,
      },
    }),
  };
}

export function generateArticleSchema({ title, description, slug, datePublished, dateModified, author, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteConfig.url}/blog/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    image: image || `${siteConfig.url}/og-image.png`,
    author: {
      '@type': 'Person',
      name: author || 'BugZero Security Team',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${slug}`,
    },
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function generateWebPageSchema({ title, description, url, breadcrumbs }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}${url}#webpage`,
    url: `${siteConfig.url}${url}`,
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#organization` },
    breadcrumb: generateBreadcrumbSchema(breadcrumbs),
  };
}
