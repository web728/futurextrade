import type { Metadata } from "next";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { ConferenceFilterGrid } from "@/components/sections/ConferenceFilterGrid";

export const metadata: Metadata = {
  title: "Conferences | Industry Knowledge Platforms by Futurex",
  description:
    "Explore Futurex conferences bringing together experts, professionals and decision-makers to exchange insights, explore innovation and shape future-ready industries.",
};

export default function ConferencesPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/conferences/futurex-industry-conference-2.webp"
        imageAlt="Stage at a Futurex-organized international conference"
        eyebrow="Conferences"
        title="Conferences That Inspire Industry Dialogue"
        subtitle="Futurex conferences bring together experts, professionals and decision-makers to exchange insights, explore innovation and shape future-ready industries."
      />

      {/* Intro */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="leading-relaxed text-navy/65">
              Our conference platforms are designed to create meaningful
              conversations around technology, business, policy, innovation
              and sector growth. Each conference is structured to deliver
              knowledge, networking and strategic value.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-surface py-4 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionReveal>
            <ConferenceFilterGrid />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
