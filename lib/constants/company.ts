// SINGLE SOURCE OF TRUTH — company-wide facts, contact details, stats, CTA copy.
// Do NOT hardcode these values anywhere else in the app.

export const SITE_URL = "https://www.futurextrade.com";

// Downloadable company profile PDF, served as a static asset from /public.
export const COMPANY_PROFILE_PDF = "/documents/futurex-group-company-profile.pdf";

export const COMPANY = {
  legalName: "Futurex Trade Fair and Events Private Limited",
  shortName: "Futurex",
  tagline: "Let's build the future together.",
  globalLine:
    "Connecting Industries. Creating Opportunities. Building the Future.",
  positioning:
    "Futurex Trade Fair and Events Private Limited is a 15-year-old B2B exhibition and corporate events company creating professional trade platforms that connect industries, showcase innovation and unlock business growth across India and international markets.",
  since: 2011,
  values: ["Innovation", "Collaboration", "Progress"] as const,
} as const;

// Real Futurex Group subsidiary companies, sourced from the live futurextrade.com
// homepage's "Subordinate Companies" section — each is a separate legal entity with
// its own website, linked out to directly rather than duplicated here.
export const GROUP_COMPANIES = [
  {
    id: "fdma",
    name: "Futurex Digital Marketing Agency",
    shortName: "FDMA",
    description:
      "A full-service digital marketing company — we merge imagination and technology to help brands thrive in the digital transformation era.",
    href: "https://futurexpr.com/",
  },
  {
    id: "futurex-healthcare",
    name: "Futurex Healthcare",
    shortName: "Futurex Healthcare",
    description:
      "The young subsidiary of the multinational MSME Futurex Healthcare Group of Companies — built India's largest Covid Care ICU in Mumbai in record time.",
    href: "https://www.futurexhealth.com/",
  },
  {
    id: "futurex-studio",
    name: "Futurex Studio",
    shortName: "Futurex Studio",
    description:
      "A world-class exhibition stand builder providing turnkey solutions — design, production, setup and execution of premium exhibition stands.",
    href: "http://www.futurexstudio.com/",
  },
] as const;

// Real facts pulled from the live futurextrade.com site — do not invent numbers.
export const STATS = [
  { value: "220+", label: "Exhibitions & Conferences" },
  { value: "16,500+", label: "Exhibitors Connected" },
  { value: "25,000+", label: "Brands on Display" },
  { value: "950,000+", label: "Business Visitors" },
  { value: "15+", label: "Years Building Trade Platforms" },
] as const;

export const CONTACT = {
  address: {
    line1: "E52, 1st Floor, Kalkaji",
    line2: "New Delhi, India – 110019",
    full: "E52, 1st Floor, Kalkaji, New Delhi, India – 110019",
  },
  email: "info@futurextrade.com",
  phone: {
    display: "+91 98108 55697",
    href: "tel:+919810855697",
  },
  whatsapp: "https://wa.me/919810855697",
  hours: "Monday to Friday: 10:00 AM – 6:00 PM",
  branches: ["New Delhi (HQ)", "Mumbai", "Colombo", "Kathmandu", "Dhaka"],
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
] as const;

export const CTA_LIBRARY = {
  becomeExhibitor: "Become an Exhibitor",
  exploreEvents: "Explore Upcoming Events",
  registerVisitor: "Register as Visitor",
  becomeSponsor: "Become a Sponsor",
  partnerWithUs: "Partner With Futurex",
  requestCallback: "Request a Callback",
  downloadBrochure: "Download Brochure",
  speakToTeam: "Speak to Our Team",
  planEvent: "Plan Your Event",
  startEnquiry: "Start Your Enquiry",
  viewCalendar: "View Event Calendar",
  discoverServices: "Discover Our Services",
  connectLeaders: "Connect With Industry Leaders",
  buildPresence: "Build Your Market Presence",
  showcaseBrand: "Showcase Your Brand",
  createOpportunities: "Create New Opportunities",
} as const;

export const MICROCOPY = {
  loading: "Preparing your business platform…",
  searchEmpty: "No matching results found. Try adjusting your filters.",
  galleryEmpty: "More event moments will be added soon.",
  blogEmpty: "New insights and updates are coming soon.",
  formConsent:
    "By submitting this form, you agree to be contacted by Futurex Trade Fair and Events Private Limited regarding your enquiry.",
  formSuccessTitle: "Thank you for reaching out.",
  formSuccessBody:
    "Our team has received your enquiry and will connect with you shortly.",
  formErrorTitle: "Something went wrong.",
  formErrorBody:
    "Something went wrong while submitting your request. Please try again or contact us directly.",
} as const;

export const ENQUIRY_TYPES = [
  "Book a Stall",
  "Visitor Registration",
  "Sponsorship",
  "Partnership",
  "Media Enquiry",
  "Corporate Event",
  "General Enquiry",
] as const;

// Grouped footer navigation — each column has a clear, single purpose.
export const FOOTER_COLUMNS = {
  company: [
    { label: "About Futurex", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Careers", href: "/careers" },
  ],
  explore: [
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Media", href: "/media" },
    { label: "Contact", href: "/contact" },
  ],
  events: [
    { label: "Exhibitions", href: "/exhibitions" },
    { label: "Conferences", href: "/conferences" },
  ],
  participants: [
    { label: "Exhibitors", href: "/exhibitors" },
    { label: "Visitors", href: "/visitors" },
    { label: "Sponsors", href: "/sponsors" },
  ],
} as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
] as const;

// Industry-association / partner logos shown in the LogoMarquee.
// Real logos sourced from the live futurextrade.com "Our Associates" section,
// downloaded into /public/logos/associates/ — see components/interactive/LogoMarquee.tsx
export const ASSOCIATE_LOGOS = [
  { name: "ASSOCHAM", src: "/logos/associates/assocham.webp" },
  { name: "CII", src: "/logos/associates/cii.webp" },
  { name: "FIEO", src: "/logos/associates/fieo.webp" },
  { name: "PHD Chamber", src: "/logos/associates/phd-chamber.webp" },
  { name: "CIEO", src: "/logos/associates/cieo.webp" },
  { name: "IIAF", src: "/logos/associates/iiaf.png" },
] as const;
