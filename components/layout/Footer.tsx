import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  COMPANY,
  COMPANY_PROFILE_PDF,
  CONTACT,
  FOOTER_COLUMNS,
  FOOTER_LEGAL_LINKS,
  SOCIAL_LINKS,
} from "@/lib/constants/company";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import Image from "next/image";

// lucide-react no longer ships brand/social logo icons, so social links use a
// clean initial-in-circle monogram instead of a mismatched generic icon.
const SOCIAL_INITIALS: Record<string, string> = {
  LinkedIn: "in",
  Facebook: "f",
  Instagram: "ig",
  YouTube: "yt",
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
        {title}
      </p>
      <ul className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group text-sm text-white/70 hover:text-white">
              <span className="border-b border-transparent group-hover:border-cherry">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-grid-lines-dark" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center">
          <div>
            <p className="accent-line text-xl font-bold">
              Ready to connect with the right audience?
            </p>
            <p className="mt-2 max-w-xl text-white/70">
              Exhibit, sponsor or partner with an event platform built for growth.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MotionCTAButton
              href={COMPANY_PROFILE_PDF}
              download="Futurex Group Company Profile.pdf"
              variant="outline"
              size="lg"
              icon={false}
              className="border-white text-white hover:bg-white hover:text-navy"
            >
              Download Company Profile
            </MotionCTAButton>
            <MotionCTAButton href="/contact" variant="primary" size="lg">
              Speak to Our Team
            </MotionCTAButton>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-6 lg:gap-10">
          <div className="md:col-span-2">
          <div className="relative h-12 w-48">
  <Image
      src="/logos/futurex-logo.png"
    alt="Futurex Logo"
    fill
    sizes="(max-width: 768px) 120px, 180px"
    className="object-contain object-left"
    priority
  />
</div>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              {COMPANY.legalName} is a professional exhibition and event management
              company creating B2B trade platforms, conferences, corporate events and
              promotional experiences for business growth.
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Stay Updated
              </p>
              <div className="mt-3">
                <FooterNewsletter />
              </div>
            </div>

            <div className="mt-6 flex gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-cherry hover:text-white hover:shadow-[0_0_16px_rgba(227,37,38,0.5)]"
                >
                  {SOCIAL_INITIALS[s.label]}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_COLUMNS.company} />
          <FooterColumn title="Events" links={FOOTER_COLUMNS.events} />
          <FooterColumn title="Participants" links={FOOTER_COLUMNS.participants} />

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-white/70">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cherry" />
                {CONTACT.address.full}
              </li>
              <li className="flex gap-2">
                <Phone className="size-4 shrink-0 text-cherry" />
                <a href={CONTACT.phone.href} className="hover:text-white">
                  {CONTACT.phone.display}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="size-4 shrink-0 text-cherry" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="mt-10 border-t border-white/10 pt-6">
          <FooterColumn title="Explore" links={FOOTER_COLUMNS.explore} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div> */}
      </div>
    </footer>
  );
}
