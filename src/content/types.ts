import type { BrandId, PageId } from "../site/config";

/** Headline split into a plain part and an accented (serif italic) part. */
export type Headline = readonly [plain: string, accent: string];

export interface Titled {
  title: string;
  text: string;
}

export interface BusinessCopy {
  category: string;
  /** One sentence for the ecosystem panel. */
  short: string;
  /** Portfolio card: what is offered and for whom, in one or two sentences. */
  offer: string;
  /** Label of the primary link; must match what the target page offers. */
  cta: string;
  /** Longer paragraph for the businesses page. */
  long: string;
  focus: readonly string[];
  /** Optional, deliberately quiet status line (e.g. early access). */
  status?: string;
}

export interface Content {
  meta: Record<PageId | "notFound", { title: string; description: string }>;
  nav: {
    businesses: string;
    about: string;
    vision: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
    skip: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    title: Headline;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** Six sector labels placed around the hero network. */
    sectors: readonly [string, string, string, string, string, string];
    networkAlt: string;
    scroll: string;
  };
  group: {
    eyebrow: string;
    title: Headline;
    lead: string;
    body: string;
    facts: readonly { label: string; value: string }[];
  };
  portfolio: {
    eyebrow: string;
    title: Headline;
    lead: string;
    viewAll: string;
    external: string;
    /** "site in English" etc., keyed by the target site's language. */
    siteLang: Record<"en" | "es" | "de" | "pt", string>;
    /** Agralon card: the workflow in five short steps. */
    agralonFlow: readonly [string, string, string, string, string];
    /** Caption for product screens that show demo content. */
    sampleData: string;
    /** Renvora card: three schematic steps. */
    renvoraFlow: readonly [string, string, string];
    /** Kunz Sourcing: product lines in order of priority (shown on the card photo). */
    sourcingLines: readonly [string, string];
    /** Kunz Systems card: four modules of the schematic system view. */
    systemsModules: readonly [string, string, string, string];
    systemsCaption: string;
    /** KunzAkquise card: the service in three steps. */
    akquiseSteps: readonly [string, string, string];
    akquiseCaption: string;
    /** Vomando card: reduced product view with the three product principles. */
    vomando: { course: string; path: string; pillars: readonly [string, string, string]; caption: string };
  };
  businesses: Record<BrandId, BusinessCopy>;
  ecosystem: {
    eyebrow: string;
    title: Headline;
    lead: string;
    centerLabel: string;
    centerText: string;
    futureName: string;
    futureCategory: string;
    futureText: string;
  };
  featured: {
    eyebrow: string;
    title: Headline;
    items: Record<"agrotech" | "agralon" | "sourcing" | "renvora", { kicker: string; title: string; text: string; alt: string }>;
    renvoraSteps: readonly [string, string, string, string, string];
    renvoraCaption: string;
    /** Agralon workflow as documented on agralon.com (seven stages). */
    agralonSteps: readonly [string, string, string, string, string, string, string];
    agralonStepsLabel: string;
    /** Facts shown under the Sourcing text (term + value). */
    sourcingFacts: readonly { term: string; value: string }[];
    statusLabel: string;
  };
  principles: {
    eyebrow: string;
    title: Headline;
    items: readonly [Titled, Titled, Titled, Titled];
  };
  uruguay: {
    eyebrow: string;
    title: Headline;
    text: string;
    points: readonly [Titled, Titled, Titled];
    globeAlt: string;
    marker: string;
  };
  future: {
    eyebrow: string;
    title: Headline;
    text: string;
    fields: readonly string[];
    note: string;
  };
  cta: { title: Headline; text: string; button: string };
  businessesPage: { eyebrow: string; title: Headline; lead: string; focusLabel: string; futureLink: string };
  about: {
    eyebrow: string;
    title: Headline;
    lead: string;
    story: readonly [Titled, Titled, Titled, Titled];
    approachTitle: string;
    leadership: { eyebrow: string; title: string; text: string; role: string; photoAlt: string };
    facts: readonly { label: string; value: string }[];
  };
  contactPage: {
    eyebrow: string;
    title: Headline;
    lead: string;
    form: {
      name: string;
      company: string;
      email: string;
      area: string;
      areaGeneral: string;
      message: string;
      optional: string;
      submit: string;
      /** Honest note: the form opens the visitor's e-mail program. */
      note: string;
      success: string;
      errorRequired: string;
      errorEmail: string;
      mailSubject: string;
      /** Texts used when the form really sends (CONTACT_ENDPOINT is set). */
      send: { submit: string; sending: string; note: string; success: string; error: string };
    };
    directTitle: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    location: string;
  };
  footer: {
    tagline: string;
    businesses: string;
    company: string;
    legalTitle: string;
    legal: string;
    privacy: string;
    terms: string;
    location: string;
    rights: string;
  };
  notFound: { title: string; text: string; back: string };
  legalOverrides: {
    /** Replaces the old two-link sentence about subsidiaries. */
    brandsTitle: string;
    brandsText: string;
    socialTitle: string;
    socialText: string;
    formTitle: string;
    formText: string;
    /** Privacy text for the sending form (CONTACT_ENDPOINT is set). */
    formTextSend: string;
    updated: string;
  };
}

export interface LegalSection {
  title: string;
  text: string;
}

export interface LegalContent {
  impressum: {
    eyebrow: string;
    title: string;
    intro: string;
    providerTitle: string;
    providerLines: string[];
    contactTitle: string;
    emailLabel: string;
    phoneLabel: string;
    websiteLabel: string;
    companyDataTitle: string;
    companyDataLines: string[];
    responsibleTitle: string;
    responsibleText: string;
    subsidiariesTitle: string;
    disclaimerTitle: string;
    disclaimerText: string;
  };
  datenschutz: {
    eyebrow: string;
    title: string;
    intro: string;
    controllerTitle: string;
    controllerLines: string[];
    minimizationTitle: string;
    minimizationText: string;
    serverDataTitle: string;
    serverDataText: string;
    contactTitle: string;
    contactText: string;
    socialTitle: string;
    socialText: string;
    cookiesTitle: string;
    cookiesText: string;
    rightsTitle: string;
    rightsIntro: string;
    rightsList: string[];
    rightsOutro: string;
    securityTitle: string;
    securityText: string;
    changesTitle: string;
    changesText: string;
  };
  agb: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: LegalSection[];
    responsibleLine: string;
  };
}
