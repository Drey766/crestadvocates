import { business } from "@/config/business";

/**
 * wa.me link with an optional prefilled message.
 * Never pass confidential details here: the text sits in the URL.
 */
export function whatsappLink(text: string = business.copy.whatsappPrefill): string {
  if (!text) return business.whatsappUrl;
  return `${business.whatsappUrl}?text=${encodeURIComponent(text)}`;
}
