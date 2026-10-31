---
name: audit-conduct
description: Audit the Crest Advocates site against the professional-conduct guardrails in CLAUDE.md. Run before launch or after any content change.
disable-model-invocation: true
---

Audit the project against the guardrails in `CLAUDE.md` (full text in `docs/BRIEF.md` §2). **Report only. Do not edit any file** until I say so.

Check each item with real searches (Grep or `git grep`) over `src/`, `public/` and `README.md`, and report every hit as `file:line` with a verdict (violation or fine, with a reason). A word like "best practice" inside a sentence is a judgement call; say which way you judged.

1. **Superlatives and guarantees** (case-insensitive): best, leading, top, "#1", "number one", winning, "win your case", guarantee, "trusted by", award, premier.
2. **Free-consultation wording**: "free" near consult/consultation/advice. `business.consultation.isFree` must be `null` and must not be rendered as a claim.
3. **Invented credentials or numbers**: "years of experience", "cases", "clients served", LSK, "practising certificate" numbers, any year stated as founding or admission date, any percentage or statistic.
4. **Testimonials, case results, client logos**: any testimonials component, JSON file or section.
5. **Banned stack**: supabase, cart, checkout, wishlist, mpesa, auth middleware, admin routes.
6. **Hex colours outside `src/config/business.ts`**: pattern `#[0-9a-fA-F]{3,8}` in `.ts`, `.tsx`, `.css`, `.json`. Fallbacks that mirror `business.ts` in `globals.css` are acceptable only if you name them.
7. **Hardcoded business data outside `business.ts`** in components: "Crest Advocates", "113 467 024", "254113467024", the tagline, the disclaimer text.
8. **Legal copy hygiene** in `blogs.json`, `services.json`, `faqs.json`: no section numbers (`section \d+`, `s\.\s?\d+`), no fee amounts (KES, Ksh, shillings), no timelines ("within 14 days", "30 days"), no filing thresholds. Every post ends with the "General information only — not legal advice" notice.
9. **Draft flags**: every service except `business-legal-retainer`, every blog post, the mission and vision, process steps, FAQs and Lynn's team entry have `status: "draft"`. `DraftBadge` renders only when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`.
10. **Empty values hidden**: every use of `business.email`, `address`, `city`, `hours`, `mapUrl`, `foundedYear`, `linkedinUrl`, `facebookUrl`, and every optional team field is guarded so an empty value renders nothing (no empty boxes, no `undefined`, no `mailto:` with no address).
11. **Contact API**: it never logs or stores `description`/message bodies; it returns `ok: false` when email is not configured; the UI shows the fallback, never a false success.
12. **Next.js gotchas**: `useSearchParams` only inside `<Suspense>`; `"use client"` present where hooks or handlers are used; no duplicate list keys; no `remotePatterns`.
13. **Uncropped owner photo** (`owner-original.jpg`) is not referenced anywhere in `src/`, is listed in `.gitignore`, and is not tracked by git (`git ls-files assets`).
14. **Emoji and exclamation marks** in user-facing copy.

Finish with a table: item number, PASS or FAIL, and the number of hits. Then list the fixes you recommend, ordered by importance. Run `npm run lint` and `npm run build` and include their result.
