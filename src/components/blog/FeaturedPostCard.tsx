import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import type { BlogPost } from "@/types";
import { PostCover } from "@/components/blog/PostCover";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { formatDate } from "@/lib/utils";

/** Wide card for the latest post at the top of /blog. */
export function FeaturedPostCard({ post }: { post: BlogPost }) {
  const copy = business.insights;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group grid overflow-hidden p-0 transition-colors hover:border-gold md:grid-cols-2"
    >
      <PostCover post={post} size="hero" className="md:aspect-auto md:h-full" />
      <span className="flex flex-col justify-center p-6 md:p-10">
        <span className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">{copy.featuredLabel}</span>
          <DraftBadge status={post.status} />
        </span>
        <h3 className="mt-4 text-3xl md:text-4xl group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
          {post.title}
        </h3>
        <span className="mt-4 leading-relaxed">{post.excerpt}</span>
        <span className="mt-6 text-xs font-medium uppercase tracking-[0.15em]">
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time> · {copy.readTime(post.read_time)}
        </span>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
          {copy.readLabel}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}
