"use client";

import Image from "next/image";
import { MousePointerClick } from "lucide-react";
import InkReveal from "@/components/ui/ink-reveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { GalleryItem } from "@/lib/constants/gallery";

// Matches the section's own bg-surface token so the mask reads as an
// intentional part of the page, not an image that failed to load.
const SURFACE_RGB: [number, number, number] = [246, 247, 251];

export function InkRevealTile({
  item,
  className,
}: {
  item: GalleryItem;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const interactive = !isMobile && !reducedMotion;

  return (
    <div className={`group relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-base font-semibold text-white">{item.moment}</p>
        <p className="text-xs text-white/70">
          {item.category} · {item.year}
        </p>
      </div>

      {interactive && (
        <>
          <InkReveal maskColor={SURFACE_RGB} brushSize={140} />
          <span className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy shadow-sm">
            <MousePointerClick className="size-3.5 text-cherry" aria-hidden />
            Move to reveal
          </span>
        </>
      )}
    </div>
  );
}
