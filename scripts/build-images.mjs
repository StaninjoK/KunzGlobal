// Generates every image in public/img from the original files of the Kunz projects.
// The originals stay outside this repository; the generated files are committed.
// Usage: node scripts/build-images.mjs [name ...]   (paths below can be overridden with KUNZ_ASSETS)
// With names, only those image sets are written (icons, logo mark and OG image only in a full run).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.env.KUNZ_ASSETS || "C:/Users/stanl/Desktop/KunzGlobal";
const OUT = path.resolve("public/img");
fs.mkdirSync(OUT, { recursive: true });

const SRC = {
  field: `${ROOT}/KunzAgrotech/KunzAgrotech-Repo/source/campo/operacion-lote.jpg`,
  flight: `${ROOT}/KunzAgrotech/KunzAgrotech-Repo/source/foto-stanley-t100-vuelo.jpg`,
  platform: (lang) => `${ROOT}/KunzAgrotech/KunzAgrotech-Repo/source/agralon/plataforma-${lang}.png`,
  // Original photos from the wool supplier's mill (July 2026), not frames from a video.
  tops: (time) => `${ROOT}/Kunz Sourcing/Bilder von Tops Produktion/WhatsApp Image 2026-07-10 at ${time}.jpeg`,
  cattle: `${ROOT}/Kunz Sourcing/Webseite/Webseite Aktuell/Images/Weiderinder.png`,
  portrait: path.resolve("public/images/geschaeftsfuehrer.jpg"),
  logo: `${ROOT}/E-Mail-Signatur/kunzglobal-logo-transparent-hochaufloesend.png`,
};

const ONLY = process.argv.slice(2);

