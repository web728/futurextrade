"use client";

import { useMemo, useState } from "react";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { GalleryLightbox } from "@/components/sections/GalleryLightbox";
import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryItem } from "@/lib/constants/gallery";
import { MICROCOPY } from "@/lib/constants/company";
import { cn } from "@/lib/utils";

const CATEGORY_TO_TYPE: Record<string, GalleryItem["type"] | "all"> = {
  All: "all",
  Exhibitions: "exhibitions",
  Conferences: "conferences",
  "Corporate Events": "corporate-events",
  Webinars: "webinars",
  "Virtual Platform": "virtual-platform",
  "Media Coverage": "media-coverage",
};

// Cycled aspect ratios give the masonry grid its visual variety.
const ASPECT_RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]"];

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    const type = CATEGORY_TO_TYPE[activeFilter];
    if (type === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.type === type);
  }, [activeFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {GALLERY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300",
              activeFilter === category
                ? "border-cherry bg-cherry text-white"
                : "border-navy/15 bg-white text-navy/70 hover:border-navy/30 hover:text-navy",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      {filteredItems.length === 0 ? (
        <p className="mt-16 text-center text-navy/50">{MICROCOPY.galleryEmpty}</p>
      ) : (
        <AnimatedRevealGrid
          className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4"
          animateLayout
          masonry
        >
          {filteredItems.map((item, index) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry",
                  ASPECT_RATIOS[index % ASPECT_RATIOS.length],
                )}
              >
                <GalleryImage
                  src={item.src}
                  alt={item.alt}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/85 via-navy/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="text-left text-white">
                    <p className="text-sm font-semibold leading-tight">{item.category}</p>
                    <p className="mt-1 text-xs text-white/70">{item.year}</p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </AnimatedRevealGrid>
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
