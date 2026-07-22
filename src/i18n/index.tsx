import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { pl } from "./pl";
import { ru } from "./ru";
import type { TranslationDict } from "./de";

export type LangCode = "de" | "en" | "es" | "pl" | "ru";

export const DICTS: Record<LangCode, TranslationDict> = { de, en, es, pl, ru };

export const LANGUAGE_META: { code: LangCode; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

const STORAGE_KEY = "kunz-global-lang";

function getInitialLang(): LangCode {
  if (typeof window === "undefined") return "de";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in DICTS) return stored as LangCode;
  return "de";
}

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next: LangCode) => setLangState(next);

  const value = useMemo(() => ({ lang, setLang, t: DICTS[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage muss innerhalb von <LanguageProvider> verwendet werden");
  }
  return ctx;
}
