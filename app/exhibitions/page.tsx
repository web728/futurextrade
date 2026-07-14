import type { Metadata } from "next";
import { SEO } from "@/lib/constants/seo";
import { ExhibitionsExplorer } from "@/components/sections/exhibitions-explorer";

export const metadata: Metadata = {
  title: SEO.exhibitions.title,
  description: SEO.exhibitions.description,
};

export default function ExhibitionsPage() {
  return (
    <div className="bg-[#f8f9fa] overflow-hidden selection:bg-cherry selection:text-white">
      <ExhibitionsExplorer />
    </div>
  );
}