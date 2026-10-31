"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";
import { business } from "@/config/business";
import {
  AREA_NOT_SURE,
  DESCRIPTION_MAX,
  consultationSchema,
  type ContactField,
  type ContactResponse,
} from "@/lib/contact";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

const f = business.contact.form;

export interface AreaOption {
  value: string;
  label: string;
}

type Status = "idle" | "sending" | "success" | "fallback" | "rate_limited" | "too_fast";
type Errors = Partial<Record<ContactField, string>>;

/** Consultation request form. Posts JSON to /api/contact; never shows success unless the email was sent. */
export function ConsultationForm({ areas, defaultArea = "" }: { areas: AreaOption[]; defaultArea?: string }) {
  const options = useMemo(() => [...areas, { value: AREA_NOT_SURE, label: f.notSure }], [areas]);
  const schema = useMemo(() => consultationSchema(options.map((o) => o.value)), [options]);

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [description, setDescription] = useState("");
  const [preferredContact, setPreferredContact] = useState("whatsapp");
  // Name and area are kept for the WhatsApp fallback link (nothing else goes in it)
  const [fallbackText, setFallbackText] = useState<string>();

  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // No past dates (local time). Set on the element so the prerendered HTML has no date in it.
  useEffect(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    if (dateRef.current) dateRef.current.min = today.toISOString().slice(0, 10);
  }, []);

  // The time-to-submit clock starts on load, and restarts after a "too fast" rejection
  useEffect(() => {
    if (status === "idle" || status === "too_fast") startedAt.current ||= Date.now();
    if (status !== "idle" && status !== "sending") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const text = (name: string) => String(values.get(name) ?? "");

    const payload = {
      name: text("name"),
      phone: text("phone"),
      email: text("email"),
      clientType: text("clientType") || undefined,
      areaOfLaw: text("areaOfLaw"),
      preferredContact: text("preferredContact"),
      preferredDate: text("preferredDate"),
      preferredTime: text("preferredTime"),
      description: text("description"),
      consent: values.get("consent") === "on",
      website: text("website"),
      startedAt: startedAt.current,
    };

    const checked = schema.safeParse(payload);
    if (!checked.success) {
      showErrors(z.flattenError(checked.error).fieldErrors, form);
      return;
    }

    setErrors({});
    setStatus("sending");
    const area = options.find((o) => o.value === payload.areaOfLaw)?.label ?? f.notSure;
    setFallbackText(f.whatsappFallbackPrefill(payload.name.trim(), area));

    let result: ContactResponse | undefined;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      result = (await res.json()) as ContactResponse;
    } catch {
      result = undefined;
    }

    if (result?.ok === true) {
      setStatus("success");
      return;
    }
    if (result?.reason === "invalid" && Object.keys(result.fieldErrors).length > 0) {
      setStatus("idle");
      showErrors(result.fieldErrors, form);
      return;
    }
    if (result?.reason === "too_fast") {
      startedAt.current = 0;
      setStatus("too_fast");
      return;
    }
    setStatus(result?.reason === "rate_limited" ? "rate_limited" : "fallback");
  }

  function showErrors(fieldErrors: Partial<Record<ContactField, string[]>>, form: HTMLFormElement) {
    const next: Errors = {};
    for (const [key, messages] of Object.entries(fieldErrors)) {
      if (messages?.[0]) next[key as ContactField] = messages[0];
    }
    setErrors(next);
    setStatus("idle");
    const first = Object.keys(next)[0];
    if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card flex gap-4 p-8 focus:outline-none">
        <CheckCircle2 aria-hidden="true" className="size-7 shrink-0 text-gold-text" />
        <p className="text-lg leading-relaxed text-ink">{business.copy.formSuccess}</p>
      </div>
    );
  }

  const errorIds = (field: ContactField, ...extra: string[]) =>
    [...extra, errors[field] ? `${field}-error` : ""].filter(Boolean).join(" ") || undefined;
  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm font-medium text-danger">
        {errors[field]}
      </p>
    ) : null;
  const invalid = (field: ContactField) => (errors[field] ? true : undefined);
  const required = <span aria-hidden="true"> *</span>;
  const optional = <span className="font-normal text-slate"> ({f.optional})</span>;

  return (
    <div className="card p-6 md:p-8">
      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {(status === "fallback" || status === "rate_limited") && (
          <div className="mb-8 border-l-2 border-gold bg-ivory p-5">
            <p className="leading-relaxed text-ink">
              {status === "rate_limited" ? f.rateLimited : business.copy.formFallback}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(fallbackText)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-navy"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                {business.contact.whatsappCta}
              </a>
              <a href={business.phoneHref} className="btn-outline-navy">
                <Phone aria-hidden="true" className="size-4" />
                {f.callCta} {business.phone}
              </a>
            </div>
          </div>
        )}
        {status === "too_fast" && <p className="mb-6 font-medium text-danger">{f.tooFast}</p>}
        {Object.keys(errors).length > 0 && (
          <p role="alert" className="mb-6 font-medium text-danger">
            {f.errorSummary}
          </p>
        )}
      </div>

      <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="label">
            {f.name}
            {required}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={invalid("name")}
            aria-describedby={errorIds("name")}
            className="input"
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="phone" className="label">
            {f.phone}
            {required}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={20}
            aria-invalid={invalid("phone")}
            aria-describedby={errorIds("phone")}
            className="input"
          />
          {fieldError("phone")}
        </div>

        <div>
          <label htmlFor="email" className="label">
            {f.email}
            {preferredContact === "email" ? required : optional}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={200}
            required={preferredContact === "email"}
            aria-invalid={invalid("email")}
            aria-describedby={errorIds("email", "email-hint")}
            className="input"
          />
          <p id="email-hint" className="mt-2 text-sm">
            {f.emailHint}
          </p>
          {fieldError("email")}
        </div>

        <RadioGroup
          name="clientType"
          legend={f.clientType}
          required={required}
          error={fieldError("clientType")}
          options={Object.entries(f.clientTypes).map(([value, label]) => ({ value, label }))}
        />

        <RadioGroup
          name="preferredContact"
          legend={f.preferredContact}
          required={required}
          error={fieldError("preferredContact")}
          options={Object.entries(f.contactMethods).map(([value, label]) => ({ value, label }))}
          value={preferredContact}
          onChange={setPreferredContact}
        />

        <div className="sm:col-span-2">
          <label htmlFor="areaOfLaw" className="label">
            {f.areaOfLaw}
            {required}
          </label>
          <select
            id="areaOfLaw"
            name="areaOfLaw"
            required
            defaultValue={defaultArea}
            aria-invalid={invalid("areaOfLaw")}
            aria-describedby={errorIds("areaOfLaw")}
            className="input"
          >
            <option value="" disabled>
              {f.areaPlaceholder}
            </option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {fieldError("areaOfLaw")}
        </div>

        <div>
          <label htmlFor="preferredDate" className="label">
            {f.preferredDate}
            {optional}
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            ref={dateRef}
            aria-invalid={invalid("preferredDate")}
            aria-describedby={errorIds("preferredDate")}
            className="input"
          />
          {fieldError("preferredDate")}
        </div>

        <div>
          <label htmlFor="preferredTime" className="label">
            {f.preferredTime}
            {optional}
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            defaultValue=""
            aria-invalid={invalid("preferredTime")}
            aria-describedby={errorIds("preferredTime")}
            className="input"
          >
            <option value="">{f.anyTime}</option>
            {Object.entries(f.times).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {fieldError("preferredTime")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="label">
            {f.description}
            {optional}
          </label>
          <p id="description-notice" className="mb-3 border-l-2 border-gold bg-ivory px-4 py-3 text-sm text-ink">
            {business.legal.formNotice}
          </p>
          <textarea
            id="description"
            name="description"
            rows={5}
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-invalid={invalid("description")}
            aria-describedby={errorIds("description", "description-notice", "description-count")}
            className="input min-h-32"
          />
          <p id="description-count" className="mt-2 text-right text-sm">
            {f.charsLeft(DESCRIPTION_MAX - description.length)}
          </p>
          {fieldError("description")}
        </div>

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor="website">{f.honeypot}</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={invalid("consent")}
              aria-describedby={errorIds("consent")}
              className="mt-0.5 size-6 shrink-0 accent-navy"
            />
            <label htmlFor="consent" className="text-sm leading-relaxed text-ink">
              {f.consent}{" "}
              <Link href="/privacy" className="font-medium underline decoration-gold underline-offset-4">
                {f.consentLink}
              </Link>
              .{required}
            </label>
          </div>
          {fieldError("consent")}
        </div>

        <div className="sm:col-span-2">
          <button type="submit" disabled={status === "sending"} className="btn-navy w-full sm:w-auto disabled:opacity-70">
            {status === "sending" ? f.sending : f.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

function RadioGroup({
  name,
  legend,
  options,
  required,
  error,
  value,
  onChange,
}: {
  name: ContactField;
  legend: string;
  options: AreaOption[];
  required: ReactNode;
  error: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="label">
        {legend}
        {required}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-slate/40 bg-white px-4 text-ink",
              "has-[:checked]:border-navy has-[:checked]:ring-1 has-[:checked]:ring-navy has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy/40",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              required
              className="size-5 accent-navy"
              {...(onChange ? { checked: value === o.value, onChange: () => onChange(o.value) } : {})}
            />
            {o.label}
          </label>
        ))}
      </div>
      {error}
    </fieldset>
  );
}
