export type SiteLocale = "zh" | "en" | "ja";

export function resolveLocale(pathname: string, search = ""): SiteLocale {
  if (/^\/ja(?:\/|$)/.test(pathname)) return "ja";
  if (/^\/en(?:\/|$)/.test(pathname)) return "en";
  const language = new URLSearchParams(search).get("lang");
  return language === "ja" || language === "en" ? language : "zh";
}

/** Keep the current resource, filters, anchor, and original article language. */
export function localizedPath(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const url = new URL(href, "https://playxeld.com");
  const sourceLocale = resolveLocale(url.pathname, url.search);
  const pathname = url.pathname.replace(/^\/(?:ja|en)(?=\/|$)/, "") || "/";
  const article = pathname.startsWith("/post/");
  if (pathname === "/") {
    if (locale !== "zh" && url.hash === "#posts") url.hash = "#essays";
    if (locale === "zh" && url.hash === "#essays") url.hash = "#posts";
  }
  const contentLanguage = url.searchParams.get("content") ?? (sourceLocale === "en" ? "en" : "zh");
  url.searchParams.delete("lang");
  url.searchParams.delete("content");
  if (locale === "ja") {
    url.pathname = `/ja${pathname === "/" ? "" : pathname}`;
    if (article && contentLanguage === "en") url.searchParams.set("content", "en");
  } else if (locale === "en") {
    if (pathname === "/" || pathname.startsWith("/memore") || article) {
      url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    } else {
      url.pathname = pathname;
      url.searchParams.set("lang", "en");
    }
  } else {
    url.pathname = pathname;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
