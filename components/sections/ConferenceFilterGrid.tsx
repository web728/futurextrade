"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MICROCOPY } from "@/lib/constants/company";
import { CONFERENCES, isConferenceUpcoming } from "@/lib/constants/conferences";

const ALL = "All Industries";

export function ConferenceFilterGrid() {
  const industries = useMemo(
    () => Array.from(new Set(CONFERENCES.map((c) => c.industry))),
    [],
  );
  const [industry, setIndustry] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      industry === ALL
        ? CONFERENCES
        : CONFERENCES.filter((c) => c.industry === industry),
    [industry],
  );

  return (
    <div>
      {industries.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {[ALL, ...industries].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndustry(i)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                industry === i
                  ? "border-cherry bg-cherry text-white"
                  : "border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy",
              )}
            >
              {i}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <AnimatedRevealGrid
          animateLayout
          className="mt-10 grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {filtered.map((conf) => {
            const upcoming = isConferenceUpcoming(conf);
            return (
              <Link key={conf.slug} href={`/conferences/${conf.slug}`} className="block h-full">
                <HoverLiftCard className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <Badge className="bg-navy/5 text-navy" variant="secondary">
                      {conf.industry}
                    </Badge>
                    <Badge
                      className={cn(
                        upcoming ? "bg-cherry/10 text-cherry" : "bg-navy/5 text-navy/50",
                      )}
                      variant="secondary"
                    >
                      {upcoming ? "Upcoming" : "Past"}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy">{conf.name}</h3>
                  <div className="mt-3 grid gap-1.5 text-sm text-navy/60">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-cherry" />
                      {conf.dates.display}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 text-cherry" />
                      {conf.venue.city}, {conf.venue.country}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-navy/60">{conf.description}</p>
                  <span className="mt-6 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                    View Conference Details →
                  </span>
                </HoverLiftCard>
              </Link>
            );
          })}
        </AnimatedRevealGrid>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-navy/15 bg-white/50 py-16 text-center">
          <p className="text-navy/60">{MICROCOPY.searchEmpty}</p>
          <div className="mt-6 flex justify-center">
            <MotionCTAButton href="/contact" variant="outline">
              Contact Event Team
            </MotionCTAButton>
          </div>
        </div>
      )}
    </div>
  );
}
