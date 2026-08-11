import type { Metadata } from "next";

import { company } from "@/content/company";
import { href, pageMeta, type PageKey } from "@/content/pages";
import { hreflang, locales, t, type Locale } from "@/lib/i18n";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_IQ",
  ckb: "ckb_IQ",
};

/**
 * Title, description, canonical, hreflang alternates, Open Graph and Twitter
 * card for one page in one language. Every page calls this from
 * `generateMetadata`, so no page can ship without them.
 */
export function buildMetadata(locale: Locale, key: PageKey): Metadata {
  const title = t(pageMeta[key].title, locale);
  const description = t(pageMeta[key].description, locale);
  const path = href(locale, key);

  const languages: Record<string, string> = { "x-default": href("en", key) };
  for (const code of locales) {
    languages[hreflang[code]] = href(code, key);
  }

  return {
    title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: "website",
      siteName: company.name,
      title,
      description,
      url: path,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((c) => c !== locale).map((c) => OG_LOCALE[c]),
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 627,
          alt: `${company.name} — Odoo Partner, Erbil, Iraq`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
