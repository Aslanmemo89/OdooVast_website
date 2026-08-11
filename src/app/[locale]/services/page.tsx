import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { home, servicesPage } from "@/content/pages";
import { services } from "@/content/services";
import { localeFromParam, t, tl, ui } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { waAbout } from "@/lib/whatsapp";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "services");
}

export default function ServicesPage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="services">
      <PageHead locale={locale} title={servicesPage.h1} lead={servicesPage.lead} />

      <Section>
        {services.map((service) => (
          <Reveal key={service.slug}>
            <article className="service" id={service.slug}>
              <div className="service__aside">
                <span className="card__icon" aria-hidden="true">
                  <Icon name={service.icon} size={22} />
                </span>
                <h2>{t(service.title, locale)}</h2>
                <a
                  className="btn btn--whatsapp"
                  href={waAbout(locale, t(service.title, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={20} />
                  {t(ui.ctaDiscussService, locale)}
                </a>
              </div>

              <div className="service__body">
                <p className="service__summary">{t(service.summary, locale)}</p>

                <div className="deflist">
                  <h3 className="deflist__term">{t(ui.labelIncludes, locale)}</h3>
                  <ul className="ticklist">
                    {tl(service.includes, locale).map((line) => (
                      <li key={line.slice(0, 32)}>
                        <Icon name="check" size={18} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="deflist">
                  <h3 className="deflist__term">{t(ui.labelSuitedFor, locale)}</h3>
                  <p>{t(service.suitedFor, locale)}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </Section>

      <Section tone="sunken">
        <CtaBand locale={locale} title={home.ctaTitle} body={home.ctaBody} />
      </Section>
    </PageShell>
  );
}
