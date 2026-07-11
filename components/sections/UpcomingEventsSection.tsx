"use client";

import { useRef } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { getUpcomingEvents, isEventUpcoming } from "@/lib/constants/exhibitions";
import { INDUSTRIES } from "@/lib/constants/industries";
import { INDUSTRY_ICONS } from "@/components/sections/IndustriesGridSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function UpcomingEventsSection() {
  const events = getUpcomingEvents(3);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // 1. Headline Character Color Fill Trigger
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
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      }

      // 2. Kinetic Card Overlap Zoom Entrance
      const eventCards = cardsRef.current?.querySelectorAll(".event-card-trigger");
      if (eventCards && eventCards.length > 0) {
        gsap.fromTo(
          eventCards,
          {
            opacity: 0,
            y: 80,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              end: "top 50%",
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
      className="relative overflow-hidden bg-[#white] py-24 md:py-28"
    >
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 bg-grid-lines-light opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-cherry/10 bg-cherry/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cherry">
            <span className="size-1.5 rounded-full bg-cherry" />
            Step Onto the Event Floor
          </p>
          <h2 
            ref={headlineRef}
            className="mt-6 text-3xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-4xl md:text-5xl"
          >
            {renderSplitText("Discover Upcoming Futurex Exhibitions")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-navy/60 sm:text-base">
            Explore high-impact B2B platforms designed to connect industries, decision-makers, and high-value global market opportunities.
          </p>
        </div>

        {/* Dynamic Event Grid */}
        <div 
          ref={cardsRef} 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {events.map((event) => {
            const upcoming = isEventUpcoming(event);
            const industry = INDUSTRIES.find((i) => i.name === event.industry);
            const Icon = industry ? INDUSTRY_ICONS[industry.icon] : null;

            return (
              <div
                key={event.id}
                className="event-card-trigger group block h-full select-none"
                style={{ opacity: reducedMotion ? 1 : 0 }}
              >
                <HoverLiftCard className="relative flex h-full flex-col !p-0 overflow-hidden rounded-2xl border border-black/[0.04] bg-white transition-all duration-500 hover:border-transparent hover:shadow-[0_30px_60px_rgba(35,48,103,0.08)]">
                  
                  {/* Hero Media Layer */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <GalleryImage
                      src={event.heroImage ?? "/images/gallery/futurex-industry-conference-1.webp"}
                      alt={event.name}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-95"
                    />
                    
                    {/* High-End Ambient Layer Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                    
                    {/* Industry Icon Badge floating */}
                    {Icon && (
                      <span className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-sm transition-transform duration-500 group-hover:scale-110">
                        <Icon className="size-4.5" />
                      </span>
                    )}

                    {/* Status Pill Indicator */}
                    <span
                      className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md border ${
                        upcoming 
                          ? "bg-cherry/90 border-cherry/20 text-white" 
                          : "bg-navy/40 border-white/10 text-white/90"
                      }`}
                    >
                      {upcoming ? "Upcoming" : "Concluded"}
                    </span>

                    {/* Compressed Overlay Headline */}
                    <h3 className="absolute bottom-5 left-5 right-5 text-xl font-extrabold tracking-tight text-white line-clamp-2 leading-tight">
                      {event.name}
                    </h3>
                  </div>

                  {/* Context & Description Body */}
                  <div className="flex flex-1 flex-col p-6 pt-5 justify-between">
                    <div>
                      <span className="inline-block rounded-md bg-slate-50 border border-black/[0.03] px-2.5 py-1 text-xs font-bold text-navy/70">
                        {event.industry}
                      </span>
                      
                      {/* Event Metadata details */}
                      <div className="mt-4 space-y-2.5 text-[13px] text-navy/60">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-6 items-center justify-center rounded-md bg-cherry/5 text-cherry">
                            <CalendarDays className="size-3.5" />
                          </div>
                          <span className="font-medium">{event.dates.display}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-6 items-center justify-center rounded-md bg-cherry/5 text-cherry">
                            <MapPin className="size-3.5" />
                          </div>
                          <span className="font-medium">{event.venue.city}, {event.venue.country}</span>
                        </div>
                      </div>

                      <p className="mt-4 line-clamp-2 text-[13.5px] leading-relaxed text-navy/50 transition-colors duration-300 group-hover:text-navy/70">
                        {event.description}
                      </p>
                    </div>

                    {/* Interactive Footer Navigation Hook */}
                    <div className="mt-8 pt-4 border-t border-black/[0.02]">
                      <Link
                        href={`/exhibitions/${event.id}`}
                        className="inline-flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-navy/60 transition-colors duration-300 group-hover:text-cherry"
                      >
                        <span>{upcoming ? "Secure Exhibition Space" : "Review Platform Analytics"}</span>
                        <div className="flex size-6 items-center justify-center rounded-full bg-slate-50 border border-black/[0.04] transition-all duration-300 group-hover:bg-cherry group-hover:text-white group-hover:border-transparent">
                          <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    </div>

                  </div>
                </HoverLiftCard>
              </div>
            );
          })}
        </div>

        {/* Global CTA Action Button */}
        <div className="mt-16 text-center">
          <MotionCTAButton href="/exhibitions" variant="outline" className="rounded-full px-8 tracking-wide font-semibold text-sm border-navy/10 hover:bg-navy hover:text-white transition-all duration-300">
            View All Platforms
          </MotionCTAButton>
        </div>
        
      </div>
    </section>
  );
}