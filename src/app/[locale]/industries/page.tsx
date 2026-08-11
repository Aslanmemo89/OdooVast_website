import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { industries } from "@/content/industries";
import { home, industriesPage } from "@/content/pages";
import { localeFromParam, t, tl, ui } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { waAbout } from "@/lib/whatsapp";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "industries");
}

export default function IndustriesPage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="industries">
      <PageHead locale={locale} title={industriesPage.h1} lead={industriesPage.lead} />

      <Section>
        {industries.map((industry) => (
          <Reveal key={industry.slug}>
            <article className="service" id={industry.slug}>
              <div className="service__aside">
                <span className="card__icon" aria-hidden="true">
                  <Icon name={industry.icon} size={22} />
                </span>
                <h2>{t(industry.title, locale)}</h2>
                <ul className="chips">
                  {industry.modules.map((module) => (
                    <li key={module} className="chip">
                      {module}
                    </li>
                  ))}
                </ul>
                <a
                  className="btn btn--whatsapp"
                  href={waAbout(locale, t(industry.title, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={20} />
                  {t(ui.ctaWhatsApp, locale)}
                </a>
              </div>

              <div className="service__body">
                <p className="service__summary">{t(industry.summary, locale)}</p>

                <div className="deflist">
                  <h3 className="deflist__term">{t(ui.labelChallenges, locale)}</h3>
                  <ul className="ticklist ticklist--problem">
                    {tl(industry.challenges, locale).map((line) => (
                      <li key={line.slice(0, 32)}>
                        <Icon name="problem" size={18} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
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
