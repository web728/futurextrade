import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { GALLERY_ITEMS } from "@/lib/constants/gallery";
import { GalleryHero } from "@/components/sections/GalleryHero";

export const metadata: Metadata = {
  title: "Gallery | Futurex Exhibitions, Conferences & Corporate Events",
  description:
    "Explore moments from Futurex exhibitions, conferences and corporate event platforms where industries meet, ideas move and opportunities begin.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero
        eyebrow="Gallery"
        title="The Energy of Business in Motion"
        subtitle="Explore moments from Futurex exhibitions, conferences and event platforms where industries meet, ideas move and opportunities begin."
        // A handful of real gallery images double as the hero's floating
        // parallax tiles — no separate hero-only asset needed.
        previewItems={GALLERY_ITEMS.slice(0, 6).map((item) => ({ src: item.src, alt: item.alt }))}
      />

      {/* Grid */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}