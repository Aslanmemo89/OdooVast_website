import type { IconName } from "@/components/Icon";
import { grouped, usd, type Locale, type T, type TList } from "@/lib/i18n";

/* ----------------------------------------------------------------- source */

/**
 * Odoo's own prices — not OdooVast's. Copied from odoo.com/pricing and
 * odoo.sh/pricing as those pages showed them to a visitor in Iraq on
 * 16 October 2026, in US dollars. (Odoo prices by country; the page reported
 * geoip_country_code "IQ". A visitor elsewhere sees other numbers.)
 *
 * When Odoo changes a price or a limit, change it in `rates` and move
 * `checked` forward. Never round or estimate one. The copy below never writes
 * a price or a limit out: it names it with a {token}, and `figures()` fills
 * the token in from `rates` — so the cards, the tables, the notes and the
 * calculator cannot disagree.
 */
export const source = {
  checkedIso: "2026-10-16",
  checked: {
    en: "16 October 2026",
    ar: "16 تشرين الأول 2026",
    ckb: "١٦ی تشرینی یەکەمی ٢٠٢٦",
  } satisfies T,
  odoo: "https://www.odoo.com/pricing",
  odooSh: "https://www.odoo.sh/pricing",
};

export type Billing = "yearly" | "monthly";
export type PaidPlan = "standard" | "custom";
export type PlanKey = "free" | PaidPlan;

type Range = readonly [min: number, max: number];

export type Rates = {
  /** Per user per month. `regular` applies once the first-year discount ends. */
  licence: Record<PaidPlan, { price: Record<Billing, number>; regular: Record<Billing, number> }>;
  /** How long the lower licence price lasts, in months. */
  discountMonths: number;
  /** Per light user per month, on either billing (odoo.com: prices['monthly_light']). */
  lightUser: number;
  /** Storage included with Odoo Online, in GB. */
  onlineStorageGb: number;
  sh: {
    /** Per month: each worker, each GB, the dedicated server, each staging environment. */
    rates: Record<Billing, { worker: number; gb: number; dedicated: number; staging: number }>;
    limits: Record<"shared" | "dedicated", { workers: Range; storage: Range }>;
    staging: Range;
    /** Odoo's sizing advice, from the help beside each row on odoo.sh/pricing. */
    usersPerWorker: number;
    visitorsPerWorker: number;
    gbPerUser: number;
  };
};

export const rates: Rates = {
  licence: {
    standard: { price: { yearly: 7.25, monthly: 9.1 }, regular: { yearly: 8.95, monthly: 11.2 } },
    custom: { price: { yearly: 13.4, monthly: 16.9 }, regular: { yearly: 16.4, monthly: 20.9 } },
  },
  discountMonths: 12,
  lightUser: 2.9,
  onlineStorageGb: 100,
  sh: {
    rates: {
      yearly: { worker: 57.6, gb: 0.2, dedicated: 480, staging: 14.4 },
      monthly: { worker: 72, gb: 0.25, dedicated: 600, staging: 18 },
    },
    limits: {
      shared: { workers: [1, 16], storage: [1, 512] },
      dedicated: { workers: [8, 256], storage: [1, 4096] },
    },
    staging: [0, 20],
    usersPerWorker: 25,
    visitorsPerWorker: 5000,
    gbPerUser: 1,
  },
};

/**
 * Every {token} the copy uses, written out from `rates` in the visitor's
 * digits. Prices come out isolated left-to-right (see `usd`).
 */
export function figures(locale: Locale): Record<string, string> {
  const { licence, sh } = rates;
  const n = (value: number) => grouped(value, locale);
  // The smaller of the two plans' yearly savings, rounded down: "about 20%".
  const saving = Math.min(
    ...(["standard", "custom"] as const).map(
      (plan) => 1 - licence[plan].price.yearly / licence[plan].price.monthly,
    ),
  );
  const smallest = sh.limits.shared;
  return {
    save: n(Math.floor(saving * 100)),
    months: n(rates.discountMonths),
    lightPrice: usd(rates.lightUser, locale),
    onlineGb: n(rates.onlineStorageGb),
    sharedWorkersMin: n(sh.limits.shared.workers[0]),
    sharedWorkersMax: n(sh.limits.shared.workers[1]),
    dedicatedWorkersMin: n(sh.limits.dedicated.workers[0]),
    dedicatedWorkersMax: n(sh.limits.dedicated.workers[1]),
    sharedGbMax: n(sh.limits.shared.storage[1]),
    dedicatedGbMax: n(sh.limits.dedicated.storage[1]),
    stagingMax: n(sh.staging[1]),
    usersPerWorker: n(sh.usersPerWorker),
    visitorsPerWorker: n(sh.visitorsPerWorker),
    gbPerUser: n(sh.gbPerUser),
    smallWorkers: n(smallest.workers[0]),
    smallGb: n(smallest.storage[0]),
    shFrom: usd(
      smallest.workers[0] * sh.rates.yearly.worker + smallest.storage[0] * sh.rates.yearly.gb,
      locale,
    ),
    gbYearly: usd(sh.rates.yearly.gb, locale),
  };
}

/*
 * The Arabic copy writes the noun after some of these numbers in the form
 * that fits them today — 12 شهراً, 25 مستخدماً, 16 and 256 عاملاً, 8 عمّال,
 * 5,000 زائر. Should Odoo's numbers move into another plural category, the
 * build stops here, so the Arabic wording is changed along with them.
 */
const ARABIC_FORMS: [value: number, form: Intl.LDMLPluralRule, used: string][] = [
  [rates.discountMonths, "many", "noteDiscount, calc.later, thenRegular, fullPrice, the FAQ: شهراً"],
  [rates.sh.usersPerWorker, "many", "shAdvice: مستخدماً"],
  [rates.sh.visitorsPerWorker, "other", "shAdvice: زائر"],
  [rates.sh.limits.shared.workers[1], "many", "calc.sharedWorkersLimit: عاملاً"],
  [rates.sh.limits.dedicated.workers[1], "many", "calc.dedicatedWorkersMax: عاملاً"],
  [rates.sh.limits.dedicated.workers[0], "few", "calc.dedicatedWorkersMin: عمّال"],
];
const arabicPlural = new Intl.PluralRules("ar");
for (const [value, form, used] of ARABIC_FORMS) {
  if (arabicPlural.select(value) !== form) {
    throw new Error(`pricing.ts: Arabic needs a new noun form after ${value} (${used}).`);
  }
}

/* ------------------------------------------------------------------ plans */

export type Plan = {
  key: PlanKey;
  icon: IconName;
  /** Odoo's own name for the plan, shown beside a translation so it matches odoo.com. */
  latin: string;
  name: T;
  for: T;
  features: TList;
  /** Rides into the WhatsApp message: "I would like to talk about {topic}." */
  topic: T;
};

export const plans: Record<PlanKey, Plan> = {
  free: {
    key: "free",
    icon: "spark",
    latin: "One App Free",
    name: { en: "One App Free", ar: "تطبيق واحد مجاناً", ckb: "یەک ئەپی خۆڕایی" },
    for: {
      en: "One app of your choice, free for any number of users.",
      ar: "تطبيق واحد تختاره، مجاناً لأي عدد من المستخدمين.",
      ckb: "یەک ئەپ بە هەڵبژاردنی خۆت، بە خۆڕایی بۆ هەر ژمارەیەک بەکارهێنەر.",
    },
    // From odoo.com's FAQ: the free plan allows multiple companies, and
    // Odoo Studio can be chosen as its one app.
    features: {
      en: ["One app — Odoo Studio can be the one", "Unlimited users", "Hosted on Odoo Online", "Several companies allowed"],
      ar: ["تطبيق واحد — ويمكن أن يكون Odoo Studio", "مستخدمون بلا حدود", "مستضاف على Odoo Online", "يسمح بعدة شركات"],
      ckb: ["یەک ئەپ — دەکرێت Odoo Studio بێت", "بەکارهێنەری بێسنوور", "لەسەر Odoo Online هۆست دەکرێت", "چەند کۆمپانیایەک ڕێگەپێدراوە"],
    },
    topic: {
      en: "Odoo's One App Free plan",
      ar: "خطة التطبيق الواحد المجانية من Odoo",
      ckb: "پلانی یەک ئەپی خۆڕایی Odoo",
    },
  },
  standard: {
    key: "standard",
    icon: "implementation",
    latin: "Standard",
    name: { en: "Standard", ar: "القياسية", ckb: "ستاندارد" },
    for: {
      en: "Every app, for one company that runs Odoo as it comes.",
      ar: "كل التطبيقات، لشركة واحدة تستخدم Odoo كما هو.",
      ckb: "هەموو ئەپەکان، بۆ یەک کۆمپانیا کە Odoo وەک خۆی بەکاردەهێنێت.",
    },
    features: {
      en: ["All apps", "Hosted on Odoo Online, included", "Unlimited support and maintenance", "Upgrades included"],
      ar: ["كل التطبيقات", "استضافة مشمولة على Odoo Online", "دعم وصيانة بلا حدود", "الترقيات مشمولة"],
      ckb: ["هەموو ئەپەکان", "هۆستینگی Odoo Online تێدایە", "پشتگیری و چاکسازیی بێسنوور", "نوێکردنەوەی وەشان تێدایە"],
    },
    topic: { en: "Odoo's Standard plan", ar: "خطة Odoo القياسية", ckb: "پلانی ستانداردی Odoo" },
  },
  custom: {
    key: "custom",
    icon: "code",
    latin: "Custom",
    name: { en: "Custom", ar: "المخصّصة", ckb: "تایبەت" },
    for: {
      en: "Several companies in one database, or Odoo shaped to the way you work.",
      ar: "عدة شركات في قاعدة بيانات واحدة، أو Odoo مفصّل على طريقة عملك.",
      ckb: "چەند کۆمپانیایەک لە یەک داتابەیسدا، یان Odoo بە پێی شێوازی کارکردنی تۆ.",
    },
    features: {
      // {mark} is where the page draws the "**" that points at the note on
      // Odoo.sh hosting — drawn, not written, so screen readers skip it.
      en: [
        "Everything in Standard",
        "Odoo Studio and agentic AI",
        "Multi-company",
        "External API",
        "Odoo Online or Odoo.sh{mark} — or your own server, billed yearly",
      ],
      ar: [
        "كل ما في القياسية",
        "Odoo Studio والذكاء الاصطناعي الوكيل",
        "تعدّد الشركات",
        "واجهة API خارجية",
        "Odoo Online أو Odoo.sh{mark} — أو خادمك الخاص بفوترة سنوية",
      ],
      ckb: [
        "هەموو ئەوەی لە ستاندارددا هەیە",
        "Odoo Studio و AIی بریکار",
        "چەند کۆمپانیا",
        "APIی دەرەکی",
        "Odoo Online یان Odoo.sh{mark} — یان سێرڤەری خۆت بە پارەدانی ساڵانە",
      ],
    },
    topic: { en: "Odoo's Custom plan", ar: "خطة Odoo المخصّصة", ckb: "پلانی تایبەتی Odoo" },
  },
};

