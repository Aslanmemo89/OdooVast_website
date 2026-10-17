# OdooVast — confirmed facts

Everything here was extracted from the live site at www.odoovast.com on
2026-08-11. It is the source of truth for the rebuild.

Lines marked `TODO:` are **not** confirmed — fill them in or ask before using.

---

## Identity

| | |
|---|---|
| Name | **OdooVast** (Latin letters in all languages — never transliterate) |
| Status | Certified Odoo Partner |
| Location | Erbil, Iraq |
| Positioning | "Get in touch with OdooVast for a free consultation. Located in Erbil, Iraq." |

## Contact — verified

| | |
|---|---|
| Phone | `+964 751 239 9899` |
| WhatsApp | `https://wa.me/9647512399899` |
| Email | `info@odoovast.com` |
| Office | Zanyari Tower, F34, Office 3409 — Erbil, Iraq |
| Website | www.odoovast.com |

**LinkedIn — broken on the current site.** It links to
`linkedin.com/company/121174182/admin/dashboard/`, an admin URL that only the
page owner can open. Visitors get a permission error.
`TODO: the public LinkedIn company URL`

**Working hours — confirmed by the owner on 2026-10-17: Saturday to Thursday,
9 am to 5 pm.** This replaces the "Open 24 hours, 7 days a week" taken from
the old site; nothing on the site says 24/7 any more. The JSON-LD carries
the same hours as an `openingHoursSpecification`, Saturday to Thursday,
09:00–17:00 (`company.hoursSchema`).
`TODO: Google Maps embed link`
`TODO: Facebook / Instagram, if any`

## Services — verified

| Service | Description (as written today) |
|---|---|
| Odoo Implementation | End-to-end deployment of Odoo ERP tailored to your specific business workflows. |
| Custom Module Development | Tailor-made solutions for unique business requirements. |
| Third-Party Integrations | Connect Odoo with your existing software ecosystem. |
| Support & Maintenance | Ongoing technical assistance to ensure system stability. |
| Website & eCommerce | Build stunning websites fully integrated with your backend operations. |
| Accounting & Finance | Automate invoicing, track expenses, and generate real-time financial reports. |
| Sales Management | Manage quotations, sales orders, and customer relationships in one place. |
| Purchase Management | Automate procurement and manage vendor relationships. |
| Inventory & Warehouse | Smart double-entry inventory to maximize efficiency and reduce stockouts. |
| Manufacturing (MRP) | Streamline production with BOMs, work orders, and quality control. |
| Point of Sale (POS) | User-friendly POS system that works online and offline. |

**Added on the owner's request (2026-10-15), not from the live site:**
Mobile Applications — "mobile apps for Android and iOS — on their own, or
connected to your Odoo". Confirmed by the owner on 2026-10-17: both Android
and iOS, apps for customers and for staff, and OdooVast builds apps that stand
on their own as well as Odoo mobile apps for its clients.
`TODO:` confirm publishing to Google Play and the App Store, and ongoing
updates, before relying on that services-page line.

## Industries — verified

- **Retail** — unified POS and inventory for single or multi-branch operations
- **Manufacturing** — complete control of the production floor, raw material to finished goods
- **Steel / trading & distribution** — specialised solutions for steel manufacturing, trading and distribution
- **Fashion & apparel** — manage complex product variants (size, colour, style)
- **Restaurants / food service** — fast table management, kitchen routing, delivery
- **Wholesale & logistics** — advanced logistics and warehouse management

## Timeline — verified

| Year | Milestone |
|---|---|
| 2015 | Company founded — started as a small IT consultancy in Erbil |
| 2018 | `TODO: what happened in 2018` |
| 2021 | Became a Certified Odoo Partner *(confirm the exact year)* |
| 2024 | Expanded operations across Iraq and the Middle East |

## Selling points — verified

- Certified Odoo Partner
- Expert team
- Support Saturday to Thursday, 9 am to 5 pm (owner, 2026-10-17 — the old site said 24/7)
- Proven results
- Enterprise excellence

