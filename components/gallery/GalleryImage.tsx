"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function GalleryImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority = false,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Only true for genuinely above-the-fold images (first row / lightbox). */
  priority?: boolean;
  /**
   * "contain" for lightbox/full views where cropping would lose content.
   * NOTE: previously this was done by passing className="object-contain"
   * on top of a hardcoded "object-cover" — Tailwind doesn't guarantee which
   * wins based on className string order, only on generated CSS order, so
   * that override was unreliable. This prop makes it deterministic.
   */
  fit?: "cover" | "contain";
}) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-navy to-navy-light",
          className,
        )}
        aria-label={alt}
      >
        <ImageIcon className="size-8 text-white/30" aria-hidden />
      </div>
    );
  }

  return (
    <>
      {/* Lightweight shimmer while the image decodes — avoids a blank flash
          on slower connections, and makes the grid feel intentional rather
          than "broken" while images are still arriving. */}
      {!loaded && <div aria-hidden className="absolute inset-0 animate-pulse bg-navy/10" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          fit === "cover" ? "object-cover" : "object-contain",
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
    </>
  );
}