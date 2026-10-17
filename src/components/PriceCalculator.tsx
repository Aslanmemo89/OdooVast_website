"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { Icon } from "@/components/Icon";
import type { Billing, CalcKey, PaidPlan, Rates } from "@/content/pricing";
import { fill, grouped, num, usd, type Locale } from "@/lib/i18n";
import { toWesternDigits } from "@/lib/phone";
import { waLink } from "@/lib/whatsapp";

type Hosting = "online" | "sh" | "premise";
type Server = "shared" | "dedicated";

const MAX_PEOPLE = 9999;
const MAX_VISITORS = 999_000;

const clamp = (value: number, [min, max]: readonly [number, number]) =>
  Math.min(max, Math.max(min, value));

type Props = {
  locale: Locale;
  rates: Rates;
  /** Every string the calculator shows, in the visitor's language, figures written in. */
  copy: Record<CalcKey, string>;
  planNames: Record<PaidPlan, string>;
  /** The name of the Yearly/Monthly radio group above the plan cards. */
  billingGroup: string;
};

/**
 * Adds Odoo's published prices up for one company: licences, light users and,
 * on the Custom plan, Odoo.sh hosting sized by Odoo's own advice. Nothing is
 * sent or stored — the only way out is a WhatsApp message the visitor sends.
 */
