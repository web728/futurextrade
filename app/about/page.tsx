import type { Metadata } from "next";
import { SEO } from "@/lib/constants/seo";
import { AboutHero } from "./_components/AboutHero";
import { AboutStats } from "./_components/AboutStats";
import { AboutBodyNarrative } from "./_components/AboutBodyNarrative";
import { AboutMissionVision } from "./_components/AboutMissionVision";
import { AboutValues } from "./_components/AboutValues";
import { AboutApproach } from "./_components/AboutApproach";
import { AboutMarketPresence } from "./_components/AboutMarketPresence";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { AboutTimelineSection } from "@/components/sections/AboutTimelineSection";
import { GroupCompaniesSection } from "@/components/sections/GroupCompaniesSection";
import { AboutFinalCTA } from "./_components/AboutFinalCTA";

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
};

export default function AboutPage() {
  return (
    <div className="bg-white overflow-hidden selection:bg-cherry selection:text-white">
      <AboutHero />
      <AboutStats />
      <AboutBodyNarrative />
      <AboutMissionVision />
      <AboutValues />
      <AboutApproach />
      <WhyChooseSection />
      <AboutTimelineSection />
      <AboutMarketPresence />
      <GroupCompaniesSection />
      <AboutFinalCTA />
    </div>
  );
}