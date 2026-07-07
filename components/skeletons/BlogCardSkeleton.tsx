import { Skeleton } from "@/components/ui/skeleton";

/**
 * Placeholder card matching the shape of a Media/Blog post card, used inside
 * app/media/loading.tsx while the listing page's client bundle hydrates.
 */
export function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-premium">
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="mt-4 h-5 w-full" />
      <Skeleton className="mt-2 h-5 w-3/4" />
      <div className="mt-4 grid flex-1 gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
