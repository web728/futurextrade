"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HoverLiftCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const tiltEnabled = !isMobile && !reducedMotion;

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(240px circle at ${gx}% ${gy}%, rgba(227,37,38,0.12), transparent 70%)`,
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateYRaw.set((px - 0.5) * 8);
    rotateXRaw.set((0.5 - py) * 8);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={cn(
        "group relative rounded-2xl border border-navy/12 bg-white p-6 shadow-[0_1px_2px_rgba(15,20,45,0.04)] transition-all duration-300 hover:border-cherry/20 hover:shadow-[0_24px_48px_-16px_rgba(35,48,103,0.22)]",
        className,
      )}
    >
      {tiltEnabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
      )}
      <span className="absolute left-6 top-0 h-0.5 w-8 bg-cherry transition-all duration-300 group-hover:w-16" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
