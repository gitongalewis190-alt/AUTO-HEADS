export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass animate-pulse rounded-glass overflow-hidden">
          <div className="aspect-video bg-surface" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-surface rounded w-3/4" />
            <div className="h-3 bg-surface rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
