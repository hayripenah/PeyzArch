const LABELS = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB'] as const;

/** Derece → Türkçe yön etiketi (Kuzey, Kuzeydoğu, …) */
export function windDirectionLabel(deg: number | null | undefined): string | null {
  if (deg == null || Number.isNaN(deg)) return null;
  const i = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return LABELS[i];
}
