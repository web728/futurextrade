import type { Metadata } from "next";
import {
  Eye,
  Users,
  PackageSearch,
  TrendingUp,
  Globe2,
  Megaphone,
  FileText,
  ListChecks,
  Layers,
  ClipboardCheck,
  Handshake,
} from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { GSAPRevealGrid } from "@/components/interactive/GSAPRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { LeadFlowForm } from "@/components/forms/LeadFlowForm";
import { PhotoHero } from "@/components/sections/PhotoHero";

export const metadata: Metadata = {
  title: "Exhibit With Futurex | Book a Stall at Our Trade Exhibitions",
  description:
    "Futurex helps exhibitors present their products, meet potential buyers and build meaningful business relationships through focused trade platforms.",
};

const BENEFITS = [
  {
    icon: Eye,
    title: "Brand Visibility",
    body: "Put your products and solutions in front of a relevant business audience.",
  },
  {
    icon: Users,
    title: "Buyer Networking",
    body: "Meet potential buyers, distributors, suppliers and industry professionals.",
  },
  {
    icon: PackageSearch,
    title: "Product Showcase",
    body: "Demonstrate your latest offerings in a focused trade environment.",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation",
    body: "Create new business conversations with decision-makers and serious visitors.",
  },
  {
    icon: Globe2,
    title: "Market Expansion",
    body: "Explore new regions, industries and business communities.",
  },
  {
    icon: Megaphone,
    title: "Sponsorship Opportunities",
    body: "Amplify your presence through event branding and premium visibility options.",
  },
];

const PROCESS_STEPS = [
  {
    icon: FileText,
    title: "Submit Your Enquiry",
    body: "Tell us your business goals and the event you are interested in.",
  },
  {
    icon: ListChecks,
    title: "Choose the Right Platform",
    body: "Our team helps you identify the most suitable exhibition opportunity.",
  },
  {
    icon: Layers,
    title: "Select Your Participation Package",
    body: "Choose stall size, branding options and sponsorship opportunities.",
  },
  {
    icon: ClipboardCheck,
    title: "Prepare Your Presence",
    body: "Plan your booth, promotions and event communication.",
  },
  {
    icon: Handshake,
    title: "Exhibit and Connect",
    body: "Meet the right audience and turn visibility into business opportunities.",
  },
];

export default function ExhibitorsPage() {
  return (
    <>
      {/* Hero */}
      <PhotoHero
        image="/images/gallery/exhibitions/india-international-ev-show-1.webp"
        imageAlt="Exhibitors presenting products at the India International EV Show"
        eyebrow="Exhibitors"
        title="Exhibit With Purpose. Connect With Opportunity."
        subtitle="Futurex helps exhibitors present their products, meet potential buyers and build meaningful business relationships through focused trade platforms."
      />

      {/* Why exhibit */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">Why Exhibit</h2>
            <p className="mt-4 leading-relaxed text-navy/65">
              Participating in a Futurex exhibition gives your brand more than
              a booth. It gives you access to an industry-focused environment
              designed for visibility, conversations, partnerships and growth.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="bg-surface py-4 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <GSAPRevealGrid className="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <HoverLiftCard key={benefit.title} className="h-full">
                <span className="icon-badge transition-transform duration-300 group-hover:-translate-y-1">
                  <benefit.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{benefit.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{benefit.body}</p>
              </HoverLiftCard>
            ))}
          </GSAPRevealGrid>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
              How It Works
            </p>
            <h2 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
              Your Path to Exhibiting With Futurex
            </h2>
          </SectionReveal>

          <div className="mt-14 space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <SectionReveal key={step.title} variant="fadeUp" delay={i * 0.1}>
                <div className="flex items-start gap-5 rounded-2xl border border-navy/10 bg-surface p-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    <step.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-cherry">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-1 text-sm text-navy/60">{step.body}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionReveal>
            <LeadFlowForm
              variant="full"
              defaultEnquiryType="Book a Stall"
              title="Enquire to Exhibit"
              subtitle="Share your details and our team will help you find the right platform."
              submitLabel="Request Exhibitor Kit"
            />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
