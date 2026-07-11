"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";

export function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial structural styling state to avoid sudden snap layouts
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // Initialize ultra-fast, high-performance setter tracking targets
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const setX = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });
    const setRotation = gsap.quickTo(cursor, "rotate", { duration: 0.15, ease: "power2.out" });
    const setScaleX = gsap.quickTo(cursor, "scaleX", { duration: 0.15, ease: "power2.out" });
    const setScaleY = gsap.quickTo(cursor, "scaleY", { duration: 0.15, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // High performance frame rendering loop hook
    const updateCursorLoop = () => {
      // Calculate directional distance velocity vectors
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      
      // Update intermediate follow positions using interpolation
      pos.x += dx * 0.25;
      pos.y += dy * 0.25;

      // Map raw distance to acceleration magnitude
      const velocity = Math.min(Math.sqrt(dx * dx + dy * dy), 150);
      
      // Calculate dynamic stretch scalar factors ($scale \ge 1.0$)
      const stretch = 1 + velocity * 0.004;
      const squeeze = 1 - velocity * 0.002;

      // Compute precise motion rotation angle (in degrees)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Deploy accelerated transformation variables
      setX(pos.x);
      setY(pos.y);
      setRotation(angle);
      setScaleX(stretch);
      setScaleY(squeeze);
    };

    gsap.ticker.add(updateCursorLoop);

    // Global Hover Classes tracking listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Triggers scale modifications when interacting with links or buttons
      if (target.closest("a") || target.closest("button") || target.classList.contains("clickable")) {
        gsap.to(cursor, { scale: 2.2, backgroundColor: "rgba(227,37,38,0.12)", borderColor: "#e32526", duration: 0.25 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.classList.contains("clickable")) {
        gsap.to(cursor, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(227, 37, 38, 0.75)", duration: 0.25 });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(updateCursorLoop);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 size-5 rounded-full border-2 border-cherry/75 bg-transparent pointer-events-none z-[9999] will-change-transform mix-blend-screen hidden lg:block"
    />
  );
}