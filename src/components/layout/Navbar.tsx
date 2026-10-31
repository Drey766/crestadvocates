import { Suspense } from "react";
import Link from "next/link";
import { business } from "@/config/business";
import { LogoLockup } from "@/components/ui/Logo";
import { NavMenu, NavMenuWithPath } from "./NavMenu";

export function Navbar() {
  return (
    <header className="on-navy sticky top-0 z-40 border-b border-navy-line">
      <div className="container-site relative flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="inline-flex min-h-11 items-center" aria-label={`${business.name}, ${business.copy.ui.homeLinkSuffix}`}>
          <LogoLockup />
        </Link>
        <div className="flex items-center gap-4">
          <Suspense fallback={<NavMenu pathname={null} />}>
            <NavMenuWithPath />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
