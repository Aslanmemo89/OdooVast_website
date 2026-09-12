import type { PageKey } from "@/content/pages";
import type { T, TList } from "@/lib/i18n";

/**
 * Privacy Policy, Terms of Service and User Data Deletion.
 *
 * These are the only pages on the site that make promises we can be held to,
 * so every statement here is checked against what the code actually does:
 * no cookies are set, no analytics run, no form posts anywhere, and the only
 * third party a visitor's browser ever reaches is the Google Maps iframe on
 * the contact page. If any of that changes, this file changes with it —
 * before the change ships, not after.
 */

/** A term with its explanation — rendered as a description list. */
export type LegalDef = { term: T; body: T };

export type LegalSection = {
  /** Anchor id, so a clause can be linked to directly. Also the React key. */
  id: string;
  heading: T;
  /** Paragraphs. */
  body?: TList;
  /** Bullet points, after the paragraphs. */
  points?: TList;
  /** Labelled points, for lists where each item names a thing. */
  defs?: LegalDef[];
  /** Cross-references to other pages on this site. */
  links?: { key: PageKey; label: T }[];
};

export type LegalDoc = {
  h1: T;
  lead: T;
  /** Machine-readable, for <time dateTime>. */
  updatedIso: string;
  /** Written by hand per language — no runtime date formatting, no surprises. */
  updated: T;
  summaryTitle: T;
  summary: TList;
  sections: LegalSection[];
  contactTitle: T;
  contactBody: T;
};

/* ---------------------------------------------------------------- privacy */

