"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textClusterRef = useRef<HTMLDivElement>(null);
  
  // Parallax Layer References
  const bgMeshRef = useRef<HTMLDivElement>(null);
  const particleLayerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // 1. Premium Text Entrance Sequence
      const introElements = textClusterRef.current?.querySelectorAll(".premium-reveal");
      if (introElements && introElements.length > 0) {
        gsap.fromTo(
          introElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.12,
            ease: "power4.out",
            delay: 0.1,
          }
        );
      }

      if (reducedMotion) return;

      // 2. Cinematic Multi-Layered Mouse Parallax Loop
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        // Calculate cursor displacement from center (-0.5 to 0.5)
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5;
        const mouseY = (e.clientY - top) / height - 0.5;

        // Layer 1: Deep Structural Blueprint Grid Mesh (Slow, Subtle Movement)
        if (bgMeshRef.current) {
          gsap.to(bgMeshRef.current, {
            x: mouseX * 25,
            y: mouseY * 25,
            duration: 2,
            ease: "power2.out",
          });
        }

        // Layer 2: Geometric Floating Velvet Bokeh (Medium Counter-Velocity)
        if (particleLayerRef.current) {
          gsap.to(particleLayerRef.current, {
            x: -mouseX * 45,
            y: -mouseY * 45,
            duration: 1.6,
            ease: "power2.out",
          });
        }

        // Layer 3: Interactive Ambient Energy Spot (Tracks cursor position closely)
        if (spotlightRef.current) {
          const currentX = e.clientX - left;
          const currentY = e.clientY - top;

          gsap.to(spotlightRef.current, {
            x: currentX - 300, // Centers the 600px light sphere onto the cursor
            y: currentY - 300,
            duration: 1.4,
            ease: "power3.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden bg-[#0a0f1d] py-36 md:py-44 text-white select-none perspective-1000"
    >
      {/* PARALLAX LAYER 1: Deep Structural Blueprint Grid Mesh */}
      <div 
        ref={bgMeshRef}
        className="absolute inset-[-10%] bg-grid-lines-dark opacity-[0.15] pointer-events-none z-10 will-change-transform" 
      />

      {/* PARALLAX LAYER 2: Floating Premium Velvet Bokeh Particles */}
      {!reducedMotion && (
        <div 
          ref={particleLayerRef}
          className="absolute inset-[-15%] pointer-events-none z-10 will-change-transform opacity-40 mix-blend-screen"
        >
          <div className="absolute top-[20%] left-[15%] size-3 rounded-full bg-cherry/40 blur-[2px]" />
          <div className="absolute top-[65%] left-[80%] size-2 rounded-full bg-white/20 blur-[1px]" />
          <div className="absolute top-[30%] right-[20%] size-4 rounded-full bg-cherry-light/30 blur-[3px]" />
          <div className="absolute bottom-[25%] left-[25%] size-2.5 rounded-full bg-white/10" />
        </div>
      )}

      {/* PARALLAX LAYER 3: Liquid Ambient Light Halo */}
      {!reducedMotion && (
        <div
          ref={spotlightRef}
          aria-hidden
          className="absolute top-0 left-0 size-[600px] rounded-full pointer-events-none filter blur-[140px] z-10 opacity-30 mix-blend-screen will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(227,37,38,0.5) 0%, transparent 80%)",
          }}
        />
      )}

      {/* Core Typography Canvas */}
      <div ref={textClusterRef} className="relative z-20 mx-auto max-w-4xl px-6 text-center font-body">
        <span className="premium-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cherry-light will-change-transform">
          <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
          Our Specializations
        </span>
        
        <h1 className="premium-reveal mt-6 font-heading text-4xl font-bold tracking-tight leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl text-white will-change-transform">
          End-to-End Event Platforms for{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white via-white/95 to-cherry-light bg-clip-text text-transparent">
              Business Growth
            </span>
            <span className="absolute left-0 bottom-2 h-[2px] w-full bg-gradient-to-r from-cherry/0 via-cherry/40 to-cherry/0" />
          </span>
        </h1>
        
        <p className="premium-reveal mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base md:text-lg font-normal will-change-transform">
          Futurex delivers high-performing exhibition, conference, corporate activation, and bespoke promotional frameworks built specifically to help market leaders scale with confidence.
        </p>
      </div>

      {/* Luxury Base Radial Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0f1d] to-transparent pointer-events-none z-10" />
    </section>
  );
}