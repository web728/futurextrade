"use client";

import { useRef } from "react";
import { Landmark, Presentation, CalendarDays, Globe2 } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { gsap, useGSAP } from "@/lib/gsap";

const PILLARS = [
  {
    id: "trade-exhibitions",
    icon: Landmark,
    title: "Trade Exhibitions",
    body: "Large-scale industry exhibitions that connect brands with serious buyers and market opportunities.",
  },
  {
    id: "conferences-summits",
    icon: Presentation,
    title: "Conferences & Summits",
    body: "Knowledge-led platforms for industry leaders, policymakers, innovators and decision-makers.",
  },
  {
    id: "corporate-events",
    icon: CalendarDays,
    title: "Corporate Events",
    body: "Custom event experiences designed for brands, associations and business communities.",
  },
  {
    id: "international-networking",
    icon: Globe2,
    title: "International Business Networking",
    body: "Curated platforms that help companies build cross-border partnerships and industry connections.",
  },
] as const;

const N = PILLARS.length;
const POINT_X = PILLARS.map((_, i) => (i / (N - 1)) * 1000);

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const path = lineRef.current;
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "power2.inOut",
          duration: 1.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
            What Futurex Does
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            The Bridge Between Industries, Markets and People
          </h2>
          <p className="mt-4 text-navy/60">
            Four connected platforms that turn industry presence into real
            business outcomes — designed to work together, not in isolation.
          </p>
        </SectionReveal>

        <div className="relative mt-14">
          {/* Connecting line, drawn in on scroll — desktop only, showing
              Futurex as the bridge linking each pillar */}
          <svg
            aria-hidden
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-11 hidden h-8 w-full lg:block"
          >
            <path
              ref={lineRef}
              d={`M ${POINT_X.map((x) => `${x} 20`).join(" L ")}`}
              fill="none"
              stroke="#e32526"
              strokeOpacity={0.4}
              strokeWidth={1.5}
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
          </svg>

          <AnimatedRevealGrid className="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <HoverLiftCard key={pillar.id} className="h-full text-center lg:text-left">
                <span className="icon-badge mx-auto lg:mx-0">
                  <pillar.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{pillar.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{pillar.body}</p>
              </HoverLiftCard>
            ))}
          </AnimatedRevealGrid>
        </div>
      </div>
    </section>
  );
}
