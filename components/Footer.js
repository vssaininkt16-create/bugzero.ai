'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react';
import NewsletterForm from '@/components/NewsletterForm';

const footerLinks = {
  services: [
    { label: 'Web Application VAPT', href: '/services/web-application-vapt' },
    { label: 'Penetration Testing', href: '/services/penetration-testing' },
    { label: 'API Security Testing', href: '/services/api-security-testing' },
    { label: 'Network Security', href: '/services/network-security' },
    { label: 'Cloud Security Audit', href: '/services/cloud-security-audit' },
    { label: 'Mobile App Security', href: '/services/mobile-app-security' },
    { label: 'Bug Bounty Management', href: '/services/bug-bounty-management' },
    { label: 'Compliance Consulting', href: '/services/compliance-consulting' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'All Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Blog', href: '/blog' },
    { label: 'Government Funding', href: '/funding' },
    { label: 'Contact Us', href: '/contact' },
  ],
  resources: [
    { label: 'Free Security Scan', href: '/free-security-scan' },
    { label: 'Get Proposal', href: '/get-proposal' },
    { label: 'Book Consultation', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Responsible Disclosure', href: '/responsible-disclosure' },
  ],
};

const trustBadges = [
  'DPIIT Recognized',
  'ISO 27001',
  'OWASP Member',
  'NASSCOM Member',
  'Made in India',
];

export default function Footer() {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith('/portal') || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password');
  if (hideFooter) return null;

  return (
    <footer className="relative bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Trust badges */}
        <div className="py-6 border-b border-gray-200 overflow-hidden">
          <div className="flex items-center gap-6 justify-center flex-wrap">
            {trustBadges.map((badge, i) => (
              <span key={i} className="trust-badge badge-blue text-xs">
                <Shield className="w-3 h-3" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-7 h-7 text-red-600" />
              <span className="text-lg font-bold font-heading text-gray-900">Bug<span className="text-red-600">Zero</span></span>
            </Link>
            <p className="text-sm text-gray-700 mb-4 max-w-xs leading-relaxed">
              India&apos;s most trusted cybersecurity startup, securing the nation&apos;s digital future with elite security expertise.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span>contact@bugzero.solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span>+91-XXXXX-XXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>India</span>
              </div>
            </div>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-4">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/bugzero-cyber-solutions/', label: 'LinkedIn' },
                { Icon: Twitter, href: 'https://twitter.com/bugzerocyber', label: 'Twitter' },
                { Icon: Github, href: 'https://github.com/bugzerocyber', label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-200 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 font-heading">Cyber Threat Newsletter</h4>
              <NewsletterForm />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 font-heading">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-red-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 font-heading">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-red-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 font-heading">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1">
                    {link.label}
                    {link.href === '#' && <ArrowUpRight className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            &copy; {new Date().getFullYear()} BugZero Cyber Solutions. All rights reserved. Made with pride in India.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
            <Link href="/responsible-disclosure" className="hover:text-gray-600 transition-colors">Responsible Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
