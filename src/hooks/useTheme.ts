import { useEffect, useState } from "react";
import { getAutoTheme, getNextThemeTransition } from "../lib/solarTheme";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "theme";
const THEME_MODE_STORAGE_KEY = "theme-mode";
const THEME_OVERRIDE_UNTIL_STORAGE_KEY = "theme-override-until";
const THEME_COORDS_STORAGE_KEY = "theme-coordinates";

type ThemeMode = "auto" | "manual";
type StoredCoordinates = {
  latitude: number;
  longitude: number;
};

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

function readStoredCoordinates(): StoredCoordinates | null {
  const raw = window.localStorage.getItem(THEME_COORDS_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StoredCoordinates;

    if (
      typeof parsed.latitude === "number" &&
      typeof parsed.longitude === "number"
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
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
    if (coordinates || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        window.localStorage.setItem(
          THEME_COORDS_STORAGE_KEY,
          JSON.stringify(nextCoordinates),
        );
        setCoordinates(nextCoordinates);
      },
      () => {
        setTheme(getAutoTheme(new Date(), null));
      },
      {
        enableHighAccuracy: false,
        maximumAge: 12 * 60 * 60 * 1000,
        timeout: 8000,
      },
    );
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
