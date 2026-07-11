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
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative flex flex-col justify-between overflow-hidden bg-navy pt-24 pb-12 md:py-20 lg:pt-6 lg:pb-16"
    >
      {/* Background grid lines & ambient glow */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.55]" />
      <div
        aria-hidden
        className="absolute top-1/4 left-0 size-[40rem] -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />

      {/* Main Hero Body Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
        
        {/* Left Side: Copywrite & CTA Actions */}
        <div ref={contentRef} className="flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Top Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80 sm:text-xs"
          >
            <span className="size-1.5 rounded-full bg-cherry" />
            Since {COMPANY.since} · {STATS[0].value} Business Platforms
          </motion.div>

          {/* Subheading text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-cherry"
          >
            <span className="h-px w-4 bg-cherry/60" />
            International Exhibitions · Conferences · Corporate Events
          </motion.p>

          {/* Core Dynamic Headline */}
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl xl:text-[3.05rem]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.14 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    i === 1
                      ? "block bg-gradient-to-r from-cherry via-cherry to-cherry-light bg-clip-text text-transparent"
                      : "block"
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Paragraph Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:max-w-xl sm:text-base"
          >
            Futurex designs and delivers international exhibitions,
            conferences, corporate events and business networking platforms
            that connect exhibitors, buyers, investors and industry leaders.
          </motion.p>

          {/* Action Interactive Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <MagneticButton className="w-full sm:w-auto">
              <MotionCTAButton href="/exhibitions" variant="primary" size="default" className="w-full justify-center rounded-full bg-cherry px-6 py-3 text-white hover:bg-cherry/90">
                Explore Upcoming Events
              </MotionCTAButton>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <MotionCTAButton
                href="/exhibitors"
                variant="outline"
                size="default"
                className="w-full justify-center rounded-full border border-white bg-transparent px-6 py-3 text-white transition-all hover:bg-white hover:text-navy"
              >
                Become an Exhibitor
              </MotionCTAButton>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Interactive Image Visual Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[340px] aspect-[4/3] sm:max-w-[440px] lg:max-w-[40vw] lg:aspect-[3/2]"
        >
          {/* Subtle Ambient Layer behind the card */}
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(227,37,38,0.3) 0%, rgba(35,48,103,0.2) 50%, transparent 75%)",
            }}
          />

          {/* Particle Highlights */}
          {!reducedMotion && (
            <>
              <span className="animate-float-slow absolute -left-4 top-10 size-1.5 rounded-full bg-cherry/70 blur-[1px]" />
              <span
                style={{ animationDelay: "1.2s" }}
                className="animate-float-slow absolute -right-3 top-1/2 size-1 rounded-full bg-white/50 blur-[1px]"
              />
            </>
          )}

          {/* Framed overlay with Blueprint marks matching the UI image */}
          <div className="glass-panel absolute inset-0 rounded-2xl border border-white/10" />

          {[
            "top-2 left-2 border-t-2 border-l-2",
            "top-2 right-2 border-t-2 border-r-2",
            "bottom-2 left-2 border-b-2 border-l-2",
            "bottom-2 right-2 border-b-2 border-r-2",
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden
              className={`absolute size-4 rounded-[2px] border-cherry/70 ${pos}`}
            />
          ))}

          {/* Injected Content Area */}
          <div ref={sceneRef} className="absolute inset-2 overflow-hidden rounded-xl">
            <HeroVisual />
          </div>
        </motion.div>
      </div>

      {/* Floating Centered Scroll Badge */}
      {!reducedMotion && (
        <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-white/30 lg:flex">
          <span className="text-[8px] font-bold uppercase tracking-widest">Scroll</span>
          <ChevronDown className="size-3 animate-bounce" />
        </div>
      )}
    </section>
  );
}