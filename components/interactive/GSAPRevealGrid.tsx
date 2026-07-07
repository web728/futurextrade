"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * GSAP ScrollTrigger-driven staggered grid reveal — an alternative to
 * AnimatedRevealGrid's Motion-based stagger, for pages that specifically call
 * for a GSAP scroll-triggered reveal. Accepts pre-rendered children (each with
 * a stable `key`), same convention as AnimatedRevealGrid, so callers can stay
 * server components.
 */
export function GSAPRevealGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;
      const items = Array.from(containerRef.current.children);
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: 32, scale: 0.96 });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            overwrite: true,
          }),
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={containerRef} className={cn("grid", className)}>
      {children}
    </div>
  );
}
