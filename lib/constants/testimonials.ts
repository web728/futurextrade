// SINGLE SOURCE OF TRUTH — testimonials.
// Organization names below are real associations referenced on the live futurextrade.com
// site. Exact quote wording is paraphrased from general praise themes on the live site
// and MUST be confirmed verbatim with each organization (and permission granted) before
// publishing — see each entry's TODO.

export type Testimonial = {
  id: string;
  name: string;
  designation: string;
  company: string;
  eventOrIndustry: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "mahindra-swaraj",
    name: "Representative",
    designation: "Business Head",
    company: "Mahindra & Swaraj",
    eventOrIndustry: "Agriculture",
    quote:
      "Futurex platforms gave us access to a genuinely engaged, high-intent business audience and smooth on-ground coordination throughout the event.",
  },
  {
    id: "maris-polymers",
    name: "Representative",
    designation: "Marketing Head",
    company: "Maris Polymers",
    eventOrIndustry: "Plastics & Packaging",
    quote:
      "The quality of visitors and the professional execution made this one of the most productive exhibitions we have participated in.",
  },
  {
    id: "elcon-fasteners",
    name: "Representative",
    designation: "Sales Director",
    company: "Elcon Fasteners",
    eventOrIndustry: "Industrial Machinery",
    quote:
      "From stall setup to visitor footfall, the Futurex team managed every detail with clarity and professionalism.",
  },
  {
    id: "phd-chamber",
    name: "Representative",
    designation: "Committee Member",
    company: "PHD Chamber of Commerce and Industry",
    eventOrIndustry: "Trade Facilitation",
    quote:
      "Futurex has consistently created platforms that bring the right industry stakeholders together for meaningful business dialogue.",
  },
  {
    id: "bhutan-cci",
    name: "Representative",
    designation: "Trade Delegate",
    company: "Bhutan Chamber of Commerce & Industry",
    eventOrIndustry: "International Trade",
    quote:
      "The exhibition opened valuable cross-border business conversations for our member companies.",
  },
  {
    id: "cdc-events",
    name: "Representative",
    designation: "Partner",
    company: "CDC Events",
    eventOrIndustry: "Event Partnership",
    quote:
      "Working with Futurex has been a consistently well-organized and collaborative experience across multiple editions.",
  },
];

// TODO: Replace paraphrased quotes above with verbatim, permission-cleared testimonials
// from each organization before this page goes live — per brand guidance to "use only
// verified testimonials and clean the language before publishing."
