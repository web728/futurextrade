"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/lib/constants/company";
import { HEADER_CTA } from "@/lib/constants/navigation";

export function StickyMobileCTA() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile-only quick-action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy/10 bg-white/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <a
          href={CONTACT.phone.href}
          className="flex flex-col items-center gap-0.5 py-3 text-navy"
        >
          <Phone className="size-5" />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 border-x border-navy/10 py-3 text-navy"
        >
          <MessageCircle className="size-5" />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
        <Link
          href={HEADER_CTA.href}
          className="flex flex-col items-center gap-0.5 bg-cherry py-3 text-white"
        >
          <span className="text-[11px] font-semibold">{HEADER_CTA.label}</span>
        </Link>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-20 right-5 z-40 flex size-11 items-center justify-center rounded-full bg-navy text-white shadow-premium lg:bottom-6"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
