// SINGLE SOURCE OF TRUTH — exhibition listing + detail page data.
// Event names, dates and cities below were sourced from the live futurextrade.com
// exhibitions listing. Status (upcoming/past) is derived from the event end date at
// render time via isEventUpcoming/getUpcomingEvents — do not hardcode a status flag.

export type ExhibitionEvent = {
  id: string;
  name: string;
  edition?: string;
  dates: { display: string; start: string; end: string };
  image?: string;
  venue: { city: string; country: string; venueName?: string };
  industry: string;
  eventType: "Exhibition";
  heroImage?: string;
  gallery?: string[];
  description: string;
  socials?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    email?: string;
    twitter?: string;
  };
};

export function groupExhibitionsByYear(
  events: ExhibitionEvent[],
): { year: string; events: ExhibitionEvent[] }[] {
  const map = new Map<string, ExhibitionEvent[]>();
  for (const event of events) {
    const year = event.dates.start.slice(0, 4);
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(event);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => Number(b) - Number(a)) // newest year first
    .map(([year, events]) => ({
      year,
      events: events.sort((a, b) => a.dates.start.localeCompare(b.dates.start)),
    }));
}

export const EXHIBITIONS: ExhibitionEvent[] = [
  {
    id: "odisha-mining-infrastructure-expo-2026",
    name: "Odisha Mining and Infrastructure International Expo",
    edition: "4th Edition",
    dates: { display: "8–11 January 2026", start: "2026-01-08", end: "2026-01-11" },
    venue: { city: "Bhubaneswar", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/mining-2026.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://odishaminingexpo.com/",
      facebook: "https://www.facebook.com/odishaminingexpo/",
      instagram: "https://www.instagram.com/odishaminingexpo/",
      linkedin: "https://www.linkedin.com/company/odishaminingexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-agritech-expo-2026",
    name: "Nepal Agritech International Expo",
    edition: "8th Edition",
    dates: { display: "16–18 January 2026", start: "2026-01-16", end: "2026-01-18" },
    venue: { city: "Bharatpur", country: "Nepal" },
    industry: "Agriculture",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/agri.png",
    description:
      "Nepal's dedicated agri-technology exhibition connecting farm equipment, agri-input and agri-tech brands with the region's growing agricultural sector.",
    socials: {
      website: "https://nepalagritech.com.np/",
      facebook: "https://www.facebook.com/NepalAgritech",
      instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-buildcon-expo-2026",
    name: "Nepal Buildcon International Expo",
    edition: "11th Edition",
    dates: { display: "5–8 February 2026", start: "2026-02-05", end: "2026-02-08" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/Nepalbuildconexpo.png",
    description:
      "Nepal's leading construction and building materials exhibition, bringing manufacturers, suppliers and contractors together under one roof.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "corru-pack-print-india-2026",
    name: "Corru Pack Print India",
    edition: "2nd Edition",
    dates: { display: "19–22 March 2026", start: "2026-03-19", end: "2026-03-22" },
    venue: { city: "Mumbai", country: "India" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/corrupack.png",
    description:
      "A specialized platform for the corrugation, packaging and printing industry, showcasing machinery, materials and packaging innovation.",
    socials: {
      website: "https://corrupackprintindia.org/",
      facebook: "https://www.facebook.com/corrupackprint/",
      instagram: "https://www.instagram.com/corrupackprint/",
      linkedin: "https://www.linkedin.com/company/corrupackprint/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-wood-expo-2025",
    name: "Nepal Wood International Expo",
    edition: "10th Edition",
    dates: { display: "17–19 January 2025", start: "2025-01-17", end: "2025-01-19" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalwood.png",
    description:
      "Nepal's premier woodworking machinery and furniture manufacturing exhibition connecting regional buyers with global suppliers.",
    socials: {
      website: "https://nepalwood.com.np/",
      facebook: "https://www.facebook.com/nepalwoodexpo/",
      instagram: "https://www.instagram.com/nepalwoodexpo/",
      linkedin: "https://www.linkedin.com/company/nepalwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-wood-expo-2025",
    name: "Bangladesh Wood International Expo",
    edition: "8th Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/bwood.png",
    description:
      "A trade platform for woodworking machinery, furniture hardware and timber processing solutions in the Bangladesh market.",
    socials: {
      website: "https://www.bangladeshwood.com/",
      facebook: "https://www.facebook.com/Bangladeshwoodexpo/",
      // instagram: "https://www.instagram.com/nepalwoodexpo/",
      // linkedin: "https://www.linkedin.com/company/nepalwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-buildcon-expo-2025",
    name: "Bangladesh Buildcon International Expo",
    edition: "8th Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/bangladeshb.png",
    description:
      "Bangladesh's construction and building materials exhibition connecting manufacturers, developers and contractors.",
    socials: {
      website: " https://bangladeshbuildcon.com/",
      facebook: "https://www.facebook.com/bangladeshbuildconexpo",
      // instagram: "https://www.instagram.com/nepalwoodexpo/",
      // linkedin: "https://www.linkedin.com/company/nepalwoodexpo/",
      email: "admin@futurextrade.com"
    },

  },
  {
    id: "bangladesh-elprotech-expo-2025",
    name: "Bangladesh Elprotech International Expo",
    edition: "3rd Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Power & Energy",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/nepal-power-electric-light-expo-1.webp",
    description:
      "An electrical, power and lighting technology exhibition serving Bangladesh's growing energy and infrastructure sector.",
    socials: {
      website: "https://bangladeshelectricalexpo.com/",
      facebook: "https://www.facebook.com/ElprotechExpo",
      // instagram: "https://www.instagram.com/nepalwoodexpo/",
      // linkedin: "https://www.linkedin.com/company/nepalwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-agritech-expo-2025",
    name: "Nepal Agritech International Expo",
    edition: "7th Edition",
    dates: { display: "14–16 February 2025", start: "2025-02-14", end: "2025-02-16" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Agriculture",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalagritech.png",
    description:
      "Connecting agricultural machinery, seeds, irrigation and agri-tech brands with buyers across Nepal.",
    socials: {
      website: "https://nepalagritech.com.np/",
      facebook: "https://www.facebook.com/NepalAgritech",
      instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-food-beverages-expo-2025",
    name: "Nepal Food & Beverages Expo",
    dates: { display: "14–16 February 2025", start: "2025-02-14", end: "2025-02-16" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Food & Hospitality",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalfood.png",
    description:
      "A dedicated food, beverage and hospitality trade platform showcasing products and technology for Nepal's F&B industry.",
    socials: {
      website: "https://nepalfoodexpo.com/",
      facebook: "https://www.facebook.com/nepalfoodexpo",

      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-buildcon-expo-2025",
    name: "Nepal Buildcon International Expo",
    edition: "10th Edition",
    dates: { display: "20–23 February 2025", start: "2025-02-20", end: "2025-02-23" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalbuildcon.png",
    description:
      "Nepal's leading construction and building materials exhibition, bringing manufacturers, suppliers and contractors together under one roof.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "odisha-mining-infrastructure-expo-2025",
    name: "Odisha Mining and Infrastructure International Expo",
    edition: "3rd Edition",
    dates: { display: "6–9 March 2025", start: "2025-03-06", end: "2025-03-09" },
    venue: { city: "Baramunda Ground, Bhubaneswar", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/mining.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://odishaminingexpo.com/",
      facebook: "https://www.facebook.com/odishaminingexpo/",
      instagram: "https://www.instagram.com/odishaminingexpo/",
      // linkedin: "https://www.linkedin.com/company/nepalbuildconexpo",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Kenya Buildcon International Expo",
    name: "Kenya Buildcon International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 June 2024", start: "2024-06-06", end: "2025-06-08" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/kenyab.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://kenyabuildcon.com/",
      facebook: "https://www.facebook.com/odishaminingexpo/",
      instagram: "https://www.instagram.com/kenyabuildconexpo/",
      linkedin: "https://www.linkedin.com/company/kenyabuildconexpo",
      twitter: "https://x.com/kenyabuildcon",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Kenya Wood International Expo",
    name: "Kenya Wood International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 June 2024", start: "2024-06-06", end: "2025-06-08" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/kenyawood.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://kenyawoodexpo.com/",
      facebook: "https://www.facebook.com/kenyawoodexpo?_rdr",
      // instagram: "https://www.instagram.com/odishaminingexpo/",
      linkedin: "https://www.linkedin.com/company/kenyawoodexpo/",
      twitter:"https://x.com/kenyawoodexpo",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Uganda Buildcon International Expo",
    name: "Uganda Buildcon International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 August 2024", start: "2024-06-06", end: "2025-06-08" },
    venue: { city: "Kampala", country: "Uganda" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/ugandabuild.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://ugandabuildcon.com/",
      facebook: "https://www.facebook.com/ugandabuildcon/",
      instagram: "https://www.instagram.com/ugandabuildcon/",
      // linkedin: "https://www.linkedin.com/company/kenyawoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "3rd Nepal Electric, Power and Light International Expo",
    name: "3rd Nepal Electric, Power and Light International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalpower--.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalpowerelec.com/",
      facebook: "https://www.facebook.com/nepalpowerelec/",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      twitter:"https://twitter.com/Nepalpowerelec",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "2nd Nepal Consumer Electronics Home Appliances International Expo",
    name: "2nd Nepal Consumer Electronics Home Appliances International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalconsumer.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalconsumerexpo.com/",
      facebook: "https://www.facebook.com/nepalconsumerexpo",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      // linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      email: "admin@futurextrade.com"
    },
  },



  {
    id: "5th Edition India International Ev Show",
    name: "5th Edition India International Ev Show",
    edition: "3rd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Chennai Trade Centre, Nandambakkam, Chennai", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/5ev.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },



  {
    id: "Auto Component International Expo",
    name: "Auto Component International Expo",
    edition: "",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Chennai Trade Centre, Nandambakkam, Chennai, Tamil Nadu", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/autocompoent.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },


  {
    id: "13th Bhutan Construction and Wood Expo",
    name: "13th Bhutan Construction and Wood Expo",
    edition: "",
    dates: { display: "18–21 October 2024", start: "2024-10-18", end: "2025-10-21" },
    venue: { city: "Changlimithang Stadium Parking, Thimphu", country: "Bhutan" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/BCCII.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.bcci.org.bt/",
      facebook: "https://www.facebook.com/bhutanchamber?ref=embed_page",
      // instagram: "https://www.instagram.com/iievshow/",
      // linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "2nd Odisha Plast International Expo 2024",
    name: "2nd Odisha Plast International Expo 2024",
    edition: "",
    dates: { display: "21-24 November 2024", start: "2024-11-21", end: "2025-11-24" },
    venue: { city: "Janata Maidan, Bhubaneswar, Odisha", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/opalst.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://odishaplast.com/",
      facebook: "https://www.facebook.com/odishaplast",
      instagram: "https://www.instagram.com/odishaplast/",
      // linkedin: "https://www.linkedin.com/company/iievshow/",
      twitter:"https://x.com/i/flow/login?redirect_after_login=%2Fpropackodisha",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Propack International Expo 2024",
    name: "Propack International Expo 2024",
    edition: "",
    dates: { display: "21-24 November 2024", start: "2024-11-21", end: "2025-11-24" },
    venue: { city: "Janata Maidan, Bhubaneswar, Odisha", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/propack.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://odishapropack.com/",
      facebook: "https://www.facebook.com/propackodisha/",
      instagram: "https://www.instagram.com/propackodisha/",
      // linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "6th Edition India International Ev Show",
    name: "6th Edition India International Ev Show",
    edition: "",
    dates: { display: "6-8 December 2024", start: "2024-12-06", end: "2025-12-08" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/6thev.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },


  {
    id: "Nepal Pack Print International Expo",
    name: "Nepal Pack Print International Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2024-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalpack.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://www.nepalpackprint.com/",
      facebook: "https://www.facebook.com/nepalpackprint/",
      instagram: "https://www.instagram.com/nepalpackprint/",
      linkedin: "https://www.linkedin.com/company/nepalpackprint/",
       twitter:"https://x.com/nepalpackprint",
      email: "admin@futurextrade.com"
    },
  },


  {
    id: "4th Nepal Pharma International Expo",
    name: "4th Nepal Pharma International Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2025-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalpharma.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalpharmatech.com/",
      facebook: "https://www.facebook.com/nepalpharmatech/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/nepal-pharma-health-international-expo/",
      twitter:"https://x.com/nepalpharmatech",
      email: "admin@futurextrade.com"
    },
  },


  {
    id: "Nepal Hospital Surgical & Medical Equipment Expo",
    name: "Nepal Hospital Surgical & Medical Equipment Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2024-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nhsm.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://nhsmexpo.com/",
      // facebook: "https://www.facebook.com/nepalpharmatech/",
      // instagram: "https://www.instagram.com/iievshow/",
      // linkedin: "https://www.linkedin.com/company/nepal-pharma-health-international-expo/",
      email: "admin@futurextrade.com"
    },
  },


  {
    id: "2nd Uganda Buildcon International Expo",
    name: "2nd Uganda Buildcon International Expo",
    edition: "",
    dates: { display: "10-12 August 2023", start: "2023-08-10", end: "2023-08-10" },
    venue: { city: "UMA Show Grounds Lugogo, Kampala", country: "Uganda" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/uganda-buildcon.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://ugandabuildcon.com/",
      facebook: "https://www.facebook.com/ugandabuildconexpo",
      instagram: "https://www.instagram.com/ugandabuildconexpo/",
      linkedin: "https://www.linkedin.com/company/nepal-pharma-health-international-expo/",
      twitter: "https://twitter.com/UgandaBuildcon",
      email: "admin@futurextrade.com"
    },
  },


  {
    id: "Ride Nepal International Expo",
    name: "Ride Nepal International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/ridenepal.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://ridenepalexpo.com/",
      facebook: "https://www.facebook.com/RideNepalExpo/",
      instagram: "https://www.instagram.com/ridenepalexpo/",
      // linkedin: "https://www.linkedin.com/company/nepal-pharma-health-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal EV International Expo",
    name: "Nepal EV International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalev.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://nepalevexpo.com/",
      facebook: "https://www.facebook.com/Nepalevinternationalshow",
      // instagram: "https://www.instagram.com/ridenepalexpo/",
      // linkedin: "https://www.linkedin.com/company/nepal-pharma-health-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Electric, Power and Light International Expo",
    name: "Nepal Electric, Power and Light International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalpower.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalpowerelec.com/",
      facebook: "https://www.facebook.com/nepalpowerelec/",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      twitter:"https://twitter.com/Nepalpowerelec ",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Consumer Elefctronics Home Appliances International Expo",
    name: "Nepal Consumer Electronics Home Appliances International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/consume.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://nepalconsumerexpo.com/",
      facebook: "https://www.facebook.com/nepalconsumerexpo",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      // linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Mobile International Expo",
    name: "Nepal Mobile International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/mobile.jpg",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalmobilexpo.com/",
      // facebook: "https://www.facebook.com/nepalconsumerexpo",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      // linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "12th Bhutan Construction & Wood Expo",
    name: "12th Bhutan Construction & Wood Expo",
    edition: "",
    dates: { display: "06-09 October 2023", start: "2023-10-06", end: "2023-10-09" },
    venue: { city: "Changlimithang Stadium Parking, Thimphu", country: "Bhutan" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/bhutan.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.bcci.org.bt/",
      facebook: "https://www.facebook.com/nepalpowerelec/",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      // linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "7th Bangladesh Wood International Expo",
    name: "7th Bangladesh Wood International Expo",
    edition: "",
    dates: { display: "23-25 November 2023", start: "2023-11-23", end: "2023-11-25" },
    venue: { city: " ICCB, Dhaka", country: "Bangladesh" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/bangladeshwood.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.bangladeshwood.com/",
      facebook: "https://www.facebook.com/Bangladeshwoodexpo/",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      // linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "7th Bangladesh Buildcon International Expo",
    name: "7th Bangladesh Buildcon International Expo",
    edition: "",
    dates: { display: "23-25 November 2023", start: "2023-11-23", end: "2023-11-25" },
    venue: { city: " ICCB, Dhaka", country: "Bangladesh" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/bangladeshbuildcon.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.bangladeshbuildcon.com/",
      facebook: "https://www.facebook.com/bangladeshbuildconexpo",
      // instagram: "https://www.instagram.com/ugandabuildcon/",
      // linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "3rd India International EV Show",
    name: "3rd India International EV Show",
    edition: "",
    dates: { display: "01-03 December 2023", start: "2023-12-01", end: "2023-12-03" },
    venue: { city: "Auto Cluster Exhibition Centre, Chinchwad, Pune", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/3ev.png",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Auto Component International Expo",
    name: "Auto Component International Expo",
    edition: "",
    dates: { display: "01-03 December 2023", start: "2023-12-01", end: "2023-12-03" },
    venue: { city: "Auto Cluster Exhibition Centre, Chinchwad, Pune", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/autocompoent.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "4th Nepal 5P International Expo",
    name: "4th Nepal 5P International Expo",
    edition: "",
    dates: { display: "21-23 December 2023", start: "2023-12-21", end: "2023-12-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepal5p-1.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepal5pexpo.com/",
      facebook: "https://www.facebook.com/Nepal5P",
      // instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "3rd Nepal Pharmatech International Expo",
    name: "3rd Nepal Pharmatech International Expo",
    edition: "",
    dates: { display: "21-23 December 2023", start: "2023-12-21", end: "2023-12-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepalpharma-1.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalpharmatech.com/",
      facebook: "https://www.facebook.com/Nepal5P",
      // instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Pharmatech International Expo",
    name: "Nepal Pharmatech International Expo",
    edition: "",
    dates: { display: "11-13 March 2022", start: "2022-03-11", end: "2022-03-13" },
    venue: { city: "Futurex Virtual Platform.", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/nepal-pharmatech.jpg",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalpharmatech.com/",
      facebook: "https://www.facebook.com/Nepal5P",
      // instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "2nd Nepal 5P International Expo 2022",
    name: "2nd Nepal 5P International Expo 2022",
    edition: "",
    dates: { display: "11-13 March 2022", start: "2022-03-11", end: "2022-03-13" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/2ND-NEPAL-5P.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepal5pexpo.com/",
      facebook: "https://www.facebook.com/Nepal5P",
      // instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "7th Nepal Wood International Expo 2022",
    name: "7th Nepal Wood International Expo 2022",
    edition: "",
    dates: { display: "07-09 January 2022", start: "2022-01-07", end: "2022-01-09" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/Nepal-Wood.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://nepalwood.com.np/",
      facebook: "https://www.facebook.com/NepalWood",
      // instagram: "https://www.instagram.com/iievshow/",
      // linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Buildcon International Expo 2022",
    name: "Nepal Buildcon International Expo 2022",
    edition: "",
    dates: { display: "11-13 February 2022", start: "2022-02-11", end: "2022-02-13" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/Nepal-Buildcon.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Agritech International EXPO 2022",
    name: "Nepal Agritech International EXPO 2022",
    edition: "",
    dates: { display: "25-27 February 2022", start: "2022-02-25", end: "2022-02-27" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/NEPAL-AGRICULTURE.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalagritech.com.np/",
      facebook: "https://www.facebook.com/NepalAgritech",
      instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Food & Beverages Expo 2022",
    name: "Nepal Food & Beverages Expo 2022",
    edition: "",
    dates: { display: "25-27 February 2022", start: "2022-02-25", end: "2022-02-27" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/NEPAL-FOOD.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.nepalfoodexpo.com/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "CHITWAN INTERNATIONAL INDUSTRIAL EXPO 2021",
    name: "CHITWAN INTERNATIONAL INDUSTRIAL EXPO 2021",
    edition: "",
    dates: { display: "17-19 December 2021", start: "2021-12-17", end: "2021-12-19" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/chitwan.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalciie.com/",
      facebook: "https://www.facebook.com/ChitwanInternationalIndustrialExpo",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Indo Nepal Business Expo & Summit 2021",
    name: "Indo Nepal Business Expo & Summit 2021",
    edition: "",
    dates: { display: "17-19 December 2021", start: "2021-12-17", end: "2021-12-19" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/indonepal.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.indonepalexpo.com/",
      facebook: "https://www.facebook.com/indonepalexpo",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "INDO BHUTAN EXPO 2021",
    name: "INDO BHUTAN EXPO 2021",
    edition: "",
    dates: { display: "16-18 November 2021", start: "2021-11-16", end: "2021-11-18" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/indiabhutan.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.bhutanbsm.com/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "PHIC EXPO 2021",
    name: "PHIC EXPO 2021",
    edition: "",
    dates: { display: "12-14 November 2021", start: "2021-11-12", end: "2021-11-14" },
    venue: { city: "HITEX Exhibition Center, Hyderabad", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/PHIC-LOGO.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://forms.gle/KsauwBCZCimYVm69A",
      facebook: "https://www.facebook.com/FuturexGroup/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/company/nepalagritech",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "3P Africa International Expo 2021",
    name: "3P Africa International Expo 2021",
    edition: "",
    dates: { display: "15-16 July 2021", start: "2021-07-15", end: "2021-07-16" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/3P-AFRICA-LOGO.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://3pafrica.com/",
      facebook: "https://www.facebook.com/Virtual-3P-Africa-International-Expo-102999098652348",
      // instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "3P Egypt International Expo 2021",
    name: "3P Egypt International Expo 2021",
    edition: "",
    dates: { display: "15-16 June 2021", start: "2021-06-15", end: "2021-06-16" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/3P-EGYPT-LOGO.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://3pvirtual.com/",
      facebook: "https://www.facebook.com/Virtual-3P-Egypt-International-Expo-105226435085198/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "India Asean Food Beverage & Packaging Virtual Expo 2021",
    name: "India Asean Food Beverage & Packaging Virtual Expo 2021",
    edition: "",
    dates: { display: "17-19 April 2021", start: "2021-04-17", end: "2021-04-19" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/India-Asean-Food-Beverages.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://aseanfoodexpo.com/",
      facebook: "https://www.facebook.com/India-Asean-Food-Beverages-Packaging-Virtual-Expo-2021-104103975052779",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "VIRTUAL BUILDCON EXPO 2021",
    name: "VIRTUAL BUILDCON EXPO 2021",
    edition: "",
    dates: { display: "24-26 March 2021", start: "2021-03-24", end: "2021-03-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/VIRTUAL-BUILDCON.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.virtualbuildcon.com/",
      facebook: "https://www.facebook.com/Virtual-Buildcon-International-Expo-Bangladesh-102259761943461",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "MANUFACTURING ASIA EXPO 2021",
    name: "MANUFACTURING ASIA EXPO 2021",
    edition: "",
    dates: { display: "19-21 March 2021", start: "2021-03-19", end: "2021-03-21" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/Mnaufacturing-Asia-Logo.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://asiavirtualexpo.com//",
      facebook: "https://www.facebook.com/Manufacturing-Asia-Virtual-Expo-2021-100136138824801",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "INTERNATIONAL EUROPE MANUFACTURING EXPO 2021",
    name: "INTERNATIONAL EUROPE MANUFACTURING EXPO 2021",
    edition: "",
    dates: { display: "18-20 March 2021", start: "2021-03-18", end: "2021-03-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/MANUFACTURING-EUROPE.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://europevirtualexpo.com/",
      facebook: "https://www.facebook.com/International-Europe-Manufacturing-Expo-105293874966222",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Bangladesh Printpack International Expo 2021",
    name: "Bangladesh Printpack International Expo 2021",
    edition: "",
    dates: { display: "10-13 March 2021", start: "2021-03-10", end: "2021-03-13" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/bangladesh-printpack.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://5pvirtualexpo.com/",
      facebook: "https://www.facebook.com/Bangladesh-Printpack-International-Expo-2021-104038598413739",
      // instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/events/bangladeshprintpackinternationa6772758099854942208/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Business Women Expo 2021",
    name: "Business Women Expo 2021",
    edition: "",
    dates: { display: "06-08 March 2021", start: "2021-03-06", end: "2021-03-08" },
    venue: { city: "Hitech City Hyderabad", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/Business-Women-Expo.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://businesswomenexpo.in/",
      facebook: "https://www.facebook.com/Business-Women-Expo-100457308743526",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/bangladeshprintpackinternationa6772758099854942208/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "India Sourcing E Exhibition 2021",
    name: "India Sourcing E Exhibition 2021",
    edition: "",
    dates: { display: "24-26 March 2021", start: "2021-03-24", end: "2021-03-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/India-Sourcing-E-Exhibition.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://indiasourcingexpo.com/",
      facebook: "https://www.facebook.com/India-Sourcing-E-Exhibition-South-Asia-355747132063366",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/bangladeshprintpackinternationa6772758099854942208/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Virtual Sri Lanka 5P International EXPO 2021",
    name: "Virtual Sri Lanka 5P International EXPO 2021",
    edition: "",
    dates: { display: "23-26 February 2021", start: "2021-02-23", end: "2021-02-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/SRI-LANKA-5P.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://5pvirtualexpo.com/",
      facebook: "https://www.facebook.com/Virtual-Sri-Lanka-5P-International-EXPO-2021-172502047671914",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/bangladeshprintpackinternationa6772758099854942208/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Virtual Nepal 5P International Expo 2021",
    name: "Virtual Nepal 5P International Expo 2021",
    edition: "",
    dates: { display: "20-23 January 2021", start: "2021-01-20", end: "2021-01-23" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/Nepal5P-Virtual.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://5pvirtualexpo.com/",
      facebook: "https://www.facebook.com/virtual5p",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/bangladeshprintpackinternationa6772758099854942208/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Virtual Buildcon International Expo 2020",
    name: "Virtual Buildcon International Expo 2020",
    edition: "",
    dates: { display: "17-20 December 2020", start: "2020-12-17", end: "2020-12-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/VIRTUAL-BUILDCON.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.virtualbuildcon.com/",
      facebook: "https://www.facebook.com/Virtual-Buildcon-International-Expo-Bangladesh-102259761943461",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Virtual Wood International Expo 2020",
    name: "Virtual Wood International Expo 2020",
    edition: "",
    dates: { display: "17-20 December 2020", start: "2020-12-17", end: "2020-12-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/VIRTUAL-WOOD-EXPO.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.virtualwoodexpo.com/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Infratech International Expo",
    name: "Infratech International Expo",
    edition: "",
    dates: { display: "15-19 October 2020", start: "2020-10-15", end: "2020-10-19" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/INFRATECH-VIRTUAL.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://infratechexpo.com/",
      facebook: "https://www.facebook.com/infratechexpo",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "4px Africa 2020",
    name: "4px Africa 2020",
    edition: "",
    dates: { display: "22-25 Septmber 2020", start: "2020-09-22", end: "2020-09-25" },
    venue: { city: "Bhrikuti Mandap Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/4PX-AFRICA.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.enterprising-africa.com/4PX/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Medx Africa 2020",
    name: "Medx Africa 2020",
    edition: "",
    dates: { display: "22-25 September 2020", start: "2020-09-22", end: "2020-09-25" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/MEDX-AFRICA.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.enterprising-africa.com/Medx/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Agrifoodx Africa 2020",
    name: "Agrifoodx Africa 2020",
    edition: "",
    dates: { display: "22-25 September 2020", start: "2020-09-22", end: "2020-09-25" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/AGRI-FOOD-AFRICA.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://www.enterprising-africa.com/Agrifood/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Health & Wellness Expo & Conferences-2020",
    name: "Health & Wellness Expo & Conferences-2020",
    edition: "",
    dates: { display: "21-25 August 2020", start: "2020-08-21", end: "2020-08-25" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/HEALTH-AND-WELLNESS.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://www.virtualhealthandwellnessexpo.com/",
      facebook: "https://www.facebook.com/events/2632272477089765/",
      // instagram: "https://www.instagram.com/nepalagritech/",
      // linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Buildcon International EXPO 2020",
    name: "Nepal Buildcon International EXPO 2020",
    edition: "",
    dates: { display: "21-23 May 2020", start: "2020-06-21", end: "2020-06-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/6th-Nepal-Buildcon-2020.jpg",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "Nepal Wood International EXPO 2020",
    name: "Nepal Wood International EXPO 2020",
    edition: "",
    dates: { display: "28-30 May 2020", start: "2020-06-28", end: "2020-06-30" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/events/Nepal-Wood-2020.jpg",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
    socials: {
      website: "http://nepalwood.com.np/",
      facebook: "https://www.facebook.com/NepalWood",
      // instagram: "https://www.instagram.com/iievshow/",
      // linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
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
