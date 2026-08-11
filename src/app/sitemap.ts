import type { MetadataRoute } from "next";

import { company } from "@/content/company";
import { href, pageKeys } from "@/content/pages";
import { htmlLang, locales } from "@/lib/i18n";

/** All 18 routes, each carrying its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pageKeys.flatMap((key) =>
    locales.map((locale) => ({
      url: `${company.siteUrl}${href(locale, key)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [htmlLang[code], `${company.siteUrl}${href(code, key)}`]),
        ),
      },
    })),
  );
}
