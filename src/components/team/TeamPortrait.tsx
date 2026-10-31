import Image from "next/image";
import { business } from "@/config/business";
import type { TeamMember } from "@/types";
import { cn } from "@/lib/utils";

export function portraitAlt(member: TeamMember): string {
  if (member.slug === business.founder.slug) return `${member.name}, founder of ${business.name}.`;
  return member.title ? `${member.name}, ${member.title} at ${business.name}.` : `${member.name}, ${business.name}.`;
}

/**
 * Square portrait. Until a member has a headshot, shows their initials on navy
 * so the layout stays complete without a placeholder image.
 */
export function TeamPortrait({
  member,
  sizes,
  priority,
  className,
}: {
  member: TeamMember;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!member.photo) {
    const initials = member.name
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join("");
    return (
      <div
        role="img"
        aria-label={member.name}
        className={cn("flex aspect-square w-full items-center justify-center bg-navy", className)}
      >
        <span aria-hidden="true" className="font-display text-6xl tracking-widest text-gold">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={member.photo}
      alt={portraitAlt(member)}
      width={1000}
      height={1000}
      sizes={sizes}
      priority={priority}
      className={cn("aspect-square w-full object-cover", className)}
      style={{ objectPosition: member.photoPosition }}
    />
  );
}
