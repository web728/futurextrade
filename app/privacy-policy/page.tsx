import type { Metadata } from "next";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { CONTACT } from "@/lib/constants/company";

export const metadata: Metadata = {
  title: "Privacy Policy | Futurex Trade Fair and Events",
  description:
    "Read the Privacy Policy of Futurex Trade Fair and Events Private Limited covering data collection, cookies, third-party links and information use.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-navy">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-navy/50">Last updated: 2026</p>

          {/* TODO: have legal counsel review before publishing */}
          <div className="mt-10 space-y-10 text-navy/70 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-navy">1. Introduction</h2>
              <p className="mt-3">
                Futurex Trade Fair and Events Private Limited (&quot;Futurex&quot;,
                &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) respects your privacy and is
                committed to protecting the personal information you share
                with us through our website, enquiry forms, exhibitions,
                conferences and corporate events. This Privacy Policy
                explains what information we collect, how we use it and the
                choices available to you.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                2. Information We Collect
              </h2>
              <p className="mt-3">
                We may collect personal information such as your name,
                company name, email address, phone number and enquiry
                details when you submit an enquiry form, register as a
                visitor, book a stall, apply for sponsorship or otherwise
                contact us. We may also collect non-personal information
                such as browser type, device information and pages visited
                through standard website analytics.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                3. How We Use Your Information
              </h2>
              <p className="mt-3">
                Information collected through our enquiry forms and website
                is used to respond to your enquiry, provide information
                about our exhibitions, conferences and events, process stall
                bookings, sponsorships and partnerships, and improve our
                services and website experience. We do not sell your
                personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">4. Cookies</h2>
              <p className="mt-3">
                Our website may use cookies and similar technologies to
                improve functionality, understand usage patterns and enhance
                your browsing experience. You can control or disable cookies
                through your browser settings, though some parts of the
                website may not function as intended if cookies are
                disabled.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                5. Third-Party Links
              </h2>
              <p className="mt-3">
                Our website may contain links to third-party websites,
                including partner organizations, associations and social
                media platforms. Futurex is not responsible for the privacy
                practices or content of these third-party websites. We
                encourage you to review the privacy policies of any external
                site you visit.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                6. Event Participation Information
              </h2>
              <p className="mt-3">
                When you participate in a Futurex exhibition, conference or
                corporate event as an exhibitor, visitor, delegate or
                sponsor, certain information may be shared with event
                partners, venue operators or co-organizers strictly for the
                purpose of facilitating your participation and the smooth
                conduct of the event.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                7. Data Security
              </h2>
              <p className="mt-3">
                We take reasonable technical and organizational measures to
                protect the personal information we hold from unauthorized
                access, alteration, disclosure or destruction. However, no
                method of transmission over the internet is completely
                secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                8. Your Choices
              </h2>
              <p className="mt-3">
                You may contact us at any time to request access to,
                correction of, or deletion of your personal information held
                by us, subject to applicable law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                9. Changes to This Policy
              </h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time to
                reflect changes in our practices or for legal, operational
                or regulatory reasons. Any updates will be posted on this
                page with a revised date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                10. Governing Law
              </h2>
              <p className="mt-3">
                This Privacy Policy is governed by and construed in
                accordance with the laws of India.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">
                11. Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
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
