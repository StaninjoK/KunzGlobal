import type { ReactNode } from "react";
import { BRAND, pagePath } from "../site/config";
import type { BrandId } from "../site/config";
import { Arrow, Eyebrow, Headline, Picture } from "./layout";
import type { PageContext } from "./layout";
import { Ecosystem, Globe, HeroNetwork, RenvoraFlow } from "./graphics";

export function BrandLink({ id, ctx, className = "" }: { id: BrandId; ctx: PageContext; className?: string }) {
  const { t, lang } = ctx;
  const brand = BRAND[id];
  if (!brand.url) {
    return (
      <a className={`brand-link ${className}`.trim()} href={pagePath(lang, "contact")}>
        <span>{t.portfolio.noSite}</span>
        <Arrow />
      </a>
    );
  }
  return (
    <a className={`brand-link ${className}`.trim()} href={brand.url} target="_blank" rel="noopener">
      <span>
        {t.portfolio.visit}
        <span className="brand-link__domain"> · {brand.domain}</span>
      </span>
      <Arrow diagonal />
      <span className="sr-only"> ({t.portfolio.external})</span>
    </a>
  );
}

function Card({ id, ctx, variant, children }: { id: BrandId; ctx: PageContext; variant: string; children?: ReactNode }) {
  const b = ctx.t.businesses[id];
  return (
    <article className={`card card--${variant}`} data-reveal>
      {children && <div className="card__media">{children}</div>}
      <div className="card__body">
        <p className="card__cat">{b.category}</p>
        <h3 className="card__name">{BRAND[id].name}</h3>
        <p className="card__text">{b.short}</p>
        {b.status && <p className="card__status">{b.status}</p>}
        <BrandLink id={id} ctx={ctx} className="card__link" />
      </div>
    </article>
  );
}

