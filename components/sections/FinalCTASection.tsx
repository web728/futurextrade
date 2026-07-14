"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { LeadFlowForm } from "@/components/forms/LeadFlowForm"; // Form ko import kiya

export function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // 1. Fluid Ambient Spot Glow Expansion
      gsap.fromTo(
        glowRef.current,
        {
          scale: 0.7,
          opacity: 0.1,
        },
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

      // 2. Content revealing timeline (Left Column Text & Right Column Form)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 90%",
          scrub: 1.8,
        }
      });

      const titleLines = textGroupRef.current?.querySelectorAll(".line-mask-inner");
      const subParagraph = textGroupRef.current?.querySelector(".cta-subtext");

      if (titleLines && titleLines.length > 0) {
        tl.fromTo(
          titleLines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.15, ease: "power2.out" }
        );
      }

      if (subParagraph) {
        tl.fromTo(
          subParagraph,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out" },
          "-=0.15"
        );
      }

      // Smooth slide-up fade for the entire right-side form wrapper
      if (formWrapperRef.current) {
        tl.fromTo(
          formWrapperRef.current,
          { y: 50, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, ease: "power2.out" },
          "-=0.2"
        );
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-navy py-24 md:py-36 text-white font-body"
    >
      {/* Structural Sub-Mesh Overlay */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.2] mix-blend-overlay pointer-events-none" />

      {/* Kinetic Ambient Glow Layer */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute left-1/3 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none filter blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(227,37,38,0.3) 0%, transparent 75%)",
          opacity: reducedMotion ? 0.3 : 0.1,
        }}
      />

      {/* Main Responsive Grid Wrapper (2-Columns on Desktop) */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT SIDE: Animated Branding Content */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <div ref={textGroupRef}>
              {/* Editorial Subtitle Frame */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cherry-light mb-6">
                <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
                Established 2011 • Next Steps
              </span>

              {/* Mask Split Title */}
              <h2 className="font-heading text-3xl font-bold tracking-tight leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-col">
                <span className="relative block overflow-hidden py-1 w-full">
                  <span className="line-mask-inner block will-change-transform">
                    Ready to Build Your Next
                  </span>
                </span>
                <span className="relative block overflow-hidden py-1 w-full">
                  <span className="line-mask-inner block bg-gradient-to-r from-white via-white/90 to-cherry-light bg-clip-text text-transparent will-change-transform">
                    Business Opportunity?
                  </span>
                </span>
              </h2>
              
              {/* Managed Subtext */}
              <p className="cta-subtext mt-8 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base font-normal will-change-transform">
                Partner with Futurex to exhibit, sponsor or blueprint high-impact industry platforms that connect your global corporate footprint with verified buyers. Fill out the application profile on the right to trigger instant secure boarding.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Smooth Loaded Interactive Form */}
          <div 
            ref={formWrapperRef}
            className="lg:col-span-7 w-full max-w-2xl mx-auto lg:mx-0"
          >
            {/* Custom parameters passed to match the landing page theme style */}
            <LeadFlowForm 
              title="Secure Priority Access"
              subtitle="Submit details to coordinate stall metrics & space allocation timelines."
              submitLabel="Initiate Secure Onboarding"
            />
          </div>

        </div>
      </div>
    </section>
  );
}