"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionReveal } from "@/components/interactive/SectionReveal";

const PANELS = [
  {
    eyebrow: "01",
    title: "Market Research",
    body: "We study industries, buyers and regions to find where real business demand exists.",
    image: "/images/gallery/futurex-industry-conference-1.webp",
  },
  {
    eyebrow: "02",
    title: "Industry Strategy",
    body: "Every platform starts with a clear strategy for the sector, audience and market it serves.",
    image: "/images/gallery/nepal-agritech-expo-2019.webp",
  },
  {
    eyebrow: "03",
    title: "Event Design",
    body: "We design the floor plan, format and experience around how that industry actually does business.",
    image: "/images/gallery/nepal-wood-expo-2019.webp",
  },
  {
    eyebrow: "04",
    title: "Exhibitor Acquisition",
    body: "We bring the right manufacturers, suppliers and brands onto the floor — not just any exhibitor.",
    image: "/images/gallery/bangladesh-wood-expo-2018.webp",
  },
  {
    eyebrow: "05",
    title: "Visitor Promotion",
    body: "Targeted outreach ensures the audience walking in is the audience exhibitors came to meet.",
    image: "/images/gallery/bhutan-buildcon-expo-2019.webp",
  },
  {
    eyebrow: "06",
    title: "On-ground Execution",
    body: "From setup to registration to floor management, disciplined execution keeps the event running.",
    image: "/images/gallery/bangladesh-buildcon-expo-2019.webp",
  },
  {
    eyebrow: "07",
    title: "Business Networking",
    body: "The floor becomes a live network — exhibitors, buyers and industry leaders connecting in real time.",
    image: "/images/gallery/futurex-industry-conference-2.webp",
  },
  {
    eyebrow: "08",
    title: "Post-event Growth",
    body: "We follow through with reporting and lead handover, turning floor conversations into pipeline.",
    image: "/images/gallery/nepal-buildcon-expo-2019.webp",
  },
];

const PIN_DISTANCE = `+=${PANELS.length * 75}%`;

export function GSAPPinnedShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const panels = panelRefs.current;
        if (!track) return;

        const setActive = (index: number) => {
          panels.forEach((panel, i) => {
            if (!panel) return;
            gsap.to(panel, {
              opacity: i === index ? 1 : 0.3,
              scale: i === index ? 1 : 0.94,
              duration: 0.4,
              overwrite: "auto",
            });
          });
          dotRefs.current.forEach((dot, i) => {
            dot?.classList.toggle("bg-cherry", i === index);
            dot?.classList.toggle("w-8", i === index);
            dot?.classList.toggle("bg-navy/20", i !== index);
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: PIN_DISTANCE,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              PANELS.length - 1,
              Math.round(self.progress * (PANELS.length - 1)),
            );
            setActive(index);
          },
        });

        gsap.to(track, {
          xPercent: -((PANELS.length - 1) / PANELS.length) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: PIN_DISTANCE,
            scrub: 1,
          },
        });

        setActive(0);

        return () => {
          trigger.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <>
      {/* Heading lives in its own normal-flow section, never absolutely
          overlaid on the pinned track below — that overlay previously sat
          mid-height and collided with panel titles once the track was pinned. */}
      <section className="bg-navy px-6 pb-16 pt-20 text-center text-white">
        <SectionReveal className="mx-auto max-w-2xl">
          <p className="eyebrow-pill mx-auto">The Futurex Process</p>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            From Market Insight to Exhibition Floor
          </h2>
        </SectionReveal>
      </section>

     <section ref={sectionRef} className="relative overflow-hidden bg-navy">
  {/* Background Grid */}
  <div className="absolute inset-0 bg-grid-lines-dark opacity-30" />

  <div className="relative max-w-7xl mx-auto px-6 py-20">

    {/* Responsive Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {PANELS.map((panel, i) => (
        <SectionReveal
          key={panel.title}
          variant="fadeUp"
          delay={i * 0.08}
        >
          <div
  className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
    backdrop-blur-sm
    min-h-[430px]
    p-8
    transition-all
    duration-700
    hover:-translate-y-3
    hover:border-cherry/40
    hover:shadow-[0_30px_80px_rgba(0,0,0,.45)]
  "
>

            {/* Background Image */}
           <Image
  src={panel.image}
  alt={panel.title}
  fill
  sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
  className="
    object-cover
    opacity-30
    scale-100
    transition-all
    duration-700
    ease-out
    group-hover:opacity-100
    group-hover:scale-110
  "
/>

<div className="absolute inset-0 overflow-hidden">

  {/* Main Gradient */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-t
      from-[#08131d]/95
      via-[#08131d]/55
      to-transparent
      transition-all
      duration-700
      group-hover:from-[#08131d]/45
      group-hover:via-[#08131d]/15
      group-hover:to-transparent
    "
  />

  {/* Water Glow */}
  <div
    className="
      absolute
      -bottom-36
      left-1/2
      h-[340px]
      w-[340px]
      -translate-x-1/2
      rounded-full
      bg-white/20
      blur-[120px]
      opacity-0
      transition-all
      duration-700
      group-hover:bottom-0
      group-hover:opacity-100
    "
  />

  {/* Animated Border */}
  <div
    className="
      absolute
      inset-0
      rounded-3xl
      border
      border-transparent
      transition-all
      duration-500
      group-hover:border-cherry/40
    "
  />

  {/* Shine */}
  <div
    className="
      absolute
      -left-full
      top-0
      h-full
      w-1/2
      rotate-12
      bg-gradient-to-r
      from-transparent
      via-white/40
      to-transparent
      transition-all
      duration-[1200ms]
      group-hover:left-[150%]
    "
  />

</div>

            {/* Overlay */}
            <div className="photo-hero-scrim absolute inset-0" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end">
           <span
className="
inline-block
text-sm
font-bold
tracking-[0.35em]
uppercase
text-cherry
transition-all
duration-500
group-hover:text-white
group-hover:tracking-[0.45em]
group-hover:scale-110
"
>
                {panel.eyebrow}
              </span>

            <h3
className="
mt-4
text-3xl
font-bold
text-white
transition-all
duration-500
group-hover:-translate-y-1
"
>
                {panel.title}
              </h3>

            <p
className="
mt-5
leading-7
text-white/65
transition-all
duration-500
group-hover:text-white
group-hover:-translate-y-1
"
>
                {panel.body}
              </p>

              <div
className="
mt-7
h-[3px]
w-12
rounded-full
bg-cherry
transition-all
duration-500
group-hover:w-28
"
/>
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
