import type { IconName } from "@/components/Icon";
import type { Locale, T, TList } from "@/lib/i18n";

/* ------------------------------------------------------------------ routes */

export const pageKeys = [
  "home",
  "about",
  "services",
  "industries",
  "portfolio",
  "contact",
] as const;

export type PageKey = (typeof pageKeys)[number];

/** Path after the locale prefix. Home is the locale root. */
export const pagePath: Record<PageKey, string> = {
  home: "",
  about: "/about",
  services: "/services",
  industries: "/industries",
  portfolio: "/portfolio",
  contact: "/contact",
};

export const href = (locale: Locale, key: PageKey): string =>
  `/${locale}${pagePath[key]}`;

/* ---------------------------------------------------------------- metadata */

export type PageMeta = { title: T; description: T };

/** One real title and description per page per language — never a template. */
export const pageMeta: Record<PageKey, PageMeta> = {
  home: {
    title: {
      en: "OdooVast — Odoo Partner in Erbil, Iraq",
      ar: "OdooVast — شريك Odoo في أربيل، العراق",
      ckb: "OdooVast — هاوبەشی Odoo لە هەولێر، عێراق",
    },
    description: {
      en: "OdooVast is an Odoo Partner in Erbil, Iraq. We implement, customise and support Odoo ERP for retail, manufacturing, distribution and trading companies. Free first consultation.",
      ar: "OdooVast شريك Odoo في أربيل، العراق. نطبّق ونخصّص وندعم نظام Odoo ERP لشركات التجزئة والتصنيع والتوزيع والتجارة. استشارة أولى مجانية.",
      ckb: "OdooVast هاوبەشی Odooیە لە هەولێری عێراق. سیستەمی Odoo ERP جێبەجێ دەکەین، تایبەتمەندی دەکەین و پشتگیری دەکەین بۆ کۆمپانیاکانی فرۆشتن، بەرهەمهێنان، دابەشکردن و بازرگانی. یەکەم ڕاوێژکاری خۆڕایی.",
    },
  },
  about: {
    title: {
      en: "About OdooVast — an Odoo Partner in Erbil",
      ar: "من نحن — OdooVast شريك Odoo في أربيل",
      ckb: "دەربارەمان — OdooVast هاوبەشی Odoo لە هەولێر",
    },
    description: {
      en: "Who OdooVast is, what we stand for, and why an Odoo Partner is a different proposition from a freelance developer.",
      ar: "من هي OdooVast، وما الذي نلتزم به، ولماذا يختلف شريك Odoo عن مطوّر مستقل.",
      ckb: "OdooVast کێیە، لەسەر چی ڕادەوەستین، و بۆچی هاوبەشێکی Odoo جیاوازە لە گەشەپێدەرێکی سەربەخۆ.",
    },
  },
  services: {
    title: {
      en: "Odoo Services — implementation, custom modules, support",
      ar: "خدمات Odoo — التطبيق والوحدات المخصّصة والدعم",
      ckb: "خزمەتگوزاری Odoo — جێبەجێکردن، مۆدیوڵی تایبەت و پشتگیری",
    },
    description: {
      en: "Odoo implementation, custom module development, third-party integrations, support and maintenance, website and eCommerce, accounting, sales, purchase, inventory, MRP and POS.",
      ar: "تطبيق Odoo، تطوير وحدات مخصّصة، التكامل مع الأنظمة، الدعم والصيانة، الموقع والمتجر الإلكتروني، المحاسبة، المبيعات، المشتريات، المخزون، التصنيع ونقاط البيع.",
      ckb: "جێبەجێکردنی Odoo، گەشەپێدانی مۆدیوڵی تایبەت، تێکەڵکردن لەگەڵ سیستەمی دەرەکی، پشتگیری و چاکسازی، ماڵپەڕ و فرۆشتنی ئۆنلاین، ژمێریاری، فرۆشتن، کڕین، کۆگا، MRP و POS.",
    },
  },
  industries: {
    title: {
      en: "Industries — retail, manufacturing, distribution, food service",
      ar: "القطاعات — التجزئة والتصنيع والتوزيع وخدمات الطعام",
      ckb: "کەرتەکان — فرۆشتنی وردە، بەرهەمهێنان، دابەشکردن و خواردن",
    },
    description: {
      en: "The concrete problems Odoo solves in retail, manufacturing, steel and distribution, fashion and apparel, restaurants, and wholesale and logistics.",
      ar: "المشكلات الملموسة التي يحلّها Odoo في التجزئة والتصنيع والحديد والتوزيع والأزياء والمطاعم والجملة واللوجستيات.",
      ckb: "ئەو کێشە بەرچاوانەی Odoo چارەسەریان دەکات لە فرۆشتنی وردە، بەرهەمهێنان، پۆڵا و دابەشکردن، جل و بەرگ، چێشتخانە، و کڕین و فرۆشتنی کۆ.",
    },
  },
  portfolio: {
    title: {
      en: "Portfolio — companies that run Odoo with OdooVast",
      ar: "أعمالنا — شركات تدير أعمالها بـ Odoo مع OdooVast",
      ckb: "کارەکانمان — ئەو کۆمپانیایانەی بە Odoo کار دەکەن لەگەڵ OdooVast",
    },
    description: {
      en: "Companies running Odoo with OdooVast — Alnajar Steel, Salar Jamal, Diamond Parda Company, Vendor for General Trading, Som and Aljawahir. Detailed case studies are on the way.",
      ar: "شركات تدير أعمالها بنظام Odoo مع OdooVast — Alnajar Steel وSalar Jamal وDiamond Parda وVendor للتجارة العامة وSom وAljawahir. دراسات الحالة التفصيلية قريباً.",
      ckb: "ئەو کۆمپانیایانەی بە Odoo کار دەکەن لەگەڵ OdooVast — Alnajar Steel، Salar Jamal، Diamond Parda، Vendor، Som و Aljawahir. نموونە پڕۆژە وردەکان لە ڕێگادان.",
    },
  },
  contact: {
    title: {
      en: "Contact OdooVast — Erbil, Iraq",
      ar: "اتصل بـ OdooVast — أربيل، العراق",
      ckb: "پەیوەندی بە OdooVast — هەولێر، عێراق",
    },
    description: {
      en: "Phone, WhatsApp, email and office address for OdooVast in Erbil, Iraq. Open 24/7. Get in touch for a free consultation.",
      ar: "الهاتف وواتساب والبريد الإلكتروني وعنوان مكتب OdooVast في أربيل، العراق. مفتوح على مدار الساعة. تواصل معنا لاستشارة مجانية.",
      ckb: "تەلەفۆن، واتسئاپ، ئیمەیڵ و ناونیشانی نووسینگەی OdooVast لە هەولێری عێراق. ٢٤/٧ کراوەیە. بۆ ڕاوێژکاری خۆڕایی پەیوەندیمان پێوە بکە.",
    },
  },
};

