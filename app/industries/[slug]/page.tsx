import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { IndustryRelatedEvents } from "@/components/sections/IndustryRelatedEvents";
import { INDUSTRIES } from "@/lib/constants/industries";
import { EXHIBITIONS } from "@/lib/constants/exhibitions";
import { SITE_URL } from "@/lib/constants/company";

export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

function countriesForIndustry(industryName: string): string[] {
  return Array.from(
    new Set(
      EXHIBITIONS.filter((e) => e.industry === industryName).map((e) => e.venue.country),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return {};
  const countries = countriesForIndustry(industry.name);
  const countrySuffix = countries.length > 0 ? ` in ${countries.join(", ")}` : "";
  const title = `${industry.name} Exhibitions & Trade Fairs${countrySuffix} | Futurex`;
  const description = `Futurex organizes ${industry.name.toLowerCase()} trade exhibitions${countrySuffix}, connecting manufacturers, suppliers and buyers through professional B2B platforms designed for market growth.`;
  return {
    title,
    description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/industries/${industry.slug}` },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) notFound();

  const countries = countriesForIndustry(industry.name);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-28 text-white">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div
          aria-hidden
          className="absolute -top-24 right-0 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cherry">
              {industry.name}
            </p>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              {industry.name} Exhibitions{countries.length > 0 ? ` in ${countries.join(", ")}` : ""}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
              Futurex supports the {industry.name} sector by creating
              professional trade platforms
              {countries.length > 0 ? ` across ${countries.join(", ")}` : ""},
              where businesses can showcase solutions, meet qualified
              audiences and explore market growth.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Related events */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal>
            <IndustryRelatedEvents industryName={industry.name} />
          </SectionReveal>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-center">
          <MotionCTAButton href="/exhibitions">Explore Related Events</MotionCTAButton>
          <MotionCTAButton href="/exhibitors" variant="outline">
            Enquire for Participation
          </MotionCTAButton>
        </div>
      </section>
    </>
  );
}
