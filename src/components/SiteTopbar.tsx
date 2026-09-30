import { Link, NavLink, useLocation } from "react-router-dom";
import type { Theme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import WeatherBadge from "./WeatherBadge";

type SiteTopbarProps = {
  locale: "zh" | "en";
  theme: Theme;
  onThemeToggle: () => void;
};

function SiteTopbar({ locale, theme, onThemeToggle }: SiteTopbarProps) {
  const { pathname } = useLocation();
  const isEnglish = locale === "en";
  const homePath = isEnglish ? "/en" : "/";
  const isHome = pathname === homePath;
  const postsHash = isEnglish ? "essays" : "posts";
  const memorePath = isEnglish ? "/en/memore" : "/memore";
  const sectionHref = (section: string) =>
    isHome ? `#${section}` : `${homePath}#${section}`;
  const englishStoryPrefix = "/en/memore/stories/";
  const chineseStoryPrefix = "/memore/stories/";
  const languagePath =
    pathname.startsWith(englishStoryPrefix)
      ? `${chineseStoryPrefix}${pathname.slice(englishStoryPrefix.length)}`
      : pathname.startsWith(chineseStoryPrefix)
        ? `${englishStoryPrefix}${pathname.slice(chineseStoryPrefix.length)}`
      : pathname === "/memore" || pathname === "/en/memore"
      ? isEnglish
        ? "/memore"
        : "/en/memore"
      : pathname === "/whats-new"
      ? isEnglish
        ? "/whats-new"
        : "/whats-new?lang=en"
      : isEnglish
        ? "/"
        : "/en";

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
        aria-label={isEnglish ? "Primary navigation" : "主导航"}
      >
        <a href={sectionHref(postsHash)}>Posts</a>
        <NavLink to="/games" className={routeLinkClass}>
          Games
        </NavLink>
        <NavLink
          to={isEnglish ? "/art?lang=en" : "/art"}
          className={routeLinkClass}
        >
          Arts
        </NavLink>
        <NavLink to="/friends" className={routeLinkClass}>
          Friends
        </NavLink>
        <NavLink to={memorePath} className={routeLinkClass}>
          MemoRe
        </NavLink>
        <a href={sectionHref("about")}>About</a>
        <a href={sectionHref("contact")}>Contact</a>
        <Link to={languagePath}>{isEnglish ? "中文" : "EN"}</Link>
        <ThemeToggle
          theme={theme}
          onToggle={onThemeToggle}
          locale={locale}
        />
      </nav>
    </div>
  );
}

export default SiteTopbar;
