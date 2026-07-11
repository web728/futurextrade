import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, type Service } from "@/lib/constants/services";
import { SITE_URL } from "@/lib/constants/company";
import { ServiceDetailClient } from "./ServiceDetailClient";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  
  const title = `${service.name} | India, Nepal, Bangladesh, Sri Lanka & East Africa | Futurex`;
  return {
    title,
    description: service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { 
      title, 
      description: service.shortDesc, 
      type: "website", 
      url: `${SITE_URL}/services/${service.slug}` 
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className="bg-white min-h-screen selection:bg-cherry selection:text-white">
      <ServiceDetailClient service={service} related={related} />
    </div>
  );
}