"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatedRevealGrid } from "@/components/interactive/AnimatedRevealGrid";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MEDIA_CATEGORIES, MEDIA_POSTS } from "@/lib/constants/media";
import { MICROCOPY } from "@/lib/constants/company";
import { cn } from "@/lib/utils";

function formatMediaDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function MediaGrid() {
  const [activeFilter, setActiveFilter] = useState<(typeof MEDIA_CATEGORIES)[number]>("All");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return MEDIA_POSTS;
    return MEDIA_POSTS.filter((post) => post.category === activeFilter);
  }, [activeFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {MEDIA_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300",
              activeFilter === category
                ? "border-cherry bg-cherry text-white"
                : "border-navy/15 bg-white text-navy/70 hover:border-navy/30 hover:text-navy",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <p className="mt-16 text-center text-navy/50">{MICROCOPY.blogEmpty}</p>
      ) : (
        <AnimatedRevealGrid
          className="mt-12 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          animateLayout
        >
          {filteredPosts.map((post) => (
            <HoverLiftCard key={post.slug} className="flex h-full flex-col">
              <span className="inline-flex w-fit items-center rounded-full bg-cherry/10 px-3 py-1 text-xs font-semibold text-cherry">
                {post.category}
              </span>
              <h2 className="mt-4 text-lg font-bold leading-snug text-navy">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-navy/60">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between">
                <time dateTime={post.date} className="text-xs font-medium text-navy/40">
                  {formatMediaDate(post.date)}
                </time>
                <Link
                  href={`/media/${post.slug}`}
                  className="text-sm font-semibold text-cherry transition-colors hover:text-cherry-dark"
                >
                  Read More →
                </Link>
              </div>
            </HoverLiftCard>
          ))}
        </AnimatedRevealGrid>
      )}
    </div>
  );
}
