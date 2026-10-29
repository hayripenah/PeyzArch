import fs from 'fs';

const path = 'src/data/archiveErzurum.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const UA = { 'User-Agent': 'PeyzArch/1.0' };

async function wiki(q) {
  const title = q.replace(/\s+/g, '_');
  try {
    const r = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: UA, signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return [];
    const d = await r.json();
    const u = d.originalimage?.source || d.thumbnail?.source;
    return u ? [u] : [];
  } catch {
    return [];
  }
}

async function ov(q) {
  try {
    const r = await fetch(
      'https://api.openverse.org/v1/images/?' +
        new URLSearchParams({ q, page_size: '4' }),
      { headers: UA, signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return [];
    const d = await r.json();
    return (d.results || [])
      .map((x) => x.url || x.thumbnail)
      .filter(Boolean)
      .slice(0, 4);
  } catch {
    return [];
  }
}

for (const p of data.plants) {
  if (p.images.length >= 3) continue;
  const genus = p.nameLa.split(/\s+/)[0];
  const species = p.nameLa
    .replace(/['’].*$/, '')
    .replace(/\s*\(.*\)/, '')
    .trim();
  let imgs = [...p.images];
  for (const q of [species, `${genus} tree`, genus, `${genus} plant`]) {
    if (imgs.length >= 4) break;
    for (const u of await ov(q)) if (!imgs.includes(u)) imgs.push(u);
    if (imgs.length >= 4) break;
    for (const u of await wiki(q.split(' ').slice(0, 2).join(' '))) {
      if (!imgs.includes(u)) imgs.push(u);
    }
  }
  p.images = imgs.slice(0, 4);
  p.image = p.images[0] || '';
  console.log(p.nameLa, '=>', p.images.length);
}

fs.writeFileSync(path, JSON.stringify(data, null, 2));

const ts = `import type { ArchivePlant, RegionArchive } from '../types/plant';

const data = ${JSON.stringify(data, null, 2)} as const;

export const erzurumArchive: RegionArchive = data as unknown as RegionArchive;

export const archivePlants: ArchivePlant[] = erzurumArchive.plants;

export function getArchivePlantsForProvince(provinceId: string): ArchivePlant[] {
  return archivePlants.filter((p) => p.provinces.includes(provinceId));
}

export function getRegionArchiveForProvince(provinceId: string): RegionArchive | null {
  if (provinceId === erzurumArchive.provinceId) return erzurumArchive;
  if (erzurumArchive.plants.some((p) => p.provinces.includes(provinceId))) {
    return erzurumArchive;
  }
  return null;
}
`;
fs.writeFileSync('src/data/archivePlants.ts', ts);
console.log('patched archivePlants.ts');
