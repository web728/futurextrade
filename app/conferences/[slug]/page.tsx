import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Tag, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/constants/company";
import { CONFERENCES, isConferenceUpcoming } from "@/lib/constants/conferences";

export async function generateStaticParams() {
  return CONFERENCES.map((conf) => ({ slug: conf.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const conf = CONFERENCES.find((c) => c.slug === slug);
  if (!conf) return {};
  const title = `${conf.name} — ${conf.venue.city}, ${conf.venue.country} | ${conf.industry} Conference`;
  const description = `${conf.description} A ${conf.industry.toLowerCase()} conference in ${conf.venue.city}, ${conf.venue.country} on ${conf.dates.display}, organized by Futurex Trade Fair and Events.`;
  return {
    title,
    description,
    alternates: { canonical: `/conferences/${conf.slug}` },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/conferences/${conf.slug}` },
  };
}

export default async function ConferenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const conf = CONFERENCES.find((c) => c.slug === slug);

  if (!conf) notFound();

  const upcoming = isConferenceUpcoming(conf);

  const conferenceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: conf.name,
    startDate: conf.dates.start,
    endDate: conf.dates.end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: conf.description,
    location: {
      "@type": "Place",
      name: `${conf.venue.city}, ${conf.venue.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: conf.venue.city,
        addressCountry: conf.venue.country,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(conferenceJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        {conf.heroImage && (
          <Image
            src={conf.heroImage}
            alt={conf.name}
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
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionReveal>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/10 text-white" variant="secondary">
                {conf.industry}
              </Badge>
              <Badge
                className={upcoming ? "bg-cherry text-white" : "bg-white/10 text-white/70"}
                variant="secondary"
              >
                {upcoming ? "Upcoming" : "Recently Concluded"}
              </Badge>
            </div>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              {conf.name}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-white/75">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-cherry" />
                {conf.dates.display}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-cherry" />
                {conf.venue.city}, {conf.venue.country}
              </span>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 space-y-14">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-navy">Overview</h2>
            <p className="mt-4 leading-relaxed text-navy/65">
              A professional knowledge platform created for industry leaders,
              subject experts, innovators and business professionals.
            </p>
            <p className="mt-4 leading-relaxed text-navy/65">{conf.description}</p>
          </SectionReveal>

          <SectionReveal>
            <h2 className="text-2xl font-bold text-navy">Key Focus Areas</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {conf.focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 rounded-xl border border-navy/10 bg-surface px-4 py-3 text-sm font-medium text-navy"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-cherry" />
                  {area}
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal>
            <div className="flex items-center gap-3 rounded-xl border border-navy/10 bg-surface px-4 py-3 text-sm text-navy/60">
              <Tag className="size-4 shrink-0 text-cherry" />
              Industry Focus: <span className="font-semibold text-navy">{conf.industry}</span>
            </div>
          </SectionReveal>

          <SectionReveal className="flex flex-wrap gap-4">
            <MotionCTAButton href="/contact">Register Interest</MotionCTAButton>
            <MotionCTAButton href="/contact" variant="outline">
              Become a Speaker
            </MotionCTAButton>
            <MotionCTAButton href="/sponsors" variant="navy">
              Sponsor This Conference
            </MotionCTAButton>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
