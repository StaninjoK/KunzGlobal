import { ArrowLeft, ArrowUpRight, Beef, Scissors, Globe2, ShieldCheck, Truck } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { navigate } from "../lib/router";
import { useLanguage } from "../i18n";

const productIcons = [Beef, Scissors];
const advantageIcons = [Globe2, ShieldCheck, Truck];

export function Fleisch() {
  const { t } = useLanguage();
  const p = t.fleischPage;

  return (
    <div className="min-h-screen bg-white">
      <Header onHome={() => navigate("")} />

      <section className="relative pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1638259/pexels-photo-1638259.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Rinderherde in Uruguay"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-24">
          <button
            onClick={() => navigate("")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.legalNav.back}
          </button>
          <div className="mt-8 max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-300">
              <Beef className="h-3.5 w-3.5" />
              {p.badge}
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight text-balance">
              {p.title}
            </h1>
            <p className="mt-4 text-xl text-amber-300 font-medium">{p.subtitle}</p>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">{p.description}</p>
            <a
              href="https://kunzsourcing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-700/30 transition-all hover:bg-amber-600"
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
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-700">{p.productsEyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
              {p.productsTitle}
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {p.products.map((prod, i) => {
              const Icon = productIcons[i];
              return (
                <div
                  key={prod.title}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 m-7 transition-colors group-hover:bg-amber-700 group-hover:text-white">
                    <Icon className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <div className="px-7 pb-7">
                    <h3 className="text-xl font-semibold text-slate-900">{prod.title}</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">{prod.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-700">{p.whyEyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
              {p.whyTitle}
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.advantages.map((a, i) => {
              const Icon = advantageIcons[i];
              return (
                <div key={a.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{a.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{a.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer onHome={() => navigate("")} />
    </div>
  );
}
