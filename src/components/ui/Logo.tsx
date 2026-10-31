import Image from "next/image";
import { business } from "@/config/business";
import { cn } from "@/lib/utils";

// Both image files have the logo navy baked in: use them on bg-navy only.

/** The shield mark on its own. */
export function LogoShield({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo-shield.png"
      alt=""
      width={410}
      height={454}
      style={{ width: size, height: "auto" }}
      className={className}
    />
  );
}

/** The full stacked logo (1080x1080 square). */
export function LogoStacked({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo-stacked.jpg"
      alt={`${business.name} logo`}
      width={1080}
      height={1080}
      sizes="(min-width: 1024px) 360px, 240px"
      priority={priority}
      className={className}
    />
  );
}

/** Navbar/footer lockup: shield plus live-text wordmark. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoShield size={34} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-semibold tracking-[0.25em] text-white">
          {business.shortName.toUpperCase()}
        </span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.42em] text-gold">
          {business.descriptor.toUpperCase()}
        </span>
      </span>
    </span>
  );
}
