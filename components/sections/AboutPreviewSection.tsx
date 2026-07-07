import { SectionReveal } from "@/components/interactive/SectionReveal";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";

export function AboutPreviewSection() {
  return (
    <section className="bg-surface pt-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
            About Futurex
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Since 2011, Futurex Has Built Platforms Where Business Happens
          </h2>
          <p className="mt-6 text-navy/65 leading-relaxed">
            Futurex creates powerful B2B trade platforms through exhibitions,
            conferences, corporate events and international business
            networking. Our platforms help industries launch products, meet
            buyers, build partnerships and unlock new markets.
          </p>
          <div className="mt-8">
            <MotionCTAButton href="/about" variant="navy">
              Discover Our Journey
            </MotionCTAButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
