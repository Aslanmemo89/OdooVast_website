export const locales = ["en", "ar", "ckb"] as const;

export type Locale = (typeof locales)[number];

/**
 * Every translatable string on this site is this shape. Because all three keys
 * are required, a forgotten translation is a TypeScript error at build time
 * rather than a page that silently falls back to English.
 */
export type T = { en: string; ar: string; ckb: string };

/** The same guarantee for lists (bullet points, feature lines). */
export type TList = { en: string[]; ar: string[]; ckb: string[] };

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Narrows the `[locale]` route param to a Locale. Because the layout sets
 * `dynamicParams = false`, an unknown locale is already a 404 before a page
 * runs — this exists so pages receive a typed Locale rather than a string.
 */
export function localeFromParam(value: string): Locale {
  if (!isLocale(value)) throw new Error(`Unsupported locale: ${value}`);
  return value;
}

export const t = (s: T, locale: Locale): string => s[locale];

export const tl = (s: TList, locale: Locale): readonly string[] => s[locale];

export const dir = (locale: Locale): "ltr" | "rtl" =>
  locale === "en" ? "ltr" : "rtl";

/** BCP 47 tags. "ckb" is Central Kurdish; "ckb-IQ" pins it to Iraq. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  ar: "ar-IQ",
  ckb: "ckb-IQ",
};

/**
 * hreflang codes for search engines. Google only recognises ISO 639-1
 * languages there, and Sorani's 639-1 code is "ku" — so annotations use
 * ku-IQ while the page itself stays correctly tagged ckb-IQ.
 */
export const hreflang: Record<Locale, string> = {
  en: "en",
  ar: "ar-IQ",
  ckb: "ku-IQ",
};

/** Each language named in its own script, for the switcher. */
export const localeName: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ckb: "کوردی",
};

/** Short form for the compact mobile switcher. */
export const localeShort: Record<Locale, string> = {
  en: "EN",
  ar: "عربي",
  ckb: "کوردی",
};

/** Replaces {token} placeholders — used by the WhatsApp message templates. */
export const fill = (template: string, vars: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? "");

/**
 * Interface chrome only. Anything a client would ask us to reword lives in
 * src/content/ instead.
 */
