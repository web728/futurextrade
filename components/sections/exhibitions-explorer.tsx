"use client";

import { useMemo, useState, useRef, useEffect } from "react";
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
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { Calendar, Globe, Award, Sparkles, SlidersHorizontal, RotateCcw } from "lucide-react";

const START_LEGACY_YEAR = 2011;
const PAGE_SIZE = 24; // How many historic cards to mount per "page" — tune to taste.

export function ExhibitionsExplorer() {
  const [industry, setIndustry] = useState<string>("All");
  const [country, setCountry] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // 1. Filter out upcoming collection safely
  const upcomingEvents = useMemo(() => {
    return EXHIBITIONS.filter((e) => isEventUpcoming(e));
  }, []);

  // 2. Filter historic index across Multi-Axis query rules matching parameters cleanly
  const filteredHistoric = useMemo(() => {
    return EXHIBITIONS.filter((e) => {
      if (isEventUpcoming(e)) return false;

      const matchIndustry = industry === "All" || e.industry === industry;
      const matchCountry = country === "All" || e.venue.country === country;

      // FIXED: Safely slice string format timestamps 'YYYY-MM-DD' on e.dates.start
      const eventYearStr = e.dates?.start ? e.dates.start.slice(0, 4) : "";
      const matchYear = year === "All" || eventYearStr === year;

      return matchIndustry && matchCountry && matchYear;
    });
  }, [industry, country, year]);

  // Reset pagination whenever the active filter set changes — otherwise a narrower
  // filter could leave visibleCount pointing past the new (shorter) result set.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [industry, country, year]);

  // 2b. Only slice off the page currently "unlocked" — this is the main lever for
  // perf: it's the difference between mounting 100+ cards/images on first paint
  // vs. mounting 24 and growing on demand.
  const visibleHistoric = useMemo(
    () => filteredHistoric.slice(0, visibleCount),
    [filteredHistoric, visibleCount]
  );
  const hasMore = visibleCount < filteredHistoric.length;

  const groupedYears = useMemo(() => groupExhibitionsByYear(visibleHistoric), [visibleHistoric]);
  const hasActiveFilters = industry !== "All" || country !== "All" || year !== "All";

  const resetFilters = () => {
    setIndustry("All");
    setCountry("All");
    setYear("All");
  };

  // 3. Performance Metric Analytics Legacy Ledger values
  const stats = useMemo(() => {
    return {
      totalEditions: EXHIBITIONS.length,
      upcomingCount: upcomingEvents.length,
      countriesCount: `${EVENT_COUNTRIES.filter(Boolean).length}+ Regions`,
    };
  }, [upcomingEvents]);

  useGSAP(
    () => {
      // Hero Entrance Stagger Sequencer
      const heroElements = heroRef.current?.querySelectorAll<HTMLElement>(".premium-hero-node");
      if (heroElements && heroElements.length > 0) {
        if (reducedMotion) {
          gsap.set(heroElements, { y: 0, opacity: 1 });
        } else {
          gsap.fromTo(
            heroElements,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
          );
        }
      }

      // Live legacy rolling counter animations
      const counters = heroRef.current?.querySelectorAll<HTMLElement>("[data-counter]");
      counters?.forEach((el) => {
        const target = Number(el.dataset.counter ?? "0");
        if (reducedMotion) {
          el.textContent = target.toString();
          return;
        }
        const counterObj = { value: 0 };
        gsap.to(counterObj, {
          value: target,
          duration: 1.8,
          delay: 0.2,
          ease: "power4.out",
          onUpdate: () => {
            el.textContent = Math.round(counterObj.value).toString();
          },
        });
      });

      // ScrollTrigger batch reveal — guarded with a data-revealed flag so that
      // re-running this effect (filter change / Load More click both change
      // useGSAP's dependency array) never re-animates cards that are already
      // visible. Without this guard, every filter click replayed the reveal
      // animation on the entire already-visible grid — that was the main
      // source of jank on interaction, separate from the initial-load cost.
      const yearRows = containerRef.current?.querySelectorAll(".year-ledger-row");
      if (yearRows && yearRows.length > 0) {
        yearRows.forEach((row) => {
          const cards = row.querySelectorAll<HTMLElement>(
            '.exhibition-item-card:not([data-revealed="true"])'
          );
          if (!cards || cards.length === 0) return;

          if (reducedMotion) {
            gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
            cards.forEach((c) => c.setAttribute("data-revealed", "true"));
            return;
          }

          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                once: true,
              },
              onStart: () => cards.forEach((c) => c.setAttribute("data-revealed", "true")),
            }
          );
        });
      }

      if (reducedMotion) return;

      // Mouse Parallax Halo — quickTo instead of gsap.to() on every mousemove.
      const moveX = gsap.quickTo(heroSpotlightRef.current, "x", { duration: 1.2, ease: "power2.out" });
      const moveY = gsap.quickTo(heroSpotlightRef.current, "y", { duration: 1.2, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current || !heroSpotlightRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        moveX(e.clientX - rect.left - 250);
        moveY(e.clientY - rect.top - 250);
      };

      const heroNode = heroRef.current;
      heroNode?.addEventListener("mousemove", handleMouseMove);

      return () => {
        heroNode?.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef, dependencies: [industry, country, year, visibleCount, reducedMotion] }
  );

  return (
    <div ref={containerRef} className="bg-slate-50 font-body min-h-screen text-navy antialiased">
      {/* PREMIUM HERO SECTION — recolored to match the homepage hero's palette:
          bg-navy + bg-grain base, same grid-line density, same particle
          treatment, and corner accents matching PhotoHero across the site. */}
      <section
        ref={heroRef}
        className="bg-grain relative overflow-hidden bg-navy px-6 py-28 sm:py-36 text-white select-none"
      >
        <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.55] pointer-events-none z-10" />

        <div className="premium-hero-node absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 select-none font-heading text-[15rem] sm:text-[24rem] font-black tracking-tighter text-white/[0.02] pointer-events-none z-0">
          {START_LEGACY_YEAR}
        </div>

        {!reducedMotion && (
          <div
            ref={heroSpotlightRef}
            aria-hidden
            className="absolute top-0 left-0 size-[500px] rounded-full pointer-events-none filter blur-[130px] z-10 opacity-25 mix-blend-screen will-change-transform"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 80%)" }}
          />
        )}

        {/* Ambient Particle Highlights — same treatment as the homepage hero */}
        {!reducedMotion && (
          <>
            <span
              aria-hidden
              className="animate-float-slow absolute left-10 top-16 z-10 size-1.5 rounded-full bg-cherry/70 blur-[1px] sm:left-16"
            />
            <span
              aria-hidden
              style={{ animationDelay: "1.2s" }}
              className="animate-float-slow absolute right-12 top-1/3 z-10 size-1 rounded-full bg-white/50 blur-[1px] sm:right-20"
            />
          </>
        )}

        {/* Corner UI Accents — matches PhotoHero, used site-wide */}
        {[
          "top-4 left-4 sm:top-6 sm:left-6 border-t-2 border-l-2",
          "top-4 right-4 sm:top-6 sm:right-6 border-t-2 border-r-2",
          "bottom-4 left-4 sm:bottom-6 sm:left-6 border-b-2 border-l-2",
          "bottom-4 right-4 sm:bottom-6 sm:right-6 border-b-2 border-r-2",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute size-3 sm:size-4 rounded-[1px] border-cherry/60 pointer-events-none z-10 hidden sm:block ${pos}`}
          />
        ))}

        <div className="relative z-20 mx-auto max-w-5xl text-center">
          <span className="premium-hero-node inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cherry-light">
            <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
            An Industry Pillar Since {START_LEGACY_YEAR}
          </span>
          <h1 className="premium-hero-node mt-6 font-heading text-4xl font-bold tracking-tight leading-[1.12] sm:text-6xl text-white">
            Staging Global Trade Forums,{" "}
            <span className="bg-gradient-to-r from-white via-white/80 to-cherry-light bg-clip-text text-transparent">
              Moving Industries.
            </span>
          </h1>
          <p className="premium-hero-node mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-white/60 font-normal">
            For over a decade, we have connected visionaries, global buyers, and leading brands. Explore our complete history index of verified, high-impact industrial exhibitions.
          </p>

          {/* LEGACY COUNTER TRACK MATRIX DATA ROW */}
          <div className="premium-hero-node mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-cherry-light"><Award className="size-5" /></div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading">
                  <span data-counter={stats.totalEditions}>0</span>+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mt-0.5">Events Staged</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-cherry-light"><Sparkles className="size-5" /></div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading">
                  <span data-counter={stats.upcomingCount}>0</span> Live
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mt-0.5">Upcoming Forums</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-cherry-light"><Globe className="size-5" /></div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading">{stats.countriesCount}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mt-0.5">Global Footprint</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIXED UPCOMING EVENTS ROW OVERLAY ANCHOR */}
      {upcomingEvents.length > 0 && !hasActiveFilters && (
        <section className="mx-auto max-w-7xl px-6 -mt-10 relative z-30 mb-16">
          <div className="bg-white rounded-2xl border border-navy/5 p-6 sm:p-8 shadow-xl shadow-navy/5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cherry mb-6">
              <Calendar className="size-4 animate-pulse" />
              Live &amp; Next Quarter Announcements
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {upcomingEvents.map((event, i) => (
                <div key={event.id} className="exhibition-item-card opacity-100 transform-none">
                  {/* Only the first 2 upcoming cards are genuinely above the fold —
                      priority should never be derived from a per-group index. */}
                  <ExhibitionCard event={event} index={i} priority={i < 2} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MULTI-AXIS CONTROL PANEL TRACKING BAR */}
      <div className="sticky top-0 z-40 border-b border-navy/5 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy/70 mr-2">
              <SlidersHorizontal className="size-3.5 text-cherry" />
              <span>Filter Index:</span>
            </div>

            {/* Year Dropdown Controller */}
            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={cn(
                  "appearance-none rounded-xl border bg-surface/50 px-4 py-2 pr-9 text-xs font-bold uppercase tracking-wider text-navy outline-none transition-all cursor-pointer",
                  year !== "All" ? "border-cherry bg-cherry/5 text-cherry" : "border-navy/10 hover:border-navy/20"
                )}
              >
                <option value="All">All Years</option>
                {EVENT_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Country Dropdown Controller */}
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={cn(
                  "appearance-none rounded-xl border bg-surface/50 px-4 py-2 pr-9 text-xs font-bold uppercase tracking-wider text-navy outline-none transition-all cursor-pointer",
                  country !== "All" ? "border-cherry bg-cherry/5 text-cherry" : "border-navy/10 hover:border-navy/20"
                )}
              >
                <option value="All">All Regions</option>
                {EVENT_COUNTRIES.filter(Boolean).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Industry Dropdown Controller */}
            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={cn(
                  "appearance-none rounded-xl border bg-surface/50 px-4 py-2 pr-9 text-xs font-bold uppercase tracking-wider text-navy outline-none transition-all cursor-pointer",
                  industry !== "All" ? "border-cherry bg-cherry/5 text-cherry" : "border-navy/10 hover:border-navy/20"
                )}
              >
                <option value="All">All Industries</option>
                {EVENT_INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 rounded-xl border border-cherry/20 bg-cherry/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-cherry transition-colors hover:bg-cherry hover:text-white"
              >
                <RotateCcw className="size-3" />
                Reset
              </button>
            )}
          </div>

          <div className="text-right text-xs font-bold uppercase tracking-widest text-navy/30">
            {filteredHistoric.length} {filteredHistoric.length === 1 ? "Forum Ledger Match" : "Forum Ledger Matches"}
            {hasMore && (
              <span className="block normal-case font-medium text-navy/20 tracking-normal mt-0.5">
                Showing {visibleHistoric.length} of {filteredHistoric.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MATRIX DISPLAY GRID ARCHIVE */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {groupedYears.length === 0 ? (
          <div className="py-24 text-center rounded-2xl border border-dashed border-navy/10 bg-white max-w-2xl mx-auto">
            <p className="text-sm font-bold text-navy/40 uppercase tracking-widest">
              No historical matches found for the selected filter combination.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-105"
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            {groupedYears.map((group) => (
              <div
                key={group.year}
                id={`year-${group.year}`}
                className="year-ledger-row grid grid-cols-1 gap-6 lg:grid-cols-[120px_1fr] lg:gap-16 border-t border-navy/5 pt-14 first:border-none first:pt-0"
              >
                {/* Year Indicator Column */}
                <div className="flex items-center gap-4 lg:sticky lg:top-32 lg:h-fit lg:flex-col lg:items-start lg:gap-1.5 z-10">
                  <span className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-navy leading-none">
                    {group.year}
                  </span>
                  <span className="h-px flex-1 bg-cherry/30 lg:h-[2px] lg:w-12" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-navy/40 bg-surface px-2 py-0.5 rounded-md border border-navy/5">
                    {group.events.length} Staged
                  </span>
                </div>

                {/* Subgrid Card Matrix Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {group.events.map((event, i) => (
                    <div
                      key={event.id}
                      // content-visibility lets the browser skip layout/paint work for
                      // cards that are off-screen — cheap win independent of pagination.
                      className="exhibition-item-card will-change-transform [content-visibility:auto] [contain-intrinsic-size:0_320px]"
                    >
                      {/* Historic cards are never above the fold — no priority. */}
                      <ExhibitionCard event={event} index={i} priority={false} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="rounded-full bg-navy px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-navy/10 transition-transform hover:scale-105"
                >
                  Load {Math.min(PAGE_SIZE, filteredHistoric.length - visibleCount)} More
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}