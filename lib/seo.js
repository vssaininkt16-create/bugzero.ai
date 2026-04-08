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
    title: 'BugZero Cyber | VAPT & Pen Testing India | DPIIT',
    description:
      "India's #1 DPIIT-recognized cybersecurity startup. Expert VAPT, pen testing, cloud security & bug bounty for enterprises and government across India. 500+ security audits completed.",
    keywords:
      'cybersecurity company India, VAPT India, penetration testing services India, bug bounty management, cloud security audit, cybersecurity startup India, DPIIT recognized cybersecurity, ethical hacking India, CERT-In compliance, cybersecurity services India 2025',
    canonical: 'https://bugzero.solutions/',
  },
  services: {
    title: 'Cybersecurity Services India | VAPT & Pen Testing',
    description:
      'Expert cybersecurity services in India: Web VAPT, API security, network pen testing, cloud audit & compliance consulting. Starting ₹25,000. Free 30-min consultation.',
    keywords:
      'cybersecurity services India, web application VAPT, API security testing India, network penetration testing India, cloud security audit, mobile app security testing, bug bounty management India, ISO 27001 compliance India',
    canonical: 'https://bugzero.solutions/services',
  },
  solutions: {
    title: 'Cybersecurity Solutions India | BFSI, Healthcare, Govt',
    description:
      'Industry-tailored cybersecurity solutions for BFSI, healthcare, government & fintech in India. Managed security, compliance frameworks, VAPT & 24/7 SOC monitoring.',
    keywords:
      'cybersecurity solutions India, banking security solutions India, healthcare cybersecurity India, government cybersecurity India, fintech security solutions, enterprise security India, BFSI security audit',
    canonical: 'https://bugzero.solutions/solutions',
  },
  about: {
    title: "About BugZero | India's Top Cybersecurity Startup",
    description:
      "DPIIT-recognized cybersecurity startup. Certified ethical hackers (CEH, OSCP, CISSP) protecting Indian enterprises & government. ISO 27001 | NASSCOM | OWASP member.",
    keywords:
      'about BugZero cybersecurity, cybersecurity startup India DPIIT, certified ethical hackers India, OSCP CISSP certified India, cybersecurity company India, ethical hacking firm India',
    canonical: 'https://bugzero.solutions/about',
  },
  contact: {
    title: 'Contact BugZero | Free Cybersecurity Assessment India',
    description:
      "Get a free cybersecurity assessment from India's top security experts. Contact BugZero for VAPT, pen testing & consulting. We respond within 2 hours.",
    keywords:
      'contact cybersecurity company India, free security assessment India, request VAPT quote, cybersecurity consultation India, security audit India, free pen testing quote India',
    canonical: 'https://bugzero.solutions/contact',
  },
  blog: {
    title: 'Cybersecurity Blog | VAPT & Security Insights | BugZero',
    description:
      "Expert cybersecurity insights, VAPT guides, pen testing tutorials & threat intelligence from India's leading security experts at BugZero. Updated regularly.",
    keywords:
      'cybersecurity blog India, VAPT guide India, penetration testing tutorial, cybersecurity tips India, threat intelligence India, ethical hacking blog, security vulnerability blog India 2025',
    canonical: 'https://bugzero.solutions/blog',
  },
  freeScan: {
    title: 'Free Website Security Scan | Instant Vulnerability Check',
    description:
      'Instant free security scan for your website. Detect vulnerabilities, misconfigurations & security risks in seconds. No registration required. Powered by BugZero.',
    keywords:
      'free website security scan India, free vulnerability scanner India, website security check free, free VAPT scan online, website vulnerability test India, online security scanner',
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

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-image.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
      addressRegion: 'India',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.5937',
      longitude: '78.9629',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    areaServed: [
      { '@type': 'Country', name: 'India' },
    ],
    knowsAbout: [
      'Cybersecurity',
      'Vulnerability Assessment and Penetration Testing',
      'Bug Bounty Programs',
      'Cloud Security',
      'ISO 27001 Compliance',
      'PCI DSS Compliance',
      'Web Application Security',
      'API Security Testing',
      'Network Security Assessment',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.github,
    ],
  };
}

export function generateAggregateRatingSchema({ ratingValue = '4.9', reviewCount = '50', bestRating = '5' } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating,
      worstRating: '1',
    },
  };
}

export function generateHowToSchema({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: `${siteConfig.url}${step.url}` }),
    })),
    tool: [
      { '@type': 'HowToTool', name: 'BugZero Security Platform' },
    ],
  };
}

export function generateProductSchema({ name, description, price, currency = 'INR', url, sku }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku: sku || name.toLowerCase().replace(/\s+/g, '-'),
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}${url}`,
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
    ...(price && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '50',
        bestRating: '5',
      },
    }),
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
