import { SkeletonBox, SkeletonText, SkeletonIconBox, SkeletonBadge } from '@/components/Skeleton';

function ServiceCardSkeleton() {
  return (
    <div className="skeleton-card rounded-xl p-6 flex flex-col">
      {/* Icon + badge row */}
      <div className="flex items-start justify-between mb-4">
        <SkeletonIconBox />
        <SkeletonBadge className="w-20 h-6" />
      </div>

      {/* Title */}
      <SkeletonText className="w-3/4 h-5 mb-2" />

      {/* Description */}
      <SkeletonText lines={3} className="mb-4" lastLineWidth="w-2/3" />

      {/* Feature list */}
      <div className="space-y-2 mb-4 flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="skeleton w-3.5 h-3.5 rounded-full shrink-0" />
            <div className="skeleton h-3 rounded-md" style={{ width: `${55 + i * 8}%` }} />
          </div>
        ))}
      </div>

      {/* Price + link row */}
      <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
        <div className="skeleton h-6 w-20 rounded-md" />
        <div className="skeleton h-4 w-24 rounded-md" />
      </div>
    </div>
  );
}

function PricingCardSkeleton({ highlighted = false }) {
  return (
    <div className={`skeleton-card rounded-xl p-6 flex flex-col ${highlighted ? 'ring-1 ring-cyber-purple/20' : ''}`}>
      {/* Icon */}
      <div className="flex flex-col items-center mb-6 pt-2 space-y-3">
        <SkeletonIconBox className="mx-auto" />
        <SkeletonText className="w-24 h-5" />
        <SkeletonText className="w-36 h-3" />
        <div className="mt-2 space-y-1.5">
          <div className="skeleton h-8 w-28 rounded-md mx-auto" />
          <div className="skeleton h-3 w-24 rounded-md mx-auto" />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2.5 mb-6 flex-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="skeleton w-4 h-4 rounded-full shrink-0" />
            <div className="skeleton h-3.5 rounded-md" style={{ width: `${60 + i * 5}%` }} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="skeleton h-10 rounded-lg w-full" />
    </div>
  );
}

export default function ServiceCardsSkeleton({ showPricing = false }) {
  return (
    <>
      {/* Section header */}
      <div className="text-center mb-14 space-y-3">
        <div className="skeleton h-4 w-40 rounded-md mx-auto" />
        <div className="skeleton h-9 w-80 rounded-xl mx-auto" />
      </div>

      {/* Services grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>

      {/* Pricing section */}
      {showPricing && (
        <div className="mt-20">
          <div className="text-center mb-14 space-y-3">
            <div className="skeleton h-4 w-36 rounded-md mx-auto" />
            <div className="skeleton h-9 w-72 rounded-xl mx-auto" />
            <div className="skeleton h-4 w-96 rounded-md mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[false, true, false].map((highlighted, i) => (
              <PricingCardSkeleton key={i} highlighted={highlighted} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
