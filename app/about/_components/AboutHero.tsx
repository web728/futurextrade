"use client";

import { useRef } from "react";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { COMPANY_PROFILE_PDF } from "@/lib/constants/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowDownToLine } from "lucide-react";

const PARTICLES = [
  { top: "16%", left: "8%", size: "size-1.5", tone: "bg-[var(--accent)]/70", delay: "0s" },
  { top: "28%", right: "10%", size: "size-1", tone: "bg-white/50", delay: "0.8s" },
  { top: "58%", left: "14%", size: "size-2", tone: "bg-[var(--accent)]/50", delay: "1.6s" },
  { top: "45%", right: "6%", size: "size-1", tone: "bg-white/40", delay: "0.4s" },
  { top: "78%", right: "22%", size: "size-1.5", tone: "bg-[var(--accent)]/60", delay: "2.2s" },
  { top: "70%", left: "30%", size: "size-1", tone: "bg-white/60", delay: "1.2s" },
] as const;

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const textClusterRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // 1. Ultra-Smooth Cinematic Stagger Reveal using core target handles
      const introElements = textClusterRef.current?.querySelectorAll(".premium-reveal-target");
      if (introElements && introElements.length > 0) {
        if (reducedMotion) {
          // Respect reduced motion: show immediately, no transform/opacity animation.
          gsap.set(introElements, { y: 0, opacity: 1 });
        } else {
          gsap.fromTo(
            introElements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: "power4.out",
              delay: 0.2,
            }
          );
        }
      }

      if (reducedMotion) return;

      // 2. High-Performance Inertial Mouse Spotlight Loop
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !spotlightRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(spotlightRef.current, {
          x: x - 250,
          y: y - 250,
          duration: 1.5,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-[var(--primary)] w-full select-none"
    >
      {/* Structural Minimalist Technical Grid Mesh */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.25] pointer-events-none z-10" />

      {/* Interactive Velvet Glow Spotlight tied directly to global accent token */}
      {!reducedMotion && (
        <div
          ref={spotlightRef}
          aria-hidden
          className="absolute top-0 left-0 size-[500px] rounded-full pointer-events-none filter blur-[140px] z-10 opacity-35 mix-blend-screen will-change-transform"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Ambient Floating Particle Field */}
      {!reducedMotion && (
        <div aria-hidden className="absolute inset-0 z-10 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={`animate-float-slow absolute rounded-full blur-[1px] ${p.size} ${p.tone}`}
              style={{
                top: p.top,
                left: "left" in p ? p.left : undefined,
                right: "right" in p ? p.right : undefined,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Animation wrapper with clean class targeting - avoiding deep selector collision */}
      <div
        ref={textClusterRef}
        className="relative z-20 
          [&_.premium-reveal-target]:will-change-transform
          [&_h1]:font-extrabold [&_h1]:tracking-tight
          [&_p]:text-white/80"
      >
        <PhotoHero
          image="/images/gallery/exhibitions/indo-nepal-expo-1.webp"
          imageAlt="Futurex exhibition floor at the Indo-Nepal International Expo"
          eyebrow="About Futurex"
          title="A 15-Year Journey of Connecting Businesses & Building Markets"
          highlightWords={["Connecting", "Businesses"]}
          subtitle="Since 2011, Futurex Trade Fair and Events Private Limited has engineered high-performing professional exhibition and convention architectures to unite industry stakeholders global networks."
        >
          {/* Action Hub: Upgraded Premium Styled Download Widget */}
          <div className="premium-reveal-target mt-8 sm:mt-10 flex justify-center px-4 w-full">
            <MagneticButton className="w-full sm:w-auto">
              <MotionCTAButton
                href={COMPANY_PROFILE_PDF}
                download="Futurex Group Company Profile.pdf"
                variant="outline"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full font-bold tracking-wide border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 px-8 py-4 text-sm sm:text-base bg-cherry px-6 py-3 text-white hover:bg-cherry/90 shadow-xl"
              >
                <span>Download Company Profile</span>
                {/* <ArrowDownToLine className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" /> */}
              </MotionCTAButton>
            </MagneticButton>
          </div>
        </PhotoHero>
      </div>
    </div>
  );
}