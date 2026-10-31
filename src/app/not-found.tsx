import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { mainNav } from "@/config/nav";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";

const copy = business.notFound;

export default function NotFound() {
  const links = mainNav.filter((item) => item.href !== "/");

  return (
    <section className="on-navy relative overflow-hidden">
      <MountainPattern />
      <div className="container-site section-padding relative">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{copy.heading}</h1>
        <GoldRule className="mt-8 max-w-xs" />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed">{copy.text}</p>
        <Link href="/" className="btn-gold mt-10">
          {copy.homeLabel}
        </Link>
        <ul className="mt-10 grid max-w-xl gap-x-8 sm:grid-cols-2">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-12 items-center justify-between gap-3 border-b border-navy-line text-white hover:text-gold"
              >
                {item.label}
                <ArrowRight aria-hidden="true" className="size-4 text-gold" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
