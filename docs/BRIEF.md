# PROJECT BRIEF — Law Firm Website
## For: Crest Advocates (Kenya)

> This is the full spec for Claude Code. The short, always-loaded rules live in `CLAUDE.md`; the build order and copy-paste prompts live in `docs/PHASES.md`. When the two disagree, **CLAUDE.md's guardrails win**, then this brief.

I want to build a complete, professional, content-driven website for **Crest Advocates**, a Kenyan law firm. The owner is **Lynn Ngugi**. Tagline: **"Rising Above. Protecting What Matters."** Phone / WhatsApp: **+254 113 467 024**. Instagram: @crestadvocates (confirm exact URL with the client).

This is a **real law firm's website**. Its job is to build trust, explain what the firm does in plain English, introduce the team, share useful legal information, and make it effortless to reach the firm or request a consultation. It is NOT an e-commerce site.

Two source images are in `assets/` (see `assets/README.md`):
- **`assets/logo-original.jpg`** — 1080×1080 JPG, stacked lockup on a deep navy background (the navy is baked into the image, not transparent)
- **`assets/owner-original.jpg`** — Lynn Ngugi, 3072×4096 portrait JPG, a candid shot at her desk (it must be cropped before use)

Run `node scripts/prepare-assets.mjs` to produce every web-ready image. **Do not crop or resize these by hand.**

---

## 1. READ THIS FIRST — How this project differs

- **No cart, wishlist, checkout, M-Pesa, Supabase, auth, or admin dashboard.** Content-driven, JSON-first, no database.
- Structure: a single config file (`src/config/business.ts`), JSON data files for content, mobile-first, Next.js App Router (latest stable). The distinctive parts here are: a Kenyan law firm, a navy-and-gold serif identity, a **Team** page, **WhatsApp as a primary contact channel**, and a set of **professional-conduct guardrails** (next section) that matter more than any visual detail.
- Pages: Home, About, Services (+ detail pages), Team (+ profile pages), Blog (labelled "Insights" in the nav), Contact / Book a Consultation, Privacy, Disclaimer, 404.

---

## 2. ⚠️ PROFESSIONAL-CONDUCT & ACCURACY GUARDRAILS (non-negotiable)

Because this is a law firm, getting these wrong could embarrass the client or breach professional rules. Follow every one.

1. **Never invent facts about the firm or its people.** No qualifications, universities, admission dates, LSK/practising-certificate numbers, years of experience, case counts, client counts, awards, rankings, or past case results. Anything not provided must come from config/JSON as an empty value and **the UI must hide that element when it's empty** (no "Coming soon" boxes, no lorem ipsum, no fake placeholders on the page).
2. **No testimonials, case results, or client logos.** Do not build a testimonials section or a `testimonials.json`. (Legal advertising norms and client confidentiality — the client can add something later if appropriate.)
3. **No outcome guarantees and no superlatives or comparisons** — never "best", "leading", "top", "#1", "winning", "we guarantee". No pricing claims except the one the firm itself made about retainers ("Fixed, predictable fees").
4. **Informational, not advisory.** Services and blog copy is general information. Every blog post ends with a "General information only — not legal advice. Laws change; speak to an advocate about your situation" notice. Name only widely-known Acts where useful (e.g. the Law of Succession Act, the Employment Act, the Land Registration Act, the Companies Act); do **not** cite section numbers, fees, filing timelines, or thresholds.
5. **Confidentiality first.** The contact form warns visitors not to include sensitive or confidential details. No session-replay or heatmap tools. The privacy page references the **Data Protection Act, 2019** (Kenya).
6. **Advertising rules.** Kenyan advocates are subject to professional rules on advertising and solicitation (Advocates Act, Advocates (Practice) Rules, LSK guidance). Keep the tone dignified and informational, avoid promotional language, and include in the README that **Lynn must review all copy before launch** (she'll know the current rules best).
7. **Draft content must be flagged.** Several things below are *drafts derived from the firm's own words* (practice areas, mission/vision, process steps, FAQs, blog posts, the founder's short bio). Mark each with `"status": "draft"` in its data, and add a small `<DraftBadge />` component that renders a subtle "DRAFT — confirm with client" tag next to draft items **only when** `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`. (Set `true` for preview/sample deployments; `false` for production.) The README lists every draft item.
8. **No fake contact details.** Phone and WhatsApp are real (given). Email, address, office hours, and map are NOT provided — leave empty in config, hide in UI when empty, and list them in the README checklist.
9. **No "free consultation" wording.** Nothing provided says consultations are free. Use "Schedule a Consultation" / "Book a Consultation". `business.consultation.isFree` is `null` until the client confirms; only mention fees if it's set.

