import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Landmark,
  Globe2,
  Presentation,
  CalendarDays,
  Megaphone,
  LayoutTemplate,
  Video,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { SERVICES, type Service } from "@/lib/constants/services";
import { SITE_URL } from "@/lib/constants/company";

const ICONS: Record<Service["icon"], typeof Landmark> = {
  "trade-exhibitions": Landmark,
  "international-expos": Globe2,
  conferences: Presentation,
  "corporate-events": CalendarDays,
  "branding-promotions": Megaphone,
  "exhibition-stand-design": LayoutTemplate,
  "webinars-virtual-events": Video,
};

const INCLUSIONS: Record<Service["icon"], string[]> = {
  "trade-exhibitions": [
    "End-to-end exhibition planning, from concept to on-ground execution",
    "Exhibitor onboarding, stall allocation and floor plan management",
    "Targeted visitor promotion to reach qualified buyers and decision-makers",
    "On-site coordination, registration and business networking support",
  ],
  "international-expos": [
    "Market assessment and positioning for cross-border participation",
    "Coordination with regional trade bodies, chambers and delegations",
    "International exhibitor and buyer outreach programs",
    "On-ground logistics support across participating markets",
  ],
  conferences: [
    "Agenda design in collaboration with industry experts and speakers",
    "Speaker sourcing, session planning and panel curation",
    "Delegate registration and audience engagement management",
    "Professional venue, audio-visual and hospitality coordination",
  ],
  "corporate-events": [
    "Concept development aligned with your business objectives",
    "End-to-end event planning, vendor coordination and logistics",
    "Guest management, hospitality and on-site execution",
    "Post-event reporting and follow-up support",
  ],
  "branding-promotions": [
    "Pre-event promotional campaigns to build audience awareness",
    "On-ground branding, signage and visibility placements",
    "Digital and print promotional collateral coordination",
    "Post-event visibility and brand recall initiatives",
  ],
  "exhibition-stand-design": [
    "Custom booth concept and layout design",
    "Fabrication, branding and on-site stand execution",
    "Furniture, AV and display element coordination",
    "On-time installation and dismantling management",
  ],
  "webinars-virtual-events": [
    "Virtual platform setup and technical coordination",
    "Speaker and panel session management for digital audiences",
    "Audience registration, engagement and moderation support",
    "Recording, reporting and post-event content distribution",
  ],
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const title = `${service.name} in India, Nepal, Bangladesh, Sri Lanka & East Africa | Futurex`;
  return {
    title,
    description: service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description: service.shortDesc, type: "website", url: `${SITE_URL}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = ICONS[service.icon];
  const inclusions = INCLUSIONS[service.icon];
  const related = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Breadcrumb + hero */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div
          aria-hidden
          className="absolute -top-24 right-0 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <Link href="/services" className="transition-colors hover:text-white">
              Services
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span aria-current="page" className="text-white/80">
              {service.name}
            </span>
          </nav>

          <SectionReveal className="mt-6">
            <span className="icon-badge-dark size-14">
              <Icon className="size-6" />
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              {service.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
              {service.body}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              What&apos;s Included
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              How Futurex Delivers This Service
            </h2>
          </SectionReveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {inclusions.map((item, i) => (
              <SectionReveal key={item} variant="fadeUp" delay={i * 0.06}>
                <li className="flex items-start gap-3 rounded-xl border border-navy/10 bg-surface p-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cherry" aria-hidden />
                  <span className="text-sm text-navy/70 leading-relaxed">{item}</span>
                </li>
              </SectionReveal>
            ))}
          </ul>

          <SectionReveal className="mt-12">
            <MotionCTAButton href="/contact" variant="primary" size="lg">
              {service.cta}
            </MotionCTAButton>
          </SectionReveal>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              Related Services
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              Explore More Ways We Can Help
            </h2>
          </SectionReveal>

          <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => {
              const RelatedIcon = ICONS[s.icon];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="block h-full">
                  <HoverLiftCard className="h-full">
                    <RelatedIcon className="size-8 text-cherry transition-transform duration-300 group-hover:-translate-y-1" />
                    <h3 className="mt-4 text-lg font-bold text-navy">{s.name}</h3>
                    <p className="mt-2 text-sm text-navy/60">{s.shortDesc}</p>
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
