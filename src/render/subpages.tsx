import type { ReactNode } from "react";
import { BRAND, BRANDS, CONTACT, CONTACT_ENDPOINT, SITE_URL, pagePath } from "../site/config";
import { LEGAL } from "../content";
import { Arrow, Eyebrow, Headline, PageHero, Picture } from "./layout";
import type { PageContext } from "./layout";
import { BrandLink, ContactCta } from "./home";

/* ---------- Businesses ---------- */

export function Businesses({ ctx }: { ctx: PageContext }) {
  const { t, lang } = ctx;
  const p = t.businessesPage;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="section directory">
        <div className="wrap">
          {BRANDS.map((id, i) => {
            const b = t.businesses[id];
            return (
              <article className="entry" id={id} key={id}>
                <p className="entry__num" data-reveal>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="entry__head">
                  <p className="card__cat" data-reveal>
                    {b.category}
                  </p>
                  <h2 data-reveal>{BRAND[id].name}</h2>
                  {b.status && (
                    <p className="card__status" data-reveal>
                      {b.status}
                    </p>
                  )}
                </div>
                <div className="entry__body">
                  <p className="lead" data-reveal>
                    {b.long}
                  </p>
                  <div className="entry__focus" data-reveal>
                    <h3>{p.focusLabel}</h3>
                    <ul>
                      {b.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div data-reveal>
                    <BrandLink id={id} ctx={ctx} />
                  </div>
                </div>
              </article>
            );
          })}
          <article className="entry entry--future" id="future">
            <p className="entry__num" data-reveal>
              +
            </p>
            <div className="entry__head">
              <p className="card__cat" data-reveal>
                {t.ecosystem.futureCategory}
              </p>
              <h2 data-reveal>{t.ecosystem.futureName}</h2>
            </div>
            <div className="entry__body">
              <p className="lead" data-reveal>
                {t.future.text}
              </p>
              <div data-reveal>
                <a className="brand-link" href={pagePath(lang, "home", "#vision")}>
                  <span>{p.futureLink}</span>
                  <Arrow />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
      <ContactCta ctx={ctx} />
    </>
  );
}

/* ---------- About ---------- */

