import BlogCardsSkeleton from '@/components/skeletons/BlogCardsSkeleton';
import { SkeletonBadge, SkeletonText } from '@/components/Skeleton';

export default function BlogLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SkeletonBadge className="h-9 w-52 mx-auto" />
          <div className="skeleton h-14 sm:h-16 w-48 rounded-xl mx-auto" />
          <SkeletonText lines={2} className="max-w-2xl mx-auto" lastLineWidth="w-2/3" />
        </div>
      </section>

      {/* Blog cards skeleton */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogCardsSkeleton />
        </div>
      </section>
    </>
  );
}
