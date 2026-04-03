'use client';

import { 
  Building2, 
  Cloud, 
  ShoppingCart, 
  Activity, 
  BookOpen, 
  Server,
  ShieldCheck,
  Globe
} from 'lucide-react';

const industries = [
  { name: 'Fintech Companies', Icon: Building2 },
  { name: 'SaaS Platforms', Icon: Cloud },
  { name: 'E-commerce Brands', Icon: ShoppingCart },
  { name: 'Healthcare Systems', Icon: Activity },
  { name: 'EdTech Companies', Icon: BookOpen },
  { name: 'Enterprise IT Teams', Icon: Server },
  { name: 'Government Agencies', Icon: ShieldCheck },
  { name: 'Global Logistics', Icon: Globe },
];

export default function TrustedLogoStrip() {
  const infiniteIndustries = [...industries, ...industries, ...industries];

  return (
    <section className="pt-16 pb-12 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h3 className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest font-heading">
          Trusted by Businesses Across Industries
        </h3>
      </div>
      
      <div className="relative flex overflow-hidden group">
        {/* Fade Out Edge Gradients */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#020817] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#020817] to-transparent z-10 pointer-events-none" />

        {/* Animated Track */}
        <div className="flex items-center gap-6 md:gap-8 w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
          {infiniteIndustries.map((industry, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 px-6 py-3 md:py-3.5 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-default"
            >
              <industry.Icon className="w-5 h-5 text-gray-500 transition-colors" />
              <span className="text-sm md:text-base font-medium whitespace-nowrap">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-infinite-scroll {
          animation: custom-slide-left 50s linear infinite;
        }
        
        @keyframes custom-slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        
        /* Mobile speed adjustment */
        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation: custom-slide-left 60s linear infinite;
          }
        }
      `}} />
    </section>
  );
}
