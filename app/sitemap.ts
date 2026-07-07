import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/company";
import { SERVICES } from "@/lib/constants/services";
import { EXHIBITIONS } from "@/lib/constants/exhibitions";
import { CONFERENCES } from "@/lib/constants/conferences";
import { INDUSTRIES } from "@/lib/constants/industries";
import { MEDIA_POSTS } from "@/lib/constants/media";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/exhibitions",
    "/conferences",
    "/industries",
    "/exhibitors",
    "/visitors",
    "/sponsors",
    "/gallery",
    "/testimonials",
    "/media",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms-conditions",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...EXHIBITIONS.map((e) => `/exhibitions/${e.slug}`),
    ...CONFERENCES.map((c) => `/conferences/${c.slug}`),
    ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
    ...MEDIA_POSTS.map((m) => `/media/${m.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
