"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { GALLERY_ITEMS } from "@/lib/constants/gallery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap, useGSAP } from "@/lib/gsap";

const MARQUEE_WORDS = [
  "Exhibitions",
  "Conferences",
  "Corporate Events",
  "Business Networking",
];

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Subtle 3D tilt that follows the cursor within a tile — disabled on
// touch devices and when the user prefers reduced motion.
function useTilt(disabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

function GalleryTile({
  item,
  index,
  className,
  disableTilt,
}: {
  item: (typeof GALLERY_ITEMS)[number];
  index: number;
  className?: string;
  disableTilt: boolean;
}) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(disableTilt);

  return (
    <motion.div
      variants={tileVariants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-2xl ring-1 ring-navy/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy/20 ${className ?? ""}`}
    >
      <GalleryImage
        src={item.src}
        alt={item.alt}
        className="transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-cherry/50 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="absolute left-4 top-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/60">
        {String(index).padStart(2, "0")}
      </span>

      <span className="absolute right-4 top-4 flex size-8 -translate-y-2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-cherry" />
          {item.category}
        </p>
        <p className="mt-2 text-sm font-semibold text-white sm:text-base">
          {item.moment}
        </p>
        <p className="text-xs text-white/60">{item.year}</p>
      </div>

      {/* Compact always-visible caption for touch devices, where there's
          no hover state to reveal the fuller caption above. Hidden on
          desktop (sm and up) so it doesn't duplicate the hover caption. */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-3 sm:hidden">
        <p className="truncate text-xs font-semibold text-white">{item.moment}</p>
        <p className="text-[10px] text-white/70">{item.year}</p>
      </div>
    </motion.div>
  );
}

export function GalleryPreviewSection() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableTilt = isMobile || reducedMotion;

  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredImageRef = useRef<HTMLDivElement>(null);

  // Gentle scroll parallax on the featured image only — the image sits in
  // a slightly oversized wrapper so the vertical drift never exposes an
  // edge.
  useGSAP(
    () => {
      if (reducedMotion) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(featuredImageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: featuredRef, dependencies: [reducedMotion] },
  );

  const [featured, ...rest] = GALLERY_ITEMS;
  const supporting = rest.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-surface py-24">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
            Gallery
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Moments That Move Markets
          </h2>
          <p className="mt-4 text-navy/60">
            Explore the energy, scale and business impact of Futurex exhibitions,
            conferences and industry gatherings.
          </p>
        </SectionReveal>

        <SectionReveal className="mt-10">
          <div className="relative overflow-hidden border-y border-navy/10 py-3">
            <div className="marquee-track flex w-max gap-8 text-sm font-semibold uppercase tracking-[0.3em] text-navy/30">
              {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
                <span key={`${word}-${i}`} className="flex items-center gap-8">
                  {word}
                  <span className="text-cherry/50">•</span>
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-4 md:grid-cols-2"
        >
          <div
            ref={featuredRef}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-auto md:h-full"
          >
            <motion.div variants={tileVariants} className="group relative h-full w-full">
              <div ref={featuredImageRef} className="absolute inset-0 -top-[5%] h-[110%]">
                <GalleryImage
                  src={featured.src}
                  alt={featured.alt}
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-cherry/50 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute right-5 top-5 flex size-9 -translate-y-2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="size-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                  <span className="size-1.5 rounded-full bg-cherry" />
                  {featured.category}
                </p>
                <p className="mt-2 text-lg font-bold text-white sm:mt-3 sm:text-2xl">
                  {featured.moment}
                </p>
                <p className="text-xs text-white/60 sm:text-sm">{featured.year}</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {supporting.map((item, i) => (
              <GalleryTile
                key={item.id}
                item={item}
                index={i + 2}
                disableTilt={disableTilt}
                className="aspect-square"
              />
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <MagneticButton>
            <MotionCTAButton href="/gallery" variant="outline">
              <span className="inline-flex items-center gap-2">
                View Gallery
              </span>
            </MotionCTAButton>
          </MagneticButton>
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: gallery-marquee 28s linear infinite;
        }
        @keyframes gallery-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}