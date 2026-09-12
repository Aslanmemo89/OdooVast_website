import Image from "next/image";
import Link from "next/link";

import { Icon, type IconName } from "@/components/Icon";
import { company } from "@/content/company";
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

/** Kept out of the main nav on purpose — present, findable, not in the way. */
const LEGAL: { key: PageKey; label: T }[] = [
  { key: "privacy", label: ui.navPrivacy },
  { key: "terms", label: ui.navTerms },
  { key: "dataDeletion", label: ui.navDataDeletion },
];

/** Only links that actually resolve are rendered — a null stays off the page. */
const socials: { name: IconName; url: string | null; label: string }[] = [
  { name: "linkedin", url: company.social.linkedin, label: "LinkedIn" },
  { name: "facebook", url: company.social.facebook, label: "Facebook" },
  { name: "instagram", url: company.social.instagram, label: "Instagram" },
];

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Image
              src="/brand/logo-horizontal-white.png"
              alt={t(ui.srLogoAlt, locale)}
              width={2356}
              height={700}
              className="footer__logo"
              sizes="220px"
            />
            <p className="footer__blurb">{t(company.tagline, locale)}</p>

            <div className="footer__social">
              {socials.map((s) =>
                s.url ? (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <Icon name={s.name} size={20} />
                  </a>
                ) : null,
              )}
            </div>
          </div>

          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages">{t(ui.footerQuickLinks, locale)}</h2>
            <ul>
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link href={href(locale, item.key)}>{t(item.label, locale)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 id="footer-contact">{t(ui.footerContact, locale)}</h2>
            <ul aria-labelledby="footer-contact">
              <li>
                <a href={`tel:${company.phoneE164}`}>
                  <span className="ltr">{company.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`}>
                  <span className="ltr">{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.maps.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(company.address.full, locale)}
                </a>
              </li>
              <li>{t(company.hours, locale)}</li>
              <li>
                <a href={company.profilePdf} download type="application/pdf">
                  {t(ui.ctaDownloadProfile, locale)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <p>
            © <span className="ltr">{year}</span> OdooVast. {t(ui.footerRights, locale)}
          </p>

          <nav className="footer__legal" aria-label={t(ui.footerLegal, locale)}>
            {LEGAL.map((item) => (
              <Link key={item.key} href={href(locale, item.key)}>
                {t(item.label, locale)}
              </Link>
            ))}
          </nav>

          <p>{t(company.partnerStatus, locale)}</p>
        </div>
      </div>
    </footer>
  );
}
