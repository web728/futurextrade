import { BlogCardSkeleton } from "@/components/skeletons/BlogCardSkeleton";

export default function MediaLoading() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-28 text-white">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto h-4 w-24 animate-pulse rounded bg-white/20" />
          <div className="mx-auto mt-5 h-10 w-3/4 animate-pulse rounded bg-white/20" />
          <div className="mx-auto mt-6 h-16 w-2/3 animate-pulse rounded bg-white/10" />
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-navy/10" />
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
