import { MessageCircle } from "lucide-react";
import { business } from "@/config/business";
import { whatsappLink } from "@/lib/whatsapp";

const ui = business.copy.ui;

/** Small floating WhatsApp link on desktop (the mobile bar covers smaller screens). */
export function WhatsAppPill() {
  return (
    <aside aria-label={ui.quickContactLabel} className="fixed bottom-6 right-6 z-40 hidden lg:block">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="on-navy inline-flex min-h-12 items-center gap-2 rounded-full border border-gold/60 px-5 text-sm font-semibold text-white shadow-lg transition-colors hover:border-gold hover:text-gold"
      >
        <MessageCircle aria-hidden="true" className="size-5 text-gold" />
        {ui.whatsapp}
      </a>
    </aside>
  );
}
