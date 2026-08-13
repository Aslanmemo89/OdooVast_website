import type { T } from "@/lib/i18n";

/**
 * Real OdooVast clients, supplied by the owner on 2026-08-14. Logos live in
 * public/clients/. Company names stay in their own branding (Latin) in all
 * three languages; only the sector line is translated.
 *
 * TODO: Som — logo arrived as a vector PDF that cannot be rasterised here.
 * Add the entry once a PNG/JPG of the logo is provided.
 */
export type Client = {
  name: string;
  sector: T;
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
];
