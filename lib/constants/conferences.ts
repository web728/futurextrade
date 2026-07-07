// SINGLE SOURCE OF TRUTH — conference listing + detail page data.
// Real conference-specific listings were not found on the live site at research time
// (Futurex's public conference program is early-stage) — entries below are drafted
// from the brief's conference template and should be confirmed/replaced with actual
// scheduled conferences before publishing.

export type ConferenceEvent = {
  slug: string;
  name: string;
  dates: { display: string; start: string; end: string };
  venue: { city: string; country: string };
  industry: string;
  focusAreas: string[];
  description: string;
  heroImage?: string;
};

export const CONFERENCES: ConferenceEvent[] = [
  {
    slug: "future-of-energy-storage-conference-2026",
    name: "Future of Energy Storage Conference",
    dates: { display: "12 March 2026", start: "2026-03-12", end: "2026-03-12" },
    venue: { city: "New Delhi", country: "India" },
    industry: "Power & Energy",
    focusAreas: [
      "Industry trends",
      "Technology updates",
      "Market opportunities",
      "Business collaboration",
    ],
    description:
      "A knowledge platform bringing together energy storage manufacturers, policymakers and technology providers to discuss the future of the sector.",
    heroImage: "/images/gallery/conferences/ev-dynamics-conference-1.webp",
  },
  {
    slug: "construction-technology-summit-2026",
    name: "Construction Technology Summit",
    dates: { display: "6 May 2026", start: "2026-05-06", end: "2026-05-06" },
    venue: { city: "Mumbai", country: "India" },
    industry: "Building & Construction",
    focusAreas: ["Industry trends", "Knowledge sharing", "Future growth"],
    description:
      "A forum for construction industry leaders, architects and infrastructure experts to explore emerging technology and market direction.",
    heroImage: "/images/gallery/conferences/futurex-industry-conference-3.webp",
  },
];

export function isConferenceUpcoming(
  conf: ConferenceEvent,
  referenceDate = new Date(),
): boolean {
  return new Date(conf.dates.end) >= referenceDate;
}
