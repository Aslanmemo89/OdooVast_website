import { Icon } from "@/components/Icon";
import type { LegalDoc } from "@/content/legal";
import { t, ui, type Locale } from "@/lib/i18n";

/**
 * The banner on a legal page. Same shape as PageHead, but the eyebrow carries
 * the effective date instead of the partner status — on a document that makes
 * binding promises, the date it took effect is the thing a reader needs first.
 */
export function LegalHead({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  return (
    <div className="pagehead">
      <div className="container">
        <p className="eyebrow">
          <Icon name="clock" size={16} />
          {t(ui.legalUpdated, locale)}:{" "}
          <time dateTime={doc.updatedIso}>{t(doc.updated, locale)}</time>
        </p>
        <h1>{t(doc.h1, locale)}</h1>
        <p className="pagehead__lead">{t(doc.lead, locale)}</p>
      </div>
    </div>
  );
}
