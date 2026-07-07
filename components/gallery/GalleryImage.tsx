"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function GalleryImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [errored, setErrored] = useState(false);

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
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setErrored(true)}
    />
  );
}
