import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { company } from "@/content/company";
import { contactPage } from "@/content/pages";
import { localeFromParam, t, ui, type Locale, type T } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { waGeneral } from "@/lib/whatsapp";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "contact");
}

type ContactRow = {
  icon: IconName;
  label: T;
  /** Rendered inside <span class="ltr"> so numbers read correctly in RTL. */
  ltr?: boolean;
  value: string;
  href?: string;
  external?: boolean;
};

function rows(locale: Locale): ContactRow[] {
  return [
    {
      icon: "phone",
      label: contactPage.labels.phone,
      value: company.phoneDisplay,
      href: `tel:${company.phoneE164}`,
      ltr: true,
    },
    {
      icon: "whatsapp",
      label: contactPage.labels.whatsapp,
      value: company.phoneDisplay,
      href: waGeneral(locale),
      external: true,
      ltr: true,
    },
    {
      icon: "mail",
      label: contactPage.labels.email,
      value: company.email,
      href: `mailto:${company.email}`,
      ltr: true,
    },
    {
      icon: "pin",
      label: contactPage.labels.address,
      value: t(company.address.full, locale),
      href: company.maps.link,
      external: true,
    },
    {
      icon: "clock",
      label: contactPage.labels.hours,
      value: t(company.hours, locale),
    },
  ];
}

export default function ContactPage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="contact">
      <PageHead locale={locale} title={contactPage.h1} lead={contactPage.lead} />

      <Section>
        <div className="contact-grid">
          <div>
            <div className="section__head">
              <h2 id="form">{t(contactPage.formTitle, locale)}</h2>
              <p className="section__lead">{t(contactPage.formLead, locale)}</p>
            </div>
            <ContactForm locale={locale} />
          </div>

          <div>
            <div className="section__head">
              <h2 id="details">{t(contactPage.detailsTitle, locale)}</h2>
            </div>
            <ul className="contact-list" aria-labelledby="details">
              {rows(locale).map((row) => {
                const text = row.ltr ? <span className="ltr">{row.value}</span> : row.value;
                return (
                  <li key={row.label.en} className="contact-item">
                    <span className="contact-item__icon" aria-hidden="true">
                      <Icon name={row.icon} size={20} />
                    </span>
                    <div>
                      <p className="contact-item__label">{t(row.label, locale)}</p>
                      {row.href ? (
                        <a
                          className="contact-item__value"
                          href={row.href}
                          {...(row.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {text}
                        </a>
                      ) : (
                        <p className="contact-item__value">{text}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="btn-row">
              <a
                className="btn btn--secondary"
                href={company.maps.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="pin" size={18} />
                {t(ui.ctaDirections, locale)}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sunken" labelledBy="map">
        <div className="section__head">
          <h2 id="map">{t(contactPage.mapTitle, locale)}</h2>
        </div>
        <div className="map">
          <iframe
            src={company.maps.embedSrc}
            title={t(ui.srMapTitle, locale)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Section>
    </PageShell>
  );
}
