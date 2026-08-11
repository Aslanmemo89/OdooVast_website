import Link from "next/link";

import { Icon } from "@/components/Icon";
import type { Industry } from "@/content/industries";
import { href } from "@/content/pages";
import { t, ui, type Locale } from "@/lib/i18n";

export function IndustryCard({ industry, locale }: { industry: Industry; locale: Locale }) {
  return (
    <article className="card">
      <span className="card__icon" aria-hidden="true">
        <Icon name={industry.icon} size={22} />
      </span>
      <h3>{t(industry.title, locale)}</h3>
      <p>{t(industry.summary, locale)}</p>
      <ul className="chips">
        {industry.modules.map((m) => (
          <li key={m} className="chip">
            {m}
          </li>
        ))}
      </ul>
      <div className="card__foot">
        <Link className="link-arrow" href={`${href(locale, "industries")}#${industry.slug}`}>
          {t(ui.ctaMore, locale)}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}
