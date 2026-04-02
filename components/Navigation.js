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

const VAPT_BADGE_STYLE = 'ml-1.5 inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30';

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cyber-bg/90 backdrop-blur-xl border-b border-cyber-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Shield className="w-8 h-8 text-cyber-blue transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
                <div className="absolute -inset-1 bg-cyber-blue/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-white">Bug<span className="text-cyber-blue">Zero</span></span>
                <span className="hidden sm:block text-[10px] text-cyber-muted -mt-1 tracking-wider uppercase">Cyber Solutions</span>
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
                      className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        pathname.startsWith('/services')
                          ? 'text-cyber-blue bg-cyber-blue/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      {pathname.startsWith('/services') && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyber-blue rounded-full"
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
                          className="absolute top-full left-0 mt-1 w-64 bg-cyber-bg/95 backdrop-blur-xl border border-cyber-border rounded-xl shadow-xl shadow-black/40 overflow-hidden"
                        >
                          <div className="p-2">
                            <Link
                              href="/services"
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-cyber-blue hover:bg-cyber-blue/10 rounded-lg transition-colors mb-1"
                            >
                              All Cybersecurity Services <ChevronRight className="w-3 h-3 ml-auto" />
                            </Link>
                            {serviceDropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <item.icon className="w-4 h-4 text-cyber-blue/70 shrink-0" />
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
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      pathname === link.href
                        ? 'text-cyber-blue bg-cyber-blue/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyber-blue rounded-full"
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
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:bg-cyber-blue/20 transition-all duration-300"
              >
                <Zap className="w-3.5 h-3.5" />
                VAPT ₹999
              </a>
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/contact"
                className="btn-primary text-sm"
              >
                Request Assessment
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="absolute top-16 left-0 right-0 bg-cyber-bg/95 backdrop-blur-xl border-b border-cyber-border">
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          pathname.startsWith('/services')
                            ? 'text-cyber-blue bg-cyber-blue/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                      <div className="pl-4 space-y-0.5 mt-1">
                        {serviceDropdown.slice(0, 4).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <item.icon className="w-3.5 h-3.5 text-cyber-blue/60" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? 'text-cyber-blue bg-cyber-blue/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="pt-3 pb-1 space-y-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 hover:bg-cyber-blue/20 transition-colors w-full"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <a href="/vapt-basic-999" className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 hover:bg-cyber-blue/20 transition-colors w-full">
                    <Zap className="w-4 h-4" />
                    VAPT Package ₹999
                  </a>
                <Link href="/free-security-scan" className="btn-secondary text-sm w-full justify-center">
                    Free Security Scan
                  </Link>
                  <Link href="/contact" className="btn-primary text-sm w-full justify-center">
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
