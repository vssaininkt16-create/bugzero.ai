
export function SkeletonBox({ className = '' }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export function SkeletonText({ className = '', lines = 1, lastLineWidth = 'w-3/4' }) {
  if (lines === 1) {
    return <div className={`skeleton h-4 rounded-md ${className}`} />;
  }
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton h-4 rounded-md ${i === lines - 1 ? lastLineWidth : 'w-full'}`}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };
  return (
    <div className={`skeleton rounded-full shrink-0 ${sizes[size] ?? sizes.md} ${className}`} />
  );
}

export function SkeletonBadge({ className = '' }) {
  return <div className={`skeleton h-7 w-28 rounded-full ${className}`} />;
}

export function SkeletonButton({ className = '' }) {
  return <div className={`skeleton h-11 rounded-lg ${className}`} />;
}

export function SkeletonCard({ children, className = '' }) {
  return (
    <div className={`skeleton-card rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function SkeletonIconBox({ className = '' }) {
  return <div className={`skeleton w-12 h-12 rounded-xl shrink-0 ${className}`} />;
}
