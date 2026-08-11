import { company, type Stat } from "@/content/company";
import { t, type Locale } from "@/lib/i18n";

type ConfirmedStat = Stat & { value: string };

const isConfirmed = (s: Stat): s is ConfirmedStat => s.value !== null;

/**
 * Renders only figures that have been confirmed by the client. While every
 * `value` in company.ts is still null, this returns nothing at all — an
 * invented number can never reach a visitor, and the band appears by itself
 * the moment a real figure is filled in.
 */
export function Stats({ locale }: { locale: Locale }) {
  const confirmed = company.stats.filter(isConfirmed);
  if (confirmed.length === 0) return null;

  return (
    <dl className="stats">
      {confirmed.map((stat) => (
        <div key={stat.label.en} className="stat">
          <dt className="stat__label">{t(stat.label, locale)}</dt>
          <dd className="stat__value">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** True when at least one figure is confirmed — lets a page skip the heading. */
export const hasStats = company.stats.some(isConfirmed);
