"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";

export function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  
  // Track hover state to prevent loop override clashes
  const isHovered = useRef(false);

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
    
    // FIX 1: Changed "rotate" to "rotation" to eliminate the rapid console warnings
    const setRotation = gsap.quickTo(cursor, "rotation", { duration: 0.15, ease: "power2.out" });
    
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

      // Deploy accelerated positional transformation variables
      setX(pos.x);
      setY(pos.y);

      // Only calculate and apply stretch/rotation if not hovering an element
      // This prevents the loop from overriding your clean scale hover effect
      if (!isHovered.current) {
        const velocity = Math.min(Math.sqrt(dx * dx + dy * dy), 150);
        
        // Calculate dynamic stretch scalar factors
        const stretch = 1 + velocity * 0.004;
        const squeeze = 1 - velocity * 0.002;

        // Compute precise motion rotation angle (in degrees)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        setRotation(angle);
        setScaleX(stretch);
        setScaleY(squeeze);
      }
    };

    gsap.ticker.add(updateCursorLoop);

    // Global Hover Classes tracking listeners
  const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest("a") || target.closest("button") || target.classList.contains("clickable")) {
    isHovered.current = true;

    // Use the SAME quickTo setters the ticker uses for these props,
    // instead of a separate gsap.to() — this stops the transform
    // cache index from being invalidated every frame.
    setScaleX(2.2);
    setScaleY(2.2);
    setRotation(0); // Reset tilt on hover for readability

    // Colors aren't transform props, so tween them separately.
    gsap.to(cursor, {
      backgroundColor: "rgba(227,37,38,0.12)",
      borderColor: "#e32526",
      duration: 0.25,
      overwrite: "auto",
    });
  }
};

const handleMouseOut = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest("a") || target.closest("button") || target.classList.contains("clickable")) {
    isHovered.current = false;

    setScaleX(1);
    setScaleY(1);

    gsap.to(cursor, {
      backgroundColor: "transparent",
      borderColor: "rgba(227, 37, 38, 0.75)",
      duration: 0.25,
      overwrite: "auto",
    });
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