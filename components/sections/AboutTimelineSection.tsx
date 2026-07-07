"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { viewportOnce } from "@/lib/animation";

const MILESTONES = [
  {
    year: "2011",
    body: "Futurex is founded, beginning its journey in the exhibition and events industry.",
  },
  {
    year: "220+ Platforms",
    body: "Built 220+ exhibitions, conferences and corporate event platforms across sectors.",
  },
  {
    year: "Thousands Connected",
    body: "Connected thousands of exhibitors, buyers and industry professionals through B2B platforms.",
  },
  {
    year: "Multi-Industry Reach",
    body: "Expanded across construction, mining, agriculture, wood, packaging, power and more.",
  },
  {
    year: "Today",
    body: "Creating international business opportunities across India, Nepal, Bangladesh, Sri Lanka, Bhutan, Kenya and Uganda.",
  },
] as const;

export function AboutTimelineSection({ showHeading = true }: { showHeading?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-surface py-24">
      <div className="mx-auto max-w-5xl px-6">
        {showHeading && (
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              Our Journey
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              15 Years of Building Business Platforms
            </h2>
          </SectionReveal>
        )}

        <div className="relative mt-16">
          {/* Static faint track */}
          <div
            aria-hidden
            className="absolute left-4 top-0 hidden h-full w-px bg-navy/15 sm:left-1/2 sm:block sm:-translate-x-1/2"
          />
          {/* Line that draws downward as the timeline scrolls into view */}
          <div
            ref={lineRef}
            aria-hidden
            className="absolute left-4 top-0 hidden h-full w-px bg-cherry sm:left-1/2 sm:block sm:-translate-x-1/2"
          />
          <ol className="space-y-10 sm:space-y-16">
            {MILESTONES.map((milestone, i) => {
              const isEven = i % 2 === 0;
              return (
                <li key={milestone.year} className="relative">
                  <div
                    className={`sm:flex sm:items-center ${
                      isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`sm:w-1/2 ${
                        isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"
                      }`}
                    >
                      <SectionReveal
                        variant={isEven ? "slideRight" : "slideLeft"}
                        delay={i * 0.08}
                      >
                        <div className="rounded-2xl border border-navy/10 bg-white p-6 pl-14 shadow-premium sm:pl-6">
                          <p className="text-sm font-bold uppercase tracking-wide text-cherry">
                            {milestone.year}
                          </p>
                          <p className="mt-2 text-navy/70">{milestone.body}</p>
                        </div>
                      </SectionReveal>
                    </div>
                    <div className="hidden sm:block sm:w-1/2" aria-hidden />
                  </div>
                  <motion.span
                    aria-hidden
                    initial={{ backgroundColor: "#ffffff", scale: 1 }}
                    whileInView={{ backgroundColor: "#e32526", scale: 1.3 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute left-4 top-6 size-3 -translate-x-1/2 rounded-full border-2 border-cherry sm:left-1/2"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
