export const SITE_URL = "https://kunzglobal.com";

export const LANGS = ["en", "es", "de", "pt"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
};

export const HTML_LANG: Record<Lang, string> = { en: "en", es: "es", de: "de", pt: "pt" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", es: "es_UY", de: "de_DE", pt: "pt_BR" };

export const PAGES = ["home", "businesses", "about", "contact", "legal", "privacy", "terms"] as const;
export type PageId = (typeof PAGES)[number];

const SLUG: Record<PageId, string> = {
  home: "",
  businesses: "businesses/",
  about: "about/",
  contact: "contact/",
  legal: "legal/",
  privacy: "privacy/",
  terms: "terms/",
};

/** Root-relative path of a page; English lives at the root, other languages under /<lang>/. */
export function pagePath(lang: Lang, page: PageId, hash = ""): string {
  const prefix = lang === DEFAULT_LANG ? "/" : `/${lang}/`;
  return `${prefix}${SLUG[page]}${hash}`;
}

export const BRANDS = ["agrotech", "agralon", "sourcing", "renvora", "versicherung", "akquise"] as const;
export type BrandId = (typeof BRANDS)[number];

export interface Brand {
  id: BrandId;
  name: string;
  /** Verified on 2026-09-18 (HTTP 200, title matches the brand). `null` = no verified site, so no link. */
  url: string | null;
  domain: string | null;
}

export const BRAND: Record<BrandId, Brand> = {
  agrotech: { id: "agrotech", name: "Kunz Agrotech", url: "https://kunzagrotech.com/", domain: "kunzagrotech.com" },
  agralon: { id: "agralon", name: "Agralon", url: "https://agralon.com/", domain: "agralon.com" },
  sourcing: { id: "sourcing", name: "Kunz Sourcing", url: "https://kunzsourcing.com/", domain: "kunzsourcing.com" },
  renvora: { id: "renvora", name: "Renvora", url: "https://renvora.lat/", domain: "renvora.lat" },
  versicherung: { id: "versicherung", name: "Kunz Versicherung", url: null, domain: null },
  akquise: { id: "akquise", name: "KunzAkquise", url: "https://kunzakquise.com/", domain: "kunzakquise.com" },
};

/** Contact details already published on the previous kunzglobal.com. */
export const CONTACT = {
  email: "stan@kunzglobal.com",
  phoneUy: { label: "+598 92 800 358", href: "tel:+59892800358" },
  phoneDe: { label: "+49 6344 9269681", href: "tel:+4963449269681" },
  director: "Stanley Kunz",
} as const;
