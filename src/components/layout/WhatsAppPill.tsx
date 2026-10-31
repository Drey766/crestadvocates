import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

/** Small floating WhatsApp link on desktop (the mobile bar covers smaller screens). */
export function WhatsAppPill() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="on-navy fixed bottom-6 right-6 z-40 hidden min-h-12 items-center gap-2 rounded-full border border-gold/60 px-5 text-sm font-semibold text-white shadow-lg transition-colors hover:border-gold hover:text-gold lg:inline-flex"
    >
      <MessageCircle aria-hidden="true" className="size-5 text-gold" />
      WhatsApp
    </a>
  );
}
