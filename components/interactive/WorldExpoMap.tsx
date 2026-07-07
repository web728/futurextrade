"use client";

import { useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldTopology from "world-atlas/countries-110m.json";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EXPO_COUNTRIES, EXPO_HUB, type ExpoCountry } from "@/lib/constants/expoCountries";

const WIDTH = 720;
const HEIGHT = 420;
const PAD = 18;

const HIGHLIGHT_IDS = new Set(EXPO_COUNTRIES.map((c) => c.id));

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export function WorldExpoMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(EXPO_HUB.id);

  const { worldFeatures, highlightFeatures, projection, graticule, sphereOutline } = useMemo(() => {
    const topology = worldTopology as unknown as Topology;
    const countries = topology.objects.countries as GeometryCollection;
    const collection = feature(topology, countries);
    const allFeatures = "features" in collection ? collection.features : [collection];
    const highlighted = allFeatures.filter((f) => HIGHLIGHT_IDS.has(String(f.id)));

    // Fit to the whole globe (not just the marker points) so no country —
    // India included — ever gets cropped by the SVG frame.
    const proj = geoEqualEarth().fitExtent(
      [
        [PAD, PAD],
        [WIDTH - PAD, HEIGHT - PAD],
      ],
      { type: "Sphere" },
    );

    return {
      worldFeatures: allFeatures,
      highlightFeatures: highlighted,
      projection: proj,
      graticule: geoGraticule10(),
      sphereOutline: { type: "Sphere" as const },
    };
  }, []);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  const hubPoint = projection(EXPO_HUB.coordinates) ?? [0, 0];
  const links = EXPO_COUNTRIES.filter((c) => c.id !== EXPO_HUB.id).map((country) => {
    const point = projection(country.coordinates) ?? [0, 0];
    return { country, x: point[0], y: point[1] };
  });

  useGSAP(
    () => {
      if (reducedMotion || !svgRef.current) return;
      const arcs = svgRef.current.querySelectorAll<SVGPathElement>(".expo-arc");
      const markers = svgRef.current.querySelectorAll<SVGGElement>(".expo-marker");

      arcs.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(markers, { opacity: 0, scale: 0.5, transformOrigin: "center" });

      ScrollTrigger.create({
        trigger: svgRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(arcs, {
            strokeDashoffset: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power2.out",
          });
          gsap.to(markers, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.15,
            ease: "back.out(1.7)",
          });
        },
      });
    },
    { scope: svgRef, dependencies: [reducedMotion] },
  );

  const activeCountry: ExpoCountry =
    EXPO_COUNTRIES.find((c) => c.id === activeId) ?? EXPO_HUB;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="glass-panel rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto w-full"
          role="img"
          aria-label="Map of countries where Futurex runs exhibitions: India, Nepal, Bangladesh, Sri Lanka, Bhutan, Kenya and Uganda"
        >
          <path d={pathGenerator(sphereOutline) ?? undefined} fill="#f4f6fb" stroke="#233067" strokeOpacity={0.15} />
          <path
            d={pathGenerator(graticule) ?? undefined}
            fill="none"
            stroke="#233067"
            strokeOpacity={0.08}
            strokeWidth={0.5}
          />

          <g className="opacity-[0.16]">
            {worldFeatures.map((f, i) => (
              <path key={i} d={pathGenerator(f) ?? undefined} fill="#233067" stroke="#ffffff" strokeWidth={0.4} />
            ))}
          </g>

          <g>
            {highlightFeatures.map((f) => {
              const id = String(f.id);
              const isActive = id === activeId;
              return (
                <path
                  key={id}
                  d={pathGenerator(f) ?? undefined}
                  className="cursor-pointer transition-colors duration-300"
                  fill={isActive ? "#e32526" : "#233067"}
                  fillOpacity={isActive ? 0.85 : id === EXPO_HUB.id ? 0.55 : 0.3}
                  stroke="#ffffff"
                  strokeWidth={1}
                  onMouseEnter={() => setActiveId(id)}
                  onFocus={() => setActiveId(id)}
                  tabIndex={0}
                  role="button"
                  aria-label={
                    EXPO_COUNTRIES.find((c) => c.id === id)?.name ?? "Country"
                  }
                />
              );
            })}
          </g>

          <g aria-hidden>
            {links.map(({ country, x, y }) => (
              <path
                key={country.id}
                className="expo-arc"
                d={curvePath(hubPoint[0], hubPoint[1], x, y)}
                fill="none"
                stroke="url(#expo-gradient)"
                strokeWidth={1.5}
                strokeLinecap="round"
                opacity={0.7}
              />
            ))}
          </g>

          <defs>
            <linearGradient id="expo-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e32526" />
              <stop offset="100%" stopColor="#233067" />
            </linearGradient>
          </defs>

          {links.map(({ country, x, y }, i) => {
            const isActive = activeId === country.id;
            return (
              <g
                key={country.id}
                className="expo-marker cursor-pointer"
                onMouseEnter={() => setActiveId(country.id)}
                onMouseLeave={() => setActiveId(EXPO_HUB.id)}
                onFocus={() => setActiveId(country.id)}
              >
                {!reducedMotion && (
                  <circle cx={x} cy={y} r={4} fill="none" stroke="#e32526" strokeWidth={1.2}>
                    <animate
                      attributeName="r"
                      values="4;11;4"
                      dur="2.6s"
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 5.5 : 4}
                  fill="#e32526"
                  stroke="#ffffff"
                  strokeWidth={1.2}
                  className="transition-all duration-300"
                />
                {isActive && (
                  <g className="pointer-events-none" style={{ transition: "opacity 0.2s" }}>
                    <rect
                      x={x - country.name.length * 3.4 - 6}
                      y={y - 28}
                      width={country.name.length * 6.8 + 12}
                      height={16}
                      rx={8}
                      fill="#233067"
                    />
                    <text
                      x={x}
                      y={y - 17}
                      textAnchor="middle"
                      className="fill-white text-[10px] font-semibold"
                    >
                      {country.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <g
            className="expo-marker cursor-pointer"
            onMouseEnter={() => setActiveId(EXPO_HUB.id)}
            onFocus={() => setActiveId(EXPO_HUB.id)}
          >
            {!reducedMotion && (
              <circle cx={hubPoint[0]} cy={hubPoint[1]} r={6} fill="none" stroke="#233067" strokeWidth={1.2}>
                <animate attributeName="r" values="6;14;6" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={hubPoint[0]}
              cy={hubPoint[1]}
              r={activeId === EXPO_HUB.id ? 7.5 : 6}
              fill="#233067"
              stroke="#ffffff"
              strokeWidth={1.5}
              className="transition-all duration-300"
            />
            <text
              x={hubPoint[0]}
              y={hubPoint[1] + 22}
              textAnchor="middle"
              className="fill-navy text-xs font-bold"
            >
              India (HQ)
            </text>
          </g>
        </svg>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-cherry">
          Where We Run Expos
        </p>
        <div className="mt-4 min-h-32 rounded-2xl border border-navy/10 bg-surface p-6">
          <p className="text-lg font-bold text-navy">{activeCountry.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-navy/65">
            {activeCountry.summary}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {EXPO_COUNTRIES.map((country) => (
            <button
              key={country.id}
              type="button"
              onMouseEnter={() => setActiveId(country.id)}
              onFocus={() => setActiveId(country.id)}
              onClick={() => setActiveId(country.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                activeId === country.id
                  ? "border-cherry bg-cherry text-white shadow-[0_0_16px_rgba(227,37,38,0.35)]"
                  : "border-navy/15 text-navy/70 hover:border-cherry/40 hover:text-navy"
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
