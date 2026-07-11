import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/interactive/ScrollProgressBar";
import { CursorGlow } from "@/components/interactive/CursorGlow";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { PageTransition } from "@/components/interactive/PageTransition";
import { SITE_URL } from "@/lib/constants/company";
import "./globals.css";
import { PremiumCursor } from "@/components/interactive/PremiumCursor";

// 1. Premium Geometric Heading Font (Skipping 800/900 for premium refinement)
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// 2. High-Readability Corporate Body Font
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const DEFAULT_TITLE =
  "Futurex Trade Fair and Events Pvt. Ltd. | B2B Exhibitions & Event Management Company";
const DEFAULT_DESCRIPTION =
  "Futurex Trade Fair and Events Private Limited is a professional exhibition and event management company organizing B2B trade fairs, conferences, corporate events and promotional platforms across India, Nepal, Bangladesh, Sri Lanka, Bhutan, Kenya and Uganda.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Futurex Trade Fair and Events",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "exhibition organizer India",
    "trade fair company India",
    "B2B exhibitions Nepal",
    "trade exhibitions Bangladesh",
    "exhibition management Sri Lanka",
    "trade fair Bhutan",
    "exhibitions Kenya",
    "exhibitions Uganda",
    "conference management company",
    "corporate event management India",
    "exhibition stand design",
    "international trade exhibitions",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Futurex Trade Fair and Events",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/logos/futurex-logo.png", width: 1200, height: 630, alt: "Futurex Trade Fair and Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/logos/futurex-logo.png"],
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Futurex Trade Fair and Events Private Limited",
  alternateName: "Futurex",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/futurex-logo.png`,
  foundingDate: "2011",
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "E52, 1st Floor, Kalkaji",
    addressLocality: "New Delhi",
    postalCode: "110019",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98108-55697",
    contactType: "customer service",
    email: "info@futurextrade.com",
    areaServed: ["IN", "NP", "BD", "LK", "BT", "KE", "UG"],
  },
  sameAs: [
    "https://www.linkedin.com",
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://www.youtube.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Added both CSS variables here, replaced 'text-jet' with 'text-navy' for premium grounding, and mapped default font-body
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body bg-white text-navy selection:bg-cherry selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <TooltipProvider>
          <ScrollProgressBar />
          <CursorGlow />
          <Header />
          <PremiumCursor />
          <main className="flex-1 pb-16 lg:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <StickyMobileCTA />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}