"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { isEventUpcoming, type ExhibitionEvent } from "@/lib/constants/exhibitions";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const imageVariants = {
  rest: { scale: 1.04 },
  hover: { scale: 1.14 },
};

const overlayVariants = {
  rest: { opacity: 0.97 },
  hover: { opacity: 9 },
};

const detailGroupVariants = {
  rest: {},
  hover: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

const detailLineVariants = {
  rest: { opacity: 0.9, y: 0 },
  hover: { opacity: 1, y: -1 },
};

const stampVariants = {
  rest: { opacity: 0, scale: 0.55, rotate: -22 },
  hover: { opacity: 1, scale: 1, rotate: -11 },
};

const ctaVariants = {
  rest: { opacity: 0, height: 0, marginTop: 0 },
  hover: { opacity: 1, height: "auto", marginTop: 8 },
};

const ringVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

function getEditionNumber(edition?: string) {
  if (!edition) return null;
  const match = edition.match(/\d+/);
  return match ? match[0] : null;
}

export function ExhibitionCard({
  event,
  index = 0,
}: {
  event: ExhibitionEvent;
  index?: number;
}) {
  const upcoming = isEventUpcoming(event);
  const editionNumber = getEditionNumber(event.edition);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Pointer position, normalized to -0.5..0.5 across the card
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), springConfig);
  const glareX = useTransform(px, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(py, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.55), transparent 55%)`,
  );

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerEnter() {
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: smoothEase, delay: (index % 6) * 0.045 }}
      style={{ perspective: 1400 }}
      className="group"
    >
      <motion.div
        ref={cardRef}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={{ scale: 0.99 }}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative aspect-[1/1] w-full overflow-hidden rounded-2xl bg-navy ring-1 ring-navy/10"
      >
        {/* Lift + shadow on hover, plus a cherry hairline that appears at the edge */}
        <motion.div
          variants={{
            rest: { boxShadow: "0 1px 3px rgba(11,18,32,0.14)" },
            hover: {
              boxShadow:
                "0 34px 64px -20px rgba(11,18,32,0.55), 0 0 0 1px rgba(227,37,38,0.18)",
            },
          }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="absolute inset-0 rounded-2xl"
        />

        {/* Image — slow, weighty zoom, desaturated at rest, blooms to full colour on hover */}
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.9, ease: smoothEase }}
          className="absolute inset-0"
          style={{ transform: "translateZ(0)" }}
        >
          <Image
            src={event.heroImage ?? "/images/gallery/placeholder-exhibition.webp"}
            alt={event.name}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover grayscale-[30%] transition-[filter] duration-700 ease-out group-hover:grayscale-0"
          />
        </motion.div>

        {/* Gradient — deepens on hover so text stays legible */}
        <motion.div
          variants={overlayVariants}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/10"
        />

        {/* Pointer-tracked glare — the premium "glass" sheen */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{ opacity: glareOpacity, background: glareBackground }}
        />

        {/* Top row — industry tag + live status, lifted in 3D space */}
        <div
          className="absolute inset-x-3 top-3 flex items-start justify-between gap-2"
          style={{ transform: "translateZ(35px)" }}
        >
          <Badge
            variant="secondary"
            className="border-none bg-white/95 text-[10px] font-semibold uppercase tracking-wide text-navy backdrop-blur-sm"
          >
            {event.industry}
          </Badge>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm",
              upcoming ? "bg-cherry text-white" : "bg-white/15 text-white/70",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                upcoming ? "animate-pulse bg-white" : "bg-white/50",
              )}
            />
            {upcoming ? "Upcoming" : "Archived"}
          </span>
        </div>

        {/* Edition stamp — the one signature touch, reads like an ink dossier stamp */}
        {editionNumber && (
          <motion.div
            variants={stampVariants}
            transition={{ duration: 0.4, ease: smoothEase }}
            style={{ transform: "translateZ(55px)" }}
            className="absolute right-3 top-14 flex size-14 flex-col items-center justify-center rounded-full border-2 border-dashed border-cherry/70 bg-navy/50 text-cherry backdrop-blur-sm"
          >
            <span className="text-[8px] font-bold uppercase leading-none tracking-wider">
              Edition
            </span>
            <span className="font-mono text-lg font-bold leading-none">
              {editionNumber}
            </span>
          </motion.div>
        )}

        {/* Title + detail reveal — lifted the most, reads as "closest" to the viewer */}
        <div
          className="absolute inset-x-0 bottom-0 p-3.5"
          style={{ transform: "translateZ(50px)" }}
        >
          <motion.div variants={detailGroupVariants} className="space-y-1.5">
            <motion.h3
              variants={detailLineVariants}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="text-sm font-bold leading-snug text-white drop-shadow-sm"
            >
              {event.name}
            </motion.h3>

            <motion.span
              variants={detailLineVariants}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wide text-white/85"
            >
              <CalendarDays className="size-3.5 shrink-0 text-cherry" />
              {event.dates.display}
            </motion.span>
            <motion.span
              variants={detailLineVariants}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wide text-white/85"
            >
              <MapPin className="size-3.5 shrink-0 text-cherry" />
              {event.venue.city}
              {event.venue.country ? `, ${event.venue.country}` : ""}
            </motion.span>

            {/* CTA — slides open under the details on hover */}
            <motion.div
              variants={ctaVariants}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="overflow-hidden"
            >
              <Link
                href={`/exhibitions/${event.id}`}
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-cherry"
              >
                View dossier
                <ArrowUpRight className="size-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Cherry accent ring on hover */}
        <motion.div
          variants={ringVariants}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-cherry/40"
        />

        {/* Ticket-stub fold, top-left, static */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-8 w-8 rounded-tl-2xl bg-gradient-to-br from-cherry/20 to-transparent"
          style={{ transform: "translateZ(20px)" }}
        />
      </motion.div>
    </motion.div>
  );
}