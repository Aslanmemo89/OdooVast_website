import type { T } from "@/lib/i18n";

/**
 * Only milestones confirmed in FACTS.md appear here.
 *
 * The 2015 / 2018 / 2021 / 2024 timeline that the old site showed was corrected
 * by the owner on 2026-08-11: OdooVast was founded in 2025. Nothing earlier is
 * claimed anywhere on this site.
 *
 * TODO: the year OdooVast became an Odoo Partner — add a milestone below once
 * confirmed. TODO: any 2026 milestone worth publishing (first enterprise
 * client, team size, new office).
 */
export type Milestone = {
  year: string;
  title: T;
  body: T;
};

export const timeline: Milestone[] = [
  {
    year: "2025",
    title: {
      en: "OdooVast is founded in Erbil",
      ar: "تأسيس OdooVast في أربيل",
      ckb: "دامەزراندنی OdooVast لە هەولێر",
    },
    body: {
      en: "Started as a small IT consultancy in Erbil, focused on getting Iraqi businesses onto software that actually fits how they work.",
      ar: "بدأت كشركة استشارات تقنية صغيرة في أربيل، هدفها نقل الشركات العراقية إلى أنظمة تناسب طريقة عملها فعلاً.",
      ckb: "وەک ڕاوێژکارییەکی بچووکی IT لە هەولێر دەستی پێکرد، بە ئامانجی گواستنەوەی کاروباری عێراقی بۆ سیستەمێک کە بەڕاستی لەگەڵ شێوازی کارکردنیان دەگونجێت.",
    },
  },
];