export const privacy: LegalDoc = {
  h1: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
    ckb: "سیاسەتی تایبەتێتی",
  },
  lead: {
    en: "How OdooVast handles personal information — on this website, in a conversation with us, and inside an Odoo system we build for you.",
    ar: "كيف تتعامل OdooVast مع المعلومات الشخصية — على هذا الموقع، وفي تواصلك معنا، وداخل نظام Odoo الذي نبنيه لك.",
    ckb: "OdooVast چۆن مامەڵە لەگەڵ زانیاری کەسیدا دەکات — لەم ماڵپەڕەدا، لە گفتوگۆکردن لەگەڵمان، و لەناو ئەو سیستەمی Odooی کە بۆت دروست دەکەین.",
  },
  updatedIso: "2026-09-12",
  updated: {
    en: "12 September 2026",
    ar: "12 أيلول 2026",
    ckb: "١٢ی ئەیلوولی ٢٠٢٦",
  },
  summaryTitle: {
    en: "The short version",
    ar: "الخلاصة",
    ckb: "بە کورتی",
  },
  summary: {
    en: [
      "This website sets no cookies, runs no analytics and has no database. Nothing you type into the contact form is sent to us or stored here.",
      "The form opens WhatsApp on your own device with the message already written. You decide whether to send it.",
      "We receive personal information in three ways only: you contact us directly, you submit a lead form on our Facebook or Instagram ads, or you become a client.",
      "We never sell lead data or any other personal information, and you can ask us to delete everything we hold at any time, free of charge and without giving a reason.",
    ],
    ar: [
      "هذا الموقع لا يضع ملفات تعريف ارتباط، ولا يشغّل أدوات تحليل، وليست لديه قاعدة بيانات. ما تكتبه في نموذج التواصل لا يُرسَل إلينا ولا يُخزَّن هنا.",
      "النموذج يفتح واتساب على جهازك والرسالة مكتوبة سلفاً. أنت من يقرر إرسالها.",
      "لا نتلقى معلومات شخصية إلا بثلاث طرق: أن تتواصل معنا مباشرة، أو أن تملأ نموذج تواصل في إعلاناتنا على فيسبوك أو إنستغرام، أو أن تصبح عميلاً لدينا.",
      "نحن لا نبيع بيانات العملاء المحتملين ولا أي معلومات شخصية أخرى إطلاقاً، ويمكنك في أي وقت أن تطلب حذف كل ما نحتفظ به، مجاناً ودون بيان سبب.",
    ],
    ckb: [
      "ئەم ماڵپەڕە هیچ کۆکیەک دانانێت، هیچ ئامرازێکی شیکاری کار ناکات و هیچ بنکەدراوەیەکی نییە. ئەوەی لە فۆڕمی پەیوەندیدا دەینووسیت نە بۆ ئێمە دەنێردرێت و نە لێرە هەڵدەگیرێت.",
      "فۆڕمەکە واتسئاپ لەسەر ئامێرەکەی خۆت دەکاتەوە و نامەکە پێشوەخت نووسراوە. خۆت بڕیار دەدەیت بینێریت یان نا.",
      "تەنها بە سێ ڕێگا زانیاری کەسی وەردەگرین: ڕاستەوخۆ پەیوەندیمان پێوە بکەیت، فۆڕمێکی پەیوەندی لە ڕیکلامەکانمان لە Facebook یان Instagram پڕ بکەیتەوە، یان ببیتە کڕیارمان.",
      "ئێمە هەرگیز داتای کڕیاری چاوەڕوانکراو یان هیچ زانیارییەکی کەسی تر نافرۆشین، و هەر کاتێک بتەوێت دەتوانیت داوا بکەیت هەرچیمان هەیە بیسڕینەوە، بە خۆڕایی و بەبێ ئەوەی هۆکارێک بڵێیت.",
    ],
  },
  sections: [
    {
      id: "who-we-are",
      heading: {
        en: "Who we are",
        ar: "من نحن",
        ckb: "ئێمە کێین",
      },
      body: {
        en: [
          "OdooVast is an Odoo Partner based in Erbil, Kurdistan Region, Iraq. In this policy, “we”, “us” and “our” mean OdooVast.",
          "This policy covers www.odoovast.com and the direct contact channels listed on it. It also explains, in general terms, how we treat information inside an Odoo system we implement, host or support for a client.",
        ],
        ar: [
          "OdooVast شريك Odoo ومقرّها أربيل، إقليم كردستان، العراق. تعني كلمات «نحن» و«لنا» في هذه السياسة شركة OdooVast.",
          "تغطي هذه السياسة موقع www.odoovast.com وقنوات التواصل المباشر المذكورة فيه. وتوضّح كذلك، بصورة عامة، كيف نتعامل مع المعلومات داخل نظام Odoo الذي ننفّذه أو نستضيفه أو ندعمه لعميل.",
        ],
        ckb: [
          "OdooVast هاوبەشی Odooیە و بنکەکەی لە هەولێر، هەرێمی کوردستان، عێراقە. لەم سیاسەتەدا «ئێمە» و «ـمان» مەبەست لێی OdooVastە.",
          "ئەم سیاسەتە ماڵپەڕی www.odoovast.com و ئەو ڕێگا ڕاستەوخۆیانەی پەیوەندی دەگرێتەوە کە لێی نووسراون. هەروەها بە شێوەیەکی گشتی ڕوون دەکاتەوە چۆن مامەڵە لەگەڵ ئەو زانیارییانەدا دەکەین کە لەناو سیستەمێکی Odooدان کە بۆ کڕیارێک جێبەجێی دەکەین، هۆستی دەکەین یان پشتگیری دەکەین.",
        ],
      },
    },
    {
      id: "what-the-site-collects",
      heading: {
        en: "What this website collects",
        ar: "ما الذي يجمعه هذا الموقع",
        ckb: "ئەم ماڵپەڕە چی کۆدەکاتەوە",
      },
      body: {
        en: [
          "Nothing, directly. The site is a set of static pages. It has no user accounts, no database, no comment system, no advertising and no tracking scripts. It sets no cookies and saves nothing in your browser.",
          "The fonts are served from this domain rather than from a font provider, so opening a page does not announce your visit to a third party.",
          "Like any website, the server that delivers these pages keeps short technical logs — IP address, the page requested, browser type, the time — for security and for keeping the site online. Our hosting provider records those. We do not use them to build a profile of you and we do not connect them to any person.",
        ],
        ar: [
          "لا شيء بشكل مباشر. الموقع مجموعة صفحات ثابتة، بلا حسابات مستخدمين ولا قاعدة بيانات ولا نظام تعليقات ولا إعلانات ولا نصوص تتبّع. لا يضع ملفات تعريف ارتباط ولا يحفظ شيئاً في متصفحك.",
          "تُقدَّم الخطوط من هذا النطاق لا من مزوّد خطوط خارجي، لذا فإن فتح أي صفحة لا يُعلم أي طرف ثالث بزيارتك.",
          "وكما هو الحال في أي موقع، يحتفظ الخادم الذي يقدّم هذه الصفحات بسجلات تقنية قصيرة — عنوان IP والصفحة المطلوبة ونوع المتصفح والوقت — لأغراض الأمان واستمرارية الموقع. يسجّلها مزوّد الاستضافة لدينا. نحن لا نستخدمها لبناء ملف عنك ولا نربطها بأي شخص.",
        ],
        ckb: [
          "هیچ شتێک بە ڕاستەوخۆ. ماڵپەڕەکە کۆمەڵێک لاپەڕەی جێگیرە. نە هەژماری بەکارهێنەری هەیە، نە بنکەدراوە، نە سیستەمی لێدوان، نە ڕیکلام و نە سکریپتی چاودێری. هیچ کۆکیەک دانانێت و هیچ شتێک لە وێبگەڕەکەتدا هەڵناگرێت.",
          "فۆنتەکان لەم دۆمەینەوە پێشکەش دەکرێن نەک لە دابینکەرێکی دەرەکی، بۆیە کردنەوەی لاپەڕەیەک سەردانەکەت بە لایەنی سێیەم ڕانەدەگەیەنێت.",
          "وەک هەموو ماڵپەڕێک، ئەو سێرڤەرەی ئەم لاپەڕانە پێشکەش دەکات تۆمارێکی تەکنیکی کورت هەڵدەگرێت — ناونیشانی IP، ئەو لاپەڕەی داواکراوە، جۆری وێبگەڕ و کات — بۆ ئاسایش و بۆ ئەوەی ماڵپەڕەکە لەسەر خەت بمێنێتەوە. دابینکەری هۆستینگەکەمان ئەمانە تۆمار دەکات. ئێمە بۆ دروستکردنی پرۆفایلێک دەربارەت بەکاریان ناهێنین و بە هیچ کەسێکەوە پەیوەستیان ناکەین.",
        ],
      },
    },
    {
      id: "contact-form",
      heading: {
        en: "The contact form",
        ar: "نموذج التواصل",
        ckb: "فۆڕمی پەیوەندی",
      },
      body: {
        en: [
          "The form checks the fields in your browser and then opens WhatsApp with your name, company, phone number and message already written out. Nothing is submitted to this website, and nothing is saved here.",
          "The message reaches us only if you press send in WhatsApp. From that moment it is a WhatsApp message, and Meta's own privacy policy applies to it alongside this one.",
        ],
        ar: [
          "يتحقق النموذج من الحقول داخل متصفحك ثم يفتح واتساب واسمك وشركتك ورقم هاتفك ورسالتك مكتوبة سلفاً. لا يُرسَل شيء إلى هذا الموقع ولا يُحفَظ فيه شيء.",
          "لا تصلنا الرسالة إلا إذا ضغطت «إرسال» داخل واتساب. ومنذ تلك اللحظة تصبح رسالة واتساب، وتنطبق عليها سياسة خصوصية Meta إلى جانب هذه السياسة.",
        ],
        ckb: [
          "فۆڕمەکە خانەکان لە وێبگەڕەکەی خۆتدا پشکنین دەکات و پاشان واتسئاپ دەکاتەوە بە ناو، کۆمپانیا، ژمارەی مۆبایل و نامەکەتەوە، هەموویان پێشوەخت نووسراون. هیچ شتێک بۆ ئەم ماڵپەڕە نانێردرێت و هیچ شتێک لێرە هەڵناگیرێت.",
          "نامەکە تەنها کاتێک پێمان دەگات کە لە واتسئاپدا «ناردن» دابگریت. لەو ساتەوە دەبێتە نامەیەکی واتسئاپ و سیاسەتی تایبەتێتی Meta لەگەڵ ئەم سیاسەتەدا بەسەریدا جێبەجێ دەبێت.",
        ],
      },
    },
    {
      id: "meta-lead-ads",
      heading: {
        en: "Facebook and Instagram lead forms",
        ar: "نماذج التواصل في إعلانات فيسبوك وإنستغرام",
        ckb: "فۆڕمەکانی پەیوەندی لە ڕیکلامی Facebook و Instagram",
      },
      body: {
        en: [
          "We advertise on Facebook and Instagram, and some of those ads carry a lead form you can fill in without leaving the app. If you submit one, Meta passes us what you entered — usually your name, phone number, email address and company. This section is the disclosure Meta's Lead Ads terms require us to make, and it is binding on us.",
        ],
        ar: [
          "نحن نعلن على فيسبوك وإنستغرام، وتتضمن بعض تلك الإعلانات نموذج تواصل يمكنك تعبئته دون مغادرة التطبيق. وإذا أرسلت النموذج، تنقل إلينا Meta ما أدخلته — عادةً اسمك ورقم هاتفك وبريدك الإلكتروني واسم شركتك. وهذا البند هو الإفصاح الذي تُلزمنا به شروط إعلانات العملاء المحتملين لدى Meta، وهو ملزم لنا.",
        ],
        ckb: [
          "ئێمە لە Facebook و Instagram ڕیکلام دەکەین، و هەندێک لەو ڕیکلامانە فۆڕمێکی پەیوەندییان پێیە کە دەتوانیت بەبێ دەرچوون لە ئەپەکە پڕی بکەیتەوە. ئەگەر یەکێکیان بنێریت، Meta ئەوەی نووسیوتە دەیگەیەنێتە ئێمە — بەزۆری ناو، ژمارەی مۆبایل، ئیمەیڵ و ناوی کۆمپانیا. ئەم بەشە ئەو ڕوونکردنەوەیەیە کە مەرجەکانی Lead Adsی Meta ناچارمان دەکەن بیدەین، و پابەندمان دەکات.",
        ],
      },
      defs: [
        {
          term: {
            en: "What we do with it",
            ar: "ما نفعله بها",
            ckb: "چی پێدەکەین",
          },
          body: {
            en: "We contact you about the thing you asked for — a consultation, a quotation, a demonstration — and nothing else. If we later want to use your details for a different purpose, we ask you first.",
            ar: "نتواصل معك بشأن ما طلبته — استشارة أو عرض سعر أو عرض توضيحي — ولا شيء غير ذلك. وإن أردنا لاحقاً استخدام بياناتك لغرض مختلف، نسألك أولاً.",
            ckb: "دەربارەی ئەو شتەی داوات کردووە پەیوەندیت پێوە دەکەین — ڕاوێژکاری، نرخنامە، پیشاندان — و هیچی تر. ئەگەر دواتر بمانەوێت زانیارییەکانت بۆ مەبەستێکی جیاواز بەکاربهێنین، سەرەتا لێت دەپرسین.",
          },
        },
        {
          term: {
            en: "We never sell it",
            ar: "لا نبيعها أبداً",
            ckb: "هەرگیز نایفرۆشین",
          },
          body: {
            en: "Lead data is never sold, rented, or passed to a data broker, a list aggregator or another advertiser, under any circumstances. Meta's terms forbid it and so do we.",
            ar: "لا تُباع بيانات العملاء المحتملين ولا تُؤجَّر ولا تُمرَّر إلى وسيط بيانات أو مجمِّع قوائم أو معلن آخر، تحت أي ظرف. شروط Meta تمنع ذلك، ونحن كذلك.",
            ckb: "داتای کڕیاری چاوەڕوانکراو هەرگیز نافرۆشرێت، بەکرێ نادرێت و ناگوازرێتەوە بۆ دەلاڵی داتا، کۆکەرەوەی لیست یان ڕیکلامکەرێکی تر، لە هیچ حاڵەتێکدا. مەرجەکانی Meta قەدەغەی دەکەن و ئێمەش هەروا.",
          },
        },
        {
          term: {
            en: "We do not mix it",
            ar: "لا نخلطها",
            ckb: "تێکەڵی ناکەین",
          },
          body: {
            en: "Your lead is kept as what it is — an enquiry to OdooVast. We do not merge it with data from any other advertiser or build a profile out of it.",
            ar: "يبقى استفسارك كما هو — استفساراً موجّهاً إلى OdooVast. ولا ندمجه ببيانات أي معلن آخر ولا نبني منه ملفاً عنك.",
            ckb: "داواکەت وەک خۆی دەمێنێتەوە — پرسیارێک بۆ OdooVast. لەگەڵ داتای هیچ ڕیکلامکەرێکی تر تێکەڵی ناکەین و پرۆفایلێکی لێ دروست ناکەین.",
          },
        },
        {
          term: {
            en: "Who else sees it",
            ar: "من يطّلع عليها أيضاً",
            ckb: "کێی تر دەیبینێت",
          },
          body: {
            en: "Only the people at OdooVast who handle enquiries, and the service providers that carry our email and messaging — under confidentiality, and only for this same purpose.",
            ar: "فقط العاملون في OdooVast الذين يتولّون الاستفسارات، ومزوّدو الخدمات الذين ينقلون بريدنا ورسائلنا — بموجب السرية ولهذا الغرض نفسه فقط.",
            ckb: "تەنها ئەو کەسانەی لە OdooVast مامەڵە لەگەڵ پرسیارەکان دەکەن، و ئەو دابینکەرانەی خزمەتگوزاری کە ئیمەیڵ و نامەکانمان دەگوازنەوە — لەژێر نهێنیپارێزیدا و تەنها بۆ هەمان ئەم مەبەستە.",
          },
        },
        {
          term: {
            en: "Meta's side of it",
            ar: "ما يخص Meta",
            ckb: "لایەنی Meta",
          },
          body: {
            en: "What Meta itself records about you — the ad you saw, your account, your activity — is governed by Meta's own privacy policy, not by ours. We cannot delete anything on Meta's side for you.",
            ar: "أما ما تسجّله Meta نفسها عنك — الإعلان الذي شاهدته وحسابك ونشاطك — فتحكمه سياسة خصوصية Meta لا سياستنا. ولا يمكننا حذف أي شيء لدى Meta نيابةً عنك.",
            ckb: "ئەوەی خودی Meta دەربارەت تۆمار دەکات — ئەو ڕیکلامەی بینیوتە، هەژمارەکەت، چالاکییەکەت — بەپێی سیاسەتی تایبەتێتی خودی Meta ڕێکدەخرێت نەک هی ئێمە. ناتوانین هیچ شتێک لەلای Meta بۆت بسڕینەوە.",
          },
        },
      ],
      links: [
        {
          key: "dataDeletion",
          label: {
            en: "Delete a lead you submitted",
            ar: "احذف استفساراً أرسلته",
            ckb: "ئەو داواکارییەی ناردووتە بیسڕەوە",
          },
        },
      ],
    },
    {
      id: "when-you-contact-us",
      heading: {
        en: "What you give us when you get in touch",
        ar: "ما تقدّمه لنا عند التواصل",
        ckb: "کاتێک پەیوەندیمان پێوە دەکەیت چیمان دەدەیتێ",
      },
      body: {
        en: [
          "When you message us on WhatsApp, call us or write to us by email, we receive whatever you choose to include — usually your name, your company, a phone number, an email address and a description of what you need.",
          "We use it to answer you, to prepare a proposal, and to keep a record of what was discussed and agreed. We do not sell it, rent it or share it for marketing, and we do not add you to any mailing list you did not ask for.",
        ],
        ar: [
          "حين تراسلنا عبر واتساب أو تتصل بنا أو تكتب إلينا بالبريد الإلكتروني، نتلقى ما تختار تضمينه — عادةً اسمك واسم شركتك ورقم هاتف وبريداً إلكترونياً ووصفاً لما تحتاجه.",
          "نستخدم ذلك للرد عليك وإعداد عرض وحفظ سجل بما جرى نقاشه والاتفاق عليه. لا نبيعه ولا نؤجّره ولا نشاركه لأغراض تسويقية، ولا نضيفك إلى أي قائمة بريدية لم تطلبها.",
        ],
        ckb: [
          "کاتێک لە واتسئاپدا نامەمان بۆ دەنێریت، پەیوەندیمان پێوە دەکەیت یان بە ئیمەیڵ بۆمان دەنووسیت، ئەوەمان پێدەگات کە خۆت هەڵیدەبژێریت — بەزۆری ناو، کۆمپانیا، ژمارەی مۆبایل، ئیمەیڵ و باسکردنی ئەوەی پێویستتە.",
          "بەکاری دەهێنین بۆ وەڵامدانەوەت، ئامادەکردنی پێشنیارێک، و هەڵگرتنی تۆمارێک لەوەی باسکراوە و ڕێککەوتنی لەسەر کراوە. نایفرۆشین، بەکرێی نادەین و بۆ بازاڕکردن هاوبەشی ناکەین، و ناتخەینە هیچ لیستێکی ئیمەیڵەوە کە داوات نەکردبێت.",
        ],
      },
    },
    {
      id: "clients",
      heading: {
        en: "Information we hold about clients",
        ar: "المعلومات التي نحتفظ بها عن العملاء",
        ckb: "ئەو زانیاریانەی دەربارەی کڕیارەکان هەڵیدەگرین",
      },
      body: {
        en: [
          "Once you engage us, we hold the ordinary records of a business relationship: contact details for the people we work with, proposals and contracts, invoices and payment records, project notes, support tickets and training material.",
          "Implementation, data migration and support work can give us access to data inside your Odoo system, including records about your staff and your own customers. For that data you are the controller and we act on your instructions. We open it only where the work requires it, only for as long as the work requires it, and never for any other purpose.",
          "Where we host a system on your behalf, the same applies to its backups.",
        ],
        ar: [
          "بمجرد التعاقد معنا، نحتفظ بالسجلات المعتادة لعلاقة عمل: بيانات التواصل للأشخاص الذين نعمل معهم، والعروض والعقود، والفواتير وسجلات الدفع، وملاحظات المشروع، وتذاكر الدعم، والمواد التدريبية.",
          "قد يتيح لنا التنفيذ وترحيل البيانات وأعمال الدعم الوصول إلى بيانات داخل نظام Odoo الخاص بك، بما فيها سجلات عن موظفيك وعملائك. أنت المتحكّم بتلك البيانات ونحن نعمل وفق تعليماتك. لا نطّلع عليها إلا بالقدر الذي يتطلبه العمل، وللمدة التي يتطلبها فقط، ولا نستخدمها لأي غرض آخر.",
          "وحين نستضيف نظاماً نيابةً عنك، ينطبق الأمر نفسه على نسخه الاحتياطية.",
        ],
        ckb: [
          "کاتێک گرێبەستمان لەگەڵ دەکەیت، ئەو تۆمارە ئاساییانەی پەیوەندییەکی کاری هەڵدەگرین: زانیاری پەیوەندی ئەو کەسانەی لەگەڵیان کار دەکەین، پێشنیار و گرێبەست، پسووڵە و تۆماری پارەدان، تێبینی پڕۆژە، بلیتی پشتگیری و کەرەستەی ڕاهێنان.",
          "جێبەجێکردن، گواستنەوەی داتا و کاری پشتگیری لەوانەیە ڕێگەمان بدات بگەینە ئەو داتایانەی ناو سیستەمی Odooی تۆ، لەوانە تۆمار دەربارەی ستافەکەت و کڕیارەکانی خۆت. بۆ ئەو داتایە تۆ کۆنترۆڵکەریت و ئێمە بەپێی ڕێنماییەکانی تۆ کار دەکەین. تەنها ئەو کاتە دەیکەینەوە کە کارەکە پێویستی پێیەتی، تەنها بۆ ئەو ماوەیەی کارەکە پێویستی پێیەتی، و هەرگیز بۆ هیچ مەبەستێکی تر.",
          "لەو حاڵەتەی سیستەمێک لە جیاتی تۆ هۆست دەکەین، هەمان شت بەسەر باکئەپەکانیدا جێبەجێ دەبێت.",
        ],
      },
    },
    {
      id: "third-parties",
      heading: {
        en: "Third parties your browser reaches",
        ar: "الأطراف الخارجية التي يتصل بها متصفحك",
        ckb: "ئەو لایەنە دەرەکییانەی وێبگەڕەکەت پەیوەندییان پێوە دەکات",
      },
      defs: [
        {
          term: { en: "Hosting", ar: "الاستضافة", ckb: "هۆستینگ" },
          body: {
            en: "Our hosting provider delivers these pages and keeps the short technical server logs described above.",
            ar: "يقدّم مزوّد الاستضافة لدينا هذه الصفحات ويحتفظ بسجلات الخادم التقنية القصيرة الموضحة أعلاه.",
            ckb: "دابینکەری هۆستینگەکەمان ئەم لاپەڕانە پێشکەش دەکات و ئەو تۆمارە تەکنیکییە کورتانەی سێرڤەر هەڵدەگرێت کە لە سەرەوە باسکران.",
          },
        },
        {
          term: { en: "WhatsApp (Meta)", ar: "واتساب (Meta)", ckb: "واتسئاپ (Meta)" },
          body: {
            en: "Carries the messages you send us. Everything in them is handled under Meta's terms as well as ours.",
            ar: "ينقل الرسائل التي ترسلها إلينا. وكل ما فيها يخضع لشروط Meta إلى جانب شروطنا.",
            ckb: "ئەو نامانە دەگوازێتەوە کە بۆمان دەنێریت. هەرچی تێیدایە لەژێر مەرجەکانی Meta و ئێمەدا مامەڵەی لەگەڵ دەکرێت.",
          },
        },
        {
          term: { en: "Google Maps", ar: "خرائط جوجل", ckb: "Google Maps" },
          body: {
            en: "The contact page embeds a map. Loading that page gives Google your IP address, and Google may read or set its own cookies. If you would rather it did not, use the written address and the directions link instead.",
            ar: "تتضمّن صفحة التواصل خريطة مدمجة. تحميل تلك الصفحة يعطي جوجل عنوان IP الخاص بك، وقد تقرأ جوجل أو تضع ملفات تعريف ارتباط خاصة بها. إن كنت تفضّل خلاف ذلك، استخدم العنوان المكتوب ورابط الاتجاهات بدلاً منها.",
            ckb: "لاپەڕەی پەیوەندی نەخشەیەکی تێدا جێگیرکراوە. بارکردنی ئەو لاپەڕەیە ناونیشانی IPی تۆ دەداتە Google، و لەوانەیە Google کۆکی خۆی بخوێنێتەوە یان دایبنێت. ئەگەر پێت باشتر نییە، لە جیاتی ئەوە ناونیشانە نووسراوەکە و لینکی ڕێنیشاندەر بەکاربهێنە.",
          },
        },
        {
          term: { en: "LinkedIn and Facebook", ar: "لينكدإن وفيسبوك", ckb: "LinkedIn و Facebook" },
          body: {
            en: "We link to our pages there. Following a link takes you onto that platform under its own policy, and we cannot see who clicked.",
            ar: "نضع روابط إلى صفحاتنا هناك. اتباع الرابط ينقلك إلى تلك المنصة وفق سياستها الخاصة، ولا يمكننا معرفة من ضغط عليه.",
            ckb: "لینکی لاپەڕەکانمان لەوێ دادەنێین. کلیککردن لە لینکێک دەتباتە سەر ئەو پلاتفۆرمە بەپێی سیاسەتی خۆی، و ئێمە ناتوانین بزانین کێ کلیکی کردووە.",
          },
        },
      ],
      body: {
        en: [
          "This website itself carries no advertising script, no analytics product, no tracking pixel and no chat widget. We do advertise on Meta's platforms, but that happens there rather than here — the section above covers it.",
        ],
        ar: [
          "هذا الموقع نفسه لا يحمل أي نص إعلاني ولا أداة تحليلات ولا بكسل تتبّع ولا أداة محادثة. ونحن نعلن فعلاً على منصات Meta، لكن ذلك يجري هناك لا هنا — والبند أعلاه يغطّيه.",
        ],
        ckb: [
          "خودی ئەم ماڵپەڕە هیچ سکریپتێکی ڕیکلام، هیچ بەرهەمێکی شیکاری، هیچ پیکسلێکی چاودێری و هیچ ویجێتێکی چاتی پێوە نییە. ئێمە بەڕاستی لە پلاتفۆرمەکانی Meta ڕیکلام دەکەین، بەڵام ئەوە لەوێ ڕوودەدات نەک لێرە — بەشی سەرەوە باسی دەکات.",
        ],
      },
    },
    {
      id: "cookies",
      heading: {
        en: "Cookies",
        ar: "ملفات تعريف الارتباط",
        ckb: "کۆکییەکان",
      },
      body: {
        en: [
          "This website sets no cookies of its own, which is why it never asks you to accept any — there is nothing to accept. The only cookies that can appear come from the embedded Google map on the contact page, and blocking them in your browser breaks nothing else on this site.",
        ],
        ar: [
          "هذا الموقع لا يضع ملفات تعريف ارتباط خاصة به، ولهذا لا يطلب منك الموافقة على شيء — إذ لا يوجد ما توافق عليه. وملفات تعريف الارتباط الوحيدة التي قد تظهر مصدرها خريطة جوجل المدمجة في صفحة التواصل، وحجبها من متصفحك لا يعطّل أي شيء آخر في الموقع.",
        ],
        ckb: [
          "ئەم ماڵپەڕە هیچ کۆکیەکی خۆی دانانێت، بۆیە هەرگیز داوات لێ ناکات ڕەزامەندی دەربڕیت — هیچ شتێک نییە ڕەزامەندی لەسەر دەربڕیت. تەنها ئەو کۆکیانەی دەتوانن دەربکەون لە نەخشەی جێگیرکراوی Googleەوە دێن لە لاپەڕەی پەیوەندیدا، و بلۆککردنیان لە وێبگەڕەکەتدا هیچ شتێکی تری ئەم ماڵپەڕە تێک نادات.",
        ],
      },
    },
    {
      id: "why-we-hold-it",
      heading: {
        en: "Why we are entitled to hold it",
        ar: "على أي أساس نحتفظ بها",
        ckb: "بۆچی مافی هەڵگرتنمان هەیە",
      },
      points: {
        en: [
          "Because you asked us to do something — answer a question, prepare a quotation, run a project.",
          "Because a contract with you requires it.",
          "Because Iraqi law requires it, tax and accounting records above all.",
          "Because we have a legitimate interest in keeping our own records, securing our systems and defending a claim.",
        ],
        ar: [
          "لأنك طلبت منا شيئاً — الإجابة عن سؤال أو إعداد عرض سعر أو تنفيذ مشروع.",
          "لأن عقداً معك يقتضي ذلك.",
          "لأن القانون العراقي يوجب ذلك، وفي مقدّمته السجلات الضريبية والمحاسبية.",
          "لأن لنا مصلحة مشروعة في حفظ سجلاتنا وتأمين أنظمتنا والدفاع عن أي مطالبة.",
        ],
        ckb: [
          "چونکە داوات لێکردین شتێک بکەین — وەڵامی پرسیارێک، ئامادەکردنی نرخنامەیەک، بەڕێوەبردنی پڕۆژەیەک.",
          "چونکە گرێبەستێک لەگەڵت پێویستی بەوە دەکات.",
          "چونکە یاسای عێراق داوای دەکات، بەتایبەتی تۆماری باج و ژمێریاری.",
          "چونکە بەرژەوەندییەکی ڕەوامان هەیە لە هەڵگرتنی تۆمارەکانی خۆمان، پاراستنی سیستەمەکانمان و بەرگریکردن لە داواکارییەک.",
        ],
      },
      body: {
        en: [
          "If the law where you live gives you specific rights over your personal data — the GDPR in the European Union, for example — we honour those rights, and the section below explains how to use them.",
        ],
        ar: [
          "وإذا كان قانون بلد إقامتك يمنحك حقوقاً محددة على بياناتك الشخصية — كاللائحة العامة لحماية البيانات في الاتحاد الأوروبي — فنحن نحترم تلك الحقوق، ويوضّح القسم أدناه كيفية استخدامها.",
        ],
        ckb: [
          "ئەگەر یاسای ئەو وڵاتەی تێیدا دەژیت مافی دیاریکراوت لەسەر داتا کەسییەکەت پێبدات — وەک GDPR لە یەکێتی ئەوروپا — ئێمە ڕێز لەو مافانە دەگرین، و بەشی خوارەوە ڕوون دەکاتەوە چۆن بەکاریان بهێنیت.",
        ],
      },
    },
    {
      id: "retention",
      heading: {
        en: "How long we keep it",
        ar: "مدة الاحتفاظ",
        ckb: "چەند ماوەیەک هەڵیدەگرین",
      },
      points: {
        en: [
          "Enquiries that do not become projects — deleted at the latest 24 months after the last message, and sooner if you ask.",
          "Client records — for the life of the engagement, then for as long as Iraqi tax and accounting rules oblige us to keep them, and no longer.",
          "Access to a client's Odoo data — withdrawn when the engagement or the specific task ends.",
          "Server logs — only for the short period our hosting provider retains them.",
        ],
        ar: [
          "الاستفسارات التي لا تتحوّل إلى مشاريع — تُحذف خلال 24 شهراً من آخر رسالة كحد أقصى، وقبل ذلك إن طلبت.",
          "سجلات العملاء — طوال مدة التعاقد، ثم للمدة التي تُلزمنا بها القواعد الضريبية والمحاسبية العراقية، ولا تزيد عنها.",
          "الوصول إلى بيانات Odoo الخاصة بالعميل — يُسحب عند انتهاء التعاقد أو المهمة المحددة.",
          "سجلات الخادم — للفترة القصيرة التي يحتفظ بها مزوّد الاستضافة فقط.",
        ],
        ckb: [
          "ئەو پرسیارانەی نابنە پڕۆژە — بەدواترین کات ٢٤ مانگ دوای دوا نامە دەسڕێنەوە، و زووتریش ئەگەر داوا بکەیت.",
          "تۆماری کڕیارەکان — بە درێژایی ماوەی هاوکاری، پاشان بۆ ئەو ماوەیەی یاسای باج و ژمێریاری عێراق ناچارمان دەکات هەڵیبگرین، نەک زیاتر.",
          "دەستگەیشتن بە داتای Odooی کڕیار — کاتێک هاوکارییەکە یان ئەرکە دیاریکراوەکە کۆتایی دێت هەڵدەگیرێتەوە.",
          "تۆماری سێرڤەر — تەنها بۆ ئەو ماوە کورتەی دابینکەری هۆستینگەکەمان هەڵیدەگرێت.",
        ],
      },
    },
    {
      id: "security",
      heading: {
        en: "How we protect it",
        ar: "كيف نحميها",
        ckb: "چۆن دەیپارێزین",
      },
      body: {
        en: [
          "Access is granted on a need-to-know basis, accounts are protected by strong authentication, connections are encrypted, and the devices we control are kept patched.",
          "Everyone at OdooVast who touches client data is bound to confidentiality, and that obligation outlasts their work with us.",
          "No system is perfectly secure and we will not pretend otherwise. If a breach affects your information, we will tell you — and the relevant authority where we are required to — and we will say what happened without waiting to be asked.",
        ],
        ar: [
          "يُمنح الوصول على أساس الحاجة إلى المعرفة، وتُحمى الحسابات بمصادقة قوية، والاتصالات مشفّرة، والأجهزة التي نتحكم بها محدَّثة باستمرار.",
          "كل من يتعامل مع بيانات العملاء في OdooVast ملتزم بالسرية، ويستمر هذا الالتزام بعد انتهاء عمله معنا.",
          "لا يوجد نظام آمن تماماً ولن ندّعي خلاف ذلك. وإذا وقع اختراق يمسّ معلوماتك، سنخبرك — ونخبر الجهة المختصة حيثما يُلزمنا القانون — وسنوضّح ما حدث دون أن تضطر إلى السؤال.",
        ],
        ckb: [
          "دەستگەیشتن تەنها بەپێی پێویستی کار دەدرێت، هەژمارەکان بە ڕێگەپێدانی بەهێز پارێزراون، پەیوەندییەکان شفرەکراون، و ئەو ئامێرانەی لەژێر کۆنترۆڵمانن بەردەوام نوێ دەکرێنەوە.",
          "هەرکەسێک لە OdooVast دەست لە داتای کڕیار بدات پابەندی نهێنیپارێزییە، و ئەو پابەندییە دوای کۆتاییهاتنی کارەکەشی لەگەڵمان بەردەوام دەبێت.",
          "هیچ سیستەمێک بە تەواوی پارێزراو نییە و ئێمە شتی تر ناڵێین. ئەگەر پێشێلکارییەک کاریگەری لەسەر زانیارییەکانت هەبوو، پێت دەڵێین — و بە دەسەڵاتدارە پەیوەندیدارەکەش دەڵێین لەو حاڵەتانەی پێویستە — و ڕوونی دەکەینەوە چی ڕوویداوە بەبێ ئەوەی چاوەڕێی پرسیارت بکەین.",
        ],
      },
    },
    {
      id: "sharing",
      heading: {
        en: "When we share information",
        ar: "متى نشارك المعلومات",
        ckb: "کەی زانیاری هاوبەش دەکەین",
      },
      body: {
        en: [
          "We do not sell personal information, in any form, to anyone. We share it only in these situations:",
        ],
        ar: [
          "نحن لا نبيع المعلومات الشخصية بأي شكل ولأي جهة. ولا نشاركها إلا في الحالات التالية:",
        ],
        ckb: [
          "ئێمە زانیاری کەسی بە هیچ شێوەیەک و بە هیچ کەسێک نافرۆشین. تەنها لەم حاڵەتانەدا هاوبەشی دەکەین:",
        ],
      },
      points: {
        en: [
          "With the service providers that make our work possible — hosting, email and the services named above — under confidentiality.",
          "With Odoo S.A. where a licence or an official partner process requires it, for example to register your subscription.",
          "Where the law, or a competent court in Iraq, compels us.",
          "Where it is necessary to establish, exercise or defend a legal claim.",
        ],
        ar: [
          "مع مزوّدي الخدمات الذين يمكّنوننا من العمل — الاستضافة والبريد الإلكتروني والخدمات المذكورة أعلاه — بموجب التزام بالسرية.",
          "مع Odoo S.A. حين يقتضي ذلك ترخيص أو إجراء رسمي للشراكة، كتسجيل اشتراكك مثلاً.",
          "حين يُلزمنا القانون أو محكمة مختصة في العراق.",
          "حين يكون ذلك ضرورياً لإثبات حق قانوني أو ممارسته أو الدفاع عنه.",
        ],
        ckb: [
          "لەگەڵ ئەو دابینکەرانەی خزمەتگوزاری کە کارەکەمان دەکەنە شتێکی شیاو — هۆستینگ، ئیمەیڵ و ئەو خزمەتگوزارییانەی لە سەرەوە ناویان هاتووە — لەژێر پابەندی نهێنیپارێزیدا.",
          "لەگەڵ Odoo S.A. لەو حاڵەتانەی مۆڵەتێک یان پڕۆسەیەکی فەرمی هاوبەشی داوای دەکات، بۆ نموونە تۆمارکردنی بەشداربوونەکەت.",
          "لەو حاڵەتانەی یاسا، یان دادگایەکی شیاو لە عێراق، ناچارمان دەکات.",
          "لەو حاڵەتانەی پێویستە بۆ دامەزراندن، بەکارهێنان یان بەرگریکردن لە داواکارییەکی یاسایی.",
        ],
      },
    },
    {
      id: "your-rights",
      heading: {
        en: "Your rights",
        ar: "حقوقك",
        ckb: "مافەکانت",
      },
      body: {
        en: [
          "You may ask us what we hold about you, ask for a copy of it, ask us to correct it, ask us to delete it, ask us to stop using it for a particular purpose, or ask us to stop contacting you.",
          "Write to info@odoovast.com or send the request on WhatsApp. We answer within 30 days, usually much sooner, and we do not charge for it.",
          "We may first need to confirm who you are, so that nobody can obtain or erase your information by pretending to be you.",
        ],
        ar: [
          "يمكنك أن تسألنا عمّا نحتفظ به عنك، وأن تطلب نسخة منه، وأن تطلب تصحيحه أو حذفه، وأن تطلب التوقف عن استخدامه لغرض معيّن، أو التوقف عن التواصل معك.",
          "اكتب إلى info@odoovast.com أو أرسل الطلب عبر واتساب. نردّ خلال 30 يوماً، وعادةً قبل ذلك بكثير، ولا نتقاضى مقابلاً.",
          "قد نحتاج أولاً إلى التأكد من هويتك، حتى لا يتمكن أحد من الحصول على معلوماتك أو محوها بانتحال شخصيتك.",
        ],
        ckb: [
          "دەتوانیت لێمان بپرسیت چیمان دەربارەت هەیە، داوای کۆپییەکی بکەیت، داوا بکەیت ڕاستی بکەینەوە، داوای سڕینەوەی بکەیت، داوا بکەیت بۆ مەبەستێکی دیاریکراو بەکاری نەهێنین، یان داوا بکەیت چیتر پەیوەندیت پێوە نەکەین.",
          "بۆ info@odoovast.com بنووسە یان داواکەت بە واتسئاپ بنێرە. لە ماوەی ٣٠ ڕۆژدا وەڵام دەدەینەوە، بەزۆری زۆر زووتر، و هیچ پارەیەکی لەسەر وەرناگرین.",
          "لەوانەیە سەرەتا پێویست بێت دڵنیا بینەوە کە تۆ کێیت، تاوەکو کەس نەتوانێت بە خۆدەرخستن وەک تۆ زانیارییەکانت بەدەست بهێنێت یان بیسڕێتەوە.",
        ],
      },
      links: [
        {
          key: "dataDeletion",
          label: {
            en: "How to have your data deleted",
            ar: "كيف تطلب حذف بياناتك",
            ckb: "چۆن داوای سڕینەوەی داتاکەت بکەیت",
          },
        },
      ],
    },
    {
      id: "children",
      heading: {
        en: "Children",
        ar: "الأطفال",
        ckb: "منداڵان",
      },
      body: {
        en: [
          "Our services are sold to businesses and this website is not directed at children. We do not knowingly collect information about anyone under 16. If you believe we have, tell us and we will delete it.",
        ],
        ar: [
          "خدماتنا تُقدَّم للشركات، وهذا الموقع غير موجّه للأطفال. ولا نجمع عن عِلم معلومات عن أي شخص دون السادسة عشرة. وإن كنت تعتقد أننا فعلنا، فأخبرنا وسنحذفها.",
        ],
        ckb: [
          "خزمەتگوزارییەکانمان بۆ کۆمپانیاکان دەفرۆشرێن و ئەم ماڵپەڕە ڕووی لە منداڵان نییە. بە ئەنقەست زانیاری دەربارەی هیچ کەسێکی خوار ١٦ ساڵ کۆناکەینەوە. ئەگەر پێت وایە کردوومانە، پێمان بڵێ و دەیسڕینەوە.",
        ],
      },
    },
    {
      id: "transfers",
      heading: {
        en: "Where your information is held",
        ar: "أين تُحفظ معلوماتك",
        ckb: "زانیارییەکانت لە کوێ هەڵدەگیرێن",
      },
      body: {
        en: [
          "We are in Iraq, and some of the services we rely on — hosting, email, WhatsApp — keep data on servers outside Iraq. Sending us a message means accepting that it travels that way. We choose providers that commit to recognised security standards.",
        ],
        ar: [
          "مقرّنا في العراق، وبعض الخدمات التي نعتمد عليها — الاستضافة والبريد الإلكتروني وواتساب — تحفظ البيانات على خوادم خارج العراق. وإرسال رسالة إلينا يعني قبولك أن تنتقل بهذه الطريقة. ونحن نختار مزوّدين يلتزمون بمعايير أمنية معترف بها.",
        ],
        ckb: [
          "ئێمە لە عێراقین، و هەندێک لەو خزمەتگوزارییانەی پشتیان پێدەبەستین — هۆستینگ، ئیمەیڵ، واتسئاپ — داتا لەسەر سێرڤەری دەرەوەی عێراق هەڵدەگرن. ناردنی نامەیەک بۆ ئێمە واتای ئەوەیە قبووڵت کردووە بەم شێوەیە بگوازرێتەوە. ئێمە ئەو دابینکەرانە هەڵدەبژێرین کە پابەندن بە ستانداردە ئاسایشییە ناسراوەکان.",
        ],
      },
    },
    {
      id: "changes",
      heading: {
        en: "Changes to this policy",
        ar: "التعديلات على هذه السياسة",
        ckb: "گۆڕانکاری لەم سیاسەتەدا",
      },
      body: {
        en: [
          "If we change how we handle personal information, we update this page and change the date at the top. Material changes stay flagged here for a reasonable period. The version on this page is always the one in force.",
        ],
        ar: [
          "إذا غيّرنا طريقة تعاملنا مع المعلومات الشخصية، نحدّث هذه الصفحة ونغيّر التاريخ في أعلاها. وتبقى التعديلات الجوهرية مُشار إليها هنا لمدة معقولة. والنسخة المنشورة على هذه الصفحة هي النافذة دائماً.",
        ],
        ckb: [
          "ئەگەر شێوازی مامەڵەکردنمان لەگەڵ زانیاری کەسی بگۆڕین، ئەم لاپەڕەیە نوێ دەکەینەوە و بەرواری سەرەوەی دەگۆڕین. گۆڕانکارییە گرنگەکان بۆ ماوەیەکی گونجاو لێرە دیاری دەکرێن. ئەو وەشانەی لەم لاپەڕەیەدایە هەمیشە ئەوەیە کە کاری پێدەکرێت.",
        ],
      },
    },
  ],
  contactTitle: {
    en: "Questions about privacy",
    ar: "أسئلة بخصوص الخصوصية",
    ckb: "پرسیار دەربارەی تایبەتێتی",
  },
  contactBody: {
    en: "Write to us and a person will answer — not a form. If our answer does not satisfy you, you may complain to the competent authority where you live.",
    ar: "راسلنا وسيجيبك شخص حقيقي، لا نموذج آلي. وإن لم يُرضِك ردّنا، يمكنك تقديم شكوى إلى الجهة المختصة في بلد إقامتك.",
    ckb: "بۆمان بنووسە و کەسێک وەڵامت دەداتەوە — نەک فۆڕمێک. ئەگەر وەڵامەکەمان ڕازی نەکردیت، دەتوانیت سکاڵا بەرزبکەیتەوە بۆ دەسەڵاتدارە پەیوەندیدارەکەی ئەو شوێنەی تێیدا دەژیت.",
  },
};

