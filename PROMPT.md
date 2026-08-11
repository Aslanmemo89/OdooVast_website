# Build prompt — OdooVast website rebuild

> **بەکارهێنان:** VS Code لەم فۆڵدەرەدا بکەرەوە، Claude Code بکەرەوە، و ئەم دەقە
> کۆپی بکە. لۆگۆکەت بخە ناو ئەم فۆڵدەرە بە ناوی `logo.png`.
> پێش دەستپێکردن `FACTS.md` بخوێنەوە و ئەو دێڕانەی `TODO:`یان لەبەردەمە پڕ بکەرەوە.

---

## Context

OdooVast is a certified Odoo partner in Erbil, Iraq. A site already exists at
**www.odoovast.com**, built with Hostinger Horizons. The owner is not happy with
it. You are rebuilding it properly.

Everything factual about the company — services, contact details, timeline — has
already been pulled out of the current site and written into **`FACTS.md`** next
to this file. Read it first. It is the single source of truth for copy.

### What is wrong with the current site — fix all of it

- `<title>` is literally **"Hostinger Horizons"** on every page, and the favicon
  is the default **Vite logo**. The company name appears nowhere in the browser
  tab or in Google results.
- No meta description, no Open Graph tags, no structured data, no `sitemap`
  beyond a stub. Sharing a link produces a blank card.
- Every page is client-rendered from one JavaScript bundle — 550 KB before any
  content appears. Slow on Iraqi mobile connections and weak for search.
- The LinkedIn link points at
  `linkedin.com/company/121174182/admin/dashboard/` — an **admin URL** that only
  works for the page owner. Visitors hit a permission error. Use the public
  company URL.
- English only, in a market where Arabic and Kurdish matter.

## What to build

A fast, credible **B2B website for an ERP consultancy**. The single conversion
goal is a qualified enquiry — a WhatsApp message, a call, or a form submission.
Nothing is sold online.

No cart, no checkout, no prices, no user accounts, no admin panel, no CMS.

## Stack — use exactly this

- **Next.js 14.2.15**, App Router, TypeScript 5.6
- **React 18.3**
- **Plain CSS** in `src/app/globals.css` driven by CSS custom properties
- No database, no backend service, no API keys, no secrets of any kind
- No Tailwind, no Bootstrap, no UI kit, no animation library, no i18n library

`package.json` dependencies must be exactly `next`, `react`, `react-dom`.

Rationale: this must build to static output on Vercel's free tier and stay
readable to whoever opens it in a year. Every dependency is something someone
has to maintain — so add none.

## Content lives in code

All copy sits in typed objects under `src/content/`. No fetching, no markdown
pipeline. Changing a sentence means opening one file and editing one string.

```
src/content/company.ts    contact details, address, hours, social
src/content/services.ts   one entry per service, all three languages
src/content/industries.ts one entry per industry
src/content/timeline.ts   the company milestones
src/content/pages.ts      home / about / contact copy
```

Type every translatable string as `{ en: string; ar: string; ckb: string }` so a
missing translation is a compile error rather than a silent English fallback.

## Languages

**English (`en`, LTR)**, **Arabic (`ar`, RTL)**, **Kurdish Sorani (`ckb`, RTL)**.

- Hand-write a dictionary and a `t()` helper in `src/lib/i18n.ts` — about 60
  lines. Do not install an i18n package.
- Locale in the path: `/en/...`, `/ar/...`, `/ckb/...`. `/` redirects to `/en`
  (this is a B2B site whose buyers often read English first).
- Set `<html lang>` and `<html dir>` per locale.
- **RTL must be genuine.** Use logical properties throughout —
  `margin-inline-start`, `padding-inline-end`, `inset-inline-start`,
  `text-align: start` — so one stylesheet serves both directions. No
  `[dir="rtl"]` override blocks except where a layout truly differs.
- Language switcher in the header stays on the current page.
- Fonts through `next/font/google`, self-hosted: Inter for Latin, Noto Kufi
  Arabic (or Cairo) for Arabic script. Never a CDN `<link>`.
- Keep the brand as **"OdooVast"** in Latin letters in all three languages. Never
  transliterate it into Arabic or Kurdish script.

Translate the English copy in `FACTS.md` into Arabic and Kurdish yourself. Keep
technical product names in Latin — "Odoo", "POS", "MRP", "ERP".

## Pages

Mirror the existing sitemap so nothing already indexed is lost:
`/`, `/about`, `/services`, `/industries`, `/portfolio`, `/contact`
(each under its locale prefix).

**Home** — hero with the positioning line and two actions (WhatsApp, Book a
consultation); certified-partner credibility strip; the six core services as
cards; industries served; the four stat figures; closing call to action.

**About** — the story, the 2015 → 2024 timeline from `FACTS.md`, what the company
stands for, why an Odoo partner rather than a freelancer.

**Services** — a block per service: what it is, what is included, who it suits,
ending with a WhatsApp button carrying that service name in the message.

**Industries** — a block per industry with the concrete problems Odoo solves
there. This is the page that wins deals: be specific, not generic.

