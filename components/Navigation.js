'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, ChevronRight, ChevronDown, Globe, Server, Cloud, Smartphone, Bug, Code, Database, LogIn, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services', hasDropdown: true },
  { href: '/solutions', label: 'Solutions' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const serviceDropdown = [
  { href: '/services/web-application-vapt', label: 'Web Application VAPT', icon: Globe },
  { href: '/services/penetration-testing', label: 'Penetration Testing', icon: Shield },
  { href: '/services/api-security-testing', label: 'API Security Testing', icon: Code },
  { href: '/services/network-security', label: 'Network Security', icon: Server },
  { href: '/services/cloud-security-audit', label: 'Cloud Security Audit', icon: Cloud },
  { href: '/services/mobile-app-security', label: 'Mobile App Security', icon: Smartphone },
  { href: '/services/bug-bounty-management', label: 'Bug Bounty Management', icon: Bug },
  { href: '/services/compliance-consulting', label: 'Compliance Consulting', icon: Database },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Hide nav on portal and auth pages
  const hideNav = pathname.startsWith('/portal') || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password');
  if (hideNav) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-gray-50  border-b border-gray-200 shadow-sm'
          : 'bg-white border-b border-gray-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Shield className="w-8 h-8 text-red-600 transition-all" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-gray-900">Bug<span className="text-red-600">Zero</span></span>
                <span className="hidden sm:block text-[10px] text-gray-500 -mt-1 tracking-wider uppercase">Cyber Solutions</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${pathname.startsWith('/services')
                        ? 'text-red-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      {pathname.startsWith('/services') && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-600 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                        >
                          <div className="p-2">
                            <Link
                              href="/services"
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors mb-1"
                            >
                              All Cybersecurity Services <ChevronRight className="w-3 h-3 ml-auto" />
                            </Link>
                            {serviceDropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <item.icon className="w-4 h-4 text-gray-600 shrink-0" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${pathname === link.href
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              )}
            </div>

            {/* VAPT CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/vapt-basic-999"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-200"
              >
                <Zap className="w-3.5 h-3.5" />
                VAPT ₹999
              </a>
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/contact"
                className="bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all duration-200 inline-flex items-center gap-1.5"
              >
                Request Assessment
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname.startsWith('/services')
                          ? 'text-red-600 bg-red-50'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                      >
                        {link.label}
                      </Link>
                      <div className="pl-4 space-y-0.5 mt-1">
                        {serviceDropdown.slice(0, 4).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <item.icon className="w-3.5 h-3.5 text-gray-600" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="pt-3 pb-1 space-y-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:border-red-300 hover:text-red-600 transition-colors w-full"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <a href="/vapt-basic-999" className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors w-full">
                    <Zap className="w-4 h-4" />
                    VAPT Package ₹999
                  </a>
                  <Link href="/free-security-scan" className="btn-secondary text-sm w-full justify-center">
                    Free Security Scan
                  </Link>
                  <Link href="/contact" className="bg-red-600 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-red-700 transition-all w-full flex items-center justify-center gap-1.5">
                    Request Assessment <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
