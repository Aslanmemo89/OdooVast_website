import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { FigureCount } from "@/components/FigureCount";
import { Icon, type IconName } from "@/components/Icon";
import { branchCount, clients, footprint, places, type Client } from "@/content/clients";
import { home, href } from "@/content/pages";
import { counts, figureLabels, num, t, tn, ui, type Locale } from "@/lib/i18n";

/**
 * The logo on its plate — white for most artwork, its own dark tile for the
 * one that ships one. The name is always printed beside it, so the image
 * itself is decorative (alt="") and screen readers hear the name once.
 */
function Plate({ client, sizes }: { client: Client; sizes: string }) {
  return (
    <span className={client.darkArtwork ? "plate plate--dark" : "plate"}>
      <Image src={client.logo} alt="" width={client.width} height={client.height} sizes={sizes} />
    </span>
  );
}

/**
 * "9 companies · 4 cities in Iraq · 2 countries abroad", counted from the
 * list itself. Screen readers get the sentence; on screen each number is
 * drawn by CSS from `--to`, and FigureCount has it count up to that value
 * the first time it comes into view.
 */
export function ClientFigures({ locale }: { locale: Locale }) {
  const { companies, cities, countries } = footprint();
  const figures = [
    { n: companies, said: counts.companies, label: figureLabels.companies },
    { n: cities, said: counts.citiesInIraq, label: figureLabels.citiesInIraq },
    { n: countries, said: counts.countriesAbroad, label: figureLabels.countriesAbroad },
  ];
  return (
    <>
      <ul className="figures">
        {figures.map((figure) => (
          <li key={figure.said.en.other} className="figure">
            <span className="sr-only">{tn(figure.said, figure.n, locale)}</span>
            <span className="figure__num" style={{ "--to": figure.n } as CSSProperties} aria-hidden="true" />
            <span className="figure__label" aria-hidden="true">
              {tn(figure.label, figure.n, locale)}
            </span>
          </li>
        ))}
      </ul>
      <FigureCount />
    </>
  );
}

/**
 * Home page: every client at once, as plaques on a wall. Each stands up off
 * the page as it scrolls into view and turns toward the pointer; the last
 * tile is an invitation. A plain list in the HTML, readable with no script.
 * The slot carries the scroll entrance and the plaque inside it the tilt, so
 * the two never fight over one element.
 */
export function ClientWall({ locale }: { locale: Locale }) {
  return (
    <ul className="wall" data-glow-group>
      {clients.map((client) => (
        <li key={client.name} className="wall__slot">
          <div className="plaque" data-tilt="7" data-glow style={{ "--tint": client.tint } as CSSProperties}>
            <Plate client={client} sizes="(min-width: 52rem) 190px, calc(50vw - 4.5rem)" />
            <p className="plaque__name ltr">{client.name}</p>
            <p className="plaque__sector">{t(client.sector, locale)}</p>
            {client.branches.length > 0 ? (
              <p className="plaque__places">
                <Icon name="pin" size={12} />
                {client.branches.map((branch) => t(places[branch.place], locale)).join(" · ")}
              </p>
            ) : null}
          </div>
        </li>
      ))}
      <li className="wall__slot">
        <div className="plaque plaque--next">
          <Link className="plaque__next" href={href(locale, "contact")} data-magnetic>
            <span className="plaque__plus" aria-hidden="true">
              <Icon name="spark" size={22} />
            </span>
            <span className="plaque__name">{t(home.clientsNext, locale)}</span>
            <span className="plaque__sector">{t(ui.ctaConsultationShort, locale)}</span>
          </Link>
        </div>
      </li>
    </ul>
  );
}

type Fact = { icon: IconName; text: string };

function facts(client: Client, locale: Locale): Fact[] {
  const list: Fact[] = [];
  const total = branchCount(client);
  if (total !== null) list.push({ icon: "store", text: tn(counts.branches, total, locale) });
  if (client.factories) {
    list.push({ icon: "manufacturing", text: tn(counts.factories, client.factories, locale) });
  }
  if (client.headOffice) {
    list.push({
      icon: "globe",
      text: `${t(ui.labelHeadOffice, locale)}: ${t(places[client.headOffice], locale)}`,
    });
  }
  return list;
}

/**
 * Portfolio page: one card per client — what they do, where, and how many
 * branches or factories, exactly as the owner supplied it. The logo plate
 * rises off the card and the card tilts toward the pointer.
 */
export function ClientGrid({ locale }: { locale: Locale }) {
  return (
    <ul className="client-grid" data-glow-group>
      {clients.map((client) => {
        // A per-city figure only adds anything when there is more than one city.
        const perCity = client.branches.length > 1;
        const list = facts(client, locale);
        return (
          <li
            key={client.name}
            className="client-card"
            data-tilt="6"
            data-glow
            style={{ "--tint": client.tint } as CSSProperties}
          >
            <Plate client={client} sizes="(min-width: 60rem) 220px, calc(100vw - 6rem)" />
            <div className="client-card__body">
              <p className="client-card__sector">{t(client.sector, locale)}</p>
              <h3 className="client-card__name">
                <span className="ltr">{client.name}</span>
              </h3>
              <p className="client-card__about">{t(client.about, locale)}</p>
            </div>

            {client.branches.length > 0 ? (
              <ul className="places" aria-label={t(ui.labelBranches, locale)}>
                {client.branches.map((branch) => (
                  <li key={branch.place} className="place">
                    <Icon name="pin" size={14} />
                    {t(places[branch.place], locale)}
                    {perCity && branch.count ? (
                      <span className="place__n">
                        <span aria-hidden="true">{num(branch.count, locale)}</span>
                        <span className="sr-only">{tn(counts.branches, branch.count, locale)}</span>
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}

            {list.length > 0 ? (
              <ul className="client-card__facts">
                {list.map((fact) => (
                  <li key={fact.icon}>
                    <Icon name={fact.icon} size={16} />
                    {fact.text}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
