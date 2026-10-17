import { Theme } from "../hooks/useTheme";
import { useI18n } from "../hooks/useI18n";
import LanguageSwitcher from "./LanguageSwitcher";
import type { SiteLocale } from "../lib/locale";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
  locale?: SiteLocale;
  showLanguages?: boolean;
};

function ThemeToggle({
  theme,
  onToggle,
  locale = "zh",
  showLanguages = true,
}: ThemeToggleProps) {
  const { locale: routeLocale } = useI18n();
  if (routeLocale === "ja") locale = "ja";
  const label =
    locale === "ja" ? (theme === "light" ? "ダーク" : "ライト") : locale === "en"
      ? theme === "light"
        ? "Dark"
        : "Light"
      : theme === "light"
        ? "深色"
        : "浅色";

  return (
    <div className="locale-theme-actions">
    {showLanguages && <LanguageSwitcher />}
    <button className="theme-toggle" type="button" onClick={onToggle}>
      {label}
    </button>
    </div>
  );
}

export default ThemeToggle;
