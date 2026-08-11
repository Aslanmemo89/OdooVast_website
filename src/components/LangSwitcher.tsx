import Link from "next/link";

import { href, type PageKey } from "@/content/pages";
import { htmlLang, localeName, localeShort, locales, t, ui, type Locale } from "@/lib/i18n";

/**
 * Switching language keeps the visitor on the page they are reading, because
 * the target href is built from the current page key rather than from "/".
 */
export function LangSwitcher({ locale, current }: { locale: Locale; current: PageKey }) {
  return (
    <nav className="lang" aria-label={t(ui.srLanguage, locale)}>
      {locales.map((code) => (
        <Link
          key={code}
          href={href(code, current)}
          className="lang__item"
          lang={htmlLang[code]}
          hrefLang={htmlLang[code]}
          aria-current={code === locale ? "true" : undefined}
          title={localeName[code]}
        >
          {localeShort[code]}
        </Link>
      ))}
    </nav>
  );
}
