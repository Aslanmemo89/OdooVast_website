import Link from "next/link";

import { Icon } from "@/components/Icon";
import { href } from "@/content/pages";
import { t, ui, type Locale, type T } from "@/lib/i18n";
import { waAbout, waGeneral } from "@/lib/whatsapp";

/** The closing call to action. `topic` rides along into the WhatsApp message. */
export function CtaBand({
  locale,
  title,
  body,
  topic,
}: {
  locale: Locale;
  title: T;
  body: T;
  topic?: string;
}) {
  return (
    <div className="cta">
      <h2>{t(title, locale)}</h2>
      <p>{t(body, locale)}</p>
      <div className="btn-row">
        <a
          className="btn btn--whatsapp"
          href={topic ? waAbout(locale, topic) : waGeneral(locale)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" size={20} />
          {t(ui.ctaWhatsApp, locale)}
        </a>
        <Link className="btn btn--onDark" href={href(locale, "contact")}>
          {t(ui.ctaConsultation, locale)}
        </Link>
      </div>
    </div>
  );
}