export const lightUser = {
  name: { en: "Light User", ar: "المستخدم الخفيف", ckb: "لایت یوزەر" } satisfies T,
  for: {
    en: "For people who use only their own corner of Odoo — a cashier, a picker with a barcode scanner, a worker on the shop floor.",
    ar: "لمن يستخدم ركنه الخاص من Odoo فقط — أمين الصندوق، وعامل المستودع بماسح الباركود، والعامل في أرض المصنع.",
    ckb: "بۆ ئەو کەسانەی تەنها گۆشەی خۆیان لە Odoo بەکاردەهێنن — کاشێرێک، کارمەندێکی کۆگا بە بارکۆد سکانەر، کرێکارێک لە شوێنی بەرهەمهێنان.",
  } satisfies T,
  asUsers: { en: "As users", ar: "كمستخدمين", ckb: "وەک بەکارهێنەر" } satisfies T,
  asEmployees: { en: "As employees", ar: "كموظفين", ckb: "وەک کارمەند" } satisfies T,
  /** odoo.com's list, word for word in meaning: what a light user can open. */
  userCaps: {
    en: [
      "My time off",
      "My expenses",
      "My appraisals",
      "My attendances",
      "My referrals",
      "My planning",
      "Field Service",
      "Inventory barcode operator",
      "Knowledge, read only",
    ],
    ar: [
      "إجازاتي",
      "مصروفاتي",
      "تقييماتي",
      "حضوري",
      "ترشيحاتي",
      "جدولي",
      "الخدمة الميدانية",
      "مشغّل الباركود في المخزون",
      "Knowledge للقراءة فقط",
    ],
    // پشوو, not مۆڵەت: on this page مۆڵەت is the licence.
    ckb: [
      "پشووەکانم",
      "خەرجییەکانم",
      "هەڵسەنگاندنەکانم",
      "ئامادەبوونم",
      "ناساندنەکانم",
      "پلانی کارەکەم",
      "خزمەتگوزاریی مەیدانی",
      "کارپێکەری بارکۆد لە کۆگا",
      "Knowledge تەنها بۆ خوێندنەوە",
    ],
  } satisfies TList,
  employeeCaps: {
    en: ["Payslips", "Point of Sale", "Manufacturing shop floor"],
    ar: ["قسائم الرواتب", "نقطة البيع", "أرض المصنع (Shop Floor)"],
    ckb: ["پسوولەی مووچە", "خاڵی فرۆشتن (POS)", "شوێنی بەرهەمهێنان (Shop Floor)"],
  } satisfies TList,
  how: {
    en: "Light User licences are arranged with an Odoo advisor, who reviews your needs and gives you a quote.",
    ar: "يُرتَّب ترخيص المستخدم الخفيف مع مستشار من Odoo يراجع احتياجاتك ويعطيك عرض سعر.",
    ckb: "مۆڵەتی لایت یوزەر لەگەڵ ڕاوێژکارێکی Odoo ڕێکدەخرێت، کە پێداویستییەکانت هەڵدەسەنگێنێت و نرخت پێدەدات.",
  } satisfies T,
  topic: {
    en: "Odoo Light User licences",
    ar: "تراخيص المستخدم الخفيف في Odoo",
    ckb: "مۆڵەتی لایت یوزەری Odoo",
  } satisfies T,
};

/* ------------------------------------------------------------ comparisons */

/** true = included, false = not included, T = available, on the terms it states. */
export type Cell = boolean | T;

export const planRows: { label: T; standard: Cell; custom: Cell }[] = [
  {
    label: { en: "All apps", ar: "كل التطبيقات", ckb: "هەموو ئەپەکان" },
    standard: true,
    custom: true,
  },
  {
    label: { en: "Hosting on Odoo Online", ar: "الاستضافة على Odoo Online", ckb: "هۆستینگ لەسەر Odoo Online" },
    standard: true,
    custom: true,
  },
  {
    label: {
      en: "Unlimited support, maintenance and upgrades",
      ar: "دعم غير محدود وصيانة وترقيات",
      ckb: "پشتگیریی بێسنوور، چاکسازی و نوێکردنەوەی وەشان",
    },
    standard: true,
    custom: true,
  },
  {
    label: { en: "Odoo Studio and agentic AI", ar: "Odoo Studio والذكاء الاصطناعي الوكيل", ckb: "Odoo Studio و AIی بریکار" },
    standard: false,
    custom: true,
  },
  {
    label: {
      en: "Several companies in one database",
      ar: "عدة شركات في قاعدة بيانات واحدة",
      ckb: "چەند کۆمپانیایەک لە یەک داتابەیسدا",
    },
    standard: false,
    custom: true,
  },
  {
    label: {
      en: "External API — your other software calling Odoo",
      ar: "واجهة API خارجية — برامجك الأخرى تتصل بـ Odoo",
      ckb: "APIی دەرەکی — نەرمەکاڵاکانی ترت پەیوەندی بە Odoo دەکەن",
    },
    standard: false,
    custom: true,
  },
  {
    label: { en: "Odoo.sh hosting", ar: "استضافة Odoo.sh", ckb: "هۆستینگی Odoo.sh" },
    standard: false,
    custom: { en: "Available, paid on top", ar: "متاحة، تُدفع إضافةً", ckb: "هەیە، جیا پارەی دەدرێت" },
  },
  {
    label: { en: "Your own server (on-premise)", ar: "خادمك الخاص (On-premise)", ckb: "سێرڤەری خۆت (On-premise)" },
    standard: false,
    custom: { en: "Yearly billing only", ar: "بالفوترة السنوية فقط", ckb: "تەنها بە پارەدانی ساڵانە" },
  },
  {
    label: { en: "Custom modules", ar: "وحدات مخصّصة", ckb: "مۆدیوڵی تایبەت" },
    standard: false,
    custom: { en: "On Odoo.sh or your own server", ar: "على Odoo.sh أو خادمك الخاص", ckb: "لەسەر Odoo.sh یان سێرڤەری خۆت" },
  },
];

/** Full user against light user. The price row is built from `rates` on the page. */
export const userRows: { label: T; full: T; light: T | "caps" }[] = [
  {
    // مَن with its fatha: bare, من also reads as "from".
    label: { en: "Who", ar: "مَن", ckb: "کێ" },
    full: {
      en: "Anyone who works in Odoo's back end — creating, viewing or editing documents.",
      ar: "كل من يعمل في واجهة Odoo الخلفية — ينشئ المستندات أو يطّلع عليها أو يعدّلها.",
      ckb: "هەر کەسێک لە بەشی ناوەوەی Odoo کار بکات — بەڵگەنامە دروست بکات، ببینێت یان دەستکاری بکات.",
    },
    light: {
      en: "An account marked Light User, or an employee record with no user account.",
      ar: "حساب مُعلَّم كمستخدم خفيف، أو سجلّ موظف بلا حساب مستخدم.",
      ckb: "هەژمارێک کە وەک لایت یوزەر دیاری کراوە، یان تۆماری کارمەندێک بێ هەژماری بەکارهێنەر.",
    },
  },
  {
    label: { en: "What they can do", ar: "ما يمكنهم فعله", ckb: "چی دەتوانن بکەن" },
    full: {
      en: "Everything their access rights allow, in every app of the plan.",
      ar: "كل ما تسمح به صلاحياتهم، في كل تطبيقات الخطة.",
      ckb: "هەموو ئەوەی دەسەڵاتەکانیان ڕێگەی پێدەدات، لە هەموو ئەپەکانی پلانەکەدا.",
    },
    light: "caps",
  },
  {
    label: { en: "How to get it", ar: "كيف تحصل عليه", ckb: "چۆن بەدەستی دەهێنیت" },
    full: { en: "With the plan.", ar: "مع الخطة.", ckb: "لەگەڵ پلانەکە." },
    light: lightUser.how,
  },
];

