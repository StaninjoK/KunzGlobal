import { useState } from "react";
import { BadgeCheck, User } from "lucide-react";
import { useLanguage } from "../i18n";

/**
 * Bild ersetzen: Datei als /public/images/geschaeftsfuehrer.jpg ablegen.
 * Bis dahin erscheint ein neutraler Platzhalter (kein kaputtes Bild-Symbol).
 */
function CeoPhoto() {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100">
        <User className="h-20 w-20 text-emerald-300" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src="/images/geschaeftsfuehrer.jpg"
      alt="Stanley Kunz"
      onError={() => setImgFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

export function CeoSection() {
  const { t } = useLanguage();
  const ceo = t.ceo;

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr] items-center">
          <div className="relative mx-auto lg:mx-0">
            <div className="h-72 w-72 overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-200">
              <CeoPhoto />
            </div>
            <div className="absolute -bottom-5 -right-5 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg border border-slate-100">
              <BadgeCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">{ceo.badge}</span>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">{ceo.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
              {ceo.title}
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl">{ceo.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-slate-500">
              <div>
                <span className="font-semibold text-slate-900">{ceo.name}</span> — {ceo.role}
              </div>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-slate-300" />
              <div>{ceo.hqLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
