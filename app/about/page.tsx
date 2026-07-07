import type { Metadata } from "next";
import { Lightbulb, Users, TrendingUp, MapPin, Leaf, Handshake, ShieldCheck, Clock3 } from "lucide-react";
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

        <div className="mt-4 space-y-4 text-navy/70 leading-relaxed">
          <p>
            Increase our existing show standards and develop new shows according
            to the latest market demand.
          </p>

          <p>
            Create business cooperation and networking opportunities that foster
            long-term business growth.
          </p>

          <p>
            Expand our masterpiece exhibitions across the region, strengthening
            our presence in emerging and established markets.
          </p>

          <p>
            Futurex strives to excel in high-quality service delivery through
            trust, commitment, and perseverance.
          </p>

          <p>
            Organize the largest number of specialized trade fairs while serving
            promising industries across the country and the region.
          </p>

          <p>
            Provide visitors with valuable information and meaningful insights
            into the industries and sectors they are most interested in.
          </p>
        </div>
      </HoverLiftCard>
    </SectionReveal>

    <SectionReveal variant="slideLeft" delay={0.1}>
      <HoverLiftCard className="h-full">
        <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
          Our Vision
        </p>

        <div className="mt-4 space-y-4 text-navy/70 leading-relaxed">
          <p>
            Exhibitions transcend mere spectacle; their true value lies in the
            effectiveness with which they unite like-minded business entities
            under a single roof. At Futurex, our aspiration is to propel the
            exhibition industry to unparalleled heights while adhering to the
            highest international standards.
          </p>

          <p>
            We are dedicated to laying the groundwork for effective business
            development, fostering meaningful consumer engagement, facilitating
            seamless project execution, and promoting comprehensive industry
            knowledge.
          </p>

          <p className="font-semibold text-navy">
            Our objectives include:
          </p>

          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Enhanced Networking:</strong> Facilitating seamless,
              well-organized interactions with potential buyers to create
              valuable business connections.
            </li>

            <li>
              <strong>Elevated Brand Visibility:</strong> Amplifying brand
              recognition and strengthening market presence.
            </li>

            <li>
              <strong>In-depth Industry Insights:</strong> Encouraging industry
              learning by bringing together knowledge and expertise from leading
              professionals.
            </li>

            <li>
              <strong>Cost-effective Marketing Counsel:</strong> Delivering
              practical and strategic marketing guidance for maximum impact.
            </li>

            <li>
              <strong>Instant Deal Closing:</strong> Enabling real-time
              negotiations, faster decision-making, and quicker business
              agreements.
            </li>

            <li>
              <strong>Expansive Platform:</strong> Providing a dynamic platform
              for brands and industries to showcase their latest products and
              innovations to a highly engaged audience.
            </li>
          </ul>
        </div>
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
        The Principles That Define Futurex
      </h2>

      <p className="mt-4 text-navy/70 leading-relaxed">
        At Futurex, our success is built upon strong values that inspire trust,
        strengthen partnerships, and ensure excellence in every exhibition and
        business event we organize.
      </p>
    </SectionReveal>

    <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* Business Ethics */}
      <HoverLiftCard className="h-full">
        <span className="icon-badge">  <Leaf className="size-6" /></span>

        <h3 className="mt-4 text-xl font-bold text-navy">
          Business Ethics
        </h3>

        <p className="mt-3 text-sm leading-7 text-navy/70">
          We are committed to responsible business practices that promote
          sustainability and environmental consciousness. Every aspect of our
          operations reflects our dedication to building a greener future while
          maintaining the highest ethical standards.
        </p>
      </HoverLiftCard>

      {/* Respect */}
      <HoverLiftCard className="h-full">
        <span className="icon-badge">
          <Handshake className="size-6" />
        </span>

        <h3 className="mt-4 text-xl font-bold text-navy">
          Respect
        </h3>

        <p className="mt-3 text-sm leading-7 text-navy/70">
          We value every client relationship by listening carefully,
          understanding unique requirements, and delivering solutions that
          exceed expectations, ensuring the highest level of satisfaction.
        </p>
      </HoverLiftCard>

      {/* Integrity */}
      <HoverLiftCard className="h-full">
        <span className="icon-badge">
            <ShieldCheck className="size-6" />
        </span>

        <h3 className="mt-4 text-xl font-bold text-navy">
          Integrity
        </h3>

        <p className="mt-3 text-sm leading-7 text-navy/70">
          Honesty, transparency, and sincerity guide every decision we make. We
          are wholeheartedly dedicated to our exhibitions, our partners, and
          our clients, building relationships founded on trust.
        </p>
      </HoverLiftCard>

      {/* Reliability */}
      <HoverLiftCard className="h-full">
        <span className="icon-badge">
            <Clock3 className="size-6" />
        </span>

        <h3 className="mt-4 text-xl font-bold text-navy">
          Reliability
        </h3>

        <p className="mt-3 text-sm leading-7 text-navy/70">
          We believe reliability is earned through consistency. By remaining
          flexible, honoring our commitments, and meeting deadlines, we deliver
          dependable experiences that our clients can confidently rely on.
        </p>
      </HoverLiftCard>

    </AnimatedRevealGrid>
  </div>
</section>

     {/* Our Approach */}
<section className="relative overflow-hidden bg-navy py-28 text-white">
  {/* Background */}
  <div className="absolute inset-0 bg-grid-lines-dark opacity-20" />
  <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
  <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    <SectionReveal>
      <div className="grid items-center gap-16 lg:grid-cols-2">

        {/* Left Content */}
        <div>
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold tracking-widest uppercase text-brand">
            Our Approach
          </span>

          <div className="mt-6 h-1 w-20 rounded-full bg-brand" />

          <h2 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">
            Strategic Platforms.
            <br />
            Seamless Execution.
            <br />
            <span className="text-brand">Real Business Value.</span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
            At Futurex, exhibitions are more than venues—they are strategic
            business ecosystems where brands connect, partnerships grow, and
            industries evolve. Every event is carefully planned with market
            intelligence, precision execution, and measurable outcomes at its
            core.
          </p>
        </div>

        {/* Right Card */}
        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <div className="mb-6 text-6xl font-black leading-none text-brand opacity-30">
              "
            </div>

            <p className="text-xl leading-9 text-white/90">
              We don't simply organize exhibitions—we create powerful business
              platforms that unite industries, foster innovation, generate
              meaningful connections, and accelerate long-term growth.
            </p>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-sm uppercase tracking-[0.3em] text-brand">
                Futurex Philosophy
              </p>
            </div>
          </div>
        </div>

      </div>
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
