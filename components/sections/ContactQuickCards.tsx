import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { CONTACT } from "@/lib/constants/company";

export function ContactQuickCards() {
  const cards = [
    {
      icon: MapPin,
      label: "Our Address",
      value: CONTACT.address.full,
    },
    {
      icon: Mail,
      label: "Email Us",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: Phone,
      label: "Call Us",
      value: CONTACT.phone.display,
      href: CONTACT.phone.href,
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: CONTACT.hours,
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry accent-line">
            Get In Touch
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Reach Us Directly
          </h2>
        </SectionReveal>

        <AnimatedRevealGrid className="mt-14 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            const content = (
              <HoverLiftCard className="h-full text-center">
                <span className="icon-badge mx-auto">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-navy">
                  {card.label}
                </h3>
                <p className="mt-2 text-sm text-navy/60">{card.value}</p>
              </HoverLiftCard>
            );
            return (
              <div key={card.label} className="h-full">
                {card.href ? (
                  <a href={card.href} className="block h-full">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </AnimatedRevealGrid>
      </div>
    </section>
  );
}
