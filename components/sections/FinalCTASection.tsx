"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { LeadFlowForm } from "@/components/forms/LeadFlowForm"; // Form ko import kiya

// Small scattered particle positions — same "premium float" treatment used
// across the rest of the site's heroes.
const PARTICLES = [
  { top: "14%", left: "8%", size: "size-1.5", tone: "bg-cherry/70", delay: "0s" },
  { top: "24%", right: "12%", size: "size-1", tone: "bg-white/50", delay: "0.8s" },
  { top: "68%", left: "16%", size: "size-1", tone: "bg-white/40", delay: "1.6s" },
  { top: "78%", right: "10%", size: "size-1.5", tone: "bg-cherry/60", delay: "0.4s" },
  { top: "45%", left: "3%", size: "size-1", tone: "bg-cherry/50", delay: "2.1s" },
  { top: "36%", right: "5%", size: "size-1", tone: "bg-white/50", delay: "1.1s" },
  { top: "88%", left: "40%", size: "size-1.5", tone: "bg-white/40", delay: "1.9s" },
] as const;

// The four corner positions for the glint effect on the form frame.
const CORNER_GLINTS = [
  { top: "-6px", left: "-6px", delay: "0s" },
  { top: "-6px", right: "-6px", delay: "0.6s" },
  { bottom: "-6px", left: "-6px", delay: "1.2s" },
  { bottom: "-6px", right: "-6px", delay: "1.8s" },
] as const;

export function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // Ambient glow — one-time play, not scrubbed to scroll position.
      gsap.fromTo(
        glowRef.current,
        { scale: 0.7, opacity: 0.1 },
        {
          scale: 1.1,
          opacity: 0.32,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text (left) and form (right) now animate on the SAME timeline
      // position (both passed "0"), so they move in together instead of
      // one after another, and both travel horizontally from their own
      // side instead of drifting up from the bottom.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        textGroupRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0
      ).fromTo(
        formWrapperRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-navy py-10 md:py-14 text-white font-body"
    >
      {/* Structural Sub-Mesh Overlay */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.2] mix-blend-overlay pointer-events-none" />

      {/* Kinetic Ambient Glow Layer — sized down again */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute left-1/3 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none filter blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(227,37,38,0.3) 0%, transparent 75%)",
          opacity: reducedMotion ? 0.3 : 0.1,
        }}
      />

      {/* Particle field */}
      {!reducedMotion && (
        <div aria-hidden className="absolute inset-0 pointer-events-none z-10">
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

      {/* Main Responsive Grid Wrapper (2-Columns on Desktop) */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

          {/* LEFT SIDE: Animated Branding Content */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <div ref={textGroupRef}>
              {/* Editorial Subtitle Frame */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cherry-light mb-4">
                <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
                Established 2011 • Next Steps
              </span>

              {/* Title — cherry accent on "Next", gradient on the second line */}
              <h2 className="font-heading text-2xl font-bold tracking-tight leading-[1.2] sm:text-3xl md:text-3xl lg:text-4xl text-white">
                Ready to Build Your <span className="text-cherry-light">Next</span>{" "}
                <span className="bg-gradient-to-r from-white via-white/90 to-cherry-light bg-clip-text text-transparent">
                  Business Opportunity?
                </span>
              </h2>

              {/* Subtext — key phrase in cherry-light */}
              <p className="cta-subtext mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base font-normal">
                Partner with Futurex to exhibit, sponsor or blueprint high-impact industry
                platforms that connect your global corporate footprint with verified buyers.
                Fill out the application profile on the right to trigger{" "}
                <span className="text-cherry-light font-semibold">instant secure boarding</span>.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Form, with a continuous red corner-glint frame */}
          <div
            ref={formWrapperRef}
            className="relative lg:col-span-7 w-full max-w-lg mx-auto lg:mx-0"
          >
            {/* Continuous animated corner glints — pure CSS, loops forever,
                independent of the GSAP entrance so it keeps going after the
                section has already animated in. */}
            {!reducedMotion &&
              CORNER_GLINTS.map((c, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="cta-corner-glint absolute z-30 size-3 rounded-full bg-cherry blur-[3px] pointer-events-none"
                  style={{
                    top: "top" in c ? c.top : undefined,
                    bottom: "bottom" in c ? c.bottom : undefined,
                    left: "left" in c ? c.left : undefined,
                    right: "right" in c ? c.right : undefined,
                    animationDelay: c.delay,
                  }}
                />
              ))}

            {/*
              Scaled down as a stopgap — this shrinks the form visually
              (including its click targets) without touching its internals.
              I don't have LeadFlowForm.tsx, so I can't reduce its actual
              padding/gap-between-fields from here. Send that file and I'll
              fix the real internal height instead of relying on this scale
              trick.
            */}
            <div className="scale-[0.92] origin-top">
              <LeadFlowForm
                title="Secure Priority Access"
                subtitle="Submit details to coordinate stall metrics & space allocation timelines."
                submitLabel="Initiate Secure Onboarding"
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .cta-corner-glint {
          animation: cta-corner-glimmer 2.4s ease-in-out infinite;
        }
        @keyframes cta-corner-glimmer {
          0%, 100% { transform: scale(0.6); opacity: 0.25; }
          50% { transform: scale(1.2); opacity: 0.95; }
        }
      `}</style>
    </section>
  );
}