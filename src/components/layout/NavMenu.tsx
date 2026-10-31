"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { business } from "@/config/business";
import { mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";

const ui = business.copy.ui;

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop links, CTA and mobile menu. `pathname` is null in the prerender fallback. */
export function NavMenu({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav aria-label={ui.mainNavLabel} className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors hover:text-gold",
                    active ? "text-gold" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link href="/contact" className="btn-gold hidden lg:inline-flex">
        {business.copy.primaryCta}
      </Link>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center text-white lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? ui.closeMenu : ui.openMenu}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={ui.mobileNavLabel}
          className="absolute inset-x-0 top-full border-t border-navy-line bg-navy pb-6 shadow-lg lg:hidden"
        >
          <ul className="container-site flex flex-col py-2">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center border-b border-navy-line text-base font-medium",
                      active ? "text-gold" : "text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="container-site">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold w-full">
              {business.copy.primaryCta}
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

/** Reads the pathname; must sit inside <Suspense> because Cache Components is on. */
export function NavMenuWithPath() {
  const pathname = usePathname();
  return <NavMenu pathname={pathname} />;
}
