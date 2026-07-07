import { Skeleton } from "@/components/ui/skeleton";

/**
 * Placeholder card matching the shape of an exhibition/conference card,
 * used inside route-level loading.tsx files while listing data "loads"
 * (data here is static, but this keeps perceived-performance consistent
 * with the rest of the app's suspense/skeleton conventions).
 */
export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-premium">
      <Skeleton className="h-5 w-24 rounded-full" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-2 h-6 w-1/2" />
      <div className="mt-4 grid gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="mt-6 h-9 w-32 rounded-full" />
    </div>
  );
}
