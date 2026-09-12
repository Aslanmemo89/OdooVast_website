import Link from "next/link";

import { Icon } from "@/components/Icon";
import { company } from "@/content/company";
import type { LegalDoc } from "@/content/legal";
import { href, legalKeys, type LegalKey } from "@/content/pages";
import { t, tl, ui, type Locale, type T } from "@/lib/i18n";

const LEGAL_LABEL: Record<LegalKey, T> = {
  privacy: ui.navPrivacy,
  terms: ui.navTerms,
  dataDeletion: ui.navDataDeletion,
};

/**
 * Renders one legal document — the summary box, the numbered clauses, and the
 * contact card at the end.
 *
 * Clauses are numbered by CSS counter rather than in the content, so adding or
 * removing one never leaves a stale number in three languages. Each carries a
 * stable `id`, so a specific clause can be linked to from an email or a form.
 */
export function LegalBody({
  doc,
  locale,
  current,
}: {
  doc: LegalDoc;
  locale: Locale;
  current: LegalKey;
}) {
  const others = legalKeys.filter((key) => key !== current);

  return (
    <div className="legal">
      <aside className="legal__summary" aria-labelledby="legal-summary">
        <h2 id="legal-summary">{t(doc.summaryTitle, locale)}</h2>
        <ul>
          {tl(doc.summary, locale).map((line) => (
            <li key={line.slice(0, 40)}>{line}</li>
          ))}
        </ul>
      </aside>

      <ol className="legal__clauses">
        {doc.sections.map((section) => (
          <li key={section.id} id={section.id} className="legal__clause">
            <h2>{t(section.heading, locale)}</h2>

            {section.body
              ? tl(section.body, locale).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))
              : null}

            {section.points ? (
              <ul className="legal__points">
                {tl(section.points, locale).map((point) => (
                  <li key={point.slice(0, 40)}>{point}</li>
                ))}
              </ul>
            ) : null}

            {section.defs ? (
              <dl className="legal__defs">
                {section.defs.map((def) => (
                  <div key={def.term.en}>
                    <dt>{t(def.term, locale)}</dt>
                    <dd>{t(def.body, locale)}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {section.links ? (
              <p className="legal__links">
                {section.links.map((link) => (
                  <Link key={link.key} href={href(locale, link.key)}>
                    {t(link.label, locale)}
                  </Link>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <section className="legal__contact" aria-labelledby="legal-contact">
        <h2 id="legal-contact">{t(doc.contactTitle, locale)}</h2>
        <p>{t(doc.contactBody, locale)}</p>
        <div className="btn-row">
          <a className="btn btn--primary" href={`mailto:${company.email}`}>
            <Icon name="mail" size={18} />
            <span className="ltr">{company.email}</span>
          </a>
          <a className="btn btn--secondary" href={`tel:${company.phoneE164}`}>
            <Icon name="phone" size={18} />
            <span className="ltr">{company.phoneDisplay}</span>
          </a>
        </div>
        <p className="legal__address">
          {company.name} · {t(company.address.city, locale)},{" "}
          {t(company.address.region, locale)}, {t(company.address.country, locale)}
        </p>
      </section>

      <nav className="legal__related" aria-labelledby="legal-related">
        <h2 id="legal-related">{t(ui.legalRelated, locale)}</h2>
        <ul>
          {others.map((key) => (
            <li key={key}>
              <Link href={href(locale, key)}>
                {t(LEGAL_LABEL[key], locale)}
                <Icon name="arrow" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
