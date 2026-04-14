import { SkeletonBox, SkeletonText, SkeletonBadge, SkeletonButton } from '@/components/Skeleton';

export default function HeroSkeleton() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 " />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="space-y-6">
            {/* Badge pill */}
            <SkeletonBadge className="h-9 w-72" />

            {/* Heading - 3 lines */}
            <div className="space-y-3">
              <div className="skeleton h-12 sm:h-14 lg:h-16 rounded-xl w-full" />
              <div className="skeleton h-12 sm:h-14 lg:h-16 rounded-xl w-5/6" />
              <div className="skeleton h-12 sm:h-14 lg:h-16 rounded-xl w-3/4" />
            </div>

            {/* Paragraph */}
            <SkeletonText lines={3} className="max-w-xl" lastLineWidth="w-2/3" />

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <SkeletonButton className="w-full sm:w-52 h-14" />
              <SkeletonButton className="w-full sm:w-44 h-14" />
            </div>

            {/* Badge strip */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {[64, 80, 72, 88, 96].map((w, i) => (
                <div key={i} className="skeleton h-7 rounded-md" style={{ width: w }} />
              ))}
            </div>
          </div>

          {/* Right column - shield visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-52 h-52">
              <div className="skeleton absolute inset-0 rounded-full " />
              <div className="skeleton absolute inset-4 rounded-full" />
              <div className="skeleton absolute inset-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