/* ---------------------------------------------------------------- hosting */

export type HostKey = "online" | "sh" | "premise";
export type HostFact = "cost" | "plans" | "modules" | "storage" | "backups" | "runBy";

export const hostFacts: Record<HostFact, T> = {
  cost: { en: "Cost", ar: "التكلفة", ckb: "تێچوو" },
  plans: { en: "Plans", ar: "الخطط", ckb: "پلانەکان" },
  modules: { en: "Custom modules", ar: "وحدات مخصّصة", ckb: "مۆدیوڵی تایبەت" },
  storage: { en: "Storage", ar: "التخزين", ckb: "شوێنی هەڵگرتن" },
  backups: { en: "Backups", ar: "النسخ الاحتياطية", ckb: "باکئەپ" },
  runBy: { en: "Servers run by", ar: "من يدير الخوادم", ckb: "کێ سێرڤەرەکان بەڕێوە دەبات" },
};

export const hosts: { key: HostKey; icon: IconName; name: T; tag: T; facts: Record<HostFact, T> }[] = [
  {
    key: "online",
    icon: "cloud",
    name: { en: "Odoo Online", ar: "Odoo Online", ckb: "Odoo Online" },
    tag: { en: "Odoo's cloud", ar: "سحابة Odoo", ckb: "هەوری Odoo" },
    facts: {
      cost: { en: "Included in the licence", ar: "مشمولة في الترخيص", ckb: "لەناو مۆڵەتەکەدایە" },
      plans: {
        en: "One App Free, Standard, Custom",
        ar: "التطبيق الواحد المجاني، القياسية، المخصّصة",
        ckb: "یەک ئەپی خۆڕایی، ستاندارد، تایبەت",
      },
      modules: { en: "No", ar: "لا", ckb: "نەخێر" },
      storage: { en: "Up to {onlineGb} GB included", ar: "حتى {onlineGb} GB مشمولة", ckb: "تا {onlineGb} GB تێدایە" },
      backups: { en: "Daily, on two continents", ar: "يومياً، في قارتين", ckb: "ڕۆژانە، لە دوو کیشوەر" },
      runBy: { en: "Odoo", ar: "Odoo", ckb: "Odoo" },
    },
  },
  {
    key: "sh",
    icon: "server",
    name: { en: "Odoo.sh", ar: "Odoo.sh", ckb: "Odoo.sh" },
    tag: { en: "Odoo's platform for custom code", ar: "منصة Odoo للشيفرة المخصّصة", ckb: "پلاتفۆرمی Odoo بۆ کۆدی تایبەت" },
    facts: {
      cost: {
        en: "From {shFrom} a month, billed yearly",
        ar: "من {shFrom} شهرياً، بفوترة سنوية",
        ckb: "کەمترین: {shFrom} لە مانگێکدا، بە پارەدانی ساڵانە",
      },
      plans: { en: "Custom", ar: "المخصّصة", ckb: "تایبەت" },
      modules: { en: "Yes", ar: "نعم", ckb: "بەڵێ" },
      storage: {
        en: "{gbYearly} per GB a month, billed yearly",
        ar: "{gbYearly} لكل GB شهرياً، بفوترة سنوية",
        ckb: "{gbYearly} بۆ هەر GB لە مانگێکدا، بە پارەدانی ساڵانە",
      },
      backups: {
        en: "On 3 servers in different places",
        ar: "على 3 خوادم في أماكن مختلفة",
        ckb: "لەسەر ٣ سێرڤەر لە شوێنی جیاواز",
      },
      runBy: {
        en: "Odoo — your own code is yours to maintain",
        ar: "Odoo — وصيانة شيفرتك الخاصة عليك",
        ckb: "Odoo — چاکسازیی کۆدی خۆت لەسەر خۆتە",
      },
    },
  },
  {
    key: "premise",
    icon: "enterprise",
    name: { en: "Your own server", ar: "خادمك الخاص", ckb: "سێرڤەری خۆت" },
    tag: { en: "On-premise", ar: "On-premise", ckb: "On-premise" },
    facts: {
      cost: { en: "Your server, at your cost", ar: "خادمك، على نفقتك", ckb: "سێرڤەری خۆت، بە تێچووی خۆت" },
      plans: { en: "Custom, billed yearly", ar: "المخصّصة، بفوترة سنوية", ckb: "تایبەت، بە پارەدانی ساڵانە" },
      modules: { en: "Yes", ar: "نعم", ckb: "بەڵێ" },
      storage: { en: "Your own disks", ar: "أقراصك الخاصة", ckb: "دیسکەکانی خۆت" },
      backups: { en: "Up to you", ar: "مسؤوليتك", ckb: "لەسەر خۆتە" },
      runBy: {
        en: "You, or your Odoo partner",
        ar: "أنت أو شريك Odoo الذي تتعامل معه",
        ckb: "خۆت، یان هاوبەشی Odooـەکەت",
      },
    },
  },
];

/* ---------------------------------------------------------------- odoo.sh */

export type ShItem = "worker" | "gb" | "dedicated" | "staging";

/*
 * "Dedicated" is مستقل in Arabic and تەرخانکراو in Kurdish throughout, never
 * مخصّص / تایبەت: those are already the Custom plan's name.
 */
export const shRows: { key: ShItem; label: T; unit: T; note: T }[] = [
  {
    key: "worker",
    label: { en: "Worker", ar: "عامل (Worker)", ckb: "وۆرکەر (Worker)" },
    unit: { en: "per worker / month", ar: "لكل عامل / شهرياً", ckb: "بۆ هەر وۆرکەرێک / مانگانە" },
    note: {
      en: "How many requests Odoo can handle at once. {sharedWorkersMin}–{sharedWorkersMax} on a shared server, {dedicatedWorkersMin}–{dedicatedWorkersMax} on a dedicated one.",
      ar: "عدد الطلبات التي يعالجها Odoo في الوقت نفسه. من {sharedWorkersMin} إلى {sharedWorkersMax} على خادم مشترك، ومن {dedicatedWorkersMin} إلى {dedicatedWorkersMax} على خادم مستقل.",
      ckb: "ژمارەی ئەو داواکارییانەی Odoo لە یەک کاتدا جێبەجێیان دەکات. {sharedWorkersMin} تا {sharedWorkersMax} لەسەر سێرڤەری هاوبەش، {dedicatedWorkersMin} تا {dedicatedWorkersMax} لەسەر سێرڤەری تەرخانکراو.",
    },
  },
  {
    key: "gb",
    label: { en: "Storage", ar: "التخزين", ckb: "شوێنی هەڵگرتن" },
    unit: { en: "per GB / month", ar: "لكل GB / شهرياً", ckb: "بۆ هەر GB / مانگانە" },
    note: {
      en: "Production, staging and 3 backups together. Up to {sharedGbMax} GB shared, {dedicatedGbMax} GB dedicated.",
      ar: "بيئة الإنتاج وبيئات الاختبار و3 نسخ احتياطية معاً. حتى {sharedGbMax} GB على المشترك و{dedicatedGbMax} GB على المستقل.",
      ckb: "داتابەیسی سەرەکی، ژینگەی تاقیکردنەوە و ٣ باکئەپ پێکەوە. تا {sharedGbMax} GB لە هاوبەش، {dedicatedGbMax} GB لە تەرخانکراو.",
    },
  },
  {
    key: "dedicated",
    label: { en: "Dedicated server", ar: "خادم مستقل", ckb: "سێرڤەری تەرخانکراو" },
    unit: { en: "per month", ar: "شهرياً", ckb: "مانگانە" },
    note: {
      en: "A server for your project alone, from {dedicatedWorkersMin} workers. Its workers and storage are added on top.",
      ar: "خادم لمشروعك وحده، والحدّ الأدنى للعمّال فيه {dedicatedWorkersMin}. ويُضاف إليه سعر العمّال والتخزين.",
      ckb: "سێرڤەرێک تەنها بۆ پڕۆژەکەی تۆ، لە {dedicatedWorkersMin} وۆرکەرەوە. نرخی وۆرکەر و شوێنی هەڵگرتنەکەی دەخرێتە سەری.",
    },
  },
  {
    key: "staging",
    label: { en: "Staging environment", ar: "بيئة اختبار (Staging)", ckb: "ژینگەی تاقیکردنەوە (Staging)" },
    unit: { en: "per environ\u00ADment / month", ar: "لكل بيئة / شهرياً", ckb: "بۆ هەر ژینگەیەک / مانگانە" },
    note: {
      en: "A copy for testing changes on your real data. Up to {stagingMax}.",
      ar: "نسخة لتجربة التغييرات على بياناتك الحقيقية. حتى {stagingMax}.",
      ckb: "کۆپییەک بۆ تاقیکردنەوەی گۆڕانکاری لەسەر داتای ڕاستەقینەت. تا {stagingMax}.",
    },
  },
];

