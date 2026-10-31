import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { business } from "@/config/business";
import { whatsappLink } from "@/lib/whatsapp";

const item = "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold";

/** Sticky Call / WhatsApp / Book bar on phones and tablets; hidden from lg up. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="on-navy fixed inset-x-0 bottom-0 z-40 border-t border-navy-line pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex divide-x divide-navy-line">
        <li className="flex flex-1">
          <a href={business.phoneHref} className={`${item} text-white`}>
            <Phone aria-hidden="true" className="size-5 text-gold" />
            Call
          </a>
        </li>
        <li className="flex flex-1">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${item} text-white`}>
            <MessageCircle aria-hidden="true" className="size-5 text-gold" />
            WhatsApp
          </a>
        </li>
        <li className="flex flex-1">
          <Link href="/contact" className={`${item} bg-gold text-navy`}>
            <CalendarCheck aria-hidden="true" className="size-5" />
            Book
          </Link>
        </li>
      </ul>
    </nav>
  );
}
