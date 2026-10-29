import fs from 'fs';

const src =
  'C:/Users/FURKAN/.cursor/projects/c-Users-FURKAN-Desktop-YEK-Cursor-PeyzArch-main/agent-tools/0d88d38e-1b3b-4b5d-9b28-97febe50345f.txt';
const geo = JSON.parse(fs.readFileSync(src, 'utf8'));

let minX = Infinity,
  minY = Infinity,
  maxX = -Infinity,
  maxY = -Infinity;

function walk(coords) {
  if (typeof coords[0] === 'number') {
    const [x, y] = coords;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    return;
  }
  coords.forEach(walk);
}
geo.features.forEach((f) => walk(f.geometry.coordinates));

const W = 1000;
const pad = 12;
const aspect = (maxX - minX) / (maxY - minY);
const H = Math.round(W / aspect);

function proj(lon, lat) {
  const x = pad + ((lon - minX) / (maxX - minX)) * (W - 2 * pad);
  const y = pad + ((maxY - lat) / (maxY - minY)) * (H - 2 * pad);
  return [x, y];
}

function ringArea(ring) {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(a / 2);
}

function ringToPath(ring) {
  return (
    ring
      .map((pt, i) => {
        const [x, y] = proj(pt[0], pt[1]);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ') + ' Z'
  );
}

function geomToPath(g) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  // keep only meaningful outer rings (drop tiny islands/noise)
  const parts = [];
  for (const poly of polys) {
    const outer = poly[0];
    if (ringArea(outer) < 1e-5) continue;
    parts.push(ringToPath(outer));
  }
  return parts.join(' ');
}

const displayName = {
  Afyon: 'Afyonkarahisar',
};

const provinces = geo.features
  .map((f) => {
    const number = f.properties.number;
    let name = f.properties.name;
    if (number === 53) name = String.fromCharCode(82, 105, 122, 101); // Rize
    if (displayName[name]) name = displayName[name];
    return {
      id: String(number).padStart(2, '0'),
      name,
      number,
      d: geomToPath(f.geometry),
    };
  })
  .sort((a, b) => a.number - b.number);

const out = `export const MAP_VIEWBOX = "0 0 ${W} ${H}";

export type MapProvincePath = { id: string; name: string; number: number; d: string };

export const turkeyProvincePaths: MapProvincePath[] = ${JSON.stringify(
  provinces,
  null,
  2
)};
`;

fs.writeFileSync('src/data/turkeyPaths.ts', out);
console.log('paths', provinces.length, W, H, 'rize', provinces.find((p) => p.number === 53).name);
