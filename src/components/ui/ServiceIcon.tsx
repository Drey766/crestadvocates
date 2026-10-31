import {
  BriefcaseBusiness,
  Building2,
  Handshake,
  House,
  Lightbulb,
  MessagesSquare,
  Receipt,
  Scale,
  ScrollText,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

// Lucide icons named in services.json. Add an entry here when a service uses a new icon.
const icons: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  Building2,
  Handshake,
  House,
  Lightbulb,
  MessagesSquare,
  Receipt,
  ScrollText,
  UsersRound,
};

/** Decorative service icon; falls back to a neutral mark for unknown names. */
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Scale;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.5} />;
}
