import { StoredCoordinates } from "./userCoordinates";

export type WeatherVisual =
  | "big-sun"
  | "sunny"
  | "partly-cloudy"
  | "overcast"
  | "light-rain"
  | "moderate-rain"
  | "heavy-rain"
  | "storm"
  | "lightning"
  | "windy"
  | "light-snow"
  | "heavy-snow";

export type WeatherSnapshot = {
  visual: WeatherVisual;
  weatherCode: number;
  isDay: boolean;
};

type WeatherApiResponse = {
  current?: {
    weather_code?: number;
    is_day?: number;
    wind_speed_10m?: number;
    wind_gusts_10m?: number;
    precipitation?: number;
    rain?: number;
    showers?: number;
    snowfall?: number;
  };
};

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

function isRainCode(code: number) {
  return [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code);
}

function isSnowCode(code: number) {
  return [71, 73, 75, 77, 85, 86].includes(code);
}

export function mapWeatherToVisual(current: NonNullable<WeatherApiResponse["current"]>): WeatherVisual {
  const weatherCode = current.weather_code ?? 0;
  const windSpeed = current.wind_speed_10m ?? 0;
  const windGusts = current.wind_gusts_10m ?? 0;
  const rainAmount = (current.rain ?? 0) + (current.showers ?? 0) + (current.precipitation ?? 0);
  const snowfall = current.snowfall ?? 0;

  if (weatherCode === 96 || weatherCode === 99) {
    return "lightning";
  }

  if (weatherCode === 95) {
    return "storm";
  }

  if (isSnowCode(weatherCode) || snowfall > 0) {
    return weatherCode === 73 || weatherCode === 75 || weatherCode === 86 || snowfall >= 2.5
      ? "heavy-snow"
      : "light-snow";
  }

  if (windSpeed >= 38 || windGusts >= 55) {
    return "windy";
  }

  if (isRainCode(weatherCode) || rainAmount > 0) {
    if (weatherCode === 65 || weatherCode === 67 || weatherCode === 82 || rainAmount >= 8) {
      return "heavy-rain";
    }

    if (weatherCode === 63 || weatherCode === 81 || rainAmount >= 2.5) {
      return "moderate-rain";
    }

    return "light-rain";
  }

  if (weatherCode === 3 || weatherCode === 45 || weatherCode === 48) {
    return "overcast";
  }

  if (weatherCode === 2) {
    return "partly-cloudy";
  }

  if (weatherCode === 1) {
    return "sunny";
  }

  return "big-sun";
}

export async function fetchWeatherSnapshot(coordinates: StoredCoordinates): Promise<WeatherSnapshot> {
  const query = new URLSearchParams({
    latitude: String(coordinates.latitude),
    longitude: String(coordinates.longitude),
    current:
      "weather_code,is_day,wind_speed_10m,wind_gusts_10m,precipitation,rain,showers,snowfall",
    timezone: "auto",
  });

  const response = await fetch(`${WEATHER_API_URL}?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`Weather request failed with status ${response.status}`);
  }

  const data = (await response.json()) as WeatherApiResponse;
  const current = data.current;

  if (!current || typeof current.weather_code !== "number") {
    throw new Error("Missing current weather data");
  }

  return {
    visual: mapWeatherToVisual(current),
    weatherCode: current.weather_code,
    isDay: current.is_day === 1,
  };
}
