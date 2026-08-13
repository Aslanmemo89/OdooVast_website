import type { Metadata } from "next";
import Link from "next/link";

import { ClientLogos } from "@/components/ClientLogos";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { IndustryCard } from "@/components/IndustryCard";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Stats, hasStats } from "@/components/Stats";
import { industries } from "@/content/industries";
import { home, href } from "@/content/pages";
import { coreServices } from "@/content/services";
import { localeFromParam, t, ui } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "home");
}

export default function HomePage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="home">
      <Hero locale={locale} />

      <Section tone="subtle" labelledBy="credibility">
        <div className="section__head">
          <h2 id="credibility">{t(home.credibilityTitle, locale)}</h2>
        </div>
        <Reveal>
          <div className="grid grid--4">
            {home.highlights.map((item) => (
              <div key={item.title.en} className="highlight">
                <span className="highlight__icon" aria-hidden="true">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3>{t(item.title, locale)}</h3>
                <p>{t(item.body, locale)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="clients">
        <div className="section__head section__head--center">
          <h2 id="clients">{t(home.clientsTitle, locale)}</h2>
        </div>
        <Reveal>
          <ClientLogos locale={locale} />
        </Reveal>
      </Section>

      <Section tone="sunken" labelledBy="services">
        <div className="section__head">
          <h2 id="services">{t(home.servicesTitle, locale)}</h2>
          <p className="section__lead">{t(home.servicesLead, locale)}</p>
        </div>
        <Reveal>
          <div className="grid grid--3">
            {coreServices.map((service) => (
              <ServiceCard key={service.slug} service={service} locale={locale} />
            ))}
          </div>
        </Reveal>
        <div className="btn-row">
          <Link className="btn btn--secondary" href={href(locale, "services")}>
            {t(ui.ctaAllServices, locale)}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </Section>

      <Section labelledBy="industries">
        <div className="section__head">
          <h2 id="industries">{t(home.industriesTitle, locale)}</h2>
          <p className="section__lead">{t(home.industriesLead, locale)}</p>
        </div>
        <Reveal>
          <div className="grid grid--3">
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} locale={locale} />
            ))}
          </div>
        </Reveal>
        <div className="btn-row">
          <Link className="btn btn--secondary" href={href(locale, "industries")}>
            {t(ui.ctaAllIndustries, locale)}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </Section>

      {/* Renders only once a real figure exists in src/content/company.ts. */}
      {hasStats ? (
        <Section labelledBy="stats">
          <div className="section__head section__head--center">
            <h2 id="stats">{t(home.statsTitle, locale)}</h2>
          </div>
          <Stats locale={locale} />
        </Section>
      ) : null}

      <Section>
        <Reveal>
          <CtaBand locale={locale} title={home.ctaTitle} body={home.ctaBody} />
        </Reveal>
      </Section>
    </PageShell>
  );
}
