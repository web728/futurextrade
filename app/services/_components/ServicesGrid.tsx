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
} from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { SERVICES, type Service } from "@/lib/constants/services";
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

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // 1. Target all separate individual card items safely
      const serviceCards = containerRef.current?.querySelectorAll<HTMLAnchorElement>(".service-card-node");

      if (!serviceCards || serviceCards.length === 0) return;

      // 2. Loop through each item to anchor standalone scroll triggers
      serviceCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 50, 
            scale: 0.96 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              // Triggers when the top of each individual card hits 88% of the viewport height
              start: "top 88%",
              // Clears trigger once animated to optimize browser memory performance
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={containerRef} className="bg-surface py-16 pb-28 font-body">
      <div className="mx-auto max-w-7xl px-6">
        {/* Removed structural trigger class since elements now self-manage */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card-node block h-full group will-change-transform outline-none"
              >
                <HoverLiftCard className="h-full border border-navy/5 bg-white p-8 rounded-2xl shadow-sm transition-all duration-300 group-hover:border-cherry/10 group-hover:shadow-md">
                  <span className="inline-flex p-3 rounded-xl bg-navy/5 text-cherry mb-5 group-hover:bg-cherry group-hover:text-white transition-all duration-300 transform group-hover:scale-105 will-change-transform">
                    <Icon className="size-6" />
                  </span>
                  
                  <h3 className="font-heading text-lg font-bold text-navy tracking-tight group-hover:text-cherry transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-navy/60 font-normal">
                    {service.shortDesc}
                  </p>
                  
                  <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-cherry opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore Platform Details &rarr;
                  </div>
                </HoverLiftCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}