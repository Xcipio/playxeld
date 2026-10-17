import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { resolveLocale } from "../lib/locale";
import { japaneseUi } from "../data/japaneseUi";

export function useI18n() {
  const { pathname, search } = useLocation();
  const locale = resolveLocale(pathname, search);
  const t = useCallback((text: string): string => {
    if (locale !== "ja") return text;
    return japaneseUi[text.replace(/\s+/g, " ").trim()] ?? text;
  }, [locale]);
  return { locale, t, dateLocale: locale === "ja" ? "ja-JP" : locale === "en" ? "en-US" : "zh-CN" };
}
