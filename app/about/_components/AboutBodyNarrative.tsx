"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutBodyNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      
      const paragraphs = containerRef.current?.querySelectorAll(".split-para-line");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 1.2,
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={containerRef} className="bg-surface py-24 font-body">
      <div className="mx-auto max-w-4xl px-6">
        <div className="space-y-8 text-navy/80 text-base md:text-lg leading-relaxed tracking-wide">
          <div className="relative block overflow-hidden py-1">
            <p className="split-para-line will-change-transform">
              Futurex Trade Fair and Events Private Limited is a professional exhibition and event management company creating premium B2B platforms for international trade, enterprise networking, brand visibility, and direct market expansion.
            </p>
          </div>
          <div className="relative block overflow-hidden py-1">
            <p className="split-para-line will-change-transform">
              Based in New Delhi, Futurex dynamically brings together industry manufacturers, specialized suppliers, cross-border buyers, trade associations, and corporate decision-makers through tailored trade fairs, conventions, and high-impact brand activations.
            </p>
          </div>
          <div className="relative block overflow-hidden py-1">
            <p className="split-para-line will-change-transform">
              Over the years, Futurex has grown into a multi-industry event platform builder, supporting business communities across vital growth sectors such as construction, infrastructure, agriculture, mining, packaging, power, electric vehicles, pharma, and global education infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}