## Stats — labels confirmed, numbers NOT

The current site shows four figures. Only the labels came through:

- Years Experience — `TODO:` (2015 → today would be 11, confirm)
- Projects Completed — `TODO:`
- Industries Served — `TODO:`
- Client Retention — `TODO:`

**Do not publish invented numbers.** Ask for the real ones.

## Clients — confirmed by the owner

Logos supplied on 2026-08-14 and 2026-10-15; business, city and branch
details on 2026-10-15. Recorded in `src/content/clients.ts` — nothing beyond
what the owner said. **Never invent a client.**

| Client | Business (owner's words) | Where |
|---|---|---|
| Alnajar Steel | Makes jacks, scaffolding and pipes | Erbil · 4 factories |
| Salar Jamal | Clothing | 5 branches in Erbil, 2 in Baghdad |
| Retal | Machines (saws, "کۆسەرە") and kitchen spare parts | Baghdad, Erbil, Mosul, Syria, China |
| Vendor for General Trading | Derimod-brand clothing; the brand's main branch is in Turkey | Erbil, Duhok |
| Merry An | Car spare parts | 2 branches in Erbil |
| Som — Since 1944 | Men's shoes | 2 branches: Baghdad and Erbil |
| Brix Burger | Restaurant | Erbil |
| Diamond Parda Company | Zebra and fabric curtains | 1 branch in Erbil |
| Aljawahir | Iron | 1 branch |

- "دیری مۆند" (Derimod clothing), as the owner described it, is Vendor for
  General Trading — confirmed by the owner on 2026-10-17.
- `TODO:` "کۆسەرە" (one of Retal's machines) is kept in the Kurdish text
  only; the English and Arabic say "machines such as saws". Confirm the term.

Case studies (scope, modules, results) are still unwritten — publish them
only with each client's written approval.

## Odoo prices — Odoo's, not OdooVast's

The pricing page (`/pricing`) shows **Odoo's** published prices, copied on
2026-10-16 from odoo.com/pricing and odoo.sh/pricing as they appear to a
visitor in Iraq (Odoo prices by country; the page reported
`geoip_country_code: "IQ"`), in US dollars. All figures live in
`src/content/pricing.ts` → `rates`.

| | Billed yearly | Billed monthly |
|---|---|---|
| One App Free | $0 | $0 |
| Standard, per user / month | $7.25 (regular $8.95) | $9.10 (regular $11.20) |
| Custom, per user / month | $13.40 (regular $16.40) | $16.90 (regular $20.90) |
| Light User, per user / month | $2.90 | $2.90 |
| Odoo.sh worker / month | $57.60 | $72.00 |
| Odoo.sh storage, per GB / month | $0.20 | $0.25 |
| Odoo.sh dedicated server / month | $480.00 | $600.00 |
| Odoo.sh staging environment / month | $14.40 | $18.00 |

- The lower licence price is a discount for the first 12 months on the
  users ordered at the start.
- Odoo.sh limits: shared 1–16 workers, 1–512 GB; dedicated 8–256 workers,
  up to 4096 GB; 1–20 staging environments. **Odoo always bills at least one
  staging environment** (owner, 2026-10-17; on odoo.com/pricing-configurator
  the staging box starts at 1, and typing 0 leaves the total unchanged —
  checked on 2026-10-17). So the smallest Odoo.sh
  hosting is $72.20 a month billed yearly ($57.60 + $0.20 + $14.40), or
  $90.25 billed monthly.
- Odoo's sizing suggestion, from its purchase form
  (odoo.com/pricing-configurator, checked on 2026-10-17 from 1 to 1,025
  users): one worker for every 25 users and 1 GB of storage for every 2
  users, both rounded up. The help on odoo.sh/pricing adds one more worker
  for every 5,000 website visitors a day.
- Light User licences are arranged through an Odoo advisor (customised quote).
- OdooVast's own implementation prices are **not** published — they are
  quoted after the free consultation. Do not add any.
