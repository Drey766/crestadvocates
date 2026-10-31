import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { FinalCta } from "@/components/home/FinalCta";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { CheckList } from "@/components/ui/CheckList";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldRule } from "@/components/ui/GoldRule";
import { LogoStacked } from "@/components/ui/Logo";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTeam } from "@/lib/data";

const about = business.about;

export const metadata: Metadata = {
  title: about.eyebrow,
  description: `${business.strapline} ${about.valuesIntro}`,
  alternates: { canonical: "/about" },
};

// Section rhythm: navy hero · ivory · navy · ivory · navy · ivory founder · navy CTA.
// Experience and Credentials sit inside the ivory "Who we are" band so hiding them keeps the rhythm.
export default function AboutPage() {
  const experience = [business.foundedYear ? `Founded in ${business.foundedYear}.` : "", about.experienceNote]
    .filter(Boolean)
    .join(" ");
  const credentials = [
    ...new Set([...about.credentials, ...getTeam().flatMap((m) => [...m.admissions, ...m.memberships])]),
  ];
  const { retainer, oneOff } = about.howWeWork;

  return (
    <>
      {/* Hero */}
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site section-padding relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">{business.strapline}</h1>
            <GoldRule className="mt-8 max-w-xs" />
            <p className="mt-8 font-display text-2xl italic text-gold">{business.pillars.join(" ")}</p>
          </div>
          <LogoStacked priority className="hidden w-72 lg:block" />
        </div>
      </section>

      {/* Who we are (+ Experience, Credentials when provided) */}
      <div className="section-padding bg-ivory">
        <section aria-labelledby="who-we-are" className="container-site">
          <div className="max-w-3xl">
            <h2 id="who-we-are" className="text-3xl md:text-4xl">
              {about.whoWeAre.heading} <DraftBadge status={about.whoWeAre.status} className="ml-2" />
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
              {about.whoWeAre.paragraphs.map((paragraph, i) => (
                <p key={`who-${i}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {experience && (
          <section aria-labelledby="experience" className="container-site mt-16">
            <GoldRule className="max-w-xs" />
            <h2 id="experience" className="mt-10 text-3xl md:text-4xl">
              {about.experienceHeading}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed md:text-lg">{experience}</p>
          </section>
        )}

        {credentials.length > 0 && (
          <section aria-labelledby="credentials" className="container-site mt-16">
            <GoldRule className="max-w-xs" />
            <h2 id="credentials" className="mt-10 text-3xl md:text-4xl">
              {about.credentialsHeading}
            </h2>
            <CheckList items={credentials} className="mt-6 text-ink" />
          </section>
        )}
      </div>

      {/* Mission & vision */}
      <section className="on-navy section-padding">
        <div className="container-site">
          <SectionHeading title={about.missionVisionHeading} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[about.mission, about.vision].map((item) => (
              <figure key={item.label} className="card-dark md:p-8">
                <figcaption className="eyebrow flex flex-wrap items-center gap-3">
                  {item.label}
                  <DraftBadge status={item.status} />
                </figcaption>
                <blockquote className="mt-5 font-display text-2xl italic leading-snug text-white">
                  {item.text}
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <SectionHeading title={about.valuesHeading} intro={about.valuesIntro} />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {business.values.map((value) => (
              <li key={value.title} className="card">
                <GoldRule className="w-16" />
                <h3 className="mt-5 text-2xl">{value.title}</h3>
                <p className="mt-3 leading-relaxed">{value.detail}</p>
                <DraftBadge status={value.status} className="mt-4" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site section-padding relative">
          <SectionHeading title={about.howWeWork.heading} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { ...retainer, href: "/services/business-legal-retainer" },
              { ...oneOff, href: "/services" },
            ].map((item) => (
              <div key={item.title} className="card-dark flex flex-col md:p-8">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed">{item.text}</p>
                <DraftBadge status={item.status} className="mt-4 self-start" />
                <Link
                  href={item.href}
                  className="mt-6 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-gold hover:text-gold-light"
                >
                  {item.linkLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderTeaser tone="ivory" />
      <FinalCta />
    </>
  );
}