/* ------------------------------------------------------------------ terms */

export const terms: LegalDoc = {
  h1: {
    en: "Terms of Service",
    ar: "شروط الخدمة",
    ckb: "مەرجەکانی خزمەتگوزاری",
  },
  lead: {
    en: "The terms on which you may use this website, and how they relate to a signed project contract.",
    ar: "الشروط التي تستخدم بموجبها هذا الموقع، وعلاقتها بعقد المشروع الموقّع.",
    ckb: "ئەو مەرجانەی بەپێیان دەتوانیت ئەم ماڵپەڕە بەکاربهێنیت، و پەیوەندییان بە گرێبەستی واژووکراوی پڕۆژەوە.",
  },
  updatedIso: "2026-09-12",
  updated: {
    en: "12 September 2026",
    ar: "12 أيلول 2026",
    ckb: "١٢ی ئەیلوولی ٢٠٢٦",
  },
  summaryTitle: {
    en: "The short version",
    ar: "الخلاصة",
    ckb: "بە کورتی",
  },
  summary: {
    en: [
      "Using this website means accepting these terms. If you do not accept them, please do not use the site.",
      "Nothing here is a binding offer, a price, or a promise of a particular result. A project between us exists only once a contract is signed.",
      "OdooVast is an independent Odoo Partner. Odoo is a product and a trademark of Odoo S.A., a separate company.",
      "These terms are governed by the law in force in the Kurdistan Region of Iraq.",
    ],
    ar: [
      "استخدامك لهذا الموقع يعني قبولك لهذه الشروط. وإن لم تقبلها، فيرجى عدم استخدام الموقع.",
      "لا شيء هنا يُعدّ عرضاً ملزماً أو سعراً أو وعداً بنتيجة معيّنة. ولا ينشأ مشروع بيننا إلا بتوقيع عقد.",
      "OdooVast شركة مستقلة وشريك Odoo. وOdoo منتج وعلامة تجارية تخص شركة Odoo S.A.، وهي شركة منفصلة.",
      "تخضع هذه الشروط للقوانين النافذة في إقليم كردستان العراق.",
    ],
    ckb: [
      "بەکارهێنانی ئەم ماڵپەڕە واتای قبووڵکردنی ئەم مەرجانەیە. ئەگەر قبووڵت نین، تکایە ماڵپەڕەکە بەکارمەهێنە.",
      "هیچ شتێکی ئێرە پێشکەشکردنێکی پابەندکەر، نرخ، یان بەڵێنی ئەنجامێکی دیاریکراو نییە. پڕۆژەیەک لە نێوانماندا تەنها کاتێک هەیە کە گرێبەستێک واژوو بکرێت.",
      "OdooVast کۆمپانیایەکی سەربەخۆ و هاوبەشی Odooیە. Odoo بەرهەم و نیشانەی بازرگانی Odoo S.A.یە، کە کۆمپانیایەکی جیاوازە.",
      "ئەم مەرجانە بەپێی ئەو یاسایانەن کە لە هەرێمی کوردستانی عێراقدا کاریان پێدەکرێت.",
    ],
  },
  sections: [
    {
      id: "acceptance",
      heading: {
        en: "Accepting these terms",
        ar: "قبول هذه الشروط",
        ckb: "قبووڵکردنی ئەم مەرجانە",
      },
      body: {
        en: [
          "These terms form an agreement between you and OdooVast, an Odoo Partner based in Erbil, Kurdistan Region, Iraq. They apply every time you open www.odoovast.com or use anything on it.",
          "If you use the site on behalf of a company, you confirm that you are authorised to accept these terms for that company.",
          "If you do not agree with any part of them, stop using the site.",
        ],
        ar: [
          "تشكّل هذه الشروط اتفاقاً بينك وبين OdooVast، شريك Odoo ومقرّها أربيل، إقليم كردستان، العراق. وتسري في كل مرة تفتح فيها www.odoovast.com أو تستخدم أي شيء فيه.",
          "وإذا كنت تستخدم الموقع نيابةً عن شركة، فأنت تقرّ بأنك مخوّل بقبول هذه الشروط عنها.",
          "وإن لم توافق على أي جزء منها، فتوقّف عن استخدام الموقع.",
        ],
        ckb: [
          "ئەم مەرجانە ڕێککەوتنێک پێکدەهێنن لە نێوان تۆ و OdooVast، کە هاوبەشی Odooیە و بنکەکەی لە هەولێر، هەرێمی کوردستان، عێراقە. هەر جارێک www.odoovast.com بکەیتەوە یان هەر شتێکی تێیدا بەکاربهێنیت، جێبەجێ دەبن.",
          "ئەگەر لە جیاتی کۆمپانیایەک ماڵپەڕەکە بەکاردەهێنیت، پشتڕاست دەکەیتەوە کە دەسەڵاتت هەیە ئەم مەرجانە لە جیاتی ئەو کۆمپانیایە قبووڵ بکەیت.",
          "ئەگەر لەگەڵ هیچ بەشێکیان ڕازی نیت، بەکارهێنانی ماڵپەڕەکە ڕابگرە.",
        ],
      },
    },
    {
      id: "what-this-site-is",
      heading: {
        en: "What this website is",
        ar: "ما هو هذا الموقع",
        ckb: "ئەم ماڵپەڕە چییە",
      },
      body: {
        en: [
          "An introduction to what we do. The pages describe services, industries and past work so that you can decide whether to talk to us.",
          "Nothing here is a binding offer, a price quotation, or professional advice for your situation. Service descriptions are general; what a project actually includes is defined in a written proposal prepared for your company.",
          "Feature descriptions and capabilities describe Odoo as we know it at the time of writing. Odoo S.A. changes the product, and we do not control that.",
        ],
        ar: [
          "هو تعريف بما نقوم به. تصف الصفحات خدماتنا والقطاعات التي نخدمها وأعمالاً سابقة، لتقرّر ما إذا كنت ترغب في التحدث إلينا.",
          "لا شيء هنا عرضٌ ملزم أو عرض سعر أو استشارة مهنية خاصة بحالتك. أوصاف الخدمات عامة، أما ما يتضمنه المشروع فعلياً فيُحدَّد في عرض مكتوب يُعدّ لشركتك.",
          "وأوصاف الميزات والإمكانات تصف Odoo كما نعرفه وقت الكتابة. وشركة Odoo S.A. تغيّر المنتج، ونحن لا نتحكم بذلك.",
        ],
        ckb: [
          "ناساندنێکە بەوەی دەیکەین. لاپەڕەکان باسی خزمەتگوزاری، کەرتەکان و کاری پێشوو دەکەن تاکو بڕیار بدەیت ئایا دەتەوێت قسەمان لەگەڵ بکەیت.",
          "هیچ شتێکی ئێرە پێشکەشکردنێکی پابەندکەر، نرخنامە، یان ڕاوێژی پیشەیی بۆ دۆخی تۆ نییە. باسکردنی خزمەتگوزارییەکان گشتییە؛ ئەوەی پڕۆژەیەک بەڕاستی لەخۆی دەگرێت لە پێشنیارێکی نووسراودا دیاری دەکرێت کە بۆ کۆمپانیاکەت ئامادە دەکرێت.",
          "باسکردنی تایبەتمەندی و توانا Odoo وەک ئەوەی لە کاتی نووسیندا دەیناسین دەگێڕنەوە. Odoo S.A. بەرهەمەکە دەگۆڕێت، و ئێمە کۆنترۆڵی ئەوەمان نییە.",
        ],
      },
    },
    {
      id: "consultation",
      heading: {
        en: "The free consultation",
        ar: "الاستشارة المجانية",
        ckb: "ڕاوێژکاری خۆڕایی",
      },
      body: {
        en: [
          "We offer a first consultation at no cost and with no obligation on either side. It is a conversation — to understand what you need and to say honestly whether Odoo fits.",
          "Requesting or holding that consultation does not create a contract, reserve capacity in our schedule, or oblige us to take on the work.",
          "Whatever you tell us in it is treated as confidential, whether or not a project follows.",
        ],
        ar: [
          "نقدّم استشارة أولى بلا مقابل وبلا التزام على أي من الطرفين. وهي محادثة لفهم ما تحتاجه ولنقول بصراحة ما إذا كان Odoo مناسباً لك.",
          "طلب هذه الاستشارة أو عقدها لا ينشئ عقداً ولا يحجز طاقة في جدولنا ولا يُلزمنا بقبول العمل.",
          "وكل ما تخبرنا به فيها يُعامل بسرّية، سواء نشأ عنها مشروع أم لا.",
        ],
        ckb: [
          "یەکەم ڕاوێژکاری بەبێ کرێ و بەبێ پابەندی هیچ لایەک پێشکەش دەکەین. گفتوگۆیەکە — بۆ تێگەیشتن لەوەی پێویستتە و بۆ ئەوەی بە ڕاستگۆیی بڵێین ئایا Odoo گونجاوە یان نا.",
          "داواکردن یان ئەنجامدانی ئەو ڕاوێژکارییە نە گرێبەستێک پێکدەهێنێت، نە شوێنێک لە خشتەی کارماندا دەگرێت، نە ناچارمان دەکات کارەکە وەربگرین.",
          "هەرچییەک تێیدا پێمان بڵێیت بە نهێنی مامەڵەی لەگەڵ دەکرێت، جا پڕۆژەیەکی لێ بکەوێتەوە یان نا.",
        ],
      },
    },
    {
      id: "engagement",
      heading: {
        en: "When a project actually begins",
        ar: "متى يبدأ المشروع فعلياً",
        ckb: "کەی پڕۆژە بەڕاستی دەست پێدەکات",
      },
      body: {
        en: [
          "A project exists once both sides sign a written contract or proposal, or once we accept a purchase order. Scope, timeline, fees, responsibilities, acceptance and support are all defined there.",
          "Where a signed contract and this page disagree, the signed contract prevails for that project.",
          "Odoo subscription and licence fees are payable to Odoo S.A. under Odoo's own terms, separately from our fees, unless your contract with us says otherwise.",
        ],
        ar: [
          "ينشأ المشروع بتوقيع الطرفين عقداً أو عرضاً مكتوباً، أو بقبولنا أمر شراء. ويُحدَّد هناك النطاق والجدول الزمني والأتعاب والمسؤوليات والتسلّم والدعم.",
          "وعند التعارض بين عقد موقّع وهذه الصفحة، يسود العقد الموقّع بالنسبة لذلك المشروع.",
          "أما رسوم اشتراك وترخيص Odoo فتُدفع إلى Odoo S.A. وفق شروطها الخاصة، بمعزل عن أتعابنا، ما لم ينص عقدك معنا على غير ذلك.",
        ],
        ckb: [
          "پڕۆژە کاتێک هەیە کە هەردوو لا گرێبەستێک یان پێشنیارێکی نووسراو واژوو بکەن، یان کاتێک داواکارییەکی کڕین قبووڵ بکەین. قەبارە، خشتەی کات، کرێ، بەرپرسیاریەتی، وەرگرتن و پشتگیری هەموویان لەوێدا دیاری دەکرێن.",
          "لەو حاڵەتەی گرێبەستێکی واژووکراو و ئەم لاپەڕەیە یەکنەگرنەوە، گرێبەستە واژووکراوەکە بۆ ئەو پڕۆژەیە سەردەکەوێت.",
          "کرێی بەشداربوون و مۆڵەتی Odoo بۆ Odoo S.A. دەدرێت بەپێی مەرجەکانی خۆی، جیا لە کرێی ئێمە، مەگەر گرێبەستەکەت لەگەڵمان شتی تر بڵێت.",
        ],
      },
    },
    {
      id: "acceptable-use",
      heading: {
        en: "Acceptable use",
        ar: "الاستخدام المقبول",
        ckb: "بەکارهێنانی قبووڵکراو",
      },
      points: {
        en: [
          "Do not try to gain unauthorised access to the site, its server, or anything connected to it.",
          "Do not use automated means to scrape, overload or disrupt the site.",
          "Do not copy the site's text, design or images to present them as your own or to build a competing offering.",
          "Do not use our name, our logo or our partner status to suggest a connection with us that does not exist.",
          "Do not send us anything unlawful, malicious, or that you do not have the right to send.",
        ],
        ar: [
          "لا تحاول الوصول غير المصرّح به إلى الموقع أو خادمه أو أي شيء متصل به.",
          "لا تستخدم وسائل آلية لكشط محتوى الموقع أو إثقاله أو تعطيله.",
          "لا تنسخ نصوص الموقع أو تصميمه أو صوره لتقديمها على أنها لك أو لبناء عرض منافس.",
          "لا تستخدم اسمنا أو شعارنا أو صفتنا كشريك لإيحاء بعلاقة معنا غير قائمة.",
          "لا ترسل إلينا أي شيء مخالف للقانون أو ضار أو لا تملك حق إرساله.",
        ],
        ckb: [
          "هەوڵ مەدە بەبێ مۆڵەت بگەیتە ماڵپەڕەکە، سێرڤەرەکەی، یان هەر شتێک کە پێوەی بەستراوە.",
          "ئامرازی خۆکار بەکارمەهێنە بۆ ڕاگرتنی ناوەڕۆک، بارگرانکردن یان تێکدانی ماڵپەڕەکە.",
          "دەق، دیزاین یان وێنەکانی ماڵپەڕەکە کۆپی مەکە بۆ ئەوەی وەک هی خۆت پیشانیان بدەیت یان پێشکەشکردنێکی ڕکابەری پێ دروست بکەیت.",
          "ناو، لۆگۆ یان پێگەی هاوبەشیمان بەکارمەهێنە بۆ ئەوەی پەیوەندییەکی نەبوو لەگەڵمان بنوێنیت.",
          "هیچ شتێکی نایاسایی، زیانبەخش، یان ئەوەی مافی ناردنت نییە بۆمان مەنێرە.",
        ],
      },
    },
    {
      id: "intellectual-property",
      heading: {
        en: "Intellectual property",
        ar: "الملكية الفكرية",
        ckb: "موڵکی هزری",
      },
      body: {
        en: [
          "The text, design, layout, photographs, logos and the OdooVast name on this site belong to OdooVast or are used with permission. You may read, print and share pages for your own business use. Anything beyond that — republishing, adapting, or commercial reuse — needs our written permission.",
          "The company profile PDF may be downloaded and passed on whole. Please do not edit it or reuse parts of it under another name.",
          "Client names and logos appear with permission and remain the property of their owners.",
        ],
        ar: [
          "النصوص والتصميم والتخطيط والصور والشعارات واسم OdooVast في هذا الموقع مملوكة لـ OdooVast أو مستخدمة بإذن. ويجوز لك قراءة الصفحات وطباعتها ومشاركتها لاستخدامك التجاري الخاص. وما عدا ذلك — من إعادة نشر أو تعديل أو استخدام تجاري — يتطلب إذناً كتابياً منا.",
          "ويمكن تنزيل الملف التعريفي للشركة ونقله كاملاً. ويرجى عدم تعديله أو إعادة استخدام أجزاء منه باسم آخر.",
          "أما أسماء العملاء وشعاراتهم فتظهر بإذنهم وتبقى ملكاً لأصحابها.",
        ],
        ckb: [
          "دەق، دیزاین، ڕێکخستن، وێنە، لۆگۆ و ناوی OdooVast لەم ماڵپەڕەدا هی OdooVastن یان بە مۆڵەت بەکارهێنراون. دەتوانیت لاپەڕەکان بخوێنیتەوە، چاپیان بکەیت و بۆ بەکارهێنانی کاری خۆت هاوبەشیان بکەیت. هەر شتێکی زیاتر لەوە — بڵاوکردنەوەی دووبارە، گۆڕانکاری، یان بەکارهێنانی بازرگانی — مۆڵەتی نووسراومان دەوێت.",
          "پرۆفایلی کۆمپانیا بە شێوەی PDF دەکرێت دابگیرێت و بە تەواوی بگوازرێتەوە. تکایە دەستکاری مەکە و بەشەکانی بە ناوێکی تر بەکارمەهێنەرەوە.",
          "ناو و لۆگۆی کڕیارەکان بە مۆڵەت دەردەکەون و موڵکی خاوەنەکانیان دەمێننەوە.",
        ],
      },
    },
    {
      id: "odoo-relationship",
      heading: {
        en: "Our relationship with Odoo S.A.",
        ar: "علاقتنا بشركة Odoo S.A.",
        ckb: "پەیوەندیمان بە Odoo S.A.",
      },
      body: {
        en: [
          "OdooVast is an independent company and an Odoo Partner. We are not Odoo S.A., we are not owned by it and we are not its agent. We cannot bind Odoo S.A., and it cannot bind us.",
          "“Odoo” is a trademark of Odoo S.A. We use it to identify the product we implement, under the terms of the partner programme.",
          "Odoo S.A. sets the product's licensing, pricing, hosting terms and release schedule. Those matters are between you and Odoo S.A., and we do not control them.",
        ],
        ar: [
          "OdooVast شركة مستقلة وشريك لـ Odoo. نحن لسنا Odoo S.A. ولا مملوكين لها ولا وكلاء عنها. ولا نستطيع إلزامها، كما لا تستطيع إلزامنا.",
          "و«Odoo» علامة تجارية مملوكة لشركة Odoo S.A.، ونستخدمها للتعريف بالمنتج الذي ننفّذه، وفق شروط برنامج الشراكة.",
          "وتحدّد Odoo S.A. ترخيص المنتج وأسعاره وشروط استضافته وجدول إصداراته. وهذه أمور بينك وبين Odoo S.A.، ولا نتحكم بها.",
        ],
        ckb: [
          "OdooVast کۆمپانیایەکی سەربەخۆ و هاوبەشی Odooیە. ئێمە Odoo S.A. نین، خاوەندارێتیمان ناکات و بریکاری نین. ناتوانین Odoo S.A. پابەند بکەین، و ئەویش ناتوانێت ئێمە پابەند بکات.",
          "«Odoo» نیشانەیەکی بازرگانی Odoo S.A.یە. بەکاری دەهێنین بۆ ناساندنی ئەو بەرهەمەی جێبەجێی دەکەین، بەپێی مەرجەکانی پڕۆگرامی هاوبەشی.",
          "Odoo S.A. مۆڵەت، نرخ، مەرجەکانی هۆستینگ و خشتەی وەشانەکانی بەرهەمەکە دیاری دەکات. ئەمانە لە نێوان تۆ و Odoo S.A.دان و ئێمە کۆنترۆڵیان ناکەین.",
        ],
      },
    },
    {
      id: "availability",
      heading: {
        en: "Availability of the site",
        ar: "توفّر الموقع",
        ckb: "بەردەستبوونی ماڵپەڕ",
      },
      body: {
        en: [
          "We work to keep the site online and correct, but we do not promise that it will always be available, uninterrupted or free of errors.",
          "We may change, move or remove any page at any time, including this one.",
        ],
        ar: [
          "نعمل على إبقاء الموقع متاحاً وصحيحاً، لكننا لا نَعِد بأن يكون متاحاً دائماً أو دون انقطاع أو خالياً من الأخطاء.",
          "ويجوز لنا تعديل أي صفحة أو نقلها أو إزالتها في أي وقت، بما في ذلك هذه الصفحة.",
        ],
        ckb: [
          "کار دەکەین بۆ ئەوەی ماڵپەڕەکە لەسەر خەت و دروست بمێنێتەوە، بەڵام بەڵێن نادەین هەمیشە بەردەست، بێ پچڕان یان بێ هەڵە بێت.",
          "دەتوانین هەر لاپەڕەیەک لە هەر کاتێکدا بگۆڕین، بیگوازینەوە یان لایبەرین، لەوانە ئەم لاپەڕەیە.",
        ],
      },
    },
    {
      id: "third-party-links",
      heading: {
        en: "Links to other sites",
        ar: "الروابط إلى مواقع أخرى",
        ckb: "لینک بۆ ماڵپەڕی تر",
      },
      body: {
        en: [
          "Where we link to Odoo, Google Maps, WhatsApp, LinkedIn or anywhere else, we do not control that destination and we are not responsible for its content, its terms or how it handles your data. Follow such a link and you are on their terms, not ours.",
        ],
        ar: [
          "حين نضع رابطاً إلى Odoo أو خرائط جوجل أو واتساب أو لينكدإن أو أي جهة أخرى، فنحن لا نتحكم بتلك الوجهة ولسنا مسؤولين عن محتواها أو شروطها أو طريقة تعاملها مع بياناتك. واتّباع مثل هذا الرابط يضعك تحت شروطها لا شروطنا.",
        ],
        ckb: [
          "لەو شوێنانەی لینک بۆ Odoo، Google Maps، واتسئاپ، LinkedIn یان هەر شوێنێکی تر دادەنێین، کۆنترۆڵی ئەو شوێنە ناکەین و بەرپرسیار نین لە ناوەڕۆک، مەرجەکان یان شێوازی مامەڵەکردنی لەگەڵ داتاکەت. بەدوای لینکێکی وادا بڕۆیت، لەژێر مەرجەکانی ئەواندایت نەک ئێمە.",
        ],
      },
    },
    {
      id: "no-warranty",
      heading: {
        en: "No warranty",
        ar: "إخلاء الضمانات",
        ckb: "بێ زەمانەت",
      },
      body: {
        en: [
          "This website and everything on it is provided as it is. To the extent the law allows, we exclude any implied warranty of accuracy, completeness, fitness for a particular purpose, or of the results you might obtain from Odoo.",
          "Nothing in this section limits the warranties we give you in a signed project contract — those stand on their own terms.",
        ],
        ar: [
          "يُقدَّم هذا الموقع وكل ما فيه كما هو. وبالقدر الذي يسمح به القانون، نستبعد أي ضمان ضمني بالدقة أو الاكتمال أو الملاءمة لغرض معيّن أو بالنتائج التي قد تحققها من Odoo.",
          "ولا يحدّ أي شيء في هذا البند من الضمانات التي نمنحها لك في عقد مشروع موقّع، فتلك قائمة بشروطها الخاصة.",
        ],
        ckb: [
          "ئەم ماڵپەڕە و هەرچی تێیدایە وەک خۆی پێشکەش دەکرێت. تا ئەو ڕادەیەی یاسا ڕێگە دەدات، هەر زەمانەتێکی ناڕاستەوخۆی وردی، تەواوی، گونجاوی بۆ مەبەستێکی دیاریکراو، یان ئەو ئەنجامانەی لەوانەیە لە Odooوە بەدەستی بهێنیت دەرباز دەکەین.",
          "هیچ شتێکی ئەم بەشە ئەو زەمانەتانە سنووردار ناکات کە لە گرێبەستێکی واژووکراوی پڕۆژەدا پێت دەدەین — ئەوانە بە مەرجەکانی خۆیان دەمێننەوە.",
        ],
      },
    },
    {
      id: "liability",
      heading: {
        en: "Limitation of liability",
        ar: "حدود المسؤولية",
        ckb: "سنووری بەرپرسیاریەتی",
      },
      body: {
        en: [
          "To the extent permitted by law, OdooVast is not liable for indirect or consequential loss, lost profit, lost revenue, lost data or business interruption arising from your use of this website.",
          "Our liability in connection with this website — as distinct from a signed project — is limited to what you paid us for it, which is nothing.",
          "Nothing here excludes liability that cannot be excluded under Iraqi law, including liability for fraud or for death or personal injury caused by our negligence.",
        ],
        ar: [
          "بالقدر الذي يسمح به القانون، لا تتحمل OdooVast مسؤولية أي خسارة غير مباشرة أو تبعية أو فوات ربح أو إيراد أو فقدان بيانات أو توقف أعمال ناشئ عن استخدامك لهذا الموقع.",
          "ومسؤوليتنا المتصلة بهذا الموقع — تمييزاً عن مشروع موقّع — محدودة بما دفعته لنا مقابله، وهو لا شيء.",
          "ولا يستبعد أي شيء هنا مسؤولية لا يجوز استبعادها بموجب القانون العراقي، بما فيها المسؤولية عن الغش أو عن الوفاة أو الإصابة الشخصية الناجمة عن إهمالنا.",
        ],
        ckb: [
          "تا ئەو ڕادەیەی یاسا ڕێگە دەدات، OdooVast بەرپرسیار نییە لە زیانی ناڕاستەوخۆ یان لێکەوتەیی، قازانجی لەدەستچوو، داهاتی لەدەستچوو، داتای لەدەستچوو یان وەستانی کار کە لە بەکارهێنانی ئەم ماڵپەڕەوە سەرچاوە دەگرێت.",
          "بەرپرسیاریەتیمان سەبارەت بەم ماڵپەڕە — جیاواز لە پڕۆژەیەکی واژووکراو — سنووردارە بەوەی لەسەری پێت داوین، کە هیچە.",
          "هیچ شتێکی ئێرە ئەو بەرپرسیاریەتییە دەرباز ناکات کە بەپێی یاسای عێراق ناکرێت دەرباز بکرێت، لەوانە بەرپرسیاریەتی لە فێڵ یان لە مردن و برینداربوونی کەسی بەهۆی کەمتەرخەمی ئێمە.",
        ],
      },
    },
    {
      id: "privacy",
      heading: {
        en: "Privacy",
        ar: "الخصوصية",
        ckb: "تایبەتێتی",
      },
      body: {
        en: [
          "How we handle personal information is set out separately. Using this site means you have had the chance to read it.",
        ],
        ar: [
          "طريقة تعاملنا مع المعلومات الشخصية موضّحة في صفحة مستقلة. واستخدامك للموقع يعني أنه أُتيحت لك فرصة قراءتها.",
        ],
        ckb: [
          "شێوازی مامەڵەکردنمان لەگەڵ زانیاری کەسی بە جیا ڕوونکراوەتەوە. بەکارهێنانی ئەم ماڵپەڕە واتای ئەوەیە دەرفەتی خوێندنەوەت هەبووە.",
        ],
      },
      links: [
        {
          key: "privacy",
          label: {
            en: "Read the Privacy Policy",
            ar: "اقرأ سياسة الخصوصية",
            ckb: "سیاسەتی تایبەتێتی بخوێنەوە",
          },
        },
        {
          key: "dataDeletion",
          label: {
            en: "Ask for your data to be deleted",
            ar: "اطلب حذف بياناتك",
            ckb: "داوای سڕینەوەی داتاکەت بکە",
          },
        },
      ],
    },
    {
      id: "changes",
      heading: {
        en: "Changes to these terms",
        ar: "التعديلات على هذه الشروط",
        ckb: "گۆڕانکاری لەم مەرجانەدا",
      },
      body: {
        en: [
          "We may update these terms. The version on this page is the one in force, and the date at the top says when it last changed. Continuing to use the site after a change means accepting the new version.",
        ],
        ar: [
          "قد نحدّث هذه الشروط. والنسخة المنشورة على هذه الصفحة هي النافذة، ويبيّن التاريخ في أعلاها موعد آخر تعديل. ومواصلة استخدام الموقع بعد التعديل تعني قبول النسخة الجديدة.",
        ],
        ckb: [
          "لەوانەیە ئەم مەرجانە نوێ بکەینەوە. ئەو وەشانەی لەم لاپەڕەیەدایە ئەوەیە کاری پێدەکرێت، و بەرواری سەرەوە دەڵێت دوا جار کەی گۆڕدراوە. بەردەوامبوون لە بەکارهێنانی ماڵپەڕەکە دوای گۆڕانکارییەک واتای قبووڵکردنی وەشانە نوێیەکەیە.",
        ],
      },
    },
    {
      id: "governing-law",
      heading: {
        en: "Governing law",
        ar: "القانون الواجب التطبيق",
        ckb: "یاسای جێبەجێکراو",
      },
      body: {
        en: [
          "These terms, and any dispute arising from them, are governed by the laws in force in the Kurdistan Region of Iraq and the federal laws of Iraq that apply there.",
          "The competent courts of Erbil have jurisdiction, unless a signed contract between us names a different forum for that project.",
        ],
        ar: [
          "تخضع هذه الشروط وأي نزاع ينشأ عنها للقوانين النافذة في إقليم كردستان العراق والقوانين الاتحادية العراقية السارية فيه.",
          "وتختص محاكم أربيل المختصة بالنظر فيها، ما لم يحدّد عقد موقّع بيننا جهة أخرى لذلك المشروع.",
        ],
        ckb: [
          "ئەم مەرجانە و هەر ناکۆکییەک کە لێیانەوە سەرهەڵدەدات، بەپێی ئەو یاسایانەن کە لە هەرێمی کوردستانی عێراق کاریان پێدەکرێت و ئەو یاسا فیدراڵییانەی عێراق کە لەوێدا جێبەجێ دەبن.",
          "دادگا شیاوەکانی هەولێر دەسەڵاتی بڕیاردانیان هەیە، مەگەر گرێبەستێکی واژووکراو لە نێوانماندا شوێنێکی تر بۆ ئەو پڕۆژەیە دیاری بکات.",
        ],
      },
    },
    {
      id: "language",
      heading: {
        en: "Language",
        ar: "اللغة",
        ckb: "زمان",
      },
      body: {
        en: [
          "This page is published in English, Arabic and Kurdish, and the three are meant to say the same thing. If a difference in meaning appears, the English version is the reference for interpretation — except where Iraqi law requires the Arabic text to prevail.",
        ],
        ar: [
          "تُنشر هذه الصفحة بالإنجليزية والعربية والكردية، والنصوص الثلاثة يُقصد بها المعنى ذاته. وإذا ظهر اختلاف في المعنى، فالنسخة الإنجليزية هي المرجع في التفسير — إلا حيث يوجب القانون العراقي ترجيح النص العربي.",
        ],
        ckb: [
          "ئەم لاپەڕەیە بە ئینگلیزی، عەرەبی و کوردی بڵاو دەکرێتەوە، و مەبەست لە هەر سێکیان هەمان واتایە. ئەگەر جیاوازییەک لە واتادا دەرکەوت، وەشانە ئینگلیزییەکە سەرچاوەی لێکدانەوەیە — جگە لەو حاڵەتانەی یاسای عێراق داوا دەکات دەقە عەرەبییەکە سەربکەوێت.",
        ],
      },
    },
  ],
  contactTitle: {
    en: "Questions about these terms",
    ar: "أسئلة بخصوص هذه الشروط",
    ckb: "پرسیار دەربارەی ئەم مەرجانە",
  },
  contactBody: {
    en: "If anything here is unclear, ask before you rely on it. We would rather explain a clause now than argue about it later.",
    ar: "إن كان أي شيء هنا غير واضح، فاسأل قبل أن تبني عليه. نفضّل أن نشرح بنداً الآن على أن نتنازع بشأنه لاحقاً.",
    ckb: "ئەگەر هیچ شتێکی ئێرە ڕوون نییە، پێش ئەوەی پشتی پێببەستیت بپرسە. پێمان باشترە ئێستا بڕگەیەک ڕوون بکەینەوە لەوەی دواتر لەسەری بکێشین.",
  },
};

