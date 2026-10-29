import { archivePlants } from '../data/archivePlants';
import { provinces } from '../data/provinces';
import type { ArchivePlant } from '../types/plant';
import type { Province, Region } from '../types/province';

export type SearchKind = 'province' | 'region' | 'plant' | 'plantType';

export type SearchResult = {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  provinceIds: string[];
  /** İl başına yoğunluk skoru (0–1) */
  density: Record<string, number>;
  plant?: ArchivePlant;
  province?: Province;
  region?: Region;
};

function norm(s: string) {
  return s
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/i̇/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const REGIONS: Region[] = [
  'Marmara',
  'Ege',
  'Akdeniz',
  'İç Anadolu',
  'Karadeniz',
  'Doğu Anadolu',
  'Güneydoğu Anadolu',
];

function densityFromIds(ids: string[], boostId?: string): Record<string, number> {
  const density: Record<string, number> = {};
  for (const id of ids) {
    density[id] = id === boostId ? 1 : 0.65;
  }
  return density;
}

function densityFromCounts(counts: Record<string, number>): Record<string, number> {
  const values = Object.values(counts);
  const max = values.length ? Math.max(...values) : 0;
  const density: Record<string, number> = {};
  if (max <= 0) return density;
  for (const [id, n] of Object.entries(counts)) {
    density[id] = 0.25 + (0.75 * n) / max;
  }
  return density;
}

export function searchCatalog(query: string, limit = 12): SearchResult[] {
  const q = norm(query.trim());
  if (q.length < 1) return [];

  const results: SearchResult[] = [];

  for (const region of REGIONS) {
    if (!norm(region).includes(q) && !norm(`${region} bolgesi`).includes(q)) {
      continue;
    }
    const provinceIds = provinces.filter((p) => p.region === region).map((p) => p.id);
    results.push({
      id: `region-${region}`,
      kind: 'region',
      title: region,
      subtitle: `${provinceIds.length} il`,
      provinceIds,
      density: densityFromIds(provinceIds),
      region,
    });
  }

  for (const p of provinces) {
    const hay = norm(`${p.name} ${p.id} ${p.number}`);
    if (!hay.includes(q)) continue;
    results.push({
      id: `province-${p.id}`,
      kind: 'province',
      title: p.name,
      subtitle: `${p.region} · Plaka ${p.id}`,
      provinceIds: [p.id],
      density: { [p.id]: 1 },
      province: p,
    });
  }

  const typeHits = new Set<string>();
  for (const plant of archivePlants) {
    if (!norm(plant.plantType).includes(q)) continue;
    typeHits.add(plant.plantType);
  }
  for (const plantType of typeHits) {
    const ofType = archivePlants.filter((p) => p.plantType === plantType);
    const counts: Record<string, number> = {};
    for (const plant of ofType) {
      for (const id of plant.provinces) {
        counts[id] = (counts[id] || 0) + 1;
      }
    }
    results.push({
      id: `type-${plantType}`,
      kind: 'plantType',
      title: plantType,
      subtitle: `${ofType.length} tür · il yoğunluğu`,
      provinceIds: Object.keys(counts),
      density: densityFromCounts(counts),
    });
  }

  for (const plant of archivePlants) {
    const hay = norm(`${plant.nameTr} ${plant.nameLa} ${plant.plantType}`);
    if (!hay.includes(q)) continue;
    const boost = plant.city === 'Erzurum' ? '25' : undefined;
    results.push({
      id: `plant-${plant.id}`,
      kind: 'plant',
      title: plant.nameTr,
      subtitle: `${plant.nameLa} · ${plant.plantType}`,
      provinceIds: plant.provinces,
      density: densityFromIds(plant.provinces, boost),
      plant,
    });
  }

  const rank: Record<SearchKind, number> = {
    province: 0,
    region: 1,
    plantType: 2,
    plant: 3,
  };

  return results
    .sort((a, b) => {
      const startsA = norm(a.title).startsWith(q) ? 0 : 1;
      const startsB = norm(b.title).startsWith(q) ? 0 : 1;
      if (startsA !== startsB) return startsA - startsB;
      return rank[a.kind] - rank[b.kind];
    })
    .slice(0, limit);
}

/** Yoğunluk 0–1 → yeşil skala */
export function densityColor(t: number): string {
  const x = Math.max(0, Math.min(1, t));
  // açık #E8F0EA → koyu #1F4D32
  const r = Math.round(232 + (31 - 232) * x);
  const g = Math.round(240 + (77 - 240) * x);
  const b = Math.round(234 + (50 - 234) * x);
  return `rgb(${r},${g},${b})`;
}
