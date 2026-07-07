import Link from "next/link";
import {
  Building2,
  Construction,
  Mountain,
  Wheat,
  TreePine,
  Package,
  Recycle,
  Zap,
  Plug,
  Pill,
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  Cog,
  Fan,
  Shirt,
  ArrowUpRight,
} from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { INDUSTRIES, type Industry } from "@/lib/constants/industries";

export const INDUSTRY_ICONS: Record<Industry["icon"], typeof Building2> = {
  Building2,
  Construction,
  Mountain,
  Wheat,
  TreePine,
  Package,
  Recycle,
  Zap,
  Plug,
  Pill,
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  Cog,
  Fan,
  Shirt,
};

// Real event photography cycled across tiles as a textured backdrop — we
// don't have a dedicated photo per industry, but a real photo dimmed under
// a dark overlay reads far better than a flat color block.
const TILE_IMAGES = [
  "/images/gallery/nepal-buildcon-expo-2019.webp",
  "/images/gallery/nepal-wood-expo-2019.webp",
  "/images/gallery/bangladesh-buildcon-expo-2019.webp",
  "/images/gallery/nepal-agritech-expo-2019.webp",
  "/images/gallery/futurex-industry-conference-1.webp",
  "/images/gallery/bhutan-buildcon-expo-2019.webp",
  "/images/gallery/bangladesh-wood-expo-2018.webp",
  "/images/gallery/futurex-industry-conference-2.webp",
  "/images/gallery/srilanka-buildcon-expo-2019.webp",
];

export function IndustriesGridSection() {
  return (
    <section className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
            Industries We Serve
          </p>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Specialized Platforms for High-Growth Industries
          </h2>
          <p className="mt-4 text-white/60">
            Futurex creates specialized platforms across high-growth sectors where
            business networking, product discovery and market expansion matter most.
          </p>
        </SectionReveal>

        <AnimatedRevealGrid className="mt-14 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => {
            const Icon = INDUSTRY_ICONS[industry.icon];
            const image = TILE_IMAGES[i % TILE_IMAGES.length];
            return (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/10"
              >
                <GalleryImage
                  src={image}
                  alt=""
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20 transition-opacity duration-300 group-hover:from-cherry/70" />
                <div
                  aria-hidden
                  className="absolute inset-0 scale-0 rounded-2xl opacity-0 shadow-[0_0_0_1px_rgba(227,37,38,0.5)] transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                />

                <div className="relative flex h-full flex-col justify-between p-4">
                  <span className="icon-badge-dark size-9">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight">{industry.name}</p>
                    <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-cherry-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Explore Platform
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </AnimatedRevealGrid>

        <div className="mt-12 text-center">
          <MotionCTAButton href="/industries" variant="light">
            Explore Industries
          </MotionCTAButton>
        </div>
      </div>
    </section>
  );
}
