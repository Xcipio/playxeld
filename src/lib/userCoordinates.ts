export type StoredCoordinates = {
  latitude: number;
  longitude: number;
};

export const USER_COORDINATES_STORAGE_KEY = "user-coordinates";
const USER_COORDINATES_REQUESTED_STORAGE_KEY = "user-coordinates-requested";
const LEGACY_THEME_COORDINATES_STORAGE_KEY = "theme-coordinates";

let pendingCoordinatesRequest: Promise<StoredCoordinates | null> | null = null;

function isValidCoordinates(value: unknown): value is StoredCoordinates {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as StoredCoordinates;
  return (
    typeof candidate.latitude === "number" &&
    typeof candidate.longitude === "number"
  );
}

function parseCoordinates(raw: string | null) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return isValidCoordinates(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function readStoredCoordinates() {
  if (typeof window === "undefined") {
    return null;
  }

  const coordinates = parseCoordinates(
    window.localStorage.getItem(USER_COORDINATES_STORAGE_KEY),
  );

  if (coordinates) {
    return coordinates;
  }

  const legacyCoordinates = parseCoordinates(
    window.localStorage.getItem(LEGACY_THEME_COORDINATES_STORAGE_KEY),
  );

  if (legacyCoordinates) {
    window.localStorage.setItem(
      USER_COORDINATES_STORAGE_KEY,
      JSON.stringify(legacyCoordinates),
    );
    return legacyCoordinates;
  }

  return null;
}

export function persistCoordinates(coordinates: StoredCoordinates) {
  window.localStorage.setItem(
    USER_COORDINATES_STORAGE_KEY,
    JSON.stringify(coordinates),
  );
  window.localStorage.setItem(USER_COORDINATES_REQUESTED_STORAGE_KEY, "true");
}

function markCoordinatesRequestAttempted() {
  window.localStorage.setItem(USER_COORDINATES_REQUESTED_STORAGE_KEY, "true");
}

function hasAttemptedCoordinatesRequest() {
  return (
    typeof window !== "undefined" &&
    window.localStorage.getItem(USER_COORDINATES_REQUESTED_STORAGE_KEY) === "true"
  );
}

export function requestUserCoordinates(): Promise<StoredCoordinates | null> {
  if (typeof window === "undefined" || !navigator.geolocation) {
    return Promise.resolve(null);
  }

  const existingCoordinates = readStoredCoordinates();
  if (existingCoordinates) {
    return Promise.resolve(existingCoordinates);
  }

  if (hasAttemptedCoordinatesRequest()) {
    return Promise.resolve(null);
  }

  if (pendingCoordinatesRequest) {
    return pendingCoordinatesRequest;
  }

  pendingCoordinatesRequest = new Promise<StoredCoordinates | null>((resolve) => {
    markCoordinatesRequestAttempted();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        persistCoordinates(coordinates);
        resolve(coordinates);
      },
      () => resolve(null),
      {
        enableHighAccuracy: false,
        maximumAge: 12 * 60 * 60 * 1000,
        timeout: 8000,
      },
    );
  }).finally(() => {
    pendingCoordinatesRequest = null;
  });

  return pendingCoordinatesRequest;
}
