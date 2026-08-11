import { company } from "@/content/company";
import { href, pageMeta, type PageKey } from "@/content/pages";
import { t, ui, type Locale } from "@/lib/i18n";

/**
 * BreadcrumbList structured data for inner pages (Home → Page), so Google can
 * show a breadcrumb instead of a raw URL in results. The home page carries the
 * main ProfessionalService data instead and never renders this.
 */
export function BreadcrumbLd({ locale, current }: { locale: Locale; current: PageKey }) {
  if (current === "home") return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t(ui.navHome, locale),
        item: `${company.siteUrl}${href(locale, "home")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t(pageMeta[current].title, locale),
        item: `${company.siteUrl}${href(locale, current)}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
