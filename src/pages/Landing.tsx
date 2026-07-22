import {
  ArrowRight,
  Sprout,
  Beef,
  Sun,
  Recycle,
  Globe2,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CeoSection } from "../components/CeoSection";
import { navigate } from "../lib/router";
import { useLanguage } from "../i18n";

const valueIcons = [Globe2, Leaf, ShieldCheck, TrendingUp];
const companyMeta = {
  agrotech: {
    href: "#/agrotech",
    image: "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1600",
    iconColor: "text-emerald-600",
    btnClass: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25",
    icon: Sprout,
  },
  sourcing: {
    href: "#/fleisch",
    image: "https://images.pexels.com/photos/1638259/pexels-photo-1638259.jpeg?auto=compress&cs=tinysrgb&w=1600",
    iconColor: "text-amber-700",
    btnClass: "bg-amber-700 hover:bg-amber-600 shadow-amber-700/25",
    icon: Beef,
  },
};

const futureMeta = {
  solar: {
    image: "https://images.pexels.com/photos/3770052/pexels-photo-3770052.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: Sun,
  },
  recycling: {
    image: "https://images.pexels.com/photos/2867908/pexels-photo-2867908.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: Recycle,
  },
};

export function Landing() {
  const { t } = useLanguage();

  const activeCompanies = [
    { id: "agrotech", ...companyMeta.agrotech, ...t.companies.agrotech },
    { id: "sourcing", ...companyMeta.sourcing, ...t.companies.sourcing },
  ];

  const futureProjects = [
    { id: "solar", ...futureMeta.solar, ...t.future.projects.solar },
    { id: "recycling", ...futureMeta.recycling, ...t.future.projects.recycling },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onHome={() => navigate("")} />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Weite Landschaft bei Sonnenaufgang"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-24">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-300">
              <Leaf className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] text-balance">
              {t.hero.titleLine1}{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#unternehmen"
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40"
              >
                {t.hero.ctaDiscover}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#/#kontakt"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Values strip */}
      <section className="relative -mt-12 z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.values.map((v, i) => {
            const Icon = valueIcons[i];
            return (
              <div
                key={v.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active companies */}
      <section id="unternehmen" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              {t.companiesSection.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
              {t.companiesSection.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">{t.companiesSection.description}</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {activeCompanies.map((c) => (
              <article
                key={c.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 backdrop-blur shadow-lg">
                    <c.icon className={`h-6 w-6 ${c.iconColor}`} strokeWidth={2} />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-semibold text-white">{c.name}</h3>
                    <p className="text-sm font-medium text-emerald-300">{c.subtitle}</p>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-slate-600 leading-relaxed">{c.description}</p>
                  <a
                    href={c.href}
                    className={`mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all group/btn ${c.btnClass}`}
                  >
                    {t.companiesSection.visitButton}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="ueber-uns" className="py-24 lg:py-32 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">{t.about.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
              {t.about.title}
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">{t.about.p1}</p>
            <p className="mt-4 text-slate-600 leading-relaxed">{t.about.p2}</p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-semibold text-slate-900">{t.about.statActive}</div>
                <div className="text-sm text-slate-500 mt-1">{t.about.statActiveLabel}</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-slate-900">{t.about.statFuture}</div>
                <div className="text-sm text-slate-500 mt-1">{t.about.statFutureLabel}</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-slate-900">{t.about.statHQ}</div>
                <div className="text-sm text-slate-500 mt-1">{t.about.statHQLabel}</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10">
              <img
                src="https://images.pexels.com/photos/2382884/pexels-photo-2382884.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Uruguayische Landschaft"
                className="h-[460px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl bg-emerald-600 px-6 py-4 text-white shadow-xl">
              <div className="text-2xl font-semibold">{t.about.badgeValue}</div>
              <div className="text-xs text-emerald-100">{t.about.badgeLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Geschäftsführung / Vertrauen */}
      <CeoSection />

      {/* Future projects */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              {t.future.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
              {t.future.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">{t.future.description}</p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {futureProjects.map((p) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/50 shadow-sm"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:opacity-50 group-hover:grayscale-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-100/60 to-transparent" />
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
                    <Clock className="h-3.5 w-3.5" />
                    {t.future.comingSoonBadge}
                  </span>
                  <div className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 backdrop-blur shadow-sm">
                    <p.icon className="h-6 w-6 text-slate-400" strokeWidth={2} />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-semibold text-slate-400">{p.name}</h3>
                  <p className="text-sm font-medium text-slate-500">{p.subtitle}</p>
                  <p className="mt-3 text-slate-500 leading-relaxed">{p.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-400 cursor-not-allowed">
                    <Clock className="h-4 w-4" />
                    {t.future.comingSoonButton}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer onHome={() => navigate("")} />
    </div>
  );
}
