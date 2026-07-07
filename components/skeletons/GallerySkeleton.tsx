import { Skeleton } from "@/components/ui/skeleton";

// Cycled aspect ratios mirror GalleryGrid's masonry variety so the loading
// state doesn't visually "jump" once real content mounts.
const ASPECT_RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]"];

/**
 * Placeholder masonry grid shown inside app/gallery/loading.tsx while the
 * gallery page's client bundle hydrates.
 */
export function GallerySkeleton() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>

      <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <Skeleton className={`w-full rounded-xl ${ASPECT_RATIOS[i % ASPECT_RATIOS.length]}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
