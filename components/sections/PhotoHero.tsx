import Image from "next/image";
import type { ReactNode } from "react";
import { SectionReveal } from "@/components/interactive/SectionReveal";

/**
 * Shared hero treatment for inner listing pages — a real Futurex event photo
 * behind a dark scrim, instead of a flat color/gradient block. Gives pages an
 * authentic "live event" feel rather than an abstract corporate backdrop.
 */
export function PhotoHero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-grain relative overflow-hidden bg-ink py-28 text-white">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="photo-hero-scrim absolute inset-0" />
      <div className="absolute inset-0 bg-grid-lines-dark opacity-50" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionReveal>
          <p className="eyebrow-pill mx-auto">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">{subtitle}</p>
          {children}
        </SectionReveal>
      </div>
    </section>
  );
}
