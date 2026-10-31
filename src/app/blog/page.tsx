import type { Metadata } from "next";
import { business } from "@/config/business";
import { PostsExplorer } from "@/components/blog/PostsExplorer";
import { FinalCta } from "@/components/home/FinalCta";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { getPostCategories, getPosts } from "@/lib/data";

const copy = business.insights;

export const metadata: Metadata = {
  title: copy.eyebrow,
  description: copy.intro,
  alternates: { canonical: "/blog" },
};

// Section rhythm: navy hero · ivory featured post and grid · navy CTA
export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site section-padding relative">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{copy.heading}</h1>
          <GoldRule className="mt-8 max-w-xs" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">{copy.intro}</p>
        </div>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="articles" className="section-padding bg-ivory">
          <div className="container-site">
            <h2 id="articles" className="sr-only">
              {copy.eyebrow}
            </h2>
            <PostsExplorer posts={posts} categories={getPostCategories()} />
          </div>
        </section>
      )}

      <FinalCta heading={copy.ctaHeading} text={copy.ctaText} />
    </>
  );
}
