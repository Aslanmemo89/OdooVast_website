import type { IconName } from "@/components/Icon";
import type { T, TList } from "@/lib/i18n";

/**
 * Service names and one-line summaries come verbatim from FACTS.md (extracted
 * from the live site). The "includes" and "suited for" lines describe what
 * Odoo does and how we deliver it — they make no claim about past clients,
 * project counts or results.
 */
export type Service = {
  slug: string;
  icon: IconName;
  /** The six shown on the home page. */
  core: boolean;
  title: T;
  summary: T;
  includes: TList;
  suitedFor: T;
};

export const services: Service[] = [
  {
    slug: "odoo-implementation",
    icon: "implementation",
    core: true,
    title: {
      en: "Odoo Implementation",
      ar: "تطبيق Odoo",
      ckb: "جێبەجێکردنی Odoo",
    },
    summary: {
      en: "End-to-end deployment of Odoo ERP tailored to your specific business workflows.",
      ar: "تطبيق كامل لنظام Odoo ERP مصمَّم على سير العمل الخاص بشركتك.",
      ckb: "جێبەجێکردنی تەواوی سیستەمی Odoo ERP بەپێی ڕێڕەوی کاری تایبەتی کۆمپانیاکەت.",
    },
    includes: {
      en: [
        "A workflow study and gap analysis before anything is configured",
        "Module selection, configuration and multi-company setup",
        "Data migration from your current system or spreadsheets",
        "Chart of accounts and tax rules set up for Iraq",
        "Team training in Kurdish, Arabic or English",
        "Go-live support and tuning after launch",
      ],
      ar: [
        "دراسة سير العمل وتحليل الفجوات قبل أي إعداد",
        "اختيار الوحدات وإعدادها وتهيئة الشركات المتعددة",
        "ترحيل البيانات من نظامك الحالي أو من جداول Excel",
        "إعداد دليل الحسابات وقواعد الضريبة بما يناسب العراق",
        "تدريب الفريق بالكردية أو العربية أو الإنجليزية",
        "دعم الانطلاق والضبط بعد التشغيل",
      ],
      ckb: [
        "لێکۆڵینەوەی ڕێڕەوی کار و دەستنیشانکردنی کەلێنەکان پێش هەر ڕێکخستنێک",
        "هەڵبژاردنی مۆدیوڵەکان، ڕێکخستن و دانانی چەند کۆمپانیایەک",
        "گواستنەوەی داتا لە سیستەمی ئێستا یان لە خشتەکانی Excel",
        "دانانی هێڵی هەژمارەکان و یاساکانی باج بەپێی عێراق",
        "ڕاهێنانی تیم بە کوردی، عەرەبی یان ئینگلیزی",
        "پشتگیری ڕۆژی دەستپێک و ڕێکخستن دوای کارپێکردن",
      ],
    },
    suitedFor: {
      en: "Companies moving off spreadsheets or a legacy system onto one ERP.",
      ar: "الشركات التي تنتقل من جداول Excel أو من نظام قديم إلى نظام ERP واحد.",
      ckb: "ئەو کۆمپانیایانەی لە Excel یان سیستەمی کۆنەوە دەچنە سەر یەک ERP.",
    },
  },
  {
    slug: "custom-module-development",
    icon: "code",
    core: true,
    title: {
      en: "Custom Module Development",
      ar: "تطوير وحدات مخصّصة",
      ckb: "گەشەپێدانی مۆدیوڵی تایبەت",
    },
    summary: {
      en: "Tailor-made solutions for unique business requirements.",
      ar: "حلول مصمَّمة خصيصاً لمتطلبات عملك الفريدة.",
      ckb: "چارەسەری تایبەت بۆ پێداویستییە تایبەتەکانی کارەکەت.",
    },
    includes: {
      en: [
        "New models, fields and screens where standard Odoo stops short",
        "Approval flows and automated rules that match how you actually work",
        "Custom reports, PDF layouts and dashboards",
        "Odoo Studio work handed over so your team can adjust it later",
        "Clean, upgradable code — no core files edited",
        "The source stays yours",
      ],
      ar: [
        "نماذج وحقول وشاشات جديدة حيث تتوقف إمكانات Odoo القياسية",
        "مسارات موافقات وقواعد آلية تطابق طريقة عملكم فعلياً",
        "تقارير مخصّصة وقوالب PDF ولوحات متابعة",
        "أعمال Odoo Studio تُسلَّم لفريقكم ليعدّلها لاحقاً",
        "كود نظيف قابل للترقية — دون تعديل ملفات النواة",
        "الشيفرة المصدرية تبقى ملككم",
      ],
      ckb: [
        "مۆدێل، خانە و ڕوونمای نوێ لەو شوێنانەی Odooی ستاندارد ناگات",
        "ڕێڕەوی ڕەزامەندی و یاسای ئۆتۆماتیکی گونجاو لەگەڵ شێوازی کارکردنتان",
        "ڕاپۆرتی تایبەت، شێوەی PDF و داشبۆرد",
        "کاری Odoo Studio دەدرێتە تیمەکەت بۆ ئەوەی دواتر بیگۆڕێت",
        "کۆدی پاک و بەرزکراوە — هیچ فایلێکی بنەڕەتی دەستکاری ناکرێت",
        "کۆدی سەرچاوە هی ئێوە دەمێنێتەوە",
      ],
    },
    suitedFor: {
      en: "Businesses whose process is a competitive advantage, not a compromise.",
      ar: "الشركات التي تمثّل عملياتها ميزة تنافسية لا تنازلاً.",
      ckb: "ئەو کارانەی پرۆسەکەیان خاڵی بەهێزیانە، نەک شتێکی لێبووردەیی.",
    },
  },
  {
    slug: "third-party-integrations",
    icon: "integration",
    core: true,
    title: {
      en: "Third-Party Integrations",
      ar: "التكامل مع الأنظمة الأخرى",
      ckb: "تێکەڵکردن لەگەڵ سیستەمی دەرەکی",
    },
    summary: {
      en: "Connect Odoo with your existing software ecosystem.",
      ar: "اربط Odoo بمنظومة البرمجيات التي تستخدمها بالفعل.",
      ckb: "Odoo ببەستەوە بەو نەرمەکالایانەی ئێستا بەکاریان دەهێنیت.",
    },
    includes: {
      en: [
        "Payment gateways and bank statement import",
        "Local delivery and courier services",
        "WhatsApp, SMS and email notification flows",
        "Barcode scanners, scales, label and receipt printers",
        "Existing accounting, HR or warehouse systems over REST or XML-RPC",
        "Scheduled syncs with error alerts, so a silent failure never goes unnoticed",
      ],
      ar: [
        "بوابات الدفع واستيراد كشوف الحسابات البنكية",
        "شركات التوصيل والشحن المحلية",
        "إشعارات عبر واتساب والرسائل النصية والبريد الإلكتروني",
        "قارئات الباركود والموازين وطابعات الملصقات والإيصالات",
        "أنظمة المحاسبة أو الموارد البشرية أو المخازن الحالية عبر REST أو XML-RPC",
        "مزامنة مجدولة مع تنبيهات الأخطاء، فلا يمر عطل صامت دون ملاحظة",
      ],
      ckb: [
        "دەروازەی پارەدان و هێنانی کشفی بانکی",
        "کۆمپانیاکانی گەیاندن و پۆستی ناوخۆیی",
        "ئاگادارکردنەوە بە واتسئاپ، SMS و ئیمەیڵ",
        "خوێنەری بارکۆد، تەرازوو، چاپکەری لەیبڵ و پسوولە",
        "سیستەمی ژمێریاری، ستاف یان کۆگای ئێستا بە REST یان XML-RPC",
        "هاوکاتکردنی کاتبەند لەگەڵ ئاگادارکردنەوەی هەڵە، بۆیە هیچ کێشەیەکی بێدەنگ بەسەرناچێت",
      ],
    },
    suitedFor: {
      en: "Teams re-keying the same data into two systems every day.",
      ar: "الفرق التي تُدخل البيانات نفسها في نظامين كل يوم.",
      ckb: "ئەو تیمانەی هەموو ڕۆژێک هەمان داتا دوو جار لە دوو سیستەمدا دەنووسنەوە.",
    },
  },
  {
    slug: "support-and-maintenance",
    icon: "support",
    core: true,
    title: {
      en: "Support & Maintenance",
      ar: "الدعم والصيانة",
      ckb: "پشتگیری و چاکسازی",
    },
    summary: {
      en: "Ongoing technical assistance to ensure system stability.",
      ar: "مساندة تقنية مستمرة تضمن استقرار النظام.",
      ckb: "پشتگیری تەکنیکی بەردەوام بۆ جێگیری سیستەم.",
    },
    includes: {
      en: [
        "A named contact who already knows your configuration",
        "Version upgrades tested on a copy before they touch production",
        "Automated backups with restores that are actually tested",
        "Performance tuning as your data grows",
        "New users, new branches, new reports as you expand",
        "Support in Kurdish, Arabic and English",
      ],
      ar: [
        "جهة اتصال محددة تعرف إعداداتكم مسبقاً",
        "ترقية الإصدارات تُختبر على نسخة قبل المساس بالنظام الفعلي",
        "نسخ احتياطي آلي مع اختبار فعلي لعمليات الاسترجاع",
        "تحسين الأداء مع نمو بياناتكم",
        "مستخدمون وفروع وتقارير جديدة كلما توسّعتم",
        "دعم بالكردية والعربية والإنجليزية",
      ],
      ckb: [
        "کەسێکی دیاریکراو کە پێشتر ڕێکخستنەکانتان دەزانێت",
        "بەرزکردنەوەی وەشان لەسەر کۆپییەک تاقی دەکرێتەوە پێش ئەوەی دەست لە سیستەمی ڕاستەقینە بدات",
        "باکئەپی ئۆتۆماتیکی لەگەڵ تاقیکردنەوەی ڕاستەقینەی گەڕاندنەوە",
        "باشترکردنی کارایی لەگەڵ زیادبوونی داتاکانتان",
        "بەکارهێنەری نوێ، لقی نوێ و ڕاپۆرتی نوێ لەگەڵ فراوانبوونتان",
        "پشتگیری بە کوردی، عەرەبی و ئینگلیزی",
      ],
    },
    suitedFor: {
      en: "Anyone already running Odoo who wants it to stay running.",
      ar: "كل من يشغّل Odoo بالفعل ويريد استمراره دون توقف.",
      ckb: "هەر کەسێک ئێستا Odoo بەکاردەهێنێت و دەیەوێت بەردەوام بێت.",
    },
  },
  {
    slug: "website-and-ecommerce",
    icon: "website",
    core: true,
    title: {
      en: "Website & eCommerce",
      ar: "الموقع الإلكتروني والمتجر",
      ckb: "ماڵپەڕ و فرۆشتنی ئۆنلاین",
    },
    summary: {
      en: "Build stunning websites fully integrated with your backend operations.",
      ar: "مواقع إلكترونية متميّزة مرتبطة بالكامل بعملياتك الداخلية.",
      ckb: "ماڵپەڕی جوان کە بە تەواوی بە کارە ناوخۆییەکانتەوە بەستراوە.",
    },
    includes: {
      en: [
        "An online store whose stock and prices come straight from Odoo",
        "Arabic, Kurdish and English on one site, right-to-left done properly",
        "Online orders landing as real sales orders, not as emails",
        "Customer portal for quotations, invoices and delivery status",
        "Speed and SEO handled at build time, not bolted on afterwards",
      ],
      ar: [
        "متجر إلكتروني يسحب المخزون والأسعار مباشرة من Odoo",
        "العربية والكردية والإنجليزية في موقع واحد، مع دعم صحيح للاتجاه من اليمين لليسار",
        "الطلبات الإلكترونية تصل كأوامر بيع حقيقية لا كرسائل بريد",
        "بوابة عملاء لعروض الأسعار والفواتير وحالة التسليم",
        "السرعة وتحسين محركات البحث ضمن البناء، لا إضافة لاحقة",
      ],
      ckb: [
        "فرۆشگای ئۆنلاین کە کۆگا و نرخەکانی ڕاستەوخۆ لە Odooوە دێن",
        "عەرەبی، کوردی و ئینگلیزی لە یەک ماڵپەڕدا، بە ئاراستەی ڕاست بۆ چەپی دروست",
        "داواکاری ئۆنلاین وەک فەرمانی فرۆشتنی ڕاستەقینە دێت، نەک وەک ئیمەیڵ",
        "دەروازەی کڕیار بۆ نرخاندن، پسوولە و دۆخی گەیاندن",
        "خێرایی و SEO لە کاتی دروستکردندا، نەک پاشان زیاد بکرێت",
      ],
    },
    suitedFor: {
      en: "Retailers and wholesalers who want one stock figure, not two.",
      ar: "تجار التجزئة والجملة الذين يريدون رقم مخزون واحداً لا رقمين.",
      ckb: "ئەو فرۆشیارە گەورە و بچووکانەی یەک ژمارەی کۆگایان دەوێت، نەک دوو.",
    },
  },
  {
    slug: "accounting-and-finance",
    icon: "accounting",
    core: true,
    title: {
      en: "Accounting & Finance",
      ar: "المحاسبة والمالية",
      ckb: "ژمێریاری و دارایی",
    },
    summary: {
      en: "Automate invoicing, track expenses, and generate real-time financial reports.",
      ar: "أتمتة الفوترة وتتبّع المصروفات وإصدار تقارير مالية لحظية.",
      ckb: "ئۆتۆماتیککردنی پسوولە، بەدواداچوونی خەرجی و ڕاپۆرتی دارایی خێرا.",
    },
    includes: {
      en: [
        "A chart of accounts built for how Iraqi companies actually report",
        "Multi-currency with IQD and USD side by side",
        "Customer and supplier ageing you can act on",
        "Bank and cash reconciliation",
        "Profit and loss, balance sheet and cash flow on demand",
        "Locked periods and an audit trail on every entry",
      ],
      ar: [
        "دليل حسابات مبني على طريقة التقارير الفعلية للشركات العراقية",
        "تعدّد العملات مع الدينار والدولار جنباً إلى جنب",
        "أعمار ذمم العملاء والموردين بشكل قابل للتنفيذ",
        "تسوية البنك والصندوق",
        "قائمة الدخل والميزانية العمومية والتدفق النقدي عند الطلب",
        "فترات مقفلة وسجل تدقيق لكل قيد",
      ],
      ckb: [
        "هێڵی هەژمار کە لەسەر شێوازی ڕاستەقینەی ڕاپۆرتی کۆمپانیا عێراقییەکان دروستکراوە",
        "چەند دراوێک، دیناری عێراقی و دۆلار پاڵ بە پاڵ",
        "تەمەنی قەرزی کڕیار و دابینکەر بە شێوەیەک کە کاری لەسەر بکەیت",
        "ڕێکخستنەوەی بانک و پارەی نەقد",
        "قازانج و زیان، باڵانس و جووڵەی پارە لە هەر کاتێکدا",
        "ماوەی داخراو و تۆماری پشکنین بۆ هەموو تۆمارێک",
      ],
    },
    suitedFor: {
      en: "Finance teams closing the month in a spreadsheet.",
      ar: "الفرق المالية التي تُقفل الشهر على جداول Excel.",
      ckb: "ئەو تیمە دارایانەی مانگەکە لە Excel دادەخەن.",
    },
  },
  {
    slug: "sales-management",
    icon: "sales",
    core: false,
    title: {
      en: "Sales Management",
      ar: "إدارة المبيعات",
      ckb: "بەڕێوەبردنی فرۆشتن",
    },
    summary: {
      en: "Manage quotations, sales orders, and customer relationships in one place.",
      ar: "إدارة عروض الأسعار وأوامر البيع وعلاقات العملاء في مكان واحد.",
      ckb: "بەڕێوەبردنی نرخاندن، فەرمانی فرۆشتن و پەیوەندی کڕیار لە یەک شوێندا.",
    },
    includes: {
      en: [
        "A pipeline that shows what is actually going to close",
        "Branded quotations customers can accept online",
        "Price lists per customer, per currency, per quantity",
        "Commission and target tracking per salesperson",
        "Full history on every customer, visible to whoever picks up the phone",
      ],
      ar: [
        "خط مبيعات يُظهر ما سيُغلق فعلياً",
        "عروض أسعار بهوية شركتكم يمكن للعميل قبولها إلكترونياً",
        "قوائم أسعار لكل عميل ولكل عملة ولكل كمية",
        "متابعة العمولات والأهداف لكل مندوب",
        "سجل كامل لكل عميل، متاح لمن يردّ على الهاتف",
      ],
      ckb: [
        "پایپلاینێک کە پیشانی دەدات بەڕاستی چی دەگاتە کۆتایی",
        "نرخاندنی بە ناوی کۆمپانیاکەت کە کڕیار بە ئۆنلاین قبوڵی دەکات",
        "لیستی نرخ بۆ هەر کڕیارێک، هەر دراوێک و هەر بڕێک",
        "بەدواداچوونی کۆمسیۆن و ئامانج بۆ هەر فرۆشیارێک",
        "مێژووی تەواوی هەر کڕیارێک، بەردەست بۆ هەرکەسێک تەلەفۆن هەڵدەگرێت",
      ],
    },
    suitedFor: {
      en: "Sales teams whose forecast lives in someone's head.",
      ar: "فرق المبيعات التي تعيش توقعاتها في ذهن شخص واحد.",
      ckb: "ئەو تیمانەی فرۆشتن کە پێشبینییەکانیان تەنها لە مێشکی کەسێکدایە.",
    },
  },
  {
    slug: "purchase-management",
    icon: "purchase",
    core: false,
    title: {
      en: "Purchase Management",
      ar: "إدارة المشتريات",
      ckb: "بەڕێوەبردنی کڕین",
    },
    summary: {
      en: "Automate procurement and manage vendor relationships.",
      ar: "أتمتة التوريد وإدارة العلاقات مع المورّدين.",
      ckb: "ئۆتۆماتیککردنی کڕین و بەڕێوەبردنی پەیوەندی دابینکەران.",
    },
    includes: {
      en: [
        "Reordering rules that raise the purchase order before you run out",
        "Requests for quotation compared side by side",
        "Approval limits by amount and by role",
        "Landed costs — freight, customs and clearing folded into item cost",
        "Vendor price history and lead-time performance",
      ],
      ar: [
        "قواعد إعادة الطلب تُنشئ أمر الشراء قبل نفاد المخزون",
        "طلبات عروض الأسعار تُقارَن جنباً إلى جنب",
        "حدود اعتماد حسب المبلغ وحسب الصلاحية",
        "التكاليف الإضافية — الشحن والجمارك والتخليص ضمن تكلفة الصنف",
        "سجل أسعار المورّدين وأداء مدة التوريد",
      ],
      ckb: [
        "یاسای دووبارە داواکردن کە فەرمانی کڕین دروست دەکات پێش ئەوەی کۆگا تەواو بێت",
        "داواکاری نرخاندن پاڵ بە پاڵ بەراورد دەکرێن",
        "سنووری ڕەزامەندی بەپێی بڕ و بەپێی ئەرک",
        "تێچووی زیادە — بار، گومرگ و ڕەخساندن لەناو تێچووی کاڵادا",
        "مێژووی نرخی دابینکەر و کارایی ماوەی گەیاندن",
      ],
    },
    suitedFor: {
      en: "Importers who need true landed cost, not invoice cost.",
      ar: "المستوردون الذين يحتاجون التكلفة النهائية الحقيقية لا تكلفة الفاتورة.",
      ckb: "ئەو هاوردەکارانەی تێچووی ڕاستەقینەی کۆتاییان دەوێت، نەک تێچووی پسوولە.",
    },
  },
  {
    slug: "inventory-and-warehouse",
    icon: "inventory",
    core: false,
    title: {
      en: "Inventory & Warehouse",
      ar: "المخزون والمستودعات",
      ckb: "کۆگا و بەڕێوەبردنی مەخزەن",
    },
    summary: {
      en: "Smart double-entry inventory to maximize efficiency and reduce stockouts.",
      ar: "مخزون بالقيد المزدوج يرفع الكفاءة ويقلّل نفاد الأصناف.",
      ckb: "کۆگای دوو تۆماری زیرەک بۆ زیادکردنی کارایی و کەمکردنەوەی تەواوبوونی کاڵا.",
    },
    includes: {
      en: [
        "Multiple warehouses and internal transfers between branches",
        "Barcode picking on a phone or a handheld scanner",
        "Lot and serial tracking, with expiry dates where they matter",
        "Cycle counts instead of shutting down for a full stocktake",
        "Stock valuation that agrees with the accounts, automatically",
      ],
      ar: [
        "مستودعات متعددة وتحويلات داخلية بين الفروع",
        "التجهيز بالباركود من الهاتف أو من قارئ يدوي",
        "تتبّع الدفعات والأرقام التسلسلية مع تواريخ الصلاحية عند الحاجة",
        "جرد دوري بدل إيقاف العمل لجرد شامل",
        "تقييم المخزون يطابق الحسابات تلقائياً",
      ],
      ckb: [
        "چەند کۆگایەک و گواستنەوەی ناوخۆیی لە نێوان لقەکان",
        "هەڵگرتنی کاڵا بە بارکۆد لەسەر مۆبایل یان خوێنەری دەستی",
        "بەدواداچوونی لۆت و ژمارەی زنجیرەیی، لەگەڵ بەرواری بەسەرچوون کاتێک گرنگە",
        "ژماردنی دەوری لەبری ڕاگرتنی کار بۆ ژماردنی گشتی",
        "نرخاندنی کۆگا بە شێوەی ئۆتۆماتیکی لەگەڵ هەژمارەکان دەگونجێت",
      ],
    },
    suitedFor: {
      en: "Multi-branch operations where the system and the shelf disagree.",
      ar: "العمليات متعددة الفروع حيث يختلف النظام عن الرف.",
      ckb: "ئەو کارانەی چەند لقیان هەیە و سیستەم لەگەڵ ڕەفەکە ناگونجێت.",
    },
  },
  {
    slug: "manufacturing-mrp",
    icon: "manufacturing",
    core: false,
    title: {
      en: "Manufacturing (MRP)",
      ar: "التصنيع (MRP)",
      ckb: "بەرهەمهێنان (MRP)",
    },
    summary: {
      en: "Streamline production with BOMs, work orders, and quality control.",
      ar: "تنظيم الإنتاج عبر قوائم المواد وأوامر التشغيل وضبط الجودة.",
      ckb: "ڕێکخستنی بەرهەمهێنان بە BOM، فەرمانی کار و کۆنتڕۆڵی جۆری.",
    },
    includes: {
      en: [
        "Multi-level bills of materials with routings and work centres",
        "Work orders on a tablet at the machine",
        "Real cost per manufacturing order — material, labour and overhead",
        "Quality checks at the points where things actually go wrong",
        "Scrap, rework and by-product handling",
        "Maintenance schedules tied to the machines that hold up production",
      ],
      ar: [
        "قوائم مواد متعددة المستويات مع مسارات ومراكز عمل",
        "أوامر التشغيل على جهاز لوحي عند الماكينة",
        "التكلفة الحقيقية لكل أمر تصنيع — مواد وأجور وتكاليف غير مباشرة",
        "فحوص جودة عند النقاط التي تحدث فيها الأخطاء فعلاً",
        "معالجة الهالك وإعادة التشغيل والمنتجات الثانوية",
        "جداول صيانة مرتبطة بالماكينات التي تعطّل الإنتاج",
      ],
      ckb: [
        "لیستی مادەی چەند ئاستی لەگەڵ ڕێڕەو و ناوەندی کار",
        "فەرمانی کار لەسەر تابلێت لەلای ئامێرەکە",
        "تێچووی ڕاستەقینەی هەر فەرمانێکی بەرهەمهێنان — مادە، کرێی کار و تێچووی ناڕاستەوخۆ",
        "پشکنینی جۆری لەو خاڵانەی بەڕاستی هەڵە تێدا ڕوودەدات",
        "مامەڵەکردن لەگەڵ فیڕۆ، دووبارە کارکردن و بەرهەمی لاوەکی",
        "خشتەی چاکسازی بەستراو بەو ئامێرانەی بەرهەمهێنان ڕادەگرن",
      ],
    },
    suitedFor: {
      en: "Factories that know their sales price but not their true unit cost.",
      ar: "المصانع التي تعرف سعر بيعها ولا تعرف تكلفتها الحقيقية للوحدة.",
      ckb: "ئەو کارگانەی نرخی فرۆشتنیان دەزانن بەڵام تێچووی ڕاستەقینەی یەکەکە نا.",
    },
  },
  {
    slug: "point-of-sale",
    icon: "pos",
    core: false,
    title: {
      en: "Point of Sale (POS)",
      ar: "نقاط البيع (POS)",
      ckb: "خاڵی فرۆشتن (POS)",
    },
    summary: {
      en: "User-friendly POS system that works online and offline.",
      ar: "نظام نقاط بيع سهل الاستخدام يعمل متصلاً وغير متصل.",
      ckb: "سیستەمی POSی ئاسان کە بە ئینتەرنێت و بەبێ ئینتەرنێتیش کار دەکات.",
    },
    includes: {
      en: [
        "Keeps selling when the internet drops, then syncs when it returns",
        "IQD and USD at the till, with the rate you set",
        "Receipt printers, cash drawers, scales and barcode scanners",
        "One product catalogue across every branch",
        "Restaurant mode — tables, floors and kitchen printing",
        "Shift close and cash-up that a manager can trust",
      ],
      ar: [
        "يواصل البيع عند انقطاع الإنترنت ثم يزامن عند عودته",
        "الدينار والدولار على الكاشير بالسعر الذي تحدّده",
        "طابعات إيصالات وأدراج نقد وموازين وقارئات باركود",
        "كتالوج منتجات واحد لجميع الفروع",
        "وضع المطاعم — طاولات وطوابق وطباعة المطبخ",
        "إغلاق الوردية وجرد النقد بشكل يثق به المدير",
      ],
      ckb: [
        "کاتێک ئینتەرنێت دەبڕێت بەردەوام دەبێت لە فرۆشتن، پاشان هاوکات دەبێتەوە",
        "دینار و دۆلار لەسەر کاشێر، بەو نرخەی خۆت دایدەنێیت",
        "چاپکەری پسوولە، سندوقی پارە، تەرازوو و خوێنەری بارکۆد",
        "یەک کەتەلۆگی کاڵا بۆ هەموو لقەکان",
        "دۆخی چێشتخانە — مێز، نهۆم و چاپکردن لە چێشتخانە",
        "داخستنی شیفت و ژماردنی پارە بە شێوەیەک بەڕێوەبەر متمانەی پێبکات",
      ],
    },
    suitedFor: {
      en: "Shops, showrooms and restaurants, single site or twenty.",
      ar: "المحلات وصالات العرض والمطاعم، فرع واحد أو عشرون.",
      ckb: "دوکان، شوێنی نمایش و چێشتخانە، یەک لق یان بیست.",
    },
  },
];

export const coreServices = services.filter((s) => s.core);
