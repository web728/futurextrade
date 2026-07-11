"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Landmark,
  Globe2,
  Presentation,
  CalendarDays,
  Megaphone,
  LayoutTemplate,
  Video,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import type { Service } from "@/lib/constants/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

const ICONS: Record<Service["icon"], typeof Landmark> = {
  "trade-exhibitions": Landmark,
  "international-expos": Globe2,
  conferences: Presentation,
  "corporate-events": CalendarDays,
  "branding-promotions": Megaphone,
  "exhibition-stand-design": LayoutTemplate,
  "webinars-virtual-events": Video,
};

const INCLUSIONS: Record<Service["icon"], string[]> = {
  "trade-exhibitions": [
    "End-to-end exhibition planning, from concept to on-ground execution",
    "Exhibitor onboarding, stall allocation and floor plan management",
    "Targeted visitor promotion to reach qualified buyers and decision-makers",
    "On-site coordination, registration and business networking support",
  ],
  "international-expos": [
    "Market assessment and positioning for cross-border participation",
    "Coordination with regional trade bodies, chambers and delegations",
    "International exhibitor and buyer outreach programs",
    "On-ground logistics support across participating markets",
  ],
  conferences: [
    "Agenda design in collaboration with industry experts and speakers",
    "Speaker sourcing, session planning and panel curation",
    "Delegate registration and audience engagement management",
    "Professional venue, audio-visual and hospitality coordination",
  ],
  "corporate-events": [
    "Concept development aligned with your business objectives",
    "End-to-end event planning, vendor coordination and logistics",
    "Guest management, hospitality and on-site execution",
    "Post-event reporting and follow-up support",
  ],
  "branding-promotions": [
    "Pre-event promotional campaigns to build audience awareness",
    "On-ground branding, signage and visibility placements",
    "Digital and print promotional collateral coordination",
    "Post-event visibility and brand recall initiatives",
  ],
  "exhibition-stand-design": [
    "Custom booth concept and layout design",
    "Fabrication, branding and on-site stand execution",
    "Furniture, AV and display element coordination",
    "On-time installation and dismantling management",
  ],
  "webinars-virtual-events": [
    "Virtual platform setup and technical coordination",
    "Speaker and panel session management for digital audiences",
    "Audience registration, engagement and moderation support",
    "Recording, reporting and post-event content distribution",
  ],
};

interface ServiceDetailClientProps {
  service: Service;
  related: Service[];
}

