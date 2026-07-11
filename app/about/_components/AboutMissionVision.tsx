"use client";

import { useRef } from "react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutMissionVision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

 useGSAP(
  () => {
    if (reducedMotion) return;
    
    // 1. Safely extract the elements and assign type definitions
    const cards = containerRef.current?.querySelectorAll<HTMLDivElement>(".mv-card");
    const triggerElement = containerRef.current;

    // 2. Structural safety guard to completely eliminate the TypeScript error
    if (!cards || cards.length === 0 || !triggerElement) return;
    
    gsap.fromTo(
      cards, // Passing a clean, strongly-typed NodeList
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  },
  { scope: containerRef, dependencies: [reducedMotion] }
);

  return (
    <section ref={containerRef} className="bg-white py-24 font-body">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <div className="mv-card will-change-transform">
          <HoverLiftCard className="h-full border border-navy/5 bg-surface/30 p-8 rounded-2xl">
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-cherry">
              Our Mission
            </p>
            <div className="mt-6 space-y-4 text-navy/70 text-sm leading-relaxed">
              <p>Increase our existing show standards and develop new shows according to the latest market demand.</p>
              <p>Create business cooperation and networking opportunities that foster long-term business growth.</p>
              <p>Expand our masterpiece exhibitions across the region, strengthening our presence in emerging and established markets.</p>
              <p>Futurex strives to excel in high-quality service delivery through trust, commitment, and perseverance.</p>
              <p>Organize the largest number of specialized trade fairs while serving promising industries across the country and the region.</p>
              <p>Provide visitors with valuable information and meaningful insights into the industries and sectors they are most interested in.</p>
            </div>
          </HoverLiftCard>
        </div>

        <div className="mv-card will-change-transform">
          <HoverLiftCard className="h-full border border-navy/5 bg-surface/30 p-8 rounded-2xl">
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-cherry">
              Our Vision
            </p>
            <div className="mt-6 space-y-4 text-navy/70 text-sm leading-relaxed">
              <p>
                Exhibitions transcend mere spectacle; their true value lies in the effectiveness with which they unite like-minded business entities under a single roof. At Futurex, our aspiration is to propel the exhibition industry to unparalleled heights while adhering to the highest international standards.
              </p>
              <p>
                We are dedicated to laying the groundwork for effective business development, fostering meaningful consumer engagement, facilitating seamless project execution, and promoting comprehensive industry knowledge.
              </p>
              <p className="font-semibold text-navy mt-4">Our strategic pillars include:</p>
              <ul className="grid grid-cols-1 gap-2 text-navy/80 pl-2">
                <li>• <strong>Enhanced Networking:</strong> High-value connection frameworks.</li>
                <li>• <strong>Elevated Brand Visibility:</strong> Dynamic corporate market placement.</li>
                <li>• <strong>In-depth Industry Insights:</strong> Expert knowledge transfer ecosystems.</li>
                <li>• <strong>Strategic Counsel:</strong> Strategic, ROI-maximizing deployment solutions.</li>
                <li>• <strong>Instant Deal Closing:</strong> Real-time cross-border negotiation channels.</li>
              </ul>
            </div>
          </HoverLiftCard>
        </div>
      </div>
    </section>
  );
}