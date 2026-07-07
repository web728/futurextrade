import { SectionReveal } from "@/components/interactive/SectionReveal";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { GALLERY_ITEMS } from "@/lib/constants/gallery";

function GalleryTile({
  item,
  className,
}: {
  item: (typeof GALLERY_ITEMS)[number];
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      <GalleryImage
        src={item.src}
        alt={item.alt}
        className="transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm font-semibold text-white">{item.moment}</p>
        <p className="text-xs text-white/70">
          {item.category} · {item.year}
        </p>
      </div>
    </div>
  );
}

export function GalleryPreviewSection() {
  const [featured, ...rest] = GALLERY_ITEMS;
  const supporting = rest.slice(0, 4);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
            Gallery
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Moments That Move Markets
          </h2>
          <p className="mt-4 text-navy/60">
            Explore the energy, scale and business impact of Futurex exhibitions,
            conferences and industry gatherings.
          </p>
        </SectionReveal>

        <SectionReveal variant="scaleIn" className="mt-14">
          <div className="grid gap-4 md:grid-cols-2">
            <GalleryTile item={featured} className="aspect-[4/5] md:aspect-auto md:h-full" />
            <div className="grid grid-cols-2 gap-4">
              {supporting.map((item) => (
                <GalleryTile key={item.id} item={item} className="aspect-square" />
              ))}
            </div>
          </div>
        </SectionReveal>

        <div className="mt-12 text-center">
          <MotionCTAButton href="/gallery" variant="outline">
            View Gallery
          </MotionCTAButton>
        </div>
      </div>
    </section>
  );
}