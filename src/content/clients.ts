import type { T } from "@/lib/i18n";

/**
 * Real OdooVast clients, supplied by the owner — the first six on 2026-08-14,
 * Merry An, Retal and Brix Burger plus every city and branch figure on
 * 2026-10-15. Logos live in public/clients/. Company names stay in their own
 * branding (Latin) in all three languages; everything else is translated.
 *
 * Only what the owner stated is recorded. A branch without a `count` means
 * "they have a branch there" — no number was given, so none is shown.
 */

/** Every place a client trades from: Iraqi cities first, then abroad. */
export const places = {
  erbil: { en: "Erbil", ar: "أربيل", ckb: "هەولێر" },
  baghdad: { en: "Baghdad", ar: "بغداد", ckb: "بەغدا" },
  mosul: { en: "Mosul", ar: "الموصل", ckb: "مووسڵ" },
  duhok: { en: "Duhok", ar: "دهوك", ckb: "دهۆک" },
  turkey: { en: "Turkey", ar: "تركيا", ckb: "تورکیا" },
  syria: { en: "Syria", ar: "سوريا", ckb: "سووریا" },
  china: { en: "China", ar: "الصين", ckb: "چین" },
} satisfies Record<string, T>;

export type Place = keyof typeof places;

/** Places outside Iraq; every other entry in `places` is an Iraqi city. */
const abroad: readonly Place[] = ["turkey", "syria", "china"];

export type Branch = {
  place: Place;
  /** Branches in that place, only when the owner gave a number. */
  count?: number;
};

export type Client = {
  name: string;
  /** Short sector label — the line under the name everywhere. */
  sector: T;
  /** What the company actually does, in the owner's words. */
  about: T;
  /** Where they have branches. Empty when the owner gave no city. */
  branches: Branch[];
  /** Total branches when the owner gave a number but no per-city split. */
  branchTotal?: number;
  factories?: number;
  /** The main branch of the brand the client sells, when it is outside Iraq. */
  headOffice?: Place;
  logo: string;
  /** The logo's own brand colour (sampled from the artwork) — its glow on hover. */
  tint: string;
  width: number;
  height: number;
  /** True when the artwork carries its own dark background tile. */
  darkArtwork?: boolean;
};

