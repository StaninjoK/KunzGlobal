import { ArrowLeft, ArrowUpRight, Sprout, Cpu, Droplets, Satellite, BarChart3, Leaf } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { navigate } from "../lib/router";
import { useLanguage } from "../i18n";

const featureIcons = [Satellite, Droplets, Cpu, BarChart3];

export function Agrotech() {
  const { t } = useLanguage();
  const p = t.agrotechPage;

  return (
    <div className="min-h-screen bg-white">
      <Header onHome={() => navigate("")} />

      <section className="relative pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Landwirtschaftsfeld"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-24">
          <button
            onClick={() => navigate("")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.legalNav.back}
          </button>
          <div className="mt-8 max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-300">
              <Sprout className="h-3.5 w-3.5" />
              {p.badge}
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight text-balance">
              {p.title}
            </h1>
            <p className="mt-4 text-xl text-emerald-300 font-medium">{p.subtitle}</p>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">{p.description}</p>
            <a
              href="https://kunzagrotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-400"
            >
              {p.ctaWebsite}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              {p.featuresEyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
              {p.featuresTitle}
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-16 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">{p.missionEyebrow}</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 text-balance">
              {p.missionTitle}
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">{p.missionText}</p>
            <ul className="mt-6 space-y-3">
              {p.missionList.map((i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Leaf className="h-3.5 w-3.5" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10">
            <img
              src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Präzisionslandwirtschaft"
              className="h-[460px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer onHome={() => navigate("")} />
    </div>
  );
}
