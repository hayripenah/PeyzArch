type SoilLayer = {
  name: string;
  unit_measure?: { d_factor?: number };
  depths?: { values?: { mean?: number | null } }[];
};

type SoilResponse = {
  properties?: {
    layers?: SoilLayer[];
  };
};

function layerMean(layers: SoilLayer[] | undefined, name: string): number | null {
  const layer = layers?.find((l) => l.name === name);
  const raw = layer?.depths?.[0]?.values?.mean;
  if (raw == null || Number.isNaN(raw)) return null;
  const factor = layer?.unit_measure?.d_factor ?? 1;
  return raw / factor;
}

export async function fetchSoilGrids(
  lat: number,
  lon: number
): Promise<{
  ph: number | null;
  organicCarbonGkg: number | null;
  clayPct: number | null;
  sandPct: number | null;
  soilSource: string;
}> {
  const params = new URLSearchParams({
    lon: String(lon),
    lat: String(lat),
    property: 'phh2o',
    depth: '0-5cm',
    value: 'mean',
  });
  // Multiple property params
  const url =
    `https://rest.isric.org/soilgrids/v2.0/properties/query?${params.toString()}` +
    `&property=soc&property=clay&property=sand`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`SoilGrids HTTP ${res.status}`);
  }
  const data = (await res.json()) as SoilResponse;
  const layers = data.properties?.layers;

  const ph = layerMean(layers, 'phh2o');
  const soc = layerMean(layers, 'soc');
  const clay = layerMean(layers, 'clay');
  const sand = layerMean(layers, 'sand');

  return {
    ph: ph == null ? null : Math.round(ph * 10) / 10,
    organicCarbonGkg: soc == null ? null : Math.round(soc * 10) / 10,
    clayPct: clay == null ? null : Math.round(clay * 10) / 10,
    sandPct: sand == null ? null : Math.round(sand * 10) / 10,
    soilSource: 'ISRIC SoilGrids',
  };
}
