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
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-1.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
    id: "nepal-agritech-expo-2026",
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
    id: "nepal-buildcon-expo-2026",
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
    id: "corru-pack-print-india-2026",
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
    id: "nepal-wood-expo-2025",
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
    id: "bangladesh-wood-expo-2025",
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
    id: "bangladesh-buildcon-expo-2025",
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
  },
  {
    id: "nepal-agritech-expo-2025",
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
    id: "nepal-food-beverages-expo-2025",
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
    id: "nepal-buildcon-expo-2025",
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
    id: "odisha-mining-infrastructure-expo-2025",
    name: "Odisha Mining and Infrastructure International Expo",
    edition: "3rd Edition",
    dates: { display: "6–9 March 2025", start: "2025-03-06", end: "2025-03-09" },
    venue: { city: "Baramunda Ground, Bhubaneswar", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Kenya Buildcon International Expo",
    name: "Kenya Buildcon International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 June 2024", start: "2024-06-06", end: "2025-06-08" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Kenya Wood International Expo",
    name: "Kenya Wood International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 June 2024", start: "2024-06-06", end: "2025-06-08" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Uganda Buildcon International Expo",
    name: "Uganda Buildcon International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 August 2024", start: "2024-06-06", end: "2025-06-08" },
    venue: { city: "Kampala", country: "Uganda" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },  
   {
    id: "3rd Nepal Electric, Power and Light International Expo",
    name: "3rd Nepal Electric, Power and Light International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "2nd Nepal Consumer Electronics Home Appliances International Expo",
    name: "2nd Nepal Consumer Electronics Home Appliances International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "5th Edition India International Ev Show",
    name: "5th Edition India International Ev Show",
    edition: "3rd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Chennai Trade Centre, Nandambakkam, Chennai", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Auto Component International Expo",
    name: "Auto Component International Expo",
    edition: "",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2025-09-08" },
    venue: { city: "Chennai Trade Centre, Nandambakkam, Chennai, Tamil Nadu", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "13th Bhutan Construction and Wood Expo",
    name: "13th Bhutan Construction and Wood Expo",
    edition: "",
    dates: { display: "18–21 October 2024", start: "2024-10-18", end: "2025-10-21" },
    venue: { city: "Changlimithang Stadium Parking, Thimphu", country: "Bhutan" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "2nd Odisha Plast International Expo 2024",
    name: "2nd Odisha Plast International Expo 2024",
    edition: "",
    dates: { display: "21-24 November 2024", start: "2024-11-21", end: "2025-11-24" },
    venue: { city: "Janata Maidan, Bhubaneswar, Odisha", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Propack International Expo 2024",
    name: "Propack International Expo 2024",
    edition: "",
    dates: { display: "21-24 November 2024", start: "2024-11-21", end: "2025-11-24" },
    venue: { city: "Janata Maidan, Bhubaneswar, Odisha", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "6th Edition India International Ev Show",
    name: "6th Edition India International Ev Show",
    edition: "",
    dates: { display: "6-8 December 2024", start: "2024-12-06", end: "2025-12-08" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Pack Print International Expo",
    name: "Nepal Pack Print International Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2024-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "4th Nepal Pharma International Expo",
    name: "4th Nepal Pharma International Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2025-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Hospital Surgical & Medical Equipment Expo",
    name: "Nepal Hospital Surgical & Medical Equipment Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2024-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "2nd Uganda Buildcon International Expo",
    name: "2nd Uganda Buildcon International Expo",
    edition: "",
    dates: { display: "10-12 August 2023", start: "2023-08-10", end: "2023-08-10" },
    venue: { city: "UMA Show Grounds Lugogo, Kampala", country: "Uganda" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Ride Nepal International Expo",
    name: "Ride Nepal International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal EV International Expo",
    name: "Nepal EV International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Electric, Power and Light International Expo",
    name: "Nepal Electric, Power and Light International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Consumer Electronics Home Appliances International Expo",
    name: "Nepal Consumer Electronics Home Appliances International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Mobile International Expo",
    name: "Nepal Mobile International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "12th Bhutan Construction & Wood Expo",
    name: "12th Bhutan Construction & Wood Expo",
    edition: "",
    dates: { display: "06-09 October 2023", start: "2023-10-06", end: "2023-10-09" },
    venue: { city: "Changlimithang Stadium Parking, Thimphu", country: "Bhutan" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "7th Bangladesh Wood International Expo",
    name: "7th Bangladesh Wood International Expo",
    edition: "",
    dates: { display: "23-25 November 2023", start: "2023-11-23", end: "2023-11-25" },
    venue: { city: " ICCB, Dhaka", country: "Bangladesh" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "7th Bangladesh Buildcon International Expo",
    name: "7th Bangladesh Buildcon International Expo",
    edition: "",
    dates: { display: "23-25 November 2023", start: "2023-11-23", end: "2023-11-25" },
    venue: { city: " ICCB, Dhaka", country: "Bangladesh" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "3rd India International EV Show",
    name: "3rd India International EV Show",
    edition: "",
    dates: { display: "01-03 December 2023", start: "2023-12-01", end: "2023-12-03" },
    venue: { city: "Auto Cluster Exhibition Centre, Chinchwad, Pune", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Auto Component International Expo",
    name: "Auto Component International Expo",
    edition: "",
    dates: { display: "01-03 December 2023", start: "2023-12-01", end: "2023-12-03" },
    venue: { city: "Auto Cluster Exhibition Centre, Chinchwad, Pune", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "4th Nepal 5P International Expo",
    name: "4th Nepal 5P International Expo",
    edition: "",
    dates: { display: "21-23 December 2023", start: "2023-12-21", end: "2023-12-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "3rd Nepal Pharmatech International Expo",
    name: "3rd Nepal Pharmatech International Expo",
    edition: "",
    dates: { display: "21-23 December 2023", start: "2023-12-21", end: "2023-12-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Pharmatech International Expo",
    name: "Nepal Pharmatech International Expo",
    edition: "",
    dates: { display: "11-13 March 2022", start: "2022-03-11", end: "2022-03-13" },
    venue: { city: "Futurex Virtual Platform.", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "2nd Nepal 5P International Expo 2022",
    name: "2nd Nepal 5P International Expo 2022",
    edition: "",
    dates: { display: "11-13 March 2022", start: "2022-03-11", end: "2022-03-13" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "7th Nepal Wood International Expo 2022",
    name: "7th Nepal Wood International Expo 2022",
    edition: "",
    dates: { display: "07-09 January 2022", start: "2022-01-07", end: "2022-01-09" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Buildcon International Expo 2022",
    name: "Nepal Buildcon International Expo 2022",
    edition: "",
    dates: { display: "11-13 February 2022", start: "2022-02-11", end: "2022-02-13" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Agritech International EXPO 2022",
    name: "Nepal Agritech International EXPO 2022",
    edition: "",
    dates: { display: "25-27 February 2022", start: "2022-02-25", end: "2022-02-27" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Nepal Food & Beverages Expo 2022",
    name: "Nepal Food & Beverages Expo 2022",
    edition: "",
    dates: { display: "25-27 February 2022", start: "2022-02-25", end: "2022-02-27" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "CHITWAN INTERNATIONAL INDUSTRIAL EXPO 2021",
    name: "CHITWAN INTERNATIONAL INDUSTRIAL EXPO 2021",
    edition: "",
    dates: { display: "17-19 December 2021", start: "2021-12-17", end: "2021-12-19" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Indo Nepal Business Expo & Summit 2021",
    name: "Indo Nepal Business Expo & Summit 2021",
    edition: "",
    dates: { display: "17-19 December 2021", start: "2021-12-17", end: "2021-12-19" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "INDO BHUTAN EXPO 2021",
    name: "INDO BHUTAN EXPO 2021",
    edition: "",
    dates: { display: "16-18 November 2021", start: "2021-11-16", end: "2021-11-18" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "PHIC EXPO 2021",
    name: "PHIC EXPO 2021",
    edition: "",
    dates: { display: "12-14 November 2021", start: "2021-11-12", end: "2021-11-14" },
    venue: { city: "HITEX Exhibition Center, Hyderabad", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "3P Africa International Expo 2021",
    name: "3P Africa International Expo 2021",
    edition: "",
    dates: { display: "15-16 July 2021", start: "2021-07-15", end: "2021-07-16" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "3P Egypt International Expo 2021",
    name: "3P Egypt International Expo 2021",
    edition: "",
    dates: { display: "15-16 June 2021", start: "2021-06-15", end: "2021-06-16" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "India Asean Food Beverage & Packaging Virtual Expo 2021",
    name: "India Asean Food Beverage & Packaging Virtual Expo 2021",
    edition: "",
    dates: { display: "17-19 April 2021", start: "2021-04-17", end: "2021-04-19" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "VIRTUAL BUILDCON EXPO 2021",
    name: "VIRTUAL BUILDCON EXPO 2021",
    edition: "",
    dates: { display: "24-26 March 2021", start: "2021-03-24", end: "2021-03-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "VIRTUAL BUILDCON EXPO 2021",
    name: "VIRTUAL BUILDCON EXPO 2021",
    edition: "",
    dates: { display: "24-26 March 2021", start: "2021-03-24", end: "2021-03-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "MANUFACTURING ASIA EXPO 2021",
    name: "MANUFACTURING ASIA EXPO 2021",
    edition: "",
    dates: { display: "19-21 March 2021", start: "2021-03-19", end: "2021-03-21" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "INTERNATIONAL EUROPE MANUFACTURING EXPO 2021",
    name: "INTERNATIONAL EUROPE MANUFACTURING EXPO 2021",
    edition: "",
    dates: { display: "18-20 March 2021", start: "2021-03-18", end: "2021-03-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Bangladesh Printpack International Expo 2021",
    name: "Bangladesh Printpack International Expo 2021",
    edition: "",
    dates: { display: "10-13 March 2021", start: "2021-03-10", end: "2021-03-13" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Business Women Expo 2021",
    name: "Business Women Expo 2021",
    edition: "",
    dates: { display: "06-08 March 2021", start: "2021-03-06", end: "2021-03-08" },
    venue: { city: "Hitech City Hyderabad", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "India Sourcing E Exhibition 2021",
    name: "India Sourcing E Exhibition 2021",
    edition: "",
    dates: { display: "24-26 March 2021", start: "2021-03-24", end: "2021-03-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Virtual Sri Lanka 5P International EXPO 2021",
    name: "Virtual Sri Lanka 5P International EXPO 2021",
    edition: "",
    dates: { display: "23-26 February 2021", start: "2021-02-23", end: "2021-02-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Virtual Nepal 5P International Expo 2021",
    name: "Virtual Nepal 5P International Expo 2021",
    edition: "",
    dates: { display: "20-23 January 2021", start: "2021-01-20", end: "2021-01-23" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Virtual Buildcon International Expo 2020",
    name: "Virtual Buildcon International Expo 2020",
    edition: "",
    dates: { display: "17-20 December 2020", start: "2020-12-17", end: "2020-12-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Virtual Wood International Expo 2020",
    name: "Virtual Wood International Expo 2020",
    edition: "",
    dates: { display: "17-20 December 2020", start: "2020-12-17", end: "2020-12-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
   {
    id: "Infratech International Expo",
    name: "Infratech International Expo",
    edition: "",
    dates: { display: "15-19 October 2020", start: "2020-10-15", end: "2020-10-19" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
      "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
    id: "4px Africa 2020",
    name: "4px Africa 2020",
    edition: "",
    dates: { display: "22-25 Septmber 2020", start: "2020-09-22", end: "2020-09-25" },
    venue: { city: "Bhrikuti Mandap Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
    description:
    "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
   id: "Medx Africa 2020",
   name: "Medx Africa 2020",
   edition: "",
   dates: { display: "22-25 September 2020", start: "2020-09-22", end: "2020-09-25" },
   venue: { city: "Futurex Virtual Platform", country: "" },
   industry: "Mining",
   eventType: "Exhibition",
   heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
   description:
     "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
   id: "Agrifoodx Africa 2020",
   name: "Agrifoodx Africa 2020",
   edition: "",
   dates: { display: "22-25 September 2020", start: "2020-09-22", end: "2020-09-25" },
   venue: { city: "Futurex Virtual Platform", country: "" },
   industry: "Mining",
   eventType: "Exhibition",
   heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
   description:
     "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
   id: "Health & Wellness Expo & Conferences-2020",
   name: "Health & Wellness Expo & Conferences-2020",
   edition: "",
   dates: { display: "21-25 August 2020", start: "2020-08-21", end: "2020-08-25" },
   venue: { city: "Futurex Virtual Platform", country: "" },
   industry: "Mining",
   eventType: "Exhibition",
   heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
   description:
     "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
   id: "Nepal Buildcon International EXPO 2020",
   name: "Nepal Buildcon International EXPO 2020",
   edition: "",
   dates: { display: "21-23 May 2020", start: "2020-06-21", end: "2020-06-23" },
   venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
   industry: "Mining",
   eventType: "Exhibition",
   heroImage: "/images/gallery/exhibitions/odisha-buildcon-expo-2.webp",
   description:
     "A focused B2B platform connecting mining and infrastructure manufacturers, technology providers and buyers across Eastern India.",
  },
  {
   id: "Nepal Wood International EXPO 2020",
   name: "Nepal Wood International EXPO 2020",
   edition: "",
   dates: { display: "28-30 May 2020", start: "2020-06-28", end: "2020-06-30" },
   venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
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
