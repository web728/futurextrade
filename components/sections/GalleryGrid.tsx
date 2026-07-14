"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import { motion } from "motion/react";
import {
  LayoutGrid,
  Building2,
  Mic2,
  PartyPopper,
  Video,
  Globe2,
  Newspaper,
} from "lucide-react";
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

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  All: LayoutGrid,
  Exhibitions: Building2,
  Conferences: Mic2,
  "Corporate Events": PartyPopper,
  Webinars: Video,
  "Virtual Platform": Globe2,
  "Media Coverage": Newspaper,
};

// Cycled aspect ratios give the masonry grid its visual variety.
const ASPECT_RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]"];

// How many cards mount per "page" — the historic Exhibitions page had the
// same bug (all 100+ items mounted on first paint); same fix applies here.
const PAGE_SIZE = 24;
const eliteEase = [0.16, 1, 0.3, 1] as const;

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredItems = useMemo(() => {
    const type = CATEGORY_TO_TYPE[activeFilter];
    if (type === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.type === type);
  }, [activeFilter]);

  // Reset pagination whenever the filter changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {GALLERY_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category] ?? LayoutGrid;
          const isActive = activeFilter === category;
          const count =
            category === "All"
              ? GALLERY_ITEMS.length
              : GALLERY_ITEMS.filter((i) => i.type === CATEGORY_TO_TYPE[category]).length;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "border-cherry bg-cherry text-white shadow-[0_8px_20px_-8px_rgba(227,37,38,0.5)]"
                  : "border-navy/15 bg-white text-navy/70 hover:border-navy/30 hover:text-navy",
              )}
            >
              <Icon className={cn("size-3.5", isActive ? "text-white" : "text-navy/40")} />
              {category}
              <span className={cn("text-[10px] font-bold", isActive ? "text-white/70" : "text-navy/30")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      {filteredItems.length === 0 ? (
        <p className="mt-16 text-center text-navy/50">{MICROCOPY.galleryEmpty}</p>
      ) : (
        <>
          <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                // Delay resets every 4 items instead of growing with the
                // full list length. A stagger keyed to the raw index (e.g.
                // index * 0.06) compounds into a multi-second wait by the
                // time you reach item #80 — that's the "images show up
                // slowly one by one" symptom, even though they were already
                // downloaded and decoded.
                transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: eliteEase }}
                className="mb-4 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry",
                    "[content-visibility:auto] [contain-intrinsic-size:0_320px]",
                    ASPECT_RATIOS[index % ASPECT_RATIOS.length],
                  )}
                >
                  <GalleryImage
                    src={item.src}
                    alt={item.alt}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    // Only the first row is genuinely above the fold.
                    priority={index < 4}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/85 via-navy/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-left text-white">
                      <p className="text-sm font-semibold leading-tight">{item.category}</p>
                      <p className="mt-1 text-xs text-white/70">{item.year}</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-full bg-navy px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-navy/10 transition-transform hover:scale-105"
              >
                Load {Math.min(PAGE_SIZE, filteredItems.length - visibleCount)} More
              </button>
            </div>
          )}
        </>
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={visibleItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}