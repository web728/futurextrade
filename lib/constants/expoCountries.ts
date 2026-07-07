// Countries where Futurex runs exhibitions, mapped to real topojson numeric
// IDs from world-atlas's countries-110m.json (ISO 3166-1 numeric codes) so
// WorldExpoMap can highlight them directly against the map's own feature data.

export type ExpoCountry = {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  summary: string;
};

export const EXPO_HUB: ExpoCountry = {
  id: "356",
  name: "India",
  coordinates: [79, 22],
  summary:
    "Home base — Odisha Mining & Infrastructure Expo, Corru Pack Print India and a growing calendar of sector-focused exhibitions.",
};

export const EXPO_COUNTRIES: ExpoCountry[] = [
  EXPO_HUB,
  {
    id: "524",
    name: "Nepal",
    coordinates: [84, 28],
    summary:
      "Futurex's most active overseas market — Nepal Wood, Nepal Buildcon, Nepal Agritech and Nepal Food & Beverages Expo all run in Kathmandu and Bharatpur.",
  },
  {
    id: "050",
    name: "Bangladesh",
    coordinates: [90, 23.8],
    summary:
      "Dhaka hosts Bangladesh Wood, Bangladesh Buildcon and Bangladesh Elprotech — connecting regional manufacturers with construction, timber and power-sector buyers.",
  },
  {
    id: "144",
    name: "Sri Lanka",
    coordinates: [80.7, 7.5],
    summary:
      "An emerging platform for Futurex, extending its South Asian trade network into Colombo's business community.",
  },
  {
    id: "064",
    name: "Bhutan",
    coordinates: [90.4, 27.5],
    summary:
      "Part of Futurex's regional reach, bringing trade platform access to Bhutan's growing business and construction sectors.",
  },
  {
    id: "404",
    name: "Kenya",
    coordinates: [37.9, 0.2],
    summary:
      "Futurex's East African gateway — extending B2B trade exhibitions to Nairobi's manufacturing, construction and agriculture communities.",
  },
  {
    id: "800",
    name: "Uganda",
    coordinates: [32.3, 1.4],
    summary:
      "Expanding Futurex's East African footprint with trade platforms for Kampala's growing industrial and business sectors.",
  },
];
