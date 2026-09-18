import { renderToStaticMarkup } from "react-dom/server";
import { CONTENT } from "../content";
import { DEFAULT_LANG, LANGS, PAGES, pagePath } from "../site/config";
import type { Lang, PageId } from "../site/config";
import { Document } from "./layout";
import type { Assets, PageContext } from "./layout";
import { Home } from "./home";
import { About, Businesses, Contact, LegalNotice, NotFound, Privacy, Terms } from "./subpages";

const VIEW: Record<PageId, (props: { ctx: PageContext }) => JSX.Element> = {
  home: Home,
  businesses: Businesses,
  about: About,
  contact: Contact,
  legal: LegalNotice,
  privacy: Privacy,
  terms: Terms,
};

export interface Route {
  path: string;
  lang: Lang;
  page: PageId | "notFound";
}

export function routes(): Route[] {
  const list: Route[] = [];
  for (const lang of LANGS) for (const page of PAGES) list.push({ path: pagePath(lang, page), lang, page });
  list.push({ path: "/404.html", lang: DEFAULT_LANG, page: "notFound" });
  return list;
}

export function renderRoute(route: Route, assets: Assets): string {
  const ctx: PageContext = { lang: route.lang, page: route.page, t: CONTENT[route.lang], assets };
  const View = route.page === "notFound" ? NotFound : VIEW[route.page];
  return (
    "<!doctype html>" +
    renderToStaticMarkup(
      <Document ctx={ctx}>
        <View ctx={ctx} />
      </Document>
    )
  );
}

/** Dev server entry: returns null when the URL is not a page. */
export function renderUrl(url: string, assets: Assets): string | null {
  const route = routes().find((r) => r.path === url);
  return route ? renderRoute(route, assets) : null;
}
