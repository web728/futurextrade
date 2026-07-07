import type { Metadata } from "next";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Futurex Exhibitions, Conferences & Corporate Events",
  description:
    "Explore moments from Futurex exhibitions, conferences and corporate event platforms where industries meet, ideas move and opportunities begin.",
};

export default function GalleryPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/srilanka-buildcon-expo-2019.webp"
        imageAlt="Exhibition floor at a Futurex international expo"
        eyebrow="Gallery"
        title="The Energy of Business in Motion"
        subtitle="Explore moments from Futurex exhibitions, conferences and event platforms where industries meet, ideas move and opportunities begin."
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
