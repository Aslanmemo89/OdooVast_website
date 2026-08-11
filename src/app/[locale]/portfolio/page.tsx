import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { portfolioPage } from "@/content/pages";
import { localeFromParam, t } from "@/lib/i18n";
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

      <Section>
        <div className="notice" role="note">
          <Icon name="alert" size={24} />
          <div>
            <h2>{t(portfolioPage.noticeTitle, locale)}</h2>
            <p>{t(portfolioPage.noticeBody, locale)}</p>
          </div>
        </div>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <div className="grid grid--3">
            {portfolioPage.cases.map((item) => (
              <article key={item.title.en} className="case">
                {item.placeholder ? (
                  <span className="badge badge--warn">
                    <Icon name="alert" size={14} />
                    {t(portfolioPage.placeholderBadge, locale)}
                  </span>
                ) : null}
                <p className="deflist__term">{t(item.sector, locale)}</p>
                <h3>{t(item.title, locale)}</h3>
                <p>{t(item.body, locale)}</p>
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
