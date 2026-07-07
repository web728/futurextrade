// SINGLE SOURCE OF TRUTH — media/blog posts.
// Placeholder posts across the categories named in the brief — replace with real
// company news/announcements via CMS or by editing this file directly.

export type MediaPost = {
  slug: string;
  title: string;
  category:
    | "Company News"
    | "Event Updates"
    | "Industry Insights"
    | "Media Coverage"
    | "Announcements"
    | "Business Networking";
  excerpt: string;
  body: string;
  date: string;
};

export const MEDIA_CATEGORIES = [
  "All",
  "Company News",
  "Event Updates",
  "Industry Insights",
  "Media Coverage",
  "Announcements",
  "Business Networking",
] as const;

export const MEDIA_POSTS: MediaPost[] = [
  {
    slug: "futurex-2026-exhibition-calendar-announced",
    title: "Futurex Announces 2026 Exhibition Calendar",
    category: "Announcements",
    excerpt:
      "Futurex has confirmed its 2026 exhibition calendar across India, Nepal and Bangladesh, spanning mining, agriculture, construction and packaging sectors.",
    body: "Futurex Trade Fair and Events Private Limited has announced its 2026 exhibition calendar, featuring platforms across the mining, agriculture, construction and printing & packaging sectors in India, Nepal and Bangladesh. Each event continues Futurex's 15-year focus on connecting industries with qualified business audiences.",
    date: "2026-01-05",
  },
  {
    slug: "odisha-mining-expo-registers-strong-turnout",
    title: "Odisha Mining and Infrastructure Expo Registers Strong Business Turnout",
    category: "Event Updates",
    excerpt:
      "The latest edition of the Odisha Mining and Infrastructure International Expo saw strong participation from manufacturers and buyers across Eastern India.",
    body: "The Odisha Mining and Infrastructure International Expo concluded with strong exhibitor and visitor engagement, reinforcing Bhubaneswar's position as a growing hub for mining and infrastructure business in Eastern India.",
    date: "2026-01-12",
  },
  {
    slug: "why-b2b-exhibitions-still-drive-growth",
    title: "Why B2B Exhibitions Still Drive Business Growth in a Digital-First World",
    category: "Industry Insights",
    excerpt:
      "Face-to-face business platforms continue to deliver measurable value even as digital channels expand — here's why.",
    body: "Despite the growth of digital marketing channels, in-person B2B exhibitions continue to deliver measurable business outcomes: qualified buyer conversations, faster trust-building and direct product demonstration. Futurex's platforms are designed around this enduring value.",
    date: "2025-11-20",
  },
  {
    slug: "futurex-expands-branch-presence",
    title: "Futurex Strengthens Regional Presence Across South Asia",
    category: "Company News",
    excerpt:
      "Futurex continues to expand its footprint across India and international markets including Nepal, Bangladesh and Sri Lanka.",
    body: "Futurex Trade Fair and Events Private Limited continues to strengthen its regional presence, supporting business communities across India, Nepal, Bangladesh and Sri Lanka through a growing portfolio of trade exhibitions and conferences.",
    date: "2025-09-02",
  },
];
