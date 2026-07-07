import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Building2, Tag, Activity } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/constants/company";
import {
  EXHIBITIONS,
  isEventUpcoming,
  type ExhibitionEvent,
} from "@/lib/constants/exhibitions";

export async function generateStaticParams() {
  return EXHIBITIONS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = EXHIBITIONS.find((e) => e.slug === slug);
  if (!event) return {};
  const title = `${event.name}${event.edition ? ` ${event.edition}` : ""} — ${event.venue.city}, ${event.venue.country} | ${event.industry} Trade Fair`;
  const description = `${event.description} Join this ${event.industry.toLowerCase()} exhibition in ${event.venue.city}, ${event.venue.country} on ${event.dates.display}, organized by Futurex Trade Fair and Events.`;
  return {
    title,
    description,
    alternates: { canonical: `/exhibitions/${event.slug}` },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/exhibitions/${event.slug}` },
  };
}

function getRelatedEvents(event: ExhibitionEvent): ExhibitionEvent[] {
  const sameIndustry = EXHIBITIONS.filter(
    (e) => e.slug !== event.slug && e.industry === event.industry,
  );
  const others = EXHIBITIONS.filter(
    (e) => e.slug !== event.slug && e.industry !== event.industry,
  );
  return [...sameIndustry, ...others].slice(0, 3);
}

export default async function ExhibitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = EXHIBITIONS.find((e) => e.slug === slug);

  if (!event) notFound();

  const upcoming = isEventUpcoming(event);
  const relatedEvents = getRelatedEvents(event);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.dates.start,
    endDate: event.dates.end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: event.description,
    location: {
      "@type": "Place",
      name: event.venue.venueName || `${event.venue.city}, ${event.venue.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.venue.city,
        addressCountry: event.venue.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Futurex Trade Fair and Events Private Limited",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        {event.heroImage && (
          <Image
            src={event.heroImage}
            alt={event.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
        )}
        <div className="photo-hero-scrim absolute inset-0" />
        <div className="absolute inset-0 bg-grid-lines-dark opacity-50" />
        <div
          aria-hidden
          className="absolute -top-24 right-0 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionReveal>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/10 text-white" variant="secondary">
                {event.industry}
              </Badge>
              <Badge
                className={upcoming ? "bg-cherry text-white" : "bg-white/10 text-white/70"}
                variant="secondary"
              >
                {upcoming ? "Upcoming" : "Recently Concluded"}
              </Badge>
            </div>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              {event.name}
              {event.edition && (
                <span className="ml-3 text-lg font-medium text-white/60 sm:text-xl">
                  {event.edition}
                </span>
              )}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-white/75">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-cherry" />
                {event.dates.display}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-cherry" />
                {event.venue.city}, {event.venue.country}
              </span>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="min-w-0 space-y-14">
            <SectionReveal>
              <h2 className="text-2xl font-bold text-navy">Overview</h2>
              <p className="mt-4 leading-relaxed text-navy/65">
                {event.description}
              </p>
              <p className="mt-4 leading-relaxed text-navy/65">
                {event.name} is a focused trade platform created to bring
                industry stakeholders, exhibitors, buyers and professionals
                together for business networking, product discovery and
                market growth.
              </p>
            </SectionReveal>

            <SectionReveal>
              <h2 className="text-2xl font-bold text-navy">Why Exhibit</h2>
              <p className="mt-4 leading-relaxed text-navy/65">
                Showcase your products to a focused business audience, meet
                potential buyers, build distributor networks and position your
                brand in a competitive industry environment.
              </p>
            </SectionReveal>

            <SectionReveal>
              <h2 className="text-2xl font-bold text-navy">Why Visit</h2>
              <p className="mt-4 leading-relaxed text-navy/65">
                Discover new products, meet suppliers, connect with industry
                professionals and explore business opportunities in one
                dedicated platform.
              </p>
            </SectionReveal>

            <SectionReveal>
              <h2 className="text-2xl font-bold text-navy">Sponsorship</h2>
              <p className="mt-4 leading-relaxed text-navy/65">
                Strengthen your brand visibility through strategic sponsorship
                opportunities designed for high-impact recognition before,
                during and after {event.name}.
              </p>
            </SectionReveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-navy/10 bg-surface p-6 shadow-premium">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-navy/50">
                Quick Facts
              </h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-cherry" />
                  <div>
                    <dt className="font-semibold text-navy">Date</dt>
                    <dd className="text-navy/60">{event.dates.display}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-cherry" />
                  <div>
                    <dt className="font-semibold text-navy">Venue</dt>
                    <dd className="text-navy/60">
                      {event.venue.venueName ? `${event.venue.venueName}, ` : ""}
                      {event.venue.city}, {event.venue.country}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="mt-0.5 size-4 shrink-0 text-cherry" />
                  <div>
                    <dt className="font-semibold text-navy">Industry</dt>
                    <dd className="text-navy/60">{event.industry}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 size-4 shrink-0 text-cherry" />
                  <div>
                    <dt className="font-semibold text-navy">Event Type</dt>
                    <dd className="text-navy/60">{event.eventType}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="mt-0.5 size-4 shrink-0 text-cherry" />
                  <div>
                    <dt className="font-semibold text-navy">Status</dt>
                    <dd className="text-navy/60">
                      {upcoming ? "Upcoming" : "Recently Concluded"}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 grid gap-3">
                <MotionCTAButton href="/exhibitors" className="w-full">
                  Enquire to Exhibit
                </MotionCTAButton>
                <MotionCTAButton href="/visitors" variant="outline" className="w-full">
                  Register as Visitor
                </MotionCTAButton>
                <MotionCTAButton href="/contact" variant="ghost" className="w-full">
                  Download Brochure
                </MotionCTAButton>
                <MotionCTAButton href="/sponsors" variant="navy" className="w-full">
                  Become a Sponsor
                </MotionCTAButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related events */}
      {relatedEvents.length > 0 && (
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionReveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Related Events
              </h2>
            </SectionReveal>
            <AnimatedRevealGrid className="mt-10 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((rel) => {
                const relUpcoming = isEventUpcoming(rel);
                return (
                  <Link key={rel.slug} href={`/exhibitions/${rel.slug}`} className="block h-full">
                    <HoverLiftCard className="flex h-full flex-col">
                      <Badge className="w-fit bg-navy/5 text-navy" variant="secondary">
                        {rel.industry}
                      </Badge>
                      <h3 className="mt-4 text-lg font-bold text-navy">{rel.name}</h3>
                      <div className="mt-3 grid gap-1.5 text-sm text-navy/60">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="size-4 text-cherry" />
                          {rel.dates.display}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="size-4 text-cherry" />
                          {rel.venue.city}, {rel.venue.country}
                        </span>
                      </div>
                      <span className="mt-6 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                        {relUpcoming ? "View Event Details" : "View Event Recap"} →
                      </span>
                    </HoverLiftCard>
                  </Link>
                );
              })}
            </AnimatedRevealGrid>
          </div>
        </section>
      )}
    </>
  );
}
