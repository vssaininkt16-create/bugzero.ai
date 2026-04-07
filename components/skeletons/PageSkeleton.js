import HeroSkeleton from './HeroSkeleton';
import { SkeletonText, SkeletonIconBox } from '@/components/Skeleton';

function StatsSkeleton() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="skeleton h-4 w-24 rounded-md mx-auto" />
          <div className="skeleton h-9 w-80 rounded-xl mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="skeleton w-10 h-10 rounded-xl" />
              <div className="skeleton h-8 w-16 rounded-md" />
              <div className="skeleton h-3 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSkeleton() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="skeleton h-4 w-28 rounded-md mx-auto" />
          <div className="skeleton h-9 w-72 rounded-xl mx-auto" />
          <SkeletonText lines={2} className="max-w-2xl mx-auto" lastLineWidth="w-3/5" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-card rounded-xl p-6 space-y-4">
              <SkeletonIconBox />
              <SkeletonText className="w-4/5 h-5" />
              <SkeletonText lines={3} lastLineWidth="w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSkeleton() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="skeleton h-4 w-28 rounded-md mx-auto" />
          <div className="skeleton h-9 w-56 rounded-xl mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-card rounded-xl p-6 space-y-4">
              <div className="skeleton w-8 h-8 rounded-lg" />
              <SkeletonText lines={3} lastLineWidth="w-3/5" />
              <div className="flex items-center gap-3">
                <div className="skeleton w-10 h-10 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <SkeletonText className="w-32 h-3.5" />
                  <SkeletonText className="w-44 h-3" />
                </div>
                <div className="flex gap-0.5 ml-auto">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="skeleton w-3.5 h-3.5 rounded" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PageSkeleton() {
  return (
    <div className="relative overflow-hidden">
      <HeroSkeleton />
      <StatsSkeleton />
      <WhyChooseSkeleton />
      <TestimonialsSkeleton />
    </div>
  );
}
