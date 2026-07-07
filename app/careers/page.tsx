import type { Metadata } from "next";
import { Briefcase, Users2, GraduationCap, Handshake, Globe2, TrendingUp } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { LottieLoader } from "@/components/interactive/LottieLoader";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { CAREERS_CONTENT, OPEN_POSITIONS } from "@/lib/constants/careers";

export const metadata: Metadata = {
  title: "Careers | Futurex Trade Fair and Events",
  description:
    "Explore career opportunities at Futurex Trade Fair and Events Private Limited and join a team building exhibition and event platforms across industries.",
};

const WHY_JOIN_ICONS = [Globe2, Briefcase, GraduationCap, Handshake, Users2, TrendingUp];

export default function CareersPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/conferences/ev-dynamics-conference-2.webp"
        imageAlt="Futurex team at an industry conference"
        eyebrow="Careers at Futurex"
        title="Build the Future of Business Events With Us"
        subtitle="Join a team that creates platforms for industries, brands and markets to connect, collaborate and grow."
      />

      {/* Culture */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              Our Culture
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              People Who Make Business Platforms Possible
            </h2>
            <p className="mt-6 text-navy/65 leading-relaxed">
              {CAREERS_CONTENT.culture}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Why Join */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              Why Join Futurex
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              What You&apos;ll Gain With Us
            </h2>
          </SectionReveal>

          <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAREERS_CONTENT.whyJoin.map((item, i) => {
              const Icon = WHY_JOIN_ICONS[i % WHY_JOIN_ICONS.length];
              return (
                <HoverLiftCard key={item} className="h-full">
                  <span className="icon-badge">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 font-semibold text-navy">{item}</p>
                </HoverLiftCard>
              );
            })}
          </AnimatedRevealGrid>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              Open Positions
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              Current Opportunities
            </h2>
          </SectionReveal>

          {OPEN_POSITIONS.length === 0 ? (
            <SectionReveal delay={0.1}>
              <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-navy/10 bg-surface p-12">
                <LottieLoader kind="empty" size={80} />
                <p className="max-w-md text-navy/60">
                  No open positions right now. Check back soon, or send us your
                  CV.
                </p>
                <MotionCTAButton href="/contact" variant="navy">
                  Send Us Your CV
                </MotionCTAButton>
              </div>
            </SectionReveal>
          ) : (
            <AnimatedRevealGrid className="mt-12 grid-cols-1 gap-6 sm:grid-cols-2">
              {OPEN_POSITIONS.map((position) => (
                <HoverLiftCard key={position.slug} className="h-full text-left">
                  <h3 className="text-lg font-bold text-navy">{position.title}</h3>
                  <p className="mt-1 text-sm text-navy/60">
                    {position.department} · {position.location} · {position.type}
                  </p>
                </HoverLiftCard>
              ))}
            </AnimatedRevealGrid>
          )}
        </div>
      </section>
    </>
  );
}
