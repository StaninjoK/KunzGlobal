import type { ReactNode } from "react";
import { BRAND, BRAND_TARGET, pagePath } from "../site/config";
import type { BrandId } from "../site/config";
import { Arrow, Eyebrow, Headline, Picture } from "./layout";
import type { PageContext } from "./layout";
import { Ecosystem, Globe, HeroNetwork, RenvoraFlow } from "./graphics";

/** Primary call to action of a business: its own label, the verified target in the page language. */
export function BrandLink({ id, ctx, className = "" }: { id: BrandId; ctx: PageContext; className?: string }) {
  const { t, lang } = ctx;
  const b = t.businesses[id];
  const target = BRAND_TARGET[id]?.[lang];
  if (!target) {
    return (
      <a className={`brand-link ${className}`.trim()} href={pagePath(lang, "contact")}>
        <span>{b.cta}</span>
        <Arrow />
      </a>
    );
  }
  const note = target.lang !== lang ? ` · ${t.portfolio.siteLang[target.lang]}` : "";
  return (
    <a className={`brand-link ${className}`.trim()} href={target.href} hrefLang={target.lang} target="_blank" rel="noopener">
      <span>
        {b.cta}
        <span className="brand-link__domain">
          {" "}
          · {BRAND[id].domain}
          {note}
        </span>
      </span>
      <Arrow diagonal />
      <span className="sr-only"> ({t.portfolio.external})</span>
    </a>
  );
}

/** Art-directed photo for a portfolio card: landscape crop from 900 px, portrait file below. */
type CardImage = { name: string; widths: number[]; w: number; h: number; fallback: number };

function CardPhoto({ wide, narrow }: { wide: CardImage; narrow: CardImage }) {
  const set = (name: string, widths: number[]) => widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" media="(min-width: 900px)" srcSet={set(wide.name, wide.widths)} sizes="(min-width: 1560px) 900px, 58vw" />
      <source type="image/webp" srcSet={set(narrow.name, narrow.widths)} sizes="100vw" />
      <img src={`/img/${narrow.name}-${narrow.fallback}.jpg`} alt="" width={narrow.w} height={narrow.h} loading="lazy" decoding="async" />
    </picture>
  );
}

