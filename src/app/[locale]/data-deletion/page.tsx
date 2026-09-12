import type { Metadata } from "next";

import { LegalBody } from "@/components/LegalBody";
import { LegalHead } from "@/components/LegalHead";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { dataDeletion } from "@/content/legal";
import { localeFromParam } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "dataDeletion");
}

export default function DataDeletionPage({ params }: Props) {
  const locale = localeFromParam(params.locale);

  return (
    <PageShell locale={locale} current="dataDeletion">
      <LegalHead doc={dataDeletion} locale={locale} />
      <Section narrow>
        <LegalBody doc={dataDeletion} locale={locale} current="dataDeletion" />
      </Section>
    </PageShell>
  );
}
