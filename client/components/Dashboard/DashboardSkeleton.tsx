export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-24 animate-pulse rounded-md bg-muted/20" />
        <div className="h-10 w-28 animate-pulse rounded-md bg-muted/20" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted/20" />
        ))}
      </div>

      <div className="h-80 animate-pulse rounded-lg bg-muted/20" />
      <div className="h-96 animate-pulse rounded-lg bg-muted/20" />
    </div>
  );
}
