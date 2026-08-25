export function project(
  lat: number,
  lng: number,
  width = 1000,
  height = 480,
): { x: number; y: number } {
  return {
    x: ((lng + 180) / 360) * width,
    y: ((90 - lat) / 180) * height,
  };
}

export const CHART_W = 1000;
export const CHART_H = 480;

/** Max distance from a GPS fix to a charted water before we ask the swimmer to pick. */
export const MATCH_KM = 40;

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

export function nearestByKm<T extends { lat: number; lng: number }>(
  items: T[],
  lat: number,
  lng: number,
): { item: T; km: number } | null {
  let best: T | null = null;
  let bestKm = Infinity;
  for (const item of items) {
    const km = haversineKm(lat, lng, item.lat, item.lng);
    if (km < bestKm) {
      bestKm = km;
      best = item;
    }
  }
  return best ? { item: best, km: bestKm } : null;
}
