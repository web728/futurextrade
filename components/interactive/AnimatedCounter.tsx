"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AnimatedCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();

  const numericMatch = value.match(/[\d,]+/);
  const numericValue = numericMatch
    ? Number(numericMatch[0].replace(/,/g, ""))
    : 0;
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : "";
  const suffix = numericMatch
    ? value.slice((numericMatch.index ?? 0) + numericMatch[0].length)
    : value;

  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!isInView || !numericMatch || !ref.current) return;

    if (reducedMotion) {
      ref.current.textContent = `${prefix}${numericValue.toLocaleString("en-US")}${suffix}`;
      return;
    }

    const controls = animate(motionValue, numericValue, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString("en-US")}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, numericMatch, numericValue, prefix, suffix, reducedMotion, motionValue]);

  if (!numericMatch) {
    return (
      <span className={className} ref={ref}>
        {value}
      </span>
    );
  }

  return (
    <motion.span className={className} ref={ref}>
      {prefix}0{suffix}
    </motion.span>
  );
}
