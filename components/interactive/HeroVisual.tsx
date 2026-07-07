"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { CalendarCheck2, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/interactive/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Homepage hero visual — a layered real-photo showcase. Tilts gently toward
 * the pointer on desktop (decorative spring, disabled under reduced motion);
 * on mobile it sits still with just the entrance animation.
 */
export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 140,
    damping: 18,
  });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="relative size-full"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <Image
          src="/images/gallery/exhibitions/india-international-ev-show-2.webp"
          alt="Exhibitors and visitors at a Futurex international exhibition"
          fill
          priority
          sizes="(min-width: 1024px) 480px, 90vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/15 to-transparent" />
        <div className="absolute inset-0 bg-grid-lines-dark opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16, y: 16 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-6 -left-6 aspect-[4/3] w-2/5 overflow-hidden rounded-2xl border-2 border-cherry shadow-premium"
      >
        <Image
          src="/images/gallery/exhibitions/nepal-buildcon-international-expo-2.webp"
          alt="Business networking at a Futurex trade fair"
          fill
          sizes="200px"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="glass-panel absolute -top-5 -right-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-premium"
      >
        <span className="icon-badge-dark">
          <CalendarCheck2 className="size-5" />
        </span>
        <div>
          <AnimatedCounter value="220+" className="block text-lg font-extrabold text-white" />
          <p className="text-[11px] uppercase tracking-wide text-white/60">
            Exhibitions Delivered
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="glass-panel absolute bottom-6 -right-6 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-premium"
      >
        <span className="icon-badge-dark">
          <Users className="size-5" />
        </span>
        <div>
          <AnimatedCounter value="950,000+" className="block text-lg font-extrabold text-white" />
          <p className="text-[11px] uppercase tracking-wide text-white/60">
            Business Visitors
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
