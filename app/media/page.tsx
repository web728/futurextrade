import type { Metadata } from "next";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { MediaGrid } from "@/components/sections/MediaGrid";

export const metadata: Metadata = {
  title: "Media & Insights | Futurex News, Events and Industry Stories",
  description:
    "Stay connected with Futurex news, event announcements, industry insights and media highlights from exhibitions and conferences across India and international markets.",
};

export default function MediaPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/exhibitions/odisha-buildcon-expo-1.webp"
        imageAlt="Exhibition floor at Odisha Buildcon International Expo"
        eyebrow="Media"
        title="Insights, Updates and Industry Stories"
        subtitle="Stay connected with Futurex news, event announcements, industry insights and media highlights."
      />

      {/* Grid */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <MediaGrid />
        </div>
      </section>
    </>
  );
}