/* ---------------------------------------------------------- data deletion */

export const dataDeletion: LegalDoc = {
  h1: {
    en: "User Data Deletion",
    ar: "حذف بيانات المستخدم",
    ckb: "سڕینەوەی داتای بەکارهێنەر",
  },
  lead: {
    en: "How to have the personal information OdooVast holds about you erased — what we can delete, what only you can delete, and how long it takes.",
    ar: "كيف تطلب محو المعلومات الشخصية التي تحتفظ بها OdooVast عنك — ما يمكننا حذفه، وما لا يمكن حذفه إلا بواسطتك، وكم يستغرق ذلك.",
    ckb: "چۆن ئەو زانیارییە کەسییەی OdooVast دەربارەت هەڵیگرتووە بسڕدرێتەوە — چی دەتوانین بیسڕینەوە، چی تەنها خۆت دەتوانیت بیسڕیتەوە، و چەند کات دەخایەنێت.",
  },
  updatedIso: "2026-09-12",
  updated: {
    en: "12 September 2026",
    ar: "12 أيلول 2026",
    ckb: "١٢ی ئەیلوولی ٢٠٢٦",
  },
  summaryTitle: {
    en: "In one paragraph",
    ar: "باختصار",
    ckb: "بە کورتی",
  },
  summary: {
    en: [
      "Send one message to info@odoovast.com with the subject “Data deletion request”, or send the same request on WhatsApp.",
      "We acknowledge it within 7 days and complete the deletion within 30 days.",
      "This website itself stores nothing about you — there is no account to close and no cookie to clear.",
      "The request is free and you do not have to give a reason.",
    ],
    ar: [
      "أرسل رسالة واحدة إلى info@odoovast.com بعنوان «طلب حذف بيانات»، أو أرسل الطلب نفسه عبر واتساب.",
      "نؤكد استلامه خلال 7 أيام ونُتمّ الحذف خلال 30 يوماً.",
      "هذا الموقع نفسه لا يخزّن عنك شيئاً — فلا حساب تُغلقه ولا ملف تعريف ارتباط تمسحه.",
      "الطلب مجاني ولست ملزماً ببيان سبب.",
    ],
    ckb: [
      "یەک نامە بنێرە بۆ info@odoovast.com بە بابەتی «داواکاری سڕینەوەی داتا»، یان هەمان داواکاری بە واتسئاپ بنێرە.",
      "لە ماوەی ٧ ڕۆژدا پێت دەڵێین پێمان گەیشتووە و لە ماوەی ٣٠ ڕۆژدا سڕینەوەکە تەواو دەکەین.",
      "ئەم ماڵپەڕە خۆی هیچ شتێک دەربارەت هەڵناگرێت — نە هەژمارێک هەیە دایبخەیت و نە کۆکیەک هەیە بیسڕیتەوە.",
      "داواکەت بە خۆڕاییە و پێویست ناکات هۆکارێک بڵێیت.",
    ],
  },
  sections: [
    {
      id: "what-this-is",
      heading: {
        en: "What this page is for",
        ar: "الغرض من هذه الصفحة",
        ckb: "مەبەست لەم لاپەڕەیە",
      },
      body: {
        en: [
          "This is the standing route for asking OdooVast to erase personal information we hold about you. It is also the data deletion instruction page we give to platforms that require one — Meta among them — for our business pages and for any application we register with them.",
          "Use it whether you are a past client, someone who enquired once, or someone who simply sent us a message.",
        ],
        ar: [
          "هذه هي القناة الدائمة لطلب محو المعلومات الشخصية التي نحتفظ بها عنك. وهي أيضاً صفحة تعليمات حذف البيانات التي نقدّمها للمنصات التي تشترط وجودها — ومنها Meta — لصفحاتنا التجارية ولأي تطبيق نسجّله لديها.",
          "استخدمها سواء كنت عميلاً سابقاً أو شخصاً استفسر مرة واحدة أو شخصاً أرسل إلينا رسالة فحسب.",
        ],
        ckb: [
          "ئەمە ڕێگا هەمیشەییەکەیە بۆ داواکردن لە OdooVast کە ئەو زانیارییە کەسییەی دەربارەت هەڵیگرتووە بسڕێتەوە. هەروەها ئەو لاپەڕەی ڕێنمایی سڕینەوەی داتایە کە دەیدەینە ئەو پلاتفۆرمانەی داوای دەکەن — Metaش لەوانەیە — بۆ لاپەڕە بازرگانییەکانمان و بۆ هەر ئەپڵیکەیشنێک کە لەلایان تۆماری دەکەین.",
          "بەکاری بهێنە، جا کڕیارێکی پێشووت بیت، کەسێک بیت جارێک پرسیاری کردبێت، یان کەسێک بیت تەنها نامەیەکی بۆ ناردبین.",
        ],
      },
    },
    {
      id: "what-we-hold",
      heading: {
        en: "What we might hold about you",
        ar: "ما قد نحتفظ به عنك",
        ckb: "لەوانەیە چیمان دەربارەت هەبێت",
      },
      points: {
        en: [
          "A lead form you submitted on one of our Facebook or Instagram ads, with whatever you entered in it.",
          "Messages you sent us on WhatsApp, and our replies.",
          "Emails, and anything attached to them.",
          "Your name, company, phone number and email address, where you gave them to us.",
          "Notes, proposals and quotations prepared for you.",
          "Contracts, invoices and payment records, if you became a client.",
          "Support tickets and training records from a project.",
        ],
        ar: [
          "نموذج تواصل أرسلته عبر أحد إعلاناتنا على فيسبوك أو إنستغرام، بكل ما أدخلته فيه.",
          "رسائلك إلينا عبر واتساب وردودنا عليها.",
          "الرسائل البريدية وما أُرفق بها.",
          "اسمك واسم شركتك ورقم هاتفك وبريدك الإلكتروني، إن قدّمتها لنا.",
          "الملاحظات والعروض وعروض الأسعار المعدّة لك.",
          "العقود والفواتير وسجلات الدفع، إن أصبحت عميلاً.",
          "تذاكر الدعم وسجلات التدريب المرتبطة بمشروع.",
        ],
        ckb: [
          "فۆڕمێکی پەیوەندی کە لە یەکێک لە ڕیکلامەکانمان لە Facebook یان Instagram ناردووتە، بە هەرچی تێیدا نووسیوتە.",
          "ئەو نامانەی لە واتسئاپدا بۆت ناردووین، و وەڵامەکانمان.",
          "ئیمەیڵەکان، و هەرچی پێوەیان لکێنراوە.",
          "ناو، کۆمپانیا، ژمارەی مۆبایل و ئیمەیڵەکەت، ئەگەر پێت داوین.",
          "تێبینی، پێشنیار و نرخنامەی ئامادەکراو بۆت.",
          "گرێبەست، پسووڵە و تۆماری پارەدان، ئەگەر ببوویتە کڕیار.",
          "بلیتی پشتگیری و تۆماری ڕاهێنان لە پڕۆژەیەکەوە.",
        ],
      },
      body: {
        en: [
          "Nothing comes from this website itself: it has no account system, no database and no cookies of its own.",
        ],
        ar: [
          "ولا شيء من ذلك مصدره الموقع نفسه: فليس فيه نظام حسابات ولا قاعدة بيانات ولا ملفات تعريف ارتباط خاصة به.",
        ],
        ckb: [
          "هیچ شتێک لە ماڵپەڕەکە خۆیەوە نایەت: نە سیستەمی هەژماری هەیە، نە بنکەدراوە و نە کۆکی خۆی.",
        ],
      },
      links: [
        {
          key: "privacy",
          label: {
            en: "What the website does and does not collect",
            ar: "ما يجمعه الموقع وما لا يجمعه",
            ckb: "ماڵپەڕەکە چی کۆدەکاتەوە و چی کۆناکاتەوە",
          },
        },
      ],
    },
    {
      id: "how-to-request",
      heading: {
        en: "How to make the request",
        ar: "كيف تقدّم الطلب",
        ckb: "چۆن داواکەت بنێریت",
      },
      body: {
        en: [
          "Email info@odoovast.com with the subject “Data deletion request”, or send the same message on WhatsApp to +964 751 239 9899. Please include:",
        ],
        ar: [
          "أرسل بريداً إلى info@odoovast.com بعنوان «طلب حذف بيانات»، أو أرسل الرسالة نفسها عبر واتساب إلى ‎+964 751 239 9899. ويرجى أن تتضمن:",
        ],
        ckb: [
          "ئیمەیڵ بنێرە بۆ info@odoovast.com بە بابەتی «داواکاری سڕینەوەی داتا»، یان هەمان نامە بە واتسئاپ بنێرە بۆ ‎+964 751 239 9899. تکایە ئەمانەی تێدا بێت:",
        ],
      },
      points: {
        en: [
          "The name you used when you contacted us.",
          "The phone number or email address we are likely to have for you.",
          "Your company name, if it was a business enquiry.",
          "Whether you want everything deleted, or only a specific part.",
        ],
        ar: [
          "الاسم الذي استخدمته عند التواصل معنا.",
          "رقم الهاتف أو البريد الإلكتروني الذي يُرجّح أنه لدينا عنك.",
          "اسم شركتك، إن كان الاستفسار تجارياً.",
          "ما إذا كنت تريد حذف كل شيء أم جزء محدد فقط.",
        ],
        ckb: [
          "ئەو ناوەی کاتی پەیوەندیکردن بەکارت هێناوە.",
          "ئەو ژمارە مۆبایل یان ئیمەیڵەی لەوانەیە لەلامان هەبێت.",
          "ناوی کۆمپانیاکەت، ئەگەر پرسیارەکە کاری بووە.",
          "ئایا دەتەوێت هەموو شتێک بسڕدرێتەوە، یان تەنها بەشێکی دیاریکراو.",
        ],
      },
    },
    {
      id: "identity",
      heading: {
        en: "Confirming it is really you",
        ar: "التحقق من هويتك",
        ckb: "دڵنیابوونەوە لەوەی بەڕاستی تۆیت",
      },
      body: {
        en: [
          "Before we erase anything we check that the request comes from the person it concerns. Usually a message arriving from the same number or email address we already hold is enough. Where it is not, we ask one simple question — never a copy of an identity document unless there is no other way.",
          "This protects you. Without the check, anyone could erase your records or, worse, find out what we hold.",
        ],
        ar: [
          "قبل أن نمحو أي شيء نتحقق من أن الطلب صادر عن صاحب البيانات. وعادةً تكفي رسالة واردة من الرقم أو البريد الذي نحتفظ به أصلاً. وحين لا يكفي ذلك، نطرح سؤالاً بسيطاً واحداً — ولا نطلب صورة عن وثيقة هوية إلا إذا لم تكن هناك وسيلة أخرى.",
          "وهذا الإجراء لحمايتك؛ فبدونه يستطيع أي شخص محو سجلاتك، أو الأسوأ، معرفة ما نحتفظ به عنك.",
        ],
        ckb: [
          "پێش ئەوەی هیچ شتێک بسڕینەوە، دڵنیا دەبینەوە کە داواکەکە لە خودی ئەو کەسەوەیە کە پەیوەندی پێوە هەیە. بەزۆری نامەیەک کە لە هەمان ژمارە یان ئیمەیڵی لەلامان بێت بەسە. لەو حاڵەتانەی بەس نەبێت، یەک پرسیاری سادە دەکەین — و هەرگیز داوای کۆپی بەڵگەنامەی ناسنامە ناکەین مەگەر هیچ ڕێگایەکی تر نەمابێت.",
          "ئەمە بۆ پاراستنی تۆیە. بەبێ ئەم پشکنینە، هەر کەسێک دەیتوانی تۆمارەکانت بسڕێتەوە یان، خراپتر، بزانێت چیمان دەربارەت هەیە.",
        ],
      },
    },
    {
      id: "timeline",
      heading: {
        en: "What happens, and when",
        ar: "ما الذي يحدث ومتى",
        ckb: "چی ڕوودەدات، و کەی",
      },
      defs: [
        {
          term: { en: "Within 7 days", ar: "خلال 7 أيام", ckb: "لە ماوەی ٧ ڕۆژدا" },
          body: {
            en: "We acknowledge the request and tell you if we need anything more from you.",
            ar: "نؤكد استلام الطلب ونخبرك إن كنا بحاجة إلى شيء إضافي منك.",
            ckb: "پێت دەڵێین داواکەت پێمان گەیشتووە و ئەگەر شتێکی زیاترمان لێت پێویست بێت پێت دەڵێین.",
          },
        },
        {
          term: { en: "Within 30 days", ar: "خلال 30 يوماً", ckb: "لە ماوەی ٣٠ ڕۆژدا" },
          body: {
            en: "The deletion is complete and we confirm it to you in writing.",
            ar: "يكتمل الحذف ونؤكده لك كتابةً.",
            ckb: "سڕینەوەکە تەواو دەبێت و بە نووسراوی پشتڕاستی دەکەینەوە بۆت.",
          },
        },
        {
          term: { en: "Up to 90 days", ar: "حتى 90 يوماً", ckb: "تا ٩٠ ڕۆژ" },
          body: {
            en: "Copies inside encrypted backups age out on their normal rotation. They are not reachable in day-to-day work and are overwritten in the ordinary course.",
            ar: "تنتهي صلاحية النسخ الموجودة داخل النسخ الاحتياطية المشفّرة وفق دورتها المعتادة. وهي غير متاحة في العمل اليومي ويجري استبدالها تلقائياً.",
            ckb: "ئەو کۆپیانەی ناو باکئەپە شفرەکراوەکانن بەپێی سووڕی ئاسایی خۆیان کۆتاییان دێت. لە کاری ڕۆژانەدا دەستیان ناگات پێیان و بە شێوەی ئاسایی لەسەریان دەنووسرێتەوە.",
          },
        },
      ],
    },
    {
      id: "what-we-cannot-delete",
      heading: {
        en: "What we cannot delete",
        ar: "ما لا يمكننا حذفه",
        ckb: "ئەوەی ناتوانین بیسڕینەوە",
      },
      body: {
        en: [
          "Some records we are required to keep, and a deletion request cannot override that:",
        ],
        ar: [
          "بعض السجلات مُلزمون بالاحتفاظ بها، ولا يمكن لطلب الحذف أن يتجاوز ذلك:",
        ],
        ckb: [
          "هەندێک تۆمار پێویستە هەڵیانبگرین، و داواکاری سڕینەوە ناتوانێت ئەوە پشتگوێ بخات:",
        ],
      },
      points: {
        en: [
          "Invoices, receipts and accounting records, for as long as Iraqi tax and commercial law requires.",
          "Signed contracts, for as long as a claim under them remains possible.",
          "The minimum record needed to show that you asked to be deleted, so that the request itself is not lost.",
          "Anything covered by an active legal hold or a court order.",
        ],
        ar: [
          "الفواتير والإيصالات والسجلات المحاسبية، للمدة التي يوجبها القانون الضريبي والتجاري العراقي.",
          "العقود الموقّعة، طالما بقي رفع مطالبة بموجبها ممكناً.",
          "الحد الأدنى من السجل اللازم لإثبات أنك طلبت الحذف، حتى لا يضيع الطلب نفسه.",
          "أي شيء يخضع لحجز قانوني قائم أو لأمر قضائي.",
        ],
        ckb: [
          "پسووڵە، وەسڵ و تۆماری ژمێریاری، بۆ ئەو ماوەیەی یاسای باج و بازرگانی عێراق داوای دەکات.",
          "گرێبەستە واژووکراوەکان، تا ئەو کاتەی هێشتا داواکارییەکی لەسەریان دەکرێت.",
          "کەمترین تۆماری پێویست بۆ سەلماندنی ئەوەی داوای سڕینەوەت کردووە، تاکو خودی داواکەکە ون نەبێت.",
          "هەر شتێک کە لەژێر ڕاگرتنێکی یاسایی کارا یان بڕیارێکی دادگادایە.",
        ],
      },
    },
    {
      id: "only-you",
      heading: {
        en: "What only you can delete",
        ar: "ما لا يمكنك حذفه إلا بنفسك",
        ckb: "ئەوەی تەنها خۆت دەتوانیت بیسڕیتەوە",
      },
      defs: [
        {
          term: {
            en: "The WhatsApp conversation on your phone",
            ar: "محادثة واتساب على هاتفك",
            ckb: "گفتوگۆی واتسئاپ لەسەر مۆبایلەکەت",
          },
          body: {
            en: "Deleting it on our side does not remove your own copy. Delete the chat in WhatsApp to do that.",
            ar: "حذفها من جانبنا لا يزيل نسختك أنت. احذف المحادثة من واتساب لتفعل ذلك.",
            ckb: "سڕینەوەی لەلای ئێمە کۆپییەکەی خۆت لانابات. بۆ ئەوە گفتوگۆکە لە واتسئاپدا بسڕەوە.",
          },
        },
        {
          term: {
            en: "What Meta holds about your account",
            ar: "ما تحتفظ به Meta عن حسابك",
            ckb: "ئەوەی Meta دەربارەی هەژمارەکەت هەڵیگرتووە",
          },
          body: {
            en: "Your WhatsApp, Facebook or Instagram account data is between you and Meta. Their account settings and help centre cover it.",
            ar: "بيانات حسابك في واتساب أو فيسبوك أو إنستغرام أمر بينك وبين Meta، وتغطيه إعدادات الحساب ومركز المساعدة لديها.",
            ckb: "داتای هەژماری واتسئاپ، Facebook یان Instagramت لە نێوان تۆ و Metaدایە. ڕێکخستنەکانی هەژمار و ناوەندی یارمەتییان ئەوە دەگرێتەوە.",
          },
        },
        {
          term: {
            en: "Comments and follows on our pages",
            ar: "التعليقات والمتابعات على صفحاتنا",
            ckb: "لێدوان و بەدواداچوون لە لاپەڕەکانماندا",
          },
          body: {
            en: "Remove those from your own account on Facebook or LinkedIn. We can hide or delete a comment on our page, but the platform's own record of it is theirs.",
            ar: "أزِلها من حسابك على فيسبوك أو لينكدإن. يمكننا إخفاء تعليق على صفحتنا أو حذفه، لكن سجل المنصة عنه يخصها هي.",
            ckb: "ئەوانە لە هەژماری خۆتەوە لە Facebook یان LinkedIn لاببە. ئێمە دەتوانین لێدوانێک لە لاپەڕەکەماندا بشارینەوە یان بیسڕینەوە، بەڵام تۆماری خودی پلاتفۆرمەکە هی ئەوانە.",
          },
        },
        {
          term: {
            en: "Your Google account history",
            ar: "سجل حسابك في جوجل",
            ckb: "مێژووی هەژماری Googleەکەت",
          },
          body: {
            en: "Including anything recorded by the embedded map on our contact page. Manage it in your Google account.",
            ar: "بما في ذلك ما تسجّله الخريطة المدمجة في صفحة التواصل لدينا. أدِر ذلك من حسابك في جوجل.",
            ckb: "لەوانە هەرچی ئەو نەخشە جێگیرکراوەی لاپەڕەی پەیوەندیمان تۆماری دەکات. لە هەژماری Googleەکەتدا بەڕێوەی ببە.",
          },
        },
      ],
    },
    {
      id: "odoo-systems",
      heading: {
        en: "Data inside an Odoo system we built",
        ar: "البيانات داخل نظام Odoo الذي بنيناه",
        ckb: "داتا لەناو سیستەمێکی Odooی دروستکراو لەلایەن ئێمەوە",
      },
      body: {
        en: [
          "If your personal data sits inside an Odoo database belonging to one of our clients — because you are their customer, their supplier or their employee — that company decides what happens to it, not us. Ask them directly; they are the ones obliged to answer.",
          "Where we host or support that system, we carry out the deletion when the client instructs us, and we confirm it back to them.",
          "If you are our client and want a system we hold for you erased at the end of an engagement, say so: we delete the database and its backups and confirm in writing when it is done.",
        ],
        ar: [
          "إذا كانت بياناتك الشخصية داخل قاعدة بيانات Odoo تعود لأحد عملائنا — لأنك عميل لديه أو مورّد أو موظف — فتلك الشركة هي من يقرّر مصيرها، لا نحن. اسألها مباشرة؛ فهي الملزمة بالرد.",
          "وحين نستضيف ذلك النظام أو ندعمه، ننفّذ الحذف بناءً على تعليمات العميل ونؤكده له.",
          "وإن كنت عميلنا وأردت محو نظام نحتفظ به لك عند انتهاء التعاقد، فأبلِغنا: نحذف قاعدة البيانات ونسخها الاحتياطية ونؤكد ذلك كتابةً عند الانتهاء.",
        ],
        ckb: [
          "ئەگەر داتا کەسییەکەت لەناو بنکەدراوەیەکی Odoo بێت کە هی یەکێک لە کڕیارەکانمانە — چونکە تۆ کڕیار، دابینکەر یان کارمەندی ئەوانیت — ئەو کۆمپانیایە بڕیار دەدات چی بەسەردا دێت، نەک ئێمە. ڕاستەوخۆ لەوان بپرسە؛ ئەوانن ناچارن وەڵام بدەنەوە.",
          "لەو حاڵەتەی ئەو سیستەمە هۆست یان پشتگیری دەکەین، سڕینەوەکە ئەنجام دەدەین کاتێک کڕیارەکە ڕێنماییمان دەدات، و بۆیان پشتڕاست دەکەینەوە.",
          "ئەگەر کڕیارمانیت و دەتەوێت ئەو سیستەمەی بۆت هەڵگرتووە لە کۆتایی هاوکاریدا بسڕدرێتەوە، پێمان بڵێ: بنکەدراوەکە و باکئەپەکانی دەسڕینەوە و کاتێک تەواو بوو بە نووسراوی پشتڕاستی دەکەینەوە.",
        ],
      },
    },
    {
      id: "after",
      heading: {
        en: "After the deletion",
        ar: "بعد الحذف",
        ckb: "دوای سڕینەوە",
      },
      body: {
        en: [
          "We send a written confirmation listing what was deleted and anything retained, with the reason for keeping it.",
          "Deletion is permanent — we cannot restore the records afterwards. If you contact us again later, we start from nothing.",
          "Asking for deletion does not affect anything we did lawfully beforehand, and it does not end a contract that is still running. Tell us separately if you want that too.",
        ],
        ar: [
          "نرسل تأكيداً كتابياً يبيّن ما حُذف وما أُبقي عليه وسبب الإبقاء.",
          "والحذف نهائي — لا يمكننا استعادة السجلات بعده. وإن تواصلت معنا لاحقاً، فسنبدأ من الصفر.",
          "وطلب الحذف لا يؤثر على ما قمنا به بصورة مشروعة قبله، ولا يُنهي عقداً ما زال سارياً. فأبلِغنا بذلك بشكل منفصل إن أردته أيضاً.",
        ],
        ckb: [
          "پشتڕاستکردنەوەیەکی نووسراو دەنێرین کە ئەوەی سڕدراوەتەوە و ئەوەی ماوەتەوە لەگەڵ هۆکاری هێشتنەوەی لیست دەکات.",
          "سڕینەوە هەمیشەییە — دواتر ناتوانین تۆمارەکان بگەڕێنینەوە. ئەگەر دواتر دیسان پەیوەندیمان پێوە بکەیت، لە سفرەوە دەست پێدەکەین.",
          "داواکردنی سڕینەوە کاریگەری لەسەر ئەوەی پێشتر بە یاسایی کردوومانە نییە، و گرێبەستێکی هێشتا کارا کۆتایی پێناهێنێت. ئەگەر ئەوەشت دەوێت، بە جیا پێمان بڵێ.",
        ],
      },
    },
    {
      id: "complaint",
      heading: {
        en: "If you are not satisfied",
        ar: "إن لم تكن راضياً",
        ckb: "ئەگەر ڕازی نەبوویت",
      },
      body: {
        en: [
          "Tell us first — most problems turn out to be a misunderstanding we can fix quickly. Write to info@odoovast.com and mark it for the attention of the person responsible for data protection.",
          "If that does not resolve it, you may complain to the competent authority in the country where you live.",
        ],
        ar: [
          "أخبرنا أولاً — فمعظم المشكلات تتبيّن أنها سوء فهم يمكن تصحيحه سريعاً. اكتب إلى info@odoovast.com وأشر إلى أنها لعناية المسؤول عن حماية البيانات.",
          "وإن لم يُحلّ الأمر بذلك، فيمكنك تقديم شكوى إلى الجهة المختصة في بلد إقامتك.",
        ],
        ckb: [
          "سەرەتا پێمان بڵێ — زۆربەی کێشەکان دەردەکەون کە تێنەگەیشتنێکن و بە خێرایی چارەسەریان دەکەین. بۆ info@odoovast.com بنووسە و ئاماژەی پێبدە کە بۆ ئەو کەسەیە بەرپرسە لە پاراستنی داتا.",
          "ئەگەر بەوە چارەسەر نەبوو، دەتوانیت سکاڵا بەرزبکەیتەوە بۆ دەسەڵاتدارە شیاوەکەی ئەو وڵاتەی تێیدا دەژیت.",
        ],
      },
    },
  ],
  contactTitle: {
    en: "Send the request",
    ar: "أرسل الطلب",
    ckb: "داواکەت بنێرە",
  },
  contactBody: {
    en: "One message is enough. Use either channel below — whichever is easier for you.",
    ar: "رسالة واحدة تكفي. استخدم أياً من القناتين أدناه، أيهما أيسر لك.",
    ckb: "یەک نامە بەسە. هەر یەکێک لەم دوو ڕێگایەی خوارەوە بەکاربهێنە — کامەیان بۆت ئاسانترە.",
  },
};

/** Every legal document, keyed by its route. */
export const legalDocs = {
  privacy,
  terms,
  dataDeletion,
} as const;
