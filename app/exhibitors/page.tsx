"use client";

import { motion } from "motion/react";
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
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { GSAPRevealGrid } from "@/components/interactive/GSAPRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { LeadFlowForm } from "@/components/forms/LeadFlowForm";
import { PhotoHero } from "@/components/sections/PhotoHero";

const eliteEase = [0.25, 1, 0.5, 1] as const;

const BENEFITS = [
  {
    icon: Eye,
    title: "Brand Visibility",
    body: "Put your products and solutions in front of a relevant, high-intent business audience.",
  },
  {
    icon: Users,
    title: "Buyer Networking",
    body: "Meet potential global buyers, distributors, suppliers and active industry leaders.",
  },
  {
    icon: PackageSearch,
    title: "Product Showcase",
    body: "Demonstrate your latest offerings live in a highly focused corporate environment.",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation",
    body: "Create new business conversations directly with primary decision-makers.",
  },
  {
    icon: Globe2,
    title: "Market Expansion",
    body: "Explore new potential regions, parallel industries and target business communities.",
  },
  {
    icon: Megaphone,
    title: "Sponsorship Tier",
    body: "Amplify your presence through customized premium event branding options.",
  },
];

const PROCESS_STEPS = [
  {
    icon: FileText,
    title: "Submit Your Enquiry",
    body: "Tell us your specific business goals and the specialized trade event you want to focus on.",
  },
  {
    icon: ListChecks,
    title: "Choose the Right Platform",
    body: "Our strategic team helps you pinpoint the most high-yield exhibition layout matrix.",
  },
  {
    icon: Layers,
    title: "Select Participation Package",
    body: "Customize your optimal stall metrics, custom branding, and tier-1 sponsorship channels.",
  },
  {
    icon: ClipboardCheck,
    title: "Prepare Your Presence",
    body: "Coordinate your modular booth configuration, collateral decks, and digital outreach assets.",
  },
  {
    icon: Handshake,
    title: "Exhibit and Connect",
    body: "Command the venue floor, engage priority traffic, and lock down key business contracts.",
  },
];

export default function ExhibitorsPage() {
  return (
    <div className="bg-white text-navy selection:bg-[#e32526] selection:text-white min-h-screen">
      {/* 1. Brand Fluid Hero Layer */}
      <PhotoHero
        image="/images/gallery/exhibitions/india-international-ev-show-1.webp"
        imageAlt="Exhibitors presenting products at the India International EV Show"
        eyebrow="Exhibitors"
        title="Exhibit With Purpose. Connect With Opportunity."
        subtitle="Futurex helps exhibitors present their products, meet potential buyers and build meaningful business relationships through focused trade platforms."
      />

      {/* 2. Strategy Hook Intro Section */}
      <section className="relative py-24 bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-[#233067]/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#e32526]/[0.02] rounded-full blur-[90px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <SectionReveal>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 mb-6"
            >
              <Sparkles className="size-3.5 text-[#e32526]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#233067]/70">Premium Trade Hubs</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#233067] mb-6">
              Why Global Brands Stand With Futurex
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#233067]/70 max-w-2xl mx-auto font-medium">
              Participating in a Futurex exhibition gives your brand more than an isolated display booth. 
              It provides continuous high-level access to an industry-focused environment designed to scale relationships.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* 3. Upgraded Benefits Grid Matrix */}
      <section className="bg-slate-50/50 py-20 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <GSAPRevealGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, idx) => (
              <HoverLiftCard 
                key={benefit.title} 
                className="h-full bg-white border border-slate-200/60 p-8 rounded-[20px] transition-all duration-300 hover:border-[#e32526]/30 hover:shadow-[0_20px_40px_-20px_rgba(35,48,103,0.08)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#e32526]/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-[#233067] transition-all duration-300 group-hover:bg-[#e32526]/5 group-hover:border-[#e32526]/20 group-hover:text-[#e32526]">
                  <benefit.icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="mt-6 text-lg font-black text-[#233067] tracking-tight">{benefit.title}</h3>
                <p className="mt-2.5 text-sm text-[#233067]/65 leading-relaxed font-medium">{benefit.body}</p>
              </HoverLiftCard>
            ))}
          </GSAPRevealGrid>
        </div>
      </section>

      {/* 4. Connected Step-by-Step Interactive Process Timeline */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#e32526] px-2.5 py-0.5 rounded-md bg-[#e32526]/5 border border-[#e32526]/10">
              Onboarding Blueprint
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black text-[#233067] tracking-tight">
              Your Path to Exhibiting With Futurex
            </h2>
          </SectionReveal>

          {/* Interactive Steps Grid Stack */}
          <div className="space-y-6 relative">
            {/* Visual connected alignment line on desktops */}
            <div className="absolute left-[38px] top-4 bottom-4 w-[1px] bg-slate-200 hidden md:block" />

            {PROCESS_STEPS.map((step, i) => (
              <SectionReveal key={step.title} variant="fadeUp" delay={i * 0.08}>
                <motion.div 
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: eliteEase }}
                  className="group flex flex-col md:flex-row items-start gap-6 rounded-2xl border border-slate-200/70 bg-slate-50/40 p-6 transition-all duration-300 hover:bg-white hover:border-[#233067]/20 hover:shadow-md relative z-10"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#233067] text-white transition-all duration-300 group-hover:bg-[#e32526] group-hover:shadow-[0_4px_12px_rgba(227,37,38,0.25)]">
                    <step.icon className="size-5" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#e32526]">
                        Stage 0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-[#233067] tracking-wide">{step.title}</h3>
                    <p className="text-sm text-[#233067]/65 max-w-3xl font-medium leading-relaxed">{step.body}</p>
                  </div>

                  <div className="hidden md:flex items-center self-center text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#e32526] transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="size-5" />
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Minimalist Lead Conversion Funnel */}
      <section className="bg-slate-50/70 py-24 border-t border-slate-200/60">
        <div className="mx-auto max-w-3xl px-6">
          <SectionReveal>
            <div className="rounded-[28px] bg-white border border-slate-200/80 p-2 shadow-xl shadow-slate-100">
              <LeadFlowForm
                variant="full"
                defaultEnquiryType="Book a Stall"
                title="Enquire to Exhibit"
                subtitle="Share your details below and our asset acceleration team will map out the ideal placement structure for you."
                submitLabel="Request Exhibitor Kit"
              />
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}