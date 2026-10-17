import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Cube } from "@/components/Cube";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { PageShell } from "@/components/PageShell";
import { PriceCalculator } from "@/components/PriceCalculator";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import {
  calc,
  figures,
  hostFacts,
  hosts,
  lightUser,
  planRows,
  plans,
  pricingFaq,
  pricingPage as copy,
  rates,
  shIncluded,
  shRows,
  source,
  userRows,
  type Billing,
  type Cell,
  type HostFact,
  type PaidPlan,
  type Plan,
} from "@/content/pricing";
import {
  fill,
  localeFromParam,
  num,
  pick,
  t,
  tl,
  usd,
  usdText,
  type Locale,
  type T,
  type TList,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { waAbout } from "@/lib/whatsapp";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  return buildMetadata(localeFromParam(params.locale), "pricing");
}

/** The radio group the plan cards and the calculator both answer to. */
const BILLING = "billing";
const BILLINGS: readonly Billing[] = ["yearly", "monthly"];
const PAID: readonly PaidPlan[] = ["standard", "custom"];
const FACTS = Object.keys(hostFacts) as HostFact[];

/** One language's copy with its {figures} written in from `rates`. */
function writer(locale: Locale) {
  const figs = figures(locale);
  return {
    say: (text: T, vars: Record<string, string> = {}) => fill(t(text, locale), { ...figs, ...vars }),
    sayAll: (list: TList) => tl(list, locale).map((line) => fill(line, figs)),
    figs,
  };
}

/** "$7.25" drawn the way odoo.com draws it: the dollars large, the cents small. */
function Amount({ value, locale }: { value: number; locale: Locale }) {
  const text = usdText(value, locale);
  const dot = text.lastIndexOf(".");
  return (
    <>
      <span className="amount" aria-hidden="true">
        <span className="amount__cur">{text.slice(0, 1)}</span>
        <span className="amount__whole">{text.slice(1, dot)}</span>
        <span className="amount__cents">{text.slice(dot)}</span>
      </span>
      <span className="sr-only">{usd(value, locale)}</span>
    </>
  );
}

