// Build step 3: writes every page as static HTML into dist/, plus sitemap.xml.
// Runs after `vite build` (client assets + manifest) and the SSR build of this file.
import fs from "node:fs";
import path from "node:path";
import { LANGS, PAGES, SITE_URL, HTML_LANG, pagePath } from "../site/config";
import { renderRoute, routes } from "./pages";

interface ManifestEntry {
  file: string;
  css?: string[];
  assets?: string[];
}

const dist = path.resolve("dist");
const manifestFile = path.join(dist, ".vite", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8")) as Record<string, ManifestEntry>;
const entry = manifest["src/client/main.ts"];
if (!entry) throw new Error("Client entry missing from the Vite manifest");

const fontFiles = fs.readdirSync(path.join(dist, "assets")).filter((f) => /^inter-tight-latin-wght-normal.*\.woff2$/.test(f));
const assets = {
  scripts: ["/" + entry.file],
  styles: (entry.css ?? []).map((f) => "/" + f),
  preloadFonts: fontFiles.map((f) => "/assets/" + f),
};

for (const route of routes()) {
  const file = route.path.endsWith("/") ? path.join(dist, route.path, "index.html") : path.join(dist, route.path);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, renderRoute(route, assets));
}

const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.flatMap((page) =>
  LANGS.map((lang) => {
    const alternates = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${SITE_URL}${pagePath(l, page)}"/>`).join("\n");
    return `  <url>\n    <loc>${SITE_URL}${pagePath(lang, page)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`;
  })
);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
);

fs.rmSync(path.join(dist, ".vite"), { recursive: true, force: true });
console.log(`prerendered ${routes().length} pages`);
