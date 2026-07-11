"use client";

import { useRef } from "react";
import { AnimatedCounter } from "@/components/interactive/AnimatedCounter";
import { STATS } from "@/lib/constants/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

useGSAP(
  () => {
    if (reducedMotion) return;

    // 1. Select nodes cleanly and type them explicitly
    const nodes = sectionRef.current?.querySelectorAll<HTMLDivElement>(".stat-node");
    const triggerElement = sectionRef.current;

    // 2. Early return check satisfies the compiler rules completely
    if (!nodes || nodes.length === 0 || !triggerElement) return;

    gsap.fromTo(
      nodes, // Passing a guaranteed, strongly-typed NodeList
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  },
  { scope: sectionRef, dependencies: [reducedMotion] }
);

  return (
    <section ref={sectionRef} className="border-b border-navy/10 bg-white py-14 font-body">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-5">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-node text-center will-change-transform">
            <AnimatedCounter
              value={stat.value}
              className="block font-heading text-3xl font-bold text-navy sm:text-4xl"
            />
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy/50 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}