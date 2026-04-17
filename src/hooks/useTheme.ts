import { useEffect, useState } from "react";
import { getAutoTheme, getNextThemeTransition } from "../lib/solarTheme";
import {
  readStoredCoordinates,
  requestUserCoordinates,
  StoredCoordinates,
} from "../lib/userCoordinates";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "theme";
const THEME_MODE_STORAGE_KEY = "theme-mode";
const THEME_OVERRIDE_UNTIL_STORAGE_KEY = "theme-override-until";
type ThemeMode = "auto" | "manual";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedMode = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedMode === "manual") {
    return savedTheme === "light" ? "light" : "dark";
  }

  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme);
  const [coordinates, setCoordinates] = useState<StoredCoordinates | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return readStoredCoordinates();
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const now = new Date();
    const savedMode = window.localStorage.getItem(THEME_MODE_STORAGE_KEY) as ThemeMode | null;
    const overrideUntilRaw = window.localStorage.getItem(THEME_OVERRIDE_UNTIL_STORAGE_KEY);
    const overrideUntil = overrideUntilRaw ? Number(overrideUntilRaw) : null;

    if (savedMode === "manual" && overrideUntil && now.getTime() < overrideUntil) {
      return;
    }

    if (savedMode === "manual") {
      window.localStorage.setItem(THEME_MODE_STORAGE_KEY, "auto");
      window.localStorage.removeItem(THEME_OVERRIDE_UNTIL_STORAGE_KEY);
    }

    setTheme(getAutoTheme(now, coordinates));

    const nextTransition = getNextThemeTransition(now, coordinates);
    const timeout = window.setTimeout(() => {
      setTheme(getAutoTheme(new Date(), coordinates));
      window.localStorage.setItem(THEME_MODE_STORAGE_KEY, "auto");
      window.localStorage.removeItem(THEME_OVERRIDE_UNTIL_STORAGE_KEY);
    }, Math.max(1000, nextTransition.getTime() - now.getTime() + 1000));

    return () => {
      window.clearTimeout(timeout);
    };
  }, [coordinates]);

  useEffect(() => {
    if (coordinates) {
      return;
    }

    const syncCoordinates = async () => {
      const nextCoordinates = await requestUserCoordinates();

      if (nextCoordinates) {
        setCoordinates(nextCoordinates);
        return;
      }

      setTheme(getAutoTheme(new Date(), null));
    };

    void syncCoordinates();
  }, [coordinates]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    const nextTransition = getNextThemeTransition(new Date(), coordinates);

    setTheme(nextTheme);
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, "manual");
    window.localStorage.setItem(
      THEME_OVERRIDE_UNTIL_STORAGE_KEY,
      String(nextTransition.getTime()),
    );
  };

  return { theme, toggleTheme };
}