export const shIncluded: TList = {
  en: [
    "Continuous integration — every change tested and deployed",
    "GitHub integration",
    "Apps from the Odoo Apps store",
    "Shell and SSH access",
    "Online editor",
    "Monitoring, 24/7",
    "DNS and email set up for you",
    "Live replication of all data",
    "Backups on 3 servers in different places",
    "Unlimited developer accounts",
    "Unlimited development branches",
  ],
  ar: [
    "تكامل مستمر — كل تغيير يُختبر ويُنشر",
    "تكامل مع GitHub",
    "تطبيقات من متجر Odoo Apps",
    "وصول Shell وSSH",
    "محرّر عبر الإنترنت",
    "مراقبة على مدار الساعة",
    "إعداد DNS والبريد تلقائياً",
    "نسخ متماثل مباشر لكل البيانات",
    "نسخ احتياطية على 3 خوادم في أماكن مختلفة",
    "حسابات مطوّرين بلا حدود",
    "فروع تطوير بلا حدود",
  ],
  ckb: [
    "تێکەڵکردنی بەردەوام (CI) — هەموو گۆڕانکارییەک تاقی دەکرێتەوە و بڵاو دەکرێتەوە",
    "پەیوەندی لەگەڵ GitHub",
    "ئەپ لە فرۆشگای Odoo Apps",
    "دەستگەیشتنی Shell و SSH",
    "دەستکاریکەری ئۆنلاین",
    "چاودێری ٢٤/٧",
    "ڕێکخستنی DNS و ئیمەیڵ بۆت",
    "کۆپیکردنەوەی ڕاستەوخۆی هەموو داتاکان",
    "باکئەپ لەسەر ٣ سێرڤەر لە شوێنی جیاواز",
    "هەژماری گەشەپێدەری بێسنوور",
    "لقی گەشەپێدانی بێسنوور",
  ],
};

/* ------------------------------------------------------------------- page */

