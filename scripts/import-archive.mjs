import fs from 'fs';

const cleanedPath = 'scripts/_cleaned-archive.json';
const archive = JSON.parse(fs.readFileSync(cleanedPath, 'utf8')).turkey;
const UA = { 'User-Agent': 'PeyzArch/1.0 (educational landscape archive)' };

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function cleanBotanical(name) {
  return name.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

async function fetchJson(url, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { headers: UA, signal: ctrl.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function fetchWikimedia(query) {
  const url =
    'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrnamespace: '6',
      gsrlimit: '8',
      prop: 'imageinfo',
      iiprop: 'url|mime',
      iiurlwidth: '800',
      format: 'json',
      origin: '*',
    }).toString();
  const data = await fetchJson(url, 7000);
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  const urls = [];
  for (const page of pages) {
    const info = page.imageinfo?.[0];
    if (!info?.mime?.startsWith('image/')) continue;
    const src = info.thumburl || info.url;
    if (src && !urls.includes(src)) urls.push(src);
    if (urls.length >= 4) break;
  }
  return urls;
}

async function fetchOpenverse(query) {
  const url =
    'https://api.openverse.org/v1/images/?' +
    new URLSearchParams({ q: query, page_size: '4' }).toString();
  const data = await fetchJson(url, 7000);
  return (data?.results || [])
    .map((r) => r.url || r.thumbnail)
    .filter(Boolean)
    .slice(0, 4);
}

async function fetchWikiThumb(query) {
  const title = query.replace(/\s+/g, '_');
  const data = await fetchJson(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    6000
  );
  const u = data?.originalimage?.source || data?.thumbnail?.source;
  return u ? [u] : [];
}

async function fetchImages(botanical) {
  const query = cleanBotanical(botanical).split("'")[0].trim();
  const merged = [];
  const add = (list) => {
    for (const u of list || []) {
      if (u && !merged.includes(u)) merged.push(u);
      if (merged.length >= 4) return true;
    }
    return false;
  };

  // Paralel: timeout’lu; asılı kalmaz
  const [wm, ov, wiki] = await Promise.all([
    fetchWikimedia(query),
    fetchOpenverse(query),
    fetchWikiThumb(query),
  ]);
  add(wm);
  add(ov);
  add(wiki);

  if (merged.length < 3) add(await fetchWikimedia(`${query} plant`));
  if (merged.length < 3) add(await fetchOpenverse(`${query} tree`));

  // En az 1 görsel yoksa Wikipedia species generic
  if (merged.length === 0) {
    add(await fetchWikiThumb(query.split(' ').slice(0, 2).join(' ')));
  }

  return merged.slice(0, 4);
}

const EAST = ['04', '12', '13', '23', '24', '25', '36', '44', '49', '62', '65', '69', '75', '76'];

const plants = [];
let i = 0;
const total = archive.plant_catalog.length;
for (const p of archive.plant_catalog) {
  i += 1;
  const t0 = Date.now();
  const images = await fetchImages(p.botanical_name);
  console.log(
    `[${i}/${total}] ${p.botanical_name} → ${images.length} img (${Date.now() - t0}ms)`
  );

  const notInErzurum = /yetişmez|uygun değil/i.test(
    `${p.ecological_tolerance} ${p.landscape_use_and_function}`
  );

  plants.push({
    id: slugify(p.botanical_name),
    nameTr: p.turkish_name,
    nameLa: p.botanical_name,
    plantType: p.plant_type,
    heightM: p.height_m,
    crownDiameterM: p.crown_diameter_m,
    formAndSize: p.form_and_size,
    foliageStatus: p.foliage_status,
    leafCharacter: p.leaf_character,
    flowerAndFruit: p.flower_and_fruit,
    landscapeUse: p.landscape_use_and_function,
    ecologicalTolerance: p.ecological_tolerance,
    costArchitecture: p.cost_architecture,
    images,
    image: images[0] || '',
    region: 'Doğu Anadolu',
    city: 'Erzurum',
    provinces: notInErzurum ? ['25'] : EAST,
    endemic: false,
  });
}

const out = {
  region: archive.region,
  city: archive.city,
  provinceId: '25',
  climateData: archive.climate_data,
  soilStructure: archive.soil_structure,
  plants,
};

fs.writeFileSync('src/data/archiveErzurum.json', JSON.stringify(out, null, 2));

const ts = `import type { ArchivePlant, RegionArchive } from '../types/plant';

const data = ${JSON.stringify(out, null, 2)} as const;

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
console.log('DONE', plants.length, 'plants → src/data/archivePlants.ts');