export function ServiceDetailClient({ service, related }: ServiceDetailClientProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Parallax Layer Nodes
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroMeshRef = useRef<HTMLDivElement>(null);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);
  const heroTextClusterRef = useRef<HTMLDivElement>(null);

  // Section Tracking Targets
  const inclusionsSectionRef = useRef<HTMLDivElement>(null);
  const relatedSectionRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const Icon = ICONS[service.icon];
  const inclusions = INCLUSIONS[service.icon];

  useGSAP(
    () => {
      // 1. Hero Entrance Microsequence
      const introElements = heroTextClusterRef.current?.querySelectorAll(".premium-reveal");
      if (introElements && introElements.length > 0) {
        gsap.fromTo(
          introElements,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.05,
          }
        );
      }

      if (reducedMotion) return;

      // 2. Geometric Mouse Parallax Engine Hook
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroContainerRef.current) return;
        const { width, height, left, top } = heroContainerRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5;
        const mouseY = (e.clientY - top) / height - 0.5;

        if (heroMeshRef.current) {
          gsap.to(heroMeshRef.current, {
            x: mouseX * 20,
            y: mouseY * 20,
            duration: 1.8,
            ease: "power2.out",
          });
        }

        if (heroSpotlightRef.current) {
          const innerX = e.clientX - left;
          const innerY = e.clientY - top;
          gsap.to(heroSpotlightRef.current, {
            x: innerX - 250,
            y: innerY - 250,
            duration: 1.4,
            ease: "power3.out",
          });
        }
      };

      const heroEl = heroContainerRef.current;
      if (heroEl) heroEl.addEventListener("mousemove", handleMouseMove);

      // 3. Independent Scroll Staggers for Inclusion Cards
      const inclusionCards = inclusionsSectionRef.current?.querySelectorAll<HTMLLIElement>(".inclusion-node");
      if (inclusionCards && inclusionCards.length > 0) {
        inclusionCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 35, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      }

      // 4. Stagger Loops for Related Service Links
      const relatedCards = relatedSectionRef.current?.querySelectorAll<HTMLAnchorElement>(".related-card-node");
      if (relatedCards && relatedCards.length > 0) {
        relatedCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                once: true,
              },
            }
          );
        });
      }

      return () => {
        if (heroEl) heroEl.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: mainRef, dependencies: [reducedMotion, service.slug] }
  );

  return (
    <div ref={mainRef} className="w-full font-body">
      {/* Dynamic Ambient Header */}
      <section 
        ref={heroContainerRef}
        data-cursor="vibrant"
        className="relative overflow-hidden bg-[#0a0f1d] py-28 md:py-36 text-white select-none perspective-1000"
      >
        <div 
          ref={heroMeshRef}
          className="absolute inset-[-10%] bg-grid-lines-dark opacity-[0.12] pointer-events-none z-10 will-change-transform" 
        />
        
        {!reducedMotion && (
          <div
            ref={heroSpotlightRef}
            aria-hidden
            className="absolute top-0 left-0 size-[500px] rounded-full pointer-events-none filter blur-[120px] z-10 opacity-30 mix-blend-screen will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(227,37,38,0.45) 0%, transparent 75%)",
            }}
          />
        )}

        <div ref={heroTextClusterRef} className="relative z-20 mx-auto max-w-5xl px-6">
          {/* Breadcrumb Matrix */}
          <nav aria-label="breadcrumb" className="premium-reveal flex items-center gap-1.5 text-xs text-white/40 tracking-wide font-normal will-change-transform">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="size-3.5 opacity-60" aria-hidden />
            <Link href="/services" className="transition-colors hover:text-white">Services</Link>
            <ChevronRight className="size-3.5 opacity-60" aria-hidden />
            <span aria-current="page" className="text-cherry-light font-medium">{service.name}</span>
          </nav>

          {/* Headline cluster */}
          <div className="mt-8 max-w-4xl">
            <div className="premium-reveal inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-cherry-light mb-6 will-change-transform">
              <Icon className="size-6" />
            </div>
            
            <h1 className="premium-reveal font-heading text-4xl font-bold tracking-tight leading-[1.15] sm:text-5xl md:text-6xl text-white will-change-transform">
              {service.heading.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="bg-gradient-to-r from-white via-white/95 to-cherry-light bg-clip-text text-transparent">
                {service.heading.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            
            <p className="premium-reveal mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base md:text-lg font-normal will-change-transform">
              {service.body}
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0f1d] to-transparent pointer-events-none z-10" />
      </section>

      {/* Execution Architecture Block */}
      <section ref={inclusionsSectionRef} className="bg-white py-24 border-b border-navy/5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cherry">
              <span className="size-1.5 rounded-full bg-cherry" />
              Functional Matrix
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              How Futurex Delivers This Service
            </h2>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {inclusions.map((item) => (
              <li 
                key={item} 
                className="inclusion-node flex items-start gap-4 rounded-2xl border border-navy/5 bg-surface p-6 transition-all duration-300 hover:border-cherry/10 hover:shadow-sm will-change-transform"
              >
                <span className="flex size-7 items-center justify-center rounded-lg bg-cherry/5 text-cherry shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" aria-hidden />
                </span>
                <span className="text-sm md:text-base text-navy/75 leading-relaxed font-normal">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <MagneticButton>
              <div className="inline-block">
                <MotionCTAButton href="/contact" variant="primary" size="lg" className="rounded-full tracking-wide shadow-lg shadow-cherry/10">
                  {service.cta}
                </MotionCTAButton>
              </div>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Cross-Platform Related Exploration */}
      <section ref={relatedSectionRef} className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cherry">
              <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
              Related Ecosystems
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Explore More Ways We Can Help
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => {
              const RelatedIcon = ICONS[s.icon];
              return (
                <Link 
                  key={s.slug} 
                  href={`/services/${s.slug}`} 
                  className="related-card-node block h-full group will-change-transform outline-none"
                >
                  <HoverLiftCard className="h-full border border-navy/5 bg-white p-8 rounded-2xl shadow-sm transition-all duration-300 group-hover:border-cherry/10 group-hover:shadow-md">
                    <span className="inline-flex p-3 rounded-xl bg-navy/5 text-cherry mb-5 group-hover:bg-cherry group-hover:text-white transition-all duration-300 transform group-hover:scale-105 will-change-transform">
                      <RelatedIcon className="size-6" />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-navy tracking-tight group-hover:text-cherry transition-colors duration-300">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy/60 font-normal">
                      {s.shortDesc}
                    </p>
                    <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-cherry opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Analyze Strategy &rarr;
                    </div>
                  </HoverLiftCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}