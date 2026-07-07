import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { GSAPRevealGrid } from "@/components/interactive/GSAPRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { LeadFlowForm } from "@/components/forms/LeadFlowForm";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Become a Sponsor | Futurex Sponsorship & Partnership Opportunities",
  description:
    "Futurex sponsorship and partnership opportunities help brands gain visibility, build authority and connect with focused business audiences.",
};

const SPONSOR_BENEFITS = [
  "Brand visibility across event communication",
  "Logo placement across digital and physical assets",
  "On-site branding opportunities",
  "Speaking and thought-leadership opportunities",
  "Lead generation support",
  "Networking access",
  "Premium positioning in the industry ecosystem",
  "Customized sponsorship packages",
];

// TODO: replace with confirmed sponsorship tier pricing/inclusions
const SPONSOR_TIERS = [
  {
    name: "Silver",
    description: "A strong starting point for brand visibility.",
    inclusions: [
      "Logo on event website and signage",
      "Mention in event communication",
      "Standard networking access",
    ],
    highlighted: false,
  },
  {
    name: "Gold",
    description: "Enhanced visibility with added engagement opportunities.",
    inclusions: [
      "Everything in Silver",
      "Premium logo placement on-site",
      "Speaking opportunity at a session",
      "Priority networking access",
    ],
    highlighted: true,
  },
  {
    name: "Platinum Partner",
    description: "Maximum brand authority and top-tier recognition.",
    inclusions: [
      "Everything in Gold",
      "Headline branding across all assets",
      "Dedicated thought-leadership session",
      "Premium booth positioning",
      "Custom lead-generation support",
    ],
    highlighted: false,
  },
];

export default function SponsorsPage() {
  return (
    <>
      {/* Hero */}
      <PhotoHero
        image="/images/gallery/conferences/futurex-industry-conference-4.webp"
        imageAlt="Sponsor branding on stage at a Futurex industry conference"
        eyebrow="Sponsors"
        title="Put Your Brand at the Centre of Industry Attention"
        subtitle="Futurex sponsorship and partnership opportunities help brands gain visibility, build authority and connect with focused business audiences."
      />

      {/* Why sponsor */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">Why Sponsor</h2>
            <p className="mt-4 leading-relaxed text-navy/65">
              Sponsoring a Futurex platform gives your brand premium exposure
              in front of industry stakeholders, exhibitors, visitors,
              associations and decision-makers.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="bg-surface py-4 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <GSAPRevealGrid className="grid-cols-1 gap-3 sm:grid-cols-2">
            {SPONSOR_BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3.5 text-sm font-medium text-navy shadow-premium"
              >
                <Check className="size-4 shrink-0 text-cherry" />
                {benefit}
              </div>
            ))}
          </GSAPRevealGrid>
        </div>
      </section>

      {/* Sponsorship tiers */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
              Sponsorship Tiers
            </p>
            <h2 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
              Choose the Right Level of Partnership
            </h2>
            <p className="mt-3 text-sm text-navy/50">
              Illustrative tiers pending final commercial packaging — our team
              will tailor a package to your goals.
            </p>
          </SectionReveal>

          {/* TODO: replace with confirmed sponsorship tier pricing/inclusions */}
          <GSAPRevealGrid className="mt-14 grid-cols-1 gap-6 lg:grid-cols-3">
            {SPONSOR_TIERS.map((tier) => (
              <HoverLiftCard
                key={tier.name}
                className={cn(
                  "flex h-full flex-col",
                  tier.highlighted && "border-cherry/40 shadow-[0_30px_60px_-15px_rgba(227,37,38,0.25)]",
                )}
              >
                {tier.highlighted && (
                  <span className="w-fit rounded-full bg-cherry px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="mt-4 text-xl font-bold text-navy">{tier.name}</h3>
                <p className="mt-1 text-sm text-navy/60">{tier.description}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.inclusions.map((inclusion) => (
                    <li key={inclusion} className="flex items-start gap-2 text-sm text-navy/70">
                      <Check className="mt-0.5 size-4 shrink-0 text-cherry" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </HoverLiftCard>
            ))}
          </GSAPRevealGrid>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionReveal>
            <LeadFlowForm
              variant="full"
              defaultEnquiryType="Sponsorship"
              title="Become a Sponsor"
              subtitle="Tell us about your brand goals and we'll recommend the right sponsorship fit."
              submitLabel="Submit Sponsorship Enquiry"
            />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
