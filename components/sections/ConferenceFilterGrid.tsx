"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Layers, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const eliteEase = [0.25, 1, 0.5, 1] as const;

const CONFERENCE_DATA = [
  {
    id: "ev-dynamics-2024-chennai",
    title: "EV Dynamics 2024",
    organizer: "Futurex Conference",
    date: "14th September, 2024",
    year: "2024",
    location: "Chennai, Tamil Nadu",
    tag: "Electric Vehicles",
    gradient: "from-cherry/[0.03] via-transparent to-transparent"
  },
  {
    id: "ev-dynamics-2024-pune",
    title: "EV Dynamics 2024",
    organizer: "Futurex Conference",
    date: "7th December, 2024",
    year: "2024",
    location: "Pune, Maharashtra",
    tag: "Automotive Tech",
    gradient: "from-blue-500/[0.03] via-transparent to-transparent"
  },
  {
    id: "ev-dynamics-2023-chennai",
    title: "EV Dynamics 2023",
    organizer: "Futurex Conference",
    date: "27th May, 2023",
    year: "2023",
    location: "Chennai, Tamil Nadu",
    tag: "Clean Energy",
    gradient: "from-emerald-500/[0.03] via-transparent to-transparent"
  },
  {
    id: "ev-dynamics-2022-pune",
    title: "EV Dynamic Conference 2022",
    organizer: "Futurex Conference",
    date: "14th November, 2022",
    year: "2022",
    location: "Pune, Maharashtra",
    tag: "E-Mobility",
    gradient: "from-purple-500/[0.03] via-transparent to-transparent"
  }
];

export function ConferenceFilterGrid() {
  const years = useMemo(() => {
    const allYears = CONFERENCE_DATA.map(item => item.year);
    return Array.from(new Set(allYears)).sort((a, b) => Number(b) - Number(a));
  }, []);

  const [selectedYear, setSelectedYear] = useState<string>(years[0] || "2024");

  const filteredConferences = useMemo(() => {
    return CONFERENCE_DATA.filter(conf => conf.year === selectedYear);
  }, [selectedYear]);

  return (
    <div className="w-full space-y-12 py-6">
      
      {/* 1. Controller Switcher - Light Luxury Style */}
      <div className="flex justify-center items-center">
        <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200/80 backdrop-blur-xl shadow-sm relative z-30">
          {years.map((year) => {
            const isActive = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "relative px-6 py-2.5 rounded-full text-xs font-black tracking-widest transition-all duration-500 uppercase shrink-0 select-none",
                  isActive ? "text-white" : "text-navy/50 hover:text-navy/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeYearPill"
                    className="absolute inset-0 bg-gradient-to-r from-cherry to-[#ef4444] rounded-full shadow-[0_4px_15px_rgba(227,37,38,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{year} Edition</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Timeline Dynamic Flow Grid */}
      <div className="relative min-h-[350px]">
        {/* Light central tracking grid line */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-slate-200 via-slate-200/40 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 gap-8 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredConferences.map((conf, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={conf.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: eliteEase }}
                  className={cn(
                    "w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  
                  {/* Content Container Frame */}
                  <div className="w-full md:w-[calc(50%-24px)] group relative">
                    <div className="relative overflow-hidden rounded-[24px] bg-white border border-slate-200/70 p-6 sm:p-8 transition-all duration-500 hover:border-cherry/30 hover:shadow-[0_25px_50px_-20px_rgba(4,8,18,0.08)]">
                      
                      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", conf.gradient)} />
                      
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-[9px] font-black text-cherry uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-cherry/5 border border-cherry/10">
                          {conf.tag}
                        </span>
                        <div className="flex items-center gap-1 text-navy/30 group-hover:text-navy/60 transition-colors">
                          <Layers className="size-3.5" />
                          <span className="text-[10px] font-bold tracking-wider uppercase">{conf.organizer}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-navy tracking-wide mb-6 group-hover:text-cherry transition-colors duration-300 flex items-start justify-between gap-4">
                        <span className="line-clamp-2">{conf.title}</span>
                        <ArrowUpRight className="size-5 text-navy/20 group-hover:text-cherry group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1" />
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-medium text-navy/60">
                        <div className="flex items-center gap-2.5">
                          <div className="size-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            <Calendar className="size-3.5 text-navy/40" />
                          </div>
                          <span className="truncate">{conf.date}</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="size-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            <MapPin className="size-3.5 text-navy/40" />
                          </div>
                          <span className="truncate">{conf.location}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Timeline Center Node */}
                  <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20 mt-8 md:mt-0">
                    <div className="size-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-cherry transition-colors duration-500 shadow-sm">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="size-1.5 rounded-full bg-cherry shadow-[0_0_8px_rgba(227,37,38,0.5)]" 
                      />
                    </div>
                  </div>

                  <div className="hidden md:block w-[calc(50%-24px)]" />

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}