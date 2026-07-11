"use client";

import { useRef } from "react";
import { Leaf, Handshake, ShieldCheck, Clock3 } from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

const VALUE_ITEMS = [
  { icon: Leaf, title: "Business Ethics", text: "We are committed to responsible business practices that promote sustainability and environmental consciousness. Every aspect of our operations reflects our dedication to building a greener future while maintaining ethical corporate values." },
  { icon: Handshake, title: "Respect", text: "We value every client relationship by listening carefully, understanding unique localized market requirements, and delivering solutions that consistently exceed corporate and association expectations." },
  { icon: ShieldCheck, title: "Integrity", text: "Honesty, radical transparency, and absolute sincerity guide every logistical decision we execute. We build deep international relationships founded on transparent performance and trust." },
  { icon: Clock3, title: "Reliability", text: "Reliability is earned strictly through timeline consistency. By remaining strategic, honoring deep operational commitments, and mastering deadlines, we deliver dependable project architectures." },
];

export function AboutValues() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  
useGSAP(
  () => {
    if (reducedMotion) return;

    // 1. Safely extract your specific header and grid card elements
    const valsHeader = containerRef.current?.querySelector<HTMLDivElement>(".vals-header");
    const gridCards = containerRef.current?.querySelectorAll<HTMLDivElement>(".val-grid-card");
    const triggerElement = containerRef.current;

    // 2. Early return check satisfies the compiler completely
    if (!valsHeader || !gridCards || gridCards.length === 0 || !triggerElement) return;
    
    // 3. Build your timeline using the guaranteed, strongly-typed variables
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 80%",
      }
    });

    tl.fromTo(valsHeader, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: "power2.out" })
      .fromTo(gridCards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" }, "-=0.15");
  },
  { scope: containerRef, dependencies: [reducedMotion] }
);

  return (
    <section ref={containerRef} className="bg-surface py-24 font-body">
      <div className="mx-auto max-w-7xl px-6">
        <div className="vals-header mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-cherry">Our Values</p>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy sm:text-4xl">The Principles That Define Futurex</h2>
          <p className="mt-4 text-navy/60 text-sm sm:text-base">
            Our global success is engineered upon rigorous operational core values that safeguard trust and enforce project delivery excellence.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {VALUE_ITEMS.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="val-grid-card will-change-transform">
                <HoverLiftCard className="h-full border border-navy/5 bg-white p-8 rounded-2xl shadow-sm">
                  <span className="inline-flex p-3 rounded-xl bg-navy/5 text-cherry mb-4">
                    <IconComponent className="size-6" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-navy/70">{item.text}</p>
                </HoverLiftCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}