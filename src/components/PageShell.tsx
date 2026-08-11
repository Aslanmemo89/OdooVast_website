import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import type { PageKey } from "@/content/pages";
import type { Locale } from "@/lib/i18n";

/**
 * Header, main landmark, footer and the floating WhatsApp button.
 *
 * This lives in the page rather than in the layout so the header knows which
 * page is current — that keeps `aria-current` correct and the language
 * switcher pointing at the page the visitor is actually reading, with no
 * client-side JavaScript.
 */
export function PageShell({
  locale,
  current,
  children,
}: {
  locale: Locale;
  current: PageKey;
  children: ReactNode;
}) {
  return (
    <>
      <Header locale={locale} current={current} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      <WhatsAppFab locale={locale} />
    </>
  );
}
