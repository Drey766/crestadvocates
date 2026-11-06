# Crest Advocates — website

The website for Crest Advocates, a law firm in Kenya founded by Lynn Ngugi. It explains the firm's services in plain English, introduces the team, publishes general legal information ("Insights") and makes it easy to get in touch by WhatsApp, phone or a consultation request form.

Built with Next.js (App Router), TypeScript, Tailwind CSS, `zod`, `resend` and `lucide-react`. There is no database, no login and no payments. All content lives in files in this repository.

- [Setup](#setup)
- [Deploying to Vercel](#deploying-to-vercel)
- [Where things live](#where-things-live)
- [Editing content](#editing-content)
- [Before this goes live — checklist for Lynn](#before-this-goes-live--checklist-for-lynn)
- [Photography wishlist](#photography-wishlist)
- [QA checklist](#qa-checklist)

---

## Setup

You need Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local     # then fill in the values below
npm run dev                    # http://localhost:3000
```

Before every commit:

```bash
npm run lint
npm run build
```

Both must finish with zero errors. The build also checks every file in `src/data/`: a missing field, a duplicate slug, a typo in a `status` value or an Insights post without the closing "not legal advice" notice stops the build with a message naming the file and the problem.

### Environment variables (`.env.local`)

| Variable | Needed? | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | For the form to email | API key from [Resend](https://resend.com). |
| `CONTACT_EMAIL_TO` | For the form to email | The firm's inbox that receives consultation requests. |
| `CONTACT_FROM_EMAIL` | For the form to email | Sender address, on a domain verified in Resend, e.g. `Website <website@yourdomain.co.ke>`. |
| `NEXT_PUBLIC_SITE_URL` | Yes | The live address, e.g. `https://crestadvocates.co.ke`. Used for canonical links, the sitemap and social previews. |
| `NEXT_PUBLIC_BOOKING_URL` | Optional | A Cal.com or Calendly link. When set, the contact page shows "Book a time online". |
| `NEXT_PUBLIC_SHOW_DRAFT_FLAGS` | Yes | `true` shows a "Draft — confirm with client" badge on unconfirmed content. Use `true` on previews and `false` on the live site. |
| `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME`, `OWNER_WHATSAPP_NUMBER` | Optional | Sends the firm a short WhatsApp alert (name, area of law, preferred contact method; never case details) when a request arrives. Needs the WhatsApp Cloud API and an approved message template with three body parameters in that order. |

**Without the three email variables the form still works safely:** it never claims a request was sent. Visitors see a message asking them to use WhatsApp or phone instead, with buttons for both.

Note: until a sending domain is verified, Resend only delivers to the email address on your own Resend account.

### Images

The logo and Lynn's portrait are generated from the two originals in `assets/`:

```bash
node scripts/prepare-assets.mjs
```

Never crop or resize images by hand. `assets/owner-original.jpg` shows client files on the desk: it is listed in `.gitignore` and must **never** be committed, pushed or displayed. Only the cropped portrait the script produces is used. The generated files in `public/images/` are committed, so the script only needs to run again when the originals change.

The service and Insights photos in `public/images/photos/` come from [Pexels](https://www.pexels.com/license/) (free for commercial use, no attribution required). `scripts/prepare-photos.mjs` lists each one with its source page; add a line there and run `node scripts/prepare-photos.mjs` to change them. Keep to the rules at the start of that script: no gavels, scales or skylines, no recognisable faces, and no readable text on documents.

---

## Deploying to Vercel

1. Push this repository to GitHub. Check first that `git ls-files assets` does not list `owner-original.jpg`.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected Next.js settings.
3. Under **Settings → Environment Variables**, add the variables from the table above:
   - **Production:** `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=false` and `NEXT_PUBLIC_SITE_URL` set to the real domain.
   - **Preview:** `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true`, so Lynn can see what still needs confirming.
4. Deploy. Under **Settings → Domains**, add the firm's domain and follow Vercel's DNS instructions.
5. Variables starting with `NEXT_PUBLIC_` are fixed when the site is built. After changing one, **redeploy** for it to take effect.
6. Send a test request through the live form and check it arrives in the firm's inbox.

The form's spam protection (a hidden field, a minimum time to fill in the form, and a limit of 5 requests per 10 minutes per address) keeps its count in memory on each server instance. That is enough for a site of this size; a shared store such as Upstash would be needed for stricter limits.

---

## Where things live

| What | Where |
| --- | --- |
| Firm name, tagline, phone, WhatsApp, email, address, hours, social links, all page copy, legal wording, colours, fonts | `src/config/business.ts` |
| Navigation labels | `src/config/nav.ts` |
| Services (practice areas) | `src/data/services.json` |
| Team members | `src/data/team.json` |
| Insights (blog) posts | `src/data/blogs.json` |
| FAQs (contact page) | `src/data/faqs.json` |
| "How it works" steps (home page) | `src/data/process.json` |
| Content types | `src/types/index.ts` |

Rules for anyone editing the code:

- Never type the firm's name, phone number, copy or a colour (hex code) inside a component. Add it to `business.ts` and import it.
- Empty means "not provided yet". Leave unknown values as `""`, `[]` or `null`; the site hides anything empty. Never fill gaps with placeholder or invented text.
- `"status": "draft"` marks content the firm has not confirmed. Change it to `"confirmed"` once Lynn approves it.

---

## Editing content

Every content file is a JSON list. Copy an existing entry, change it, and run `npm run build` to check it. Write in plain English, address the reader as "you", and avoid exclamation marks, emoji and superlatives ("best", "leading", "top").

### Add a service

Add an entry to `src/data/services.json`:

```json
{
  "slug": "tax-law",
  "title": "Tax Law",
  "icon": "Landmark",
  "image": "/images/photos/service-tax-law.jpg",
  "audience": ["businesses"],
  "summary": "One sentence shown on cards.",
  "overview": ["Paragraph one.", "Paragraph two."],
  "howWeHelp": ["One thing we do", "Another thing we do"],
  "whatToExpect": ["First step.", "Second step."],
  "faqs": [{ "q": "A common question?", "a": "A plain-English answer." }],
  "relatedPosts": ["slug-of-an-insights-post"],
  "status": "draft"
}
```

- `slug` becomes the address (`/services/tax-law`) and must be unique.
- `audience` is `businesses`, `individuals` or both. It drives the filter tabs on `/services`.
- `icon` is a [Lucide](https://lucide.dev/icons) icon name. If it is new, add it to the map in `src/components/ui/ServiceIcon.tsx`, otherwise a generic icon is shown.
- `image` is optional. Without it, the page shows the icon in a framed box instead of a photo.
- `faqs` and `relatedPosts` may be empty lists. `relatedPosts` must name posts that exist.
- `"featured": true` puts a service first and gives it the wide card. Only the Business Legal Retainer uses it today.
- The new service appears automatically in the services grid, the contact form's "Area of law" list and the sitemap.

### Add an advocate

1. Add the portrait. Ask for a professional headshot (see the [wishlist](#photography-wishlist)), crop it to a square at least 1000 × 1000 px and save it as `public/images/team/<slug>.jpg`. If several photos arrive, it is better to add a crop step to `scripts/prepare-assets.mjs` than to edit them by hand.
2. Add an entry to `src/data/team.json`:

```json
{
  "slug": "jane-doe",
  "name": "Jane Doe",
  "title": "Associate",
  "photo": "/images/team/jane-doe.jpg",
  "photoPosition": "50% 30%",
  "shortBio": "One or two sentences.",
  "bio": ["Paragraph one.", "Paragraph two."],
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
```

- Only `slug` and `name` must be filled in. Every other field may be empty and is hidden when it is.
- Fill in qualifications, admissions and memberships **only** with details the advocate has supplied and confirmed. Never estimate dates or years of experience.
- `photoPosition` (CSS `object-position`) moves the crop focus if a face sits off-centre. With no photo, a branded initials tile is shown.
- The `/team` page grows into a grid as people are added. Each member gets a profile page at `/team/<slug>`.

### Add an Insights (blog) post

Add an entry to `src/data/blogs.json`:

```json
{
  "id": "post-7",
  "title": "A clear, descriptive title",
  "slug": "a-clear-descriptive-title",
  "excerpt": "One or two sentences shown on cards and in search results.",
  "content": "<p>Opening paragraph.</p>\n<h2>A section</h2>\n<p>Text.</p>\n<p><strong>General information only — not legal advice.</strong> Laws change; speak to an advocate about your situation.</p>",
  "cover": "/images/photos/post-a-clear-title.jpg",
  "category": "Business",
  "author_name": "Crest Advocates",
  "read_time": 4,
  "created_at": "2026-11-01",
  "published": true,
  "status": "draft"
}
```

- `content` is simple HTML: `<p>`, `<h2>`, `<ul>`/`<li>`, `<blockquote>`, `<strong>` and `<a href='/contact'>`. Start sections at `<h2>`; the page title is the only `<h1>`.
- Every post **must** end with the notice shown above. The build fails without it.
- Keep posts general. Name widely known Acts (for example the Law of Succession Act) but do not cite section numbers, fees, filing deadlines or thresholds, which change and turn readers' questions into advice.
- `cover` is the path of a photo in `public/images/photos/` (see [Images](#images)). Set it to `null` for a branded card of peak lines instead.
- `category` drives the topic filter on `/blog`. Reuse an existing category where possible.
- Posts are listed newest first by `created_at` (`YYYY-MM-DD`). Set `"published": false` to hide a post without deleting it.

### Add an FAQ

Add an entry to `src/data/faqs.json`. FAQs appear on the contact page.

```json
{ "id": "a-short-unique-id", "q": "The question?", "a": "A plain-English answer.", "status": "draft" }
```

Questions specific to one service belong in that service's `faqs` list in `services.json` instead.

### Change the home page steps, values or copy

- "How it works" steps: `src/data/process.json`. `step` numbers set the order.
- Values, mission, vision, home and about copy, and the privacy and disclaimer pages: `src/config/business.ts`.

---

## Before this goes live — checklist for Lynn

The site is built so that anything not yet supplied is simply left out. It is complete as it stands, but these items need your input or approval before launch. Content marked "draft" shows a "Draft — confirm with client" badge on the preview site.

**Contact details** (in `src/config/business.ts`)

- [ ] Email address for the website and for receiving consultation requests
- [ ] Office address and city, and a map link if you want one
- [ ] Office hours
- [ ] Confirm the Instagram link (`instagram.com/crestadvocates`) and provide LinkedIn or Facebook links, if any
- [ ] The website's domain name
- [ ] Optional: an online booking link (Cal.com or Calendly)

**Content to confirm or edit** (all drafts written for you to review)

- [ ] **Practice areas.** Only the Business Legal Retainer comes from you. Confirm, edit or remove the other eight services and their descriptions and FAQs.
- [ ] **Mission and vision**
- [ ] **Values descriptions** (the three value names are yours; the sentences under them are drafts)
- [ ] **"Who we are"** text on the About page and the three short notes under "Your rights / Your interests / Your peace of mind" on the home page
- [ ] **"How it works" steps**
- [ ] **FAQs** on the contact page
- [ ] **All six Insights posts.** Check each one for accuracy against current law and practice.
- [ ] **Your bio**: the short and full versions on the team page
- [ ] **Retainer summary and About text.** The retainer's promises and overview are still your own words, but its one-line summary and the retainer text on the About page were reworded to avoid repeating the same sentences.
- [ ] **Stock photos** on the service pages and Insights posts. These are illustrations from Pexels, not the firm's clients or premises. Check you are comfortable with them under the advertising rules, particularly the two family photos.

**About you and the team**

- [ ] Confirm your exact title wording (currently "Founder & CEO")
- [ ] Your qualifications, admission to the Roll and the year, practising areas, languages and professional memberships, if you would like them shown
- [ ] Bios, photos and details for any other advocates or staff to include
- [ ] Professional headshots (the current photo is an interim crop; see the wishlist below)
- [ ] Optional: a line about the firm's experience or founding year for the About page. It stays hidden until you provide it.

**Consultations**

- [ ] Is the first consultation charged for? The site currently says only "Schedule a Consultation" and makes no claim either way.

**Compliance**

- [ ] Review all copy against the Advocates (Marketing and Advertising) Rules and LSK guidance on advertising
- [ ] Have the privacy notice reviewed under the Data Protection Act, 2019, including whether the firm needs to register with the Office of the Data Protection Commissioner
- [ ] Have the disclaimer page reviewed

**Technical (for whoever deploys the site)**

- [ ] Verify a sending domain in Resend (or set up an SMTP alternative) and fill in the three email variables; send a test request
- [ ] Optional: set up the WhatsApp Cloud API alert and its message template
- [ ] Once all drafts are confirmed, change their `status` to `"confirmed"` and set `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=false` on the live site

---

## Photography wishlist

The service pages and Insights posts currently use stock photos from Pexels. Real photos of the firm would be stronger, and could replace them over time. In rough order of importance:

1. **Headshot of Lynn.** Plain or softly blurred background, natural light, shoulders up, looking at the camera. Shoot both portrait and square framing, with room around the head for cropping. Business dress in the firm's palette (navy, neutrals) works well against the site.
2. **Headshots of each advocate and staff member** in the same style, background and lighting as Lynn's, so the team grid looks consistent.
3. **Team photo.** The whole team together, in landscape, for the About and Team pages.
4. **Office.** Reception, a meeting room and the building entrance, in landscape. These help visitors recognise the office when they arrive.
5. **Working detail shots.** For example a meeting in progress, or hands with a pen and notebook. Make sure no client names, files or documents are readable in any photo.

Please supply the original full-resolution files (JPEG or HEIC straight from the camera or phone), not screenshots or images sent through WhatsApp, which compresses them.

---

## QA checklist

Run through this before launch and after any significant change. Results from the last full pass (November 2026) are noted.

### Professional conduct

- [x] `/audit-conduct` passes on all 14 checks: no superlatives, guarantees or "free consultation" wording; no invented credentials or statistics; no testimonials; empty details hidden; every post ends with the notice; drafts flagged; the contact API never stores or logs messages and never shows a false success.
- [x] `assets/owner-original.jpg` is not tracked by git and not referenced in `src/`.

### Every page at 375 px (mobile) and 1280 px (desktop)

Pages: `/`, `/about`, `/services`, a service page, `/team`, `/team/lynn-ngugi`, `/blog`, a post, `/contact`, `/contact?service=…`, `/privacy`, `/disclaimer`, and a missing page (404).

- [x] No sideways scrolling at 375 px
- [x] Exactly one `h1` per page, and no skipped heading levels
- [x] Navy and ivory sections alternate; no gold text on white or ivory
- [x] Mobile: the bottom bar (Call · WhatsApp · Book) is always visible and does not cover content; the menu opens, closes with Escape and closes when a link is chosen
- [x] Desktop: the floating WhatsApp button is visible and does not cover content
- [x] Buttons, links and form controls are at least 44 px tall (inline links inside paragraphs excepted)
- [x] Every page still shows its content with JavaScript turned off (test this: it catches content stuck behind a `<Suspense>` boundary, which Lighthouse and axe do not)
- [x] Category labels stay readable on every photo
- [x] All images load and have alt text; Lynn's portrait shows the cropped image only
- [x] `/contact?service=debt-recovery` pre-selects that area of law
- [x] Unknown service, team or post addresses show the 404 page

### Accessibility

- [x] Lighthouse accessibility score 100 on every page, mobile and desktop
- [x] axe-core (WCAG 2.1 A/AA and best practice): no violations on any page at either width
- [x] Tab from the start of each page: "Skip to content" is the first stop; every focused item shows a visible ring (gold on navy, navy on light)
- [x] Every form field has a visible label; errors are announced and linked to their field
- [x] Colour contrast passes WCAG AA throughout
- [x] Motion is limited to subtle transitions and respects "reduce motion"

### Contact form

- [x] Without email settings: submitting shows the WhatsApp and phone fallback, never "Thank you"
- [ ] With email settings: a test request arrives in the firm's inbox, and the visitor sees the confirmation (to repeat once Resend is set up)
- [x] The form warns against sending confidential details

### Build

- [x] `npm run lint` and `npm run build` finish with zero errors
- [ ] After deploying: `/sitemap.xml` and `/robots.txt` use the live domain, and a shared link shows the Crest Advocates preview image
