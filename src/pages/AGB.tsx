import type { ReactNode } from "react";
import { LegalLayout } from "../components/LegalLayout";
import { useLanguage } from "../i18n";

function H({ children }: { children: string }) {
  return <h2 className="mt-10 mb-3 text-xl font-semibold text-slate-900">{children}</h2>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="text-slate-600 leading-relaxed mb-4">{children}</p>;
}

export function AGB() {
  const { t } = useLanguage();
  const l = t.legal.agb;

  return (
    <LegalLayout eyebrow={l.eyebrow} title={l.title}>
      <P>{l.intro}</P>

      {l.sections.map((s) => (
        <div key={s.title}>
          <H>{s.title}</H>
          <P>{s.text}</P>
        </div>
      ))}

      <P>{l.responsibleLine}</P>
    </LegalLayout>
  );
}
