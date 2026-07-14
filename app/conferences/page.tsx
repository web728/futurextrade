"use client";

import { motion } from "motion/react";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { ConferenceFilterGrid } from "@/components/sections/ConferenceFilterGrid";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { Sparkles, Terminal, ShieldCheck, Users } from "lucide-react";

const eliteEase = [0.25, 1, 0.5, 1] as const;

const valueProps = [
  {
    icon: Users,
    title: "Global Visionaries",
    desc: "C-Suite executives, innovators, and key policy makers under one singular roof.",
  },
  {
    icon: Terminal,
    title: "Actionable Insights",
    desc: "Moving beyond theories with pure technical blueprints and execution metrics.",
  },
  {
    icon: ShieldCheck,
    title: "Strategic Access",
    desc: "Exclusive breakout zones engineered for frictionless B2B networking ecosystems.",
  },
];

export default function ConferencesPage() {
  return (
    <div className="bg-white text-navy min-h-screen overflow-hidden selection:bg-cherry selection:text-white">
      {/* 1. Brand Integrated Hero Section */}
      <PhotoHero
        image="/images/gallery/conferences/futurex-industry-conference-2.webp"
        imageAlt="Stage at a Futurex-organized international conference"
        eyebrow="Conferences"
        title="Conferences That Inspire Industry Dialogue"
        subtitle="Futurex conferences bring together experts, professionals and decision-makers to exchange insights, explore innovation and shape future-ready industries."
      >
        <MagneticButton className="w-full sm:w-auto">
          <MotionCTAButton
            href="/conferences#registry"
            variant="primary"
            size="default"
            className="w-full justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-white hover:bg-[var(--accent)]/90"
          >
            View Upcoming Conferences
          </MotionCTAButton>
        </MagneticButton>
        <MagneticButton className="w-full sm:w-auto">
          <MotionCTAButton
            href="/contact"
            variant="outline"
            size="default"
            className="w-full justify-center rounded-full border border-white bg-transparent px-6 py-3 text-white transition-all hover:bg-white hover:text-[var(--primary)]"
          >
            Partner With Us
          </MotionCTAButton>
        </MagneticButton>
      </PhotoHero>

      {/* 2. Brand Identity Intro Banner */}
      <section className="relative py-24 border-b border-slate-100 overflow-hidden bg-white">
        {/* Soft, premium light brand ambient flares */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cherry/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <SectionReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: eliteEase }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 mb-6 backdrop-blur-md"
            >
              <Sparkles className="size-3.5 text-cherry animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-navy/60">Knowledge Ecosystems</span>
            </motion.div>

            <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-6 text-navy">
              Where Strategy Meets Practical Innovation
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-navy/70 max-w-3xl mx-auto font-medium">
              Our conference platforms are custom engineered to spark high-value, critical corporate
              conversations around emerging tech, industrial macro-economics, policy shifts, and sector growth.
            </p>
          </SectionReveal>
        </div>

        {/* 3. Value Props Grid - Luxury White Variant */}
        <div className="mx-auto max-w-5xl px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: eliteEase }}
                className="group relative p-6 bg-slate-50/50 rounded-[20px] border border-slate-200/60 transition-all duration-300 hover:bg-white hover:border-cherry/40 hover:shadow-[0_20px_40px_-15px_rgba(227,37,38,0.08)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cherry/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 transition-all group-hover:bg-cherry/5 group-hover:border-cherry/30">
                  <Icon className="size-5 text-navy/60 group-hover:text-cherry transition-colors" />
                </div>
                <h3 className="text-sm font-black text-navy tracking-wide mb-2 uppercase">{prop.title}</h3>
                <p className="text-xs text-navy/60 leading-relaxed font-medium">{prop.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Timeline Grid Section - Light Surface Variant */}
      <section id="registry" className="relative py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-cherry uppercase tracking-widest block mb-2">Live Registry</span>
              <h2 className="text-xl md:text-3xl font-black text-navy tracking-tight">Active & Historical Symposia</h2>
            </div>
            <p className="text-xs text-navy/50 max-w-xs font-medium leading-relaxed">
              Use live toggles below to filter through sectors. All data decks, speakers, and event logs are accessible right inside the card matrix.
            </p>
          </div>

          <SectionReveal>
            <ConferenceFilterGrid />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}