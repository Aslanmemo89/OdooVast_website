import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { company } from "@/content/company";
import { about, home } from "@/content/pages";
import { localeFromParam, t, tl, ui } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "about");
}

export default function AboutPage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="about">
      <PageHead locale={locale} title={about.h1} lead={about.lead} />

      <Section labelledBy="story" narrow>
        <div className="section__head">
          <h2 id="story">{t(about.storyTitle, locale)}</h2>
        </div>
        <div className="prose">
          {tl(about.storyBody, locale).map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <div className="btn-row">
          <a
            className="btn btn--secondary"
            href={company.profilePdf}
            download
            type="application/pdf"
          >
            <Icon name="download" size={18} />
            {t(ui.ctaDownloadProfile, locale)}
          </a>
          <span className="btn-row__meta">{t(ui.labelProfileSize, locale)}</span>
        </div>
      </Section>

      <Section tone="sunken" labelledBy="values">
        <div className="section__head">
          <h2 id="values">{t(about.valuesTitle, locale)}</h2>
        </div>
        <Reveal>
          <div className="grid grid--2">
            {about.values.map((value) => (
              <article key={value.title.en} className="card">
                <span className="card__icon" aria-hidden="true">
                  <Icon name={value.icon} size={22} />
                </span>
                <h3>{t(value.title, locale)}</h3>
                <p>{t(value.body, locale)}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="timeline" narrow>
        <div className="section__head">
          <h2 id="timeline">{t(about.timelineTitle, locale)}</h2>
        </div>
        <Timeline locale={locale} />
      </Section>

      <Section tone="sunken" labelledBy="partner" narrow>
        <div className="section__head">
          <h2 id="partner">{t(about.partnerTitle, locale)}</h2>
          <p className="section__lead">{t(about.partnerLead, locale)}</p>
        </div>
        <ul className="ticklist">
          {tl(about.partnerPoints, locale).map((point) => (
            <li key={point.slice(0, 32)}>
              <Icon name="check" size={18} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Reveal>
          <CtaBand locale={locale} title={home.ctaTitle} body={home.ctaBody} />
        </Reveal>
      </Section>
    </PageShell>
  );
}
