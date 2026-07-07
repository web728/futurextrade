import type { Metadata } from "next";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { CONTACT } from "@/lib/constants/company";

export const metadata: Metadata = {
  title: "Terms & Conditions | Futurex Trade Fair and Events",
  description:
    "Read the Terms & Conditions governing use of the Futurex Trade Fair and Events Private Limited website and participation in our exhibitions and events.",
};

export default function TermsConditionsPage() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-navy">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-navy/50">Last updated: 2026</p>

          {/* TODO: have legal counsel review before publishing */}
          <div className="mt-10 space-y-10 text-navy/70 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-navy">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3">
                By accessing or using the Futurex Trade Fair and Events
                Private Limited (&quot;Futurex&quot;) website, or by registering for,
                exhibiting at, sponsoring or attending any Futurex
                exhibition, conference or corporate event, you agree to be
                bound by these Terms &amp; Conditions. If you do not agree
                with any part of these terms, please do not use our website
                or services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                2. Use of Website
              </h2>
              <p className="mt-3">
                This website and its content are provided for general
                informational purposes related to Futurex exhibitions,
                conferences, corporate events and related services. You
                agree to use this website only for lawful purposes and in a
                manner that does not infringe the rights of, or restrict the
                use of, this website by any third party.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                3. Event Participation Terms
              </h2>
              <p className="mt-3">
                Participation as an exhibitor, sponsor, delegate or visitor
                at any Futurex event is subject to specific registration
                terms, stall or sponsorship agreements, payment schedules
                and event guidelines communicated separately at the time of
                booking. Futurex reserves the right to accept or decline
                any registration at its discretion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                4. Enquiries and Bookings
              </h2>
              <p className="mt-3">
                Submitting an enquiry, stall booking request, sponsorship
                request or registration through this website does not
                constitute a confirmed booking. All bookings are subject to
                availability, applicable terms and written confirmation from
                Futurex.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                5. Intellectual Property
              </h2>
              <p className="mt-3">
                All content on this website, including text, graphics,
                logos and images, is the property of Futurex or its licensors
                and is protected by applicable intellectual property laws.
                Content may not be reproduced, distributed or used without
                prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                6. Third-Party Links
              </h2>
              <p className="mt-3">
                Our website may contain links to third-party websites for
                convenience and reference. Futurex does not endorse and is
                not responsible for the content, accuracy or practices of
                any linked third-party website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                7. Limitation of Liability
              </h2>
              <p className="mt-3">
                Futurex makes reasonable efforts to ensure information on
                this website is accurate and up to date, but makes no
                warranties of any kind regarding completeness or accuracy.
                To the extent permitted by law, Futurex shall not be liable
                for any indirect, incidental or consequential loss or damage
                arising from the use of this website or participation in any
                Futurex event.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                8. Cancellations and Changes
              </h2>
              <p className="mt-3">
                Futurex reserves the right to modify event dates, venues,
                formats or content, or to cancel or postpone any event, due
                to circumstances beyond its reasonable control. Specific
                cancellation and refund terms applicable to bookings will be
                communicated as part of the relevant registration or booking
                agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                9. Governing Law
              </h2>
              <p className="mt-3">
                These Terms &amp; Conditions are governed by and construed in
                accordance with the laws of India, and any disputes arising
                from them shall be subject to the exclusive jurisdiction of
                the courts of New Delhi, India.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                10. Contact Us
              </h2>
              <p className="mt-3">
                For any questions regarding these Terms &amp; Conditions,
                please contact us at{" "}
                <a href={`mailto:${CONTACT.email}`} className="font-semibold text-cherry">
                  {CONTACT.email}
                </a>{" "}
                or {CONTACT.phone.display}.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