function PlanCard({ plan, locale }: { plan: Plan; locale: Locale }) {
  const price = plan.key === "free" ? null : rates.licence[plan.key];
  return (
    <article className={`plan plan--${plan.key}`} data-tilt="4" data-glow>
      <div className="plan__head">
        <span className="card__icon" aria-hidden="true">
          <Icon name={plan.icon} size={22} />
        </span>
        <div>
          <h3 className="plan__name">{t(plan.name, locale)}</h3>
          {/* Odoo's own name, so the card can be matched with odoo.com. */}
          {locale === "en" ? null : (
            <span className="plan__latin" lang="en">
              {plan.latin}
            </span>
          )}
        </div>
      </div>

      <p className="plan__for">{t(plan.for, locale)}</p>

      <div className="plan__price">
        {price === null ? (
          <div className="price">
            <p className="price__now">
              <span className="amount" aria-hidden="true">
                <span className="amount__cur">$</span>
                <span className="amount__whole">{num(0, locale)}</span>
              </span>
              <span className="sr-only">{`$${num(0, locale)}`}</span>
              <span className="price__unit">{t(copy.unlimited, locale)}</span>
            </p>
          </div>
        ) : (
          BILLINGS.map((billing) => (
            <div key={billing} className="price" data-billing={billing}>
              <p className="price__now">
                <Amount value={price.price[billing]} locale={locale} />
                <span className="price__unit">
                  {t(copy.perUserMonth, locale)}
                  <br />
                  {t(billing === "yearly" ? copy.billedYearly : copy.billedMonthly, locale)}
                </span>
              </p>
              {/* Labelled in words: a line through Eastern Arabic digits
                  would strike out the zeros (٠), which are dots. */}
              <p className="price__was">
                {t(copy.regular, locale)}:{" "}
                <s className="ltr">{usd(price.regular[billing], locale)}</s>
                <span aria-hidden="true">*</span>
              </p>
            </div>
          ))
        )}
      </div>

      <ul className="ticklist plan__features">
        {tl(plan.features, locale).map((line) => {
          // {mark} becomes the "**" pointing at the Odoo.sh note — seen, not read out.
          const parts = line.split("{mark}");
          return (
            <li key={line}>
              <Icon name="check" size={18} />
              <span>
                {parts[0]}
                {parts.length > 1 ? (
                  <>
                    <span aria-hidden="true">**</span>
                    {parts[1]}
                  </>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="plan__foot">
        <a
          className="btn btn--secondary btn--block"
          href={waAbout(locale, t(plan.topic, locale))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" size={18} />
          {t(copy.ask, locale)}
          <span className="sr-only"> — {t(plan.name, locale)}</span>
        </a>
      </div>
    </article>
  );
}

/** A tick, a cross, or a tick with its condition — always with words for screen readers. */
function Mark({ cell, locale }: { cell: Cell; locale: Locale }) {
  if (cell === false) {
    return (
      <span className="mark mark--no">
        <Icon name="cross" size={18} />
        <span className="sr-only">{t(copy.notIncluded, locale)}</span>
      </span>
    );
  }
  return (
    <span className="mark mark--yes">
      <Icon name="check" size={18} />
      {cell === true ? (
        <span className="sr-only">{t(copy.included, locale)}</span>
      ) : (
        <span className="mark__note">{t(cell, locale)}</span>
      )}
    </span>
  );
}

export default function PricingPage({ params }: Props) {
  const locale = localeFromParam(params.locale);
  const { say, sayAll, figs } = writer(locale);
  const $ = (amount: number) => usd(amount, locale);
  const shYearly = rates.sh.rates.yearly;
  const shMonthly = rates.sh.rates.monthly;
  const smallest = rates.sh.limits.shared;

  return (
    <PageShell locale={locale} current="pricing">
      <PageHead locale={locale} title={copy.h1} lead={copy.lead} />

      {/* :has() on this wrapper turns every price on the page with the switch. */}
      <div className="pricing">
        <Section labelledBy="plans">
          <div className="pricing__head">
            <div className="section__head">
              <h2 id="plans">{t(copy.plansTitle, locale)}</h2>
              <p className="section__lead">{say(copy.plansLead)}</p>
            </div>

            <fieldset className="billing">
              <legend className="sr-only">{t(copy.billingLegend, locale)}</legend>
              <input
                className="billing__input"
                type="radio"
                name={BILLING}
                id="billing-yearly"
                value="yearly"
                defaultChecked
              />
              <label className="billing__option" htmlFor="billing-yearly">
                {t(copy.yearly, locale)}
                <span className="billing__badge">{say(copy.yearlyBadge)}</span>
              </label>
              <input
                className="billing__input"
                type="radio"
                name={BILLING}
                id="billing-monthly"
                value="monthly"
              />
              <label className="billing__option" htmlFor="billing-monthly">
                {t(copy.monthly, locale)}
              </label>
            </fieldset>
          </div>

          <Reveal>
            <div className="plans" data-glow-group>
              <PlanCard plan={plans.free} locale={locale} />
              <PlanCard plan={plans.standard} locale={locale} />
              <PlanCard plan={plans.custom} locale={locale} />
            </div>
          </Reveal>

          <Reveal>
            <article className="lightcard" data-tilt="3">
              <div className="lightcard__head">
                <span className="card__icon" aria-hidden="true">
                  <Icon name="lightUser" size={22} />
                </span>
                <div>
                  <h3 className="plan__name">{t(lightUser.name, locale)}</h3>
                  {locale === "en" ? null : (
                    <span className="plan__latin" lang="en">
                      Light User
                    </span>
                  )}
                </div>
                <p className="price__now">
                  <Amount value={rates.lightUser} locale={locale} />
                  <span className="price__unit">{t(copy.perLightUserMonth, locale)}</span>
                </p>
                <a
                  className="btn btn--secondary lightcard__ask"
                  href={waAbout(locale, t(lightUser.topic, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} />
                  {t(copy.ask, locale)}
                  <span className="sr-only"> — {t(lightUser.name, locale)}</span>
                </a>
              </div>

              <div className="lightcard__body">
                <p className="plan__for">{t(lightUser.for, locale)}</p>
                <div className="lightcard__caps">
                  <h4 className="deflist__term">{t(lightUser.asUsers, locale)}</h4>
                  <ul className="chips">
                    {tl(lightUser.userCaps, locale).map((cap) => (
                      <li key={cap} className="chip chip--text">
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <h4 className="deflist__term">{t(lightUser.asEmployees, locale)}</h4>
                  <ul className="chips">
                    {tl(lightUser.employeeCaps, locale).map((cap) => (
                      <li key={cap} className="chip chip--text">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="lightcard__how">
                  <Icon name="partner" size={16} />
                  {t(lightUser.how, locale)}
                </p>
              </div>
            </article>
          </Reveal>

          <p className="pricing__jump">
            <a className="link-arrow" href="#estimate">
              {t(copy.estimate, locale)}
              <Icon name="arrow" size={18} />
            </a>
          </p>

          <div className="pricing__notes">
            <p>
              <span aria-hidden="true">* </span>
              {say(copy.noteDiscount)}
            </p>
            <p>
              <span aria-hidden="true">** </span>
              {t(copy.noteSh, locale)}
            </p>
            <p>{t(copy.noteIncluded, locale)}</p>
            <p className="pricing__source">
              <Icon name="clock" size={16} />
              <span>
                {t(copy.sourceNote, locale)}{" "}
                <time dateTime={source.checkedIso}>{t(source.checked, locale)}</time>.{" "}
                {t(copy.sourceFinal, locale)}{" "}
                <a href={source.odoo} target="_blank" rel="noopener noreferrer" className="ltr">
                  odoo.com/pricing
                </a>{" "}
                ·{" "}
                <a href={source.odooSh} target="_blank" rel="noopener noreferrer" className="ltr">
                  odoo.sh/pricing
                </a>
              </span>
            </p>
          </div>
        </Section>

        <Section tone="sunken" labelledBy="differences">
          <div className="section__head">
            <h2 id="differences">{t(copy.diffTitle, locale)}</h2>
            <p className="section__lead">{t(copy.diffLead, locale)}</p>
          </div>

          <div className="pricing__block">
            <h3 className="pricing__subtitle" id="plan-diff-title">
              {t(copy.planDiffTitle, locale)}
            </h3>
            <p className="pricing__sublead">{t(copy.planDiffLead, locale)}</p>
            <Reveal>
              {/* Focusable and named: on the narrowest phones it scrolls sideways. */}
              <div className="compare-wrap" tabIndex={0} role="region" aria-labelledby="plan-diff-title">
                <table className="compare">
                  <caption className="sr-only">{t(copy.planDiffTitle, locale)}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t(copy.colFeature, locale)}</th>
                      {PAID.map((key) => (
                        <th key={key} scope="col">
                          {t(plans[key].name, locale)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BILLINGS.map((billing) => (
                      <tr key={billing} className="compare__price">
                        <th scope="row">
                          {t(billing === "yearly" ? copy.priceYearly : copy.priceMonthly, locale)}
                        </th>
                        {PAID.map((key) => (
                          <td key={key}>
                            <span className="ltr">{$(rates.licence[key].price[billing])}</span>
                            <span className="compare__unit">
                              {say(copy.thenRegular, { price: $(rates.licence[key].regular[billing]) })}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                    {planRows.map((row) => (
                      <tr key={row.label.en}>
                        <th scope="row">{t(row.label, locale)}</th>
                        <td>
                          <Mark cell={row.standard} locale={locale} />
                        </td>
                        <td>
                          <Mark cell={row.custom} locale={locale} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          <div className="pricing__block">
            <h3 className="pricing__subtitle">{t(copy.userDiffTitle, locale)}</h3>
            <p className="pricing__sublead">{t(copy.userDiffLead, locale)}</p>
            <Reveal>
              <div className="versus" data-glow-group>
                {(["full", "light"] as const).map((kind) => (
                  <article key={kind} className={`side side--${kind}`} data-tilt="4" data-glow>
                    <div className="side__head">
                      <span className="card__icon" aria-hidden="true">
                        <Icon name={kind === "full" ? "user" : "lightUser"} size={22} />
                      </span>
                      <h4>{t(kind === "full" ? copy.fullUser : lightUser.name, locale)}</h4>
                    </div>
                    <dl className="side__facts">
                      <div>
                        <dt>{t(copy.priceLabel, locale)}</dt>
                        <dd>
                          {kind === "full"
                            ? say(copy.fullPrice, {
                                standard: $(rates.licence.standard.price.yearly),
                                custom: $(rates.licence.custom.price.yearly),
                                standardLater: $(rates.licence.standard.regular.yearly),
                                customLater: $(rates.licence.custom.regular.yearly),
                              })
                            : say(copy.lightPrice)}
                        </dd>
                      </div>
                      {userRows.map((row) => {
                        const value = row[kind];
                        return (
                          <div key={row.label.en}>
                            <dt>{t(row.label, locale)}</dt>
                            <dd>
                              {value === "caps" ? (
                                // Odoo's two lists, kept apart: what a Light User account
                                // opens, and what an employee with no login can use.
                                <div className="side__caps">
                                  <p className="deflist__term">{t(lightUser.asUsers, locale)}</p>
                                  <ul className="chips">
                                    {tl(lightUser.userCaps, locale).map((cap) => (
                                      <li key={cap} className="chip chip--text">
                                        {cap}
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="deflist__term">{t(lightUser.asEmployees, locale)}</p>
                                  <ul className="chips">
                                    {tl(lightUser.employeeCaps, locale).map((cap) => (
                                      <li key={cap} className="chip chip--text">
                                        {cap}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                t(value, locale)
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </article>
                ))}
              </div>
            </Reveal>
            <p className="pricing__aside">
              <Icon name="check" size={18} />
              {t(copy.freeUsers, locale)}
            </p>
          </div>
        </Section>

        <Section labelledBy="hosting">
          <div className="section__head">
            <h2 id="hosting">{t(copy.hostTitle, locale)}</h2>
            <p className="section__lead">{t(copy.hostLead, locale)}</p>
          </div>

          <Reveal>
            <div className="hosts" data-glow-group>
              {hosts.map((host) => (
                <article key={host.key} className={`host host--${host.key}`} data-tilt="4" data-glow>
                  <div className="host__head">
                    <Cube icon={host.icon} />
                    <div>
                      <h3 lang={host.key === "premise" ? undefined : "en"}>{t(host.name, locale)}</h3>
                      <p className="host__tag">{t(host.tag, locale)}</p>
                    </div>
                  </div>
                  <dl className="host__facts">
                    {FACTS.map((fact) => (
                      <div key={fact}>
                        <dt>{t(hostFacts[fact], locale)}</dt>
                        <dd>{say(host.facts[fact])}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </Reveal>

          <div className="pricing__block" id="odoo-sh">
            <h3 className="pricing__subtitle" id="odoo-sh-title">
              {t(copy.shTitle, locale)}
            </h3>
            <p className="pricing__sublead">{t(copy.shLead, locale)}</p>
            <Reveal>
              <div className="compare-wrap" tabIndex={0} role="region" aria-labelledby="odoo-sh-title">
                <table className="compare compare--sh">
                  <caption className="sr-only">{t(copy.shTitle, locale)}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t(copy.colItem, locale)}</th>
                      <th scope="col">{t(copy.colYearly, locale)}</th>
                      <th scope="col">{t(copy.colMonthly, locale)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shRows.map((row) => (
                      <tr key={row.key}>
                        {/* Named by the item alone, so table navigation does not
                            read the whole note out again on every cell. */}
                        <th scope="row" aria-labelledby={`sh-${row.key}`}>
                          <span className="compare__item" id={`sh-${row.key}`}>
                            {t(row.label, locale)}
                          </span>
                          <span className="compare__note">{say(row.note)}</span>
                        </th>
                        {[shYearly, shMonthly].map((set, index) => (
                          <td key={index}>
                            <span className="compare__amount ltr">{$(set[row.key])}</span>
                            <span className="compare__unit">{t(row.unit, locale)}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="compare__total">
                      <th scope="row">{say(copy.shMin)}</th>
                      {[shYearly, shMonthly].map((set, index) => (
                        <td key={index}>
                          <span className="compare__amount ltr">
                            {$(smallest.workers[0] * set.worker + smallest.storage[0] * set.gb)}
                          </span>
                          <span className="compare__unit">{t(copy.perMonth, locale)}</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
            <p className="pricing__aside">
              <Icon name="spark" size={18} />
              {say(copy.shAdvice)}
            </p>
            <p className="pricing__aside">
              <Icon name="alert" size={18} />
              {t(copy.shNoLicence, locale)}
            </p>
          </div>

          <div className="pricing__block">
            <h3 className="pricing__subtitle">{t(copy.shIncludedTitle, locale)}</h3>
            <ul className="included">
              {tl(shIncluded, locale).map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section tone="sunken" id="estimate" labelledBy="estimate-title">
          <div className="section__head">
            <h2 id="estimate-title">{t(copy.calcTitle, locale)}</h2>
            <p className="section__lead">{t(copy.calcLead, locale)}</p>
          </div>
          <PriceCalculator
            locale={locale}
            rates={rates}
            copy={pick(calc, locale, figs)}
            planNames={{ standard: t(plans.standard.name, locale), custom: t(plans.custom.name, locale) }}
            billingGroup={BILLING}
          />
        </Section>

        <Section labelledBy="faq" narrow>
          <div className="section__head">
            <h2 id="faq">{t(copy.faqTitle, locale)}</h2>
          </div>
          <div className="faq">
            {pricingFaq.map((item) => (
              <details key={item.q.en} className="faq__item">
                <summary className="faq__q">
                  <span>{t(item.q, locale)}</span>
                  <Icon name="chevron" size={20} />
                </summary>
                <div className="faq__a">
                  {sayAll(item.a).map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Section>

        <Section tone="sunken">
          <Reveal>
            <CtaBand
              locale={locale}
              title={copy.ctaTitle}
              body={copy.ctaBody}
              topic={t(copy.ctaTopic, locale)}
            />
          </Reveal>
        </Section>
      </div>
    </PageShell>
  );
}
