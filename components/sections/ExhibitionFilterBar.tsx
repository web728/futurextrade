"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { CalendarDays, MapPin, Search, X } from "lucide-react";
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
  groupExhibitionsByYear,
  type ExhibitionEvent,
} from "@/lib/constants/exhibitions";

type StatusFilter = "all" | "upcoming" | "past";

const ALL = "all";

const imageVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
};

const overlayVariants: Variants = {
  rest: { opacity: 0.65 },
  hover: { opacity: 0.92 },
};

const detailGroupVariants: Variants = {
  rest: {},
  hover: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

const detailLineVariants: Variants = {
  rest: { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0 },
};

const smoothEase = [0.16, 1, 0.3, 1] as const;

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

  // Group whatever survives the filters into year sections, newest first
  const grouped = useMemo(() => groupExhibitionsByYear(filtered), [filtered]);

  const activeBadges: { label: string; onClear: () => void }[] = [];
  if (search.trim()) activeBadges.push({ label: `"${search.trim()}"`, onClear: () => setSearch("") });
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
      <div className="rounded-2xl border border-navy/10 bg-white p-4 shadow-premium sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="relative sm:col-span-2 md:col-span-3 lg:col-span-1">
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

      {/* Year-grouped grid / empty state */}
      {grouped.length > 0 ? (
        <div className="mt-8 space-y-12">
          {grouped.map(({ year: yr, events }) => (
            <section key={yr}>
              <div className="mb-5 flex items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-navy">{yr}</h2>
                <span className="h-px flex-1 bg-navy/10" />
                <span className="text-xs font-semibold uppercase tracking-wide text-navy/40">
                  {events.length} {events.length === 1 ? "event" : "events"}
                </span>
              </div>

              <AnimatedRevealGrid
                animateLayout
                className="grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
              >
                {events.map((event) => (
                  <ExhibitionCard key={event.id} event={event} />
                ))}
              </AnimatedRevealGrid>
            </section>
          ))}
        </div>
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
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer position, normalized to -0.5..0.5 across the card
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Smoothed springs so the tilt feels weighty, not jittery
  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), springConfig);
  const glareX = useTransform(px, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(py, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerEnter() {
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
    glareOpacity.set(0);
  }

  return (
    <div style={{ perspective: 1200 }} className="group">
      <motion.div
        ref={cardRef}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className={cn(
          "relative aspect-[3/4] w-full overflow-hidden rounded-xl",
          "bg-navy/5 ring-1 ring-navy/5",
        )}
      >
        {/* Lift + shadow on hover — animated on the outer wrapper, not CSS */}
        <motion.div
          variants={{
            rest: { boxShadow: "0 1px 2px rgba(15,23,42,0.06)" },
            hover: { boxShadow: "0 28px 56px -16px rgba(15,23,42,0.45), 0 0 0 1px rgba(227,37,38,0.08)" },
          }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="absolute inset-0 rounded-xl"
        />

        {/* Image — slow, weighty zoom */}
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="absolute inset-0"
          style={{ transform: "translateZ(0)" }}
        >
          <Image
            src={event.heroImage ?? "/images/gallery/placeholder-exhibition.webp"}
            alt={event.name}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient — deepens on hover so text stays legible */}
        <motion.div
          variants={overlayVariants}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent"
        />

        {/* Pointer-tracked glare — the premium "glass" sheen */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]: number[]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.55), transparent 55%)`,
            ),
          }}
        />

        {/* Top badges — static, always visible, lifted slightly in 3D space */}
        <div
          className="absolute inset-x-2.5 top-2.5 flex items-center justify-between gap-2"
          style={{ transform: "translateZ(30px)" }}
        >
          <Badge className="bg-white/90 text-[10px] text-navy backdrop-blur-sm" variant="secondary">
            {event.industry}
          </Badge>
          <Badge
            className={cn(
              "text-[10px] backdrop-blur-sm",
              upcoming ? "bg-cherry text-white" : "bg-white/80 text-navy/60",
            )}
            variant="secondary"
          >
            {upcoming ? "Upcoming" : "Past"}
          </Badge>
        </div>

        {/* Title + detail reveal — lifted the most, reads as "closest" to the viewer */}
        <div
          className="absolute inset-x-0 bottom-0 p-3.5"
          style={{ transform: "translateZ(50px)" }}
        >
          <motion.h3
            variants={{ rest: { y: 0 }, hover: { y: -2 } }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="text-sm font-bold leading-snug text-white drop-shadow-sm"
          >
            {event.name}
            {event.edition && (
              <span className="ml-1.5 text-xs font-medium text-white/60">{event.edition}</span>
            )}
          </motion.h3>

          <motion.div variants={detailGroupVariants} className="mt-2 space-y-1">
            <motion.span
              variants={detailLineVariants}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="flex items-center gap-1.5 text-xs font-medium text-white/85"
            >
              <CalendarDays className="size-3.5 shrink-0 text-cherry" />
              {event.dates.display}
            </motion.span>
            <motion.span
              variants={detailLineVariants}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="flex items-center gap-1.5 text-xs font-medium text-white/85"
            >
              <MapPin className="size-3.5 shrink-0 text-cherry" />
              {event.venue.city}, {event.venue.country}
            </motion.span>
          </motion.div>
        </div>

        {/* Cherry accent ring on hover — the one "signature" touch */}
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-cherry/40"
        />
      </motion.div>
    </div>
  );
}

export { ExhibitionCard };