import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { GROUP_COMPANIES } from "@/lib/constants/company";

export function GroupCompaniesSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
            The Futurex Group
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            One Group, Multiple Platforms for Growth
          </h2>
          <p className="mt-4 text-navy/60">
            Beyond exhibitions and conferences, the Futurex Group operates
            specialized businesses in digital marketing, healthcare
            infrastructure and exhibition stand design.
          </p>
        </SectionReveal>

        <AnimatedRevealGrid className="mt-14 grid-cols-1 divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-premium md:grid-cols-3 md:divide-x md:divide-y-0">
          {GROUP_COMPANIES.map((company) => (
            <a
              key={company.id}
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col p-8 transition-colors hover:bg-surface"
            >
              <span className="flex size-14 items-center justify-center rounded-full border-2 border-navy/10 text-xl font-extrabold text-navy transition-colors group-hover:border-cherry group-hover:text-cherry">
                {company.shortName.charAt(0)}
              </span>
              <div className="mt-5 flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-navy">{company.name}</h3>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-cherry opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-3 flex-1 text-sm text-navy/60">{company.description}</p>
              <span className="mt-6 text-sm font-semibold text-cherry underline-offset-4 group-hover:underline">
                Visit Website
              </span>
            </a>
          ))}
        </AnimatedRevealGrid>
      </div>
    </section>
  );
}