export const pricingPage = {
  h1: { en: "What Odoo costs", ar: "كم يكلّف Odoo", ckb: "Odoo چەندی تێدەچێت" } satisfies T,
  lead: {
    en: "Odoo's own prices for Iraq — the plans, Light Users and Odoo.sh hosting — and a calculator that adds them up for your company.",
    ar: "أسعار Odoo الرسمية في العراق — الخطط والمستخدم الخفيف واستضافة Odoo.sh — وحاسبة تجمعها لشركتك.",
    ckb: "نرخە فەرمییەکانی Odoo بۆ عێراق — پلانەکان، لایت یوزەر و هۆستینگی Odoo.sh — لەگەڵ ژمێرەرێک کە بۆ کۆمپانیاکەت کۆیان دەکاتەوە.",
  } satisfies T,
  /** Followed by the date in `source.checked`. */
  sourceNote: {
    en: "Odoo's prices in US dollars, as odoo.com and odoo.sh show them for Iraq. Checked on",
    ar: "أسعار Odoo بالدولار الأمريكي كما يعرضها odoo.com وodoo.sh للعراق. تاريخ التحقق:",
    ckb: "نرخەکانی Odoo بە دۆلاری ئەمریکی، وەک odoo.com و odoo.sh بۆ عێراق پیشانی دەدەن. ڕێکەوتی پشکنین:",
  } satisfies T,
  sourceFinal: {
    en: "Odoo sets these prices and can change them — the one at Odoo's checkout is final.",
    ar: "Odoo هي من يحدّد هذه الأسعار وقد تغيّرها — والسعر عند الدفع لدى Odoo هو النهائي.",
    ckb: "Odoo ئەم نرخانە دیاری دەکات و دەتوانێت بیانگۆڕێت — نرخی کاتی پارەدان لای Odoo کۆتا نرخە.",
  } satisfies T,

  plansTitle: { en: "Odoo plans", ar: "خطط Odoo", ckb: "پلانەکانی Odoo" } satisfies T,
  plansLead: {
    en: "The paid plans are priced per user, per month. Billed yearly, they cost about {save}% less.",
    ar: "تُسعَّر الخطط المدفوعة لكل مستخدم شهرياً. وبالفوترة السنوية تكلّف أقل بنحو \u2066{save}%\u2069.",
    ckb: "نرخی پلانە بە پارەکان بۆ هەر بەکارهێنەرێک و هەر مانگێکە. بە پارەدانی ساڵانە نزیکەی {save}٪ هەرزانترن.",
  } satisfies T,
  billingLegend: { en: "Billing", ar: "الفوترة", ckb: "پارەدان" } satisfies T,
  yearly: { en: "Yearly", ar: "سنوية", ckb: "ساڵانە" } satisfies T,
  monthly: { en: "Monthly", ar: "شهرية", ckb: "مانگانە" } satisfies T,
  yearlyBadge: { en: "−{save}%", ar: "−{save}%", ckb: "−{save}٪" } satisfies T,
  perUserMonth: { en: "per user / month", ar: "لكل مستخدم / شهرياً", ckb: "بۆ هەر بەکارهێنەرێک / مانگانە" } satisfies T,
  perLightUserMonth: {
    en: "per light user / month",
    ar: "لكل مستخدم خفيف / شهرياً",
    ckb: "بۆ هەر لایت یوزەرێک / مانگانە",
  } satisfies T,
  billedYearly: { en: "billed yearly", ar: "بفوترة سنوية", ckb: "بە پارەدانی ساڵانە" } satisfies T,
  billedMonthly: { en: "billed monthly", ar: "بفوترة شهرية", ckb: "بە پارەدانی مانگانە" } satisfies T,
  regular: { en: "Regular price", ar: "السعر العادي", ckb: "نرخی ئاسایی" } satisfies T,
  unlimited: { en: "unlimited users", ar: "لعدد غير محدود من المستخدمين", ckb: "بۆ بەکارهێنەری بێسنوور" } satisfies T,
  ask: { en: "Ask us about it", ar: "اسألنا عن التفاصيل", ckb: "پرسیارمان لێ بکە" } satisfies T,
  estimate: { en: "Estimate your cost", ar: "قدّر تكلفتك", ckb: "تێچووەکەت بخەمڵێنە" } satisfies T,
  noteDiscount: {
    en: "The lower price is Odoo's discount for the first {months} months, on the users ordered at the start. After that, the regular price applies.",
    ar: "السعر الأقل خصمٌ من Odoo لأول {months} شهراً على المستخدمين المطلوبين في البداية، ثم يُطبَّق السعر العادي.",
    ckb: "نرخە کەمترەکە داشکاندنی Odooیە بۆ {months} مانگی یەکەم، لەسەر ئەو بەکارهێنەرانەی لە سەرەتاوە داوا دەکرێن. دواتر نرخی ئاسایی دەبێت.",
  } satisfies T,
  noteSh: {
    en: "Odoo.sh hosting is paid on top of the licence — its prices are further down.",
    ar: "استضافة Odoo.sh تُدفع إضافةً إلى الترخيص — أسعارها في الأسفل.",
    ckb: "پارەی هۆستینگی Odoo.sh جیا لە مۆڵەتەکە دەدرێت — نرخەکانی لە خوارەوەن.",
  } satisfies T,
  // odoo.com: "All our plans include unlimited support, hosting and
  // maintenance", and upgrades "are also included in all our plans".
  noteIncluded: {
    en: "Every plan includes unlimited support, hosting on Odoo Online, maintenance and upgrades.",
    ar: "تشمل كل الخطط دعماً غير محدود، والاستضافة على Odoo Online، والصيانة والترقيات.",
    ckb: "هەموو پلانێک پشتگیریی بێسنوور، هۆستینگ لەسەر Odoo Online، چاکسازی و نوێکردنەوەی وەشان لەخۆ دەگرێت.",
  } satisfies T,

  diffTitle: { en: "The differences", ar: "الفروقات", ckb: "جیاوازییەکان" } satisfies T,
  diffLead: {
    en: "Which plan, which kind of user, and where Odoo runs — side by side.",
    ar: "أي خطة، وأي نوع من المستخدمين، وأين يعمل Odoo — جنباً إلى جنب.",
    ckb: "کام پلان، کام جۆری بەکارهێنەر، و Odoo لە کوێ کار دەکات — لە تەنیشت یەکترەوە.",
  } satisfies T,
  planDiffTitle: { en: "Standard or Custom", ar: "القياسية أم المخصّصة", ckb: "ستاندارد یان تایبەت" } satisfies T,
  planDiffLead: {
    en: "Custom is for companies that run several companies in one database, or that need to change how Odoo works — with Studio, agentic AI, their own modules or the API.",
    ar: "المخصّصة للشركات التي تدير عدة شركات في قاعدة بيانات واحدة، أو تحتاج إلى تغيير طريقة عمل Odoo — عبر Studio أو الذكاء الاصطناعي الوكيل أو وحداتها الخاصة أو واجهة API.",
    // U+200F after a comma between two Latin words keeps them in separate
    // runs, so the comma and the ی stay with the right word.
    ckb: "تایبەت بۆ ئەو کۆمپانیایانەیە کە چەند کۆمپانیایەک لە یەک داتابەیسدا بەڕێوە دەبەن، یان پێویستیان بە گۆڕینی شێوازی کارکردنی Odoo هەیە — بە Studio،\u200F AIی بریکار، مۆدیوڵی خۆیان یان API.",
  } satisfies T,
  colFeature: { en: "What you get", ar: "ما تحصل عليه", ckb: "ئەوەی وەریدەگریت" } satisfies T,
  priceYearly: { en: "Price, billed yearly", ar: "السعر بفوترة سنوية", ckb: "نرخ بە پارەدانی ساڵانە" } satisfies T,
  priceMonthly: { en: "Price, billed monthly", ar: "السعر بفوترة شهرية", ckb: "نرخ بە پارەدانی مانگانە" } satisfies T,
  included: { en: "Included", ar: "مشمول", ckb: "تێدایە" } satisfies T,
  notIncluded: { en: "Not included", ar: "غير مشمول", ckb: "تێدا نییە" } satisfies T,

  userDiffTitle: {
    en: "Full user or light user",
    ar: "مستخدم كامل أم مستخدم خفيف",
    ckb: "بەکارهێنەری تەواو یان لایت یوزەر",
  } satisfies T,
  userDiffLead: {
    en: "You pay for each person who works in Odoo. Many need only a small part of it — they can be light users, at a fraction of the price.",
    ar: "تدفع عن كل شخص يعمل على Odoo. وكثيرون لا يحتاجون إلا جزءاً صغيراً منه — فيمكن أن يكونوا مستخدمين خفيفين بجزء من السعر.",
    ckb: "پارە بۆ هەر کەسێک دەدەیت کە لە Odoo کار دەکات. زۆر کەس تەنها بەشێکی بچووکی پێویستە — دەکرێت لایت یوزەر بن، بە بەشێک لە نرخەکە.",
  } satisfies T,
  fullUser: { en: "Full user", ar: "مستخدم كامل", ckb: "بەکارهێنەری تەواو" } satisfies T,
  priceLabel: { en: "Price", ar: "السعر", ckb: "نرخ" } satisfies T,
  fullPrice: {
    en: "{standard} on Standard or {custom} on Custom, per month, billed yearly — then {standardLater} and {customLater} after the first {months} months",
    ar: "{standard} في القياسية أو {custom} في المخصّصة، شهرياً، بفوترة سنوية — ثم {standardLater} و{customLater} بعد أول {months} شهراً",
    ckb: "{standard} لە ستاندارد یان {custom} لە تایبەت، مانگانە، بە پارەدانی ساڵانە — دوای {months} مانگی یەکەم {standardLater} و {customLater}",
  } satisfies T,
  /** Under a discounted price in the comparison table. */
  thenRegular: {
    en: "then {price} after {months} months",
    ar: "ثم {price} بعد {months} شهراً",
    ckb: "دوای {months} مانگ {price}",
  } satisfies T,
  lightPrice: {
    en: "{lightPrice} per month, billed yearly or monthly",
    ar: "{lightPrice} شهرياً، بالفوترة السنوية أو الشهرية",
    ckb: "{lightPrice} مانگانە، بە پارەدانی ساڵانە یان مانگانە",
  } satisfies T,
  freeUsers: {
    en: "Not counted at all: customers and suppliers who use the portal, and visitors who order on your website.",
    ar: "العملاء والموردون الذين يستخدمون البوابة، وزوّار موقعك الذين يطلبون منه، لا يُحتسبون أصلاً.",
    ckb: "هەرگیز ناژمێردرێن: ئەو کڕیار و دابینکەرانەی پۆرتاڵ بەکاردەهێنن، و ئەو سەردانکەرانەی لە ماڵپەڕەکەتەوە داوا دەکەن.",
  } satisfies T,

  hostTitle: { en: "Where Odoo runs", ar: "أين يعمل Odoo", ckb: "Odoo لە کوێ کار دەکات" } satisfies T,
  hostLead: {
    en: "It is the same software in all three places — only the hosting differs. You can move later: your database is yours to download.",
    ar: "إنه البرنامج نفسه في الأماكن الثلاثة — الاستضافة وحدها تختلف. ويمكنك الانتقال لاحقاً: قاعدة بياناتك ملكك وتنزّلها متى شئت.",
    ckb: "لە هەر سێ شوێنەکەدا هەمان نەرمەکاڵایە — تەنها هۆستینگەکە جیاوازە. دواتر دەتوانیت بگوازیتەوە: داتابەیسەکەت هی خۆتە و دەتوانیت دایبگریت.",
  } satisfies T,
  shTitle: { en: "Odoo.sh prices", ar: "أسعار Odoo.sh", ckb: "نرخەکانی Odoo.sh" } satisfies T,
  shLead: {
    en: "Odoo.sh comes with the Custom plan and is paid on top of its licence. You choose the size of the server; the price follows from it.",
    ar: "يأتي Odoo.sh مع الخطة المخصّصة ويُدفع إضافةً إلى ترخيصها. أنت تختار حجم الخادم، والسعر يتبعه.",
    ckb: "Odoo.sh لەگەڵ پلانی تایبەت دێت و جیا لە مۆڵەتەکەی پارەی دەدرێت. قەبارەی سێرڤەرەکە خۆت هەڵدەبژێریت؛ نرخەکەش بەدوایدا دێت.",
  } satisfies T,
  colItem: { en: "Item", ar: "البند", ckb: "بڕگە" } satisfies T,
  colYearly: { en: "Yearly billing", ar: "فوترة سنوية", ckb: "پارەدانی ساڵانە" } satisfies T,
  colMonthly: { en: "Monthly billing", ar: "فوترة شهرية", ckb: "پارەدانی مانگانە" } satisfies T,
  shMin: {
    en: "Smallest setup: {smallWorkers} worker and {smallGb} GB, shared",
    ar: "أصغر إعداد — العمّال: {smallWorkers}، التخزين: {smallGb} GB، مشترك",
    ckb: "بچووکترین ڕێکخستن: {smallWorkers} وۆرکەر و {smallGb} GB، هاوبەش",
  } satisfies T,
  perMonth: { en: "a month", ar: "شهرياً", ckb: "لە مانگێکدا" } satisfies T,
  shAdvice: {
    en: "Odoo's advice: one more worker for every {usersPerWorker} back-end users and for every {visitorsPerWorker} website visitors a day, and {gbPerUser} GB of storage per user to start.",
    ar: "نصيحة Odoo: عامل (Worker) إضافي لكل {usersPerWorker} مستخدماً في الواجهة الخلفية ولكل {visitorsPerWorker} زائر للموقع يومياً، و{gbPerUser} GB من التخزين لكل مستخدم في البداية.",
    ckb: "ئامۆژگاریی Odoo: وۆرکەرێکی زیاتر بۆ هەر {usersPerWorker} بەکارهێنەری بەشی ناوەوە و بۆ هەر {visitorsPerWorker} سەردانکەری ماڵپەڕ لە ڕۆژێکدا، و {gbPerUser} GB شوێنی هەڵگرتن بۆ هەر بەکارهێنەرێک بۆ دەستپێکردن.",
  } satisfies T,
  shNoLicence: {
    en: "Hosting only — the Custom plan's licence is paid as well.",
    ar: "الاستضافة فقط — ويُدفع ترخيص الخطة المخصّصة أيضاً.",
    ckb: "تەنها هۆستینگ — مۆڵەتی پلانی تایبەتیش پارەی دەدرێت.",
  } satisfies T,
  shIncludedTitle: {
    en: "Always included on Odoo.sh",
    ar: "مشمول دائماً في Odoo.sh",
    ckb: "هەمیشە لە Odoo.sh دا هەیە",
  } satisfies T,

  calcTitle: { en: "Estimate your cost", ar: "قدّر تكلفتك", ckb: "تێچووەکەت بخەمڵێنە" } satisfies T,
  calcLead: {
    en: "Put in your own numbers. The estimate uses Odoo's prices above and changes as you type.",
    ar: "أدخل أرقامك. يعتمد التقدير على أسعار Odoo أعلاه ويتغيّر أثناء الكتابة.",
    ckb: "ژمارەکانی خۆت بنووسە. خەمڵاندنەکە نرخەکانی Odooی سەرەوە بەکاردەهێنێت و لەگەڵ نووسینەکەت دەگۆڕێت.",
  } satisfies T,

  faqTitle: { en: "Questions about the prices", ar: "أسئلة عن الأسعار", ckb: "پرسیار دەربارەی نرخەکان" } satisfies T,

  ctaTitle: {
    en: "Want a clear quote for your company?",
    ar: "هل تريد عرض سعر واضحاً لشركتك؟",
    ckb: "نرخێکی ڕوون بۆ کۆمپانیاکەت دەوێت؟",
  } satisfies T,
  ctaBody: {
    en: "Tell us how many people will use Odoo and what it has to do. We will tell you which plan fits and quote the work.",
    ar: "أخبرنا كم شخصاً سيستخدم Odoo وما الذي يجب أن يفعله. سنخبرك بالخطة المناسبة ونقدّم لك عرض سعر للعمل.",
    ckb: "پێمان بڵێ چەند کەس Odoo بەکاردەهێنن و دەبێت چی بکات. پێت دەڵێین کام پلان گونجاوە و نرخی کارەکەت بۆ دیاری دەکەین.",
  } satisfies T,
  ctaTopic: { en: "Odoo pricing", ar: "أسعار Odoo", ckb: "نرخەکانی Odoo" } satisfies T,
};

/* ------------------------------------------------------------- calculator */

