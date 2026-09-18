import { BRAND, BRANDS, pagePath } from "../site/config";
import type { Lang } from "../site/config";
import type { Content } from "../content/types";
import { GLOBE } from "./generated/globe";

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ------------------------------------------------------------------ */
/* Hero: abstract network, Kunz Global at the centre                   */
/* ------------------------------------------------------------------ */

const HERO_C = 400;
// angle (deg), radius, label anchor
const HERO_NODES: readonly { a: number; r: number; anchor: "start" | "end" | "middle"; dx: number; dy: number }[] = [
  // the left side stays free: that is where the headline sits
  { a: -128, r: 262, anchor: "middle", dx: 0, dy: -26 },
  { a: -76, r: 318, anchor: "middle", dx: 0, dy: -26 },
  { a: -24, r: 290, anchor: "middle", dx: 0, dy: -26 },
  { a: 28, r: 322, anchor: "middle", dx: 0, dy: 36 },
  { a: 80, r: 276, anchor: "middle", dx: 0, dy: 36 },
  { a: 130, r: 304, anchor: "middle", dx: 0, dy: 36 },
];
// faint secondary nodes that make the structure read as a network rather than a star
const HERO_MINOR: readonly [number, number][] = [
  [-102, 190], [-50, 204], [2, 186], [54, 200], [106, 184], [-154, 178],
];

function polar(a: number, r: number): [number, number] {
  const rad = (a * Math.PI) / 180;
  return [r1(HERO_C + Math.cos(rad) * r), r1(HERO_C + Math.sin(rad) * r)];
}

/** Slightly bowed connection from the centre to a node. */
function spoke(a: number, r: number, bend = 0.09): string {
  const [x, y] = polar(a, r);
  const [mx, my] = polar(a + 90, r * bend);
  const cx = r1((HERO_C + x) / 2 + (mx - HERO_C));
  const cy = r1((HERO_C + y) / 2 + (my - HERO_C));
  return `M${HERO_C} ${HERO_C}Q${cx} ${cy} ${x} ${y}`;
}

export function HeroNetwork({ t }: { t: Content }) {
  const minor = HERO_MINOR.map(([a, r]) => polar(a, r));
  return (
    <svg className="hero-net" viewBox="0 0 800 800" role="img" aria-label={t.hero.networkAlt} data-parallax-pointer>
      <g className="hero-net__orbits">
        <circle cx={HERO_C} cy={HERO_C} r="120" />
        <circle cx={HERO_C} cy={HERO_C} r="200" />
        <circle cx={HERO_C} cy={HERO_C} r="300" />
        <circle cx={HERO_C} cy={HERO_C} r="392" />
      </g>
      <g className="hero-net__web">
        {minor.map(([x, y], i) => {
          const [nx, ny] = minor[(i + 1) % minor.length];
          return <line key={i} x1={x} y1={y} x2={nx} y2={ny} />;
        })}
        {HERO_NODES.map((n, i) => {
          const [x, y] = polar(n.a, n.r);
          const [mx, my] = minor[i];
          return <line key={`m${i}`} x1={x} y1={y} x2={mx} y2={my} />;
        })}
      </g>
      <g className="hero-net__spokes">
        {HERO_NODES.map((n, i) => (
          <path key={i} d={spoke(n.a, n.r)} pathLength={1} style={{ ["--i" as string]: i }} />
        ))}
      </g>
      <g className="hero-net__pulses" aria-hidden="true">
        {HERO_NODES.map((n, i) => (
          <circle key={i} r="2.6" style={{ offsetPath: `path("${spoke(n.a, n.r)}")`, ["--i" as string]: i }} />
        ))}
      </g>
      <g className="hero-net__minor">
        {minor.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" />
        ))}
      </g>
      <g className="hero-net__nodes">
        {HERO_NODES.map((n, i) => {
          const [x, y] = polar(n.a, n.r);
          return (
            <g key={i} style={{ ["--i" as string]: i }}>
              <circle cx={x} cy={y} r="13" className="hero-net__halo" />
              <circle cx={x} cy={y} r="4.5" />
              <text x={x + n.dx} y={y + n.dy} textAnchor={n.anchor}>
                {t.hero.sectors[i]}
              </text>
            </g>
          );
        })}
      </g>
      <g className="hero-net__core">
        <circle cx={HERO_C} cy={HERO_C} r="64" className="hero-net__core-ring" />
        <circle cx={HERO_C} cy={HERO_C} r="46" />
        <image href="/img/logo-mark.png" x={HERO_C - 25} y={HERO_C - 26} width="50" height="52" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ecosystem: the group and its businesses                             */
/* ------------------------------------------------------------------ */

const ECO_W = 1000;
const ECO_H = 620;
const ECO_CX = 500;
const ECO_CY = 310;

