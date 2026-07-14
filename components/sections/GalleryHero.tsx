"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

interface GalleryHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** A small handful of real gallery images used as floating parallax tiles. */
  previewItems: { src: string; alt: string }[];
}

const eliteEase = [0.16, 1, 0.3, 1] as const;

// "depth" controls how strongly each tile reacts to mouse movement — lower
// = reads as further away, higher = reads as closer. Six tiles moving at
// six different rates is what sells the depth illusion; it's the cheap
// substitute for an actual three.js scene, at a fraction of the JS/GPU cost.
const TILE_LAYOUT: {
  top: string;
  left?: string;
  right?: string;
  size: string;
  depth: number;
  rotate: number;
  blur: string;
  hideOnMobile: boolean;
}[] = [
  { top: "12%", left: "6%", size: "w-28 h-36 sm:w-36 sm:h-44", depth: 0.03, rotate: -6, blur: "blur-[1px]", hideOnMobile: false },
  { top: "58%", left: "4%", size: "w-24 h-24 sm:w-32 sm:h-32", depth: 0.06, rotate: 4, blur: "blur-0", hideOnMobile: true },
  { top: "8%", right: "8%", size: "w-24 h-32 sm:w-32 sm:h-40", depth: 0.05, rotate: 5, blur: "blur-[1px]", hideOnMobile: false },
  { top: "56%", right: "5%", size: "w-32 h-32 sm:w-40 sm:h-40", depth: 0.025, rotate: -4, blur: "blur-[2px]", hideOnMobile: false },
  { top: "78%", left: "22%", size: "w-20 h-20 sm:w-28 sm:h-28", depth: 0.07, rotate: 8, blur: "blur-0", hideOnMobile: true },
  { top: "74%", right: "22%", size: "w-20 h-28 sm:w-28 sm:h-36", depth: 0.045, rotate: -8, blur: "blur-[1px]", hideOnMobile: true },
];

export function GalleryHero({ eyebrow, title, subtitle, previewItems }: GalleryHeroProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      if (reducedMotion) return;

      // Per-tile parallax movers, one quickTo pair per tile so mousemove
      // never allocates new tweens.
      const tileMovers = tileRefs.current.map((el) => {
        if (!el) return null;
        return {
          x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
        };
      });
      const spotlightX = spotlightRef.current
        ? gsap.quickTo(spotlightRef.current, "x", { duration: 1.4, ease: "power2.out" })
        : null;
      const spotlightY = spotlightRef.current
        ? gsap.quickTo(spotlightRef.current, "y", { duration: 1.4, ease: "power2.out" })
        : null;

      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;

        tileMovers.forEach((mover, i) => {
          if (!mover) return;
          const depth = TILE_LAYOUT[i]?.depth ?? 0.04;
          mover.x(relX * depth);
          mover.y(relY * depth);
        });

        if (spotlightX && spotlightY) {
          spotlightX(e.clientX - rect.left - 250);
          spotlightY(e.clientY - rect.top - 250);
        }
      };

      const sectionNode = sectionRef.current;
      sectionNode?.addEventListener("mousemove", handleMouseMove);

      // Scroll-linked fade/scale — same treatment every hero on the site uses.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => {
        sectionNode?.removeEventListener("mousemove", handleMouseMove);
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden bg-navy pt-28 pb-16 border-b border-white/5 lg:min-h-[650px]"
    >
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.55] pointer-events-none z-0" />

      {!reducedMotion && (
        <div
          ref={spotlightRef}
          aria-hidden
          className="absolute top-0 left-0 size-[500px] rounded-full pointer-events-none blur-[130px] z-0 opacity-25 mix-blend-screen will-change-transform"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 80%)" }}
        />
      )}

      {/* Floating depth-parallax tiles — real gallery thumbnails, each
          moving at a different rate on mousemove. This whole layer is
          decorative (the actual gallery is the grid below), so it's
          marked aria-hidden. */}
      {previewItems.slice(0, TILE_LAYOUT.length).map((item, i) => {
        const layout = TILE_LAYOUT[i];
        return (
          <div
            key={item.src}
            aria-hidden
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`absolute ${layout.size} overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 will-change-transform ${layout.blur} ${
              layout.hideOnMobile ? "hidden sm:block" : ""
            }`}
            style={{
              top: layout.top,
              left: layout.left,
              right: layout.right,
              transform: `rotate(${layout.rotate}deg)`,
              zIndex: 1,
            }}
          >
            <Image src={item.src} alt="" fill sizes="180px" priority={i < 2} className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-navy/40" />
          </div>
        );
      })}

      {/* Corner UI accents — matches PhotoHero, used site-wide */}
      {[
        "top-4 left-4 sm:top-6 sm:left-6 border-t-2 border-l-2",
        "top-4 right-4 sm:top-6 sm:right-6 border-t-2 border-r-2",
        "bottom-4 left-4 sm:bottom-6 sm:left-6 border-b-2 border-l-2",
        "bottom-4 right-4 sm:bottom-6 sm:right-6 border-b-2 border-r-2",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute size-3 sm:size-4 rounded-[1px] border-[var(--accent)]/60 pointer-events-none z-10 hidden sm:block ${pos}`}
        />
      ))}

      {/* Ambient particles matching the rest of the site */}
      {!reducedMotion && (
        <>
          <span aria-hidden className="animate-float-slow absolute left-1/4 top-1/4 z-10 size-1.5 rounded-full bg-cherry/70 blur-[1px]" />
          <span
            aria-hidden
            style={{ animationDelay: "1.2s" }}
            className="animate-float-slow absolute right-1/4 top-2/3 z-10 size-1 rounded-full bg-white/50 blur-[1px]"
          />
        </>
      )}

      {/* Text content */}
      <div ref={contentRef} className="relative z-20 mx-auto max-w-3xl px-4 sm:px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: eliteEase }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            {!reducedMotion && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cherry opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cherry shadow-[0_0_8px_var(--accent)]" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/90">{eyebrow}</span>
        </motion.div>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
          {title.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-2 sm:mr-3 last:mr-0 overflow-hidden py-1">
              <motion.span
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.12 + i * 0.04, ease: eliteEase }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: eliteEase }}
          className="mt-6 text-sm sm:text-base md:text-lg text-white/75 max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}