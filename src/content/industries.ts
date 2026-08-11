import type { IconName } from "@/components/Icon";
import type { T, TList } from "@/lib/i18n";

/**
 * The six sectors named in FACTS.md. The "challenges" lines describe problems
 * these sectors are known to have and which Odoo addresses — they are not
 * claims about specific clients or past projects.
 */
export type Industry = {
  slug: string;
  icon: IconName;
  title: T;
  summary: T;
  challenges: TList;
  /** Odoo app names stay in Latin script in every language. */
  modules: string[];
};

export const industries: Industry[] = [
  {
    slug: "retail",
    icon: "pos",
    title: { en: "Retail", ar: "تجارة التجزئة", ckb: "فرۆشتنی وردە" },
    summary: {
      en: "Unified POS and inventory for single or multi-branch operations.",
      ar: "نقاط بيع ومخزون موحّدان لفرع واحد أو لعدة فروع.",
      ckb: "POS و کۆگای یەکگرتوو بۆ یەک لق یان چەند لقێک.",
    },
    challenges: {
      en: [
        "Head office cannot see today's sales per branch until someone sends a file",
        "The till says one quantity, the shelf says another",
        "Transfers between branches are recorded on paper, or not at all",
        "Prices and promotions have to be changed branch by branch",
        "IQD and USD are reconciled by hand at the end of the day",
      ],
      ar: [
        "الإدارة لا ترى مبيعات اليوم لكل فرع حتى يرسل أحدهم ملفاً",
        "الكاشير يقول كمية والرف يقول كمية أخرى",
        "التحويلات بين الفروع تُسجَّل على الورق، أو لا تُسجَّل",
        "الأسعار والعروض تُغيَّر فرعاً بفرع",
        "تسوية الدينار والدولار تتم يدوياً في نهاية اليوم",
      ],
      ckb: [
        "بەڕێوەبەرایەتی ناتوانێت فرۆشتنی ئەمڕۆی هەر لقێک ببینێت هەتا کەسێک فایلێک نەنێرێت",
        "کاشێر بڕێک دەڵێت و ڕەفەکە بڕێکی تر",
        "گواستنەوە لە نێوان لقەکان لەسەر کاغەز تۆمار دەکرێت، یان هەر تۆمار ناکرێت",
        "نرخ و داشکاندن دەبێت لق بە لق بگۆڕدرێن",
        "دینار و دۆلار بە دەست لە کۆتایی ڕۆژدا ڕێک دەخرێنەوە",
      ],
    },
    modules: ["POS", "Inventory", "Sales", "Accounting"],
  },
  {
    slug: "manufacturing",
    icon: "manufacturing",
    title: { en: "Manufacturing", ar: "التصنيع", ckb: "بەرهەمهێنان" },
    summary: {
      en: "Complete control of the production floor, from raw material to finished goods.",
      ar: "سيطرة كاملة على أرض المصنع، من المادة الخام إلى المنتج النهائي.",
      ckb: "کۆنتڕۆڵی تەواوی شوێنی بەرهەمهێنان، لە مادەی خاوەوە تا کاڵای تەواو.",
    },
    challenges: {
      en: [
        "Nobody can say what a finished unit really costs to make",
        "Production stops because a raw material ran out unnoticed",
        "Work-in-progress is invisible between the store and the warehouse",
        "Scrap and rework are absorbed silently instead of being measured",
        "Machine breakdowns are handled after they stop the line, never before",
      ],
      ar: [
        "لا أحد يستطيع تحديد التكلفة الحقيقية لوحدة منتَجة",
        "يتوقف الإنتاج لأن مادة خام نفدت دون أن يلاحظ أحد",
        "الإنتاج تحت التشغيل غير مرئي بين المخزن والمستودع",
        "الهالك وإعادة التشغيل يُستوعبان بصمت بدل قياسهما",
        "أعطال الماكينات تُعالَج بعد توقف الخط لا قبله",
      ],
      ckb: [
        "کەس ناتوانێت بڵێت تێچووی ڕاستەقینەی یەک یەکەی تەواوکراو چەندە",
        "بەرهەمهێنان دەوەستێت چونکە مادەیەکی خاو بەبێ ئاگاداری تەواو بووە",
        "بەرهەمی لەژێر کاردا لە نێوان مەخزەن و کۆگادا نادیارە",
        "فیڕۆ و دووبارە کارکردن بێدەنگ دەخورێن لەبری ئەوەی بپێورێن",
        "تێکچوونی ئامێر دوای وەستانی هێڵەکە چارەسەر دەکرێت، هەرگیز پێشتر نا",
      ],
    },
    modules: ["Manufacturing", "Quality", "Maintenance", "Inventory", "Accounting"],
  },
  {
    slug: "steel-trading-distribution",
    icon: "distribution",
    title: {
      en: "Steel, Trading & Distribution",
      ar: "الحديد والتجارة والتوزيع",
      ckb: "پۆڵا، بازرگانی و دابەشکردن",
    },
    summary: {
      en: "Specialised solutions for steel manufacturing, trading and distribution.",
      ar: "حلول متخصّصة لصناعة الحديد والتجارة والتوزيع.",
      ckb: "چارەسەری تایبەت بۆ بەرهەمهێنانی پۆڵا، بازرگانی و دابەشکردن.",
    },
    challenges: {
      en: [
        "Stock is bought by tonne, sold by length, and counted in bundles",
        "The invoice cost is not the real cost once freight and customs land",
        "Cut-to-size and offcuts never make it back into stock",
        "Every large customer has its own agreed price and credit limit",
        "Deliveries are promised without checking what is actually reserved",
      ],
      ar: [
        "البضاعة تُشترى بالطن وتُباع بالطول وتُعدّ بالحزم",
        "تكلفة الفاتورة ليست التكلفة الحقيقية بعد الشحن والجمارك",
        "القصّ حسب المقاس والبواقي لا تعود إلى المخزون",
        "لكل عميل كبير سعره المتفق عليه وحدّه الائتماني",
        "تُوعَد التسليمات دون التحقق مما هو محجوز فعلاً",
      ],
      ckb: [
        "کاڵا بە تەن دەکڕدرێت، بە درێژی دەفرۆشرێت و بە دەستە دەژمێردرێت",
        "تێچووی پسوولە تێچووی ڕاستەقینە نییە دوای بار و گومرگ",
        "بڕین بەپێی پێوانە و پاشماوەکان هەرگیز ناگەڕێنەوە بۆ کۆگا",
        "هەر کڕیارێکی گەورە نرخی ڕێککەوتوو و سنووری قەرزی خۆی هەیە",
        "بەڵێنی گەیاندن دەدرێت بەبێ پشکنینی ئەوەی بەڕاستی حیجز کراوە",
      ],
    },
    modules: ["Inventory", "Purchase", "Sales", "Manufacturing", "Accounting"],
  },
  {
    slug: "fashion-apparel",
    icon: "fashion",
    title: {
      en: "Fashion & Apparel",
      ar: "الأزياء والملابس",
      ckb: "جل و بەرگ",
    },
    summary: {
      en: "Manage complex product variants — size, colour and style — without losing track.",
      ar: "إدارة المتغيرات المعقّدة للمنتج — المقاس واللون والموديل — دون فقدان التتبّع.",
      ckb: "بەڕێوەبردنی جۆراوجۆری ئاڵۆزی کاڵا — قەبارە، ڕەنگ و شێواز — بەبێ لەدەستدانی بەدواداچوون.",
    },
    challenges: {
      en: [
        "One style becomes forty SKUs the moment you add size and colour",
        "Best sellers are out of stock in the sizes that actually sell",
        "Season-end markdowns are decided without margin data",
        "Returns and exchanges break the stock figure",
        "Reordering is guesswork because nobody tracks sell-through per variant",
      ],
      ar: [
        "الموديل الواحد يصبح أربعين صنفاً بمجرد إضافة المقاس واللون",
        "الأكثر مبيعاً ينفد في المقاسات التي تُباع فعلاً",
        "تخفيضات نهاية الموسم تُقرَّر دون بيانات هامش الربح",
        "المرتجعات والاستبدالات تُفسد رقم المخزون",
        "إعادة الطلب تخمين لأن أحداً لا يتابع معدل التصريف لكل متغير",
      ],
      ckb: [
        "یەک شێواز دەبێتە چل کاڵا هەرکە قەبارە و ڕەنگی بۆ زیاد بکەیت",
        "باشترین فرۆشراوەکان لەو قەبارانەدا تەواو دەبن کە بەڕاستی دەفرۆشرێن",
        "داشکاندنی کۆتایی وەرزە بەبێ زانیاری قازانج بڕیاری لەسەر دەدرێت",
        "گەڕاندنەوە و ئاڵوگۆڕ ژمارەی کۆگا تێک دەدەن",
        "دووبارە داواکردن پێشبینییە چونکە کەس ڕێژەی فرۆشتنی هەر جۆرێک ناپێوێت",
      ],
    },
    modules: ["Inventory", "POS", "eCommerce", "Sales", "Accounting"],
  },
  {
    slug: "restaurants-food-service",
    icon: "restaurant",
    title: {
      en: "Restaurants & Food Service",
      ar: "المطاعم وخدمات الطعام",
      ckb: "چێشتخانە و خزمەتگوزاری خواردن",
    },
    summary: {
      en: "Fast table management, kitchen routing and delivery in one system.",
      ar: "إدارة سريعة للطاولات وتوجيه المطبخ والتوصيل في نظام واحد.",
      ckb: "بەڕێوەبردنی خێرای مێزەکان، ئاراستەکردنی چێشتخانە و گەیاندن لە یەک سیستەمدا.",
    },
    challenges: {
      en: [
        "Orders are shouted to the kitchen and sometimes lost",
        "Food cost per dish is a guess, so the menu is priced by feel",
        "Delivery orders arrive on three different phones",
        "Ingredient stock is never reduced when a dish is sold",
        "Shift cash never quite matches the till report",
      ],
      ar: [
        "الطلبات تُنادى للمطبخ وأحياناً تضيع",
        "تكلفة الطبق تخمين، فتُسعَّر القائمة بالإحساس",
        "طلبات التوصيل تصل على ثلاثة هواتف مختلفة",
        "مخزون المكوّنات لا يُخصم عند بيع الطبق",
        "نقدية الوردية لا تطابق تقرير الكاشير تماماً",
      ],
      ckb: [
        "داواکارییەکان بە هاوار بۆ چێشتخانە دەنێردرێن و هەندێک جار ون دەبن",
        "تێچووی هەر خواردنێک پێشبینییە، بۆیە نرخی مێنیو بە هەست دادەنرێت",
        "داواکاری گەیاندن لەسەر سێ مۆبایلی جیاواز دێن",
        "کۆگای پێکهاتەکان هەرگیز کەم ناکرێتەوە کاتێک خواردنێک دەفرۆشرێت",
        "پارەی شیفت هەرگیز تەواو لەگەڵ ڕاپۆرتی کاشێر ناگونجێت",
      ],
    },
    modules: ["POS", "Restaurant", "Inventory", "Accounting"],
  },
  {
    slug: "wholesale-logistics",
    icon: "logistics",
    title: {
      en: "Wholesale & Logistics",
      ar: "الجملة والخدمات اللوجستية",
      ckb: "کڕین و فرۆشتنی کۆ و لۆجستیک",
    },
    summary: {
      en: "Advanced logistics and warehouse management built for volume.",
      ar: "إدارة لوجستية ومستودعات متقدّمة مصمَّمة للأحجام الكبيرة.",
      ckb: "بەڕێوەبردنی پێشکەوتووی لۆجستیک و کۆگا بۆ بڕی زۆر.",
    },
    challenges: {
      en: [
        "Picking errors are only found when the customer complains",
        "Every customer has a different price list and payment term",
        "Trucks leave half-loaded because routes are planned on paper",
        "Credit limits are checked after the goods have already gone",
        "Warehouse space is wasted because nothing tracks bin locations",
      ],
      ar: [
        "أخطاء التجهيز تُكتشف فقط عندما يشتكي العميل",
        "لكل عميل قائمة أسعار وشروط سداد مختلفة",
        "الشاحنات تخرج نصف محمّلة لأن المسارات تُخطَّط على الورق",
        "حدود الائتمان تُراجَع بعد خروج البضاعة",
        "مساحة المستودع تُهدر لأن لا شيء يتتبّع مواقع الرفوف",
      ],
      ckb: [
        "هەڵەکانی هەڵگرتنی کاڵا تەنها کاتێک دەردەکەون کە کڕیار سکاڵا دەکات",
        "هەر کڕیارێک لیستی نرخ و مەرجی پارەدانی جیاوازی هەیە",
        "بارهەڵگرەکان نیوە بارکراو دەڕۆن چونکە ڕێگاکان لەسەر کاغەز پلان دەکرێن",
        "سنووری قەرز دوای ئەوەی کاڵاکە ڕۆیشتووە پشکنین دەکرێت",
        "شوێنی کۆگا بەفیڕۆ دەچێت چونکە هیچ شتێک شوێنی ڕەفەکان ناپێوێت",
      ],
    },
    modules: ["Inventory", "Sales", "Purchase", "Accounting", "Fleet"],
  },
];