export function Home({ ctx }: { ctx: PageContext }) {
  const { t, lang } = ctx;
  const f = t.featured.items;
  return (
    <>
      {/* Hero */}
      <section className="hero theme-dark">
        <div className="hero__net" aria-hidden="false">
          <HeroNetwork t={t} />
        </div>
        <div className="wrap hero__inner">
          <p className="eyebrow hero__eyebrow">{t.hero.eyebrow}</p>
          <h1 className="headline headline--hero">
            {t.hero.title[0].split(/(?<=\.)\s+/).map((line) => (
              <span className="headline__line" key={line}>
                <span>{line}</span>{" "}
              </span>
            ))}
            <span className="headline__line">
              <span>
                <em>{t.hero.title[1]}</em>
              </span>
            </span>
          </h1>
          <p className="lead hero__lead">{t.hero.lead}</p>
          <div className="hero__cta">
            <a className="btn btn--light" href="#businesses">
              {t.hero.ctaPrimary}
              <Arrow />
            </a>
            <a className="btn btn--ghost" href={pagePath(lang, "about")}>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>{t.hero.scroll}</span>
          <i />
        </div>
      </section>

      {/* The Group */}
      <section className="section group" id="group">
        <div className="wrap group__grid">
          <div>
            <Eyebrow>{t.group.eyebrow}</Eyebrow>
            <Headline parts={t.group.title} />
          </div>
          <div className="group__copy">
            <p className="lead" data-reveal>
              {t.group.lead}
            </p>
            <p data-reveal>{t.group.body}</p>
          </div>
        </div>
        <div className="wrap">
          <dl className="facts" data-reveal>
            {t.group.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section portfolio" id="businesses">
        <div className="wrap">
          <div className="section__head">
            <div>
              <Eyebrow>{t.portfolio.eyebrow}</Eyebrow>
              <Headline parts={t.portfolio.title} />
            </div>
            <p className="lead" data-reveal>
              {t.portfolio.lead}
            </p>
          </div>
          <div className="bento">
            <Card id="agrotech" ctx={ctx} variant="photo card--a">
              <Picture name="agrotech-flight" widths={[480, 800, 1200]} fallback={800} alt="" sizes="(min-width: 900px) 56vw, 100vw" width={1200} height={1600} />
            </Card>
            <Card id="agralon" ctx={ctx} variant="dark card--b">
              <Picture name={`agralon-platform-${lang}`} widths={[800, 1400, 2200]} fallback={1400} alt="" sizes="(min-width: 900px) 60vw, 140vw" width={2352} height={1566} />
            </Card>
            <Card id="sourcing" ctx={ctx} variant="photo card--c">
              <Picture name="sourcing-fibre" widths={[480, 680]} fallback={680} alt="" sizes="(min-width: 900px) 40vw, 100vw" width={680} height={850} />
            </Card>
            <Card id="renvora" ctx={ctx} variant="dark card--d">
              <div className="card__signal" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </Card>
            <Card id="versicherung" ctx={ctx} variant="plain card--e" />
            <Card id="akquise" ctx={ctx} variant="plain card--f" />
          </div>
          <p className="portfolio__more" data-reveal>
            <a className="text-link" href={pagePath(lang, "businesses")}>
              {t.portfolio.viewAll}
              <Arrow />
            </a>
          </p>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="section ecosystem theme-dark" id="ecosystem">
        <div className="wrap">
          <div className="section__head section__head--center">
            <Eyebrow>{t.ecosystem.eyebrow}</Eyebrow>
            <Headline parts={t.ecosystem.title} />
            <p className="lead" data-reveal>
              {t.ecosystem.lead}
            </p>
          </div>
          <Ecosystem t={t} lang={lang} />
        </div>
      </section>

      {/* Featured ventures */}
      <section className="section featured" id="ventures">
        <div className="wrap">
          <div className="section__head">
            <div>
              <Eyebrow>{t.featured.eyebrow}</Eyebrow>
              <Headline parts={t.featured.title} />
            </div>
          </div>

          <article className="feature">
            <div className="feature__media feature__media--photo" data-reveal="media">
              <Picture className="parallax" name="agrotech-field" widths={[800, 1400, 1900]} fallback={1400} alt={f.agrotech.alt} sizes="(min-width: 1000px) 62vw, 100vw" width={1900} height={887} />
            </div>
            <div className="feature__body">
              <p className="feature__kicker" data-reveal>
                01 — {f.agrotech.kicker}
              </p>
              <h3 data-reveal>{f.agrotech.title}</h3>
              <p data-reveal>{f.agrotech.text}</p>
              <div data-reveal>
                <BrandLink id="agrotech" ctx={ctx} />
              </div>
            </div>
          </article>

          <article className="feature feature--flip">
            <div className="feature__media feature__media--device theme-dark" data-reveal="media">
              <Picture className="device" name={`agralon-platform-${lang}`} widths={[800, 1400, 2200]} fallback={1400} alt={f.agralon.alt} sizes="(min-width: 1000px) 62vw, 100vw" width={2352} height={1566} />
              <ul className="chips" aria-hidden="true">
                {t.businesses.agralon.focus.slice(0, 4).map((chip, i) => (
                  <li key={chip} style={{ ["--i" as string]: i }}>
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature__body">
              <p className="feature__kicker" data-reveal>
                02 — {f.agralon.kicker}
              </p>
              <h3 data-reveal>{f.agralon.title}</h3>
              <p data-reveal>{f.agralon.text}</p>
              <div data-reveal>
                <BrandLink id="agralon" ctx={ctx} />
              </div>
            </div>
          </article>

          <article className="feature">
            <div className="feature__media feature__media--photo" data-reveal="media">
              <Picture className="parallax" name="sourcing-warehouse" widths={[800, 1600]} fallback={1600} alt={f.sourcing.alt} sizes="(min-width: 1000px) 62vw, 100vw" width={1600} height={747} />
            </div>
            <div className="feature__body">
              <p className="feature__kicker" data-reveal>
                03 — {f.sourcing.kicker}
              </p>
              <h3 data-reveal>{f.sourcing.title}</h3>
              <p data-reveal>{f.sourcing.text}</p>
              <div data-reveal>
                <BrandLink id="sourcing" ctx={ctx} />
              </div>
            </div>
          </article>

          <article className="feature feature--flip">
            <div className="feature__media feature__media--flow theme-dark" data-reveal="media">
              <RenvoraFlow t={t} />
            </div>
            <div className="feature__body">
              <p className="feature__kicker" data-reveal>
                04 — {f.renvora.kicker}
              </p>
              <h3 data-reveal>{f.renvora.title}</h3>
              <p data-reveal>{f.renvora.text}</p>
              <div data-reveal>
                <BrandLink id="renvora" ctx={ctx} />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Principles */}
      <section className="section principles theme-sand" id="principles">
        <div className="wrap">
          <div className="section__head">
            <div>
              <Eyebrow>{t.principles.eyebrow}</Eyebrow>
              <Headline parts={t.principles.title} />
            </div>
          </div>
          <ol className="principles__list">
            {t.principles.items.map((item, i) => (
              <li key={item.title} data-reveal style={{ ["--i" as string]: i }}>
                <span className="principles__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Uruguay */}
      <section className="section origin" id="origin">
        <div className="wrap origin__grid">
          <div className="origin__copy">
            <Eyebrow>{t.uruguay.eyebrow}</Eyebrow>
            <Headline parts={t.uruguay.title} />
            <p className="lead" data-reveal>
              {t.uruguay.text}
            </p>
            <dl className="origin__points">
              {t.uruguay.points.map((p) => (
                <div key={p.title} data-reveal>
                  <dt>{p.title}</dt>
                  <dd>{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="origin__globe" data-reveal="media">
            <Globe t={t} />
          </div>
        </div>
      </section>

      {/* Future ventures */}
      <section className="section future theme-dark" id="vision">
        <div className="future__grid" aria-hidden="true" />
        <div className="wrap future__inner">
          <Eyebrow>{t.future.eyebrow}</Eyebrow>
          <Headline parts={t.future.title} className="headline--xl" />
          <p className="lead" data-reveal>
            {t.future.text}
          </p>
          <ul className="future__fields">
            {t.future.fields.map((field, i) => (
              <li key={field} data-reveal style={{ ["--i" as string]: i }}>
                {field}
              </li>
            ))}
          </ul>
          <p className="future__note" data-reveal>
            {t.future.note}
          </p>
        </div>
      </section>

      <ContactCta ctx={ctx} />
    </>
  );
}

export function ContactCta({ ctx }: { ctx: PageContext }) {
  const { t, lang } = ctx;
  return (
    <section className="section cta">
      <div className="wrap cta__inner">
        <Headline parts={t.cta.title} />
        <div className="cta__side">
          <p className="lead" data-reveal>
            {t.cta.text}
          </p>
          <a className="btn btn--dark" href={pagePath(lang, "contact")} data-reveal>
            {t.cta.button}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
