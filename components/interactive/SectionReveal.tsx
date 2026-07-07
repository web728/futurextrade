"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
  viewportOnce,
} from "@/lib/animation";

type Variant = "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight";

const VARIANTS = { fadeUp, fadeIn, scaleIn, slideLeft, slideRight };

export function SectionReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={VARIANTS[variant]}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
