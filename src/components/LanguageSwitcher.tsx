import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { LANGUAGE_META, useLanguage } from "../i18n";

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

export function LanguageSwitcher({ scrolled }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const current = LANGUAGE_META.find((l) => l.code === lang) ?? LANGUAGE_META[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Sprache wählen / Select language"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          scrolled
            ? "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.flag} {current.code.toUpperCase()}</span>
        <span className="sm:hidden">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl py-1.5 z-50">
          {LANGUAGE_META.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </span>
              {lang === l.code && <Check className="h-4 w-4 text-emerald-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
