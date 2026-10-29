/** turkeyPaths üretimindeki projeksiyon parametreleri */
export const MAP_GEO = {
  minLon: 25.665136337280273,
  maxLon: 44.83383941650408,
  minLat: 35.815425872802905,
  maxLat: 42.1054115295413,
  width: 1000,
  height: 328,
  pad: 12,
} as const;

export type LonLat = { lon: number; lat: number };

/** SVG viewBox → WGS84 */
export function svgToLonLat(x: number, y: number): LonLat {
  const { minLon, maxLon, minLat, maxLat, width, height, pad } = MAP_GEO;
  const lon =
    minLon + ((x - pad) / (width - 2 * pad)) * (maxLon - minLon);
  const lat =
    maxLat - ((y - pad) / (height - 2 * pad)) * (maxLat - minLat);
  return { lon, lat };
}

/** Ekran/layout → viewBox (SVG boyutuna göre) */
export function layoutToSvg(
  localX: number,
  localY: number,
  svgW: number,
  svgH: number
): { x: number; y: number } {
  return {
    x: (localX / svgW) * MAP_GEO.width,
    y: (localY / svgH) * MAP_GEO.height,
  };
}

export function formatCoord(n: number, digits = 4): string {
  return n.toFixed(digits);
}
