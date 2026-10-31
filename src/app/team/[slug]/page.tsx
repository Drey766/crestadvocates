import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { business } from "@/config/business";
import { FinalCta } from "@/components/home/FinalCta";
import { TeamPortrait } from "@/components/team/TeamPortrait";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { getTeam, getTeamMember } from "@/lib/data";
import { jsonLdString, personSchema } from "@/lib/schema";

const copy = business.team;
const detailKeys = Object.keys(copy.detailLabels) as (keyof typeof copy.detailLabels)[];

// Fully static, so an unknown slug reaches notFound() before streaming starts and returns a real 404
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getTeam().map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: PageProps<"/team/[slug]">): Promise<Metadata> {
  const member = getTeamMember((await params).slug);
  if (!member) return {};
  return {
    title: member.title ? `${member.name}, ${member.title}` : member.name,
    description: member.shortBio || copy.intro,
    alternates: { canonical: `/team/${member.slug}` },
  };
}

// Section rhythm: navy hero · ivory bio and details (only when provided) · navy CTA
export default async function TeamMemberPage({ params }: PageProps<"/team/[slug]">) {
  const member = getTeamMember((await params).slug);
  if (!member) notFound();

  const details = detailKeys
    .map((key) => ({ key, label: copy.detailLabels[key], items: member[key] }))
    .filter((d) => d.items.length > 0);
  const hasBody = member.bio.length > 0 || details.length > 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(personSchema(member)) }} />

      {/* Hero */}
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site relative pb-14 pt-6 md:pb-20 md:pt-8">
          <Link href="/team" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium hover:text-white">
            <ArrowLeft aria-hidden="true" className="size-4" />
            {copy.backLabel}
          </Link>
          <div className="mt-8 grid items-center gap-10 md:mt-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="mx-auto w-full max-w-sm border border-navy-line p-2 md:max-w-none">
              <TeamPortrait member={member} sizes="(min-width: 768px) 40vw, 384px" priority />
            </div>
            <div>
              <p className="eyebrow">{business.name}</p>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">{member.name}</h1>
              {member.title && (
                <p className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
                  {member.title}
                  {member.titleStatus === "confirm" && <DraftBadge />}
                </p>
              )}
              <GoldRule className="mt-8 max-w-xs" />
              {member.shortBio && <p className="mt-8 max-w-xl text-lg leading-relaxed">{member.shortBio}</p>}
              <DraftBadge status={member.status} className="mt-4" />
              {(member.email || member.linkedin) && (
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                  {member.email && (
                    <li>
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
                      >
                        <Mail aria-hidden="true" className="size-4" />
                        <span className="sr-only">{copy.emailLabel}: </span>
                        {member.email}
                      </a>
                    </li>
                  )}
                  {member.linkedin && (
                    <li>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
                      >
                        <ExternalLink aria-hidden="true" className="size-4" />
                        {copy.linkedinLabel}
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio and profile details: each part renders only when provided */}
      {hasBody && (
        <section className="section-padding bg-ivory">
          <div
            className={
              member.bio.length > 0 && details.length > 0
                ? "container-site grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16"
                : "container-site"
            }
          >
            {member.bio.length > 0 && (
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl">
                  {copy.bioHeading} {member.name}
                </h2>
                <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
                  {member.bio.map((paragraph, i) => (
                    <p key={`${member.slug}-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            {details.length > 0 && (
              <div
                className={
                  member.bio.length > 0
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
                    : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {details.map((detail) => (
                  <section key={detail.key} aria-labelledby={`detail-${detail.key}`} className="card">
                    <h2 id={`detail-${detail.key}`} className="eyebrow font-sans">
                      {detail.label}
                    </h2>
                    <ul className="mt-4 space-y-2 text-ink">
                      {detail.items.map((item, i) => (
                        <li key={`${detail.key}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
