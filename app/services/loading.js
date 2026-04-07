import ServiceCardsSkeleton from '@/components/skeletons/ServiceCardsSkeleton';
import { SkeletonBadge, SkeletonText } from '@/components/Skeleton';

export default function ServicesLoading() {
  return (
    <div className="relative">
      {/* Hero skeleton */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SkeletonBadge className="h-9 w-64 mx-auto" />
          <div className="skeleton h-14 sm:h-16 w-64 sm:w-80 rounded-xl mx-auto" />
          <SkeletonText lines={2} className="max-w-2xl mx-auto" lastLineWidth="w-2/3" />
        </div>
      </section>

      {/* Services grid skeleton */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCardsSkeleton showPricing />
        </div>
      </section>
    </div>
  );
}
