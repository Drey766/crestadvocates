// POST /api/contact — emails a consultation request to the firm.
//
// Rules (BRIEF §9):
// - Nothing is stored. Message bodies and personal details are never logged:
//   server logs carry only an outcome code.
// - "Success" is returned only when the email provider accepted the message.
//   Every other outcome sends the visitor to WhatsApp or phone instead.

import { z } from "zod";
import { Resend } from "resend";
import { business } from "@/config/business";
import { AREA_NOT_SURE, MIN_SUBMIT_MS, consultationSchema, type ContactResponse } from "@/lib/contact";
import { getServiceBySlug, getServices } from "@/lib/data";
import type { ConsultationRequest } from "@/types";

const schema = consultationSchema([...getServices().map((s) => s.slug), AREA_NOT_SURE]);

// ── Rate limit ──
// Best-effort only: this lives in one server instance's memory, so on serverless
// hosting each instance (and every cold start) has its own count. Use a shared
// store such as Upstash or Vercel KV if stronger limits are ever needed.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function respond(body: ContactResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

// ── Email ──
const f = business.contact.form;
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function areaLabel(slug: string): string {
  return slug === AREA_NOT_SURE ? f.notSure : (getServiceBySlug(slug)?.title ?? slug);
}

function emailText(d: ConsultationRequest, area: string): string {
  const rows: [string, string | undefined][] = [
    [f.name, d.name],
    [f.phone, d.phone],
    [f.email, d.email],
    [f.clientType, f.clientTypes[d.clientType]],
    [f.areaOfLaw, area],
    [f.preferredContact, f.contactMethods[d.preferredContact]],
    [f.preferredDate, d.preferredDate],
    [f.preferredTime, d.preferredTime ? f.times[d.preferredTime] : undefined],
  ];
  return [
    `New consultation request from the ${business.name} website.`,
    "",
    ...rows.filter(([, v]) => v).map(([label, v]) => `${label}: ${v}`),
    "",
    `${f.description}`,
    d.description || "(none given)",
    "",
    "The visitor agreed to be contacted about this request.",
  ].join("\n");
}

// ── Optional owner alert via the WhatsApp Cloud API ──
// Business-initiated messages outside WhatsApp's 24-hour customer-service window
// must use a pre-approved template; free-form text alerts would not reliably
// deliver. The template takes three body parameters: name, area of law and
// preferred contact method. No case details are ever sent. Failure is ignored.
async function sendOwnerAlert(d: ConsultationRequest, area: string): Promise<void> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const template = process.env.WHATSAPP_TEMPLATE_NAME;
  const to = process.env.OWNER_WHATSAPP_NUMBER;
  if (!token || !phoneNumberId || !template || !to) return;

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [oneLine(d.name), area, f.contactMethods[d.preferredContact]].map((text) => ({
                type: "text",
                text,
              })),
            },
          ],
        },
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.warn(`[contact] WhatsApp owner alert failed with HTTP ${res.status}`);
  } catch {
    console.warn("[contact] WhatsApp owner alert could not be sent");
  }
}

export async function POST(request: Request) {
  const now = Date.now();

  if (isRateLimited(clientIp(request), now)) {
    return respond({ ok: false, reason: "rate_limited" }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return respond({ ok: false, reason: "invalid", fieldErrors: {} }, 400);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return respond({ ok: false, reason: "invalid", fieldErrors: z.flattenError(parsed.error).fieldErrors }, 400);
  }
  const data = parsed.data;

  // Honeypot filled in: almost certainly a bot. Not reported as success, so a
  // real person caught by browser autofill still sees the WhatsApp/phone fallback.
  if (data.website) {
    return respond({ ok: false, reason: "rejected" }, 400);
  }
  if (now - data.startedAt < MIN_SUBMIT_MS) {
    return respond({ ok: false, reason: "too_fast" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Email is not configured: set RESEND_API_KEY, CONTACT_EMAIL_TO and CONTACT_FROM_EMAIL. The visitor was shown the WhatsApp/phone fallback.",
    );
    return respond({ ok: false, reason: "not_configured" }, 503);
  }

  const area = areaLabel(data.areaOfLaw);
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      ...(data.email ? { replyTo: data.email } : {}),
      subject: `New consultation request — ${area} — ${oneLine(data.name)}`,
      text: emailText(data, area),
    });
    if (error) {
      console.error(`[contact] Email provider rejected the message (${error.name})`);
      return respond({ ok: false, reason: "send_failed" }, 502);
    }
  } catch {
    console.error("[contact] Email provider could not be reached");
    return respond({ ok: false, reason: "send_failed" }, 502);
  }

  await sendOwnerAlert(data, area);
  return respond({ ok: true }, 200);
}
