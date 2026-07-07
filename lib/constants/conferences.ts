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
  // Upcoming Conferences
  {
    slug: "future-of-energy-storage-conference-2026",
    name: "Future of Energy Storage Conference",
    dates: {
      display: "12 March 2026",
      start: "2026-03-12",
      end: "2026-03-12",
    },
    venue: { city: "New Delhi", country: "India" },
    industry: "Power & Energy",
    focusAreas: [
      "Industry Trends",
      "Technology Updates",
      "Market Opportunities",
      "Business Collaboration",
    ],
    description:
      "A knowledge platform bringing together energy storage manufacturers, policymakers, and technology providers to discuss the future of the sector.",
    heroImage: "/images/gallery/conferences/ev-dynamics-conference-1.webp",
  },

  {
    slug: "construction-technology-summit-2026",
    name: "Construction Technology Summit",
    dates: {
      display: "6 May 2026",
      start: "2026-05-06",
      end: "2026-05-06",
    },
    venue: { city: "Mumbai", country: "India" },
    industry: "Building & Construction",
    focusAreas: [
      "Industry Trends",
      "Knowledge Sharing",
      "Future Growth",
    ],
    description:
      "A forum for construction industry leaders, architects, and infrastructure experts to explore emerging technology and market direction.",
    heroImage:
      "/images/gallery/conferences/futurex-industry-conference-3.webp",
  },

  // Past Conferences

  {
    slug: "ev-dynamics-conference-2024-chennai",
    name: "EV Dynamics 2024",
    dates: {
      display: "7 September 2024",
      start: "2024-09-07",
      end: "2024-09-07",
    },
    venue: {
      city: "Chennai",
      country: "India",
    },
    industry: "Electric Vehicles",
    focusAreas: [
      "Electric Mobility",
      "EV Manufacturing",
      "Battery Technology",
      "Industry Networking",
    ],
    description:
      "A Futurex Conference focused on electric mobility, battery innovations, charging infrastructure, and emerging EV business opportunities.",
    heroImage: "/images/gallery/conferences/ev-dynamics-conference-1.webp",
  },

  {
    slug: "ev-dynamics-conference-2024-pune",
    name: "EV Dynamics 2024",
    dates: {
      display: "7 December 2024",
      start: "2024-12-07",
      end: "2024-12-07",
    },
    venue: {
      city: "Pune",
      country: "India",
    },
    industry: "Electric Vehicles",
    focusAreas: [
      "EV Innovation",
      "Charging Infrastructure",
      "Manufacturing",
      "Business Networking",
    ],
    description:
      "An industry conference connecting EV manufacturers, technology providers, startups, and policymakers to discuss the future of electric mobility.",
    heroImage: "/images/gallery/conferences/ev-dynamics-conference-2.webp",
  },

  {
    slug: "ev-dynamics-conference-2023-chennai",
    name: "EV Dynamics 2023",
    dates: {
      display: "27 May 2023",
      start: "2023-05-27",
      end: "2023-05-27",
    },
    venue: {
      city: "Chennai",
      country: "India",
    },
    industry: "Electric Vehicles",
    focusAreas: [
      "Sustainable Mobility",
      "EV Components",
      "Battery Systems",
      "Industry Collaboration",
    ],
    description:
      "A Futurex Conference bringing together key stakeholders from the electric vehicle ecosystem to explore emerging technologies and market trends.",
    heroImage: "/images/gallery/conferences/ev-dynamics-conference-3.webp",
  },

  {
    slug: "ev-dynamic-conference-2022-pune",
    name: "EV Dynamic Conference 2022",
    dates: {
      display: "14 November 2022",
      start: "2022-11-14",
      end: "2022-11-14",
    },
    venue: {
      city: "Pune",
      country: "India",
    },
    industry: "Electric Vehicles",
    focusAreas: [
      "EV Industry",
      "Green Transportation",
      "Battery Innovation",
      "Business Growth",
    ],
    description:
      "One of Futurex's early EV conferences focused on promoting electric mobility, industry collaboration, and technological advancements across the EV sector.",
    heroImage: "/images/gallery/conferences/ev-dynamics-conference-4.webp",
  },
];

export function isConferenceUpcoming(
  conf: ConferenceEvent,
  referenceDate = new Date(),
): boolean {
  return new Date(conf.dates.end) >= referenceDate;
}
