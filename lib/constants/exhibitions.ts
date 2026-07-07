// SINGLE SOURCE OF TRUTH — exhibition listing + detail page data.
// Event names, dates and cities below were sourced from the live futurextrade.com
// exhibitions listing. Status (upcoming/past) is derived from the event end date at
// render time via isEventUpcoming/getUpcomingEvents — do not hardcode a status flag.

export type ExhibitionEvent = {
  slug: string;
  name: string;
  edition?: string;
  dates: { display: string; start: string; end: string };
  venue: { city: string; country: string; venueName?: string };
  industry: string;
  eventType: "Exhibition";
  heroImage?: string;
  description: string;
};

export const EXHIBITIONS: ExhibitionEvent[] = [
  {
    slug: "odisha-mining-infrastructure-expo-2026",
    name: "Odisha Mining and Infrastructure International Expo",
    edition: "4th Edition",
    dates: { display: "8–11 January 2026", start: "2026-01-08", end: "2026-01-11" },
    venue: { city: "Bhubaneswar", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-1.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
    slug: "nepal-agritech-expo-2026",
    name: "Nepal Agritech International Expo",
    edition: "8th Edition",
    dates: { display: "16–18 January 2026", start: "2026-01-16", end: "2026-01-18" },
    venue: { city: "Bharatpur", country: "Nepal" },
    industry: "Agriculture",
    eventType: "Exhibition",
    heroImage: "/images/gallery/nepal-agritech-expo-2019.webp",
    description:
      "Nepal's dedicated agri-technology exhibition connecting farm equipment, agri-input and agri-tech brands with the region's growing agricultural sector.",
  },
  {
    slug: "nepal-buildcon-expo-2026",
    name: "Nepal Buildcon International Expo",
    edition: "11th Edition",
    dates: { display: "5–8 February 2026", start: "2026-02-05", end: "2026-02-08" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/images/gallery/nepal-buildcon-expo-2019.webp",
    description:
      "Nepal's leading construction and building materials exhibition, bringing manufacturers, suppliers and contractors together under one roof.",
  },
  {
    slug: "corru-pack-print-india-2026",
    name: "Corru Pack Print India",
    edition: "2nd Edition",
    dates: { display: "19–22 March 2026", start: "2026-03-19", end: "2026-03-22" },
    venue: { city: "Mumbai", country: "India" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/bangladesh-3p-expo-1.webp",
    description:
      "A specialized platform for the corrugation, packaging and printing industry, showcasing machinery, materials and packaging innovation.",
  },
  {
    slug: "nepal-wood-expo-2025",
    name: "Nepal Wood International Expo",
    edition: "10th Edition",
    dates: { display: "17–19 January 2025", start: "2025-01-17", end: "2025-01-19" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/images/gallery/nepal-wood-expo-2019.webp",
    description:
      "Nepal's premier woodworking machinery and furniture manufacturing exhibition connecting regional buyers with global suppliers.",
  },
  {
    slug: "bangladesh-wood-expo-2025",
    name: "Bangladesh Wood International Expo",
    edition: "8th Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/images/gallery/bangladesh-wood-expo-2018.webp",
    description:
      "A trade platform for woodworking machinery, furniture hardware and timber processing solutions in the Bangladesh market.",
  },
  {
    slug: "bangladesh-buildcon-expo-2025",
    name: "Bangladesh Buildcon International Expo",
    edition: "8th Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/images/gallery/bangladesh-buildcon-expo-2019.webp",
    description:
      "Bangladesh's construction and building materials exhibition connecting manufacturers, developers and contractors.",
  },
  {
    slug: "bangladesh-elprotech-expo-2025",
    name: "Bangladesh Elprotech International Expo",
    edition: "3rd Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Power & Energy",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/nepal-power-electric-light-expo-1.webp",
    description:
      "An electrical, power and lighting technology exhibition serving Bangladesh's growing energy and infrastructure sector.",
  },
  {
    slug: "nepal-agritech-expo-2025",
    name: "Nepal Agritech International Expo",
    edition: "7th Edition",
    dates: { display: "14–16 February 2025", start: "2025-02-14", end: "2025-02-16" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Agriculture",
    eventType: "Exhibition",
    heroImage: "/images/gallery/nepal-agritech-expo-2019.webp",
    description:
      "Connecting agricultural machinery, seeds, irrigation and agri-tech brands with buyers across Nepal.",
  },
  {
    slug: "nepal-food-beverages-expo-2025",
    name: "Nepal Food & Beverages Expo",
    dates: { display: "14–16 February 2025", start: "2025-02-14", end: "2025-02-16" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Food & Hospitality",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/nepal-food-beverages-expo-1.webp",
    description:
      "A dedicated food, beverage and hospitality trade platform showcasing products and technology for Nepal's F&B industry.",
  },
  {
    slug: "nepal-buildcon-expo-2025",
    name: "Nepal Buildcon International Expo",
    edition: "10th Edition",
    dates: { display: "20–23 February 2025", start: "2025-02-20", end: "2025-02-23" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/images/gallery/nepal-buildcon-expo-2019.webp",
    description:
      "Nepal's leading construction and building materials exhibition, bringing manufacturers, suppliers and contractors together under one roof.",
  },
  {
    slug: "odisha-mining-infrastructure-expo-2025",
    name: "Odisha Mining and Infrastructure International Expo",
    edition: "3rd Edition",
    dates: { display: "6–9 March 2025", start: "2025-03-06", end: "2025-03-09" },
    venue: { city: "Bhubaneswar", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
];

export function isEventUpcoming(event: ExhibitionEvent, referenceDate = new Date()): boolean {
  return new Date(event.dates.end) >= referenceDate;
}

export function getUpcomingEvents(limit = 3): ExhibitionEvent[] {
  const now = new Date();
  const upcoming = EXHIBITIONS.filter((e) => isEventUpcoming(e, now)).sort(
    (a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime(),
  );
  if (upcoming.length >= limit) return upcoming.slice(0, limit);
  const past = EXHIBITIONS.filter((e) => !isEventUpcoming(e, now)).sort(
    (a, b) => new Date(b.dates.start).getTime() - new Date(a.dates.start).getTime(),
  );
  return [...upcoming, ...past].slice(0, limit);
}

export const EVENT_COUNTRIES = Array.from(new Set(EXHIBITIONS.map((e) => e.venue.country)));
export const EVENT_CITIES = Array.from(new Set(EXHIBITIONS.map((e) => e.venue.city)));
export const EVENT_INDUSTRIES = Array.from(new Set(EXHIBITIONS.map((e) => e.industry)));
export const EVENT_YEARS = Array.from(
  new Set(EXHIBITIONS.map((e) => e.dates.start.slice(0, 4))),
).sort((a, b) => Number(b) - Number(a));
