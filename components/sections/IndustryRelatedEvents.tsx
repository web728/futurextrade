import Link from "next/link";
import { CalendarDays, MapPin, Presentation } from "lucide-react";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EXHIBITIONS, isEventUpcoming } from "@/lib/constants/exhibitions";
import { CONFERENCES, isConferenceUpcoming } from "@/lib/constants/conferences";

export function IndustryRelatedEvents({ industryName }: { industryName: string }) {
  const exhibitions = EXHIBITIONS.filter((e) => e.industry === industryName);
  const conferences = CONFERENCES.filter((c) => c.industry === industryName);

  if (exhibitions.length === 0 && conferences.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-navy/15 bg-white/50 py-16 text-center">
        <p className="text-navy/60">
          No scheduled events yet in this sector — enquire below.
        </p>
        <div className="mt-6 flex justify-center">
          <MotionCTAButton href="/exhibitors" variant="outline">
            Enquire for Participation
          </MotionCTAButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {exhibitions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-navy">Related Exhibitions</h3>
          <AnimatedRevealGrid className="mt-6 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exhibitions.map((event) => {
              const upcoming = isEventUpcoming(event);
              return (
                <Link key={event.slug} href={`/exhibitions/${event.slug}`} className="block h-full">
                  <HoverLiftCard className="flex h-full flex-col">
                    <Badge
                      className={cn(
                        "w-fit",
                        upcoming ? "bg-cherry/10 text-cherry" : "bg-navy/5 text-navy/50",
                      )}
                      variant="secondary"
                    >
                      {upcoming ? "Upcoming" : "Past"}
                    </Badge>
                    <h4 className="mt-4 text-lg font-bold text-navy">{event.name}</h4>
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
            })}
          </AnimatedRevealGrid>
        </div>
      )}

      {conferences.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-navy">Related Conferences</h3>
          <AnimatedRevealGrid className="mt-6 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {conferences.map((conf) => {
              const upcoming = isConferenceUpcoming(conf);
              return (
                <Link key={conf.slug} href={`/conferences/${conf.slug}`} className="block h-full">
                  <HoverLiftCard className="flex h-full flex-col">
                    <Badge
                      className={cn(
                        "w-fit",
                        upcoming ? "bg-cherry/10 text-cherry" : "bg-navy/5 text-navy/50",
                      )}
                      variant="secondary"
                    >
                      {upcoming ? "Upcoming" : "Past"}
                    </Badge>
                    <h4 className="mt-4 flex items-center gap-2 text-lg font-bold text-navy">
                      <Presentation className="size-4 text-cherry" />
                      {conf.name}
                    </h4>
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
                    <span className="mt-6 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                      View Conference Details →
                    </span>
                  </HoverLiftCard>
                </Link>
              );
            })}
          </AnimatedRevealGrid>
        </div>
      )}
    </div>
  );
}