export function Ecosystem({ t, lang }: { t: Content; lang: Lang }) {
  const entries = [
    ...BRANDS.map((id) => ({ id: id as string, name: BRAND[id].name, category: t.businesses[id].category, text: t.businesses[id].short, href: pagePath(lang, "businesses", `#${id}`) })),
    { id: "future", name: t.ecosystem.futureName, category: t.ecosystem.futureCategory, text: t.ecosystem.futureText, href: pagePath(lang, "home", "#vision") },
  ];
  const placed = entries.map((e, i) => {
    const a = (-90 + (360 / entries.length) * i) * (Math.PI / 180);
    return { ...e, x: r1(ECO_CX + Math.cos(a) * 395), y: r1(ECO_CY + Math.sin(a) * 248) };
  });
  return (
    <div className="eco" data-eco>
      <div className="eco__stage">
        <svg className="eco__lines" viewBox={`0 0 ${ECO_W} ${ECO_H}`} aria-hidden="true" preserveAspectRatio="none">
          <ellipse cx={ECO_CX} cy={ECO_CY} rx="395" ry="248" className="eco__orbit" />
          <ellipse cx={ECO_CX} cy={ECO_CY} rx="210" ry="132" className="eco__orbit" />
          {placed.map((p, i) => (
            <path key={p.id} d={`M${ECO_CX} ${ECO_CY}L${p.x} ${p.y}`} pathLength={1} data-eco-line={p.id} style={{ ["--i" as string]: i }} className={p.id === "future" ? "is-future" : undefined} />
          ))}
        </svg>
        <div className="eco__center">
          <span className="brand__mark" aria-hidden="true" />
          <strong>Kunz Global</strong>
          <span>{t.ecosystem.centerLabel}</span>
        </div>
        <ul className="eco__nodes">
          {placed.map((p, i) => (
            <li
              key={p.id}
              style={{ ["--x" as string]: `${(p.x / ECO_W) * 100}%`, ["--y" as string]: `${(p.y / ECO_H) * 100}%`, ["--i" as string]: i }}
              className={[p.id === "future" ? "is-future" : "", p.y < ECO_CY ? "is-upper" : ""].join(" ").trim() || undefined}
            >
              <a href={p.href} data-eco-node={p.id} data-eco-title={p.name} data-eco-category={p.category} data-eco-text={p.text}>
                <span className="eco__dot" aria-hidden="true" />
                <span className="eco__name">{p.name}</span>
                <span className="eco__cat">{p.category}</span>
                <span className="eco__desc">{p.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="eco__panel" aria-hidden="true" data-eco-panel data-default-title="Kunz Global" data-default-category={t.ecosystem.centerLabel} data-default-text={t.ecosystem.centerText}>
        <p className="eco__panel-cat" data-eco-panel-category>
          {t.ecosystem.centerLabel}
        </p>
        <p className="eco__panel-title" data-eco-panel-title>
          Kunz Global
        </p>
        <p className="eco__panel-text" data-eco-panel-text>
          {t.ecosystem.centerText}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Globe: Uruguay and its connections                                  */
/* ------------------------------------------------------------------ */

export function Globe({ t }: { t: Content }) {
  const c = GLOBE.size / 2;
  const [ox, oy] = GLOBE.origin;
  const arcs = Object.values(GLOBE.arcs);
  return (
    <svg className="globe" viewBox={`0 0 ${GLOBE.size} ${GLOBE.size}`} role="img" aria-label={t.uruguay.globeAlt}>
      <circle className="globe__sphere" cx={c} cy={c} r={GLOBE.radius} />
      <path className="globe__graticule" d={GLOBE.graticule} />
      <path className="globe__land" d={GLOBE.dots} />
      {arcs.map((a, i) => (
        <g key={i} className="globe__arc" style={{ ["--i" as string]: i }}>
          <path d={a.d} pathLength={1} />
          <circle cx={a.end[0]} cy={a.end[1]} r="3.2" />
          <circle className="globe__pulse" r="2.4" style={{ offsetPath: `path("${a.d}")` }} />
        </g>
      ))}
      <g className="globe__origin">
        <circle cx={ox} cy={oy} r="15" className="globe__ring" />
        <circle cx={ox} cy={oy} r="5" />
        <text x={ox - 14} y={oy + 30} textAnchor="end">
          {t.uruguay.marker}
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Renvora: schematic workflow                                         */
/* ------------------------------------------------------------------ */

export function RenvoraFlow({ t }: { t: Content }) {
  const steps = t.featured.renvoraSteps;
  return (
    <figure className="flow">
      <div className="flow__board" role="img" aria-label={t.featured.items.renvora.alt}>
        <div className="flow__track">
          <span className="flow__signal" />
        </div>
        <ol className="flow__steps">
          {steps.map((s, i) => (
            <li key={s} style={{ ["--i" as string]: i }}>
              <span className="flow__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="flow__label">{s}</span>
              <span className="flow__bars">
                <i />
                <i />
                <i />
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>{t.featured.renvoraCaption}</figcaption>
    </figure>
  );
}
