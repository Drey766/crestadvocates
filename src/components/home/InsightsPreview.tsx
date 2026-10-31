import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPosts } from "@/lib/data";

/** The three latest Insights posts. Hidden when there are none. */
export function InsightsPreview() {
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;
  const copy = business.home.insights;

  return (
    <section className="section-padding bg-ivory">
      <div className="container-site">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} intro={copy.intro} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
        <Link href="/blog" className="btn-outline-navy mt-10">
          {copy.linkLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