/* -------------------------------------------------------------------- home */

export type Highlight = { icon: IconName; title: T; body: T };

export const home = {
  eyebrow: {
    en: "Odoo Partner · Erbil, Iraq",
    ar: "شريك Odoo · أربيل، العراق",
    ckb: "هاوبەشی Odoo · هەولێر، عێراق",
  } satisfies T,
  h1: {
    en: "Run your whole company on one system.",
    ar: "أدِر شركتك بالكامل على نظام واحد.",
    ckb: "هەموو کۆمپانیاکەت لەسەر یەک سیستەم بەڕێوە ببە.",
  } satisfies T,
  lead: {
    en: "OdooVast implements, customises and supports Odoo ERP for businesses in Iraq — from the shop floor to the balance sheet. The first consultation is free.",
    ar: "تطبّق OdooVast نظام Odoo ERP وتخصّصه وتدعمه للشركات في العراق — من أرض المصنع إلى الميزانية العمومية. الاستشارة الأولى مجانية.",
    ckb: "OdooVast سیستەمی Odoo ERP بۆ کاروباری عێراق جێبەجێ دەکات، تایبەتمەندی دەکات و پشتگیری دەکات — لە شوێنی بەرهەمهێنانەوە تا باڵانسی دارایی. یەکەم ڕاوێژکاری خۆڕاییە.",
  } satisfies T,

  credibilityTitle: {
    en: "Why companies choose an Odoo Partner",
    ar: "لماذا تختار الشركات شريك Odoo",
    ckb: "بۆچی کۆمپانیاکان هاوبەشێکی Odoo هەڵدەبژێرن",
  } satisfies T,
  /* From the selling points confirmed in FACTS.md. "Proven results" is
     deliberately left out — OdooVast has no published case studies yet, so it
     would be an unevidenced claim. Add it back once the portfolio is real. */
  highlights: [
    {
      icon: "partner",
      title: { en: "Odoo Partner", ar: "شريك Odoo", ckb: "هاوبەشی Odoo" },
      body: {
        en: "We work inside the official Odoo ecosystem — licensing, roadmap and support channels included.",
        ar: "نعمل داخل منظومة Odoo الرسمية — بما يشمل التراخيص وخارطة الطريق وقنوات الدعم.",
        ckb: "لە ناو ئیکۆسیستەمی فەرمی Odoo کار دەکەین — مۆڵەت، پلانی داهاتوو و کەناڵەکانی پشتگیری لەخۆدەگرێت.",
      },
    },
    {
      icon: "team",
      title: { en: "Expert team", ar: "فريق خبير", ckb: "تیمی شارەزا" },
      body: {
        en: "Consultants and developers who know both the product and how business is actually done in Iraq.",
        ar: "استشاريون ومطوّرون يعرفون المنتج وطريقة العمل الفعلية في العراق.",
        ckb: "ڕاوێژکار و گەشەپێدەر کە هەم بەرهەمەکە دەزانن هەم شێوازی ڕاستەقینەی کارکردن لە عێراق.",
      },
    },
    {
      icon: "support",
      title: { en: "24/7 support", ar: "دعم 24/7", ckb: "پشتگیری ٢٤/٧" },
      body: {
        en: "Production does not stop at five o'clock, so neither do we. Reach us any hour, any day.",
        ar: "الإنتاج لا يتوقف الساعة الخامسة، ونحن كذلك. تواصل معنا في أي ساعة وأي يوم.",
        ckb: "بەرهەمهێنان لە کاتژمێر پێنج ناوەستێت، ئێمەش هەروەها. لە هەر کاتژمێرێک و هەر ڕۆژێک پەیوەندیمان پێوە بکە.",
      },
    },
    {
      icon: "enterprise",
      title: {
        en: "Enterprise excellence",
        ar: "جودة على مستوى المؤسسات",
        ckb: "کوالێتیی ئێنتەرپرایز",
      },
      body: {
        en: "Multi-company, multi-currency and multi-branch handled properly, not bolted on later.",
        ar: "تعدّد الشركات والعملات والفروع يُعالَج بشكل صحيح لا كإضافة لاحقة.",
        ckb: "چەند کۆمپانیا، چەند دراو و چەند لق بە شێوەیەکی دروست چارەسەر دەکرێن، نەک دواتر زیاد بکرێن.",
      },
    },
  ] satisfies Highlight[],

  clientsTitle: {
    en: "Some of our clients",
    ar: "من عملائنا",
    ckb: "هەندێک لە کڕیارەکانمان",
  } satisfies T,

  servicesTitle: {
    en: "What we do",
    ar: "ما الذي نقدّمه",
    ckb: "چی دەکەین",
  } satisfies T,
  servicesLead: {
    en: "Six things we are asked for most. The full list runs to eleven.",
    ar: "ست خدمات هي الأكثر طلباً. القائمة الكاملة إحدى عشرة خدمة.",
    ckb: "شەش شت کە زۆرترین داواکاریمان بۆ دەکرێت. لیستی تەواو یازدەیە.",
  } satisfies T,

  industriesTitle: {
    en: "Industries we work in",
    ar: "القطاعات التي نعمل بها",
    ckb: "ئەو کەرتانەی تێیدا کار دەکەین",
  } satisfies T,
  industriesLead: {
    en: "An ERP is only as good as its fit. These are the sectors whose problems we know in detail.",
    ar: "لا يساوي نظام ERP إلا بقدر ملاءمته. هذه القطاعات نعرف مشكلاتها بالتفصيل.",
    ckb: "ERP تەنها بەقەد گونجانەکەی بەنرخە. ئەمانە ئەو کەرتانەن کە کێشەکانیان بە وردی دەزانین.",
  } satisfies T,

  statsTitle: {
    en: "By the numbers",
    ar: "بالأرقام",
    ckb: "بە ژمارەکان",
  } satisfies T,

  ctaTitle: {
    en: "Tell us what is not working.",
    ar: "أخبرنا بما لا يعمل كما يجب.",
    ckb: "پێمان بڵێ چی کار ناکات.",
  } satisfies T,
  ctaBody: {
    en: "One conversation is usually enough to tell whether Odoo is the right answer for you — and we will say so if it is not.",
    ar: "محادثة واحدة تكفي عادةً لمعرفة ما إذا كان Odoo هو الحل المناسب لك — وسنقول ذلك بصراحة إن لم يكن كذلك.",
    ckb: "زۆرجار یەک گفتوگۆ بەسە بۆ زانینی ئەوەی ئایا Odoo وەڵامی دروستە بۆ تۆ — و ئەگەر نەبێت، بە ڕاشکاوی دەڵێین.",
  } satisfies T,
};

