// Checks the built site in dist/. Run `npm run build` first (or `npm run check`).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const LANGS = ["en", "es", "de", "pt"];
const PAGES = ["", "businesses/", "about/", "contact/", "legal/", "privacy/", "terms/"];
const routes = LANGS.flatMap((lang) => PAGES.map((page) => ({ lang, url: (lang === "en" ? "/" : `/${lang}/`) + page })));

// Only websites that were verified to belong to the group may be linked.
const ALLOWED_EXTERNAL = ["https://kunzagrotech.com/", "https://agralon.com/", "https://kunzsourcing.com/", "https://renvora.lat/", "https://kunzakquise.com/", "https://kunzsystems.com/", "https://kunzglobal.com/"];

// Confidential ventures and unprovable claims must never reach the published pages.
const FORBIDDEN = [/kunz\s*solar/i, /kunz\s*recycling/i, /\bsolar\b/i, /recycling/i, /photovolta/i, /market[- ]leading/i, /industry leader/i, /number one/i, /marktführer/i, /líder del mercado/i, /\d+\s*\+\s*(clients|kunden|clientes)/i, /lorem ipsum/i,
  // Kunz Versicherung is not part of the portfolio (removed 2026-09-19)
  /versicherung/i, /insurance/i, /\bseguros?\b/i, /risk solutions/i];

const read = (url) => fs.readFileSync(path.join(dist, url.endsWith("/") ? url + "index.html" : url), "utf8");
const exists = (url) => fs.existsSync(path.join(dist, url.endsWith("/") ? url + "index.html" : url));
const visibleText = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ");

test("every page of every language is built", () => {
  assert.ok(fs.existsSync(dist), "dist/ is missing: run the build first");
  for (const r of routes) assert.ok(exists(r.url), `missing ${r.url}`);
  assert.ok(exists("/404.html"));
  assert.equal(fs.readFileSync(path.join(dist, "CNAME"), "utf8").trim(), "kunzglobal.com");
});

