import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { business } from "@/config/business";
import { PostCard } from "@/components/blog/PostCard";
import { PostCover } from "@/components/blog/PostCover";
import { FinalCta } from "@/components/home/FinalCta";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { getMorePosts, getPostBySlug, getPosts } from "@/lib/data";
import { articleSchema, jsonLdString } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

const copy = business.insights;

// Fully static, so an unknown slug reaches notFound() before streaming starts and returns a real 404
export const ensureStatic = "navigation";

// Reads params outside <Suspense> on purpose. Moving the read inside it would put the whole page
// in a hidden <div> until JavaScript reveals it, leaving visitors and crawlers without JS a blank page.
export const instant = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  // A page's openGraph replaces the layout's whole object, so the preview image, site name and
  // locale must be repeated here or shared posts show no picture
  const image = post.cover
    ? { url: post.cover, width: 1200, height: 800, alt: post.title }
    : { url: "/images/og-image.jpg", width: 1200, height: 630, alt: `${business.name} logo` };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "en_KE",
      siteName: business.name,
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.created_at,
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}

// Section rhythm: navy hero · white article · ivory more insights · navy CTA
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  const more = getMorePosts(post);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(articleSchema(post)) }} />

      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site relative pb-14 pt-6 md:pb-20 md:pt-8">
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium hover:text-white">
            <ArrowLeft aria-hidden="true" className="size-4" />
            {copy.backLabel}
          </Link>
          <div className="mt-8 grid items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            <div>
              <p className="eyebrow flex flex-wrap items-center gap-3">
                {post.category}
                <DraftBadge status={post.status} />
              </p>
              <h1 className="mt-5 text-4xl sm:text-5xl">{post.title}</h1>
              <GoldRule className="mt-8 max-w-xs" />
              <p className="mt-8 text-sm font-medium uppercase tracking-[0.15em]">
                {copy.byLabel} {post.author_name} · <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>{" "}
                · {copy.readTime(post.read_time)}
              </p>
            </div>
            <div className="border border-navy-line p-2">
              <PostCover post={post} size="hero" showLabel={false} priority />
            </div>
          </div>
        </div>
      </section>

      <article className="section-padding bg-white">
        <div className="container-site">
          <p className="mx-auto max-w-2xl font-display text-2xl italic leading-snug text-ink md:text-3xl">
            {post.excerpt}
          </p>
          {/* Content is the firm's own HTML from src/data/blogs.json, not user input */}
          <div className="prose-article mx-auto mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-insights" className="section-padding bg-ivory">
          <div className="container-site">
            <h2 id="more-insights" className="text-3xl md:text-4xl">
              {copy.relatedHeading}
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta heading={copy.ctaHeading} text={copy.ctaText} />
    </>
  );
}
