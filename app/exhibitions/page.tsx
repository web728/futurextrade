import type { Metadata } from "next";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { ExhibitionFilterBar } from "@/components/sections/ExhibitionFilterBar";
import { SEO } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.exhibitions.title,
  description: SEO.exhibitions.description,
};

export default function ExhibitionsPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/nepal-buildcon-expo-2019.webp"
        imageAlt="Business visitors at a Futurex trade exhibition"
        eyebrow="Exhibitions"
        title="Trade Exhibitions That Move Industries Forward"
        subtitle="Explore Futurex exhibitions designed to connect businesses, showcase innovation and open doors to new markets."
      />

      {/* Intro */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="leading-relaxed text-navy/65">
              Futurex exhibitions are built around industries with strong
              business potential. Each exhibition acts as a focused platform
              where brands can meet buyers, discover opportunities, build
              partnerships and strengthen market presence.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="bg-surface py-4 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal>
            <ExhibitionFilterBar />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
