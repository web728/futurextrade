import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { getUpcomingEvents, isEventUpcoming } from "@/lib/constants/exhibitions";
import { INDUSTRIES } from "@/lib/constants/industries";
import { INDUSTRY_ICONS } from "@/components/sections/IndustriesGridSection";

export function UpcomingEventsSection() {
  const events = getUpcomingEvents(3);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
            Step Onto the Event Floor
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Discover Upcoming Futurex Exhibitions
          </h2>
          <p className="mt-4 text-navy/60">
            Explore high-impact B2B platforms designed to connect industries,
            decision-makers and new business opportunities.
          </p>
        </SectionReveal>

        <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((event) => {
            const upcoming = isEventUpcoming(event);
            const industry = INDUSTRIES.find((i) => i.name === event.industry);
            const Icon = industry ? INDUSTRY_ICONS[industry.icon] : null;

            return (
              <HoverLiftCard key={event.id} className="flex h-full flex-col !p-0 overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <GalleryImage
                    src={event.heroImage ?? "/images/gallery/futurex-industry-conference-1.webp"}
                    alt={event.name}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
                  {Icon && (
                    <span className="icon-badge absolute left-4 top-4 size-10">
                      <Icon className="size-4" />
                    </span>
                  )}
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                      upcoming ? "bg-cherry text-white" : "bg-white/15 text-white backdrop-blur-sm"
                    }`}
                  >
                    {upcoming ? "Upcoming" : "Recently Concluded"}
                  </span>
                  <p className="absolute bottom-4 left-4 right-4 text-lg font-bold leading-tight text-white">
                    {event.name}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy">
                    {event.industry}
                  </span>
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
                  <p className="mt-3 line-clamp-2 text-sm text-navy/60">{event.description}</p>
                  <div className="mt-6 flex flex-1 items-end">
                    <Link
                      href={`/exhibitions/${event.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-cherry"
                    >
                      {upcoming ? "Exhibit Now" : "View Event"}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </HoverLiftCard>
            );
          })}
        </AnimatedRevealGrid>

        <div className="mt-12 text-center">
          <MotionCTAButton href="/exhibitions" variant="outline">
            View All Events
          </MotionCTAButton>
        </div>
      </div>
    </section>
  );
}
