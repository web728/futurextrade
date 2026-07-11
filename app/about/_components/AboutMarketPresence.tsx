"use client";

import { useRef } from "react";
import { MapPin } from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { WorldExpoMap } from "@/components/interactive/WorldExpoMap";
import { CONTACT } from "@/lib/constants/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutMarketPresence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

useGSAP(
  () => {
    if (reducedMotion) return;

    // 1. Safely extract your list of branch elements and the trigger element
    const branchNodes = containerRef.current?.querySelectorAll<HTMLDivElement>(".branch-node");
    const branchGrid = containerRef.current?.querySelector<HTMLDivElement>(".branch-grid");

    // 2. Clear out potential missing nodes so TypeScript stays completely happy
    if (!branchNodes || branchNodes.length === 0 || !branchGrid) return;

    gsap.fromTo(
      branchNodes, // Safe, strongly-typed array/list
      { opacity: 0, scale: 0.9, y: 15 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.05,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: branchGrid, // Clean DOM element target
          start: "top 90%",
        },
      }
    );
  },
  { scope: containerRef, dependencies: [reducedMotion] }
);


  return (
    <section ref={containerRef} className="bg-white py-24 font-body">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-cherry">Market Presence</p>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy sm:text-4xl">
            South Asia &amp; East Africa — One Connected Trade Network
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy/60">
            From our New Delhi corporate offices, Futurex deploys specialized enterprise operations across developing trade lanes.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-navy/5 bg-surface/30 p-4 sm:p-8 shadow-inner">
          <WorldExpoMap />
        </div>

        <div className="mt-16">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-navy/40">Registered Branch Nodes</p>
          <div className="branch-grid mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {CONTACT.branches.map((branch) => (
              <div key={branch} className="branch-node will-change-transform">
                <HoverLiftCard className="flex flex-col items-center gap-2 text-center p-4 rounded-xl border border-navy/5 bg-surface/40 shadow-sm">
                  <MapPin className="size-5 text-cherry" />
                  <span className="text-xs sm:text-sm font-semibold text-navy">{branch}</span>
                </HoverLiftCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}