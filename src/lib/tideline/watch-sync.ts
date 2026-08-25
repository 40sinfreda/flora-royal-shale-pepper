import { importWatchWorkouts } from "./api";
import {
  parseWorkoutFile,
  WATCH_SOURCES,
  type ParsedWorkout,
  type WatchSource,
} from "./workout-file";
import type { WatchImportResult } from "./types";

export const SOURCE_FEED_FILES: Record<WatchSource, string> = {
  garmin: "/samples/garmin-gordon.gpx",
  suunto: "/samples/suunto-kinneret.gpx",
  samsung: "/samples/samsung-dado.gpx",
  apple: "/samples/apple-eilat.gpx",
};

export function isWatchSource(value: string): value is WatchSource {
  return (WATCH_SOURCES as readonly string[]).includes(value);
}

export function toImportPayload(w: ParsedWorkout, spotId: number | null = null) {
  return {
    source: w.source,
    key: w.key,
    title: w.title,
    swamOn: w.swamOn,
    distanceKm: w.distanceKm,
    durationMin: w.durationMin,
    waterTempC: w.waterTempC,
    lat: w.lat,
    lng: w.lng,
    poolLike: w.poolLike,
    spotId,
  };
}

export async function commitWorkouts(
  workouts: Array<ParsedWorkout & { spotId?: number | null }>,
): Promise<WatchImportResult[]> {
  const ready = workouts.filter((w) => !w.poolLike).slice(0, 25);
  if (!ready.length) return [];
  return importWatchWorkouts({
    data: {
      workouts: ready.map((w) => toImportPayload(w, w.spotId ?? null)),
    },
  });
}

export async function pullSourceFeed(source: WatchSource): Promise<ParsedWorkout[]> {
  const path = SOURCE_FEED_FILES[source];
  const res = await fetch(path);
  if (!res.ok) throw new Error("feed");
  const blob = await res.blob();
  const name = path.split("/").pop() ?? `${source}.gpx`;
  const file = new File([blob], name, { type: "application/gpx+xml" });
  return parseWorkoutFile(file, source);
}

export type PullSummary = {
  workouts: ParsedWorkout[];
  results: WatchImportResult[];
  ok: number;
  duplicate: number;
  needSpot: number;
};

export async function pullAndImport(sources: WatchSource[]): Promise<PullSummary> {
  const workouts: ParsedWorkout[] = [];
  for (const source of sources) {
    workouts.push(...(await pullSourceFeed(source)));
  }
  const results = await commitWorkouts(workouts);
  return {
    workouts,
    results,
    ok: results.filter((r) => r.status === "ok").length,
    duplicate: results.filter((r) => r.status === "duplicate").length,
    needSpot: results.filter((r) => r.status === "needSpot").length,
  };
}

export function markSessionPull(userId: string) {
  try {
    sessionStorage.setItem(`tideline-watch-pull:${userId}`, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function shouldSessionPull(userId: string, minMs = 120_000) {
  try {
    const last = Number(sessionStorage.getItem(`tideline-watch-pull:${userId}`) || "0");
    return Date.now() - last >= minMs;
  } catch {
    return true;
  }
}
