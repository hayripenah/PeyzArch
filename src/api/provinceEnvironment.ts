import { provinceCoords } from '../data/provinceCoords';
import type { ProvinceEnvironment } from '../types/environment';
import { fetchOpenMeteo } from './openMeteo';
import { fetchSoilGrids } from './soilGrids';

const cache = new Map<string, { at: number; data: ProvinceEnvironment }>();
const CACHE_MS = 30 * 60 * 1000;

export async function fetchProvinceEnvironment(
  provinceId: string
): Promise<ProvinceEnvironment> {
  const hit = cache.get(provinceId);
  if (hit && Date.now() - hit.at < CACHE_MS) {
    return hit.data;
  }

  const coord = provinceCoords[provinceId];
  if (!coord) {
    throw new Error(`Koordinat yok: ${provinceId}`);
  }

  const weatherPromise = fetchOpenMeteo(coord.lat, coord.lon);
  const soilPromise = fetchSoilGrids(coord.lat, coord.lon).catch(() => ({
    ph: null,
    organicCarbonGkg: null,
    clayPct: null,
    sandPct: null,
    soilSource: 'ISRIC SoilGrids (erişilemedi)',
  }));

  const [weather, soil] = await Promise.all([weatherPromise, soilPromise]);

  const data: ProvinceEnvironment = {
    fetchedAt: new Date().toISOString(),
    elevationM: weather.elevationM,
    climate: weather.climate,
    sun: weather.sun,
    wind: weather.wind,
    soil: {
      ph: soil.ph,
      organicCarbonGkg: soil.organicCarbonGkg,
      clayPct: soil.clayPct,
      sandPct: soil.sandPct,
    },
    source: {
      weather: weather.weatherSource,
      soil: soil.soilSource,
    },
  };

  cache.set(provinceId, { at: Date.now(), data });
  return data;
}
