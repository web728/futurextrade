// SINGLE SOURCE OF TRUTH — careers page content.

export const CAREERS_CONTENT = {
  culture:
    "At Futurex, we believe in professionalism, ownership, creativity and execution. Our work brings together industries and business communities — and our people make that possible.",
  whyJoin: [
    "Work across diverse industries",
    "Be part of large-scale exhibitions and events",
    "Learn from experienced professionals",
    "Build business relationships",
    "Contribute to international event platforms",
    "Grow with a future-focused team",
  ],
} as const;

export type OpenPosition = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
};

// No open positions confirmed at time of writing — update this array as roles open.
export const OPEN_POSITIONS: OpenPosition[] = [];
