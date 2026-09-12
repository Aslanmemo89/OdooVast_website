import type { Metadata } from "next";

import { ClientLogos } from "@/components/ClientLogos";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { portfolioPage } from "@/content/pages";
import { localeFromParam, t, tl } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "portfolio");
}

export default function PortfolioPage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="portfolio">
      <PageHead locale={locale} title={portfolioPage.h1} lead={portfolioPage.lead} />

      <Section labelledBy="clients">
        <div className="section__head">
          <h2 id="clients">{t(portfolioPage.clientsTitle, locale)}</h2>
        </div>
        <Reveal>
          <ClientLogos locale={locale} />
        </Reveal>
      </Section>

      <Section>
        <div className="notice" role="note">
          <Icon name="alert" size={24} />
          <div>
            <h2>{t(portfolioPage.noticeTitle, locale)}</h2>
            <p>{t(portfolioPage.noticeBody, locale)}</p>
          </div>
        </div>
      </Section>

      <Section tone="sunken" labelledBy="cases">
        <div className="section__head">
          <h2 id="cases">{t(portfolioPage.casesTitle, locale)}</h2>
        </div>
        <Reveal>
          <div className="grid grid--3">
            {portfolioPage.cases.map((item) => (
              <article key={item.title.en} className="case">
                <p className="deflist__term">{t(item.sector, locale)}</p>
                <h3>{t(item.title, locale)}</h3>
                <p>{t(item.body, locale)}</p>
                <ul className="ticklist ticklist--tight">
                  {tl(item.points, locale).map((point) => (
                    <li key={point.slice(0, 32)}>
                      <Icon name="check" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <CtaBand
            locale={locale}
            title={portfolioPage.ctaTitle}
            body={portfolioPage.ctaBody}
          />
        </Reveal>
      </Section>
    </PageShell>
  );
}
