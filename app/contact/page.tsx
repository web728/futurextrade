import type { Metadata } from "next";
import { MapPin, FileDown } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { LeadFlowForm } from "@/components/forms/LeadFlowForm";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { ContactQuickCards } from "@/components/sections/ContactQuickCards";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { CONTACT, COMPANY_PROFILE_PDF, ENQUIRY_TYPES } from "@/lib/constants/company";
import { SEO } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.contact.title,
  description: SEO.contact.description,
};

export default function ContactPage() {
  return (
    <>
      <PhotoHero
        image="/images/gallery/exhibitions/nepal-buildcon-international-expo-1.webp"
        imageAlt="Futurex team on the exhibition floor at Nepal Buildcon International Expo"
        eyebrow="Contact Futurex"
        title="Let's Start a Conversation"
        subtitle="Whether you want to exhibit, sponsor, visit, collaborate or plan an event, our team is ready to help you take the next step."
      />

      {/* Quick contact cards */}
      <ContactQuickCards />

      {/* Company profile download */}
      <section className="bg-surface pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-navy/10 bg-white p-8 text-center shadow-premium md:flex-row md:text-left">
            <div className="flex items-center gap-4">
              <span className="icon-badge shrink-0">
                <FileDown className="size-5" />
              </span>
              <div>
                <p className="text-lg font-bold text-navy">
                  Want our full Company Profile?
                </p>
                <p className="mt-1 text-sm text-navy/60">
                  Download the Futurex Group company profile PDF for a complete
                  overview of who we are and what we do.
                </p>
              </div>
            </div>
            <MotionCTAButton
              href={COMPANY_PROFILE_PDF}
              download="Futurex Group Company Profile.pdf"
              variant="primary"
              icon={false}
              className="shrink-0"
            >
              Download PDF
            </MotionCTAButton>
          </SectionReveal>
        </div>
      </section>

      {/* Enquiry type pills + form + map */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
              What Can We Help With?
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              Tell Us Why You&apos;re Reaching Out
            </h2>
          </SectionReveal>

          <SectionReveal className="mt-8 flex flex-wrap justify-center gap-3">
            {ENQUIRY_TYPES.map((type) => (
              <a
                key={type}
                href="#enquiry-form"
                className="rounded-full border border-navy/15 bg-white px-5 py-2 text-sm font-semibold text-navy transition-colors hover:border-cherry hover:text-cherry"
              >
                {type}
              </a>
            ))}
          </SectionReveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-5">
            <div id="enquiry-form" className="scroll-mt-24 lg:col-span-3">
              <SectionReveal variant="slideRight">
                <LeadFlowForm
                  variant="full"
                  defaultEnquiryType="General Enquiry"
                  title="Tell Us How We Can Help"
                  subtitle="Share a few details and our team will get back to you shortly."
                  submitLabel="Submit Enquiry"
                />
              </SectionReveal>
            </div>

            <SectionReveal variant="slideLeft" delay={0.1} className="lg:col-span-2">
              <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-navy/10 bg-navy p-8 text-center shadow-premium">
                {/* Map placeholder — embed Google Maps here */}
                <div className="absolute inset-0 bg-grid-lines-dark" />
                <MapPin className="relative z-10 size-10 text-cherry" />
                <p className="relative z-10 text-sm font-semibold uppercase tracking-wide text-white/60">
                  Map placeholder — embed Google Maps here
                </p>
                <p className="relative z-10 max-w-xs text-sm text-white/70">
                  {CONTACT.address.full}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
