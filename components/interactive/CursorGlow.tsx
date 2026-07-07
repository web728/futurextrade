"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 25 });
  const springY = useSpring(y, { stiffness: 120, damping: 25 });

  useEffect(() => {
    if (isMobile || reducedMotion) return;
    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile, reducedMotion, x, y]);

  if (isMobile || reducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] size-[420px] rounded-full mix-blend-multiply"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(227,37,38,0.06) 0%, rgba(35,48,103,0.04) 45%, transparent 70%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    />
  );
}