function Card({ id, ctx, variant, media, visual, extra }: { id: BrandId; ctx: PageContext; variant: string; media?: ReactNode; visual?: ReactNode; extra?: ReactNode }) {
  const { t } = ctx;
  const b = t.businesses[id];
  return (
    <article className={`card card--${variant}`} data-reveal>
      {media && <div className="card__media">{media}</div>}
      <div className="card__body">
        <p className="card__cat">{b.category}</p>
        <h3 className="card__name">{BRAND[id].name}</h3>
        <p className="card__text">{b.offer}</p>
        {extra}
        {b.status && (
          <p className="card__status">
            <span className="sr-only">{t.featured.statusLabel}: </span>
            {b.status}
          </p>
        )}
        <BrandLink id={id} ctx={ctx} className="card__link" />
      </div>
      {visual && <div className="card__visual">{visual}</div>}
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
            <Card
              id="agrotech"
              ctx={ctx}
              variant="photo card--a"
              media={<CardPhoto wide={{ name: "agrotech-flight-wide", widths: [800, 1200], w: 1200, h: 940, fallback: 1200 }} narrow={{ name: "agrotech-flight", widths: [480, 800, 1200], w: 800, h: 1067, fallback: 800 }} />}
            />
            <Card
              id="agralon"
              ctx={ctx}
              variant="dark card--b"
              extra={
                <ol className="card__flow">
                  {t.portfolio.agralonFlow.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              }
              visual={
                <figure className="card__screen">
                  <figcaption>{t.portfolio.sampleData}</figcaption>
                  <Picture name={`agralon-jobs-${lang}`} widths={[600, 1000]} fallback={1000} alt="" sizes="(min-width: 900px) 520px, 100vw" width={1000} height={571} />
                </figure>
              }
            />
            <Card
              id="sourcing"
              ctx={ctx}
              variant="photo card--c"
              media={
                <>
                  <CardPhoto
                    wide={{ name: "sourcing-warehouse", widths: [800, 1600], w: 1600, h: 747, fallback: 1600 }}
                    narrow={{ name: "sourcing-warehouse-tall", widths: [480, 747], w: 747, h: 1600, fallback: 747 }}
                  />
                  <span className="card__tag card__tag--lines">
                    {t.portfolio.sourcingLines.map((line, i) => (
                      <span key={line}>
                        <b>{String(i + 1).padStart(2, "0")}</b>
                        {line}
                      </span>
                    ))}
                  </span>
                </>
              }
            />
            <Card
              id="renvora"
              ctx={ctx}
              variant="dark card--d"
              visual={
                <figure className="card__schema">
                  <ol aria-label={t.featured.items.renvora.alt}>
                    {t.portfolio.renvoraFlow.map((step, i) => (
                      <li key={step}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <figcaption>{t.featured.renvoraCaption}</figcaption>
                </figure>
              }
            />
            <Card
              id="systems"
              ctx={ctx}
              variant="dark card--top card--e"
              visual={
                <figure className="card__system">
                  <div className="card__window" aria-hidden="true">
                    <span className="card__window-bar">
                      <i />
                      <i />
                      <i />
                    </span>
                    <ul>
                      {t.portfolio.systemsModules.map((m) => (
                        <li key={m}>
                          <strong>{m}</strong>
                          <i />
                          <i />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figcaption>{t.portfolio.systemsCaption}</figcaption>
                </figure>
              }
            />
            <Card
              id="akquise"
              ctx={ctx}
              variant="plain card--top card--f"
              visual={
                <figure className="card__ledger">
                  <ol>
                    {t.portfolio.akquiseSteps.map((step, i) => (
                      <li key={step}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {step}
                        <i aria-hidden="true" />
                      </li>
                    ))}
                  </ol>
                  <figcaption>{t.portfolio.akquiseCaption}</figcaption>
                </figure>
              }
            />
            <Card
              id="vomando"
              ctx={ctx}
              variant="plain card--top card--g"
              visual={
                <figure className="card__app">
                  <div className="card__phone" aria-hidden="true">
                    <span className="card__phone-notch" />
                    <p className="card__phone-course">{t.portfolio.vomando.course}</p>
                    <p className="card__phone-lesson">{t.portfolio.vomando.path}</p>
                    <span className="card__phone-progress">
                      <i />
                    </span>
                    <ul className="card__phone-list">
                      {t.portfolio.vomando.pillars.map((pillar, i) => (
                        <li key={pillar} className={i === 0 ? "is-active" : undefined}>
                          <span>{String(i + 1).padStart(2, "0")}</span>
                          {pillar}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figcaption>{t.portfolio.vomando.caption}</figcaption>
                </figure>
              }
            />
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
            <div className="feature__media feature__media--photo feature__media--wide" data-reveal="media">
              <Picture className="parallax" name="agrotech-field" widths={[800, 1400, 1800]} fallback={1400} alt={f.agrotech.alt} sizes="(min-width: 1000px) 62vw, 100vw" width={1800} height={1121} />
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
              <p className="feature__caption">{t.portfolio.sampleData}</p>
            </div>
            <div className="feature__body">
              <p className="feature__kicker" data-reveal>
                02 — {f.agralon.kicker}
              </p>
              <h3 data-reveal>{f.agralon.title}</h3>
              <p data-reveal>{f.agralon.text}</p>
              <ol className="feature__steps" aria-label={t.featured.agralonStepsLabel} data-reveal>
                {t.featured.agralonSteps.map((step, i) => (
                  <li key={step}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
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
              <dl className="feature__facts" data-reveal>
                {t.featured.sourcingFacts.map((fact) => (
                  <div key={fact.term}>
                    <dt>{fact.term}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
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
              <p className="card__status feature__status" data-reveal>
                <span className="sr-only">{t.featured.statusLabel}: </span>
                {t.businesses.renvora.status}
              </p>
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
