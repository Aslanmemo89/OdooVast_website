import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { LangSwitcher } from "@/components/LangSwitcher";
import { href, type PageKey } from "@/content/pages";
import { t, ui, type Locale, type T } from "@/lib/i18n";

const NAV: { key: PageKey; label: T }[] = [
  { key: "home", label: ui.navHome },
  { key: "about", label: ui.navAbout },
  { key: "services", label: ui.navServices },
  { key: "industries", label: ui.navIndustries },
  { key: "portfolio", label: ui.navPortfolio },
  { key: "contact", label: ui.navContact },
];

export function Header({ locale, current }: { locale: Locale; current: PageKey }) {
  return (
    <>
      <a className="skip" href="#main">
        {t(ui.srSkipToContent, locale)}
      </a>

      <header className="header">
        <div className="container header__inner">
          <Link href={href(locale, "home")} className="brand">
            {/* Decorative: the wordmark beside it already names the company. */}
            <Image
              src="/brand/mark.png"
              alt=""
              width={36}
              height={36}
              className="brand__mark"
              priority
            />
            <span className="brand__text">
              {/* Always Latin, in all three languages. */}
              <span className="brand__name">
                <em>Odoo</em>Vast
              </span>
              <span className="brand__tag">Odoo Partner</span>
            </span>
          </Link>

          <nav className="nav" aria-label={t(ui.srMenu, locale)}>
            <ul className="nav__list">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={href(locale, item.key)}
                    className="nav__link"
                    aria-current={item.key === current ? "page" : undefined}
                  >
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            {/* On narrow screens the switcher moves into the menu panel below:
                three language pills plus a brand will not fit on a 360px phone. */}
            <div className="lang-wide">
              <LangSwitcher locale={locale} current={current} />
            </div>

            <Link href={href(locale, "contact")} className="btn btn--primary header__cta">
              {t(ui.ctaConsultationShort, locale)}
            </Link>

            {/* A disclosure, so the mobile menu works with JavaScript disabled.
                Its links are plain anchors: a full navigation resets the
                open/closed state, which a client-side transition would not. */}
            <details className="menu">
              <summary className="menu__toggle" aria-label={t(ui.srMenu, locale)}>
                <Icon name="menu" size={22} />
              </summary>
              <div className="menu__panel">
                <ul>
                  {NAV.map((item) => (
                    <li key={item.key}>
                      <a
                        href={href(locale, item.key)}
                        aria-current={item.key === current ? "page" : undefined}
                      >
                        {t(item.label, locale)}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="menu__lang">
                  <p className="menu__langLabel">{t(ui.srLanguage, locale)}</p>
                  <LangSwitcher locale={locale} current={current} />
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
