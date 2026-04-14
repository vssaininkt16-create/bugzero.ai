import { SkeletonBox, SkeletonText } from '@/components/Skeleton';

export default function NavSkeleton() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-50  border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <SkeletonBox className="w-8 h-8 rounded-full" />
            <div className="space-y-1.5">
              <SkeletonText className="w-24 h-4" />
              <SkeletonText className="hidden sm:block w-28 h-2.5" />
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {[80, 72, 80, 56, 64, 72].map((w, i) => (
              <div key={i} className={`skeleton h-8 rounded-lg`} style={{ width: w }} />
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="skeleton h-9 w-24 rounded-lg" />
            <div className="skeleton h-9 w-16 rounded-lg" />
            <div className="skeleton h-9 w-40 rounded-lg" />
          </div>

          {/* Mobile menu icon */}
          <div className="lg:hidden skeleton w-9 h-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
