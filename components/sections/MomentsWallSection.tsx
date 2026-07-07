import Link from "next/link";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { GALLERY_ITEMS } from "@/lib/constants/gallery";
import { STATS } from "@/lib/constants/company";

// A curated handful of moments for the homepage preview — the full archive
// (60+ real event photos) lives on /gallery, so this stays a fixed, evenly
// sized sample rather than trying to tile the entire set into a small space.
const PREVIEW_IDS = [
  "nepal-wood-2019",
  "nepal-agritech-2019",
  "nepal-buildcon-2019",
  "bangladesh-buildcon-2019",
  "srilanka-buildcon-2019",
  "futurex-building-specifiers-conference-2018",
  "bhutan-buildcon-2019",
  "futurex-conference-delegates-2018",
];

const MOMENTS = PREVIEW_IDS.map((id) => GALLERY_ITEMS.find((item) => item.id === id)).filter(
  (item): item is NonNullable<typeof item> => Boolean(item),
);

export function MomentsWallSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
            One Growing Archive
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            {STATS[0].value} Platforms, Every One a Real Room Full of People
          </h2>
          <p className="mt-4 text-navy/60">
            A glimpse from the floor — hover a moment, or view the full
            gallery below.
          </p>
        </SectionReveal>

        <AnimatedRevealGrid className="mt-12 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {MOMENTS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <GalleryImage
                src={item.src}
                alt={item.alt}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/80 via-navy/5 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-medium leading-tight text-white">{item.moment}</p>
              </div>
            </div>
          ))}
        </AnimatedRevealGrid>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="text-sm font-semibold text-cherry transition-colors hover:text-cherry-dark"
          >
            View the full gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
