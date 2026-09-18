import type { Lang } from "../site/config";
import type { Content, LegalContent } from "./types";
import { en } from "./en";
import { es } from "./es";
import { de } from "./de";
import { pt } from "./pt";
import { legal as legalEn } from "./legal/en";
import { legal as legalEs } from "./legal/es";
import { legal as legalDe } from "./legal/de";
import { legal as legalPt } from "./legal/pt";

export const CONTENT: Record<Lang, Content> = { en, es, de, pt };
export const LEGAL: Record<Lang, LegalContent> = { en: legalEn, es: legalEs, de: legalDe, pt: legalPt };
