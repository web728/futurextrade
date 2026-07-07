import { Quote } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { LogoMarquee } from "@/components/interactive/LogoMarquee";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { ASSOCIATE_LOGOS } from "@/lib/constants/company";

export function RecognitionSection() {
  const items = TESTIMONIALS.slice(0, 3);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
            Recognition &amp; Trust
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Recognized by Businesses and Industry Leaders
          </h2>
          <p className="mt-4 text-navy/60">
            Businesses and industry representatives have recognized Futurex
            platforms for quality visitors, professional coordination and
            meaningful business opportunities.
          </p>
        </SectionReveal>

        <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.id}
              className="glass-panel-light flex h-full flex-col rounded-2xl border border-navy/10 p-6"
            >
              <Quote className="size-7 text-cherry/40" />
              <p className="mt-4 flex-1 text-sm italic text-navy/70">“{t.quote}”</p>
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
            </div>
          ))}
        </AnimatedRevealGrid>

        <div className="mt-10 text-center">
          <MotionCTAButton href="/testimonials" variant="outline">
            Read Testimonials
          </MotionCTAButton>
        </div>

        <div className="mt-16 border-t border-navy/10 pt-10">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-navy/40">
            Recognized by leading industry associations
          </p>
          <LogoMarquee logos={ASSOCIATE_LOGOS} />
        </div>
      </div>
    </section>
  );
}
