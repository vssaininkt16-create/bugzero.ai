import { SkeletonText, SkeletonBadge } from '@/components/Skeleton';

function BlogCardSkeleton({ featured = false }) {
  return (
    <div className={`skeleton-card rounded-xl p-6 flex flex-col ${featured ? 'md:p-7' : ''}`}>
      {/* Category badge + read time */}
      <div className="flex items-center gap-2 mb-3">
        <SkeletonBadge className="w-16 h-6" />
        <div className="skeleton h-4 w-16 rounded-md" />
      </div>

      {/* Title */}
      <SkeletonText
        lines={featured ? 2 : 2}
        className={`mb-3 ${featured ? 'text-lg' : ''}`}
        lastLineWidth="w-5/6"
      />

      {/* Excerpt */}
      <SkeletonText lines={featured ? 3 : 2} className="mb-4" lastLineWidth="w-2/3" />

      {/* Tags (for non-featured) */}
      {!featured && (
        <div className="flex gap-1.5 mb-3">
          {[52, 64, 48].map((w, i) => (
            <div key={i} className="skeleton h-5 rounded" style={{ width: w }} />
          ))}
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
        <div className="skeleton h-3.5 w-24 rounded-md" />
        <div className="skeleton h-3.5 w-20 rounded-md" />
      </div>
    </div>
  );
}

export default function BlogCardsSkeleton() {
  return (
    <>
      {/* Featured section header */}
      <div className="mb-6">
        <div className="skeleton h-6 w-40 rounded-md mb-6" />
        <div className="grid md:grid-cols-2 gap-6">
          <BlogCardSkeleton featured />
          <BlogCardSkeleton featured />
        </div>
      </div>

      {/* All articles header */}
      <div className="skeleton h-6 w-32 rounded-md mb-6 mt-16" />

      {/* Posts grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