/* ------------------------------------------------------------------- about */

export type Value = { icon: IconName; title: T; body: T };

export const about = {
  h1: {
    en: "A firm built around one system, done properly.",
    ar: "شركة بُنيت حول نظام واحد، يُنفَّذ كما ينبغي.",
    ckb: "کۆمپانیایەک لەسەر یەک سیستەم دروستکراوە، بە شێوەیەکی دروست.",
  } satisfies T,
  lead: {
    en: "OdooVast is an Odoo Partner based in Erbil, Iraq.",
    ar: "OdooVast شريك Odoo ومقرّها أربيل، العراق.",
    ckb: "OdooVast هاوبەشی Odooیە و بنکەکەی لە هەولێری عێراقە.",
  } satisfies T,

  storyTitle: {
    en: "Why we exist",
    ar: "لماذا وُجدنا",
    ckb: "بۆچی هەین",
  } satisfies T,
  storyBody: {
    en: [
      "OdooVast started in 2025 in Erbil for a straightforward reason: too many companies in Iraq run serious operations on spreadsheets and disconnected software, and too many of the ERP projects meant to fix that quietly fail.",
      "They fail for the same reasons every time. Nobody studied the workflow before configuring the system. The data was never migrated properly. The team was trained once, in a language they half-understood. And the consultant disappeared the week after go-live.",
      "We are a young firm and we do not pretend otherwise. What we bring is focus: one product, known deeply; Iraqi business reality, understood from the inside; and three languages spoken properly.",
    ],
    ar: [
      "بدأت OdooVast عام 2025 في أربيل لسبب بسيط: عدد كبير من الشركات في العراق يدير عمليات جادة على جداول Excel وبرمجيات غير مترابطة، وعدد كبير من مشاريع ERP التي كان يُفترض أن تعالج ذلك تفشل بصمت.",
      "وهي تفشل للأسباب نفسها في كل مرة. لم يدرس أحد سير العمل قبل إعداد النظام. لم تُرحَّل البيانات كما ينبغي. دُرِّب الفريق مرة واحدة بلغة يفهمها نصف فهم. ثم اختفى الاستشاري في الأسبوع التالي للانطلاق.",
      "نحن شركة حديثة ولا ندّعي غير ذلك. ما نقدّمه هو التركيز: منتج واحد نعرفه بعمق، وواقع الأعمال العراقي نفهمه من الداخل، وثلاث لغات نتقنها فعلاً.",
    ],
    ckb: [
      "OdooVast لە ساڵی ٢٠٢٥ لە هەولێر دەستی پێکرد بۆ هۆکارێکی ڕوون: زۆر کۆمپانیا لە عێراق کاری گرنگ لەسەر خشتەی Excel و نەرمەکاڵای لێکجیاوە بەڕێوە دەبەن، و زۆر لەو پڕۆژانەی ERP کە دەبوایە ئەمە چارەسەر بکەن بە بێدەنگی سەرکەوتوو نابن.",
      "هەمیشە بە هەمان هۆکار سەرکەوتوو نابن. کەس پێش ڕێکخستنی سیستەمەکە لێکۆڵینەوەی لە ڕێڕەوی کار نەکردووە. داتاکە بە شێوەیەکی دروست نەگوێزراوەتەوە. تیمەکە تەنها یەک جار ڕاهێنراوە، بە زمانێک کە نیوەی تێگەیشتوون. پاشان ڕاوێژکارەکە هەفتەی دوای کارپێکردن ون بووە.",
      "ئێمە کۆمپانیایەکی نوێین و شتی تر ناڵێین. ئەوەی دەیهێنین چڕبوونەوەیە: یەک بەرهەم، بە قووڵی زانراو؛ ڕاستی کاروباری عێراق، لە ناوەوە تێگەیشتراو؛ و سێ زمان، بە دروستی قسەکراو.",
    ],
  } satisfies TList,

  valuesTitle: {
    en: "What we stand for",
    ar: "ما الذي نلتزم به",
    ckb: "لەسەر چی ڕادەوەستین",
  } satisfies T,
  values: [
    {
      icon: "honest",
      title: {
        en: "We tell you what Odoo cannot do",
        ar: "نخبرك بما لا يستطيع Odoo فعله",
        ckb: "پێت دەڵێین Odoo چی ناتوانێت بیکات",
      },
      body: {
        en: "Before the contract, not after. If your requirement is a poor fit, hearing that in the first meeting is cheaper for everyone.",
        ar: "قبل العقد لا بعده. إذا كان متطلبك غير مناسب، فسماع ذلك في الاجتماع الأول أقل كلفة للجميع.",
        ckb: "پێش گرێبەست، نەک دوای. ئەگەر پێداویستییەکەت گونجاو نەبێت، بیستنی لە یەکەم کۆبوونەوەدا بۆ هەمووان ئەرزانترە.",
      },
    },
    {
      icon: "code",
      title: {
        en: "The system belongs to you",
        ar: "النظام ملكك",
        ckb: "سیستەمەکە هی تۆیە",
      },
      body: {
        en: "Your data, your custom code, your server if you want it. No lock-in, and nothing you cannot take to another partner.",
        ar: "بياناتك وشيفرتك المخصّصة وخادمك إن أردت. لا احتكار، ولا شيء يمنعك من الانتقال إلى شريك آخر.",
        ckb: "داتاکەت، کۆدە تایبەتەکەت، سێرڤەرەکەت ئەگەر بتەوێت. هیچ قفڵێک نییە، و هیچ شتێک نییە نەتوانیت بۆ هاوبەشێکی تر بیبەیت.",
      },
    },
    {
      icon: "training",
      title: {
        en: "Trained in your own language",
        ar: "تدريب بلغتك أنت",
        ckb: "ڕاهێنان بە زمانی خۆت",
      },
      body: {
        en: "Kurdish, Arabic or English. A system nobody understands is a system nobody uses.",
        ar: "بالكردية أو العربية أو الإنجليزية. النظام الذي لا يفهمه أحد لا يستخدمه أحد.",
        ckb: "کوردی، عەرەبی یان ئینگلیزی. سیستەمێک کە کەس لێی تێنەگات، کەس بەکاری ناهێنێت.",
      },
    },
    {
      icon: "support",
      title: {
        en: "We stay after go-live",
        ar: "نبقى بعد الانطلاق",
        ckb: "دوای کارپێکردنیش دەمێنینەوە",
      },
      body: {
        en: "The month after launch decides whether an ERP is adopted or quietly abandoned. That is the month we are most present.",
        ar: "الشهر التالي للانطلاق يحدّد ما إذا كان النظام سيُعتمد أم يُهجَر بصمت. وهو الشهر الذي نكون فيه أكثر حضوراً.",
        ckb: "مانگی دوای دەستپێکردن دیاری دەکات کە ERP بەکاردێت یان بە بێدەنگی وازی لێدەهێنرێت. ئەوە ئەو مانگەیە کە زۆرترین ئامادەیی دەبێت.",
      },
    },
  ] satisfies Value[],

  partnerTitle: {
    en: "Why a partner, not a freelancer",
    ar: "لماذا شريك لا مطوّر مستقل",
    ckb: "بۆچی هاوبەش، نەک کەسێکی سەربەخۆ",
  } satisfies T,
  partnerLead: {
    en: "A freelance developer can be excellent and considerably cheaper. Here is what changes when the work goes through a partner instead.",
    ar: "قد يكون المطوّر المستقل ممتازاً وأقل كلفة بكثير. وإليك ما يتغيّر عندما يمرّ العمل عبر شريك.",
    ckb: "گەشەپێدەرێکی سەربەخۆ لەوانەیە زۆر باش و زۆر ئەرزانتر بێت. ئەمە ئەوەیە کە دەگۆڕێت کاتێک کارەکە بە هاوبەشێکدا تێدەپەڕێت.",
  } satisfies T,
  partnerPoints: {
    en: [
      "Continuity — a team covers the work, so a project does not stop when one person is unavailable.",
      "Accountability — a partner answers to Odoo as well as to you.",
      "Upgrade-safe work — core files are never edited, so next year's version still installs.",
      "Official licensing and support channels, rather than an unlicensed copy nobody can update.",
      "A written scope and a handover, so your team is not dependent on one person's memory.",
    ],
    ar: [
      "الاستمرارية — الفريق يغطّي العمل، فلا يتوقف المشروع عند غياب شخص واحد.",
      "المساءلة — الشريك مسؤول أمام Odoo كما هو مسؤول أمامك.",
      "عمل آمن للترقية — لا تُعدَّل ملفات النواة، فيبقى إصدار العام القادم قابلاً للتثبيت.",
      "تراخيص وقنوات دعم رسمية بدل نسخة غير مرخّصة لا يستطيع أحد تحديثها.",
      "نطاق عمل مكتوب وتسليم موثّق، فلا يعتمد فريقك على ذاكرة شخص واحد.",
    ],
    ckb: [
      "بەردەوامی — تیمێک کارەکە دەگرێتەوە، بۆیە پڕۆژەکە ناوەستێت کاتێک یەک کەس ئامادە نییە.",
      "بەرپرسیارێتی — هاوبەش هەم بەرامبەر Odoo هەم بەرامبەر تۆ بەرپرسە.",
      "کاری پارێزراو بۆ بەرزکردنەوە — هەرگیز فایلە بنەڕەتییەکان دەستکاری ناکرێن، بۆیە وەشانی ساڵی داهاتووش دادەمەزرێت.",
      "مۆڵەت و کەناڵی پشتگیری فەرمی، لەبری کۆپییەکی بێ مۆڵەت کە کەس ناتوانێت نوێی بکاتەوە.",
      "چوارچێوەیەکی نووسراو و تەسلیمکردنێکی تۆمارکراو، بۆیە تیمەکەت پشت بە بیری یەک کەس نابەستێت.",
    ],
  } satisfies TList,

  timelineTitle: {
    en: "Our story so far",
    ar: "قصتنا حتى الآن",
    ckb: "چیرۆکمان تا ئێستا",
  } satisfies T,
};

