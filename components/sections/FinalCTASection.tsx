"use client";

import { useRef } from "react";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // 1. Fluid Ambient Spot Glow Expansion (Cinematic Track)
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
            scrub: 2, // Generous smoothing for ambient lighting
          },
        }
      );

      // 2. Master Sequential Timeline for Content & Actions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",     // Starts animating just as it smoothly rolls into frame
          end: "bottom 90%",     // Finishes fully before leaving view
          scrub: 1.8,            // High-damping value gives it that weighted, silky fluid drag
        }
      });

      const titleLines = textGroupRef.current?.querySelectorAll(".line-mask-inner");
      const subParagraph = textGroupRef.current?.querySelector(".cta-subtext");
      const ctaButtons = actionsRef.current?.querySelectorAll(".magnetic-btn-wrap");

      // Build out the synchronized narrative stagger
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
          "-=0.15" // Slightly overlaps with the title revealing for continuous motion
        );
      }

      if (ctaButtons && ctaButtons.length > 0) {
        tl.fromTo(
          ctaButtons,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, ease: "back.out(1.2)" },
          "-=0.2" // Smooth fluid overlap transition
        );
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-navy py-32 md:py-40 text-white font-body"
    >
      {/* Structural Sub-Mesh Overlay */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.2] mix-blend-overlay pointer-events-none" />

      {/* Kinetic Ambient Glow Layer */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none filter blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(227,37,38,0.35) 0%, transparent 75%)",
          opacity: reducedMotion ? 0.3 : 0.1,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        
        {/* Animated Text Sequence Cluster */}
        <div ref={textGroupRef}>
          {/* Editorial Subtitle Frame */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cherry-light mb-6">
            <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
            Established 2011 • Next Steps
          </span>

          {/* Mask Split Title */}
          <h2 className="font-heading text-3xl font-bold tracking-tight leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-col items-center">
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
          <p className="cta-subtext mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base font-normal will-change-transform">
            Partner with Futurex to exhibit, sponsor or blueprint high-impact industry platforms that connect your global corporate footprint with verified buyers.
          </p>
        </div>

        {/* Action Hub Frame */}
        <div 
          ref={actionsRef}
          className="relative mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6"
        >
          <div className="magnetic-btn-wrap will-change-transform">
            <MagneticButton>
              <MotionCTAButton 
                href="/exhibitors" 
                variant="primary" 
                size="lg" 
                className="rounded-full font-semibold tracking-wide shadow-xl shadow-cherry/15"
              >
                Become an Exhibitor
              </MotionCTAButton>
            </MagneticButton>
          </div>

          <div className="magnetic-btn-wrap will-change-transform">
            <MagneticButton>
              <MotionCTAButton
                href="/sponsors"
                variant="outline"
                size="lg"
                className="rounded-full font-semibold tracking-wide border-white/20 text-white hover:bg-white hover:text-navy hover:border-transparent transition-all duration-300"
              >
                Partner With Us
              </MotionCTAButton>
            </MagneticButton>
          </div>

          <div className="magnetic-btn-wrap will-change-transform">
            <MagneticButton>
              <MotionCTAButton 
                href="/exhibitions" 
                variant="light" 
                size="lg"
                className="rounded-full font-semibold tracking-wide bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white hover:text-navy transition-all duration-300"
              >
                Explore Events
              </MotionCTAButton>
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}