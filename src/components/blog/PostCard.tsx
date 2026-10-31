import Link from "next/link";
import type { BlogPost } from "@/types";
import { DraftBadge } from "@/components/ui/DraftBadge";

/** Insights post card for light backgrounds. */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card group flex h-full flex-col transition-colors hover:border-gold">
      <span className="flex flex-wrap items-center gap-2">
        <span className="eyebrow">{post.category}</span>
        <DraftBadge status={post.status} />
      </span>
      <h3 className="mt-4 text-2xl group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
      <span className="mt-5 text-xs font-medium uppercase tracking-[0.15em]">{post.read_time} min read</span>
    </Link>
  );
}
