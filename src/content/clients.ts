import type { T } from "@/lib/i18n";

/**
 * Real OdooVast clients, supplied by the owner on 2026-08-14. Logos live in
 * public/clients/. Company names stay in their own branding (Latin) in all
 * three languages; only the sector line is translated.
 */
export type Client = {
  name: string;
  /** null = sector not yet confirmed by the owner; the line is simply omitted. */
  sector: T | null;
  logo: string;
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
    logo: "/clients/alnajar-steel.png",
    width: 1200,
    height: 1200,
  },
  {
    name: "Salar Jamal",
    sector: {
      en: "Fashion & apparel",
      ar: "الأزياء والملابس",
      ckb: "جل و بەرگ",
    },
    logo: "/clients/salar-jamal.png",
    width: 1563,
    height: 1563,
  },
  {
    name: "Diamond Parda Company",
    sector: {
      en: "Curtains & home furnishings",
      ar: "الستائر والمفروشات",
      ckb: "پەردە و کەلوپەلی ناوماڵ",
    },
    logo: "/clients/diamond-parda.jpg",
    width: 354,
    height: 350,
    darkArtwork: true,
  },
  {
    name: "Vendor for General Trading",
    sector: {
      en: "General trading",
      ar: "التجارة العامة",
      ckb: "بازرگانی گشتی",
    },
    logo: "/clients/vendor-trading.jpg",
    width: 1000,
    height: 1000,
  },
  {
    /* Rasterised from the supplied vector PDF (page 2 of Som.pdf). */
    name: "Som — Since 1944",
    sector: {
      en: "Footwear",
      ar: "الأحذية",
      ckb: "پێڵاو",
    },
    logo: "/clients/som.png",
    width: 1200,
    height: 757,
  },
  {
    /* TODO: confirm Aljawahir's sector with the owner, then fill it in. */
    name: "Aljawahir",
    sector: null,
    logo: "/clients/aljawahir.png",
    width: 1950,
    height: 1436,
  },
];
