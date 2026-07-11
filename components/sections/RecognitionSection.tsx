"use client";

import { useRef } from "react";
import { Quote } from "lucide-react";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { LogoMarquee } from "@/components/interactive/LogoMarquee";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { ASSOCIATE_LOGOS } from "@/lib/constants/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function RecognitionSection() {
  const items = TESTIMONIALS.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const testimonialGridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // 1. Signature Letter-by-Letter Color Reveal
      const letters = headlineRef.current?.querySelectorAll(".reveal-char");
      if (letters && letters.length > 0) {
        gsap.fromTo(
          letters,
          { color: "rgba(35, 48, 103, 0.15)" },
          {
            color: "rgba(35, 48, 103, 1)",
            stagger: 0.02,
            ease: "none",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      // 2. 3D Flip & Horizontal Stagger Entrance for Testimonial Glass Panels
      const panels = testimonialGridRef.current?.querySelectorAll(".testimonial-panel-trigger");
      if (panels && panels.length > 0) {
        gsap.fromTo(
          panels,
          {
            opacity: 0,
            y: 60,
            rotateY: 15,
            scale: 0.97,
            transformOrigin: "center left",
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: testimonialGridRef.current,
              start: "top 90%",
              end: "top 55%",
              scrub: 1.2,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const renderSplitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="reveal-char inline-block"
        style={{ color: reducedMotion ? "rgba(35, 48, 103, 1)" : "rgba(35, 48, 103, 0.15)" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-[#fbfbfc] py-24 md:py-28"
    >
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-grid-lines-light opacity-[0.04] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header Frame */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-cherry/10 bg-cherry/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cherry">
            <span className="size-1.5 rounded-full bg-cherry" />
            Recognition & Trust
          </p>
          <h2 
            ref={headlineRef}
            className="mt-6 text-3xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-4xl md:text-5xl"
          >
            {renderSplitText("Recognized by Businesses and Industry Leaders")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-navy/60 sm:text-base">
            Global business leaders validate Futurex platforms for driving exceptional B2B coordination, high-intent audiences, and expansion routes.
          </p>
        </div>

        {/* 3D Kinetic Grid Frame */}
        <div 
          ref={testimonialGridRef} 
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 [perspective:1500px] [transform-style:preserve-3d]"
        >
          {items.map((t) => (
            <div
              key={t.id}
              className="testimonial-panel-trigger group relative flex h-full flex-col justify-between rounded-2xl border border-black/[0.04] bg-white p-8 transition-all duration-500 hover:border-transparent hover:bg-gradient-to-b hover:from-white hover:to-slate-50/30 hover:shadow-[0_24px_50px_rgba(35,48,103,0.05)]"
              style={{ opacity: reducedMotion ? 1 : 0 }}
            >
              <div>
                {/* Clean Top Row Quote Icon Block */}
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 border border-black/[0.02] shadow-sm transition-all duration-500 group-hover:bg-cherry group-hover:text-white">
                  <Quote className="size-4 text-cherry/60 transition-colors duration-500 group-hover:text-white" />
                </div>
                
                {/* Main Quote Content */}
                <p className="mt-6 text-[14.5px] leading-relaxed font-medium text-navy/70 transition-colors duration-300 group-hover:text-navy/90">
                  “{t.quote}”
                </p>
              </div>

              {/* Author Footer Profile */}
              <div className="mt-8 flex items-center gap-4 border-t border-black/[0.03] pt-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy text-xs font-bold tracking-wider text-white shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:bg-cherry">
                  {t.company.charAt(0)}
                </span>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-bold text-navy transition-colors duration-300 group-hover:text-cherry">
                    {t.company}
                  </p>
                  <p className="truncate mt-0.5 text-xs text-navy/40 font-medium">
                    {t.designation} <span className="text-black/10 mx-1">·</span> {t.eventOrIndustry}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="mt-14 text-center">
          <MotionCTAButton 
            href="/testimonials" 
            variant="outline" 
            className="rounded-full px-8 font-semibold tracking-wide border-navy/10 hover:bg-navy hover:text-white transition-all duration-300"
          >
            Read Testimonials
          </MotionCTAButton>
        </div>

        {/* Association Marquee Module Link */}
        <div className="mt-20 border-t border-black/[0.04] pt-12">
          <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-navy/40">
            Recognized by leading industry associations
          </p>
          <div className="opacity-80 transition-opacity duration-300 hover:opacity-100">
            <LogoMarquee logos={ASSOCIATE_LOGOS} />
          </div>
        </div>

      </div>
    </section>
  );
}