export const ui = {
  navHome: { en: "Home", ar: "الرئيسية", ckb: "سەرەکی" },
  navAbout: { en: "About", ar: "من نحن", ckb: "دەربارەمان" },
  navServices: { en: "Services", ar: "خدماتنا", ckb: "خزمەتگوزارییەکان" },
  navIndustries: { en: "Industries", ar: "القطاعات", ckb: "کەرتەکان" },
  navPortfolio: { en: "Portfolio", ar: "أعمالنا", ckb: "کارەکانمان" },
  navContact: { en: "Contact", ar: "اتصل بنا", ckb: "پەیوەندی" },

  ctaWhatsApp: { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب", ckb: "لە واتسئاپ قسە بکە" },
  ctaConsultation: {
    en: "Book a free consultation",
    ar: "احجز استشارة مجانية",
    ckb: "ڕاوێژکاری خۆڕایی داوا بکە",
  },
  /** Shorter label for the header button, which has no room to wrap. */
  ctaConsultationShort: {
    en: "Free consultation",
    ar: "استشارة مجانية",
    ckb: "ڕاوێژکاری خۆڕایی",
  },
  ctaCall: { en: "Call us", ar: "اتصل بنا", ckb: "پەیوەندیمان پێوە بکە" },
  ctaEmail: { en: "Email us", ar: "راسلنا", ckb: "ئیمەیڵمان بۆ بنێرە" },
  ctaAllServices: { en: "See all services", ar: "جميع الخدمات", ckb: "هەموو خزمەتگوزارییەکان" },
  ctaAllIndustries: { en: "See all industries", ar: "جميع القطاعات", ckb: "هەموو کەرتەکان" },
  ctaDiscussService: {
    en: "Discuss this service",
    ar: "ناقش هذه الخدمة",
    ckb: "لەسەر ئەم خزمەتگوزارییە بدوێ",
  },
  ctaMore: { en: "Details", ar: "التفاصيل", ckb: "وردەکاری" },
  ctaDirections: { en: "Open in Google Maps", ar: "افتح في خرائط جوجل", ckb: "لە Google Maps بیکەرەوە" },

  labelIncludes: { en: "What is included", ar: "ما الذي تتضمنه", ckb: "چی لەخۆ دەگرێت" },
  labelSuitedFor: { en: "Best suited for", ar: "الأنسب لـ", ckb: "گونجاوە بۆ" },
  labelChallenges: { en: "The problems we solve", ar: "المشكلات التي نحلها", ckb: "ئەو کێشانەی چارەسەری دەکەین" },

  formName: { en: "Full name", ar: "الاسم الكامل", ckb: "ناوی تەواو" },
  formCompany: { en: "Company", ar: "الشركة", ckb: "کۆمپانیا" },
  formCompanyHint: { en: "optional", ar: "اختياري", ckb: "ئارەزوومەندانە" },
  formPhone: { en: "Phone number", ar: "رقم الهاتف", ckb: "ژمارەی مۆبایل" },
  formPhoneHint: {
    en: "Iraqi mobile, e.g. 0751 239 9899",
    ar: "رقم عراقي، مثال: 0751 239 9899",
    ckb: "ژمارەی عێراقی، وەک: ٠٧٥١ ٢٣٩ ٩٨٩٩",
  },
  formMessage: { en: "How can we help?", ar: "كيف يمكننا مساعدتك؟", ckb: "چۆن یارمەتیت بدەین؟" },
  formMessagePlaceholder: {
    en: "Tell us about your business and what you need from Odoo.",
    ar: "أخبرنا عن نشاطك وما تحتاجه من Odoo.",
    ckb: "باسی کارەکەت بکە و ئەوەی لە Odoo پێویستە.",
  },
  formSubmit: { en: "Send on WhatsApp", ar: "أرسل عبر واتساب", ckb: "بە واتسئاپ بینێرە" },
  formNote: {
    en: "This opens WhatsApp with your message ready to send. We store nothing on this website.",
    ar: "سيفتح هذا واتساب ورسالتك جاهزة للإرسال. لا نخزّن أي بيانات على هذا الموقع.",
    ckb: "ئەمە واتسئاپ دەکاتەوە و نامەکەت ئامادەیە بۆ ناردن. هیچ زانیارییەک لەم ماڵپەڕەدا هەڵناگیرێت.",
  },
  errName: { en: "Please enter your name.", ar: "يرجى إدخال اسمك.", ckb: "تکایە ناوت بنووسە." },
  errMessage: {
    en: "Please tell us what you need.",
    ar: "يرجى كتابة ما تحتاجه.",
    ckb: "تکایە بنووسە چیت پێویستە.",
  },
  errPhone: {
    en: "Enter a valid Iraqi mobile number, e.g. 0751 239 9899.",
    ar: "أدخل رقم موبايل عراقي صحيح، مثال: 0751 239 9899.",
    ckb: "ژمارەیەکی دروستی مۆبایلی عێراقی بنووسە، وەک: ٠٧٥١ ٢٣٩ ٩٨٩٩.",
  },
  errSummary: {
    en: "Please fix the fields marked below.",
    ar: "يرجى تصحيح الحقول المحددة أدناه.",
    ckb: "تکایە ئەو خانانە ڕاست بکەرەوە کە دیاریکراون.",
  },

  footerQuickLinks: { en: "Pages", ar: "الصفحات", ckb: "لاپەڕەکان" },
  footerContact: { en: "Get in touch", ar: "تواصل معنا", ckb: "پەیوەندیمان پێوە بکە" },
  footerFollow: { en: "Follow", ar: "تابعنا", ckb: "شوێنمان بکەوە" },
  footerRights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", ckb: "هەموو مافەکان پارێزراون." },

  srSkipToContent: { en: "Skip to content", ar: "تخطَّ إلى المحتوى", ckb: "بازبدە بۆ ناوەڕۆک" },
  srMenu: { en: "Menu", ar: "القائمة", ckb: "پێڕست" },
  srLanguage: { en: "Language", ar: "اللغة", ckb: "زمان" },
  srLogoAlt: { en: "OdooVast", ar: "OdooVast", ckb: "OdooVast" },
  srWhatsAppFab: {
    en: "Message OdooVast on WhatsApp",
    ar: "راسل OdooVast عبر واتساب",
    ckb: "لە واتسئاپ نامە بۆ OdooVast بنێرە",
  },
  srMapTitle: {
    en: "Map showing the OdooVast office in Erbil",
    ar: "خريطة توضح مكتب OdooVast في أربيل",
    ckb: "نەخشەی نووسینگەی OdooVast لە هەولێر",
  },

  waGeneral: {
    en: "Hello OdooVast, I would like a free consultation about Odoo.",
    ar: "مرحباً OdooVast، أرغب في استشارة مجانية بخصوص Odoo.",
    ckb: "سڵاو OdooVast، ڕاوێژکارییەکی خۆڕاییم دەوێت دەربارەی Odoo.",
  },
  waService: {
    en: "Hello OdooVast, I would like to talk about {topic}.",
    ar: "مرحباً OdooVast، أرغب في التحدث بخصوص {topic}.",
    ckb: "سڵاو OdooVast، دەمەوێت لەسەر {topic} قسە بکەم.",
  },
  waForm: {
    en: "Hello OdooVast.\n\nName: {name}\nCompany: {company}\nPhone: +{phone}\n\n{message}",
    ar: "مرحباً OdooVast.\n\nالاسم: {name}\nالشركة: {company}\nالهاتف: +{phone}\n\n{message}",
    ckb: "سڵاو OdooVast.\n\nناو: {name}\nکۆمپانیا: {company}\nمۆبایل: +{phone}\n\n{message}",
  },
  waFormNoCompany: { en: "—", ar: "—", ckb: "—" },
} satisfies Record<string, T>;
