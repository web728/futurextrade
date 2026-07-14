"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

interface PhotoHeroProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  highlightWords?: string[];
  children?: ReactNode;
}

const eliteEase = [0.16, 1, 0.3, 1] as const;

const HIGHLIGHT_WORDS = [
  "Inspire",
  "Dialogue",
  "Conferences",
  "Exhibitions",
  "Meet",
  "Network",
  "Grow",
  "Global",
  "Summit",
];

export function PhotoHero({ image, imageAlt, eyebrow, title, subtitle, highlightWords = HIGHLIGHT_WORDS, children }: PhotoHeroProps) {
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax — mirrors the homepage hero's scrub behavior.
  useGSAP(
    () => {
      if (reducedMotion) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollTrigger = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        };

        gsap.to(contentRef.current, {
          opacity: 0,
          y: -30,
          ease: "none",
          scrollTrigger,
        });

        gsap.to(bgRef.current, {
          scale: 1.06,
          opacity: 0.06,
          ease: "none",
          scrollTrigger,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden bg-[var(--primary)] pt-28 pb-16 border-b border-white/5 lg:min-h-[600px] xl:min-h-[650px]"
    >
      {/* 1. Structural Layer */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.55] pointer-events-none select-none z-0" />

      {/* 2. Cinematic Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--primary)_90%)] opacity-85 pointer-events-none z-0" />

      {/* 3. Lighting Layer */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[24rem] sm:max-w-[40rem] aspect-square rounded-full opacity-25 blur-[100px] sm:blur-[130px] pointer-events-none select-none z-0 mix-blend-screen"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      {/* 4. Background Image Layer */}
      <motion.div
        ref={bgRef}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.16 }}
        transition={{ duration: 2, ease: eliteEase }}
        className="absolute inset-0 z-0 select-none pointer-events-none mix-blend-luminosity brightness-[0.6] contrast-[1.2]"
      >
        <Image src={image} alt={imageAlt} fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/40 to-[var(--primary)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-transparent to-[var(--primary)]" />
      </motion.div>

      {/* 5. Ambient Particle Highlights — matches homepage hero */}
      {!reducedMotion && (
        <>
          <span
            aria-hidden
            className="animate-float-slow absolute left-6 top-24 z-0 size-1.5 rounded-full bg-[var(--accent)]/70 blur-[1px] sm:left-10"
          />
          <span
            aria-hidden
            style={{ animationDelay: "1.2s" }}
            className="animate-float-slow absolute right-8 top-1/3 z-0 size-1 rounded-full bg-white/50 blur-[1px] sm:right-14"
          />
        </>
      )}

      {/* 6. UI Accents — bumped opacity to match homepage's /70 corner brackets */}
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

      {/* 7. Fluid Responsive Content Layout */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 w-full text-center">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
          {/* Top Custom Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: eliteEase }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <span className="relative flex h-2 w-2">
              {!reducedMotion && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-white/90">
              {eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold tracking-tight text-white max-w-3xl leading-[1.15] sm:leading-[1.1]">
            {title.split(" ").map((word, i) => {
              const cleanWord = word.replace(/[^a-zA-Z]/g, "");
            const shouldHighlight = highlightWords.includes(cleanWord);

              return (
                <span key={i} className="inline-block mr-2 sm:mr-3 last:mr-0 overflow-hidden py-1">
                  <motion.span
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.12 + i * 0.03, ease: eliteEase }}
                    className={
                      shouldHighlight
                        ? "inline-block bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/90 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(227,37,38,0.2)]"
                        : "inline-block"
                    }
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: eliteEase }}
            className="text-xs sm:text-base md:text-lg text-white/75 max-w-xl sm:max-w-2xl font-normal leading-relaxed tracking-wide px-2"
          >
            {subtitle}
          </motion.p>

          {/* Optional CTA slot */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62, ease: eliteEase }}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center"
            >
              {children}
            </motion.div>
          )}

          {/* Minimalist Tech Divider */}
          <div className="relative flex items-center justify-center w-full mt-2 sm:mt-4">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65, ease: eliteEase }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 32, opacity: 0.3 }}
              transition={{ duration: 0.5, delay: 0.85, ease: eliteEase }}
              className="w-[1px] bg-gradient-to-b from-[var(--accent)] to-transparent absolute top-[2px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}