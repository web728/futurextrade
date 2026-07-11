"use client";

import { useRef } from "react";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutFinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const elementGroupRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

 useGSAP(
  () => {
    if (reducedMotion) return;

    // 1. Explicitly type each targeted element to satisfy TypeScript
    const ctaHead = containerRef.current?.querySelector<HTMLHeadingElement>(".cta-head");
    const ctaParagraph = containerRef.current?.querySelector<HTMLParagraphElement>(".cta-p");
    const ctaBtnWrap = containerRef.current?.querySelector<HTMLDivElement>(".cta-btn-wrap");

    // 2. Clear out potential null values before entering the timeline execution
    if (!ctaHead || !ctaParagraph || !ctaBtnWrap) return;

    // 1. Smoothly tracking radial spotlight scale
    gsap.fromTo(
      glowRef.current,
      { scale: 0.8, opacity: 0.15 },
      {
        scale: 1.3,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom center",
          scrub: 2,
        },
      }
    );

    // 2. Synchronized entry for title, text, and primary button node
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 95%",
        scrub: 1.5,
      }
    });

    // 3. Clean, error-free timeline chaining
    tl.fromTo(ctaHead, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power2.out" })
      .fromTo(ctaParagraph, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, "-=0.1")
      .fromTo(ctaBtnWrap, { y: 15, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, ease: "back.out(1.2)" }, "-=0.1");
  },
  { scope: containerRef, dependencies: [reducedMotion] }
);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-navy py-28 text-white font-body">
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.15] pointer-events-none" />
      <div
        ref={glowRef}
        aria-hidden
        className="absolute -top-24 left-1/4 size-96 rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />
      
      <div ref={elementGroupRef} className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="cta-head font-heading text-3xl font-bold sm:text-4xl tracking-tight text-white will-change-transform">
          Let&apos;s Build the Future Together
        </h2>
        <p className="cta-p mx-auto mt-5 max-w-2xl text-sm sm:text-base text-white/70 will-change-transform">
          Partner with Futurex to create, participate in or support cross-border business platforms precisely mapped for sustainable industry growth.
        </p>
        <div className="cta-btn-wrap mt-8 flex justify-center will-change-transform">
          <MotionCTAButton href="/contact" variant="primary" size="lg" className="rounded-full font-semibold shadow-xl shadow-cherry/20">
            Connect With Our Team
          </MotionCTAButton>
        </div>
      </div>
    </section>
  );
}