/* --------------------------------------------------------- services page */

export const servicesPage = {
  h1: {
    en: "Everything we do with Odoo",
    ar: "كل ما نقدّمه عبر Odoo",
    ckb: "هەموو ئەوەی بە Odoo دەیکەین",
  } satisfies T,
  lead: {
    en: "Eleven services. Most projects start with one of the first four and grow from there.",
    ar: "إحدى عشرة خدمة. تبدأ معظم المشاريع بواحدة من الأربع الأولى ثم تتوسّع.",
    ckb: "یازدە خزمەتگوزاری. زۆربەی پڕۆژەکان بە یەکێک لە چوار خزمەتگوزاری یەکەم دەست پێدەکەن و پاشان گەورە دەبن.",
  } satisfies T,
};

/* -------------------------------------------------------- industries page */

export const industriesPage = {
  h1: {
    en: "The sectors we know in detail",
    ar: "القطاعات التي نعرفها بالتفصيل",
    ckb: "ئەو کەرتانەی بە وردی دەیانزانین",
  } satisfies T,
  lead: {
    en: "Every ERP demo looks the same. What separates them is whether the consultant already understands the problems below.",
    ar: "كل عروض ERP تبدو متشابهة. الفارق هو ما إذا كان الاستشاري يفهم المشكلات أدناه مسبقاً.",
    ckb: "هەموو نمایشێکی ERP وەک یەک دیارە. جیاوازییەکە ئەوەیە ئایا ڕاوێژکارەکە پێشتر لەو کێشانەی خوارەوە تێگەیشتووە.",
  } satisfies T,
};

