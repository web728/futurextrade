"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Search, X } from "lucide-react";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MICROCOPY } from "@/lib/constants/company";
import {
  EXHIBITIONS,
  EVENT_COUNTRIES,
  EVENT_CITIES,
  EVENT_INDUSTRIES,
  EVENT_YEARS,
  isEventUpcoming,
  type ExhibitionEvent,
} from "@/lib/constants/exhibitions";

type StatusFilter = "all" | "upcoming" | "past";

const ALL = "all";

export function ExhibitionFilterBar() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState<string>(ALL);
  const [country, setCountry] = useState<string>(ALL);
  const [city, setCity] = useState<string>(ALL);
  const [year, setYear] = useState<string>(ALL);
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return EXHIBITIONS.filter((event) => {
      if (query && !event.name.toLowerCase().includes(query)) return false;
      if (industry !== ALL && event.industry !== industry) return false;
      if (country !== ALL && event.venue.country !== country) return false;
      if (city !== ALL && event.venue.city !== city) return false;
      if (year !== ALL && !event.dates.start.startsWith(year)) return false;
      if (status !== "all") {
        const upcoming = isEventUpcoming(event);
        if (status === "upcoming" && !upcoming) return false;
        if (status === "past" && upcoming) return false;
      }
      return true;
    });
  }, [search, industry, country, city, year, status]);

  const activeBadges: { label: string; onClear: () => void }[] = [];
  if (search.trim()) activeBadges.push({ label: `“${search.trim()}”`, onClear: () => setSearch("") });
  if (industry !== ALL) activeBadges.push({ label: industry, onClear: () => setIndustry(ALL) });
  if (country !== ALL) activeBadges.push({ label: country, onClear: () => setCountry(ALL) });
  if (city !== ALL) activeBadges.push({ label: city, onClear: () => setCity(ALL) });
  if (year !== ALL) activeBadges.push({ label: year, onClear: () => setYear(ALL) });
  if (status !== "all")
    activeBadges.push({
      label: status === "upcoming" ? "Upcoming" : "Past",
      onClear: () => setStatus("all"),
    });

  function clearAll() {
    setSearch("");
    setIndustry(ALL);
    setCountry(ALL);
    setCity(ALL);
    setYear(ALL);
    setStatus("all");
  }

  return (
    <div>
      {/* Filter controls */}
      <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-premium sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-navy/40" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exhibitions..."
              className="h-10 pl-9"
              aria-label="Search exhibitions"
            />
          </div>

          <Select value={industry} onValueChange={(v) => setIndustry(v ?? ALL)}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All Industries</SelectItem>
              {EVENT_INDUSTRIES.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={country} onValueChange={(v) => setCountry(v ?? ALL)}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All Countries</SelectItem>
              {EVENT_COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={city} onValueChange={(v) => setCity(v ?? ALL)}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All Cities</SelectItem>
              {EVENT_CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={(v) => setYear(v ?? ALL)}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All Years</SelectItem>
              {EVENT_YEARS.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {(["all", "upcoming", "past"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                status === s
                  ? "border-cherry bg-cherry text-white"
                  : "border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy",
              )}
            >
              {s === "all" ? "All Events" : s}
            </button>
          ))}

          {activeBadges.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto text-xs font-semibold text-cherry hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {activeBadges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeBadges.map((b, i) => (
              <Badge
                key={`${b.label}-${i}`}
                variant="outline"
                className="cursor-pointer gap-1 border-navy/15 py-1 pr-1.5 text-navy"
                onClick={b.onClear}
              >
                {b.label}
                <X className="size-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm font-medium text-navy/60">
        {filtered.length} {filtered.length === 1 ? "event" : "events"} found
      </p>

      {/* Grid / empty state */}
      {filtered.length > 0 ? (
        <AnimatedRevealGrid
          animateLayout
          className="mt-4 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((event) => (
            <ExhibitionCard key={event.slug} event={event} />
          ))}
        </AnimatedRevealGrid>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-navy/15 bg-white/50 py-16 text-center">
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

function ExhibitionCard({ event }: { event: ExhibitionEvent }) {
  const upcoming = isEventUpcoming(event);
  return (
    <Link href={`/exhibitions/${event.slug}`} className="block h-full">
      <HoverLiftCard className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-navy/5 text-navy" variant="secondary">
            {event.industry}
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
        <h3 className="mt-4 text-lg font-bold text-navy">
          {event.name}
          {event.edition && (
            <span className="ml-2 text-sm font-medium text-navy/50">
              {event.edition}
            </span>
          )}
        </h3>
        <div className="mt-3 grid gap-1.5 text-sm text-navy/60">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-cherry" />
            {event.dates.display}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-cherry" />
            {event.venue.city}, {event.venue.country}
          </span>
        </div>
        <span className="mt-6 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
          View Event Details →
        </span>
      </HoverLiftCard>
    </Link>
  );
}
