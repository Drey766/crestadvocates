# Crest Advocates — website

A content-driven website for **Crest Advocates**, a Kenyan law firm (founder: Lynn Ngugi). It builds trust, explains services in plain English, introduces the team, publishes general legal information, and makes it easy to reach the firm by WhatsApp, phone or a consultation request form. It is **not** an e-commerce site.

Full spec: `docs/BRIEF.md`. Build order: `docs/PHASES.md`. Read the relevant section of the brief **before** building each part, and work **one phase at a time**.

## Stack and commands
- Next.js App Router (latest stable), TypeScript, Tailwind CSS, `zod`, `resend`, `lucide-react`. No database, no auth, no Supabase, no cart/checkout/admin/M-Pesa.
- After scaffolding, `create-next-app` adds an `AGENTS.md`. Follow it: this Next.js version may differ from what you remember, so check the guides in `node_modules/next/dist/docs/` before using any Next.js API you are not sure of.
- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` and `npm run build` — both must pass with zero errors before any phase counts as done
- `node scripts/prepare-assets.mjs` — generates every image in `public/images/` from `assets/logo-original.jpg` and `assets/owner-original.jpg`. Never crop or resize those by hand. Never display the uncropped owner photo (it shows client files), and **never commit or push `assets/owner-original.jpg`**: it must be listed in `.gitignore`.

## Single source of truth
- `src/config/business.ts` holds the firm name, tagline, contact details, legal wording, copy, **colours** and fonts. Do not type any of those inside a component. Import from `business`.
- Colours: emit CSS variables from `business.colors` in `layout.tsx` and map the Tailwind theme to them. No hex codes outside `business.ts`.
- Content lives in `src/data/*.json` (services, team, blogs, faqs, process), typed by `src/types/index.ts`.

## Professional-conduct guardrails (non-negotiable — full text in BRIEF §2)
1. **Never invent facts** about the firm or people: no qualifications, admission dates, LSK numbers, years of experience, case or client counts, awards. Unknown = empty value, and **the UI hides empty things** (no "Coming soon", no lorem ipsum, no `undefined`, no empty boxes, no broken links).
2. **No testimonials, case results, or client logos.** Do not create a testimonials section or file.
3. **No outcome guarantees, no superlatives or comparisons**: never "best", "leading", "top", "#1", "winning", "we guarantee". Only price claim allowed: the firm's own "Fixed, predictable fees" (retainer).
4. **Informational, not advisory.** Every blog post ends with: "General information only — not legal advice. Laws change; speak to an advocate about your situation." Name widely known Acts only; **no section numbers, fees, filing timelines or thresholds.**
5. **Confidentiality first.** Contact form warns against sending sensitive details. No session replay or heatmaps. Privacy page references the Data Protection Act, 2019. `/api/contact` never stores or logs message bodies and never shows "success" unless the email really sent.
6. **No "free consultation" wording.** Use "Schedule a Consultation". `business.consultation.isFree` stays `null` until the client confirms.
7. **Drafts are flagged.** Anything not stated by the firm itself (all services except the retainer, mission/vision, process, FAQs, all blog posts, Lynn's short bio) gets `"status": "draft"` and renders `<DraftBadge />` only when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`.
8. **No fake contact details.** Only the phone/WhatsApp (+254 113 467 024) is real. Email, address, city, hours, map are empty in config until provided.
9. **No emoji, no exclamation marks, no stock photos** (gavels, scales, skylines). Voice: composed, plain English, direct "you".

## Design essentials (full rules in BRIEF §5)
- Deep navy `#03112C` + restrained gold, Cormorant Garamond headlines (≥20px), Inter for UI. Alternate navy and ivory sections.
- **Never use gold as text on white/ivory** (2.27:1). Use `goldText` there. Gold on navy is fine.
- The stacked logo and shield PNG have navy baked in: use them only on `#03112C` backgrounds. Navbar lockup is live text plus the shield.
- Mobile-first. Sticky bottom bar on mobile (Call · WhatsApp · Book). All tap targets ≥ 44px. Check every page at 375px first.

## Next.js gotchas that have bitten before
- `"use client"` is required for anything using `useState`, `useEffect` or event handlers.
- `useSearchParams()` (contact page `?service=`) must be inside `<Suspense>` or `npm run build` fails.
- List keys must be unique and stable (slugs/ids, or `${value}-${index}`).
- Dynamic routes use `generateStaticParams`; unknown slugs call `notFound()`. In Next 15+, `params` is async.
- Only add `.npmrc` with `legacy-peer-deps=true` if install fails with `ERESOLVE`.

## How to work
- Finish a phase, run `npm run lint` and `npm run build`, fix what fails, then make **one git commit** for the phase and stop. Report what was built, what is a draft, and what needs Lynn's input.
- Anything the brief doesn't answer: do not guess or invent. Leave it empty and add it to the "Before this goes live" checklist in the README.
- Run `/audit-conduct` before the final commit.
