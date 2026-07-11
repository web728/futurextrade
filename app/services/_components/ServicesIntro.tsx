"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function ServicesIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      
      const targetText = containerRef.current?.querySelector<HTMLParagraphElement>(".scroll-fade-text");
      if (!targetText) return;

      gsap.fromTo(
        targetText,
        { y: 30, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={containerRef} className="bg-white py-24 font-body">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="scroll-fade-text text-navy/80 text-base md:text-lg leading-relaxed tracking-wide will-change-transform font-normal">
          Our services are engineered directly for modern enterprise operators demanding structural audience placement, transparent brand visibility, verified qualified cross-border networking, and immediate transaction velocity. Futurex seamlessly brings operational design and execution architecture together to optimize live commercial environments.
        </p>
      </div>
    </section>
  );
}