/**
 * Everything the calculator says. The page hands it only the visitor's
 * language with the {figures} already written in (see `pick` in lib/i18n);
 * the tokens left — {workers}, {storage}, {total} and the message's — are the
 * calculator's own, filled in as the visitor types.
 */
export const calc = {
  billing: { en: "Billing", ar: "الفوترة", ckb: "پارەدان" },
  yearly: { en: "Yearly", ar: "سنوية", ckb: "ساڵانە" },
  monthly: { en: "Monthly", ar: "شهرية", ckb: "مانگانە" },
  yearlyBadge: { en: "−{save}%", ar: "−{save}%", ckb: "−{save}٪" },
  billedYearly: { en: "billed yearly", ar: "بفوترة سنوية", ckb: "بە پارەدانی ساڵانە" },
  billedMonthly: { en: "billed monthly", ar: "بفوترة شهرية", ckb: "بە پارەدانی مانگانە" },
  plan: { en: "Plan", ar: "الخطة", ckb: "پلان" },
  perUser: {
    en: "per user / month",
    ar: "لكل مستخدم / شهرياً",
    // No-break spaces around the slash: on a narrow phone the Kurdish key
    // would otherwise leave مانگانە alone on a line.
    ckb: "بۆ هەر بەکارهێنەرێک\u00A0/\u00A0مانگانە",
  },
  users: { en: "Users", ar: "المستخدمون", ckb: "بەکارهێنەران" },
  usersHint: {
    en: "Everyone who works in Odoo's back end, not counting light users.",
    ar: "كل من يعمل في واجهة Odoo الخلفية، من غير المستخدمين الخفيفين.",
    ckb: "هەموو ئەوانەی لە بەشی ناوەوەی Odoo کار دەکەن، بێ لایت یوزەرەکان.",
  },
  lightUsers: { en: "Light users", ar: "المستخدمون الخفيفون", ckb: "لایت یوزەرەکان" },
  lightHint: {
    en: "People who only use time off, expenses, Point of Sale, barcode or the shop floor.",
    ar: "من يستخدمون الإجازات أو المصروفات أو نقطة البيع أو الباركود أو أرض المصنع فقط.",
    ckb: "ئەوانەی تەنها پشوو، خەرجی، خاڵی فرۆشتن، بارکۆد یان شوێنی بەرهەمهێنان بەکاردەهێنن.",
  },
  hosting: { en: "Hosting", ar: "الاستضافة", ckb: "هۆستینگ" },
  premise: { en: "Your own server", ar: "خادمك الخاص", ckb: "سێرڤەری خۆت" },
  included: { en: "included", ar: "مشمولة", ckb: "تێدایە" },
  standardHosting: {
    en: "Odoo.sh and your own server come with the Custom plan — choosing one switches the plan to Custom.",
    ar: "يأتي Odoo.sh وخادمك الخاص مع الخطة المخصّصة — واختيار أحدهما يحوّل الخطة إلى المخصّصة.",
    ckb: "Odoo.sh و سێرڤەری خۆت لەگەڵ پلانی تایبەت دێن — هەڵبژاردنی یەکێکیان پلانەکە دەکات بە تایبەت.",
  },
  premiseYearly: {
    en: "Your own server needs yearly billing — choosing it switches billing to yearly.",
    ar: "خادمك الخاص يتطلب فوترة سنوية — واختياره يحوّل الفوترة إلى سنوية.",
    ckb: "سێرڤەری خۆت پارەدانی ساڵانەی پێویستە — هەڵبژاردنی پارەدانەکە دەکات بە ساڵانە.",
  },
  server: { en: "Server", ar: "الخادم", ckb: "سێرڤەر" },
  shared: { en: "Shared", ar: "مشترك", ckb: "هاوبەش" },
  dedicated: { en: "Dedicated", ar: "مستقل", ckb: "تەرخانکراو" },
  workers: { en: "Workers", ar: "العمّال (Workers)", ckb: "وۆرکەر (Workers)" },
  storage: { en: "Storage, GB", ar: "التخزين، GB", ckb: "شوێنی هەڵگرتن، GB" },
  staging: { en: "Staging environments", ar: "بيئات الاختبار", ckb: "ژینگەی تاقیکردنەوە" },
  visitors: { en: "Website visitors a day", ar: "زوّار الموقع يومياً", ckb: "سەردانکەری ماڵپەڕ لە ڕۆژێکدا" },
  advice: {
    en: "Odoo's advice for your back-end users (light users not counted) — workers: {workers}, storage: {storage} GB.",
    ar: "نصيحة Odoo لمستخدمي الواجهة الخلفية (من غير المستخدمين الخفيفين) — العمّال (Workers): {workers}، التخزين: {storage} GB.",
    ckb: "ئامۆژگاریی Odoo بۆ بەکارهێنەرانی بەشی ناوەوە (لایت یوزەرەکان ناژمێردرێن) — وۆرکەر: {workers}، شوێنی هەڵگرتن: {storage} GB.",
  },
  useAdvice: { en: "Use Odoo's advice", ar: "استخدم نصيحة Odoo", ckb: "ئامۆژگارییەکەی Odoo بەکاربهێنە" },
  sharedWorkersLimit: {
    en: "A shared server takes at most {sharedWorkersMax} workers — choose Dedicated for more.",
    ar: "يأخذ الخادم المشترك {sharedWorkersMax} عاملاً (Worker) كحدّ أقصى — اختر الخادم المستقل للمزيد.",
    ckb: "سێرڤەری هاوبەش زۆرترین {sharedWorkersMax} وۆرکەر وەردەگرێت — بۆ زیاتر، تەرخانکراو هەڵبژێرە.",
  },
  dedicatedWorkersMin: {
    en: "A dedicated server starts at {dedicatedWorkersMin} workers.",
    ar: "يبدأ الخادم المستقل من {dedicatedWorkersMin} عمّال (Workers).",
    ckb: "سێرڤەری تەرخانکراو لە {dedicatedWorkersMin} وۆرکەرەوە دەست پێدەکات.",
  },
  dedicatedWorkersMax: {
    en: "A dedicated server takes at most {dedicatedWorkersMax} workers.",
    ar: "يأخذ الخادم المستقل {dedicatedWorkersMax} عاملاً (Worker) كحدّ أقصى.",
    ckb: "سێرڤەری تەرخانکراو زۆرترین {dedicatedWorkersMax} وۆرکەر وەردەگرێت.",
  },
  sharedGbLimit: {
    en: "A shared server holds at most {sharedGbMax} GB — choose Dedicated for more.",
    ar: "يتّسع الخادم المشترك لـ {sharedGbMax} GB كحدّ أقصى — اختر الخادم المستقل للمزيد.",
    ckb: "سێرڤەری هاوبەش زۆرترین {sharedGbMax} GB هەڵدەگرێت — بۆ زیاتر، تەرخانکراو هەڵبژێرە.",
  },
  dedicatedGbLimit: {
    en: "A dedicated server holds at most {dedicatedGbMax} GB.",
    ar: "يتّسع الخادم المستقل لـ {dedicatedGbMax} GB كحدّ أقصى.",
    ckb: "سێرڤەری تەرخانکراو زۆرترین {dedicatedGbMax} GB هەڵدەگرێت.",
  },
  stagingLimit: {
    en: "Odoo.sh allows at most {stagingMax} staging environments.",
    ar: "الحدّ الأقصى لبيئات الاختبار في Odoo.sh\u200F: {stagingMax}.",
    ckb: "Odoo.sh زۆرترین {stagingMax} ژینگەی تاقیکردنەوە ڕێگە پێدەدات.",
  },
  less: { en: "Fewer", ar: "أقل", ckb: "کەمتر" },
  more: { en: "More", ar: "أكثر", ckb: "زیاتر" },
  result: { en: "Your estimate", ar: "تقديرك", ckb: "خەمڵاندنەکەت" },
  perMonth: { en: "a month", ar: "شهرياً", ckb: "لە مانگێکدا" },
  /** After the yearly figure, which is the first year's: the discount ends after it. */
  perYear: { en: "in the first year", ar: "في السنة الأولى", ckb: "لە ساڵی یەکەمدا" },
  billedOnce: { en: "billed once a year", ar: "تُدفع مرة في السنة", ckb: "ساڵی جارێک پارە دەدرێت" },
  licence: { en: "Licence", ar: "الترخيص", ckb: "مۆڵەت" },
  lightLine: { en: "Light users", ar: "المستخدمون الخفيفون", ckb: "لایت یوزەرەکان" },
  onlineLine: { en: "Hosting on Odoo Online", ar: "الاستضافة على Odoo Online", ckb: "هۆستینگ لەسەر Odoo Online" },
  shLine: { en: "Odoo.sh hosting", ar: "استضافة Odoo.sh", ckb: "هۆستینگی Odoo.sh" },
  premiseLine: { en: "Your own server", ar: "خادمك الخاص", ckb: "سێرڤەری خۆت" },
  notIncluded: { en: "not included", ar: "غير مشمول", ckb: "تێدا نییە" },
  dedicatedLine: { en: "Dedicated server", ar: "خادم مستقل", ckb: "سێرڤەری تەرخانکراو" },
  workersLine: { en: "Workers", ar: "العمّال (Workers)", ckb: "وۆرکەر" },
  storageLine: { en: "Storage", ar: "التخزين", ckb: "شوێنی هەڵگرتن" },
  stagingLine: { en: "Staging", ar: "بيئات الاختبار", ckb: "ژینگەی تاقیکردنەوە" },
  later: { en: "After the first {months} months", ar: "بعد أول {months} شهراً", ckb: "دوای {months} مانگی یەکەم" },
  notCovered: {
    en: "Not in this estimate: implementation, training, custom development and In-App Purchase credits such as SMS.",
    // «تطبيق النظام», not «التطبيق»: on this page تطبيق is an app.
    ar: "غير مشمول في هذا التقدير: تطبيق النظام والتدريب والتطوير المخصّص وأرصدة الشراء داخل Odoo (In-App Purchase) مثل الرسائل القصيرة.",
    ckb: "ئەمانە لەم خەمڵاندنەدا نین: جێبەجێکردن، ڕاهێنان، گەشەپێدانی تایبەت و کڕینی ناو ئەپ وەک SMS.",
  },
  send: { en: "Send this estimate on WhatsApp", ar: "أرسل هذا التقدير عبر واتساب", ckb: "ئەم خەمڵاندنە بە واتسئاپ بنێرە" },
  reset: { en: "Start again", ar: "ابدأ من جديد", ckb: "دووبارە دەستپێبکەرەوە" },
  /** Between the parts of a list inside a line of the message. */
  comma: { en: ", ", ar: "، ", ckb: "، " },
  message: {
    en: "Hello OdooVast, I estimated my Odoo cost on your website.\n\nPlan: {plan} ({billing})\nUsers: {users}\nLight users: {light}\nHosting: {hosting}\nEstimate: {total} a month\n\nCould you give me a quote for the implementation?",
    ar: "مرحباً OdooVast، قدّرتُ تكلفة Odoo على موقعكم.\n\nالخطة: {plan} ({billing})\nالمستخدمون: {users}\nالمستخدمون الخفيفون: {light}\nالاستضافة: {hosting}\nالتقدير: {total} شهرياً\n\nهل يمكنكم إعطائي عرض سعر لتطبيق النظام؟",
    ckb: "سڵاو OdooVast، تێچووی Odooم لە ماڵپەڕەکەتان خەمڵاند.\n\nپلان: {plan} ({billing})\nبەکارهێنەران: {users}\nلایت یوزەرەکان: {light}\nهۆستینگ: {hosting}\nخەمڵاندن: {total} لە مانگێکدا\n\nدەتوانن نرخی جێبەجێکردنم بۆ دیاری بکەن؟",
  },
  /** Read out to screen readers a moment after the visitor changes something. */
  live: {
    en: "Estimate: {total} a month.",
    ar: "التقدير: {total} شهرياً.",
    ckb: "خەمڵاندن: {total} لە مانگێکدا.",
  },
} satisfies Record<string, T>;

