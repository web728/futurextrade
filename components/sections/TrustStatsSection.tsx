"use client";

import { useRef } from "react";
import { AnimatedCounter } from "@/components/interactive/AnimatedCounter";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { STATS } from "@/lib/constants/company";

const N = STATS.length;
const POINT_X = STATS.map((_, i) => ((i + 0.5) / N) * 1000);

export function TrustStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const path = lineRef.current;
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          duration: 1.4,
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="border-b border-navy/10 bg-white py-5 sm:py-4">
      <div className="relative mx-auto max-w-7xl px-6">
        <div aria-hidden className="relative mb-3 hidden h-3 md:block">
          <svg
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-6 top-0 h-3 w-[calc(100%-3rem)]"
          >
            <path
              ref={lineRef}
              d={`M ${POINT_X.map((x) => `${x} 6`).join(" L ")}`}
              fill="none"
              stroke="#e32526"
              strokeOpacity={0.35}
              strokeWidth={1.5}
            />
            {POINT_X.map((x, i) => (
              <circle key={i} cx={x} cy={6} r={3} fill="#e32526" opacity={0.7}>
                <animate
                  attributeName="r"
                  values="3;5;3"
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`${i * 0.25}s`}
                />
              </circle>
            ))}
          </svg>
        </div>

        <div className="relative grid grid-cols-3 gap-y-3 sm:grid-cols-5 sm:gap-y-0 sm:gap-x-6">
          {STATS.map((stat, i) => (
            <SectionReveal
              key={stat.label}
              variant="fadeUp"
              delay={i * 0.06}
              className={
                i > 0
                  ? "sm:border-l sm:border-navy/10 sm:pl-6"
                  : undefined
              }
            >
              <div className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  className="block text-lg font-extrabold tracking-tight text-navy sm:text-2xl lg:text-3xl"
                />
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-navy/50 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}