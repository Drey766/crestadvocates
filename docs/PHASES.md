# Build phases

Work through these in order, **one per Claude Code session**. After each phase: look at the site in your browser, then type `/clear` and start the next phase. Nothing is lost between phases, because the code is on disk and committed to git, and `CLAUDE.md` reloads by itself.

## The one prompt to paste at the start of each phase

```
Read CLAUDE.md, then do Phase N from docs/PHASES.md (and read the BRIEF sections it names). Do that phase only. When lint and build pass, commit and give me a short report.
```

Replace `N` with the phase number. For Phase 1 it is a good idea to press **Shift+Tab** until the mode shows **plan**, so Claude shows its plan first and you approve it before any files change.

---

## Phase 1 — Foundation
**Read:** BRIEF §3, §4, §5, §6, §11, §13, §14, §15, §16.

1. Scaffold Next.js. `create-next-app` refuses to run in a folder that already has files, so scaffold into a temporary subfolder and move everything up:
   `npx create-next-app@latest crest-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes`
   (the subfolder name can't start with an underscore). Move all of its files, including `.gitignore`, into this folder, then delete the subfolder. Never overwrite `CLAUDE.md`, `START-HERE.md`, `docs/`, `assets/`, `scripts/` or `.claude/`. Then read the new `AGENTS.md`.
2. `npm install zod resend lucide-react` and `npm install --save-dev sharp`.
3. Add `assets/owner-original.jpg` to `.gitignore` (it shows client files, so it must never be committed or pushed). Then run `node scripts/prepare-assets.mjs`. **Open the generated images and check them:** the shield must not show the tops of the "CREST" letters, and Lynn's crop must show head and shoulders with no legible documents. Stop and tell me if either looks wrong.
4. Create `src/config/business.ts` exactly as in BRIEF §3, and `src/types/index.ts` as in §13.
5. Set up fonts with `next/font/google`, the colour CSS variables from `business.colors`, and `globals.css` component classes (§5).
6. Build the layout shell: skip link, Navbar (live-text lockup with the shield), Footer, MobileActionBar, WhatsAppPill, `LegalService` JSON-LD, metadata, favicon/apple icon from `favicon-256.png`.
7. Build the UI primitives: GoldRule, MountainPattern, CheckList, DraftBadge, Logo, Disclaimer. Put a simple placeholder on the home page just to prove the layout works.
8. Add `.env.example` with the variables from §16.

**Done when:** `npm run lint` and `npm run build` pass, the layout looks right at 375px and at desktop width, and there is one commit.

## Phase 2 — Content data
**Read:** BRIEF §12 (services, team, process, faqs), §2, §13.

1. Write `src/data/services.json` (9 services; only the retainer is `confirmed`), `team.json`, `process.json`, `faqs.json`, exactly as specified.
2. Add a small typed loader (`src/lib/data.ts`) so TypeScript checks every JSON file against `src/types`.
3. Create an empty-but-valid `src/data/blogs.json` (`[]`).

**Done when:** build passes with the typed loader, every non-retainer service is `draft`, no copy contains section numbers, fees, timelines or superlatives, and there is one commit.

## Phase 3 — Blog posts
**Read:** BRIEF §12 (blogs), §2.

Write the 6 articles into `blogs.json`: 600–800 words each, HTML with `h2`, `p`, `ul`, `blockquote`, all `status: "draft"`, author "Crest Advocates", `cover: null`. Every post ends with the "General information only" notice and a consultation call to action. If the session stops partway, say "continue from post N".

**Done when:** six valid posts, no section numbers, fee amounts, thresholds or timelines, and one commit.

## Phase 4 — Home and About
**Read:** BRIEF §4, §5, §8 (Home, About), §6.

Build every Home section (hero through final CTA band) and the About page. Sections whose data is empty (Experience, Credentials) must not render at all.

**Done when:** both pages work at 375px and desktop, navy and ivory sections alternate, no gold text on light backgrounds, build passes, one commit.

## Phase 5 — Services and Team
**Read:** BRIEF §8 (Services, Team), §5, §12.

Build `/services` with audience filter tabs, `/services/[slug]` detail pages, `/team` (must look finished with one member, and grow into a grid), `/team/[slug]` with `Person` JSON-LD. Every team field is optional and hidden when empty.

**Done when:** all 9 service pages and Lynn's profile render, unknown slugs 404, build passes, one commit.

## Phase 6 — Blog, Contact, legal pages, SEO
**Read:** BRIEF §8 (Blog, Contact, Legal), §9, §10, §16.

Build `/blog` ("Insights" in the nav) and post pages with `Article` JSON-LD and generated cover cards. Build `/contact` with the consultation form (Suspense-wrapped for `?service=`) and `/api/contact` exactly as §9 describes: zod, honeypot, minimum submit time, rate limit, Resend, WhatsApp fallback, no storing or logging bodies. Add `/privacy`, `/disclaimer`, `not-found.tsx`, `sitemap.ts`, `robots.ts`.

**Done when:** with no email keys set the form shows the WhatsApp/phone fallback and never a false "success"; build passes; one commit.

## Phase 7 — QA, audit, README
**Read:** BRIEF §10, §11, §17.

1. Run `/audit-conduct` and fix every failure it reports.
2. Check every page at 375px and at 1280px. If Playwright is available, take screenshots and look at them; otherwise use the dev server and describe what you verified.
3. Check keyboard focus, labels, contrast and heading order, and run a Lighthouse accessibility pass if possible.
4. Write `README.md`: setup and Vercel deploy steps, how to add a service, advocate, blog post or FAQ, the **"Before this goes live" checklist for Lynn**, a photography wishlist, and the QA checklist (BRIEF §17).
5. Final `npm run lint` and `npm run build`, then commit.

**Done when:** the audit passes, the README is complete, and the build is green.
