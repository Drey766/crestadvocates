import Link from "next/link";
import { business } from "@/config/business";
import type { BlogPost } from "@/types";
import { GeneratedCover } from "@/components/blog/GeneratedCover";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { formatDate } from "@/lib/utils";

/** Insights post card for light backgrounds. */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-gold"
    >
      <GeneratedCover category={post.category} />
      <span className="flex flex-1 flex-col p-6">
        <DraftBadge status={post.status} className="self-start" />
        <h3 className="mt-3 text-2xl group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
          {post.title}
        </h3>
        <span className="mt-3 flex-1 text-sm leading-relaxed">{post.excerpt}</span>
        <span className="mt-5 text-xs font-medium uppercase tracking-[0.15em]">
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time> ·{" "}
          {business.insights.readTime(post.read_time)}
        </span>
      </span>
    </Link>
  );
}
