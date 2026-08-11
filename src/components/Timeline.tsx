import { timeline } from "@/content/timeline";
import { t, type Locale } from "@/lib/i18n";

export function Timeline({ locale }: { locale: Locale }) {
  return (
    <ol className="timeline">
      {timeline.map((item) => (
        <li key={item.year} className="timeline__item">
          <span className="timeline__dot" aria-hidden="true" />
          <p className="timeline__year">{item.year}</p>
          <h3 className="timeline__title">{t(item.title, locale)}</h3>
          <p className="timeline__body">{t(item.body, locale)}</p>
        </li>
      ))}
    </ol>
  );
}
