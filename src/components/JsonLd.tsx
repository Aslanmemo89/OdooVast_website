import { company } from "@/content/company";
import { href, pageMeta } from "@/content/pages";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { htmlLang, locales, t, type Locale } from "@/lib/i18n";

/**
 * schema.org ProfessionalService, built from the same content the page renders
 * — the address, phone and hours here can never drift from src/content/.
 */
export function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${company.siteUrl}/#organization`,
    name: company.name,
    alternateName: "OdooVast — Odoo Partner",
    url: `${company.siteUrl}${href(locale, "home")}`,
    logo: `${company.siteUrl}/logo.png`,
    image: `${company.siteUrl}/og.png`,
    description: t(pageMeta.home.description, locale),
    slogan: t(company.tagline, locale),
    foundingDate: company.foundedYear,
    founder: { "@type": "Person", name: company.founder },
    telephone: company.phoneE164,
    email: company.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneE164,
      contactType: "customer service",
      areaServed: company.address.countryCode,
      availableLanguage: locales.map((code) => htmlLang[code]),
    },
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: t(company.address.street, locale),
      addressLocality: t(company.address.city, locale),
      addressRegion: t(company.address.region, locale),
      addressCountry: company.address.countryCode,
    },
    openingHours: company.hoursSchema,
    availableLanguage: locales.map((code) => htmlLang[code]),
    areaServed: [
      { "@type": "Country", name: t(company.address.country, locale) },
      { "@type": "City", name: t(company.address.city, locale) },
    ],
    knowsAbout: industries.map((industry) => t(industry.title, locale)),
    sameAs: [company.social.linkedin, company.social.facebook, company.social.instagram].filter(
      (url): url is string => typeof url === "string",
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t(pageMeta.services.title, locale),
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t(service.title, locale),
          description: t(service.summary, locale),
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON is generated from our own content; the escape keeps a stray "</"
      // in future copy from ever closing the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
