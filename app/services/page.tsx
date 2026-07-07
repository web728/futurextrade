import type { Metadata } from "next";
import Link from "next/link";
import {
  Landmark,
  Globe2,
  Presentation,
  CalendarDays,
  Megaphone,
  LayoutTemplate,
  Video,
} from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { SERVICES, type Service } from "@/lib/constants/services";
import { SEO } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
};

const ICONS: Record<Service["icon"], typeof Landmark> = {
  "trade-exhibitions": Landmark,
  "international-expos": Globe2,
  conferences: Presentation,
  "corporate-events": CalendarDays,
  "branding-promotions": Megaphone,
  "exhibition-stand-design": LayoutTemplate,
  "webinars-virtual-events": Video,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-28 text-white">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div
          aria-hidden
          className="absolute -top-24 right-0 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cherry">
              Our Services
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              End-to-End Event Platforms for Business Growth
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
              Futurex delivers exhibition, conference, corporate event and
              promotional solutions that help businesses connect, communicate
              and expand with confidence.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="text-navy/65 leading-relaxed">
              Our services are designed for businesses that want more than
              visibility. They want engagement, qualified audiences, market
              entry, brand positioning and long-term growth. Futurex brings
              strategy, structure and execution together to create
              experiences that perform.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-surface py-4 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedRevealGrid className="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = ICONS[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block h-full"
                >
                  <HoverLiftCard className="h-full">
                    <span className="icon-badge transition-transform duration-300 group-hover:-translate-y-1">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-navy/60">
                      {service.shortDesc}
                    </p>
                  </HoverLiftCard>
                </Link>
              );
            })}
          </AnimatedRevealGrid>
        </div>
      </section>
    </>
  );
}
