import type { ProvinceEnvironment } from '../types/environment';
import { windDirectionLabel } from './wind';

type ForecastResponse = {
  elevation?: number;
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    shortwave_radiation?: number;
  };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_sum?: number[];
    sunshine_duration?: number[];
    wind_speed_10m_max?: number[];
    wind_direction_10m_dominant?: number[];
  };
};

function avg(nums: number[] | undefined): number | null {
  if (!nums?.length) return null;
  const valid = nums.filter((n) => typeof n === 'number' && !Number.isNaN(n));
  if (!valid.length) return null;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

function sum(nums: number[] | undefined): number | null {
  if (!nums?.length) return null;
  const valid = nums.filter((n) => typeof n === 'number' && !Number.isNaN(n));
  if (!valid.length) return null;
  return valid.reduce((a, b) => a + b, 0);
}

function round1(n: number | null): number | null {
  return n == null ? null : Math.round(n * 10) / 10;
}

export async function fetchOpenMeteo(
  lat: number,
  lon: number
): Promise<Pick<
  ProvinceEnvironment,
  'elevationM' | 'climate' | 'sun' | 'wind'
> & { weatherSource: string }> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone: 'Europe/Istanbul',
    forecast_days: '7',
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'wind_speed_10m',
      'wind_direction_10m',
      'shortwave_radiation',
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'sunshine_duration',
      'wind_speed_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Open-Meteo HTTP ${res.status}`);
  }
  const data = (await res.json()) as ForecastResponse;
  const daily = data.daily;
  const current = data.current;

  const sunshineSec = sum(daily?.sunshine_duration);
  const dominantDeg = avg(daily?.wind_direction_10m_dominant);

  return {
    elevationM:
      typeof data.elevation === 'number' ? Math.round(data.elevation) : null,
    climate: {
      tempNowC: round1(current?.temperature_2m ?? null),
      humidityPct:
        typeof current?.relative_humidity_2m === 'number'
          ? Math.round(current.relative_humidity_2m)
          : null,
      tempMaxAvgC: round1(avg(daily?.temperature_2m_max)),
      tempMinAvgC: round1(avg(daily?.temperature_2m_min)),
      precipWeekMm: round1(sum(daily?.precipitation_sum)),
    },
    sun: {
      radiationNowWm2:
        typeof current?.shortwave_radiation === 'number'
          ? Math.round(current.shortwave_radiation)
          : null,
      sunshineWeekHours:
        sunshineSec == null ? null : round1(sunshineSec / 3600),
    },
    wind: {
      speedNowKmh: round1(current?.wind_speed_10m ?? null),
      directionNowDeg:
        typeof current?.wind_direction_10m === 'number'
          ? Math.round(current.wind_direction_10m)
          : null,
      directionNowLabel: windDirectionLabel(current?.wind_direction_10m),
      dominantWeekDeg:
        dominantDeg == null ? null : Math.round(dominantDeg),
      dominantWeekLabel: windDirectionLabel(dominantDeg),
      maxWeekKmh: round1(
        daily?.wind_speed_10m_max
          ? Math.max(...daily.wind_speed_10m_max.filter((n) => !Number.isNaN(n)))
          : null
      ),
    },
    weatherSource: 'Open-Meteo Forecast',
  };
}
