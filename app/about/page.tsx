import type { Metadata } from "next";
import { Lightbulb, Users, TrendingUp, MapPin } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { AnimatedCounter } from "@/components/interactive/AnimatedCounter";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { AboutTimelineSection } from "@/components/sections/AboutTimelineSection";
import { WorldExpoMap } from "@/components/interactive/WorldExpoMap";
import { GroupCompaniesSection } from "@/components/sections/GroupCompaniesSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { COMPANY, COMPANY_PROFILE_PDF, STATS, CONTACT } from "@/lib/constants/company";
import { SEO } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
};

const VALUE_ICONS = {
  Innovation: Lightbulb,
  Collaboration: Users,
  Progress: TrendingUp,
} as const;

const VALUE_COPY: Record<(typeof COMPANY.values)[number], string> = {
  Innovation:
    "We create platforms that respond to evolving industries, emerging markets and new business possibilities.",
  Collaboration:
    "We believe meaningful progress happens when businesses, associations, buyers and professionals come together.",
  Progress:
    "We design every event experience to move brands, industries and markets forward.",
};

export default function AboutPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/exhibitions/indo-nepal-expo-1.webp"
        imageAlt="Futurex exhibition floor at the Indo-Nepal International Expo"
        eyebrow="About Futurex"
        title="A 15-Year Journey of Connecting Businesses and Building Markets"
        subtitle="Since 2011, Futurex Trade Fair and Events Private Limited has been creating professional exhibition and event platforms that help industries connect, collaborate and grow."
      >
        <div className="mt-8 flex justify-center">
          <MotionCTAButton
            href={COMPANY_PROFILE_PDF}
            download="Futurex Group Company Profile.pdf"
            variant="outline"
            icon={false}
            className="border-white text-white hover:bg-white hover:text-navy"
          >
            Download Company Profile
          </MotionCTAButton>
        </div>
      </PhotoHero>

      {/* Trust stats */}
      <section className="border-b border-navy/10 bg-white py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-5">
          {STATS.map((stat, i) => (
            <SectionReveal key={stat.label} variant="fadeUp" delay={i * 0.06}>
              <div className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  className="block text-3xl font-extrabold text-navy sm:text-4xl"
                />
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy/50 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* About body */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal className="space-y-6 text-navy/70 leading-relaxed">
            <p>
              Futurex Trade Fair and Events Private Limited is a professional
              exhibition and event management company creating B2B platforms for
              trade, networking, brand visibility and market expansion.
            </p>
            <p>
              Based in New Delhi, Futurex brings together manufacturers,
              suppliers, buyers, associations, chambers, professionals and
              decision-makers through exhibitions, conferences, corporate
              events and promotional experiences.
            </p>
            <p>
              Over the years, Futurex has grown into a multi-industry event
              platform builder, supporting business communities across sectors
              such as construction, infrastructure, agriculture, mining, wood,
              packaging, power, EV, pharma, education and more.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          <SectionReveal variant="slideRight">
            <HoverLiftCard className="h-full">
              <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
                Our Mission
              </p>
              <p className="mt-4 text-navy/70 leading-relaxed">
                To create high-value trade platforms that connect businesses
                with the right markets, audiences and opportunities through
                professional exhibitions, conferences and event experiences.
              </p>
            </HoverLiftCard>
          </SectionReveal>
          <SectionReveal variant="slideLeft" delay={0.1}>
            <HoverLiftCard className="h-full">
              <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
                Our Vision
              </p>
              <p className="mt-4 text-navy/70 leading-relaxed">
                To be a trusted international exhibition and event partner
                known for building business ecosystems that inspire
                collaboration, innovation and sustainable growth.
              </p>
            </HoverLiftCard>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              Our Values
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              What Drives Us Forward
            </h2>
          </SectionReveal>

          <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 sm:grid-cols-3">
            {COMPANY.values.map((value) => {
              const Icon = VALUE_ICONS[value];
              return (
                <HoverLiftCard key={value} className="h-full">
                  <span className="icon-badge">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy">{value}</h3>
                  <p className="mt-2 text-sm text-navy/60">{VALUE_COPY[value]}</p>
                </HoverLiftCard>
              );
            })}
          </AnimatedRevealGrid>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-navy py-24 text-white">
        <div className="relative mx-auto max-w-4xl overflow-hidden px-6 text-center">
          <div className="absolute inset-0 -z-10 bg-grid-lines-dark" />
          <SectionReveal>
            <p className="eyebrow-pill mx-auto">Our Approach</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Strategic Platforms. Seamless Execution. Real Business Value.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-white/70 leading-relaxed">
              Futurex believes exhibitions are not just about display — they
              are about connection, visibility, trust and opportunity. Our
              approach combines market understanding, professional planning,
              targeted promotion and disciplined execution to create event
              platforms that deliver measurable business impact.
            </p>
          </SectionReveal>
        </div>
      </section>

      <WhyChooseSection />

      {/* Timeline */}
      <AboutTimelineSection />

      {/* Market presence */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              Market Presence
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              India, Nepal, Bangladesh, Sri Lanka, Bhutan, Kenya &amp; Uganda —
              One Growing Trade Network
            </h2>
            <p className="mt-4 text-navy/60">
              From our New Delhi headquarters, Futurex runs exhibitions across
              South Asia and East Africa. Hover a country to see what we run
              there.
            </p>
          </SectionReveal>

          <div className="mt-10">
            <WorldExpoMap />
          </div>

          <div className="mt-14">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-navy/40">
              Registered Offices
            </p>
            <AnimatedRevealGrid className="mt-6 grid-cols-2 gap-4 sm:grid-cols-5">
              {CONTACT.branches.map((branch) => (
                <HoverLiftCard key={branch} className="flex flex-col items-center gap-2 text-center">
                  <MapPin className="size-6 text-cherry" />
                  <span className="text-sm font-semibold text-navy">{branch}</span>
                </HoverLiftCard>
              ))}
            </AnimatedRevealGrid>
          </div>
        </div>
      </section>

      <GroupCompaniesSection />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy py-24 text-white diagonal-clip">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div
          aria-hidden
          className="absolute -top-24 left-1/4 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Let&apos;s Build the Future Together
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/70">
              Partner with Futurex to create, participate in or support
              business platforms designed for industry growth.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MotionCTAButton href="/contact" variant="primary" size="lg">
                Connect With Our Team
              </MotionCTAButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
