"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  EXHIBITIONS,
  EVENT_INDUSTRIES,
  EVENT_COUNTRIES,
  EVENT_YEARS,
  groupExhibitionsByYear,
  isEventUpcoming,
} from "@/lib/constants/exhibitions";
import { ExhibitionCard } from "@/components/sections/exhibition-card";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export function ExhibitionsExplorer() {
  const [industry, setIndustry] = useState<string>("All");

  const filtered = useMemo(() => {
    if (industry === "All") return EXHIBITIONS;
    return EXHIBITIONS.filter((e) => e.industry === industry);
  }, [industry]);

  const grouped = useMemo(() => groupExhibitionsByYear(filtered), [filtered]);

  const stats = useMemo(() => {
    const countries = EVENT_COUNTRIES.filter(Boolean).length;
    const editions = EXHIBITIONS.length;
    const upcoming = EXHIBITIONS.filter((e) => isEventUpcoming(e)).length;
    const foundingYear = EVENT_YEARS[EVENT_YEARS.length - 1];
    return { countries, editions, upcoming, foundingYear };
  }, []);

  return (
    <div className="bg-[#F4F5F8]">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-navy px-6 py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 64px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cherry/40 bg-cherry/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cherry">
            FutureX Trade — Global Exhibitions Index
          </span>
          <h1 className="mt-6 text-balance text-4xl font-black tracking-tight text-white sm:text-6xl">
            Every show we&apos;ve staged, catalogued.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
            From mining floors in Bhubaneswar to wood halls in Kathmandu — browse the
            complete FutureX Trade exhibition ledger, indexed by year and ready for
            your next booth.
          </p>
        </motion.div>
      </section>

      {/* ---------- Filter bar ---------- */}
      <div className="sticky top-0 z-20 border-b border-navy/10 bg-[#F4F5F8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-6 py-3">
          {["All", ...EVENT_INDUSTRIES].map((tag) => (
            <button
              key={tag}
              onClick={() => setIndustry(tag)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                industry === tag
                  ? "border-cherry bg-cherry text-white"
                  : "border-navy/15 bg-white text-navy/70 hover:border-cherry/40 hover:text-navy",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Year ledger ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        {grouped.length === 0 ? (
          <p className="py-20 text-center text-sm text-navy/50">
            No exhibitions match this filter yet.
          </p>
        ) : (
          <div className="space-y-16">
            {grouped.map((group) => (
              <div
                key={group.year}
                id={`year-${group.year}`}
                className="grid grid-cols-1 gap-6 md:grid-cols-[110px_1fr] md:gap-10"
              >
                {/* Sticky year numeral + ledger rail */}
                <div className="flex items-center gap-3 md:sticky md:top-24 md:h-fit md:flex-col md:items-start md:gap-2">
                  <span className="font-mono text-3xl font-black tracking-tight text-navy md:text-5xl">
                    {group.year}
                  </span>
                  <span className="h-px flex-1 bg-navy/15 md:h-px md:w-10" />
                  <span className="font-mono text-[11px] uppercase tracking-wide text-navy/40">
                    {group.events.length} {group.events.length === 1 ? "show" : "shows"}
                  </span>
                </div>

                {/* Card grid for the year */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {group.events.map((event, i) => (
                    <ExhibitionCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}