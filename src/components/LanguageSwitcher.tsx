import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import { localizedPath, type SiteLocale } from "../lib/locale";

export default function LanguageSwitcher({ alternates }: { alternates?: Partial<Record<SiteLocale, string>> }) {
  const location = useLocation();
  const { locale } = useI18n();
  const href = `${location.pathname}${location.search}${location.hash}`;
  return (
    <nav className="language-switcher" aria-label={locale === "ja" ? "言語を選択" : locale === "en" ? "Choose language" : "选择语言"}>
      {([["zh", "中文"], ["en", "EN"], ["ja", "日本語"]] as const).map(([language, label]) => (
        <Link key={language} className="language-option" to={alternates?.[language] ?? localizedPath(href, language)}
          lang={language === "zh" ? "zh-CN" : language} hrefLang={language === "zh" ? "zh-CN" : language}
          aria-current={locale === language ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
