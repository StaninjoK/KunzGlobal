import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { navigate } from "../lib/router";
import { useLanguage } from "../i18n";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function LegalLayout({ eyebrow, title, children }: LegalLayoutProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <Header onHome={() => navigate("")} />

      <section className="pt-40 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <button
            onClick={() => navigate("")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.legalNav.back}
          </button>
          <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-emerald-600">
            {eyebrow}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">{children}</div>
      </section>

      <Footer onHome={() => navigate("")} />
    </div>
  );
}
