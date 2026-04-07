import { SkeletonText, SkeletonBadge, SkeletonButton, SkeletonIconBox } from '@/components/Skeleton';

export default function ContentPageSkeleton({ rows = 3, showForm = false }) {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SkeletonBadge className="h-9 w-56 mx-auto" />
          <div className="skeleton h-12 sm:h-16 w-72 sm:w-96 rounded-xl mx-auto" />
          <SkeletonText lines={2} className="max-w-2xl mx-auto" lastLineWidth="w-3/5" />
        </div>
      </section>

      {/* Content rows */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
              <div className="space-y-4 lg:[direction:ltr]">
                <SkeletonText className="w-2/3 h-8 rounded-xl" />
                <SkeletonText lines={4} lastLineWidth="w-3/5" />
                <div className="flex flex-wrap gap-3 pt-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="skeleton w-4 h-4 rounded-full shrink-0" />
                      <div className="skeleton h-3.5 w-28 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="skeleton-card rounded-2xl p-8 space-y-4 lg:[direction:ltr]">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="space-y-2">
                      <SkeletonIconBox className="w-10 h-10" />
                      <SkeletonText className="w-20 h-3.5" />
                      <SkeletonText lines={2} lastLineWidth="w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Contact form skeleton */}
          {showForm && (
            <div className="grid lg:grid-cols-2 gap-12 pt-8">
              {/* Info column */}
              <div className="space-y-6">
                <SkeletonText className="w-48 h-8 rounded-xl" />
                <SkeletonText lines={3} lastLineWidth="w-4/5" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <SkeletonText className="w-20 h-3.5" />
                        <SkeletonText className="w-36 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form column */}
              <div className="skeleton-card rounded-2xl p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className={`space-y-1.5 ${i === 2 || i === 3 ? 'sm:col-span-2' : ''}`}>
                      <div className="skeleton h-3 w-20 rounded" />
                      <div className="skeleton h-11 w-full rounded-xl" />
                    </div>
                  ))}
                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="skeleton h-3 w-20 rounded" />
                    <div className="skeleton h-28 w-full rounded-xl" />
                  </div>
                </div>
                <SkeletonButton className="w-full h-12" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
