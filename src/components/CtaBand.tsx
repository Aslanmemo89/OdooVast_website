import Link from "next/link";
import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { href } from "@/content/pages";
import { t, ui, type Locale, type T } from "@/lib/i18n";
import { waAbout, waGeneral } from "@/lib/whatsapp";

/**
 * Tiles floating in front of the band at different depths (--z). The band
 * tilts toward the pointer and, because it keeps its children in 3D, the
 * tiles parallax against it with no extra script.
 */
const FLOATS: { icon: IconName; at: CSSProperties }[] = [
  { icon: "accounting", at: { "--x": "4%", "--y": "16%", "--z": "70px", "--r": "-12deg" } as CSSProperties },
  { icon: "inventory", at: { "--x": "89%", "--y": "10%", "--z": "120px", "--r": "10deg" } as CSSProperties },
  { icon: "pos", at: { "--x": "8%", "--y": "74%", "--z": "45px", "--r": "9deg" } as CSSProperties },
  { icon: "sales", at: { "--x": "86%", "--y": "70%", "--z": "95px", "--r": "-8deg" } as CSSProperties },
];

/** The closing call to action. `topic` rides along into the WhatsApp message. */
export function CtaBand({
  locale,
  title,
  body,
  topic,
}: {
  locale: Locale;
  title: T;
  body: T;
  topic?: string;
}) {
  return (
    <div className="cta" data-tilt="4">
      {FLOATS.map((float) => (
        <span key={float.icon} className="cta__float" style={float.at} aria-hidden="true">
          <Icon name={float.icon} size={22} />
        </span>
      ))}
      <h2>{t(title, locale)}</h2>
      <p>{t(body, locale)}</p>
      <div className="btn-row">
        <a
          className="btn btn--whatsapp"
          href={topic ? waAbout(locale, topic) : waGeneral(locale)}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
        >
          <Icon name="whatsapp" size={20} />
          {t(ui.ctaWhatsApp, locale)}
        </a>
        <Link className="btn btn--onDark" href={href(locale, "contact")} data-magnetic>
          {t(ui.ctaConsultation, locale)}
        </Link>
      </div>
    </div>
  );
}