/** Writes <name>-<w>.webp for every width and one JPEG fallback at the fallback width. */
async function responsive(name, input, widths, { fallback = widths[1] ?? widths[0], quality = 78, prepare } = {}) {
  if (ONLY.length && !ONLY.includes(name)) return;
  let base = sharp(await (typeof input === "function" ? input() : input), { failOn: "none" }).rotate();
  if (prepare) base = sharp(await prepare(base).toBuffer());
  for (const w of widths) {
    await base.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  await base.clone().resize({ width: fallback, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/${name}-${fallback}.jpg`);
  console.log("ok", name, widths.join("/"));
}

// Field photo: the number plate of the pickup must not be legible.
async function fieldPrepared() {
  const plate = { left: 2036, top: 562, width: 128, height: 44 };
  const blurred = await sharp(SRC.field).rotate().extract(plate).blur(14).toBuffer();
  return sharp(SRC.field).rotate().composite([{ input: blurred, left: plate.left, top: plate.top }]);
}

// Featured: the whole working scene (both drone rotors, trailer, pickup) without the empty field on the right.
await responsive(
  "agrotech-field",
  async () => sharp(await (await fieldPrepared()).toBuffer()).extract({ left: 300, top: 0, width: 3000, height: 1868 }).toBuffer(),
  [800, 1400, 1800],
  { fallback: 1400, quality: 64 }
);
// Portfolio card, mobile: the full portrait photo (drone at the top, pilot below the text).
await responsive("agrotech-flight", SRC.flight, [480, 800, 1200], { fallback: 800, quality: 72 });
// Portfolio card, desktop: landscape crop that keeps the complete drone and ends above the pilot.
await responsive("agrotech-flight-wide", SRC.flight, [800, 1200], {
  fallback: 1200,
  quality: 74,
  prepare: (img) => img.extract({ left: 0, top: 0, width: 1200, height: 940 }),
});
for (const lang of ["en", "es", "de", "pt"]) {
  await responsive(`agralon-platform-${lang}`, SRC.platform(lang), [800, 1400, 2200], { fallback: 1400, quality: 84 });
  // Portfolio card: only the job list with its workflow stages, large enough to read.
  await responsive(`agralon-jobs-${lang}`, SRC.platform(lang), [600, 1000], {
    fallback: 1000,
    quality: 84,
    prepare: (img) => img.extract({ left: 452, top: 806, width: 980, height: 560 }),
  });
}
await responsive("sourcing-warehouse", SRC.tops("13.47.56 (1)"), [800, 1600], { fallback: 1600, quality: 76 });
await responsive("sourcing-warehouse-tall", SRC.tops("13.47.56 (2)"), [480, 747], { fallback: 747, quality: 76 });
await responsive("sourcing-tops", SRC.tops("13.47.52"), [800, 1600], { fallback: 1600, quality: 76 });
// Beef: rendered illustration from the previous kunzsourcing.com (no real photos yet); always shown with an "Illustration" label.
// The crop leaves out the old logo at the top left.
await responsive("sourcing-beef", SRC.cattle, [800, 1122], {
  fallback: 1122,
  quality: 76,
  prepare: (img) => img.extract({ left: 0, top: 500, width: 1122, height: 842 }),
});
await responsive("stanley-kunz", SRC.portrait, [400, 800], {
  fallback: 800,
  prepare: (img) => img.resize({ width: 800, height: 1000, fit: "cover", position: "attention" }),
});

if (ONLY.length) process.exit(0);

// Logo mark (left part of the lockup) as an alpha mask; the page colours it with CSS.
const mark = sharp(SRC.logo).extract({ left: 0, top: 0, width: 252, height: 267 }).resize({ height: 256 });
const markAlpha = await mark.clone().extractChannel("alpha").toBuffer();
const markSize = await sharp(markAlpha).metadata();
const solid = (hex) =>
  sharp({ create: { width: markSize.width, height: markSize.height, channels: 3, background: hex } }).joinChannel(markAlpha).png().toBuffer();
await sharp(await solid("#ffffff")).toFile(`${OUT}/logo-mark.png`);

// Favicons and touch icons: white mark on the group's near-black.
async function icon(size, file) {
  const inner = Math.round(size * 0.62);
  const glyph = await sharp(await solid("#f4f1ea")).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const radius = Math.round(size * 0.22);
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#0e1412"/></svg>`);
  await sharp(bg).composite([{ input: glyph, gravity: "centre" }]).png().toFile(file);
}
await icon(32, path.resolve("public/favicon-32.png"));
await icon(180, path.resolve("public/apple-touch-icon.png"));
await icon(192, path.resolve("public/icon-192.png"));
await icon(512, path.resolve("public/icon-512.png"));

// Open Graph image (1200×630): dark ground, quiet network, mark and wordmark.
const W = 1200, H = 630, cx = 860, cy = 315;
const nodes = [[-250, -170], [40, -235], [270, -90], [250, 140], [-20, 230], [-270, 110]].map(([x, y]) => [cx + x, cy + y]);
const lines = nodes.map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#6f8f7d" stroke-opacity=".45" stroke-width="1.2"/>`).join("");
const dots = nodes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#b9c8bd"/>`).join("");
const og = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><radialGradient id="g" cx="72%" cy="50%" r="60%"><stop offset="0" stop-color="#1b2a23"/><stop offset="1" stop-color="#0e1412"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#6f8f7d" stroke-opacity=".22"/>
  <circle cx="${cx}" cy="${cy}" r="285" fill="none" stroke="#6f8f7d" stroke-opacity=".14"/>
  ${lines}${dots}
  <circle cx="${cx}" cy="${cy}" r="58" fill="#0e1412" stroke="#b9c8bd" stroke-opacity=".6"/>
  <text x="90" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="30" letter-spacing="9" fill="#b9c8bd">KUNZ GLOBAL</text>
  <text x="90" y="372" font-family="Segoe UI, Arial, sans-serif" font-size="50" font-weight="600" fill="#f4f1ea">One group.</text>
  <text x="90" y="434" font-family="Segoe UI, Arial, sans-serif" font-size="50" font-weight="600" fill="#f4f1ea">Multiple businesses.</text>
</svg>`);
const ogMark = await sharp(await solid("#f4f1ea")).resize({ width: 62, height: 62, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp(og).composite([{ input: ogMark, left: cx - 31, top: cy - 31 }]).jpeg({ quality: 86, mozjpeg: true }).toFile(`${OUT}/og-image.jpg`);
console.log("ok icons, logo mark, og-image");
