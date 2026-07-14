"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

// Array generator for highly optimized rich velvet floating particle cluster nodes
const PREMIUM_PARTICLES_CLUSTER = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  top: `${15 + (i * 7) % 75}%`,
  left: `${10 + (i * 9) % 80}%`,
  size: i % 3 === 0 ? "size-3" : i % 2 === 0 ? "size-2" : "size-1.5",
  blur: i % 3 === 0 ? "blur-[2px]" : i % 2 === 0 ? "blur-[1px]" : "blur-none",
  color: i % 4 === 0 ? "bg-[#e32526]/50" : i % 3 === 0 ? "bg-white/30" : "bg-[#233067]/40",
}));

export function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textClusterRef = useRef<HTMLDivElement>(null);
  
  // Parallax Layer Coordinates
  const bgMeshRef = useRef<HTMLDivElement>(null);
  const particleLayerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // 1. Text entrance cascade with staggered dynamic lift acceleration
      const introElements = textClusterRef.current?.querySelectorAll(".premium-reveal");
      if (introElements && introElements.length > 0) {
        gsap.fromTo(
          introElements,
          { y: 60, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.6,
            stagger: 0.14,
            ease: "power4.out",
            delay: 0.1,
          }
        );
      }

      if (reducedMotion) return;

      // 2. High-Fidelity Cinematic Mouse Tracking System Matrix
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5;
        const mouseY = (e.clientY - top) / height - 0.5;

        // Layer 1: Deep Structural Blueprint Grid Mesh (Slow, Stable Movement)
        if (bgMeshRef.current) {
          gsap.to(bgMeshRef.current, {
            x: mouseX * 35,
            y: mouseY * 35,
            rotateX: -mouseY * 4,
            rotateY: mouseX * 4,
            duration: 2.2,
            ease: "power2.out",
          });
        }

        // Layer 2: Density Particles (Stronger Counter-Velocity for 3D Depths parallax)
        if (particleLayerRef.current) {
          gsap.to(particleLayerRef.current, {
            x: -mouseX * 65,
            y: -mouseY * 65,
            duration: 1.8,
            ease: "power3.out",
          });
        }

        // Layer 3: Interactive Liquid Fluid Energy Halo Spot
        if (spotlightRef.current) {
          const currentX = e.clientX - left;
          const currentY = e.clientY - top;

          gsap.to(spotlightRef.current, {
            x: currentX - 350, // Centers the 700px light sphere dynamically onto the cursor
            y: currentY - 350,
            duration: 1.2,
            ease: "power4.out",
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
      className="relative overflow-hidden bg-[#070b14] py-40 md:py-52 text-white select-none perspective-1000 flex items-center justify-center min-h-[85vh]"
    >
      {/* BACKGROUND GRAPHIC MATRIX: Ambient Deep Glow Fallback */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#131a38_0%,transparent_70%)] opacity-40 pointer-events-none z-0" />

      {/* PARALLAX LAYER 1: Cyber Geometric Blueprint Line Overlay Grid */}
      <div 
        ref={bgMeshRef}
        className="absolute inset-[-15%] bg-grid-lines-dark opacity-[0.22] mix-blend-overlay pointer-events-none z-10 will-change-transform" 
      />

      {/* PARALLAX LAYER 2: Scaled Volume Luxury Velvet Particles */}
      {!reducedMotion && (
        <div 
          ref={particleLayerRef}
          className="absolute inset-[-20%] pointer-events-none z-10 will-change-transform opacity-60 mix-blend-screen"
        >
          {PREMIUM_PARTICLES_CLUSTER.map((particle) => (
            <div
              key={particle.id}
              className={`absolute rounded-full pointer-events-none ${particle.size} ${particle.color} ${particle.blur}`}
              style={{
                top: particle.top,
                left: particle.left,
                boxShadow: particle.size === "size-3" ? "0 0 12px rgba(227,37,38,0.4)" : "none"
              }}
            />
          ))}
        </div>
      )}

      {/* PARALLAX LAYER 3: Cosmic Fusion Interactive Fluid Light Orb */}
      {!reducedMotion && (
        <div
          ref={spotlightRef}
          aria-hidden
          className="absolute top-0 left-0 size-[700px] rounded-full pointer-events-none filter blur-[150px] z-10 opacity-35 mix-blend-screen will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(227,37,38,0.55) 0%, rgba(35,48,103,0.3) 45%, transparent 80%)",
          }}
        />
      )}

      {/* Main Core Typography Typography Container */}
      <div ref={textClusterRef} className="relative z-20 mx-auto max-w-5xl px-6 text-center font-body">
        
        {/* Luxury Badge Tag */}
        <div className="premium-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-md px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#e32526] mb-8 shadow-inner shadow-white/5">
          <span className="size-2 rounded-full bg-[#e32526] animate-pulse shadow-[0_0_8px_#e32526]" />
          <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">Our Global Specializations</span>
        </div>
        
        {/* Cinematic Title Block Header */}
        <h1 className="premium-reveal font-heading text-4xl font-black tracking-tight leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white will-change-transform">
          End-to-End Event Platforms <br className="hidden md:block"/> for{" "}
          <span className="relative inline-block mt-2 md:mt-0">
            <span className="bg-gradient-to-r from-white via-white/95 to-slate-400 bg-clip-text text-transparent">
              Business Growth
            </span>
            <span className="absolute left-0 bottom-2 h-[3px] w-full bg-gradient-to-r from-transparent via-[#e32526]/50 to-transparent blur-[0.5px]" />
          </span>
        </h1>
        
        {/* Luxury Microcopy Body */}
        <p className="premium-reveal mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg lg:text-xl font-normal tracking-wide will-change-transform opacity-90">
          Futurex delivers high-performing exhibition schemas, international summits, corporate activations, and bespoke trade frameworks engineered explicitly to connect global brands with high-intent corporate buyer portfolios.
        </p>
      </div>

      {/* Luxury Base Floor Mesh Vignette Layer */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#070b14] via-[#070b14]/60 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#070b14] to-transparent pointer-events-none z-10" />
    </section>
  );
}