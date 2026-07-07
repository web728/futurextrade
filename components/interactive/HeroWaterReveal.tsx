"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";

type RGB = [number, number, number];

type TrailPoint = {
  x: number;
  y: number;
  born: number;
  radius: number;
  squash: number;
  angle: number;
};

const MAX_AGE = 900; // ms a single ripple blob stays visible
const MIN_SPACING = 14; // px between trail points so fast swipes still read as a continuous streak

/**
 * Full-bleed water-reveal effect for the hero background.
 *
 * Instead of a single circle painted at the live cursor position, the
 * pointer's recent path is kept as a short-lived trail of soft, irregular
 * blobs (varied size/squash/rotation) that punch through an ink mask via
 * `destination-out`. Each blob grows slightly then fades over ~900ms, so
 * moving the mouse leaves a flowing ripple behind it rather than a dot that
 * jumps from frame to frame. A subtle animated SVG turbulence/displacement
 * filter is applied to the whole layer so the revealed image itself
 * shimmers a little, like light through moving water, rather than showing
 * a hard-edged cutout.
 *
 * Disabled entirely when `active` is false (e.g. touch devices or reduced
 * motion) — only the plain, dimmed image renders underneath.
 */
export function HeroWaterReveal({
  src,
  alt = "",
  active,
  maskColor = [8, 14, 28],
  brushSize = 150,
  fadeSpeed = 0.05,
}: {
  src: string;
  alt?: string;
  active: boolean;
  maskColor?: RGB;
  brushSize?: number;
  fadeSpeed?: number;
}) {
  const filterId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const lastPointRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${maskColor.join(",")})`;
      ctx.fillRect(0, 0, width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    const addPoint = (x: number, y: number) => {
      trailRef.current.push({
        x,
        y,
        born: performance.now(),
        radius: brushSize * (0.75 + Math.random() * 0.5),
        squash: 0.65 + Math.random() * 0.5,
        angle: Math.random() * Math.PI,
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const last = lastPointRef.current;
      const dist = Math.hypot(x - last.x, y - last.y);

      // Interpolate between the last recorded point and this one so fast
      // swipes leave a continuous streak instead of sparse, jumpy dots.
      const steps = Math.min(Math.floor(dist / MIN_SPACING), 12);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        addPoint(last.x + (x - last.x) * t, last.y + (y - last.y) * t);
      }
      if (steps === 0 && dist > 0) addPoint(x, y);

      lastPointRef.current = { x, y };
    };

    container.addEventListener("pointermove", onPointerMove);

    const tick = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(${maskColor.join(",")}, ${fadeSpeed})`;
      ctx.fillRect(0, 0, width, height);

      const now = performance.now();
      ctx.globalCompositeOperation = "destination-out";
      trailRef.current = trailRef.current.filter((p) => now - p.born < MAX_AGE);

      for (const p of trailRef.current) {
        const t = (now - p.born) / MAX_AGE;
        // Ripple grows slightly then eases, and its opacity fades over life.
        const growth = 1 + 0.25 * Math.sin(t * Math.PI);
        const radius = p.radius * growth;
        const alpha = 1 - t;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, p.squash);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        gradient.addColorStop(0, `rgba(0,0,0,${alpha})`);
        gradient.addColorStop(0.6, `rgba(0,0,0,${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
    };
  }, [active, maskColor, brushSize, fadeSpeed]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Hidden SVG filter: gentle animated turbulence + displacement so the
          revealed layer shimmers subtly like a water surface, rather than
          showing a perfectly flat cutout. */}
      {active && (
        <svg className="absolute h-0 w-0" aria-hidden>
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.008 0.014"
                numOctaves="2"
                seed="7"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="22s"
                  values="0.008 0.014;0.013 0.02;0.008 0.014"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="14"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <div
        className="absolute inset-0"
        style={active ? { filter: `url(#${filterId})` } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {active ? (
          <canvas ref={canvasRef} className="absolute inset-0" />
        ) : (
          <div className="absolute inset-0 bg-navy/80" />
        )}
      </div>
    </div>
  );
}