"use client";

import { useState } from "react";
import { business } from "@/config/business";
import type { BlogPost } from "@/types";
import { FeaturedPostCard } from "@/components/blog/FeaturedPostCard";
import { PostCard } from "@/components/blog/PostCard";
import { cn } from "@/lib/utils";

/** Category chips above the Insights grid. With "All topics", the newest post is featured. */
export function PostsExplorer({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const copy = business.insights;
  const visible = category ? posts.filter((p) => p.category === category) : posts;
  const featured = category ? undefined : visible[0];
  const rest = featured ? visible.slice(1) : visible;
  const chips = [{ value: null, label: copy.allLabel }, ...categories.map((c) => ({ value: c, label: c }))];

  return (
    <>
      {categories.length > 1 && (
        <div role="group" aria-label={copy.filterLabel} className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const active = chip.value === category;
            return (
              <button
                key={chip.label}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(chip.value)}
                className={cn(
                  "min-h-11 rounded-sm border px-4 text-sm font-semibold transition-colors",
                  active ? "border-navy bg-navy text-white" : "border-navy/20 bg-white text-navy hover:border-navy",
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      )}
      <p aria-live="polite" className="sr-only">
        {copy.resultsLabel(visible.length)}
      </p>
      {featured && (
        <div className="mt-8">
          <FeaturedPostCard post={featured} />
        </div>
      )}
      {rest.length > 0 && (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
