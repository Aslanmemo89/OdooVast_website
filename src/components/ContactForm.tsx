"use client";

import { useState, type FormEvent } from "react";

import { Icon } from "@/components/Icon";
import { t, ui, type Locale } from "@/lib/i18n";
import { normalizeIqPhone, toWesternDigits } from "@/lib/phone";
import { waFromForm } from "@/lib/whatsapp";

type Errors = { name?: string; phone?: string; message?: string };

/**
 * No backend, no third-party form service, no stored data. The form validates
 * in the browser and hands the message to WhatsApp with everything filled in.
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const [errors, setErrors] = useState<Errors>({});
  const [showSummary, setShowSummary] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const companyName = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    // Accepts ٠٧٥١…, 0751…, +964 751… and 964751… alike.
    const phone = normalizeIqPhone(toWesternDigits(String(data.get("phone") ?? "")));

    const found: Errors = {};
    if (!name) found.name = t(ui.errName, locale);
    if (!phone) found.phone = t(ui.errPhone, locale);
    if (!message) found.message = t(ui.errMessage, locale);

    setErrors(found);
    setShowSummary(Object.keys(found).length > 0);
    if (Object.keys(found).length > 0) return;

    const link = waFromForm(locale, { name, company: companyName, phone, message });
    const opened = window.open(link, "_blank", "noopener,noreferrer");
    // Popup blocked (common in in-app browsers) — go there directly instead.
    if (!opened) window.location.href = link;
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {showSummary ? (
        <p className="form__alert" role="alert">
          {t(ui.errSummary, locale)}
        </p>
      ) : null}

      <div className="field">
        <label className="field__label" htmlFor="cf-name">
          {t(ui.formName, locale)}
        </label>
        <input
          className="field__control"
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
        />
        {errors.name ? (
          <p className="field__error" id="cf-name-error">
            <Icon name="alert" size={16} />
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="cf-company">
          {t(ui.formCompany, locale)}
          <span className="field__hint">({t(ui.formCompanyHint, locale)})</span>
        </label>
        <input
          className="field__control"
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="cf-phone">
          {t(ui.formPhone, locale)}
          <span className="field__hint">{t(ui.formPhoneHint, locale)}</span>
        </label>
        <input
          className="field__control ltr"
          id="cf-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "cf-phone-error" : undefined}
        />
        {errors.phone ? (
          <p className="field__error" id="cf-phone-error">
            <Icon name="alert" size={16} />
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="cf-message">
          {t(ui.formMessage, locale)}
        </label>
        <textarea
          className="field__control"
          id="cf-message"
          name="message"
          rows={5}
          placeholder={t(ui.formMessagePlaceholder, locale)}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
        />
        {errors.message ? (
          <p className="field__error" id="cf-message-error">
            <Icon name="alert" size={16} />
            {errors.message}
          </p>
        ) : null}
      </div>

      <button className="btn btn--whatsapp btn--block" type="submit">
        <Icon name="whatsapp" size={20} />
        {t(ui.formSubmit, locale)}
      </button>

      <p className="form__note">{t(ui.formNote, locale)}</p>
    </form>
  );
}
