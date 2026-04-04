'use client';

import {
  Building2,
  Cloud,
  ShoppingCart,
  Activity,
  BookOpen,
  Server,
  ShieldCheck,
  Globe,
  Cpu,
  Lock,
  Wifi,
  Database,
  Landmark,
  Truck,
  Briefcase
} from 'lucide-react';

const row1Industries = [
  { name: 'Fintech Companies', Icon: Building2, color: '#3b82f6' },
  { name: 'SaaS Platforms', Icon: Cloud, color: '#a855f7' },
  { name: 'E-commerce Brands', Icon: ShoppingCart, color: '#ec4899' },
  { name: 'Healthcare Systems', Icon: Activity, color: '#10b981' },
  { name: 'EdTech Companies', Icon: BookOpen, color: '#f59e0b' },
  { name: 'Enterprise IT Teams', Icon: Server, color: '#06b6d4' },
  { name: 'Government Agencies', Icon: ShieldCheck, color: '#6366f1' },
  { name: 'Global Logistics', Icon: Globe, color: '#f97316' },
];

const row2Industries = [
  { name: 'Cybersecurity Firms', Icon: Lock, color: '#ef4444' },
  { name: 'Telecom Providers', Icon: Wifi, color: '#14b8a6' },
  { name: 'AI & ML Startups', Icon: Cpu, color: '#8b5cf6' },
  { name: 'Data Analytics', Icon: Database, color: '#0ea5e9' },
  { name: 'Banking & Finance', Icon: Landmark, color: '#eab308' },
  { name: 'Supply Chain', Icon: Truck, color: '#22c55e' },
  { name: 'Consulting & IT Services', Icon: Briefcase, color: '#d946ef' },
  { name: 'Cloud Infrastructure', Icon: Server, color: '#38bdf8' },
];

export default function TrustedLogoStrip() {
  const infiniteRow1 = [...row1Industries, ...row1Industries, ...row1Industries];
  const infiniteRow2 = [...row2Industries, ...row2Industries, ...row2Industries];

  return (
    <section className="pt-16 pb-12 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h3 className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest font-heading">
          Trusted by Businesses Across Industries
        </h3>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative flex overflow-hidden group/row1">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#020817] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#020817] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-6 md:gap-8 w-max animate-scroll-row1 group-hover/row1:[animation-play-state:paused]">
          {infiniteRow1.map((industry, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 px-6 py-3 md:py-3.5 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-default"
            >
              <industry.Icon className="w-5 h-5 transition-colors" style={{ color: industry.color }} />
              <span className="text-sm md:text-base font-medium whitespace-nowrap">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls left (offset start) */}
      <div className="relative flex overflow-hidden group/row2 mt-4 md:mt-6">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#020817] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#020817] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-6 md:gap-8 w-max animate-scroll-row2 group-hover/row2:[animation-play-state:paused]">
          {infiniteRow2.map((industry, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 px-6 py-3 md:py-3.5 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-default"
            >
              <industry.Icon className="w-5 h-5 transition-colors" style={{ color: industry.color }} />
              <span className="text-sm md:text-base font-medium whitespace-nowrap">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* Row 1: scroll left from 0 */
        .animate-scroll-row1 {
          animation: scroll-row1 50s linear infinite;
        }
        @keyframes scroll-row1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }

        /* Row 2: scroll left from offset (starts shifted, creating visual stagger) */
        .animate-scroll-row2 {
          animation: scroll-row2 45s linear infinite;
        }
        @keyframes scroll-row2 {
          0% { transform: translateX(-33.333333%); }
          100% { transform: translateX(0); }
        }

        /* Mobile speed adjustment */
        @media (max-width: 768px) {
          .animate-scroll-row1 {
            animation: scroll-row1 60s linear infinite;
          }
          .animate-scroll-row2 {
            animation: scroll-row2 55s linear infinite;
          }
        }
      `}} />
    </section>
  );
}