export const clients: Client[] = [
  {
    name: "Alnajar Steel",
    sector: {
      en: "Steel & construction",
      ar: "الحديد والإنشاءات",
      ckb: "پۆڵا و بیناسازی",
    },
    about: {
      en: "Manufactures jacks, scaffolding and pipes.",
      ar: "تصنيع الجكّات والسقالات والأنابيب.",
      ckb: "دروستکردنی جەگ، ئەسکەلە و بۆری.",
    },
    branches: [{ place: "erbil" }],
    factories: 4,
    logo: "/clients/alnajar-steel.png",
    tint: "#2f3a8f",
    width: 748,
    height: 662,
  },
  {
    name: "Salar Jamal",
    sector: {
      en: "Fashion & apparel",
      ar: "الأزياء والملابس",
      ckb: "جل و بەرگ",
    },
    about: {
      en: "Clothing retail.",
      ar: "بيع الملابس بالتجزئة.",
      ckb: "فرۆشتنی جل و بەرگ.",
    },
    branches: [
      { place: "erbil", count: 5 },
      { place: "baghdad", count: 2 },
    ],
    logo: "/clients/salar-jamal.png",
    tint: "#2a7a74",
    width: 900,
    height: 1163,
  },
  {
    /* TODO: "کۆسەرە" (one of the machines) is kept in the Kurdish only — confirm
       the English and Arabic term with the owner. */
    name: "Retal",
    sector: {
      en: "Machinery & kitchen parts",
      ar: "الماكينات وقطع المطابخ",
      ckb: "ئامێر و پارچەی مەتبەخ",
    },
    about: {
      en: "Sells machines such as saws, and kitchen spare parts.",
      ar: "بيع الماكينات كالمناشير، وقطع غيار المطابخ.",
      ckb: "فرۆشتنی ئامێری وەک مشار و کۆسەرە، و پارچەی یەدەگی مەتبەخ.",
    },
    branches: [
      { place: "baghdad" },
      { place: "erbil" },
      { place: "mosul" },
      { place: "syria" },
      { place: "china" },
    ],
    logo: "/clients/retal.png",
    tint: "#5d5b5c",
    width: 600,
    height: 280,
  },
  {
    /* The owner's "دیری مۆند": Derimod clothing, main branch in Turkey,
       branches in Erbil and Duhok. Confirmed by the owner on 2026-10-17. */
    name: "Vendor for General Trading",
    sector: {
      en: "Fashion & apparel",
      ar: "الأزياء والملابس",
      ckb: "جل و بەرگ",
    },
    about: {
      en: "Sells Derimod-brand clothing.",
      ar: "بيع ملابس علامة Derimod.",
      ckb: "فرۆشتنی جل و بەرگی مارکەی Derimod.",
    },
    branches: [{ place: "erbil" }, { place: "duhok" }],
    headOffice: "turkey",
    logo: "/clients/vendor-trading.jpg",
    tint: "#3f7fe6",
    width: 900,
    height: 605,
  },
  {
    name: "Merry An",
    sector: {
      en: "Car spare parts",
      ar: "قطع غيار السيارات",
      ckb: "پارچەی یەدەگی ئۆتۆمبێل",
    },
    about: {
      en: "Sells spare parts for cars.",
      ar: "بيع قطع غيار السيارات.",
      ckb: "فرۆشتنی پارچەی یەدەگی ئۆتۆمبێل.",
    },
    branches: [{ place: "erbil", count: 2 }],
    logo: "/clients/merry-an.png",
    tint: "#d9a21b",
    width: 356,
    height: 134,
  },
  {
    /* Rasterised from the supplied vector PDF (page 2 of Som.pdf). */
    name: "Som — Since 1944",
    sector: {
      en: "Footwear",
      ar: "الأحذية",
      ckb: "پێڵاو",
    },
    about: {
      en: "Men's shoes.",
      ar: "أحذية رجالية.",
      ckb: "پێڵاوی پیاوان.",
    },
    branches: [{ place: "baghdad" }, { place: "erbil" }],
    branchTotal: 2,
    logo: "/clients/som.png",
    tint: "#fb8c23",
    width: 1200,
    height: 757,
  },
  {
    name: "Brix Burger",
    sector: {
      en: "Restaurant",
      ar: "مطعم",
      ckb: "چێشتخانە",
    },
    about: {
      en: "Burger restaurant.",
      ar: "مطعم برغر.",
      ckb: "چێشتخانەی بەرگەر.",
    },
    branches: [{ place: "erbil" }],
    logo: "/clients/brix-burger.png",
    tint: "#f0663a",
    width: 420,
    height: 343,
  },
  {
    name: "Diamond Parda Company",
    sector: {
      en: "Curtains",
      ar: "الستائر",
      ckb: "پەردە",
    },
    about: {
      en: "Zebra blinds and fabric curtains.",
      ar: "ستائر الزيبرا وستائر القماش.",
      ckb: "پەردەی زێبرا و پەردەی قوماش.",
    },
    branches: [{ place: "erbil", count: 1 }],
    logo: "/clients/diamond-parda.jpg",
    tint: "#f2c230",
    width: 354,
    height: 350,
    darkArtwork: true,
  },
  {
    name: "Aljawahir",
    sector: {
      en: "Iron",
      ar: "الحديد",
      ckb: "ئاسن",
    },
    about: {
      en: "Works in the iron business.",
      ar: "تعمل في مجال الحديد.",
      ckb: "لە بواری ئاسندا کار دەکات.",
    },
    branches: [],
    branchTotal: 1,
    logo: "/clients/aljawahir.png",
    tint: "#f5a524",
    width: 1950,
    height: 1436,
  },
];

/**
 * The wall's headline figures, counted from the list — never typed in. A
 * brand's head office abroad is not a client branch, so it is not counted.
 */
export function footprint() {
  const where = new Set(clients.flatMap((client) => client.branches.map((branch) => branch.place)));
  const all = [...where];
  return {
    companies: clients.length,
    cities: all.filter((place) => !abroad.includes(place)).length,
    countries: all.filter((place) => abroad.includes(place)).length,
  };
}

/** Total branches — the owner's total, else the per-city sum when every city has one. */
export function branchCount(client: Client): number | null {
  if (client.branchTotal !== undefined) return client.branchTotal;
  const { branches } = client;
  if (branches.length === 0) return null;
  let sum = 0;
  for (const branch of branches) {
    if (branch.count === undefined) return null;
    sum += branch.count;
  }
  return sum;
}
