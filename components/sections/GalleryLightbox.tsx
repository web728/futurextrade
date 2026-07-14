"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import type { GalleryItem } from "@/lib/constants/gallery";

export function GalleryLightbox({
  items,
  startIndex,
  onClose,
}: {
  items: GalleryItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  // Warm the browser's HTTP cache for the adjacent images so Next/Prev feels
  // instant instead of showing a load flash. This is a raw Image() prefetch,
  // deliberately not routed through next/image or the DOM — it doesn't
  // depend on visibility/lazy-load heuristics, it just primes the cache.
  useEffect(() => {
    if (typeof window === "undefined" || items.length < 2) return;
    const nextItem = items[(index + 1) % items.length];
    const prevItem = items[(index - 1 + items.length) % items.length];
    [nextItem, prevItem].forEach((it) => {
      if (!it) return;
      const img = new window.Image();
      img.src = it.src;
    });
  }, [index, items]);

  const item = items[index];
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 backdrop-blur-xl p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.category} image viewer`}
      >
        {/* Image counter */}
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-md sm:left-8 sm:top-8">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-colors hover:border-cherry/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8 sm:top-8"
        >
          <X className="size-5" aria-hidden />
        </button>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-colors hover:border-cherry/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-colors hover:border-cherry/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </>
        )}

        <motion.div
          key={item.id}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="flex max-h-full w-full max-w-4xl flex-col items-center"
        >
          <div className="relative aspect-[4/3] w-full max-h-[70vh] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <GalleryImage
              key={item.id}
              src={item.src}
              alt={item.alt}
              sizes="90vw"
              priority
              fit="contain"
            />
          </div>
          <div className="mt-5 text-center text-white">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70">
              <span className="size-1.5 rounded-full bg-cherry" />
              {item.category}
            </p>
            <p className="mt-2 text-sm text-white/60">
              {item.year} · {item.location}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}