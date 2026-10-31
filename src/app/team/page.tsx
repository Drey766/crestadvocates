import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { FinalCta } from "@/components/home/FinalCta";
import { TeamCard } from "@/components/team/TeamCard";
import { TeamPortrait } from "@/components/team/TeamPortrait";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { getTeam } from "@/lib/data";

const copy = business.team;

export const metadata: Metadata = {
  title: copy.eyebrow,
  description: copy.intro,
  alternates: { canonical: "/team" },
};

// Section rhythm: navy hero · ivory spotlight (+ grid when there is more than one member) · navy CTA.
// The founder (or the first member) gets the spotlight; everyone else goes in the grid.
export default function TeamPage() {
  const team = getTeam();
  const lead = team.find((m) => m.slug === business.founder.slug) ?? team[0];
  const others = team.filter((m) => m !== lead);
  const leadBio = lead && (lead.bio.length > 0 ? lead.bio : [lead.shortBio].filter(Boolean));

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

      {lead && (
        <div className="section-padding bg-ivory">
          <section
            aria-labelledby={`member-${lead.slug}`}
            className="container-site grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
          >
            <div className="mx-auto w-full max-w-sm border border-gold/50 p-2 md:max-w-none">
              <TeamPortrait member={lead} sizes="(min-width: 768px) 40vw, 384px" priority />
            </div>
            <div className="md:pt-4">
              <h2 id={`member-${lead.slug}`} className="text-4xl md:text-5xl">
                {lead.name}
              </h2>
              {lead.title && (
                <p className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold-text">
                  {lead.title}
                  {lead.titleStatus === "confirm" && <DraftBadge />}
                </p>
              )}
              <GoldRule className="mt-6 max-w-40" />
              <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
                {leadBio.map((paragraph, i) => (
                  <p key={`${lead.slug}-bio-${i}`}>{paragraph}</p>
                ))}
              </div>
              <DraftBadge status={lead.status} className="mt-4" />
              <div className="mt-8">
                <Link href={`/team/${lead.slug}`} className="btn-outline-navy">
                  {copy.profileLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </section>

          {others.length > 0 && (
            <section aria-labelledby="team-grid" className="container-site mt-20">
              <h2 id="team-grid" className="text-3xl md:text-4xl">
                {copy.gridHeading}
              </h2>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((member) => (
                  <li key={member.slug}>
                    <TeamCard member={member} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <FinalCta />
    </>
  );
}
