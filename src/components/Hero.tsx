import Link from "next/link";

import { Icon } from "@/components/Icon";
import { company } from "@/content/company";
import { href, home } from "@/content/pages";
import { t, ui, type Locale } from "@/lib/i18n";
import { waGeneral } from "@/lib/whatsapp";

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <p className="eyebrow eyebrow--on-dark">
            <Icon name="partner" size={16} />
            {t(home.eyebrow, locale)}
          </p>

          <h1>{t(home.h1, locale)}</h1>
          <p className="hero__lead">{t(home.lead, locale)}</p>

          <div className="btn-row">
            <a
              className="btn btn--whatsapp"
              href={waGeneral(locale)}
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

          <p className="hero__note">
            <Icon name="clock" size={16} />
            <span>
              {t(ui.ctaCall, locale)} ·{" "}
              <a className="hero__phone" href={`tel:${company.phoneE164}`}>
                <span className="ltr">{company.phoneDisplay}</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