test("head: language, title, description, canonical, hreflang, Open Graph", () => {
  const titles = new Set();
  for (const r of routes) {
    const html = read(r.url);
    assert.match(html, new RegExp(`<html lang="${r.lang}"`), `${r.url} lang`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && title.length > 10 && title.length < 70, `${r.url} title: ${title}`);
    assert.ok(!titles.has(`${r.lang}:${title}`), `${r.url} duplicate title`);
    titles.add(`${r.lang}:${title}`);
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(description && description.length >= 40 && description.length <= 230, `${r.url} description (${description?.length})`);
    assert.ok(html.includes(`<link rel="canonical" href="https://kunzglobal.com${r.url}"/>`), `${r.url} canonical`);
    assert.equal((html.match(/rel="alternate" hrefLang=/gi) || []).length, 5, `${r.url} hreflang count`);
    assert.ok(html.includes('hrefLang="x-default"'), `${r.url} x-default`);
    assert.ok(html.includes('property="og:image"') && html.includes('property="og:locale"'), `${r.url} og`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${r.url} must have exactly one h1`);
  }
});

test("no confidential projects, no unprovable claims", () => {
  for (const r of [...routes, { url: "/404.html" }]) {
    const text = visibleText(read(r.url));
    for (const pattern of FORBIDDEN) assert.ok(!pattern.test(text), `${r.url} contains ${pattern}`);
  }
});

test("links, anchors and images resolve; external links are verified ones", () => {
  for (const r of [...routes, { url: "/404.html" }]) {
    const html = read(r.url);
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
      if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (/^https?:/.test(href)) {
        // pages and anchors on a verified site are fine (targets per language: src/site/config.ts BRAND_TARGET)
        assert.ok(ALLOWED_EXTERNAL.includes(new URL(href).origin + "/"), `${r.url} links to unverified ${href}`);
        continue;
      }
      const [file, hash] = href.split("#");
      const target = file || r.url;
      assert.ok(exists(target), `${r.url} → ${href} does not exist`);
      if (hash) assert.match(read(target), new RegExp(`id="${hash}"`), `${r.url} → ${href} anchor missing`);
    }
    const sources = [...html.matchAll(/\s(?:src|href)="(\/(?:img|assets)\/[^"]+)"/g)].map((m) => m[1]);
    for (const [, srcset] of html.matchAll(/srcSet="([^"]+)"/gi)) sources.push(...srcset.split(",").map((s) => s.trim().split(" ")[0]));
    for (const src of sources) assert.ok(fs.existsSync(path.join(dist, src)), `${r.url} missing asset ${src}`);
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(tag, /\salt="/, `${r.url} image without alt: ${tag.slice(0, 80)}`);
      assert.match(tag, /\swidth="\d+"/, `${r.url} image without dimensions`);
    }
  }
});

test("portfolio cards name the offer and a specific next step", () => {
  const generic = /Visit website|Website besuchen|Visitar sitio web|Visitar site/;
  for (const lang of LANGS) {
    const html = read(lang === "en" ? "/" : `/${lang}/`);
    const portfolio = html.slice(html.indexOf('id="businesses"'), html.indexOf('id="ecosystem"'));
    assert.equal((portfolio.match(/<article class="card /g) || []).length, 7, `${lang}: seven cards`);
    assert.equal((portfolio.match(/class="brand-link card__link"/g) || []).length, 7, `${lang}: one primary link per card`);
    assert.ok(!generic.test(visibleText(html)), `${lang}: generic link label left`);
  }
});

test("seven active businesses everywhere: portfolio, directory, ecosystem, contact form", () => {
  const brands = ["Kunz Agrotech", "Agralon", "Kunz Sourcing", "Renvora", "Kunz Systems", "KunzAkquise", "Vomando"];
  for (const lang of LANGS) {
    const prefix = lang === "en" ? "/" : `/${lang}/`;
    const home = read(prefix);
    const eco = home.slice(home.indexOf('id="ecosystem"'), home.indexOf('id="ventures"'));
    assert.equal((eco.match(/data-eco-node="/g) || []).length, 8, `${lang}: seven businesses + Future Ventures in the ecosystem`);
    const directory = read(prefix + "businesses/");
    assert.equal((directory.match(/<article class="entry"/g) || []).length, 7, `${lang}: seven directory entries`);
    const select = read(prefix + "contact/").match(/<select[\s\S]*?<\/select>/)[0];
    for (const b of brands) {
      assert.ok(eco.includes(`>${b}<`), `${lang}: ${b} missing in ecosystem`);
      assert.ok(directory.includes(`>${b}</h2>`), `${lang}: ${b} missing in directory`);
      assert.ok(select.includes(`>${b}</option>`), `${lang}: ${b} missing in contact form`);
    }
  }
});

test("vomando.com is named but not linked while the site is not published", () => {
  for (const lang of LANGS) {
    for (const p of ["", "businesses/"]) {
      const html = read((lang === "en" ? "/" : `/${lang}/`) + p);
      assert.ok(visibleText(html).includes("vomando.com"), `${lang}/${p}: domain not shown`);
      assert.ok(!/href="[^"]*vomando\.com/.test(html), `${lang}/${p}: vomando.com must not be linked`);
    }
  }
});

test("language switcher points to the same page in each language", () => {
  const html = read("/de/about/");
  for (const url of ["/about/", "/es/about/", "/de/about/", "/pt/about/"]) assert.ok(html.includes(`href="${url}"`), `switcher misses ${url}`);
});

test("contact form is labelled and sends nothing by itself", () => {
  for (const lang of LANGS) {
    const html = read((lang === "en" ? "/" : `/${lang}/`) + "contact/");
    for (const id of ["cf-name", "cf-company", "cf-email", "cf-area", "cf-message"]) {
      assert.ok(html.includes(`for="${id}"`) && html.includes(`id="${id}"`), `${lang} contact: ${id} unlabelled`);
    }
    assert.ok(!/<form[^>]*\saction=/.test(html), "the form must not post anywhere");
  }
});

test("sitemap and robots", () => {
  const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
  assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length);
  for (const r of routes) assert.ok(sitemap.includes(`<loc>https://kunzglobal.com${r.url}</loc>`), `sitemap misses ${r.url}`);
  assert.match(fs.readFileSync(path.join(dist, "robots.txt"), "utf8"), /Sitemap: https:\/\/kunzglobal\.com\/sitemap\.xml/);
});

test("page weight stays small", () => {
  const assets = fs.readdirSync(path.join(dist, "assets"));
  const js = assets.filter((f) => f.endsWith(".js")).reduce((sum, f) => sum + fs.statSync(path.join(dist, "assets", f)).size, 0);
  const css = assets.filter((f) => f.endsWith(".css")).reduce((sum, f) => sum + fs.statSync(path.join(dist, "assets", f)).size, 0);
  assert.ok(js < 15_000, `JavaScript is ${js} bytes`);
  assert.ok(css < 70_000, `CSS is ${css} bytes`);
  for (const f of fs.readdirSync(path.join(dist, "img"))) {
    const size = fs.statSync(path.join(dist, "img", f)).size;
    assert.ok(size < 480_000, `${f} is ${size} bytes`); // largest: the detailed field photo for wide hi-dpi screens, lazy-loaded
  }
});
