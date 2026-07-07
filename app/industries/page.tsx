import type { Metadata } from "next";
import Link from "next/link";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { INDUSTRIES } from "@/lib/constants/industries";
import { INDUSTRY_ICONS } from "@/components/sections/IndustriesGridSection";

export const metadata: Metadata = {
  title: "Industries We Serve | Futurex Trade Fair and Events",
  description:
    "Futurex serves diverse industries by creating focused business environments where brands, buyers and professionals connect with purpose.",
};

export default function IndustriesPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/nepal-agritech-expo-2019.webp"
        imageAlt="Industrial machinery on display at a Futurex exhibition"
        eyebrow="Industries"
        title="Specialized Platforms for High-Growth Industries"
        subtitle="Futurex serves diverse industries by creating focused business environments where brands, buyers and professionals connect with purpose."
      />

      {/* Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedRevealGrid className="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((industry) => {
              const Icon = INDUSTRY_ICONS[industry.icon];
              return (
                <Link key={industry.slug} href={`/industries/${industry.slug}`} className="block h-full">
                  <HoverLiftCard className="flex h-full flex-col justify-between">
                    <span className="icon-badge">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">{industry.name}</h3>
                    <span className="mt-6 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                      Explore Industry →
                    </span>
                  </HoverLiftCard>
                </Link>
              );
            })}
          </AnimatedRevealGrid>
        </div>
      </section>
    </>
  );
}
