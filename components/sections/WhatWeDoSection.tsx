"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Landmark, Presentation, CalendarDays, Globe2 } from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

const PILLARS = [
  {
    slug: "trade-exhibitions",
    icon: Landmark,
    title: "Trade Exhibitions",
    body: "Large-scale industry exhibitions that connect brands with serious buyers and market opportunities.",
  },
  {
    slug: "conferences",
    icon: Presentation,
    title: "Conferences & Summits",
    body: "Knowledge-led platforms for industry leaders, policymakers, innovators and decision-makers.",
  },
  {
    slug: "corporate-events",
    icon: CalendarDays,
    title: "Corporate Events",
    body: "Custom event experiences designed for brands, associations and business communities.",
  },
  {
    slug: "international-expos",
    icon: Globe2,
    title: "International Business Networking",
    body: "Curated platforms that help companies build cross-border partnerships and industry connections.",
  },
] as const;

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Header Refs for scroll triggers
  const pillRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // 1. ADVANCED HEADLINE & LINES TEXT FILL ANIMATION (SCRUBBED)
      const letters = headlineRef.current?.querySelectorAll(".reveal-char");
      if (letters && letters.length > 0) {
        // Timeline specifically for the upper block elements
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%", // Starts animating early as it rolls up
            end: "top 35%",   // Completes right before you hit full viewing center
            scrub: 1,         // Direct binding to scroll wheel context
          }
        });

        headerTl
          // Animate the Upper Pill Tag first
          .fromTo(pillRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, ease: "none" })
          // The main event: Scroll-based letter-by-letter text gradient fill
          .fromTo(
            letters,
            { color: "rgba(35, 48, 103, 0.15)" }, // Muted background placeholder text color
            {
              color: "rgba(35, 48, 103, 1)", // Full crisp high-end Navy fill color
              stagger: 0.02, // Progresses letter by letter smoothly
              ease: "none",
            },
            "-=0.2"
          )
          // Lower Sub-Paragraph Text tracks beautifully right after the text fills
          .fromTo(subtextRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, ease: "none" }, "-=0.1");
      }

      // 2. 3D PERSPECTIVE CARDS UNRAVEL ANIMATION
      const cards = gridRef.current?.querySelectorAll(".pillar-card-trigger");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 100,
            rotateX: -25,
            transformOrigin: "top center",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 92%",
              end: "top 50%",
              scrub: 1.2,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  // Helper function to split text string into target elements without bloated heavy outer plugins
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
      className="bg-grain relative overflow-hidden bg-[#fafafa] py-24 pb-28 md:py-28"
    >
      {/* Subtle Premium Background Blueprint Lines */}
      <div className="absolute inset-0 bg-grid-lines-light opacity-[0.08] pointer-events-none" />
      <div
        aria-hidden
        className="absolute top-1/2 right-1/4 size-[40rem] rounded-full opacity-[0.03] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Header Block Frame */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          {/* Upper Line: Tag Pill */}
          <p 
            ref={pillRef}
            className="inline-flex items-center gap-2 rounded-full border border-cherry/10 bg-cherry/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cherry"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            <span className="size-1.5 rounded-full bg-cherry" />
            What Futurex Does
          </p>

          {/* Advanced Scroll-Trigger Reveal Headline */}
          <h2 
            ref={headlineRef}
            className="mt-6 text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl md:text-5xl"
          >
            {renderSplitText("The Bridge Between Industries, Markets & People")}
          </h2>

          {/* Lower Line: Description Subtext */}
          <p 
            ref={subtextRef}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-navy/70 sm:text-base"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            Four connected pillars that turn industry presence into real business outcomes—meticulously structured to maximize engagement.
          </p>
        </div>

        {/* 3D Perspective Parent Container Grid */}
        <div 
          ref={gridRef} 
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 [perspective:1200px] [transform-style:preserve-3d]"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.slug}
                href={`/services/${pillar.slug}`}
                className="pillar-card-trigger group block h-full select-none"
                style={{ opacity: reducedMotion ? 1 : 0 }}
              >
                <HoverLiftCard className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.04] bg-white p-7 transition-all duration-500 ease-out hover:border-transparent hover:bg-gradient-to-b hover:from-white hover:to-slate-50/50 hover:shadow-[0_20px_40px_rgba(35,48,103,0.06)]">
                  
                  <div>
                    {/* Premium Icon Ring */}
                    <div className="flex size-12 items-center justify-center rounded-xl bg-slate-50 text-navy border border-black/[0.02] shadow-sm transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-navy group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(35,48,103,0.15)]">
                      <Icon className="size-5 transition-transform duration-500 group-hover:rotate-3" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-cherry">
                      {pillar.title}
                    </h3>
                    
                    {/* Body Description */}
                    <p className="mt-3 text-[13.5px] leading-relaxed text-navy/60 transition-colors duration-300 group-hover:text-navy/80">
                      {pillar.body}
                    </p>
                  </div>

                  {/* Bottom Link Badge */}
                  <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy/40 transition-all duration-300 group-hover:text-cherry">
                    <span>Explore Platform</span>
                    <div className="relative flex size-5 items-center justify-center rounded-full bg-slate-50 border border-black/[0.04] transition-all duration-300 group-hover:bg-cherry/10 group-hover:border-transparent">
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Minimal Core Accent Layer (Blueprint Corner Mark) */}
                  <div className="absolute top-3 right-3 size-1.5 rounded-full bg-cherry opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
                </HoverLiftCard>
              </Link>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}