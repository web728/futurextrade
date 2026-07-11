import type { Metadata } from "next";
import { SEO } from "@/lib/constants/seo";
import { ServicesHero } from "./_components/ServicesHero";
import { ServicesIntro } from "./_components/ServicesIntro";
import { ServicesGrid } from "./_components/ServicesGrid";

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
};

export default function ServicesPage() {
  return (
    <div className="bg-white overflow-hidden selection:bg-cherry selection:text-white">
      <ServicesHero />
      <ServicesIntro />
      <ServicesGrid />
    </div>
  );
}