import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Noto_Kufi_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "../globals.css";

import { JsonLd } from "@/components/JsonLd";
import { company } from "@/content/company";
import { dir, htmlLang, isLocale, locales } from "@/lib/i18n";

/*
 * Self-hosted by next/font — no CDN <link>, no third party.
 *
 * `adjustFontFallback: false` on the two Latin faces is deliberate. Next
 * otherwise generates a metric-matched fallback family backed by `local(Arial)`,
 * and Arial covers Arabic script — so every Arabic and Kurdish glyph would be
 * claimed by Arial before the stack ever reached Noto Kufi. Turning it off lets
 * per-glyph fallback do its job: Latin from Inter, Arabic script from Kufi.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
  display: "swap",
  adjustFontFallback: false,
});

/* Covers Arabic and the extra Kurdish Sorani letters (ڕ ڵ ۆ ێ چ پ ژ گ ک).
   Keeps its metric fallback: it sits after Inter, so it only ever serves
   Arabic script, which is exactly what that fallback should cover. */
const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-kufi",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Anything that is not en / ar / ckb is a 404, not a rendered page. */
export const dynamicParams = false;

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: "OdooVast — Odoo Partner in Erbil, Iraq",
  applicationName: company.name,
  robots: { index: true, follow: true },
  // No `formatDetection` on purpose: Next only ever emits "=no" for the keys
  // it is given, and we want iOS to keep auto-linking phone numbers in prose.
  ...(company.googleSiteVerification
    ? { verification: { google: company.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={htmlLang[locale]}
      dir={dir(locale)}
      className={`${inter.variable} ${montserrat.variable} ${kufi.variable}`}
    >
      <body>
        {children}
        <JsonLd locale={locale} />
      </body>
    </html>
  );
}
