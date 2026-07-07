// SINGLE SOURCE OF TRUTH — industries served, used on the Industries grid + detail pages.
// `icon` is a lucide-react icon name, mapped to a component in the icon map
// (see components/sections/IndustriesGridSection.tsx) — kept as a string here so
// this data file has no framework/UI dependency.

export type Industry = {
  slug: string;
  name: string;
  icon:
    | "Building2"
    | "Construction"
    | "Mountain"
    | "Wheat"
    | "TreePine"
    | "Package"
    | "Recycle"
    | "Zap"
    | "Plug"
    | "Pill"
    | "HeartPulse"
    | "GraduationCap"
    | "UtensilsCrossed"
    | "Cog"
    | "Fan"
    | "Shirt";
};

export const INDUSTRIES: Industry[] = [
  { slug: "building-construction", name: "Building & Construction", icon: "Building2" },
  { slug: "infrastructure", name: "Infrastructure", icon: "Construction" },
  { slug: "mining", name: "Mining", icon: "Mountain" },
  { slug: "agriculture", name: "Agriculture", icon: "Wheat" },
  { slug: "wood-woodworking", name: "Wood & Woodworking", icon: "TreePine" },
  { slug: "printing-packaging", name: "Printing & Packaging", icon: "Package" },
  { slug: "plastics", name: "Plastics", icon: "Recycle" },
  { slug: "electric-vehicles", name: "Electric Vehicles", icon: "Zap" },
  { slug: "power-energy", name: "Power & Energy", icon: "Plug" },
  { slug: "pharmaceuticals", name: "Pharmaceuticals", icon: "Pill" },
  { slug: "healthcare", name: "Healthcare", icon: "HeartPulse" },
  { slug: "education", name: "Education", icon: "GraduationCap" },
  { slug: "food-hospitality", name: "Food & Hospitality", icon: "UtensilsCrossed" },
  { slug: "industrial-machinery", name: "Industrial Machinery", icon: "Cog" },
  { slug: "home-appliances", name: "Home Appliances", icon: "Fan" },
  { slug: "garments-textiles", name: "Garments & Textiles", icon: "Shirt" },
];
