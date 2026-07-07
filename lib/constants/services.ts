// SINGLE SOURCE OF TRUTH — services listing + detail page copy.

export type Service = {
  slug: string;
  name: string;
  shortDesc: string;
  heading: string;
  body: string;
  cta: string;
  icon:
    | "trade-exhibitions"
    | "international-expos"
    | "conferences"
    | "corporate-events"
    | "branding-promotions"
    | "exhibition-stand-design"
    | "webinars-virtual-events";
};

export const SERVICES: Service[] = [
  {
    slug: "trade-exhibitions",
    name: "Trade Exhibitions",
    shortDesc:
      "Industry-focused exhibitions that connect businesses with buyers, suppliers, distributors and market opportunities.",
    heading: "Built for industries. Designed for business.",
    body: "Futurex organizes focused trade exhibitions that bring exhibitors, visitors, buyers and decision-makers into one professional environment. Each platform is designed to support product showcasing, business networking, lead generation and market development.",
    cta: "Plan Your Exhibition Participation",
    icon: "trade-exhibitions",
  },
  {
    slug: "international-expos",
    name: "International Expos",
    shortDesc:
      "Cross-border trade platforms designed to help brands access new regions, sectors and business communities.",
    heading: "Markets beyond borders.",
    body: "Futurex international expos are built to help brands enter new regions, meet cross-border buyers and understand emerging market dynamics — with the same professional structure as our domestic platforms.",
    cta: "Explore International Opportunities",
    icon: "international-expos",
  },
  {
    slug: "conferences",
    name: "Conferences",
    shortDesc:
      "Knowledge-led forums that bring experts, industry leaders and professionals together for insight, dialogue and innovation.",
    heading: "Where knowledge meets opportunity.",
    body: "Futurex conferences create space for industry leaders, experts, innovators and professionals to exchange ideas, discuss trends and explore the future of their sectors.",
    cta: "Explore Conferences",
    icon: "conferences",
  },
  {
    slug: "corporate-events",
    name: "Corporate Events",
    shortDesc:
      "Purposeful business events planned with precision, creativity and professional execution.",
    heading: "Purposeful events with professional execution.",
    body: "From business gatherings to industry meets, Futurex plans and manages corporate events with clarity, creativity and attention to detail.",
    cta: "Discuss Your Event",
    icon: "corporate-events",
  },
  {
    slug: "branding-promotions",
    name: "Branding & Promotions",
    shortDesc:
      "Integrated promotional support that strengthens visibility before, during and after the event.",
    heading: "Visibility before, during and after the event.",
    body: "Futurex supports brands with promotional solutions that help them reach the right audience, strengthen recall and maximize participation value.",
    cta: "Boost Your Brand Presence",
    icon: "branding-promotions",
  },
  {
    slug: "exhibition-stand-design",
    name: "Exhibition Stand Design",
    shortDesc:
      "Creative booth and display solutions that help brands present themselves with impact and confidence.",
    heading: "Spaces that speak for your brand.",
    body: "Through exhibition design support, Futurex helps brands create impactful booth experiences that attract attention and communicate value.",
    cta: "Request Stand Support",
    icon: "exhibition-stand-design",
  },
  {
    slug: "webinars-virtual-events",
    name: "Webinars & Virtual Events",
    shortDesc:
      "Digital event experiences that allow businesses to connect with audiences beyond physical boundaries.",
    heading: "Connect beyond boundaries.",
    body: "Futurex enables digital event experiences that help businesses reach audiences across locations through webinars, streaming and virtual engagement platforms.",
    cta: "Create a Virtual Experience",
    icon: "webinars-virtual-events",
  },
];