/* --------------------------------------------------------- portfolio page */

/** TODO: every entry below is a placeholder. Replace `placeholder: true` with a
 *  real, client-approved case study — name, sector, scope, outcome — or leave
 *  it out. Never publish a client name without written approval. */
export type CaseStudy = {
  placeholder: boolean;
  sector: T;
  title: T;
  body: T;
};

export const portfolioPage = {
  h1: {
    en: "Case studies",
    ar: "دراسات الحالة",
    ckb: "نموونەی پڕۆژەکان",
  } satisfies T,
  lead: {
    en: "These companies run their business on Odoo with us. Detailed case studies — scope, modules, results — are being written up with each client now.",
    ar: "هذه الشركات تدير أعمالها بنظام Odoo معنا. دراسات الحالة التفصيلية — النطاق والوحدات والنتائج — قيد الإعداد الآن مع كل عميل.",
    ckb: "ئەم کۆمپانیایانە بە Odoo کارەکانیان لەگەڵ ئێمە بەڕێوە دەبەن. نموونە پڕۆژە وردەکان — چوارچێوە، مۆدیوڵ و ئەنجامەکان — ئێستا لەگەڵ هەر کڕیارێک ئامادە دەکرێن.",
  } satisfies T,
  clientsTitle: {
    en: "Companies we work with",
    ar: "شركات نعمل معها",
    ckb: "ئەو کۆمپانیایانەی کاریان لەگەڵ دەکەین",
  } satisfies T,
  noticeTitle: {
    en: "Case studies in preparation",
    ar: "دراسات الحالة قيد الإعداد",
    ckb: "نموونە پڕۆژەکان لە ئامادەکردندان",
  } satisfies T,
  noticeBody: {
    en: "The client list above is real. The three entries below are placeholders for the detailed write-ups — each will be published once its client approves the details.",
    ar: "قائمة العملاء أعلاه حقيقية. المدخلات الثلاثة أدناه مؤقّتة للدراسات التفصيلية — وستُنشر كل واحدة بعد موافقة عميلها على التفاصيل.",
    ckb: "لیستی کڕیارەکانی سەرەوە ڕاستەقینەیە. ئەو سێ تۆمارەی خوارەوە کاتین بۆ نووسینە وردەکان — هەر یەکێکیان بڵاو دەبێتەوە کاتێک کڕیارەکەی ڕەزامەندی لەسەر وردەکارییەکان دەدات.",
  } satisfies T,
  placeholderBadge: {
    en: "Placeholder",
    ar: "مؤقّت",
    ckb: "کاتی",
  } satisfies T,
  ctaTitle: {
    en: "Would you like to be the first one here?",
    ar: "هل تودّ أن تكون أول من يظهر هنا؟",
    ckb: "دەتەوێت یەکەم کەس بیت لێرەدا؟",
  } satisfies T,
  ctaBody: {
    en: "We are taking on new projects now. Early clients get the attention that comes with being early.",
    ar: "نستقبل مشاريع جديدة الآن. العملاء الأوائل يحظون بالاهتمام الذي يليق بالبداية.",
    ckb: "ئێستا پڕۆژەی نوێ وەردەگرین. کڕیارە یەکەمەکان ئەو گرنگییە وەردەگرن کە لەگەڵ زووبوونەوە دێت.",
  } satisfies T,
  cases: [
    {
      placeholder: true,
      sector: { en: "Retail", ar: "تجارة التجزئة", ckb: "فرۆشتنی وردە" },
      title: {
        en: "Multi-branch retail — POS and stock on one system",
        ar: "تجزئة متعددة الفروع — نقاط بيع ومخزون على نظام واحد",
        ckb: "فرۆشتنی وردەی چەند لق — POS و کۆگا لەسەر یەک سیستەم",
      },
      body: {
        en: "TODO: replace with a real, client-approved project — sector, scope, modules deployed, and the measurable outcome the client agreed to publish.",
        ar: "TODO: استبدلها بمشروع حقيقي بموافقة العميل — القطاع والنطاق والوحدات المطبَّقة والنتيجة القابلة للقياس التي وافق العميل على نشرها.",
        ckb: "TODO: بیگۆڕە بە پڕۆژەیەکی ڕاستەقینەی پەسەندکراو لەلایەن کڕیار — کەرت، چوارچێوە، مۆدیوڵە جێبەجێکراوەکان و ئەنجامی پێواکراو کە کڕیار ڕەزامەندی لەسەر بڵاوکردنەوەی داوە.",
      },
    },
    {
      placeholder: true,
      sector: { en: "Manufacturing", ar: "التصنيع", ckb: "بەرهەمهێنان" },
      title: {
        en: "Production floor — real cost per manufacturing order",
        ar: "أرض المصنع — التكلفة الحقيقية لكل أمر تصنيع",
        ckb: "شوێنی بەرهەمهێنان — تێچووی ڕاستەقینەی هەر فەرمانێکی بەرهەمهێنان",
      },
      body: {
        en: "TODO: replace with a real, client-approved project — sector, scope, modules deployed, and the measurable outcome the client agreed to publish.",
        ar: "TODO: استبدلها بمشروع حقيقي بموافقة العميل — القطاع والنطاق والوحدات المطبَّقة والنتيجة القابلة للقياس التي وافق العميل على نشرها.",
        ckb: "TODO: بیگۆڕە بە پڕۆژەیەکی ڕاستەقینەی پەسەندکراو لەلایەن کڕیار — کەرت، چوارچێوە، مۆدیوڵە جێبەجێکراوەکان و ئەنجامی پێواکراو کە کڕیار ڕەزامەندی لەسەر بڵاوکردنەوەی داوە.",
      },
    },
    {
      placeholder: true,
      sector: {
        en: "Trading & distribution",
        ar: "التجارة والتوزيع",
        ckb: "بازرگانی و دابەشکردن",
      },
      title: {
        en: "Import and distribution — landed cost done properly",
        ar: "الاستيراد والتوزيع — احتساب التكلفة النهائية كما ينبغي",
        ckb: "هاوردە و دابەشکردن — تێچووی کۆتایی بە شێوەیەکی دروست",
      },
      body: {
        en: "TODO: replace with a real, client-approved project — sector, scope, modules deployed, and the measurable outcome the client agreed to publish.",
        ar: "TODO: استبدلها بمشروع حقيقي بموافقة العميل — القطاع والنطاق والوحدات المطبَّقة والنتيجة القابلة للقياس التي وافق العميل على نشرها.",
        ckb: "TODO: بیگۆڕە بە پڕۆژەیەکی ڕاستەقینەی پەسەندکراو لەلایەن کڕیار — کەرت، چوارچێوە، مۆدیوڵە جێبەجێکراوەکان و ئەنجامی پێواکراو کە کڕیار ڕەزامەندی لەسەر بڵاوکردنەوەی داوە.",
      },
    },
  ] satisfies CaseStudy[],
};