export function About({ ctx }: { ctx: PageContext }) {
  const { t } = ctx;
  const a = t.about;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} lead={a.lead} />
      <section className="section story">
        <div className="wrap">
          <ol className="story__list">
            {a.story.map((s, i) => (
              <li key={s.title} data-reveal>
                <span className="principles__num">{String(i + 1).padStart(2, "0")}</span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section principles theme-sand">
        <div className="wrap">
          <div className="section__head">
            <div>
              <Eyebrow>{a.approachTitle}</Eyebrow>
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
      <section className="section leadership">
        <div className="wrap leadership__grid">
          <div className="leadership__photo" data-reveal="media">
            <Picture name="stanley-kunz" widths={[400, 800]} fallback={800} alt={a.leadership.photoAlt} sizes="(min-width: 900px) 30vw, 80vw" width={800} height={1000} />
          </div>
          <div>
            <Eyebrow>{a.leadership.eyebrow}</Eyebrow>
            <h2 className="leadership__name" data-reveal>
              {a.leadership.title}
            </h2>
            <p className="leadership__role" data-reveal>
              {a.leadership.role}
            </p>
            <p className="lead" data-reveal>
              {a.leadership.text}
            </p>
            <dl className="facts facts--stack" data-reveal>
              {a.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <ContactCta ctx={ctx} />
    </>
  );
}

/* ---------- Contact ---------- */

export function Contact({ ctx }: { ctx: PageContext }) {
  const { t } = ctx;
  const c = t.contactPage;
  const f = c.form;
  // With an endpoint the form really sends; without one it prepares an e-mail and says so.
  const sends = Boolean(CONTACT_ENDPOINT);
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section contact">
        <div className="wrap contact__grid">
          <form
            className="form"
            noValidate
            data-contact-form
            data-endpoint={CONTACT_ENDPOINT ?? undefined}
            data-lang={ctx.lang}
            data-sending={f.send.sending}
            data-mailto={CONTACT.email}
            data-subject={f.mailSubject}
            data-error-required={f.errorRequired}
            data-error-email={f.errorEmail}
          >
            <div className="form__row">
              <div className="field">
                <label htmlFor="cf-name">{f.name}</label>
                <input id="cf-name" name="name" type="text" autoComplete="name" required aria-describedby="cf-name-error" />
                <p className="field__error" id="cf-name-error" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="cf-company">
                  {f.company} <span>({f.optional})</span>
                </label>
                <input id="cf-company" name="company" type="text" autoComplete="organization" />
              </div>
            </div>
            <div className="form__row">
              <div className="field">
                <label htmlFor="cf-email">{f.email}</label>
                <input id="cf-email" name="email" type="email" autoComplete="email" required aria-describedby="cf-email-error" />
                <p className="field__error" id="cf-email-error" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="cf-area">{f.area}</label>
                <select id="cf-area" name="area" defaultValue={f.areaGeneral}>
                  <option>{f.areaGeneral}</option>
                  {BRANDS.map((id) => (
                    <option key={id}>{BRAND[id].name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="cf-message">{f.message}</label>
              <textarea id="cf-message" name="message" rows={6} required aria-describedby="cf-message-error" />
              <p className="field__error" id="cf-message-error" aria-live="polite" />
            </div>
            {sends && (
              <div className="form__trap" aria-hidden="true">
                <label htmlFor="cf-website">Website</label>
                <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            )}
            <div className="form__foot">
              <button className="btn btn--dark" type="submit">
                <span data-form-label>{sends ? f.send.submit : f.submit}</span>
                <Arrow />
              </button>
              <p className="form__note">{sends ? f.send.note : f.note}</p>
            </div>
            <p className="form__success" role="status" tabIndex={-1} hidden data-form-success>
              {sends ? f.send.success : f.success} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
            {sends && (
              <p className="form__failure" role="alert" tabIndex={-1} hidden data-form-failure>
                {f.send.error} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
            )}
          </form>
          <aside className="contact__direct" data-reveal>
            <h2>{c.directTitle}</h2>
            <dl>
              <div>
                <dt>{c.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </dd>
              </div>
              <div>
                <dt>{c.phoneLabel}</dt>
                <dd>
                  <a href={CONTACT.phoneUy.href}>{CONTACT.phoneUy.label}</a>
                  <br />
                  <a href={CONTACT.phoneDe.href}>{CONTACT.phoneDe.label}</a>
                </dd>
              </div>
              <div>
                <dt>{c.locationLabel}</dt>
                <dd>{c.location}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ---------- Legal pages ---------- */

function Lines({ lines }: { lines: string[] }) {
  return (
    <p>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

function LegalShell({ ctx, eyebrow, title, children }: { ctx: PageContext; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <>
      <section className="page-hero page-hero--compact theme-dark">
        <div className="wrap">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="headline headline--legal">{title}</h1>
        </div>
      </section>
      <section className="section legal">
        <div className="wrap legal__body">
          {children}
          <p className="legal__updated">{ctx.t.legalOverrides.updated}</p>
        </div>
      </section>
    </>
  );
}

export function LegalNotice({ ctx }: { ctx: PageContext }) {
  const l = LEGAL[ctx.lang].impressum;
  const o = ctx.t.legalOverrides;
  return (
    <LegalShell ctx={ctx} eyebrow={l.eyebrow} title={l.title}>
      <p>{l.intro}</p>
      <h2>{l.providerTitle}</h2>
      <Lines lines={l.providerLines} />
      <h2>{l.contactTitle}</h2>
      <p>
        {l.emailLabel} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <br />
        {l.phoneLabel} <a href={CONTACT.phoneUy.href}>{CONTACT.phoneUy.label}</a> / <a href={CONTACT.phoneDe.href}>{CONTACT.phoneDe.label}</a>
        <br />
        {l.websiteLabel} <a href={SITE_URL + "/"}>kunzglobal.com</a>
      </p>
      <h2>{l.companyDataTitle}</h2>
      <Lines lines={l.companyDataLines} />
      <h2>{l.responsibleTitle}</h2>
      <p>{l.responsibleText}</p>
      <h2>{o.brandsTitle}</h2>
      <p>{o.brandsText}</p>
      <ul>
        {BRANDS.filter((id) => BRAND[id].url).map((id) => (
          <li key={id}>
            {BRAND[id].name} — <a href={BRAND[id].url!} target="_blank" rel="noopener">{BRAND[id].domain}</a>
          </li>
        ))}
      </ul>
      <h2>{l.disclaimerTitle}</h2>
      <p>{l.disclaimerText}</p>
    </LegalShell>
  );
}

export function Privacy({ ctx }: { ctx: PageContext }) {
  const l = LEGAL[ctx.lang].datenschutz;
  const o = ctx.t.legalOverrides;
  return (
    <LegalShell ctx={ctx} eyebrow={l.eyebrow} title={l.title}>
      <p>{l.intro}</p>
      <h2>{l.controllerTitle}</h2>
      <Lines lines={l.controllerLines} />
      <h2>{l.minimizationTitle}</h2>
      <p>{l.minimizationText}</p>
      <h2>{l.serverDataTitle}</h2>
      <p>{l.serverDataText}</p>
      <h2>{l.contactTitle}</h2>
      <p>{l.contactText}</p>
      <h2>{o.formTitle}</h2>
      <p>{CONTACT_ENDPOINT ? o.formTextSend : o.formText}</p>
      <h2>{o.socialTitle}</h2>
      <p>{o.socialText}</p>
      <h2>{l.cookiesTitle}</h2>
      <p>{l.cookiesText}</p>
      <h2>{l.rightsTitle}</h2>
      <p>{l.rightsIntro}</p>
      <ul>
        {l.rightsList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{l.rightsOutro}</p>
      <h2>{l.securityTitle}</h2>
      <p>{l.securityText}</p>
      <h2>{l.changesTitle}</h2>
      <p>{l.changesText}</p>
    </LegalShell>
  );
}

export function Terms({ ctx }: { ctx: PageContext }) {
  const l = LEGAL[ctx.lang].agb;
  return (
    <LegalShell ctx={ctx} eyebrow={l.eyebrow} title={l.title}>
      <p>{l.intro}</p>
      {l.sections.map((s) => (
        <div key={s.title}>
          <h2>{s.title}</h2>
          <p>{s.text}</p>
        </div>
      ))}
      <p>{l.responsibleLine}</p>
    </LegalShell>
  );
}

/* ---------- 404 ---------- */

export function NotFound({ ctx }: { ctx: PageContext }) {
  const { t, lang } = ctx;
  return (
    <section className="page-hero page-hero--full theme-dark">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="headline headline--page">{t.notFound.title}</h1>
        <p className="lead">{t.notFound.text}</p>
        <p>
          <a className="btn btn--light" href={pagePath(lang, "home")}>
            {t.notFound.back}
            <Arrow />
          </a>
        </p>
      </div>
    </section>
  );
}