---

## 3. CENTRALIZED BUSINESS CONFIG — single source of truth

Do NOT hardcode the firm name, tagline, contact details, colours, or legal text anywhere except this file.

```typescript
// src/config/business.ts
// =====================================================
// BUSINESS CONFIGURATION — SINGLE SOURCE OF TRUTH
// =====================================================
// Edit ONLY this file to change firm details, contact info,
// colours or fixed legal wording. Every page imports from here.
// Empty strings / null = "not provided yet" → the UI hides it.

export const business = {
  // ── IDENTITY ──
  name: "Crest Advocates",
  shortName: "Crest",
  descriptor: "Advocates",
  tagline: "Rising Above. Protecting What Matters.",
  strapline: "Clear counsel. Strong representation.",
  pillars: ["Your rights.", "Your interests.", "Your peace of mind."],
  founder: { name: "Lynn Ngugi", slug: "lynn-ngugi" },
  foundedYear: null as number | null,           // hide "since" copy if null

  // ── CONTACT ──
  phone: "+254 113 467 024",
  phoneHref: "tel:+254113467024",
  whatsappNumber: "254113467024",
  whatsappUrl: "https://wa.me/254113467024",
  email: "",                                    // TODO — not provided
  address: "",                                  // TODO — not provided
  city: "",                                     // TODO — do not assume
  country: "Kenya",
  hours: "",                                    // TODO — not provided
  mapUrl: "",                                   // only render map if provided
  instagramUrl: "https://www.instagram.com/crestadvocates/", // confirm
  linkedinUrl: "",
  facebookUrl: "",

  // ── CONSULTATIONS ──
  consultation: {
    isFree: null as boolean | null,             // never claim "free" unless true
    bookingUrl: "",                             // optional Cal.com / Calendly link
  },

  // ── LEGAL / COMPLIANCE COPY ──
  legal: {
    disclaimer:
      "The information on this website is general in nature and does not constitute legal advice. Submitting an enquiry does not create an advocate–client relationship. Please do not send confidential or sensitive details through the contact form.",
    formNotice:
      "Please don't include confidential details here. We'll discuss your matter properly once we speak.",
    dataProtectionAct: "Data Protection Act, 2019",
  },

  // ── VOICE / MICRO-COPY ──
  copy: {
    heroHeadline: "Rising Above. Protecting What Matters.",
    heroSubtext: "Clear counsel. Strong representation. Your rights, your interests and your peace of mind — in capable hands.",
    primaryCta: "Schedule a Consultation",
    secondaryCta: "WhatsApp Us",
    whatsappPrefill: "Hello Crest Advocates, I'd like to make an enquiry.",
    formSuccess: "Thank you — we've received your request and will be in touch shortly.",
    formFallback: "We couldn't send your request online just now. Please reach us directly on WhatsApp or by phone — we'd be glad to help.",
    footerLine: "Clear counsel. Strong representation.",
    finalCtaHeading: "Ready to take the next step?",
    finalCtaText: "Get in touch for legal guidance you can rely on.",
  },

  // ── COLOURS ── (sampled from the logo — see Design System)
  colors: {
    navy: "#03112C",
    navyRaised: "#0A1F44",
    navyLine: "#1B3260",
    gold: "#D3A54F",
    goldLight: "#F5C972",
    goldDark: "#BE8A36",
    goldText: "#8A6416",   // AA-safe gold-toned TEXT on white/ivory
    ivory: "#FAF7F0",
    white: "#FFFFFF",
    ink: "#03112C",
    slate: "#4A5568",
    mutedOnNavy: "#B9C2D3",
  },

  // ── FONTS ──
  fonts: { display: "Cormorant Garamond", body: "Inter" },
} as const;

export type Business = typeof business;
```

**Enforcement:** if you type "Crest Advocates", the phone number, a hex code, or the disclaimer text inside any `.tsx` outside this file, stop and import it from `business`.

---

## 4. BRAND IDENTITY

### From the logo (colours were sampled from the actual pixels)
- **Background navy `#03112C`** — very deep navy, almost black-blue
- **Gold `#D3A54F`** (flat gold used for "ADVOCATES" and the tagline); the shield has a **metallic gradient** from `#F5C972` (light) to `#BE8A36` (dark)
- **White** for the wide-tracked "CREST" wordmark
- Elements: a shield outline containing a mountain peak with a swoosh; "CREST" in classical serif capitals with generous letter-spacing; "ADVOCATES" in gold, spaced, flanked by two thin gold rules; a thin gold divider with a small centred diamond; an italic serif tagline in gold

