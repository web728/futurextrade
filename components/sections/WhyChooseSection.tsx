import { Award, Building2, Globe, Handshake, Layers, Users } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";

const WHY_CHOOSE = [
  {
    id: "legacy",
    icon: Award,
    title: "15-Year Industry Journey",
    body: "A strong legacy since 2011, built through consistent work across trade exhibitions, conferences and corporate events.",
  },
  {
    id: "expertise",
    icon: Layers,
    title: "Multi-Industry Expertise",
    body: "Experience across diverse sectors allows Futurex to understand different business audiences and market needs.",
  },
  {
    id: "networking",
    icon: Users,
    title: "B2B Networking Focus",
    body: "Every platform is designed to support meaningful buyer-seller interaction and business development.",
  },
  {
    id: "reach",
    icon: Globe,
    title: "International Market Reach",
    body: "Futurex connects brands with opportunities across India and international business regions.",
  },
  {
    id: "support",
    icon: Handshake,
    title: "End-to-End Event Support",
    body: "From planning and promotion to execution and engagement, Futurex supports the complete event journey.",
  },
  {
    id: "execution",
    icon: Building2,
    title: "Professional Execution",
    body: "Structured planning, clear communication and disciplined coordination define the Futurex approach.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
            Why Businesses Choose Futurex
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Experience, understanding and execution
          </h2>
          <p className="mt-4 text-navy/60">
            Futurex combines experience, industry understanding and execution
            capability to create event platforms that deliver value beyond
            participation.
          </p>
        </SectionReveal>

        <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item) => (
            <HoverLiftCard key={item.id} className="h-full">
              <span className="icon-badge">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-navy/60">{item.body}</p>
            </HoverLiftCard>
          ))}
        </AnimatedRevealGrid>
      </div>
    </section>
  );
}
