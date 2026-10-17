import { NavLink, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { localizedPath, type SiteLocale } from "../lib/locale";
import { useI18n } from "../hooks/useI18n";
import type { Theme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import WeatherBadge from "./WeatherBadge";

type SiteTopbarProps = {
  locale: SiteLocale;
  theme: Theme;
  onThemeToggle: () => void;
};

function SiteTopbar({ locale, theme, onThemeToggle }: SiteTopbarProps) {
  const { pathname } = useLocation();
  const { locale: routeLocale } = useI18n();
  locale = routeLocale === "ja" ? "ja" : locale;
  const isEnglish = locale === "en";
  const isJapanese = locale === "ja";
  const homePath = isJapanese ? "/ja" : isEnglish ? "/en" : "/";
  const isHome = pathname === homePath;
  const postsHash = isEnglish ? "essays" : "posts";
  const memorePath = localizedPath("/memore", locale);
  const sectionHref = (section: string) =>
    isHome ? `#${section}` : `${homePath}#${section}`;

  const routeLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "hero-nav-link-active" : undefined;

  return (
    <div className="hero-top site-topbar">
      <div className="hero-brand-group">
        <div className="hero-brand" aria-label="Playxeld">
          {"PLAYXELD".split("").map((letter, index) => (
            <span key={`${letter}-${index}`} className="hero-brand-letter">
              {letter}
            </span>
          ))}
        </div>
        <WeatherBadge locale={locale} />
      </div>

      <nav
        className="hero-nav"
        aria-label={isJapanese ? "メインナビゲーション" : isEnglish ? "Primary navigation" : "主导航"}
      >
        <a href={sectionHref(isJapanese ? "essays" : postsHash)}>{isJapanese ? "記事" : "Posts"}</a>
        <NavLink to={localizedPath("/games", locale)} className={routeLinkClass}>
          {isJapanese ? "ゲーム" : "Games"}
        </NavLink>
        <NavLink
          to={localizedPath("/art", locale)}
          className={routeLinkClass}
        >
          {isJapanese ? "作品" : "Arts"}
        </NavLink>
        <NavLink to={localizedPath("/friends", locale)} className={routeLinkClass}>
          {isJapanese ? "寄稿" : "Friends"}
        </NavLink>
        <NavLink to={memorePath} className={routeLinkClass}>
          MemoRe
        </NavLink>
        <a href={sectionHref("about")}>{isJapanese ? "サイト紹介" : "About"}</a>
        <a href={sectionHref("contact")}>{isJapanese ? "連絡先" : "Contact"}</a>
        <div className="site-topbar-preferences">
          <LanguageSwitcher />
          <ThemeToggle
            theme={theme}
            onToggle={onThemeToggle}
            locale={locale}
            showLanguages={false}
          />
        </div>
      </nav>
    </div>
  );
}

export default SiteTopbar;
