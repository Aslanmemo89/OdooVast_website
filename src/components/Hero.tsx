import Link from "next/link";
import type { CSSProperties } from "react";

import { HeroScene } from "@/components/HeroScene";
import { Icon } from "@/components/Icon";
import { Mark3D } from "@/components/Mark3D";
import { company } from "@/content/company";
import { href, home } from "@/content/pages";
import { t, ui, type Locale } from "@/lib/i18n";
import { waGeneral } from "@/lib/whatsapp";

/** `--d` staggers each block of the entrance after the heading. */
const step = (d: number) => ({ "--d": d }) as CSSProperties;

/** The heading with its key words drawn in light; plain text if they are not found. */
function Accented({ text, accent }: { text: string; accent: string }) {
  const at = text.indexOf(accent);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="hero__accent">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="hero" data-spotlight>
      <div className="floor" aria-hidden="true" />
      <div className="container hero__layout">
        <div className="hero__inner">
          <p className="eyebrow eyebrow--on-dark hero__enter" style={step(0)}>
            <Icon name="partner" size={16} />
            {t(home.eyebrow, locale)}
          </p>

          {/* One block, not a box per word: when the web font arrives and the
              heading re-wraps, separate word boxes would jump between lines and
              register as a large layout shift. The accent is an inline span,
              which wraps with the text. */}
          <h1 className="hero__title">
            <Accented text={t(home.h1, locale)} accent={t(home.h1Accent, locale)} />
          </h1>
          <p className="hero__lead hero__enter" style={step(3)}>
            {t(home.lead, locale)}
          </p>

          <div className="btn-row hero__enter" style={step(4)}>
            <a
              className="btn btn--whatsapp"
              href={waGeneral(locale)}
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

          <p className="hero__note hero__enter" style={step(5)}>
            <Icon name="clock" size={16} />
            <span>
              {t(ui.ctaCall, locale)} ·{" "}
              <a className="hero__phone" href={`tel:${company.phoneE164}`}>
                <span className="ltr">{company.phoneDisplay}</span>
              </a>
            </span>
          </p>
        </div>

        <div className="hero__visual">
          <HeroScene core={<Mark3D className="scene__mark" />}>
            {home.orbit.map((app) => (
              <span key={app.label} className="orbit-chip" data-orbit={app.icon}>
                <Icon name={app.icon} size={16} />
                {app.label}
              </span>
            ))}
          </HeroScene>
        </div>
      </div>
    </section>
  );
}
