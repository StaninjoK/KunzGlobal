import type { ReactNode } from "react";
import { LegalLayout } from "../components/LegalLayout";
import { useLanguage } from "../i18n";

function H({ children }: { children: string }) {
  return <h2 className="mt-10 mb-3 text-xl font-semibold text-slate-900">{children}</h2>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="text-slate-600 leading-relaxed mb-4">{children}</p>;
}
function Ul({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-slate-600 leading-relaxed mb-4">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export function Datenschutz() {
  const { t } = useLanguage();
  const l = t.legal.datenschutz;

  return (
    <LegalLayout eyebrow={l.eyebrow} title={l.title}>
      <P>{l.intro}</P>

      <H>{l.controllerTitle}</H>
      <P>
        {l.controllerLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < l.controllerLines.length - 1 && <br />}
          </span>
        ))}
        <br />
        <a href="mailto:Stan@kunzglobal.com" className="text-emerald-700 hover:underline">
          Stan@kunzglobal.com
        </a>
      </P>

      <H>{l.minimizationTitle}</H>
      <P>{l.minimizationText}</P>

      <H>{l.serverDataTitle}</H>
      <P>{l.serverDataText}</P>

      <H>{l.contactTitle}</H>
      <P>{l.contactText}</P>

      <H>{l.socialTitle}</H>
      <P>{l.socialText}</P>

      <H>{l.cookiesTitle}</H>
      <P>{l.cookiesText}</P>

      <H>{l.rightsTitle}</H>
      <P>{l.rightsIntro}</P>
      <Ul items={l.rightsList} />
      <P>{l.rightsOutro}</P>

      <H>{l.securityTitle}</H>
      <P>{l.securityText}</P>

      <H>{l.changesTitle}</H>
      <P>{l.changesText}</P>
    </LegalLayout>
  );
}
