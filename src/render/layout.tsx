import type { ReactNode } from "react";
import { BRAND, BRANDS, CONTACT, DEFAULT_LANG, HTML_LANG, LANGS, LANG_LABEL, OG_LOCALE, SITE_URL, pagePath } from "../site/config";
import type { Lang, PageId } from "../site/config";
import type { Content, Headline as HeadlineParts } from "../content/types";

export interface Assets {
  scripts: string[];
  styles: string[];
  preloadFonts: string[];
}

export interface PageContext {
  lang: Lang;
  page: PageId | "notFound";
  t: Content;
  assets: Assets;
}

/** Old hash routes (#/impressum …) from the previous single-page site keep working. */
const LEGACY_HASH_REDIRECT = `(function(){var m={"#/impressum":"legal/","#/datenschutz":"privacy/","#/agb":"terms/","#/agrotech":"businesses/#agrotech","#/fleisch":"businesses/#sourcing"};var h=location.hash.replace(/\\/$/,"");if(m[h]&&/^\\/(es\\/|de\\/|pt\\/)?$/.test(location.pathname))location.replace(location.pathname+m[h]);})();`;

export function Document({ ctx, children }: { ctx: PageContext; children: ReactNode }) {
  const { lang, page, t, assets } = ctx;
  const meta = t.meta[page];
  const isPage = page !== "notFound";
  const canonical = isPage ? SITE_URL + pagePath(lang, page) : null;
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kunz Global",
    url: SITE_URL + "/",
    logo: SITE_URL + "/icon-512.png",
    email: CONTACT.email,
    founder: { "@type": "Person", name: CONTACT.director },
    address: { "@type": "PostalAddress", addressRegion: "San José", addressCountry: "UY" },
    brand: BRANDS.map((id) => ({ "@type": "Brand", name: BRAND[id].name, ...(BRAND[id].url ? { url: BRAND[id].url } : {}) })),
  };
  return (
    <html lang={HTML_LANG[lang]} className="no-js">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {!isPage && <meta name="robots" content="noindex" />}
        {canonical && <link rel="canonical" href={canonical} />}
        {isPage &&
          LANGS.map((l) => <link key={l} rel="alternate" hrefLang={HTML_LANG[l]} href={SITE_URL + pagePath(l, page)} />)}
        {isPage && <link rel="alternate" hrefLang="x-default" href={SITE_URL + pagePath(DEFAULT_LANG, page)} />}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kunz Global" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        {canonical && <meta property="og:url" content={canonical} />}
        <meta property="og:image" content={SITE_URL + "/img/og-image.jpg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={OG_LOCALE[lang]} />
        {LANGS.filter((l) => l !== lang).map((l) => (
          <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#0e1412" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {assets.preloadFonts.map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
        ))}
        {assets.styles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.className="js";${page === "home" ? LEGACY_HASH_REDIRECT : ""}` }} />
        {page === "home" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />}
      </head>
      <body data-page={page}>
        <a className="skip" href="#main">
          {t.nav.skip}
        </a>
        <Header ctx={ctx} />
        <main id="main">{children}</main>
        <Footer ctx={ctx} />
        {assets.scripts.map((src) => (
          <script key={src} type="module" src={src} />
        ))}
      </body>
    </html>
  );
}

function navItems(lang: Lang, t: Content) {
  return [
    { id: "businesses", label: t.nav.businesses, href: pagePath(lang, "businesses") },
    { id: "about", label: t.nav.about, href: pagePath(lang, "about") },
    { id: "vision", label: t.nav.vision, href: pagePath(lang, "home", "#vision") },
    { id: "contact", label: t.nav.contact, href: pagePath(lang, "contact") },
  ];
}

export function BrandLockup({ href, label }: { href: string; label: string }) {
  return (
    <a className="brand" href={href} aria-label={label}>
      <span className="brand__mark" aria-hidden="true" />
      <span className="brand__word" aria-hidden="true">
        Kunz <span>Global</span>
      </span>
    </a>
  );
}

function Header({ ctx }: { ctx: PageContext }) {
  const { lang, page, t } = ctx;
  const target: PageId = page === "notFound" ? "home" : page;
  const items = navItems(lang, t);
  return (
    <>
      <header className="site-header" data-header>
        <div className="site-header__inner">
          <BrandLockup href={pagePath(lang, "home")} label={t.nav.home} />
          <nav className="nav" aria-label={t.nav.menu}>
            {items.map((item) => (
              <a key={item.id} href={item.href} aria-current={item.id === page ? "page" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <details className="lang" data-lang-menu>
            <summary aria-label={`${t.nav.language}: ${LANG_LABEL[lang]}`}>
              <span>{lang.toUpperCase()}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </summary>
            <ul>
              {LANGS.map((l) => (
                <li key={l}>
                  <a href={pagePath(l, target)} lang={HTML_LANG[l]} hrefLang={HTML_LANG[l]} aria-current={l === lang ? "true" : undefined}>
                    <span>{l.toUpperCase()}</span>
                    {LANG_LABEL[l]}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <button className="burger" type="button" aria-expanded="false" aria-controls="mobile-menu" data-burger data-label-open={t.nav.menu} data-label-close={t.nav.close}>
            <span className="sr-only">{t.nav.menu}</span>
            <span className="burger__lines" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="mobile-menu" id="mobile-menu" hidden data-mobile-menu>
        <nav aria-label={t.nav.menu}>
          {items.map((item, i) => (
            <a key={item.id} href={item.href} style={{ ["--i" as string]: i }} aria-current={item.id === page ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <ul className="mobile-menu__langs" aria-label={t.nav.language}>
          {LANGS.map((l) => (
            <li key={l}>
              <a href={pagePath(l, target)} lang={HTML_LANG[l]} hrefLang={HTML_LANG[l]} aria-current={l === lang ? "true" : undefined}>
                {l.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Footer({ ctx }: { ctx: PageContext }) {
  const { lang, t } = ctx;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <BrandLockup href={pagePath(lang, "home")} label={t.nav.home} />
            <p>{t.footer.tagline}</p>
          </div>
          <div>
            <h2>{t.footer.businesses}</h2>
            <ul>
              {BRANDS.map((id) => (
                <li key={id}>
                  <a href={pagePath(lang, "businesses", `#${id}`)}>{BRAND[id].name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.footer.company}</h2>
            <ul>
              <li>
                <a href={pagePath(lang, "about")}>{t.nav.about}</a>
              </li>
              <li>
                <a href={pagePath(lang, "home", "#vision")}>{t.nav.vision}</a>
              </li>
              <li>
                <a href={pagePath(lang, "contact")}>{t.nav.contact}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t.nav.contact}</h2>
            <ul>
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <a href={CONTACT.phoneUy.href}>{CONTACT.phoneUy.label}</a>
              </li>
              <li>{t.footer.location}</li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} Kunz Global. {t.footer.rights}
          </p>
          <ul>
            <li>
              <a href={pagePath(lang, "legal")}>{t.footer.legal}</a>
            </li>
            <li>
              <a href={pagePath(lang, "privacy")}>{t.footer.privacy}</a>
            </li>
            <li>
              <a href={pagePath(lang, "terms")}>{t.footer.terms}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ---------- shared atoms ---------- */

export function Headline({ parts, as: Tag = "h2", className = "" }: { parts: HeadlineParts; as?: "h1" | "h2"; className?: string }) {
  return (
    <Tag className={`headline ${className}`.trim()} data-reveal="lines">
      <span className="headline__line">
        <span>{parts[0]}</span>
      </span>{" "}
      <span className="headline__line">
        <span>
          <em>{parts[1]}</em>
        </span>
      </span>
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow" data-reveal>
      {children}
    </p>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      {diagonal ? <path d="M3 11L11 3M4.5 3H11v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" /> : <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />}
    </svg>
  );
}

export interface PictureProps {
  name: string;
  widths: number[];
  fallback: number;
  ext?: "jpg";
  alt: string;
  sizes: string;
  width: number;
  height: number;
  eager?: boolean;
  className?: string;
}

export function Picture({ name, widths, fallback, alt, sizes, width, height, eager = false, className }: PictureProps) {
  const srcSet = widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={`/img/${name}-${fallback}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
      />
    </picture>
  );
}

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: HeadlineParts; lead?: string }) {
  return (
    <section className="page-hero theme-dark">
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Headline parts={title} as="h1" className="headline--page" />
        {lead && (
          <p className="lead" data-reveal>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
