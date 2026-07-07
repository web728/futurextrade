// SINGLE SOURCE OF TRUTH — primary and footer navigation structure.

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Trade Exhibitions",
        href: "/services/trade-exhibitions",
        description: "Industry-focused B2B exhibitions",
      },
      {
        label: "International Expos",
        href: "/services/international-expos",
        description: "Cross-border trade platforms",
      },
      {
        label: "Conferences",
        href: "/services/conferences",
        description: "Knowledge-led industry forums",
      },
      {
        label: "Corporate Events",
        href: "/services/corporate-events",
        description: "Purposeful business events",
      },
      {
        label: "Branding & Promotions",
        href: "/services/branding-promotions",
        description: "Integrated visibility support",
      },
      {
        label: "Exhibition Stand Design",
        href: "/services/exhibition-stand-design",
        description: "Creative booth solutions",
      },
      {
        label: "Webinars & Virtual Events",
        href: "/services/webinars-virtual-events",
        description: "Digital event experiences",
      },
    ],
  },
  { label: "Exhibitions", href: "/exhibitions" },
  { label: "Conferences", href: "/conferences" },
  { label: "Industries", href: "/industries" },
  {
    label: "Participate",
    href: "/exhibitors",
    children: [
      { label: "Exhibitors", href: "/exhibitors" },
      { label: "Visitors", href: "/visitors" },
      { label: "Sponsors", href: "/sponsors" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const HEADER_CTA = { label: "Partner With Us", href: "/contact" };
export const HEADER_SECONDARY_CTA = { label: "Explore Events", href: "/exhibitions" };
