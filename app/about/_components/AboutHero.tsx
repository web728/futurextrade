"use client";

import { useRef } from "react";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { COMPANY_PROFILE_PDF } from "@/lib/constants/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const textClusterRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // 1. Premium Entrance Reveal targeting native child tags inside PhotoHero
      const introElements = textClusterRef.current?.querySelectorAll(".premium-reveal-target");
      if (introElements && introElements.length > 0) {
        gsap.fromTo(
          introElements,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.12,
            ease: "power4.out",
            delay: 0.1,
          }
        );
      }

      if (reducedMotion) return;

      // 2. Continuous Cinema-Grade Mouse Spotlight Tracking Loop
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !spotlightRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(spotlightRef.current, {
          x: x - 250,
          y: y - 250,
          duration: 1.8,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-navy w-full select-none">
      {/* Structural Tech Blueprint Mesh Grid */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.18] pointer-events-none z-10" />

      {/* Mouse-Tracking Interactive Ambient Glow Ring */}
      {!reducedMotion && (
        <div
          ref={spotlightRef}
          aria-hidden
          className="absolute top-0 left-0 size-[500px] rounded-full pointer-events-none filter blur-[120px] z-10 opacity-30 mix-blend-screen will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(227,37,38,0.4) 0%, transparent 75%)",
          }}
        />
      )}

      {/* Tailwind targeting wraps PhotoHero to inject the animation triggers and gradients
        without breaking your component's TypeScript definition.
      */}
      <div 
        ref={textClusterRef} 
        className="relative z-20 
          [&_span]:premium-reveal-target [&_span]:will-change-transform
          [&_h1]:premium-reveal-target [&_h1]:will-change-transform [&_h1]:font-heading [&_h1]:tracking-tight
          [&_p]:premium-reveal-target [&_p]:will-change-transform [&_p]:text-white/70"
      >
        <PhotoHero
          image="/images/gallery/exhibitions/indo-nepal-expo-1.webp"
          imageAlt="Futurex exhibition floor at the Indo-Nepal International Expo"
          eyebrow="About Futurex"
          title="A 15-Year Journey of Connecting Businesses & Building Markets"
          subtitle="Since 2011, Futurex Trade Fair and Events Private Limited has engineered high-performing professional exhibition and convention architectures to unite industry stakeholders global networks."
        >
          {/* Action Hub */}
          <div className="premium-reveal-target mt-10 flex justify-center anonymity will-change-transform">
            <MagneticButton>
              <MotionCTAButton
                href={COMPANY_PROFILE_PDF}
                download="Futurex Group Company Profile.pdf"
                variant="outline"
                icon={false}
                className="rounded-full font-semibold tracking-wide border-white/20 text-white hover:bg-white hover:text-navy transition-all duration-300 px-8 py-4 shadow-xl backdrop-blur-sm shadow-navy/20"
              >
                Download Company Profile
              </MotionCTAButton>
            </MagneticButton>
          </div>
        </PhotoHero>
      </div>
    </div>
  );
}