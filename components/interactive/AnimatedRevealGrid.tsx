"use client";

import { Children } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animation";


export function AnimatedRevealGrid({
  children,
  className,
  animateLayout = false,
  masonry = false,
}: {
  children: ReactNode;
  className?: string;
  animateLayout?: boolean;
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
