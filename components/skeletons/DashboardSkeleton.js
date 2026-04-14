import { SkeletonText, SkeletonIconBox, SkeletonButton } from '@/components/Skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <SkeletonIconBox />
            <div className="space-y-1.5">
              <SkeletonText className="w-36 h-5" />
              <SkeletonText className="w-44 h-3" />
            </div>
          </div>
          <div className="skeleton h-4 w-16 rounded-md" />
        </div>

        {/* Scan form card */}
        <div className="skeleton-card rounded-2xl p-8 mb-6">
          {/* Card heading */}
          <div className="flex items-center gap-2 mb-1">
            <div className="skeleton w-4 h-4 rounded" />
            <SkeletonText className="w-48 h-5" />
          </div>
          <SkeletonText className="w-80 h-3 mb-6" />

          {/* URL input */}
          <div className="space-y-4">
            <div>
              <SkeletonText className="w-20 h-3 mb-1.5" />
              <div className="skeleton h-12 w-full rounded-xl" />
            </div>

            {/* Checkbox row */}
            <div className="flex items-start gap-3">
              <div className="skeleton w-4 h-4 rounded mt-0.5 shrink-0" />
              <SkeletonText lines={2} className="flex-1" lastLineWidth="w-4/5" />
            </div>

            {/* Submit button */}
            <SkeletonButton className="w-full h-12" />
          </div>
        </div>

        {/* Stats preview cards */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {['High', 'Medium', 'Low', 'Info'].map((_, i) => (
            <div key={i} className="skeleton-card rounded-xl p-3 text-center space-y-1.5">
              <div className="skeleton h-7 w-8 rounded-md mx-auto" />
              <div className="skeleton h-3 w-12 rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="skeleton w-3 h-3 rounded-full" />
          <SkeletonText className="w-56 h-3" />
        </div>
      </div>
    </div>
  );
}
