"use client";

import { SectionReveal } from "@/components/interactive/SectionReveal";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";

export function FinalCTASection() {
  return (
    <section className="bg-grain relative overflow-hidden bg-navy py-24 text-white diagonal-clip">
      <div className="absolute inset-0 bg-grid-lines-dark" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/4 size-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionReveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Build Your Next Business Opportunity?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Partner with Futurex to exhibit, sponsor or create high-impact
            industry platforms that connect your business with the right
            markets.
          </p>
          <div className="relative mt-9">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-24 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
            />
            <div className="relative flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <MotionCTAButton href="/exhibitors" variant="primary" size="lg">
                  Become an Exhibitor
                </MotionCTAButton>
              </MagneticButton>
              <MagneticButton>
                <MotionCTAButton
                  href="/sponsors"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-navy"
                >
                  Partner With Us
                </MotionCTAButton>
              </MagneticButton>
              <MagneticButton>
                <MotionCTAButton href="/exhibitions" variant="light" size="lg">
                  Explore Events
                </MotionCTAButton>
              </MagneticButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
