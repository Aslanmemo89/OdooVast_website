import { Icon } from "@/components/Icon";
import { company } from "@/content/company";
import { t, type Locale, type T } from "@/lib/i18n";

/** The banner at the top of every page except the home page. */
export function PageHead({
  locale,
  title,
  lead,
}: {
  locale: Locale;
  title: T;
  lead: T;
}) {
  return (
    <div className="pagehead">
      <div className="container">
        <p className="eyebrow">
          <Icon name="partner" size={16} />
          {t(company.partnerStatus, locale)}
        </p>
        <h1>{t(title, locale)}</h1>
        <p className="pagehead__lead">{t(lead, locale)}</p>
      </div>
    </div>
  );
}