### From the firm's own words — use these as copy anchors
**Bio:** "Rising Above. Protecting What Matters. / Clear counsel. Strong representation. / Your rights. Your interests. Your peace of mind."

**Retainer post:** "At Crest Advocates, we don't just show up when things go wrong. On retainer, we become your legal partner. We learn your business, understand your goals and give you direct, priority access to our team, so you can make decisions with confidence." Promise list: **Fast responses when it matters · Advice that fits your business · Fixed, predictable fees · Problems solved before they grow.** CTA: "Ready to put us on retainer? Send us a message today and let's talk about a plan that fits you."

**Trust post:** "You need more than legal advice. You need a team that listens, understands your needs, and stands by you when it matters most. … professionalism, integrity, and a client-focused approach to every matter we handle."

### Voice
Composed, assured, plain English. Direct "you" language. Warm authority — a firm that explains things clearly rather than hiding behind legalese. No hype, no exclamation marks, no emoji (replace the firm's ✔️ with SVG check icons). The Instagram voice is confident and direct ("we don't just show up when things go wrong") — keep that confidence, in a more formal register.

---

## 5. DESIGN SYSTEM

### Vibe
Classic, calm, trustworthy — deep navy with restrained gold, generous whitespace, elegant serif headlines. Think established boutique firm, not corporate giant and not flashy. **Alternate dark navy sections and light ivory sections** for rhythm.

### Colour rules (WCAG-checked on the real values)
| Pairing | Contrast | Verdict |
|---|---|---|
| Gold `#D3A54F` on navy `#03112C` | 8.27:1 | ✅ text, icons, rules, buttons on navy |
| Navy text on gold button | 8.27:1 | ✅ primary button = gold bg + navy text |
| White on navy | 18.7:1 | ✅ |
| `mutedOnNavy` `#B9C2D3` on navy | 10.5:1 | ✅ secondary text on dark |
| **Gold `#D3A54F` on white** | **2.27:1** | ❌ NEVER use gold as text on white/ivory |
| `goldText` `#8A6416` on white / ivory | 5.36 / 5.01 | ✅ small gold-toned text on light backgrounds |
| Navy on white / ivory | 18.7 / 17.5 | ✅ headings on light |
| Slate `#4A5568` on white / ivory | 7.5 / 7.0 | ✅ body text on light |

Gold may be used as a **decorative** line/border/icon fill on light backgrounds (non-text), but any gold-toned *text* on light backgrounds must use `goldText`.

### Typography
- **Display:** `Cormorant Garamond` (600/700; italic for taglines and pull-quotes) — echoes the logo's classical serif
- **Body/UI:** `Inter`
- Uppercase eyebrow labels with wide tracking (`tracking-[0.3em]`) echo the spaced "A D V O C A T E S"
- Cormorant is delicate at small sizes: use it at ≥ 20px; use Inter for UI text, buttons, form labels
- Load with `next/font/google`

### Motifs (build with CSS/SVG — no stock imagery)
- `.gold-rule` — thin gold line with a small centred diamond (from the logo), used as a section divider
- A subtle **mountain-peak line pattern** (SVG derived from the logo's peak) at ~6–8% opacity behind the hero and navy sections
- The **shield mark** as navbar icon, favicon, and a quiet watermark

### Component classes (`globals.css` → `@layer components`)
`.btn-gold` (gold bg, navy text, min-h 48px) · `.btn-outline-gold` (gold border, gold text — on navy only) · `.btn-navy` (navy bg, white text — on light) · `.btn-outline-navy` · `.input` (white, slate border, navy focus ring, min-h 48px) · `.label` · `.card` (white/ivory with hairline border) · `.card-dark` (navyRaised with navyLine border) · `.container-site` (max-w-6xl) · `.section-padding` (py-16 md:py-24) · `.eyebrow` (uppercase, tracking, gold on navy / goldText on light) · `.gold-rule` · `.prose-article` (readable serif/sans blog styles, light theme) · `.check-list` (SVG gold check bullets) · `.badge-draft`

### Logo handling (important)
- **Stacked logo** (`logo-stacked.jpg`, the full 1080×1080 file): use only on **navy** sections (hero, About, footer, OG image). Set those sections' background to the exact `#03112C` so the baked-in logo background blends invisibly. Never place it on white.
- **Shield icon** `logo-shield.png` (410×454) is produced by the script from the box **(x 335, y 116) → (x 745, y 570)**. The shield artwork itself spans y 136–550 and the "CREST" letters start at y 575, so the box must not go below y 570 or letter tops leak into the crop. It also has the navy baked in, so use it only on `#03112C` (navbar, footer, favicon, apple-touch-icon).
- **Navbar lockup is built in live text**, not the square image: shield icon + "CREST" (Cormorant, caps, tracking) + "ADVOCATES" (small, gold, tracking). Navbar background = exact `#03112C`.
- README: ask the client for an SVG or transparent PNG of the logo for production use.

### Owner photo handling (important)
- The original (`3072×4096`) is a candid desk shot. The foreground has client files and papers, and the room isn't polished. **Never display the original, and never commit it: `assets/owner-original.jpg` goes in `.gitignore`.**
- The script pre-crops to a square: box **(x 1016, y 1500) → (x 2316, y 2800)** (1300×1300), resized to 1000×1000, saved as `public/images/team/lynn-ngugi.jpg`. Checked by eye: head and shoulders, no legible documents. After running the script, open the output and confirm that again before moving on.
- This is an interim image. README: ask for a professional headshot for Lynn and for each advocate (consistent background and framing).
- Alt text: "Lynn Ngugi, founder of Crest Advocates." Control focal point with `photoPosition` in `team.json`.

### Imagery policy
- **No stock photos of gavels, scales, or skylines.** Don't fake Nairobi imagery.
- Service cards = Lucide icon + gold motif, not photos. Blog covers = generated branded cards (navy gradient + mountain-line pattern + category label), so no external image domains are needed.
- README includes a photography wishlist: headshots per advocate, office interior/exterior, and a team photo.

---

## 6. MOBILE-FIRST & CONTACT-FIRST UX

Most Kenyan visitors arrive on a phone, usually from Instagram, and **WhatsApp is the primary contact channel**.

- Tailwind written mobile-first (`base` = mobile, layer up with `sm:`/`md:`/`lg:`)
- **Mobile sticky bottom bar** with three 48px actions: **Call · WhatsApp · Book** (hidden on `lg+`; on desktop show a small "WhatsApp" pill bottom-right instead)
- WhatsApp links use `business.whatsappUrl` + `?text=` with a prefilled message (service pages prefill the service name). **Never prefill confidential details.**
- Navbar: shield + wordmark left; links Home · About · Services · Team · Insights · Contact; gold CTA "Schedule a Consultation"
- All tap targets ≥ 44px; forms use large inputs and appropriate `inputMode`/`autocomplete` (`tel`, `email`, `name`)
- Test every page at 375px first, then verify desktop feels substantial (this is a considered decision, many visitors will switch to desktop to read)

---

## 7. ARCHITECTURE — no database

| Content | Where it lives |
|---|---|
| Firm details, legal text, colours | `src/config/business.ts` |
| Services / practice areas | `src/data/services.json` |
| Team | `src/data/team.json` |
| Blog posts | `src/data/blogs.json` |
| FAQs | `src/data/faqs.json` |
| Process steps | `src/data/process.json` |
| Contact submissions | `/api/contact` → email, **never stored** |

- Render server-side wherever possible (SEO matters). Client components only where needed (navbar menu, accordion, form, mobile bar).
- Only API route: `/api/contact` (details in section 9).

---

## 8. PAGES

### Home
1. **Hero** (navy, mountain-line backdrop): eyebrow "ADVOCATES"; H1 = tagline in Cormorant; subtext = strapline + pillars; CTAs "Schedule a Consultation" (gold) + "WhatsApp Us" (outline gold). Stacked logo may appear on large screens as a quiet side element.
2. **Pillars strip**: three columns — *Your rights. Your interests. Your peace of mind.* — each with one short plain-English sentence (draft).
3. **Practice areas** grid from `services.json` (icon, title, one-line summary → detail page), with a "View all services" link.
4. **Retainer feature** (split navy/ivory): the firm's own retainer copy, the four promises as a `.check-list`, CTA "Talk to us about a retainer".
5. **Why Crest**: "a team that listens, understands your needs, and stands by you when it matters most" + the three values: Professionalism · Integrity · Client-focused approach.
6. **How it works**: 3 steps from `process.json` (Reach out → Consultation → A clear plan). No timelines, no fee claims.
7. **Meet the founder**: Lynn's cropped photo + `shortBio` + link to the Team page.
8. **Insights preview**: 3 latest posts.
9. **Final CTA band** (navy): `finalCtaHeading`, `finalCtaText`, call / WhatsApp / schedule buttons.

### About
- **Who we are** — built from the firm's bio and posts; no invented history
- **Mission & Vision** (both `status: "draft"`, derived only from the firm's own language):
  - *Mission (draft):* "To give our clients clear counsel and strong representation — protecting their rights, their interests and their peace of mind with professionalism and integrity."
  - *Vision (draft):* "To be a legal partner people can trust to stand with them — rising above the complexity of the law so they can make decisions with confidence."
- **What we stand for** — Professionalism, Integrity, Client-focused approach (expand lightly from the trust post)
- **How we work** — the legal-partner/retainer model alongside one-off matters
- **Experience** — render only if `foundedYear` or an `experienceNote` is provided; otherwise omit the section entirely (do not invent years)
- **Credentials/Memberships** — render only if provided in `team.json`/config
- **Founder block** (photo + short bio + link) and a closing CTA

### Services (`/services` + `/services/[slug]`)
- Intro paragraph, then filter tabs: **All · For Businesses · For Individuals & Families** (from each service's `audience`). Featured first: **Business Legal Retainer**.
- Each card: icon, title, summary, "Learn more".
- **Detail page**: title + summary hero (navy); overview; **"How we can help"** (check-list); **"What to expect"** (generic, no timelines/fees); 2–3 general FAQs; related Insights posts; CTA block with `Schedule a Consultation` (→ `/contact?service=<slug>`) and a prefilled WhatsApp link.
- Pictures: none are provided and none should be invented (see Imagery policy); design the detail pages so they look complete with icon + motif.

### Team (`/team` + `/team/[slug]`)
- **Data-driven and scalable:** the page must look finished with **one** member (founder spotlight layout: large portrait, name, title, bio) and automatically add a responsive grid when more members exist.
- Each profile can show: photo, name, title, short bio, longer bio paragraphs, qualifications, admissions, practice areas, skills, languages, memberships, email/LinkedIn. **Every field is optional and hidden when empty.**
- Only Lynn Ngugi exists today, and only her name, photo and a short factual line are known. **Do not invent her qualifications or biography.** See `team.json` below.
- Profile pages (`/team/[slug]`) for SEO, with `Person` JSON-LD.
- README explains how to add an advocate (copy an entry, add a headshot).

### Blog (`/blog`, `/blog/[slug]`) — nav label "Insights"
- Featured post + grid; category chips; reading time; branded generated cover cards
- Post page: title, category, date, readable article body (`.prose-article`), disclaimer notice, CTA block, related posts
- Article JSON-LD per post

### Contact / Book a Consultation (`/contact`)
- Left: phone (`tel:`), WhatsApp button, email/address/hours/map **only if provided**, confidentiality note
- Right: consultation request form (details in section 9)
- Optional booking embed or button if `business.consultation.bookingUrl` is set
- FAQ accordion (6 general questions)
- Reads `?service=` via `useSearchParams` → **must be wrapped in `<Suspense>`**

### Legal & utility pages
- `/privacy` — plain-English privacy notice referencing the Data Protection Act, 2019: what the form collects, that it's emailed (not stored on the website), no tracking cookies by default, how to contact the firm. Mark as draft; the client should have it reviewed.
- `/disclaimer` — site-use terms using `business.legal.disclaimer` (no advocate–client relationship, general info only)
- `not-found.tsx`, `sitemap.ts` (all static + dynamic slugs), `robots.ts`
- Footer: logo/wordmark, strapline, nav links, contact details (only provided ones), short disclaimer line, Privacy + Disclaimer links, ©

---

## 9. CONTACT FORM & API

### Fields
Full name* · Phone* · Email (optional, but at least phone or email) · **I am a** (Individual / Business) · **Area of law** (select from `services.json` + "Not sure yet") · **Preferred contact** (WhatsApp / Call / Email) · **Preferred date** (optional) · **Preferred time** (Morning / Afternoon / Evening, optional) · **Brief description** (max 600 chars, with `business.legal.formNotice` shown beside it) · **Consent checkbox** (agree to be contacted; link to Privacy page)

### `/api/contact` behaviour
1. Validate with **zod**; reject on failure with field errors
2. **Spam protection:** hidden honeypot field + minimum time-to-submit check + simple per-IP rate limit (note in a code comment that in-memory limits are best-effort on serverless)
3. Email the firm via **Resend** (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_FROM_EMAIL`); set reply-to to the visitor's email if given. Subject: `New consultation request — <area of law> — <name>`
4. **Never show success unless delivery actually succeeded.** If no email provider is configured, return `{ ok: false, reason: "not_configured" }` and log a clear server-side message. The UI then shows `copy.formFallback` with a **WhatsApp button (prefilled with name + area of law only)** and a `tel:` link, so no lead is ever lost
5. **Do not store or log message bodies.** No database.
6. **Optional owner alert via WhatsApp Cloud API** (only if the env vars are set; failure must never fail the request): send a **template message** containing just name, area of law and preferred contact method. **No case details.** Note in a comment that business-initiated WhatsApp Cloud API messages outside the 24-hour customer-service window must use a pre-approved template, so free-form text alerts won't reliably deliver.
7. Success state: `copy.formSuccess`. Error states are announced via `aria-live`.

---

## 10. SEO & LOCAL

- Per-page `metadata` (title pattern `%s | Crest Advocates`, description, canonical), `lang="en-KE"`
- JSON-LD: `LegalService` (name, url, telephone, `areaServed: "Kenya"`, address only if provided, `founder` → `Person` "Lynn Ngugi"), plus `Article` on posts and `Person` on team profiles
- Open Graph image (1200×630): the stacked logo on navy, generated at build/static
- One `h1` per page, descriptive link text, alt text on all images
- Sitemap + robots

## 11. ACCESSIBILITY & PERFORMANCE

- WCAG AA minimum; visible focus rings (gold on navy, navy on light); skip-to-content link; semantic landmarks
- Respect `prefers-reduced-motion`; motion limited to subtle fades/underline transitions
- All form fields labelled, errors associated via `aria-describedby`
- `next/image` with correct `sizes`; fonts via `next/font`; no heavy libraries (use `lucide-react` for icons)

---

## 12. DATA FILES

### `src/data/services.json`
Schema: `{ slug, title, icon (lucide name), audience: ("businesses"|"individuals")[], summary, overview: string[], howWeHelp: string[], whatToExpect: string[], faqs: {q,a}[], featured?: boolean, status: "confirmed"|"draft" }`

The firm has only told us about the retainer service. **Everything else is a draft proposal for Lynn to confirm, add to, or remove.** Write calm, general, non-advisory copy for each:

| slug | Title | audience | status |
|---|---|---|---|
| `business-legal-retainer` | Business Legal Retainer | businesses | **confirmed** (use the firm's retainer copy + four promises) |
| `corporate-commercial-law` | Corporate & Commercial Law (company formation, contracts, compliance) | businesses | draft |
| `employment-labour-law` | Employment & Labour Law | businesses, individuals | draft |
| `debt-recovery` | Debt Recovery | businesses | draft |
| `intellectual-property` | Intellectual Property (e.g. trade marks) | businesses | draft |
| `conveyancing-real-estate` | Conveyancing & Real Estate | individuals, businesses | draft |
| `civil-litigation-dispute-resolution` | Civil Litigation & Dispute Resolution | individuals, businesses | draft |
| `family-law` | Family Law | individuals | draft |
| `succession-probate` | Wills, Succession & Probate | individuals | draft |

### `src/data/team.json`
```json
[
  {
    "slug": "lynn-ngugi",
    "name": "Lynn Ngugi",
    "title": "Founder & Managing Advocate",
    "titleStatus": "confirm",
    "photo": "/images/team/lynn-ngugi.jpg",
    "photoPosition": "50% 40%",
    "shortBio": "Lynn Ngugi leads Crest Advocates, a firm built around clear counsel and strong representation.",
    "bio": [],
    "qualifications": [],
    "admissions": [],
    "practiceAreas": [],
    "skills": [],
    "languages": [],
    "memberships": [],
    "email": "",
    "linkedin": "",
    "status": "draft"
  }
]
```
The detailed fields stay empty (and hidden) until Lynn supplies them.

### `src/data/process.json`
Three draft steps: **1. Reach out** (call, WhatsApp or the form) · **2. Consultation** (we listen and understand your situation) · **3. A clear plan** (we explain your options and next steps). No durations or fee statements.

### `src/data/faqs.json`
6 draft general FAQs: how to request a consultation · whether the firm acts for individuals and businesses · what a legal retainer is · how to contact the firm quickly (WhatsApp/phone) · what to bring to a first consultation · whether enquiries are kept confidential. **No fee amounts or timelines.**

### `src/data/blogs.json`
6 original articles (600–800 words, full HTML with `h2`, `p`, `ul`, `blockquote`), all `status: "draft"`, author "Crest Advocates". Write for a Kenyan audience; accurate but general; follow guardrails 3–4 (no section numbers, fees, thresholds; end with the disclaimer notice and a consultation CTA). `cover: null` (branded generated card).

1. **Why Every Growing Business Needs a Legal Retainer** (builds on the firm's retainer post)
2. **5 Things to Look for When Choosing an Advocate** (echoes the firm's "5 reasons" post: a current practising certificate, listening, clear communication, relevant experience, transparency about fees and process, confidentiality)
3. **What to Expect at Your First Legal Consultation** (what to bring, what to ask, confidentiality)
4. **Buying Land in Kenya: Due Diligence Before You Pay** (official search at the land registry, verifying ownership and the seller's identity, encumbrances/caveats, consents where applicable, using an advocate for the agreement and transfer — keep general)
5. **Starting a Company in Kenya: What to Know Before You Register** (choosing a structure, name search and registration through the registry's online platform, directors and shareholders, tax registration, keeping records — keep general, note that requirements change)
6. **Wills and Succession: Why Planning Ahead Protects Your Family** (what a will does, the general idea of dying without one, the Law of Succession Act by name only)

---

## 13. TYPES

```typescript
export interface Service {
  slug: string; title: string; icon: string;
  audience: ("businesses" | "individuals")[];
  summary: string; overview: string[]; howWeHelp: string[]; whatToExpect: string[];
  faqs: { q: string; a: string }[];
  featured?: boolean; status: "confirmed" | "draft";
}
export interface TeamMember {
  slug: string; name: string; title: string; titleStatus?: "confirm";
  photo: string; photoPosition?: string; shortBio: string;
  bio: string[]; qualifications: string[]; admissions: string[];
  practiceAreas: string[]; skills: string[]; languages: string[]; memberships: string[];
  email: string; linkedin: string; status: "confirmed" | "draft";
}
export interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content: string;
  cover: string | null; category: string; author_name: string;
  read_time: number; created_at: string; published: boolean; status: "confirmed" | "draft";
}
export interface ProcessStep { step: number; title: string; description: string; status: "confirmed" | "draft"; }
export interface FAQ { id: string; q: string; a: string; status: "confirmed" | "draft"; }
export interface ConsultationRequest {
  name: string; phone: string; email?: string; clientType: "individual" | "business";
  areaOfLaw: string; preferredContact: "whatsapp" | "call" | "email";
  preferredDate?: string; preferredTime?: "morning" | "afternoon" | "evening";
  description?: string; consent: boolean; website?: string; startedAt: number;
}
```

---

## 14. FILE STRUCTURE

```
src/
├── config/business.ts          ← ⭐ single source of truth
├── app/
│   ├── layout.tsx              ← fonts, metadata, skip link, JSON-LD, MobileActionBar
│   ├── page.tsx                ← Home
│   ├── globals.css
│   ├── about/page.tsx
│   ├── services/{page.tsx, [slug]/page.tsx}
│   ├── team/{page.tsx, [slug]/page.tsx}
│   ├── blog/{page.tsx, [slug]/page.tsx}
│   ├── contact/page.tsx        ← Suspense-wrapped form (reads ?service=)
│   ├── privacy/page.tsx
│   ├── disclaimer/page.tsx
│   ├── not-found.tsx · sitemap.ts · robots.ts
│   └── api/contact/route.ts
├── components/
│   ├── layout/{Navbar, Footer, MobileActionBar, WhatsAppPill}.tsx
│   ├── home/{Hero, PillarsStrip, PracticeAreas, RetainerFeature, WhyCrest, HowItWorks, FounderTeaser, InsightsPreview, FinalCta}.tsx
│   ├── services/{ServiceCard, ServiceFilterTabs}.tsx
│   ├── team/{TeamSpotlight, TeamGrid, TeamProfile}.tsx
│   ├── blog/{PostCard, GeneratedCover}.tsx
│   ├── contact/{ConsultationForm, ContactDetails, FaqAccordion}.tsx
│   └── ui/{GoldRule, MountainPattern, CheckList, DraftBadge, Logo, Disclaimer}.tsx
├── data/{services,team,blogs,faqs,process}.json
├── lib/{utils.ts, whatsapp.ts, schema.ts}   ← cn(), slugify(), wa.me link builder, JSON-LD builders
└── types/index.ts
public/images/            ← all generated by scripts/prepare-assets.mjs
├── logo-stacked.jpg      ← the provided logo (navy sections only)
├── logo-shield.png       ← cropped (335,116)-(745,570), 410×454
├── favicon-256.png       ← shield centred on navy, source for app/icon + apple-icon
├── og-image.jpg          ← 1200×630, logo centred on #03112C
└── team/lynn-ngugi.jpg   ← cropped (1016,1500)-(2316,2800), 1000×1000

CLAUDE.md · docs/{BRIEF,PHASES}.md · assets/{logo-original.jpg, owner-original.jpg} · scripts/prepare-assets.mjs
```

---

## 15. CRITICAL TECHNICAL RULES

- **All firm-specific strings, colours, and legal wording come from `src/config/business.ts`**
- Next.js App Router on the latest stable release (whatever `create-next-app@latest` installs; don't pin an old version), TypeScript, Tailwind CSS. In Next 15+, route `params` are async: `const { slug } = await params`.
- **Colours:** `business.colors` is the only place hex values live. In `layout.tsx` emit CSS variables from it (`--color-navy`, `--color-gold`, …) and map the Tailwind theme to those variables using the installed Tailwind version's documented way (v4: `@theme inline`; v3: `theme.extend.colors` in the config). No hex codes in components or CSS files.
- No Supabase, no auth, no middleware, no admin, no cart/checkout anywhere
- Every component using `useState`, `useEffect`, `onClick`, `onChange` needs `"use client"`
- `useSearchParams()` (contact page `?service=`) **must** be inside `<Suspense>` or the production build fails
- React list keys must be unique and stable (use slugs/ids, or `${value}-${index}`)
- Use the ESLint setup `create-next-app` generates. Only if `npm install` fails with an `ERESOLVE` peer-dependency error (this shows up on Vercel), add an `.npmrc` containing `legacy-peer-deps=true`.
- `next.config.*`: no external `remotePatterns` needed (all imagery is local). Don't add any.
- Dependencies beyond the usual: `zod`, `resend`, `lucide-react`
- Empty/`null` config or JSON values must never render empty boxes, "undefined", or broken links
- Dynamic routes use `generateStaticParams`; unknown slugs → `notFound()`
- All tap targets ≥ 44px; all images have meaningful `alt`

---

## 16. ENVIRONMENT VARIABLES (`.env.local`)

```env
# Email (contact form) — Resend: https://resend.com
# Note: Resend only delivers to addresses other than your own account email
# once a sending domain is verified. Until then the form uses the WhatsApp fallback.
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_FROM_EMAIL=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BOOKING_URL=                 # optional Cal.com / Calendly link
NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true        # true on preview, false on production

# Optional — owner alert via WhatsApp Cloud API (template message, no case details)
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_TEMPLATE_NAME=
OWNER_WHATSAPP_NUMBER=254113467024
```

---

## 17. DELIVERABLES

The finished project must go: `npm install` → `.env.local` filled → `npm run dev` → pushed to GitHub → deployed on Vercel, with no manual image editing. The images come from `scripts/prepare-assets.mjs`; commit the generated files in `public/images/`. `npm run build` and `npm run lint` must pass with zero errors.

The **README.md** must include:
1. Setup and deploy steps; how to add a service / advocate / blog post / FAQ
2. **"Before this goes live" checklist for Lynn:**
   - Provide: email address, office address and city, hours, final Instagram/LinkedIn links
   - Confirm or edit the **practice areas** (only the retainer is confirmed), **mission & vision**, **process steps**, **FAQs**, and every **blog post** (all drafts)
   - Provide advocate bios, qualifications, admissions, languages, and professional headshots (the current photo of Lynn is an interim crop)
   - Confirm her exact title wording and whether consultations are paid or free
   - Review all copy against Kenyan advocates' advertising rules
   - Have the privacy notice reviewed (Data Protection Act, 2019 — including whether the firm needs to be registered with the Office of the Data Protection Commissioner)
   - Set up a sending domain for email delivery (or an SMTP alternative)
   - Switch `NEXT_PUBLIC_SHOW_DRAFT_FLAGS` to `false` once drafts are confirmed
3. A photography wishlist (headshots, office, team photo)
4. A mobile (375px) + desktop QA checklist and a Lighthouse accessibility pass
