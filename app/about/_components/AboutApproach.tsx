"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutApproach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

 useGSAP(
  () => {
    if (reducedMotion) return;
    
    // 1. Safe, typed element selection
    const leftPanel = containerRef.current?.querySelector<HTMLDivElement>(".approach-left");
    const rightPanel = containerRef.current?.querySelector<HTMLDivElement>(".approach-right");

    // 2. Early return check clears the TypeScript error completely
    if (!leftPanel || !rightPanel) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 30%",
        scrub: 1,
      }
    });

    // 3. Chain animations safely without optional chaining inside the timeline
    tl.fromTo(leftPanel, { opacity: 0, x: -40 }, { opacity: 1, x: 0, ease: "power2.out" })
      .fromTo(rightPanel, { opacity: 0, x: 40 }, { opacity: 1, x: 0, ease: "power2.out" }, 0);
  },
  { scope: containerRef, dependencies: [reducedMotion] }
);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-navy py-28 text-white font-body">
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.15] pointer-events-none" />
      <div className="absolute -top-40 -right-40 size-96 rounded-full bg-cherry/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          <div className="approach-left will-change-transform">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-cherry-light">
              Our Approach
            </span>
            <h2 className="font-heading mt-6 text-4xl font-bold leading-tight lg:text-5xl">
              Strategic Platforms. <br />
              Seamless Execution. <br />
              <span className="bg-gradient-to-r from-white to-cherry-light bg-clip-text text-transparent">Real Business Value.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70 font-normal">
              At Futurex, exhibitions are more than standard venues—they are strategic commercial ecosystems where corporate brands connect, international partnerships scale, and industrial fields emerge.
            </p>
          </div>

          <div className="approach-right will-change-transform">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-xl">
              <div className="font-heading mb-4 text-5xl font-bold leading-none text-cherry-light opacity-40">“</div>
              <p className="text-lg leading-relaxed text-white/90 font-medium">
                We don&apos;t simply organize exhibitions—we build highly targeted architectural business systems that aggregate industries, catalyze immediate trade connection, and secure measurable transactional growth.
              </p>
              <div className="mt-8 border-t border-white/10 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-cherry-light">Futurex Operational Philosophy</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}