**Portfolio** — case studies. `FACTS.md` has no client names, so build the layout
and fill it with clearly-marked placeholders. **Do not invent clients.**

**Contact** — phone, WhatsApp, email, the office address, hours, all tappable.
Embedded Google Map by `<iframe loading="lazy">`. Contact form as below.

## Contact form — no backend

Zero server, zero third-party account, zero secrets: collect name, company,
phone and message, then open WhatsApp with the message pre-filled at
`https://wa.me/9647512399899?text=<encoded>`.

Validate before opening — name and message non-empty, phone a real Iraqi mobile.
Use this canonical form so numbers always normalise the same way:

```ts
/** 9647XXXXXXXXX, or "" when it isn't an Iraqi mobile. */
export function normalizeIqPhone(raw: string): string {
  let d = (raw || "").replace(/[^\d]/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  const c = d.startsWith("964") ? d
          : d.startsWith("0") ? "964" + d.slice(1)
          : d.startsWith("7") ? "964" + d : d;
  return /^9647\d{9}$/.test(c) ? c : "";
}
```

Show validation messages in the active language. Floating WhatsApp button on
every page.

## Design

Aim for the quiet confidence of a firm that runs other companies' finances — not
a startup landing page. No gradient blobs, no stock photos of handshakes, no
"🚀 supercharge your business".

- Everything from CSS custom properties on `:root`: two brand colours taken from
  `logo.png`, a neutral ramp, spacing scale, radius, shadow. Changing one value
  must restyle the site.
- Generous whitespace, clear type scale, ~65 character reading measure.
- Mobile-first — most Iraqi traffic is phone traffic on a slow connection.
- Motion only on scroll-reveal and hover, subtle, inside
  `@media (prefers-reduced-motion: reduce)`.
- Dark mode via `prefers-color-scheme` if it is cheap; skip it entirely rather
  than ship it half-done.
- Visible focus states everywhere. Contrast at WCAG AA.
- Icons as inline SVG. No icon package.
- Images through `next/image` with explicit dimensions and translated `alt`.

## SEO — this is where the current site fails hardest

- Real `<title>` and meta description per page per language, via
  `generateMetadata`
- Open Graph and Twitter cards, with a proper share image
- `hreflang` alternates across the three locales
- `sitemap.ts` and `robots.ts`
- JSON-LD `ProfessionalService` with the real address, phone, and hours from
  `FACTS.md`
- Favicon, apple-touch-icon and OG image generated from `logo.png` —
  **the Vite logo must not survive anywhere**
- Statically rendered HTML, so content is in the source, not assembled by JS

## Project layout

```
src/
  app/
    [locale]/
      layout.tsx      lang/dir, fonts, header, footer
      page.tsx        home
      about/page.tsx
      services/page.tsx
      industries/page.tsx
      portfolio/page.tsx
      contact/page.tsx
    layout.tsx
    globals.css
    sitemap.ts
    robots.ts
  components/         Header, Footer, Hero, ServiceCard, IndustryCard,
                      Timeline, Stats, ContactForm, WhatsAppFab,
                      LangSwitcher, Reveal, Section
  content/            company.ts, services.ts, industries.ts,
                      timeline.ts, pages.ts
  lib/                i18n.ts, phone.ts, whatsapp.ts
public/               logo.png, og.jpg, favicon files
```

## Honesty rules

**Do not invent anything about this company.** No client names, no logos of
companies they have not worked with, no testimonials, no certifications beyond
the Odoo partnership already stated, no project counts other than the figures in
`FACTS.md`. Where a fact is missing, leave a visible `TODO:` in the content file
and build the layout around it.

The four stat figures in `FACTS.md` have labels but no confirmed values — ask me
for the real numbers rather than guessing them.

## Definition of done

- [ ] `npm run build` passes, no TypeScript errors, no warnings
- [ ] Six pages × three languages = 18 routes, all working
- [ ] Arabic and Kurdish read correctly right-to-left, forms and lists included
- [ ] Every phone / WhatsApp / email / map link opens correctly on a phone
- [ ] LinkedIn points at the public company page, not the admin dashboard
- [ ] Browser tab shows OdooVast and the real favicon on every page
- [ ] Nothing hard-coded in a component that belongs in `src/content/`
- [ ] No unused files, no commented-out code, no `console.log`
- [ ] Lighthouse mobile: Performance ≥ 95, Accessibility 100, SEO 100
- [ ] `README.md`, written in Kurdish, covering: how to change text, add a
      service, swap the logo, and deploy
- [ ] A list of every remaining `TODO:` placeholder

## How to work

Open `logo.png` first and take the real brand colours from it. Ask me about
anything genuinely ambiguous **about the company** — never about the technology,
where the decisions above are already settled.

Scaffold, build the whole thing, run `npm run build`, fix whatever it reports,
then show me the site running locally.

Do not deploy, do not create a GitHub repo, and do not touch DNS or the live
domain without asking me first. The current site stays up until I say otherwise.
