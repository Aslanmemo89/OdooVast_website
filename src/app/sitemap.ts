import type { MetadataRoute } from "next";

import { company } from "@/content/company";
import { href, isLegalKey, pageKeys } from "@/content/pages";
import { hreflang, locales } from "@/lib/i18n";

/** All 27 routes, each carrying its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pageKeys.flatMap((key) =>
    locales.map((locale) => ({
      url: `${company.siteUrl}${href(locale, key)}`,
      lastModified,
      // Legal pages are indexed — Meta and Google check that the privacy URL
      // resolves — but they should never outrank the pages that sell the work.
      changeFrequency: isLegalKey(key) ? ("yearly" as const) : ("monthly" as const),
      priority: key === "home" ? 1 : isLegalKey(key) ? 0.3 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [hreflang[code], `${company.siteUrl}${href(code, key)}`]),
        ),
      },
    })),
  );
}
