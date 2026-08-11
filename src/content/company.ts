import type { T } from "@/lib/i18n";

/**
 * Every fact about OdooVast lives here. Nothing in a component may hard-code a
 * phone number, an address or a figure — change it once, here.
 *
 * Sources: FACTS.md (extracted from www.odoovast.com) and the OdooVast
 * branding package README. Anything neither source confirms is `null` and
 * marked TODO — a null value is skipped at render time so an unconfirmed
 * claim can never reach a visitor.
 */

export type Stat = {
  /** null = not yet confirmed by the client. Skipped at render. */
  value: string | null;
  label: T;
};

export const company = {
  /** Always Latin letters, in all three languages. Never transliterated. */
  name: "OdooVast",
  founder: "Mohammed Widad",
  /** Per the branding package: "Always refer to OdooVast as an Odoo Partner". */
  partnerStatus: {
    en: "Odoo Partner",
    ar: "شريك Odoo",
    ckb: "هاوبەشی Odoo",
  } satisfies T,
  tagline: {
    en: "Implement · Customize · Automate · Grow",
    ar: "التطبيق · التخصيص · الأتمتة · النمو",
    ckb: "جێبەجێکردن · تایبەتمەندکردن · ئۆتۆماتیککردن · گەشەکردن",
  } satisfies T,

  siteUrl: "https://www.odoovast.com",
  domain: "www.odoovast.com",
  foundedYear: "2025",

  email: "info@odoovast.com",
  /** Display form — spaced for readability. */
  phoneDisplay: "+964 751 239 9899",
  /** E.164, for tel: links. */
  phoneE164: "+9647512399899",
  /** Digits only, for wa.me links. */
  whatsapp: "9647512399899",

  address: {
    full: {
      en: "Zanyari Tower, Floor 34, Office 3409 — Erbil, Iraq",
      ar: "برج زانياري، الطابق 34، مكتب 3409 — أربيل، العراق",
      ckb: "تاوەری زانیاری، نهۆمی ٣٤، ژووری ٣٤٠٩ — هەولێر، عێراق",
    } satisfies T,
    street: {
      en: "Zanyari Tower, Floor 34, Office 3409",
      ar: "برج زانياري، الطابق 34، مكتب 3409",
      ckb: "تاوەری زانیاری، نهۆمی ٣٤، ژووری ٣٤٠٩",
    } satisfies T,
    city: { en: "Erbil", ar: "أربيل", ckb: "هەولێر" } satisfies T,
    region: {
      en: "Kurdistan Region",
      ar: "إقليم كردستان",
      ckb: "هەرێمی کوردستان",
    } satisfies T,
    country: { en: "Iraq", ar: "العراق", ckb: "عێراق" } satisfies T,
    /** ISO 3166-1 alpha-2, for JSON-LD. */
    countryCode: "IQ",
  },

  hours: {
    en: "Open 24 hours, 7 days a week",
    ar: "مفتوح 24 ساعة، 7 أيام في الأسبوع",
    ckb: "٢٤ کاتژمێر کراوەیە، ٧ ڕۆژی هەفتە",
  } satisfies T,
  /** schema.org openingHours — 24/7. */
  hoursSchema: "Mo-Su 00:00-23:59",

  maps: {
    /** Keyless Google Maps embed, resolved from the address above.
     *  TODO: replace with the exact place pin once the office is listed on Google Business. */
    embedSrc:
      "https://www.google.com/maps?q=Zanyari%20Tower%2C%20Erbil%2C%20Iraq&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Zanyari+Tower%2C+Erbil%2C+Iraq",
  },

  /** TODO: paste the Google Search Console meta-tag token here (the value of
   *  content="..." from the HTML-tag verification method) and the tag renders
   *  on every page automatically. null = no tag. Not needed if verification
   *  was done via the DNS TXT record instead. */
  googleSiteVerification: null as string | null,

  social: {
    /** Public company page. The numeric id resolves for any visitor.
     *  TODO: swap for the vanity URL (linkedin.com/company/odoovast) once claimed. */
    linkedin: "https://www.linkedin.com/company/121174182/",
    facebook: "https://www.facebook.com/odoovast/",
    /** TODO: Instagram handle, if OdooVast has one. */
    instagram: null as string | null,
  },

  /**
   * TODO: all four figures are unconfirmed. Set `value` to the real number and
   * it appears automatically; leave it null and the tile is skipped. Never
   * invent one — see FACTS.md, "Do not publish invented numbers."
   */
  stats: [
    {
      value: null,
      label: { en: "Years experience", ar: "سنوات الخبرة", ckb: "ساڵ ئەزموون" },
    },
    {
      value: null,
      label: { en: "Projects completed", ar: "مشروعاً منجزاً", ckb: "پڕۆژەی تەواوکراو" },
    },
    {
      value: null,
      label: { en: "Industries served", ar: "قطاعاً نخدمه", ckb: "کەرتی خزمەتکراو" },
    },
    {
      value: null,
      label: { en: "Client retention", ar: "نسبة بقاء العملاء", ckb: "مانەوەی کڕیار" },
    },
  ] satisfies Stat[],
} as const;

export type Company = typeof company;
