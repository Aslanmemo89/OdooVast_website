import { Icon } from "@/components/Icon";
import { t, ui, type Locale } from "@/lib/i18n";
import { waGeneral } from "@/lib/whatsapp";

/** Present on every page — the single conversion action on this site. */
export function WhatsAppFab({ locale }: { locale: Locale }) {
  return (
    <a
      className="fab"
      href={waGeneral(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(ui.srWhatsAppFab, locale)}
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