export function PriceCalculator({ locale, rates, copy, planNames, billingGroup }: Props) {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [plan, setPlan] = useState<PaidPlan>("standard");
  const [users, setUsers] = useState(10);
  const [light, setLight] = useState(0);
  const [hosting, setHosting] = useState<Hosting>("online");
  const [server, setServer] = useState<Server>("shared");
  // null = follow Odoo's advice for the number of users; a number = the visitor's own.
  const [workers, setWorkers] = useState<number | null>(null);
  const [storage, setStorage] = useState<number | null>(null);
  // Odoo bills at least one staging environment, so that is where it starts.
  const [staging, setStaging] = useState(rates.sh.staging[0]);
  const [visitors, setVisitors] = useState(0);
  // What the live region in the receipt says; see speak() below.
  const [spoken, setSpoken] = useState("");

  // The Yearly/Monthly switch above the plan cards is plain radio buttons that
  // CSS reads, so it works without JavaScript. The calculator follows it, and
  // moves it when the calculator's own switch is used, so the two never disagree.
  useEffect(() => {
    const radios = Array.from(
      document.querySelectorAll<HTMLInputElement>(`input[name="${billingGroup}"]`),
    );
    const follow = () => {
      const on = radios.find((radio) => radio.checked)?.value;
      if (on === "yearly" || on === "monthly") setBilling(on);
      // The total this changes is not announced (the visitor is up at the
      // plan cards), so nothing stale is left waiting in the live region.
      setSpoken("");
    };
    follow();
    radios.forEach((radio) => radio.addEventListener("change", follow));
    return () => radios.forEach((radio) => radio.removeEventListener("change", follow));
  }, [billingGroup]);

  const chooseBilling = (next: Billing) => {
    setBilling(next);
    const top = document.querySelector<HTMLInputElement>(
      `input[name="${billingGroup}"][value="${next}"]`,
    );
    if (top) top.checked = true;
  };

  // Odoo.sh and a server of your own come with the Custom plan, and your own
  // server with yearly billing: choosing one of them sets those as well,
  // rather than leaving its key greyed out until the visitor works out why.
  const chooseHosting = (next: Hosting) => {
    if (next !== "online" && plan === "standard") setPlan("custom");
    if (next === "premise" && billing === "monthly") chooseBilling("yearly");
    setHosting(next);
  };

  /* ------------------------------------------------------------ the sums */

  // Odoo.sh and a server of your own come with Custom only, and your own
  // server with yearly billing only. The visitor's choice is kept, so it comes
  // back when they switch back; what is shown and added up is what applies.
  const premiseAllowed = plan === "custom" && billing === "yearly";
  const place: Hosting =
    plan === "standard" || (hosting === "premise" && !premiseAllowed) ? "online" : hosting;

  // The same suggestion Odoo's purchase form makes: a worker for every 25
  // regular users and 1 GB for every 2, rounded up, plus a worker for every
  // 5,000 website visitors a day. Light users are left out of it: many are
  // employees with no login at all, at a till or on the shop floor.
  const sh = rates.sh;
  const limits = sh.limits[server];
  const advisedWorkers =
    Math.max(1, Math.ceil(users / sh.usersPerWorker)) + Math.floor(visitors / sh.visitorsPerWorker);
  const advisedStorage = Math.max(1, Math.ceil(users / sh.usersPerGb));
  const wantWorkers = workers ?? advisedWorkers;
  const wantStorage = storage ?? advisedStorage;
  const w = clamp(wantWorkers, limits.workers);
  const gb = clamp(wantStorage, limits.storage);
  const st = clamp(staging, sh.staging);
  const followsAdvice = workers === null && storage === null;

  // Whatever the server cannot take, say so, rather than change it silently —
  // while Odoo.sh is the hosting, the only time these limits apply.
  // (A shared server's minimum is a single worker; nothing to explain there.)
  const limitNotes: string[] = [];
  if (place === "sh") {
    if (wantWorkers > limits.workers[1]) {
      limitNotes.push(server === "shared" ? copy.sharedWorkersLimit : copy.dedicatedWorkersMax);
    } else if (server === "dedicated" && wantWorkers < limits.workers[0]) {
      limitNotes.push(copy.dedicatedWorkersMin);
    }
    if (wantStorage > limits.storage[1]) {
      limitNotes.push(server === "shared" ? copy.sharedGbLimit : copy.dedicatedGbLimit);
    }
    if (staging > sh.staging[1]) limitNotes.push(copy.stagingLimit);
  }

  const perUser = rates.licence[plan].price[billing];
  const r = sh.rates[billing];
  const licence = users * perUser;
  const lightCost = light * rates.lightUser;
  const dedicated = place === "sh" && server === "dedicated" ? r.dedicated : 0;
  const hostingCost =
    place === "sh" ? dedicated + w * r.worker + gb * r.gb + st * r.staging : 0;
  const month = licence + lightCost + hostingCost;
  const later = users * rates.licence[plan].regular[billing] + lightCost + hostingCost;

  const $ = (amount: number) => usd(amount, locale);
  const n = (value: number) => grouped(value, locale);
  const total = $(month);

  /* ------------------------------------------------------- what it says */

  // Screen readers hear the total, and any limit note, once it settles after
  // a change made in the calculator itself — not when the switch beside the
  // plan cards moves it, and not when the page loads. The region is emptied
  // first, so a total that comes back to an earlier figure is still read.
  const latest = useRef(total);
  const latestNotes = useRef(limitNotes);
  const timer = useRef(0);
  useEffect(() => {
    latest.current = total;
    latestNotes.current = limitNotes;
  });
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const speak = () => {
    window.clearTimeout(timer.current);
    setSpoken("");
    timer.current = window.setTimeout(
      () => setSpoken([fill(copy.live, { total: latest.current }), ...latestNotes.current].join(" ")),
      700,
    );
  };
  // "Use Odoo's advice" disappears once used, so focus moves to the advice.
  const adviceRef = useRef<HTMLParagraphElement>(null);

  // The receipt is held in view beside the form only while all of it fits
  // on the screen; taller, it scrolls with the page, so nothing in it (and
  // no keyboard focus) is ever stranded below the bottom edge.
  const receiptRef = useRef<HTMLElement>(null);
  const [fits, setFits] = useState(true);
  useEffect(() => {
    const receipt = receiptRef.current;
    if (!receipt) return;
    // The 6rem it is held at from the top, and 1rem of room under it — in
    // rem, so a larger default font in the browser is allowed for.
    const check = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      setFits(receipt.offsetHeight <= window.innerHeight - 7 * rem);
    };
    const observer = new ResizeObserver(check);
    observer.observe(receipt);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  const serverName = server === "shared" ? copy.shared : copy.dedicated;
  const hostingText =
    place === "online"
      ? "Odoo Online"
      : place === "premise"
        ? copy.premise
        : `Odoo.sh (${serverName}) — ` +
          [
            `${copy.workersLine}: ${n(w)}`,
            `${copy.storageLine}: ${n(gb)} GB`,
            `${copy.stagingLine}: ${n(st)}`,
          ].join(copy.comma);

  const whatsapp = waLink(
    fill(copy.message, {
      plan: planNames[plan],
      billing: billing === "yearly" ? copy.billedYearly : copy.billedMonthly,
      users: n(users),
      light: n(light),
      hosting: hostingText,
      total,
    }),
  );

  const reset = () => {
    chooseBilling("yearly");
    setPlan("standard");
    setUsers(10);
    setLight(0);
    setHosting("online");
    setServer("shared");
    setWorkers(null);
    setStorage(null);
    setStaging(rates.sh.staging[0]);
    setVisitors(0);
    speak();
  };

  const stepper = { locale, less: copy.less, more: copy.more, onStep: speak };

  return (
    // --tall: the receipt scrolls with the page, so the running total bar
    // keeps the figure in sight on a wide screen too.
    <div className={fits ? "calc" : "calc calc--tall"}>
      {/* Every change inside the form — a radio, a key, a typed number —
          bubbles up here, which is what lets the total be read out.
          autoComplete="off" stops the browser restoring these radios on Back
          behind React's back, which left the keys and the receipt apart. */}
      <form
        className="calc__form"
        autoComplete="off"
        onSubmit={(event) => event.preventDefault()}
        onChange={speak}
        onClick={(event) => {
          if ((event.target as Element).closest("button")) speak();
        }}
        noValidate
      >
        <Choice
          name="calc-billing"
          legend={copy.billing}
          value={billing}
          onChange={chooseBilling}
          options={[
            { value: "yearly", label: copy.yearly, badge: copy.yearlyBadge },
            { value: "monthly", label: copy.monthly },
          ]}
        />

        <Choice
          name="calc-plan"
          legend={copy.plan}
          value={plan}
          onChange={setPlan}
          options={(["standard", "custom"] as const).map((key) => ({
            value: key,
            label: planNames[key],
            note: (
              <>
                <span className="ltr">{$(rates.licence[key].price[billing])}</span> {copy.perUser}
              </>
            ),
          }))}
        />

        <div className="calc__pair">
          <Stepper
            {...stepper}
            id="calc-users"
            label={copy.users}
            hint={copy.usersHint}
            value={users}
            range={[1, MAX_PEOPLE]}
            onChange={setUsers}
          />
          <Stepper
            {...stepper}
            id="calc-light"
            label={copy.lightUsers}
            hint={copy.lightHint}
            value={light}
            range={[0, MAX_PEOPLE]}
            onChange={setLight}
          />
        </div>

        <Choice
          name="calc-hosting"
          legend={copy.hosting}
          value={place}
          onChange={chooseHosting}
          help={
            plan === "standard" ? copy.standardHosting : premiseAllowed ? undefined : copy.premiseYearly
          }
          options={[
            { value: "online", label: "Odoo Online", note: copy.included, icon: "cloud" },
            { value: "sh", label: "Odoo.sh", icon: "server" },
            { value: "premise", label: copy.premise, icon: "enterprise" },
          ]}
        />

        {place === "sh" ? (
          <div className="calc__sh">
            <Choice
              name="calc-server"
              legend={copy.server}
              value={server}
              onChange={setServer}
              options={[
                { value: "shared", label: copy.shared },
                {
                  value: "dedicated",
                  label: copy.dedicated,
                  note: <span className="ltr">+{$(r.dedicated)}</span>,
                },
              ]}
            />

            <div className="calc__pair">
              {/* A typed number past the server's limit is kept as typed, so
                  the note below can say why the receipt uses the limit. */}
              <Stepper
                {...stepper}
                id="calc-workers"
                label={copy.workers}
                value={w}
                range={limits.workers}
                onChange={setWorkers}
                keepTyped
              />
              <Stepper
                {...stepper}
                id="calc-storage"
                label={copy.storage}
                value={gb}
                range={limits.storage}
                onChange={setStorage}
                keepTyped
              />
              <Stepper
                {...stepper}
                id="calc-staging"
                label={copy.staging}
                hint={copy.stagingHint}
                value={st}
                range={sh.staging}
                onChange={setStaging}
                keepTyped
              />
              <Stepper
                {...stepper}
                id="calc-visitors"
                label={copy.visitors}
                value={visitors}
                step={1000}
                range={[0, MAX_VISITORS]}
                onChange={setVisitors}
              />
            </div>

            <Rack count={w} locale={locale} />

            <div className="calc__guide">
              <p className="calc__advice" ref={adviceRef} tabIndex={-1}>
                <Icon name="spark" size={16} />
                <span>
                  {fill(copy.advice, { workers: n(advisedWorkers), storage: n(advisedStorage) })}
                </span>
                {followsAdvice ? null : (
                  <button
                    type="button"
                    className="calc__link"
                    onClick={() => {
                      adviceRef.current?.focus();
                      setWorkers(null);
                      setStorage(null);
                    }}
                  >
                    {copy.useAdvice}
                  </button>
                )}
              </p>
              {/* Read out with the total by the receipt's live region. */}
              <div className="calc__notes">
                {limitNotes.map((note) => (
                  <p key={note} className="calc__warn">
                    <Icon name="alert" size={16} />
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </form>

      {/* On a phone the receipt comes after the form; this keeps its total in
          sight while the form is filled in, and comes to rest just above it.
          Hidden from screen readers, which hear the total from the receipt. */}
      <div className="calc__peek" aria-hidden="true">
        <span>{copy.result}</span>
        <span className="calc__peek-total ltr">{total}</span>
        <span>{copy.perMonth}</span>
      </div>

      <aside
        ref={receiptRef}
        className={fits ? "receipt" : "receipt receipt--tall"}
        aria-labelledby="receipt-title"
      >
        <h3 className="receipt__title" id="receipt-title">
          {copy.result}
        </h3>
        <p className="receipt__total">
          {/* Keyed by the amount, so each new total turns over into place. */}
          <span key={total} className="receipt__amount ltr">
            {total}
          </span>
          <span className="receipt__per">{copy.perMonth}</span>
        </p>
        <p className="receipt__year">
          <span className="ltr">{$(month * 12)}</span> {copy.perYear}
          {billing === "yearly" ? <span className="receipt__billed">{copy.billedOnce}</span> : null}
        </p>

        {/* Straight under the total: however long the breakdown grows, the
            way to send it stays in view. */}
        <div className="receipt__actions">
          <a
            className="btn btn--whatsapp btn--block"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            <Icon name="whatsapp" size={20} />
            {copy.send}
          </a>
        </div>

        <dl className="receipt__lines">
          <Line
            label={`${copy.licence} — ${planNames[plan]}`}
            detail={`${n(users)} × ${$(perUser)}`}
            amount={$(licence)}
          />
          {light > 0 ? (
            <Line
              label={copy.lightLine}
              detail={`${n(light)} × ${$(rates.lightUser)}`}
              amount={$(lightCost)}
            />
          ) : null}
          {place === "online" ? <Line label={copy.onlineLine} amount={copy.included} plain /> : null}
          {place === "premise" ? <Line label={copy.premiseLine} amount={copy.notIncluded} plain /> : null}
          {place === "sh" ? (
            <>
              <Line label={`${copy.shLine} — ${serverName}`} amount={$(hostingCost)} />
              {dedicated > 0 ? <Line sub label={copy.dedicatedLine} amount={$(dedicated)} /> : null}
              <Line sub label={copy.workersLine} detail={`${n(w)} × ${$(r.worker)}`} amount={$(w * r.worker)} />
              <Line sub label={copy.storageLine} detail={`${n(gb)} GB × ${$(r.gb)}`} amount={$(gb * r.gb)} />
              <Line
                sub
                label={copy.stagingLine}
                detail={`${n(st)} × ${$(r.staging)}`}
                amount={$(st * r.staging)}
              />
            </>
          ) : null}
        </dl>

        {later > month ? (
          <p className="receipt__later">
            {copy.later}: <span className="ltr">{$(later)}</span> {copy.perMonth}
          </p>
        ) : null}
        <p className="receipt__note">{copy.notCovered}</p>

        <button type="button" className="receipt__reset" onClick={reset}>
          {copy.reset}
        </button>

        <p className="sr-only" aria-live="polite">
          {spoken}
        </p>
      </aside>
    </div>
  );
}

/* --------------------------------------------------------------- controls */

type Option<V extends string> = {
  value: V;
  label: string;
  note?: ReactNode;
  badge?: string;
  icon?: "cloud" | "server" | "enterprise";
  disabled?: boolean;
};

/** A row of radio buttons drawn as raised keys. */
function Choice<V extends string>({
  name,
  legend,
  value,
  options,
  onChange,
  help,
}: {
  name: string;
  legend: string;
  value: V;
  options: Option<V>[];
  onChange: (next: V) => void;
  help?: string;
}) {
  const helpId = `${name}-help`;
  return (
    <fieldset className="choice" aria-describedby={help ? helpId : undefined}>
      <legend className="field__label">{legend}</legend>
      <div className="choice__row">
        {options.map((option) => (
          <label key={option.value} className="choice__option">
            {/* onClick and Space as well: choosing the key already shown
                pressed — the hosting that stands in for an unavailable one —
                makes it the visitor's own choice, and no change event says so
                (nor, for Space on a checked radio, any click). */}
            <input
              className="choice__input"
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange={() => onChange(option.value)}
              onClick={() => onChange(option.value)}
              onKeyUp={(event) => {
                if (event.key === " ") onChange(option.value);
              }}
            />
            <span className="choice__key">
              {option.icon ? <Icon name={option.icon} size={18} /> : null}
              <span className="choice__label">{option.label}</span>
              {option.note ? <span className="choice__note">{option.note}</span> : null}
              {option.badge ? <span className="choice__badge">{option.badge}</span> : null}
            </span>
          </label>
        ))}
      </div>
      {help ? (
        <p className="choice__help" id={helpId}>
          {help}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Whole number out of what was typed: "1,250" → 1250, "2.5" → 2, "١٢" → 12. */
function parseCount(raw: string): number {
  return parseInt(toWesternDigits(raw).replace(/[,٬\s]/g, ""), 10);
}

/**
 * A number with − and + keys. A text field rather than type="number", so
 * Eastern Arabic digits typed on a Kurdish or Arabic keyboard are understood;
 * it is announced as a spin button, and the arrow keys step it. With
 * `keepTyped`, a typed number past the range is passed on as typed (the
 * owner clamps it and says why); the keys always stay inside the range.
 */
function Stepper({
  id,
  label,
  hint,
  value,
  range,
  step = 1,
  onChange,
  onStep,
  keepTyped = false,
  locale,
  less,
  more,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  range: readonly [number, number];
  step?: number;
  onChange: (next: number) => void;
  /** Called after an arrow key steps the value: no change event reports it. */
  onStep?: () => void;
  keepTyped?: boolean;
  locale: Locale;
  less: string;
  more: string;
}) {
  // What the visitor is typing, until they leave the field; then the number.
  const [draft, setDraft] = useState<string | null>(null);
  const [min, max] = range;
  const go = (next: number) => {
    setDraft(null);
    onChange(clamp(next, range));
  };

  return (
    <div className="stepper">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <div className="stepper__box">
        <button
          type="button"
          className="stepper__key"
          aria-label={`${less} — ${label}`}
          aria-controls={id}
          aria-disabled={value <= min}
          onClick={() => value > min && go(value - step)}
        >
          <Icon name="minus" size={18} />
        </button>
        <input
          className="stepper__input"
          id={id}
          type="text"
          role="spinbutton"
          inputMode="numeric"
          autoComplete="off"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          value={draft ?? grouped(value, locale)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(event) => {
            setDraft(event.target.value);
            const parsed = parseCount(event.target.value);
            if (Number.isNaN(parsed)) return;
            onChange(keepTyped ? Math.max(0, parsed) : clamp(parsed, range));
          }}
          onBlur={() => setDraft(null)}
          onKeyDown={(event) => {
            // At a limit the key does nothing, like the − and + keys: a
            // value that is only following Odoo's advice stays that way.
            if (event.key === "ArrowUp") {
              event.preventDefault();
              if (value < max) {
                go(value + step);
                onStep?.();
              }
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              if (value > min) {
                go(value - step);
                onStep?.();
              }
            }
          }}
        />
        <button
          type="button"
          className="stepper__key"
          aria-label={`${more} — ${label}`}
          aria-controls={id}
          aria-disabled={value >= max}
          onClick={() => value < max && go(value + step)}
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
      {hint ? (
        <p className="stepper__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** One line of the receipt: what, how it was worked out, how much. */
function Line({
  label,
  detail,
  amount,
  sub,
  plain,
}: {
  label: string;
  detail?: string;
  amount: string;
  sub?: boolean;
  plain?: boolean;
}) {
  return (
    <div className={sub ? "receipt__line receipt__line--sub" : "receipt__line"}>
      <dt>
        {label}
        {detail ? (
          <span className="receipt__detail">
            <span className="ltr">{detail}</span>
          </span>
        ) : null}
      </dt>
      <dd>{plain ? amount : <span className="ltr">{amount}</span>}</dd>
    </div>
  );
}

/** The workers as a stack of server blades — one per worker, up to sixteen. */
function Rack({ count, locale }: { count: number; locale: Locale }) {
  const shown = Math.min(count, 16);
  return (
    <div className="rack" aria-hidden="true">
      <div className="rack__frame">
        {Array.from({ length: shown }, (_, index) => (
          <span key={index} className="rack__blade" style={{ "--i": index } as CSSProperties} />
        ))}
      </div>
      {count > shown ? <span className="rack__more ltr">+{num(count - shown, locale)}</span> : null}
    </div>
  );
}
