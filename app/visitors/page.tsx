import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { LeadFlowForm } from "@/components/forms/LeadFlowForm";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { getUpcomingEvents } from "@/lib/constants/exhibitions";

export const metadata: Metadata = {
  title: "Visit Futurex Exhibitions | Register as Visitor",
  description:
    "Futurex exhibitions give visitors access to industry suppliers, innovations, products and business opportunities in one professional environment.",
};

const BENEFITS = [
  "Discover new products",
  "Meet trusted suppliers",
  "Network with industry professionals",
  "Explore business partnerships",
  "Understand market trends",
  "Find new opportunities",
  "Attend knowledge sessions",
  "Experience industry innovation",
];

export default function VisitorsPage() {
  const upcomingEvents = getUpcomingEvents(4);

  return (
    <>
      {/* Hero */}
      <PhotoHero
        image="/images/gallery/exhibitions/nepal-wood-international-expo-1.webp"
        imageAlt="Business visitors exploring the floor at Nepal Wood International Expo"
        eyebrow="Visitors"
        title="Visit. Discover. Connect. Grow."
        subtitle="Futurex exhibitions give visitors access to industry suppliers, innovations, products and business opportunities in one professional environment."
      />

      {/* Why visit */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">Why Visit</h2>
            <p className="mt-4 leading-relaxed text-navy/65">
              Whether you are a buyer, distributor, industry professional,
              entrepreneur or decision-maker, Futurex exhibitions help you
              discover solutions, meet brands and stay connected with market
              trends.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface py-4 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <AnimatedRevealGrid className="grid-cols-2 gap-3 sm:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="flex h-full items-center justify-center rounded-xl border border-navy/10 bg-white px-4 py-5 text-center text-sm font-medium text-navy shadow-premium"
              >
                {benefit}
              </div>
            ))}
          </AnimatedRevealGrid>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
              Upcoming Events
            </p>
            <h2 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
              Plan Your Next Visit
            </h2>
          </SectionReveal>

          <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((event) => (
              <Link key={event.slug} href={`/exhibitions/${event.slug}`} className="block h-full">
                <HoverLiftCard className="flex h-full flex-col">
                  <h3 className="text-base font-bold text-navy">{event.name}</h3>
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
                    View Details →
                  </span>
                </HoverLiftCard>
              </Link>
            ))}
          </AnimatedRevealGrid>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-2xl px-6">
          <SectionReveal>
            <LeadFlowForm
              variant="compact"
              defaultEnquiryType="Visitor Registration"
              title="Register as Visitor"
              subtitle="Share your details to receive visitor passes and event updates."
              submitLabel="Register as Visitor"
            />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
