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

  const item = items[index];
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.category} image viewer`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8 sm:top-8"
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
              className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
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
              className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </>
        )}

        <motion.div
          key={item.id}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="flex max-h-full w-full max-w-4xl flex-col items-center"
        >
          <div className="relative aspect-[4/3] w-full max-h-[70vh] overflow-hidden rounded-xl">
            <GalleryImage
              src={item.src}
              alt={item.alt}
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <div className="mt-4 text-center text-white">
            <p className="text-base font-semibold">{item.category}</p>
            <p className="mt-1 text-sm text-white/60">
              {item.year} · {item.location}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
