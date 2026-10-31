import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { business } from "@/config/business";
import { PostCard } from "@/components/blog/PostCard";
import { FinalCta } from "@/components/home/FinalCta";
import { CheckList } from "@/components/ui/CheckList";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { FaqList } from "@/components/ui/FaqList";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getRelatedPosts, getServiceBySlug, getServices } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";

const copy = business.services;

// Fully static, so an unknown slug reaches notFound() before streaming starts and returns a real 404
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

// Section rhythm: navy hero · ivory overview · navy what to expect · ivory FAQs + insights · navy CTA
export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();

  const contactHref = `/contact?service=${service.slug}`;
  const whatsappText = copy.whatsappPrefill(service.title);
  const posts = getRelatedPosts(service).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site relative pb-14 pt-6 md:pb-20 md:pt-8">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {copy.detail.backLabel}
          </Link>
          <div className="mt-8 grid items-center gap-10 md:mt-12 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
                {service.audience.map((a) => copy.audienceLabels[a]).join(" · ")}
                <DraftBadge status={service.status} />
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{service.title}</h1>
              <GoldRule className="mt-8 max-w-xs" />
              <p className="mt-8 max-w-2xl text-lg leading-relaxed">{service.summary}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href={contactHref} className="btn-gold">
                  {business.copy.primaryCta}
                </Link>
                <a
                  href={whatsappLink(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {business.copy.secondaryCta}
                </a>
              </div>
            </div>
            <div aria-hidden="true" className="hidden border border-navy-line p-3 lg:block">
              <div className="flex size-56 items-center justify-center border border-gold/40 bg-navy-raised xl:size-64">
                <ServiceIcon name={service.icon} className="size-24 text-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + how we can help */}
      <section className="section-padding bg-ivory">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            {service.overview.length > 0 && (
              <section aria-labelledby="overview">
                <h2 id="overview" className="text-3xl md:text-4xl">
                  {copy.detail.overviewHeading}
                </h2>
                <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
                  {service.overview.map((paragraph, i) => (
                    <p key={`${service.slug}-overview-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}
            {service.howWeHelp.length > 0 && (
              <section aria-labelledby="how-we-help" className={service.overview.length > 0 ? "mt-14" : undefined}>
                <h2 id="how-we-help" className="text-3xl md:text-4xl">
                  {copy.detail.howWeHelpHeading}
                </h2>
                <CheckList items={service.howWeHelp} className="mt-6 text-base text-ink md:text-lg" />
              </section>
            )}
          </div>

          <aside aria-labelledby="talk-to-us" className="hidden lg:block">
            <div className="on-navy card-dark sticky top-28 p-8">
              <h2 id="talk-to-us" className="text-2xl">
                {copy.detail.asideHeading}
              </h2>
              <p className="mt-3 leading-relaxed">{copy.detail.asideText}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href={contactHref} className="btn-gold">
                  {business.copy.primaryCta}
                </Link>
                <a
                  href={whatsappLink(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {business.copy.secondaryCta}
                </a>
                <a href={business.phoneHref} className="btn-outline-gold">
                  <Phone aria-hidden="true" className="size-4" />
                  {business.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* What to expect */}
      {service.whatToExpect.length > 0 && (
        <section className="on-navy relative overflow-hidden">
          <MountainPattern />
          <div className="container-site section-padding relative">
            <SectionHeading title={copy.detail.whatToExpectHeading} />
            <ol className="mt-12 grid gap-4 md:grid-cols-2">
              {service.whatToExpect.map((step, i) => (
                <li key={`${service.slug}-expect-${i}`} className="card-dark flex gap-5">
                  <span aria-hidden="true" className="font-display text-4xl leading-none text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* FAQs + related insights */}
      {(service.faqs.length > 0 || posts.length > 0) && (
        <div className="section-padding bg-ivory">
          {service.faqs.length > 0 && (
            <section aria-labelledby="service-faqs" className="container-site">
              <div className="max-w-3xl">
                <h2 id="service-faqs" className="text-3xl md:text-4xl">
                  {copy.detail.faqsHeading}
                </h2>
                <FaqList items={service.faqs} className="mt-8" />
              </div>
            </section>
          )}
          {posts.length > 0 && (
            <section
              aria-labelledby="related-insights"
              className={service.faqs.length > 0 ? "container-site mt-20" : "container-site"}
            >
              <h2 id="related-insights" className="text-3xl md:text-4xl">
                {copy.detail.insightsHeading}
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <FinalCta
        heading={business.copy.finalCtaHeading}
        text={copy.detail.ctaText}
        contactHref={contactHref}
        whatsappText={whatsappText}
      />
    </>
  );
}
