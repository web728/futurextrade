"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { HeroVisual } from "@/components/interactive/HeroVisual";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMPANY, STATS } from "@/lib/constants/company";
import { gsap, useGSAP } from "@/lib/gsap";

const HEADLINE_LINES = ["Where Industries Meet,", "Network & Grow"];

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fade/scale the hero content and 3D panel as the section scrolls out of
  // view. Deliberately does NOT use pin:true — pinning the very first
  // section reserves extra scroll height via a pin-spacer, which is easy to
  // get wrong and can visually read as duplicated/blank content. A plain
  // scrub tween tied to the section's own scroll range gives the same
  // cinematic exit with none of that risk.
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
          y: -40,
          ease: "none",
          scrollTrigger,
        });

        gsap.to(sceneRef.current, {
          scale: 0.94,
          opacity: 0.3,
          ease: "none",
          scrollTrigger,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative flex min-h-[86vh] items-center overflow-hidden bg-navy lg:min-h-[80vh]"
    >
      <div className="absolute inset-0 bg-grid-lines-dark opacity-50" />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 size-[32rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
        <div ref={contentRef}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80"
          >
            <span className="size-1.5 rounded-full bg-cherry" />
            Since {COMPANY.since} · {STATS[0].value} Business Platforms
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-cherry"
          >
            International Exhibitions · Conferences · Corporate Events
          </motion.p>

          <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.14 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    i === 1
                      ? "block bg-gradient-to-r from-cherry to-cherry-light bg-clip-text text-transparent"
                      : "block"
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-7 max-w-xl text-lg text-white/75"
          >
            Futurex designs and delivers international exhibitions,
            conferences, corporate events and business networking platforms
            that connect exhibitors, buyers, investors and industry leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton>
              <MotionCTAButton href="/exhibitions" variant="primary" size="lg">
                Explore Upcoming Events
              </MotionCTAButton>
            </MagneticButton>
            <MagneticButton>
              <MotionCTAButton
                href="/exhibitors"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-navy"
              >
                Become an Exhibitor
              </MotionCTAButton>
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 max-w-xl border-t border-white/10 pt-6 text-xs text-white/40"
          >
            Trusted by exhibitors, industry bodies, business communities and growing
            brands across multiple sectors.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md lg:mx-0 lg:justify-self-end"
        >
          {/* Soft ambient glow behind the panel, giving the visual a sense
              of intentional depth rather than a plain empty card */}
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(227,37,38,0.25) 0%, rgba(35,48,103,0.2) 45%, transparent 75%)",
            }}
          />
          {/* A few slow-drifting light particles around the panel for depth */}
          {!reducedMotion && (
            <>
              <span className="animate-float-slow absolute -left-4 top-8 size-2 rounded-full bg-cherry/70 blur-[1px]" />
              <span
                className="animate-float-slow absolute -right-3 top-1/3 size-1.5 rounded-full bg-white/60 blur-[1px]"
                style={{ animationDelay: "1s" }}
              />
              <span
                className="animate-float-slow absolute bottom-6 left-1/4 size-2 rounded-full bg-cherry/50 blur-[1px]"
                style={{ animationDelay: "2s" }}
              />
            </>
          )}
          <div ref={sceneRef} className="absolute inset-0">
            <HeroVisual />
          </div>
        </motion.div>
      </div>

      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.9 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-`1/2 flex-col items-center gap-1 text-white/40"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="size-4" />
        </motion.div>
      )}
    </section>
  );
}
