import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { TESTIMONIALS } from "@/lib/constants/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | Futurex Trade Fair and Events",
  description:
    "Read what exhibitors, businesses, associations and industry voices say about their experience with Futurex exhibition and event platforms.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/conferences/futurex-industry-conference-5.webp"
        imageAlt="Delegates at a Futurex industry conference"
        eyebrow="Testimonials"
        title="Trusted by Businesses, Exhibitors and Industry Voices"
        subtitle="Futurex platforms are valued for their professional coordination, quality audience, business networking and market-focused event experience."
      />

      {/* Intro */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="text-navy/65 leading-relaxed">
              Every successful exhibition is measured by the opportunities it
              creates. Futurex is proud to have supported businesses,
              associations and professionals through platforms that
              encourage visibility, trust and collaboration.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* All testimonials */}
      <section className="bg-surface py-4 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedRevealGrid className="grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <HoverLiftCard key={t.id} className="flex h-full flex-col">
                <Quote className="size-7 text-cherry/40" />
                <p className="mt-4 flex-1 text-sm italic text-navy/70">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-navy/10 pt-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {t.company.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{t.company}</p>
                    <p className="text-xs text-navy/50">
                      {t.designation} · {t.eventOrIndustry}
                    </p>
                  </div>
                </div>
              </HoverLiftCard>
            ))}
          </AnimatedRevealGrid>
        </div>
      </section>

      {/* CTA */}
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
              Have a Futurex Experience to Share?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/70">
              We would love to hear how your business benefited from a
              Futurex platform.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MotionCTAButton href="/contact" variant="primary" size="lg">
                Share Your Experience
              </MotionCTAButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
