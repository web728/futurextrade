"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { AnimatedAboutVisual } from "@/components/interactive/AnimatedAboutVisual";

export function AboutPreviewSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // This coordinates system ensures the animation starts beautifully
        // right as you transition out of the hero section.
        const scrollTrigger = {
          trigger: sectionRef.current,
          start: "top 75%",      // Triggers early when scrolling down
          end: "top 15%",        // Completes nicely before it goes off-screen
          scrub: 1,              // Tied tightly to your scroll track
        };

        // Text content parallax and elegant fade in
        gsap.fromTo(contentRef.current, 
          {
            opacity: 0,
            y: 60,
          }, 
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger,
          }
        );

        // Image frame syncs beautifully with the text reveal
        gsap.fromTo(visualRef.current, 
          {
            opacity: 0,
            scale: 0.96,
            y: 80,
          }, 
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger,
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative flex flex-col justify-center overflow-hidden bg-white py-20 md:py-28 lg:py-32"
    >
      {/* Soft Ambient Glow */}
      <div
        aria-hidden
        className="absolute bottom-1/4 left-1/4 size-[30rem] -translate-x-1/2 rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />
      {/* Background blueprint grid lines */}
      <div className="absolute inset-0 bg-grid-lines-light opacity-[0.15]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
        
        {/* Left Side: Copywrite Content */}
        <div ref={contentRef} className="flex flex-col items-start lg:pr-6">
          <SectionReveal>
            {/* Top Tag Pill */}
            <p className="inline-flex items-center gap-2 rounded-full border border-cherry/10 bg-cherry/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cherry">
              <span className="size-1.5 rounded-full bg-cherry" />
              About Futurex
            </p>

            <h2 className="mt-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-4xl md:text-5xl xl:text-[3rem]">
              Since 2011, Futurex Has Built Platforms{" "}
              <span className="bg-gradient-to-r from-cherry via-cherry to-cherry-light bg-clip-text text-transparent block sm:inline">
                Where Business Happens
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-navy/75 sm:max-w-xl sm:text-base">
              Futurex creates powerful B2B trade platforms through exhibitions,
              conferences, corporate events and international business
              networking. Our platforms help industries launch products, meet
              buyers, build partnerships and unlock new markets.
            </p>

            {/* Action Interactive Button */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <MotionCTAButton
                href="/about"
                variant="navy"
                size="default"
                className="w-full justify-center rounded-full px-6 py-3"
              >
                Discover Our Journey &rarr;
              </MotionCTAButton>
            </div>
          </SectionReveal>
        </div>

        {/* Right Side: Premium Framework Container */}
        <div 
          ref={visualRef} 
          className="relative mx-auto w-full max-w-[350px] aspect-[4/3] sm:max-w-[450px] lg:max-w-full lg:aspect-square"
        >
          {/* Subtle Backing Shadow Glow */}
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(35,48,103,0.2) 0%, transparent 75%)",
            }}
          />

          {/* Blueprint Corner Accents */}
          <div className="glass-panel absolute inset-0 rounded-2xl border border-navy/10" />
          {[
            "top-2 left-2 border-t-2 border-l-2",
            "top-2 right-2 border-t-2 border-r-2",
            "bottom-2 left-2 border-b-2 border-l-2",
            "bottom-2 right-2 border-b-2 border-r-2",
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden
              className={`absolute size-4 rounded-[2px] border-cherry/60 ${pos}`}
            />
          ))}

          {/* Visual Canvas Element Space */}
          <div className="absolute inset-2 overflow-hidden rounded-xl bg-navy/5">
            <AnimatedAboutVisual />
          </div>
        </div>

      </div>
    </section>
  );
}