import Link from "next/link";

import { Icon } from "@/components/Icon";
import { href } from "@/content/pages";
import type { Service } from "@/content/services";
import { t, ui, type Locale } from "@/lib/i18n";

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  return (
    <article className="card">
      <span className="card__icon" aria-hidden="true">
        <Icon name={service.icon} size={22} />
      </span>
      <h3>{t(service.title, locale)}</h3>
      <p>{t(service.summary, locale)}</p>
      <div className="card__foot">
        <Link className="link-arrow" href={`${href(locale, "services")}#${service.slug}`}>
          {t(ui.ctaMore, locale)}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}
