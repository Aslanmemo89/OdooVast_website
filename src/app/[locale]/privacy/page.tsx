import type { Metadata } from "next";

import { LegalBody } from "@/components/LegalBody";
import { LegalHead } from "@/components/LegalHead";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { privacy } from "@/content/legal";
import { localeFromParam } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "privacy");
}

export default function PrivacyPage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="privacy">
      <LegalHead doc={privacy} locale={locale} />
      <Section narrow>
        <LegalBody doc={privacy} locale={locale} current="privacy" />
      </Section>
    </PageShell>
  );
}
