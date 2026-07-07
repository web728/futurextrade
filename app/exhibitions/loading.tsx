import { Skeleton } from "@/components/ui/skeleton";
import { EventCardSkeleton } from "@/components/skeletons/EventCardSkeleton";

export default function ExhibitionsLoading() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-28 text-white">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Skeleton className="mx-auto h-4 w-32 bg-white/10" />
          <Skeleton className="mx-auto mt-5 h-10 w-3/4 bg-white/10" />
          <Skeleton className="mx-auto mt-4 h-6 w-2/3 bg-white/10" />
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="mt-6 h-4 w-32" />
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
