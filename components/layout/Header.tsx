"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, HEADER_CTA } from "@/lib/constants/navigation";
import { CONTACT } from "@/lib/constants/company";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm py-4"
          : "bg-white/60 backdrop-blur-sm py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/futurex-logo.png"
            alt="Futurex — Let's Build the Future Together"
            width={210}
            height={55}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:text-cherry",
                    isActive && "text-cherry",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="size-3.5" />}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-cherry"
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full grid w-72 gap-1 rounded-xl border border-navy/10 bg-white p-3 shadow-premium"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-lg px-3 py-2 transition-colors hover:bg-surface"
                        >
                          <p className="text-sm font-semibold text-navy">
                            {child.label}
                          </p>
                          {child.description && (
                            <p className="text-xs text-navy/50">{child.description}</p>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <MotionCTAButton href={HEADER_CTA.href} size="sm">
            {HEADER_CTA.label}
          </MotionCTAButton>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <button
                aria-label="Open menu"
                className="rounded-lg p-2 text-navy lg:hidden"
              />
            }
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
            <SheetHeader>
              <SheetTitle className="text-cherry text-xl font-extrabold">
                Futurex
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 border-l border-navy/10 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-navy/70 hover:text-cherry"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="grid gap-2 border-t border-navy/10 p-4">
              <MotionCTAButton href={HEADER_CTA.href} className="w-full justify-center">
                {HEADER_CTA.label}
              </MotionCTAButton>
              <a
                href={CONTACT.phone.href}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-navy px-6 py-3 text-sm font-semibold text-navy"
              >
                <Phone className="size-4" /> Call Us
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
