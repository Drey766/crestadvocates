import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import type { TeamMember } from "@/types";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { TeamPortrait } from "@/components/team/TeamPortrait";

/** Team grid card for light backgrounds: portrait, name, title, short bio. */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team/${member.slug}`}
      className="card group flex h-full flex-col p-3 transition-colors hover:border-gold"
    >
      <TeamPortrait member={member} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
      <span className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="text-2xl">{member.name}</h3>
        {member.title && (
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold-text">
            {member.title}
          </span>
        )}
        {member.shortBio && <span className="mt-3 flex-1 text-sm leading-relaxed">{member.shortBio}</span>}
        <span className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
            {business.team.profileLabel}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          <DraftBadge status={member.status} />
        </span>
      </span>
    </Link>
  );
}
