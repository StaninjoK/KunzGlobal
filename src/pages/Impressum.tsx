import type { ReactNode } from "react";
import { LegalLayout } from "../components/LegalLayout";
import { useLanguage } from "../i18n";

function H({ children }: { children: string }) {
  return <h2 className="mt-10 mb-3 text-xl font-semibold text-slate-900">{children}</h2>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="text-slate-600 leading-relaxed mb-4">{children}</p>;
}

export function Impressum() {
  const { t } = useLanguage();
  const l = t.legal.impressum;

  return (
    <LegalLayout eyebrow={l.eyebrow} title={l.title}>
      <P>{l.intro}</P>

      <H>{l.providerTitle}</H>
      <P>
        {l.providerLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < l.providerLines.length - 1 && <br />}
          </span>
        ))}
      </P>

      <H>{l.contactTitle}</H>
      <P>
        {l.emailLabel}{" "}
        <a href="mailto:Stan@kunzglobal.com" className="text-emerald-700 hover:underline">
          Stan@kunzglobal.com
        </a>
        <br />
        {l.phoneLabel}{" "}
        <a href="tel:+59892800358" className="text-emerald-700 hover:underline">
          +598 92 800 358
        </a>{" "}
        /{" "}
        <a href="tel:+4963449269681" className="text-emerald-700 hover:underline">
          +49 6344 9269681
        </a>
        <br />
        {l.websiteLabel}{" "}
        <a href="https://www.kunzglobal.com" className="text-emerald-700 hover:underline">
          www.kunzglobal.com
        </a>
      </P>

      <H>{l.companyDataTitle}</H>
      <P>
        {l.companyDataLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < l.companyDataLines.length - 1 && <br />}
          </span>
        ))}
      </P>

      <H>{l.responsibleTitle}</H>
      <P>{l.responsibleText}</P>

      <H>{l.subsidiariesTitle}</H>
      <P>
        {l.subsidiariesTextBefore}
        <a href="https://kunzagrotech.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
          kunzagrotech.com
        </a>
        {l.subsidiariesTextMiddle}
        <a href="https://kunzsourcing.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
          kunzsourcing.com
        </a>
        {l.subsidiariesTextAfter}
      </P>

      <H>{l.disclaimerTitle}</H>
      <P>{l.disclaimerText}</P>
    </LegalLayout>
  );
}
