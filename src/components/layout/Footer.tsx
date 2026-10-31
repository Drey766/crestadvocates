import Link from "next/link";
import { cacheLife } from "next/cache";
import { business } from "@/config/business";
import { legalNav, mainNav } from "@/config/nav";
import { GoldRule } from "@/components/ui/GoldRule";
import { LogoLockup } from "@/components/ui/Logo";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { whatsappLink } from "@/lib/whatsapp";

// Cache Components flags a bare `new Date()`; cache the year instead.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const linkClass = "inline-flex min-h-11 items-center text-sm transition-colors hover:text-gold";

export function Footer() {
  const socials = [
    { label: "Instagram", href: business.instagramUrl },
    { label: "LinkedIn", href: business.linkedinUrl },
    { label: "Facebook", href: business.facebookUrl },
  ].filter((s) => s.href);
  const location = [business.address, business.city].filter(Boolean).join(", ");

  return (
    <footer className="on-navy relative overflow-hidden border-t border-navy-line">
      <MountainPattern />
      <div className="container-site relative py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoLockup />
            <p className="mt-5 font-display text-xl italic text-gold">{business.tagline}</p>
            <p className="mt-2 text-sm">{business.copy.footerLine}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow font-sans">Explore</h2>
            <ul className="mt-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow font-sans">Contact</h2>
            <ul className="mt-3">
              <li>
                <a href={business.phoneHref} className={linkClass}>
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
              {business.email && (
                <li>
                  <a href={`mailto:${business.email}`} className={linkClass}>
                    {business.email}
                  </a>
                </li>
              )}
              {location && <li className="py-2 text-sm">{location}</li>}
              {business.hours && <li className="py-2 text-sm">{business.hours}</li>}
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GoldRule className="mt-12" />

        <div className="mt-8 flex flex-col gap-4 text-xs leading-relaxed md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">{business.legal.disclaimer}</p>
          <div className="flex shrink-0 flex-col gap-1 md:items-end">
            <ul className="flex gap-5">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              © <CopyrightYear /> {business.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
