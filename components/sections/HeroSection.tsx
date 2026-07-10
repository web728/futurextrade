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
      className="bg-grain relative flex min-h-[26vh] items-center overflow-hidden bg-navy lg:min-h-[20vh]"
    >
      <div className="absolute inset-0 bg-grid-lines-dark opacity-50" />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 size-[8rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-4 px-6 py-4 sm:gap-6 sm:py-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div ref={contentRef} className="lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/80 sm:px-4 sm:py-1 sm:text-xs"
          >
            <span className="size-1 rounded-full bg-cherry" />
            Since {COMPANY.since} · {STATS[0].value} Business Platforms
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-2 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-cherry sm:flex"
          >
            <span className="h-px w-5 bg-cherry/60" />
            International Exhibitions · Conferences · Corporate Events
          </motion.p>

          <h1 className="mt-2 text-xl font-extrabold leading-[1.08] tracking-tight text-white sm:mt-3 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl">
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
            className="mt-2 hidden max-w-lg text-xs leading-relaxed text-white/75 sm:block sm:text-sm"
          >
            Futurex designs and delivers international exhibitions,
            conferences, corporate events and business networking platforms
            that connect exhibitors, buyers, investors and industry leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-3 flex flex-wrap items-center gap-3 sm:mt-4"
          >
            <MagneticButton>
              <MotionCTAButton href="/exhibitions" variant="primary" size="default">
                Explore Upcoming Events
              </MotionCTAButton>
            </MagneticButton>
            <MagneticButton>
              <MotionCTAButton
                href="/exhibitors"
                variant="outline"
                size="default"
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
            className="mt-3 hidden max-w-lg border-t border-white/10 pt-2 text-[11px] tracking-wide text-white/40 md:block"
          >
            Trusted by exhibitors, industry bodies, business communities and
            growing brands across multiple sectors.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square h-24 sm:h-32 md:h-40 lg:mx-0 lg:h-full lg:max-h-40 lg:justify-self-end xl:max-h-48"
        >
          {/* Soft ambient glow behind the panel */}
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(227,37,38,0.25) 0%, rgba(35,48,103,0.2) 45%, transparent 75%)",
            }}
          />

          {/* A couple of light particles for depth, kept minimal at this size */}
          {!reducedMotion && (
            <>
              <span className="animate-float-slow absolute -left-2 top-3 size-1.5 rounded-full bg-cherry/70 blur-[1px]" />
              <span
                style={{ animationDelay: "1s" }}
                className="animate-float-slow absolute -right-1.5 top-1/3 size-1 rounded-full bg-white/60 blur-[1px]"
              />
            </>
          )}

          {/* Framed panel: quiet glass border plus small blueprint-style
              corner marks, a nod to floor plans and exhibition layouts */}
          <div className="glass-panel absolute inset-0 rounded-2xl border border-white/10" />

          {[
            "top-1.5 left-1.5 border-t-2 border-l-2",
            "top-1.5 right-1.5 border-t-2 border-r-2",
            "bottom-1.5 left-1.5 border-b-2 border-l-2",
            "bottom-1.5 right-1.5 border-b-2 border-r-2",
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden
              className={`absolute size-2.5 rounded-[2px] border-cherry/60 ${pos}`}
            />
          ))}

          <div ref={sceneRef} className="absolute inset-1.5">
            <HeroVisual />
          </div>
        </motion.div>
      </div>

      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.9 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="absolute bottom-1 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-white/40 sm:flex"
        >
          <span className="text-[8px] font-semibold uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="size-2" />
        </motion.div>
      )}
    </section>
  );
}