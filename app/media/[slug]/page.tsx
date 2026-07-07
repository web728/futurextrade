import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/interactive/SectionReveal";
import { HoverLiftCard } from "@/components/interactive/HoverLiftCard";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { MEDIA_POSTS } from "@/lib/constants/media";
import { SITE_URL } from "@/lib/constants/company";

function formatMediaDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return MEDIA_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = MEDIA_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Futurex Media" };
  }

  return {
    title: `${post.title} | Futurex Media`,
    description: post.excerpt,
    alternates: { canonical: `/media/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/media/${post.slug}`,
    },
  };
}

export default async function MediaPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = MEDIA_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = MEDIA_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div
          aria-hidden
          className="absolute -top-24 right-0 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #e32526 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <span className="inline-flex items-center rounded-full bg-cherry/20 px-3 py-1 text-xs font-semibold text-cherry">
              {post.category}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {post.title}
            </h1>
            <time dateTime={post.date} className="mt-5 block text-sm text-white/60">
              {formatMediaDate(post.date)}
            </time>
          </SectionReveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-2xl px-6">
          <SectionReveal>
            <p className="text-lg leading-relaxed text-navy/70">{post.body}</p>
          </SectionReveal>

          <SectionReveal delay={0.1} className="mt-16 rounded-2xl bg-navy px-8 py-12 text-center text-white">
            <h2 className="text-2xl font-bold">
              Interested in participating in a Futurex platform?
            </h2>
            <div className="mt-6 flex justify-center">
              <MotionCTAButton href="/contact" variant="primary">
                Connect With Our Team
              </MotionCTAButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* More Insights */}
      {otherPosts.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionReveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                More Insights
              </h2>
            </SectionReveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((p, i) => (
                <SectionReveal key={p.slug} delay={i * 0.06}>
                  <HoverLiftCard className="flex h-full flex-col">
                    <span className="inline-flex w-fit items-center rounded-full bg-cherry/10 px-3 py-1 text-xs font-semibold text-cherry">
                      {p.category}
                    </span>
                    <h3 className="mt-4 text-base font-bold leading-snug text-navy">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-navy/60">{p.excerpt}</p>
                    <Link
                      href={`/media/${p.slug}`}
                      className="mt-5 text-sm font-semibold text-cherry transition-colors hover:text-cherry-dark"
                    >
                      Read More →
                    </Link>
                  </HoverLiftCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
