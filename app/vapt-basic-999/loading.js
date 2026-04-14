import { SkeletonBadge, SkeletonText, SkeletonButton, SkeletonIconBox } from '@/components/Skeleton';

export default function VaptBasicLoading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SkeletonBadge className="h-9 w-48 mx-auto" />
          <div className="skeleton h-12 sm:h-16 w-64 sm:w-96 rounded-xl mx-auto" />
          <SkeletonText lines={2} className="max-w-xl mx-auto" lastLineWidth="w-3/5" />
          <SkeletonButton className="w-48 h-14 mx-auto" />
        </div>
      </section>

      {/* Pricing card */}
      <section className="py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="skeleton-card rounded-2xl p-8 space-y-6">
            {/* Price */}
            <div className="text-center space-y-2">
              <div className="skeleton h-16 w-36 rounded-xl mx-auto" />
              <SkeletonText className="w-32 h-4 mx-auto" />
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="skeleton w-5 h-5 rounded-full shrink-0" />
                  <div className="skeleton h-4 rounded-md flex-1" style={{ width: `${65 + i * 5}%` }} />
                </div>
              ))}
            </div>

            {/* Form fields */}
            <div className="space-y-3 pt-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="skeleton h-3 w-16 rounded" />
                  <div className="skeleton h-11 w-full rounded-xl" />
                </div>
              ))}
            </div>

            <SkeletonButton className="w-full h-14" />
          </div>
        </div>
      </section>
    </div>
  );
}
