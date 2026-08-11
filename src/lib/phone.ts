/** 9647XXXXXXXXX, or "" when it isn't an Iraqi mobile. */
export function normalizeIqPhone(raw: string): string {
  let d = (raw || "").replace(/[^\d]/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  const c = d.startsWith("964")
    ? d
    : d.startsWith("0")
      ? "964" + d.slice(1)
      : d.startsWith("7")
        ? "964" + d
        : d;
  return /^9647\d{9}$/.test(c) ? c : "";
}

/** Arabic-Indic and Extended Arabic-Indic digits, so ٠٧٥١ normalises too. */
const EASTERN_DIGITS = /[٠-٩۰-۹]/g;

export function toWesternDigits(raw: string): string {
  return raw.replace(EASTERN_DIGITS, (ch) => {
    const code = ch.charCodeAt(0);
    const base = code >= 0x06f0 ? 0x06f0 : 0x0660;
    return String(code - base);
  });
}
