import { company } from "@/content/company";
import { fill, t, ui, type Locale } from "@/lib/i18n";

/** wa.me link with the message pre-filled, in the visitor's language. */
export function waLink(text: string): string {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** "I would like a free consultation about Odoo." */
export function waGeneral(locale: Locale): string {
  return waLink(t(ui.waGeneral, locale));
}

/** "I would like to talk about {service or industry}." */
export function waAbout(locale: Locale, topic: string): string {
  return waLink(fill(t(ui.waService, locale), { topic }));
}

/** The contact form message — phone is already normalised to 9647XXXXXXXXX. */
export function waFromForm(
  locale: Locale,
  fields: { name: string; company: string; phone: string; message: string },
): string {
  return waLink(
    fill(t(ui.waForm, locale), {
      name: fields.name,
      company: fields.company || t(ui.waFormNoCompany, locale),
      phone: fields.phone,
      message: fields.message,
    }),
  );
}
