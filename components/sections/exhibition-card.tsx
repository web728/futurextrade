"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ExhibitionEvent } from "@/lib/constants/exhibitions";

const BrandLogos = {
  website: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.2-9.3L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
    </svg>
  ),
  email: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

function getEditionNumber(edition?: string) {
  if (!edition) return null;
  const match = edition.match(/\d+/);
  return match ? match[0] : null;
}

export function ExhibitionCard({
  event,
  index = 0,
  priority = false,
}: {
  event: ExhibitionEvent;
  index?: number;
  /**
   * Only pass true for cards that are genuinely above the fold on first paint
   * (e.g. the first 2 cards of the "Upcoming" row). Do NOT derive this from a
   * per-group `index` — every year-group's index resets to 0, so that pattern
   * marks dozens of off-screen images as priority and forces the browser to
   * eagerly preload all of them on load.
   */
  priority?: boolean;
}) {
  const isUpcoming = event.dates?.end ? new Date(event.dates.end) >= new Date() : true;
  const editionNumber = getEditionNumber(event.edition);

  const socialLinks = [
    event.socials?.website && { key: "website", href: event.socials.website, bg: "bg-blue-600 hover:bg-blue-700", text: "WEBSITE", Icon: BrandLogos.website },
    event.socials?.instagram && { key: "instagram", href: event.socials.instagram, bg: "bg-[#e1306c] hover:bg-[#c1235b]", text: "INSTAGRAM", Icon: BrandLogos.instagram },
    event.socials?.linkedin && { key: "linkedin", href: event.socials.linkedin, bg: "bg-[#0077b5] hover:bg-[#005e8f]", text: "LINKEDIN", Icon: BrandLogos.linkedin },
    event.socials?.facebook && { key: "facebook", href: event.socials.facebook, bg: "bg-[#1877f2] hover:bg-[#145dbd]", text: "FACEBOOK", Icon: BrandLogos.facebook },
    // NOTE: requires a `twitter` field on ExhibitionEvent["socials"] in your data/type —
    // add it to lib/constants/exhibitions if it isn't there yet, or this will just stay hidden.
    event.socials?.twitter && { key: "twitter", href: event.socials.twitter, bg: "bg-black hover:bg-black/80", text: "TWITTER", Icon: BrandLogos.twitter },
    event.socials?.email && { key: "email", href: `mailto:${event.socials.email}`, bg: "bg-cherry hover:bg-cherry/90", text: "EMAIL", Icon: BrandLogos.email },
  ].filter(Boolean) as { key: string; href: string; bg: string; text: string; Icon: React.ComponentType }[];

  return (
    <div className="w-full relative group select-none will-change-transform">
      {/* ============================================================ */}
      {/* SHARED IMAGE FRAME — one <Image>, used by both breakpoints.  */}
      {/* Mobile: aspect-[16/10], rounded top only, content sits below  */}
      {/* in normal flow. Desktop: aspect-[4/5], fully rounded, image   */}
      {/* fills the whole card with the hover-reveal panels overlaid.   */}
      {/* ============================================================ */}
      <div
        className={cn(
          "relative w-full aspect-[16/10] lg:aspect-[4/5] overflow-hidden bg-[#040812]",
          "rounded-t-[24px] border-x border-t border-white/[0.06] shadow-xl",
          "lg:rounded-[30px] lg:border lg:border-white/[0.06] lg:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]",
          "transition-all duration-500 ease-out",
          "lg:group-hover:scale-[1.02] lg:group-hover:shadow-[0_20px_45px_-12px_rgba(227,37,38,0.25)]"
        )}
      >
        {/* Desktop-only ambient color wash, sits behind the image */}
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_100%_107%,#ff89cc_0%,#9cb8ec_30%,#e32526_60%,#040812_100%)] opacity-25 group-hover:opacity-50 transition-opacity duration-500 z-0" />

        {/* The single shared image */}
        <div className="absolute inset-0 z-10 overflow-hidden lg:rounded-3xl">
          <Image
            src={event.heroImage ?? "/images/gallery/placeholder-exhibition.webp"}
            alt={event.name}
            fill
            // Matches the actual rendered grid width at each breakpoint
            // (grid-cols-2 / sm:grid-cols-3 / lg:grid-cols-4 inside a max-w-7xl
            // container) instead of the previous flat 100vw / 33vw, which told
            // Next.js to fetch a larger source than the card ever displays.
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover transition-all duration-700 ease-out lg:group-hover:scale-110 lg:group-hover:rotate-[1deg] lg:group-hover:-translate-y-1"
            priority={priority}
          />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
        </div>

        {/* Industry badge — shared, position tweaks slightly per breakpoint */}
        <div className="absolute top-4 left-4 lg:top-5 lg:left-5 z-20">
          <Badge variant="secondary" className="border border-white/10 bg-black/70 text-[9px] font-black lg:font-bold tracking-widest text-white uppercase px-2 lg:px-2.5 py-0.5 rounded-md">
            {event.industry}
          </Badge>
        </div>

        {/* Mobile-only edition badge, top right over the image */}
        {editionNumber && (
          <div className="lg:hidden absolute top-4 right-4 z-20 bg-black/60 border border-white/10 text-white rounded-lg px-2 py-1 flex items-center gap-1 backdrop-blur-md">
            <span className="text-[6px] font-black text-white/40">ED</span>
            <span className="text-xs font-black">{editionNumber}</span>
          </div>
        )}

        {/* ===================================================== */}
        {/* DESKTOP-ONLY: sliding hover panels + edition + socials */}
        {/* ===================================================== */}
        <div className="hidden lg:block absolute w-[140%] h-[140%] bottom-[-140%] left-[-140%] transition-all duration-500 ease-out bg-gradient-to-tr from-[#02050a]/95 via-[#070e1e]/98 to-[#12203d]/90 border-t border-white/15 rounded-[15%] group-hover:bottom-[-20%] group-hover:left-[-20%] z-20" />

        <div className="hidden lg:flex absolute w-[115%] h-[115%] bottom-[-115%] left-[-115%] transition-all duration-500 ease-out bg-gradient-to-tr from-[#030712] via-[#0b1326] to-transparent border-t border-white/15 rounded-[15%] group-hover:bottom-[-10%] group-hover:left-[-10%] z-20 flex-col justify-end p-8 pb-16">
          <div className="space-y-3 pr-[22%]">
            <span className={cn(
              "inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-black/50",
              isUpcoming ? "border-cherry/30 text-cherry" : "border-white/10 text-white/40"
            )}>
              <span className={cn("size-1 bg-white rounded-full", isUpcoming && "animate-pulse bg-cherry")} />
              {isUpcoming ? "Upcoming" : "Archived"}
            </span>
            <h3 className="text-sm font-black leading-snug text-white tracking-wide line-clamp-2">
              {event.name}
            </h3>

            <div className="space-y-1.5 pt-2 border-t border-white/[0.08] text-[11px] font-medium text-white/70">
              <div className="flex items-center gap-2"><CalendarDays className="size-3.5 text-white/40 shrink-0" /> <span className="truncate">{event.dates.display}</span></div>
              <div className="flex items-center gap-2"><MapPin className="size-3.5 text-white/40 shrink-0" /><span className="truncate">
                {event.venue.city}, {event.venue.country}
              </span></div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-[-60px] top-1/2 -translate-y-1/2 transition-all duration-500 ease-out group-hover:right-5 z-30 flex-col gap-3.5 items-center p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
          {socialLinks.map(({ key, href, bg, text, Icon }) => (
            <div key={key} className="relative group/iso w-8 h-8 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-white/20 bg-white/5 opacity-0 transition-all duration-300 group-hover/iso:opacity-20 group-hover/iso:translate-x-[2px] group-hover/iso:-translate-y-[2px]" />
              <span className="absolute inset-0 rounded-full border border-white/20 bg-white/5 opacity-0 transition-all duration-300 delay-[50ms] group-hover/iso:opacity-40 group-hover/iso:translate-x-[5px] group-hover/iso:-translate-y-[5px]" />

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "relative z-10 flex w-full h-full items-center justify-center rounded-full text-white transition-all duration-300 group-hover/iso:translate-x-[6px] group-hover/iso:-translate-y-[6px] shadow-md border border-white/10 clickable",
                  bg
                )}
              >
                <Icon />
              </a>

              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none transition-all duration-300 group-hover/iso:opacity-100 group-hover/iso:-translate-x-1 text-[8px] font-bold tracking-wider bg-white text-black px-1.5 py-0.5 rounded shadow-sm skew-x-[-6deg] whitespace-nowrap">
                {text}
              </div>
            </div>
          ))}
        </div>

        {editionNumber && (
          <div className="hidden lg:flex absolute bottom-6 right-6 z-20 bg-white/5 border border-white/10 text-white rounded-xl size-8 flex-col items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:opacity-0 group-hover:scale-75 group-hover:translate-x-5 group-hover:translate-y-5">
            <span className="text-[5px] font-black tracking-widest text-white/40 leading-none">ED</span>
            <span className="text-xs font-black leading-none mt-0.5">{editionNumber}</span>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MOBILE-ONLY: content block below the image, normal doc flow  */}
      {/* ============================================================ */}
      <div className="lg:hidden flex flex-col justify-between gap-4 bg-gradient-to-b from-[#060c1c] to-[#040812] rounded-b-[24px] border-x border-b border-white/[0.06] p-5 -mt-px">
        <div className="space-y-2">
          <span className={cn(
            "inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-black/40",
            isUpcoming ? "border-cherry/30 text-cherry" : "border-white/10 text-white/40"
          )}>
            <span className={cn("size-1.5 rounded-full", isUpcoming ? "animate-pulse bg-cherry" : "bg-white/20")} />
            {isUpcoming ? "Upcoming" : "Archived"}
          </span>
          <h3 className="text-sm font-black leading-snug text-white tracking-wide">
            {event.name}
          </h3>

          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/[0.06] text-xs font-medium text-white/70">
            <div className="flex items-center gap-2"><CalendarDays className="size-4 text-cherry shrink-0" /> <span>{event.dates.display}</span></div>
            <div className="flex items-center gap-2"><MapPin className="size-4 text-cherry shrink-0" /> <span>{event.venue.city}</span></div>
          </div>
        </div>

        {/* Mobile Horizontal Social Deck */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04]">
          {socialLinks.map(({ key, href, bg, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("w-9 h-9 flex items-center justify-center rounded-full text-white shadow-md border border-white/10 clickable", bg)}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}