export type CalcKey = keyof typeof calc;

/* -------------------------------------------------------------------- faq */

export const pricingFaq: { q: T; a: TList }[] = [
  {
    q: { en: "Are these OdooVast's prices?", ar: "هل هذه أسعار OdooVast؟", ckb: "ئەمانە نرخەکانی OdooVastن؟" },
    a: {
      en: [
        "No. They are the prices Odoo publishes for its own licences and hosting in Iraq — the cost of the software itself.",
        "Our work — setting Odoo up, moving your data, training your team, building what you need and supporting you in Kurdish, Arabic and English, Saturday to Thursday — is separate. We quote it after a free consultation.",
      ],
      ar: [
        "لا. إنها الأسعار التي تنشرها Odoo لتراخيصها واستضافتها في العراق — أي كلفة البرنامج نفسه.",
        "عملنا — إعداد Odoo ونقل بياناتك وتدريب فريقك وبناء ما تحتاجه ودعمك بالكردية والعربية والإنجليزية من السبت إلى الخميس — منفصل، ونقدّم عرض سعره بعد استشارة مجانية.",
      ],
      ckb: [
        "نەخێر. ئەمانە ئەو نرخانەن کە Odoo بۆ مۆڵەت و هۆستینگی خۆی لە عێراق بڵاویان دەکاتەوە — واتە تێچووی خودی نەرمەکاڵاکە.",
        "کاری ئێمە — ڕێکخستنی Odoo، گواستنەوەی داتاکانت، ڕاهێنانی تیمەکەت، دروستکردنی ئەوەی پێویستتە و پشتگیریکردنت بە کوردی، عەرەبی و ئینگلیزی، شەممە تا پێنجشەممە — جیایە، و دوای ڕاوێژکارییەکی خۆڕایی نرخی بۆ دیاری دەکەین.",
      ],
    },
  },
  {
    q: { en: "What does the subscription include?", ar: "ماذا يشمل الاشتراك؟", ckb: "بەشداربوونەکە چی لەخۆ دەگرێت؟" },
    a: {
      en: [
        "Hosting on Odoo Online with daily backups on two continents, email integration, security and 24/7 monitoring — and every upgrade to a new version.",
        "Unlimited support from Odoo's own team by email, Monday to Friday, in English, French, Spanish or Dutch.",
        "OdooVast's own support is separate: Saturday to Thursday, in Kurdish, Arabic and English.",
      ],
      ar: [
        "الاستضافة على Odoo Online مع نسخ احتياطية يومية في قارتين، وربط البريد الإلكتروني، والحماية والمراقبة على مدار الساعة — وكل ترقية إلى إصدار جديد.",
        "دعم غير محدود من فريق Odoo نفسه بالبريد الإلكتروني، من الاثنين إلى الجمعة، بالإنجليزية أو الفرنسية أو الإسبانية أو الهولندية.",
        "أما دعم OdooVast فمنفصل: من السبت إلى الخميس، بالكردية والعربية والإنجليزية.",
      ],
      ckb: [
        "هۆستینگ لەسەر Odoo Online لەگەڵ باکئەپی ڕۆژانە لە دوو کیشوەر، پەیوەندی ئیمەیڵ، پاراستن و چاودێریی ٢٤/٧ — و هەموو بەرزکردنەوەیەک بۆ وەشانی نوێ.",
        "پشتگیریی بێسنوور لە تیمی خودی Odoo بە ئیمەیڵ، دووشەممە تا هەینی، بە ئینگلیزی، فەڕەنسی، ئیسپانی یان هۆڵەندی.",
        "پشتگیریی OdooVast خۆی جیایە: شەممە تا پێنجشەممە، بە کوردی، عەرەبی و ئینگلیزی.",
      ],
    },
  },
  {
    q: { en: "What is not included?", ar: "ما غير المشمول؟", ckb: "چی تێدا نییە؟" },
    a: {
      en: [
        "Odoo.sh hosting, if you need custom modules. Hosting on Odoo Online is included, with storage up to {onlineGb} GB.",
        "Implementation — analysis, setup, data import, training and custom development.",
        "In-App Purchase credits: SMS, contact autocomplete, lead generation, and AI scanning of vendor bills and expenses.",
        "Maintenance of custom code.",
      ],
      ar: [
        "استضافة Odoo.sh إن احتجت وحدات مخصّصة. أما الاستضافة على Odoo Online فمشمولة، مع تخزين حتى {onlineGb} GB.",
        "تطبيق النظام — التحليل والإعداد واستيراد البيانات والتدريب والتطوير المخصّص.",
        "أرصدة الشراء داخل Odoo (In-App Purchase): الرسائل القصيرة، والإكمال التلقائي لجهات الاتصال، وتوليد العملاء المحتملين، والمسح الذكي لفواتير الموردين والمصروفات.",
        "صيانة الشيفرة المخصّصة.",
      ],
      ckb: [
        "هۆستینگی Odoo.sh، ئەگەر مۆدیوڵی تایبەتت پێویست بێت. هۆستینگ لەسەر Odoo Online تێدایە، لەگەڵ شوێنی هەڵگرتن تا {onlineGb} GB.",
        "جێبەجێکردن — شیکردنەوە، ڕێکخستن، هێنانی داتا، ڕاهێنان و گەشەپێدانی تایبەت.",
        "کڕینی ناو ئەپ: SMS، تەواوکردنی خۆکاری پەیوەندییەکان، دۆزینەوەی کڕیاری ئەگەری، و خوێندنەوەی پسوولەی دابینکەر و خەرجی بە AI.",
        "چاکسازیی کۆدی تایبەت.",
      ],
    },
  },
  {
    q: { en: "Who counts as a paying user?", ar: "من يُحتسب مستخدماً مدفوعاً؟", ckb: "کێ وەک بەکارهێنەری بە پارە دەژمێردرێت؟" },
    a: {
      en: [
        "Anyone with access to Odoo's back end to create, view or edit documents — an employee who records expenses or timesheets, an outside accountant who works on your books — and any employee record that has no user account.",
        "Customers and suppliers who see their invoices on the portal, and visitors who order on your website, are free. Some of your paying users may be light users instead.",
      ],
      ar: [
        "كل من يدخل إلى واجهة Odoo الخلفية لإنشاء المستندات أو الاطلاع عليها أو تعديلها — موظف يسجّل مصروفاته أو ساعات عمله، أو محاسب خارجي يعمل على حساباتك — وكل سجلّ موظف بلا حساب مستخدم.",
        "العملاء والموردون الذين يطّلعون على فواتيرهم عبر البوابة، وزوّار موقعك الذين يطلبون منه، لا يُحتسبون. وقد يكون بعض مستخدميك المدفوعين مستخدمين خفيفين بدلاً من ذلك.",
      ],
      ckb: [
        "هەر کەسێک دەستی بگات بە بەشی ناوەوەی Odoo بۆ دروستکردن، بینین یان دەستکاریکردنی بەڵگەنامە — کارمەندێک کە خەرجی یان کاتی کارەکەی تۆمار دەکات، ژمێریارێکی دەرەکی کە لەسەر حسابەکانت کار دەکات — و هەر تۆمارێکی کارمەند کە هەژماری بەکارهێنەری نییە.",
        "ئەو کڕیار و دابینکەرانەی پسوولەکانیان لە پۆرتاڵدا دەبینن، و ئەو سەردانکەرانەی لە ماڵپەڕەکەتەوە داوا دەکەن، خۆڕایین. لەوانەیە هەندێک لە بەکارهێنەرە بە پارەکانت بتوانن لەبری ئەوە لایت یوزەر بن.",
      ],
    },
  },
  {
    q: {
      en: "How do I get Light User licences?",
      ar: "كيف أحصل على تراخيص المستخدم الخفيف؟",
      ckb: "چۆن مۆڵەتی لایت یوزەر وەربگرم؟",
    },
    a: {
      en: [
        "Through a meeting with an Odoo advisor, who reviews your needs and gives you a quote. Odoo lists the price as {lightPrice} a month per light user.",
        "We can help you work out which of your people fit the light-user list.",
      ],
      ar: [
        "عبر اجتماع مع مستشار من Odoo يراجع احتياجاتك ويعطيك عرض سعر. وتذكر Odoo أن السعر {lightPrice} شهرياً لكل مستخدم خفيف.",
        "ويمكننا مساعدتك في تحديد من يناسب قائمة المستخدم الخفيف من فريقك.",
      ],
      ckb: [
        "لە ڕێگەی کۆبوونەوەیەک لەگەڵ ڕاوێژکارێکی Odoo، کە پێداویستییەکانت هەڵدەسەنگێنێت و نرخت پێدەدات. Odoo نرخەکەی بە {lightPrice} لە مانگێکدا بۆ هەر لایت یوزەرێک دیاری کردووە.",
        "دەتوانین یارمەتیت بدەین بزانیت کام لە کارمەندەکانت لە لیستی لایت یوزەردا جێیان دەبێتەوە.",
      ],
    },
  },
  {
    q: { en: "Why is the first year cheaper?", ar: "لماذا السنة الأولى أرخص؟", ckb: "بۆچی ساڵی یەکەم هەرزانترە؟" },
    a: {
      en: [
        "The lower price is Odoo's discount for the first {months} months, on the users you order at the start. After that the regular price applies — the calculator shows both.",
      ],
      ar: [
        "السعر الأقل خصمٌ من Odoo لأول {months} شهراً، على المستخدمين الذين تطلبهم في البداية. بعدها يُطبَّق السعر العادي — والحاسبة تعرض الاثنين.",
      ],
      ckb: [
        "نرخە کەمترەکە داشکاندنی Odooیە بۆ {months} مانگی یەکەم، لەسەر ئەو بەکارهێنەرانەی لە سەرەتاوە داوایان دەکەیت. دواتر نرخی ئاسایی دەبێت — ژمێرەرەکە هەردووکیان پیشان دەدات.",
      ],
    },
  },
  {
    q: { en: "Do I need Odoo.sh?", ar: "هل أحتاج إلى Odoo.sh؟", ckb: "پێویستم بە Odoo.sh هەیە؟" },
    a: {
      en: [
        "Only if you need custom modules — code written for your company, or apps from outside Odoo's own set. Odoo Online hosts databases without custom modules.",
        "The Custom plan does not mean Odoo.sh by itself: on the Custom plan you can stay on Odoo Online at no extra cost.",
      ],
      ar: [
        "فقط إن احتجت وحدات مخصّصة — شيفرة كُتبت لشركتك، أو تطبيقات من خارج مجموعة Odoo نفسها. فـ Odoo Online يستضيف قواعد بيانات بلا وحدات مخصّصة.",
        "والخطة المخصّصة لا تعني Odoo.sh بالضرورة: يمكنك مع الخطة المخصّصة البقاء على Odoo Online دون كلفة إضافية.",
      ],
      ckb: [
        "تەنها ئەگەر مۆدیوڵی تایبەتت پێویست بێت — کۆدێک کە بۆ کۆمپانیاکەت نووسراوە، یان ئەپێک لە دەرەوەی کۆمەڵەی خودی Odoo.\u200F Odoo Online داتابەیس بێ مۆدیوڵی تایبەت هۆست دەکات.",
        "پلانی تایبەت بە تەنها مانای Odoo.sh نییە: لەگەڵ پلانی تایبەت دەتوانیت لەسەر Odoo Online بمێنیتەوە بێ تێچووی زیاتر.",
      ],
    },
  },
  {
    q: {
      en: "Do payment providers, couriers or bank feeds need the Custom plan?",
      ar: "هل تحتاج بوابات الدفع أو شركات الشحن أو ربط البنك إلى الخطة المخصّصة؟",
      ckb: "ئایا دەروازەی پارەدان، کۆمپانیای گەیاندن یان پەیوەندی بانک پێویستیان بە پلانی تایبەتە؟",
    },
    a: {
      en: [
        "No. External API means your own outside software — an old system, a reporting tool — calling Odoo. When Odoo makes the call itself — to a payment provider, a delivery carrier, a VoIP service or your bank — it is part of the Standard plan.",
      ],
      ar: [
        "لا. واجهة API الخارجية تعني أن برنامجاً خارجياً لديك — نظاماً قديماً أو أداة تقارير — هو من يتصل بـ Odoo. أما حين يتصل Odoo بنفسه — ببوابة دفع أو شركة شحن أو خدمة اتصال VoIP أو بنكك — فذلك ضمن الخطة القياسية.",
      ],
      ckb: [
        "نەخێر. APIی دەرەکی واتە نەرمەکاڵایەکی دەرەکیی خۆت — سیستەمێکی کۆن، ئامرازێکی ڕاپۆرت — پەیوەندی بە Odoo دەکات. کاتێک خودی Odoo پەیوەندییەکە دەکات — بە دەروازەی پارەدان، کۆمپانیای گەیاندن، خزمەتگوزاریی VoIP یان بانکەکەت — ئەوە بەشێکە لە پلانی ستاندارد.",
      ],
    },
  },
  {
    q: { en: "Can I change hosting later?", ar: "هل يمكنني تغيير الاستضافة لاحقاً؟", ckb: "دەتوانم دواتر هۆستینگەکە بگۆڕم؟" },
    a: {
      en: [
        "Yes. Odoo Online, Odoo.sh and your own server run the same software; only the hosting differs.",
        "On Odoo Online you can download a backup of your database whenever you like. Moving to your own server is best done right after a new stable version of Odoo comes out.",
      ],
      ar: [
        "نعم. Odoo Online وOdoo.sh وخادمك الخاص تشغّل البرنامج نفسه، والاستضافة وحدها تختلف.",
        "على Odoo Online يمكنك تنزيل نسخة احتياطية من قاعدة بياناتك متى شئت. وأفضل وقت للانتقال إلى خادمك الخاص هو بعد صدور إصدار مستقر جديد من Odoo مباشرة.",
      ],
      ckb: [
        "بەڵێ. Odoo Online،\u200F Odoo.sh و سێرڤەری خۆت هەمان نەرمەکاڵا کار پێدەکەن؛ تەنها هۆستینگەکە جیاوازە.",
        "لەسەر Odoo Online هەر کاتێک بتەوێت دەتوانیت باکئەپی داتابەیسەکەت دابگریت. باشترین کات بۆ گواستنەوە بۆ سێرڤەری خۆت ڕاستەوخۆ دوای دەرچوونی وەشانێکی جێگیری نوێی Odooیە.",
      ],
    },
  },
  {
    q: { en: "What will implementation cost?", ar: "كم سيكلّف تطبيق النظام؟", ckb: "جێبەجێکردن چەندی تێدەچێت؟" },
    a: {
      en: [
        "It depends on the scope: how many apps, how much data to move, how many people to train, and whether anything has to be built.",
        "Tell us about your company and we will give you a clear quote after a free consultation.",
      ],
      ar: [
        "يعتمد على النطاق: عدد التطبيقات، وحجم البيانات المنقولة، وعدد من سيُدرَّبون، وما إذا كان هناك ما يجب بناؤه.",
        "أخبرنا عن شركتك وسنعطيك عرض سعر واضحاً بعد استشارة مجانية.",
      ],
      ckb: [
        "بەندە بە چوارچێوەی کارەکە: چەند ئەپ، چەند داتا دەگوازرێتەوە، چەند کەس ڕاهێنانیان پێدەکرێت، و ئایا شتێک هەیە کە دەبێت دروست بکرێت.",
        "باسی کۆمپانیاکەتمان بۆ بکە و دوای ڕاوێژکارییەکی خۆڕایی نرخێکی ڕوونت پێدەدەین.",
      ],
    },
  },
];
