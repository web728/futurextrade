"use client";

import { Children } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animation";

/**
 * Wraps pre-rendered children (each with a stable `key`) in a staggered
 * scroll-reveal (default) or AnimatePresence layout grid (`animateLayout`,
 * for filterable listings). Accepting children instead of a render-prop
 * keeps callers as server components — passing functions across the
 * server/client boundary is not allowed in the App Router.
 */
export function AnimatedRevealGrid({
  children,
  className,
  animateLayout = false,
  masonry = false,
}: {
  children: ReactNode;
  className?: string;
  animateLayout?: boolean;
  /** Set when className supplies its own CSS `columns-*` masonry layout —
   * skips the default `display: grid`, which would otherwise silently
   * cancel multi-column layout and collapse every item into one full-width
   * column. */
  masonry?: boolean;
}) {
  const items = Children.toArray(children);
  const layoutClassName = masonry ? className : cn("grid", className);

  if (animateLayout) {
    return (
      <motion.div layout className={layoutClassName}>
        <AnimatePresence mode="popLayout">
          {items.map((child) => (
            <motion.div
              key={(child as { key: string | null }).key}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              {child}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={layoutClassName}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer()}
    >
      {items.map((child) => (
        <motion.div key={(child as { key: string | null }).key} variants={staggerItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
