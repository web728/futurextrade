import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStatsSection } from "@/components/sections/TrustStatsSection";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { AboutTimelineSection } from "@/components/sections/AboutTimelineSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { IndustriesGridSection } from "@/components/sections/IndustriesGridSection";
import { GSAPPinnedShowcase } from "@/components/interactive/GSAPPinnedShowcase";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { MomentsWallSection } from "@/components/sections/MomentsWallSection";
import { RecognitionSection } from "@/components/sections/RecognitionSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { SEO } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
};

// The Futurex Business Journey: greet the visitor (Hero), prove scale
// (Stats), enter the event floor (Upcoming Exhibitions), understand the
// company (About + Timeline), see the four pillars (What We Do), see the
// industries served, walk the process (pinned Process story), feel the
// energy (Gallery), build trust (Recognition), then act (Final CTA).
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStatsSection />
      <UpcomingEventsSection />
      <AboutPreviewSection />
      <AboutTimelineSection showHeading={false} />
      <WhatWeDoSection />
      <IndustriesGridSection />
      <GSAPPinnedShowcase />
      <GalleryPreviewSection />
      {/* <MomentsWallSection /> */}
      <RecognitionSection />
      <FinalCTASection />
    </>
  );
}