/* ----------------------------------------------------------- contact page */

export const contactPage = {
  h1: {
    en: "Talk to us",
    ar: "تحدّث إلينا",
    ckb: "قسەمان لەگەڵ بکە",
  } satisfies T,
  /** The positioning line confirmed in FACTS.md, kept word for word. */
  lead: {
    en: "Get in touch with OdooVast for a free consultation. Located in Erbil, Iraq.",
    ar: "تواصل مع OdooVast للحصول على استشارة مجانية. مقرّنا أربيل، العراق.",
    ckb: "بۆ ڕاوێژکارییەکی خۆڕایی پەیوەندی بە OdooVast بکە. لە هەولێری عێراقین.",
  } satisfies T,
  formTitle: {
    en: "Send us the details",
    ar: "أرسل لنا التفاصيل",
    ckb: "وردەکارییەکان بۆمان بنێرە",
  } satisfies T,
  formLead: {
    en: "Fill this in and it opens WhatsApp with your message ready. Nothing is stored on this website.",
    ar: "املأ الحقول وسيفتح واتساب ورسالتك جاهزة. لا يُخزَّن شيء على هذا الموقع.",
    ckb: "ئەمانە پڕ بکەرەوە و واتسئاپ دەکرێتەوە و نامەکەت ئامادەیە. هیچ شتێک لەم ماڵپەڕەدا هەڵناگیرێت.",
  } satisfies T,
  detailsTitle: {
    en: "Direct contact",
    ar: "التواصل المباشر",
    ckb: "پەیوەندی ڕاستەوخۆ",
  } satisfies T,
  mapTitle: {
    en: "Find the office",
    ar: "موقع المكتب",
    ckb: "شوێنی نووسینگە",
  } satisfies T,
  labels: {
    phone: { en: "Phone", ar: "الهاتف", ckb: "تەلەفۆن" } satisfies T,
    whatsapp: { en: "WhatsApp", ar: "واتساب", ckb: "واتسئاپ" } satisfies T,
    email: { en: "Email", ar: "البريد الإلكتروني", ckb: "ئیمەیڵ" } satisfies T,
    address: { en: "Office", ar: "المكتب", ckb: "نووسینگە" } satisfies T,
    hours: { en: "Hours", ar: "أوقات العمل", ckb: "کاتی کارکردن" } satisfies T,
  },
};
