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
  { name: 'Fintech Companies', Icon: Building2 },
  { name: 'SaaS Platforms', Icon: Cloud },
  { name: 'E-commerce Brands', Icon: ShoppingCart },
  { name: 'Healthcare Systems', Icon: Activity },
  { name: 'EdTech Companies', Icon: BookOpen },
  { name: 'Enterprise IT Teams', Icon: Server },
  { name: 'Government Agencies', Icon: ShieldCheck },
  { name: 'Global Logistics', Icon: Globe },
];

const row2Industries = [
  { name: 'Cybersecurity Firms', Icon: Lock },
  { name: 'Telecom Providers', Icon: Wifi },
  { name: 'AI & ML Startups', Icon: Cpu },
  { name: 'Data Analytics', Icon: Database },
  { name: 'Banking & Finance', Icon: Landmark },
  { name: 'Supply Chain', Icon: Truck },
  { name: 'Consulting & IT Services', Icon: Briefcase },
  { name: 'Cloud Infrastructure', Icon: Server },
];

export default function TrustedLogoStrip() {
  const infiniteRow1 = [...row1Industries, ...row1Industries, ...row1Industries];
  const infiniteRow2 = [...row2Industries, ...row2Industries, ...row2Industries];

  return (
    <section className="pt-16 pb-12 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <h3 className="text-center text-sm font-medium text-gray-900 uppercase tracking-widest font-heading">
          Trusted by Businesses Across Industries
        </h3>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative flex overflow-hidden group/row1">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-6 md:gap-8 w-max animate-scroll-row1 group-hover/row1:[animation-play-state:paused]">
          {infiniteRow1.map((industry, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 px-6 py-3 md:py-3.5 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:shadow-sm transition-all duration-300 cursor-default"
            >
              <industry.Icon className="w-5 h-5 text-gray-600 transition-colors" />
              <span className="text-sm md:text-base font-medium whitespace-nowrap">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative flex overflow-hidden group/row2 mt-4 md:mt-6">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-6 md:gap-8 w-max animate-scroll-row2 group-hover/row2:[animation-play-state:paused]">
          {infiniteRow2.map((industry, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 px-6 py-3 md:py-3.5 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:shadow-sm transition-all duration-300 cursor-default"
            >
              <industry.Icon className="w-5 h-5 text-gray-600 transition-colors" />
              <span className="text-sm md:text-base font-medium whitespace-nowrap">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-scroll-row1 {
          animation: scroll-row1 50s linear infinite;
        }
        @keyframes scroll-row1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }

        .animate-scroll-row2 {
          animation: scroll-row2 45s linear infinite;
        }
        @keyframes scroll-row2 {
          0% { transform: translateX(-33.333333%); }
          100% { transform: translateX(0); }
        }

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
