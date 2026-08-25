import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, type DragEvent } from "react";
import {
  Compass,
  HeartPulse,
  RefreshCw,
  Smartphone,
  Watch,
} from "lucide-react";
import { toast } from "sonner";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Page } from "@/components/shell";
import { SeaPhoto } from "@/components/sea-photo";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { linkWatch, listSpots, listSyncEvents, listWatchLinks, unlinkWatch } from "@/lib/tideline/api";
import { MATCH_KM, nearestByKm } from "@/lib/tideline/geo";
import { SEA } from "@/lib/tideline/sea";
import {
  parseWorkoutFile,
  WATCH_SOURCES,
  type ParsedWorkout,
  type WatchSource,
} from "@/lib/tideline/workout-file";
import {
  commitWorkouts,
  markSessionPull,
  pullAndImport,
} from "@/lib/tideline/watch-sync";
import {
  formatDate,
  formatDateTime,
  formatDuration,
  formatKm,
  sourceLabel,
} from "@/lib/tideline/format";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";
import { localizeSpotField } from "@/lib/i18n/spot-copy";
import { cn } from "@/lib/utils";
import type { MessageKey } from "@/lib/i18n";
import type { Spot, WatchImportResult, WatchLink } from "@/lib/tideline/types";

export const Route = createFileRoute("/sync")({
  component: SyncPage,
});

type Draft = ParsedWorkout & {
  spotId: number | null;
  kmAway: number | null;
  matchedName: string | null;
  result?: WatchImportResult;
};

const SOURCE_META: Record<
  WatchSource,
  { icon: typeof Watch; photo: string; sample: string; sampleKey: MessageKey }
> = {
  garmin: {
    icon: Watch,
    photo: SEA.gordon,
    sample: "garmin-gordon.gpx",
    sampleKey: "sync.sampleGarmin",
  },
  suunto: {
    icon: Compass,
    photo: SEA.kinneret,
    sample: "suunto-kinneret.gpx",
    sampleKey: "sync.sampleSuunto",
  },
  samsung: {
    icon: Smartphone,
    photo: SEA.haifa,
    sample: "samsung-dado.gpx",
    sampleKey: "sync.sampleSamsung",
  },
  apple: {
    icon: HeartPulse,
    photo: SEA.eilat,
    sample: "apple-eilat.gpx",
    sampleKey: "sync.sampleApple",
  },
};

function syncStatusLabel(status: string, t: (key: MessageKey) => string) {
  if (status === "ok") return t("sync.status.ok");
  if (status === "duplicate") return t("sync.status.duplicate");
  if (status === "pool") return t("sync.status.pool");
  if (status === "needSpot") return t("sync.status.needSpot");
  return status;
}

function matchDraft(w: ParsedWorkout, spots: Spot[]): Pick<Draft, "spotId" | "kmAway" | "matchedName"> {
  if (w.poolLike || w.lat == null || w.lng == null) {
    return { spotId: null, kmAway: null, matchedName: null };
  }
  const near = nearestByKm(spots, w.lat, w.lng);
  if (!near) return { spotId: null, kmAway: null, matchedName: null };
  const kmAway = Math.round(near.km * 10) / 10;
  if (near.km > MATCH_KM) {
    return { spotId: null, kmAway, matchedName: near.item.name };
  }
  return { spotId: near.item.id, kmAway, matchedName: near.item.name };
}

function SyncPage() {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const place = usePlaceStore((s) => s.place);
  const { user, isPending } = useCurrentUserState();
  const spots = useLoad(() => listSpots({ data: {} }));
  const links = useLoad(async () => {
    if (isPending || !user) return [] as WatchLink[];
    return listWatchLinks();
  }, [user?.id, isPending]);
  const events = useLoad(async () => {
    if (isPending || !user) return [];
    return listSyncEvents();
  }, [user?.id, isPending]);

  const [preferred, setPreferred] = useState<WatchSource>("garmin");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [busy, setBusy] = useState(false);
  const [hover, setHover] = useState(false);
  const [linking, setLinking] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const linkBySource = useMemo(() => {
    const map = new Map<string, WatchLink>();
    for (const l of links.data ?? []) map.set(l.source, l);
    return map;
  }, [links.data]);

  const orderedSpots = useMemo(() => {
    return [...(spots.data ?? [])].sort((a, b) => {
      const ac = place?.country === a.country ? 0 : 1;
      const bc = place?.country === b.country ? 0 : 1;
      return ac - bc || a.name.localeCompare(b.name);
    });
  }, [spots.data, place?.country]);

  function mergeDrafts(parsed: ParsedWorkout[], results?: WatchImportResult[]) {
    const catalog = spots.data ?? [];
    const byKey = new Map((results ?? []).map((r) => [r.key, r]));
    setDrafts((prev) => {
      const map = new Map(prev.map((d) => [d.key, d]));
      for (const w of parsed) {
        map.set(w.key, {
          ...w,
          ...matchDraft(w, catalog),
          result: byKey.get(w.key),
        });
      }
      return [...map.values()];
    });
  }

  function announcePull(ok: number, fallbackNone = false) {
    if (ok === 1) toast(t("toast.pulledOne"));
    else if (ok > 1) toast(t("toast.pulled", { n: ok }));
    else if (fallbackNone) toast(t("toast.pulledNone"));
  }

  async function ingestFiles(files: File[], source: WatchSource) {
    const parsed: ParsedWorkout[] = [];
    for (const file of files) {
      try {
        parsed.push(...(await parseWorkoutFile(file, source)));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "";
        toast.error(msg === "unsupported" ? t("sync.unsupported") : t("sync.badFile"));
      }
    }
    if (!parsed.length) return;
    setBusy(true);
    try {
      const results = await commitWorkouts(parsed);
      mergeDrafts(parsed, results);
      announcePull(results.filter((r) => r.status === "ok").length);
      links.reload();
      events.reload();
    } catch (err) {
      mergeDrafts(parsed);
      if (isUnauthorized(err)) window.location.href = "/login";
      else toast.error(t("toast.syncFail"));
    } finally {
      setBusy(false);
    }
  }

  async function onPull(source: WatchSource, opts?: { noneToast?: boolean }) {
    setLinking(source);
    try {
      const summary = await pullAndImport([source]);
      mergeDrafts(summary.workouts, summary.results);
      announcePull(summary.ok, opts?.noneToast);
      if (user) markSessionPull(user.id);
      links.reload();
      events.reload();
    } catch (err) {
      if (isUnauthorized(err)) window.location.href = "/login";
      else toast.error(t("toast.syncFail"));
    } finally {
      setLinking(null);
    }
  }

  async function onLink(source: WatchSource, on: boolean) {
    setLinking(source);
    try {
      if (on) {
        await linkWatch({ data: source });
        toast(t("toast.watchOn"));
        const summary = await pullAndImport([source]);
        mergeDrafts(summary.workouts, summary.results);
        announcePull(summary.ok);
        if (user) markSessionPull(user.id);
      } else {
        await unlinkWatch({ data: source });
        toast(t("toast.watchOff"));
      }
      links.reload();
      events.reload();
    } catch (err) {
      if (isUnauthorized(err)) window.location.href = "/login";
      else toast.error(t("toast.syncFail"));
    } finally {
      setLinking(null);
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setHover(false);
    const files = [...(e.dataTransfer.files ?? [])];
    if (files.length) void ingestFiles(files, preferred);
  }

  async function onImport() {
    const ready = drafts.filter((d) => !d.result || d.result.status === "needSpot");
    if (!ready.length) return;
    setBusy(true);
    try {
      const results = await commitWorkouts(ready);
      const byKey = new Map(results.map((r) => [r.key, r]));
      setDrafts((prev) =>
        prev.map((d) => (byKey.has(d.key) ? { ...d, result: byKey.get(d.key) } : d)),
      );
      announcePull(results.filter((r) => r.status === "ok").length);
      links.reload();
      events.reload();
    } catch (err) {
      if (isUnauthorized(err)) window.location.href = "/login";
      else toast.error(t("toast.syncFail"));
    } finally {
      setBusy(false);
    }
  }

  if (isPending) {
    return (
      <Page>
        <Skeleton className="h-11 w-48" />
        <Skeleton className="mt-6 h-64 w-full rounded-xl" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const pending = drafts.filter((d) => !d.result || d.result.status === "needSpot");
  const savedCount = drafts.filter((d) => d.result?.status === "ok").length;
  const canImport = pending.some((d) => !d.poolLike);

  return (
    <Page>
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {t("sync.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">
        {t("sync.title")}
      </h1>
      <p className="mt-2 max-w-2xl text-muted">{t("sync.lead")}</p>
      <p className="mt-2 max-w-2xl text-sm text-faint">{t("sync.why")}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {WATCH_SOURCES.map((source) => {
          const meta = SOURCE_META[source];
          const Icon = meta.icon;
          const link = linkBySource.get(source);
          const active = preferred === source;
          const working = linking === source;
          return (
            <article
              key={source}
              className={cn(
                "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
                active && "ring-2 ring-accent/70",
              )}
            >
              <button
                type="button"
                className="relative block aspect-[16/9] w-full"
                onClick={() => setPreferred(source)}
              >
                <SeaPhoto src={meta.photo} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <span className="absolute bottom-3 start-3 flex items-center gap-2 text-sm font-medium text-fg">
                  <Icon className="size-4 text-accent" />
                  {sourceLabel(source, locale)}
                </span>
                {link ? (
                  <span className="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-fg">
                    <span className="size-1.5 animate-pulse rounded-full bg-accent-fg" />
                    {t("sync.live")}
                  </span>
                ) : null}
              </button>
              <div className="space-y-2 p-4">
                <p className="text-xs text-faint">
                  {link?.lastImportAt
                    ? t("sync.lastImport", { when: formatDateTime(link.lastImportAt, locale) })
                    : t("sync.never")}
                </p>
                {link && link.importCount > 0 ? (
                  <p className="text-xs text-muted">
                    {link.importCount === 1
                      ? t("sync.importsOne")
                      : t("sync.imports", { n: link.importCount })}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={link ? "outline" : "primary"}
                    disabled={working}
                    onClick={() => onLink(source, !link)}
                  >
                    {link ? t("sync.disconnect") : t("sync.connect")}
                  </Button>
                  {link ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="subtle"
                      disabled={working}
                      onClick={() => void onPull(source, { noneToast: true })}
                    >
                      <RefreshCw className={cn("size-3.5", working && "animate-spin")} />
                      {working ? t("sync.syncing") : t("sync.syncNow")}
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-fg">{t("sync.log")}</h2>
        {(events.data ?? []).length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t("sync.logEmpty")}</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {(events.data ?? []).map((ev) => (
              <li
                key={ev.id}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
              >
                <div>
                  <p className="text-sm text-fg">
                    {sourceLabel(ev.source, locale)}
                    {ev.title ? ` · ${ev.title}` : ""}
                  </p>
                  <p className="mt-0.5 text-xs text-faint">
                    {syncStatusLabel(ev.status, t)}
                    {ev.spotName ? ` · ${ev.spotName}` : ""}
                  </p>
                </div>
                <p className="text-xs text-faint">{formatDateTime(ev.createdAt, locale)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div
        className={cn(
          "mt-8 rounded-xl bg-surface p-6 text-center shadow-[var(--shadow-border)]",
          hover && "ring-2 ring-accent/60",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={onDrop}
      >
        <Watch className="mx-auto size-7 text-accent" />
        <p className="mt-3 font-display text-xl text-fg">{t("sync.drop")}</p>
        <p className="mt-1 text-sm text-muted">{t("sync.dropHint")}</p>
        <input
          ref={inputRef}
          type="file"
          accept=".gpx,.tcx,.fit,.json,.csv,application/gpx+xml,application/vnd.garmin.tcx+xml"
          multiple
          className="sr-only"
          onChange={(e) => {
            const files = [...(e.target.files ?? [])];
            e.target.value = "";
            if (files.length) void ingestFiles(files, preferred);
          }}
        />
        <Button
          type="button"
          className="mt-4"
          onClick={() => inputRef.current?.click()}
        >
          {t("sync.browse")}
        </Button>
        <p className="mt-4 text-xs text-faint">{t("sync.samples")}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {WATCH_SOURCES.map((source) => (
            <Button
              key={source}
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                const name = SOURCE_META[source].sample;
                void fetch(`/samples/${name}`)
                  .then((res) => {
                    if (!res.ok) throw new Error("bad");
                    return res.blob();
                  })
                  .then((blob) => {
                    const file = new File([blob], name, { type: "application/gpx+xml" });
                    return ingestFiles([file], source);
                  })
                  .catch(() => toast.error(t("sync.fail")));
              }}
            >
              {t(SOURCE_META[source].sampleKey)}
            </Button>
          ))}
        </div>
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-fg">{t("sync.preview")}</h2>
          {savedCount > 0 ? (
            <Button asChild variant="outline" size="sm">
              <Link to="/profile">{t("sync.done")}</Link>
            </Button>
          ) : null}
        </div>
        {drafts.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t("sync.empty")}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {drafts.map((draft) => {
              const status = draft.result?.status;
              const spot = orderedSpots.find((s) => s.id === draft.spotId);
              return (
                <li
                  key={draft.key}
                  className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-fg">{draft.title}</p>
                      <p className="mt-0.5 text-xs text-faint">
                        {sourceLabel(draft.source, locale)} · {formatDate(draft.swamOn, locale)} ·{" "}
                        {formatKm(draft.distanceKm, locale)}
                        {draft.durationMin
                          ? ` · ${formatDuration(draft.durationMin, locale)}`
                          : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="h-11 text-xs text-faint hover:text-danger"
                      onClick={() =>
                        setDrafts((prev) => prev.filter((d) => d.key !== draft.key))
                      }
                    >
                      {t("sync.remove")}
                    </button>
                  </div>
                  {draft.poolLike ? (
                    <p className="mt-3 text-sm text-warn">{t("sync.pool")}</p>
                  ) : status === "ok" || status === "duplicate" ? null : (
                    <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                      <label className="block space-y-1.5">
                        <span className="text-xs text-muted">{t("sync.spot")}</span>
                        <Select
                          value={draft.spotId ? String(draft.spotId) : ""}
                          onChange={(e) => {
                            const id = e.target.value ? Number(e.target.value) : null;
                            setDrafts((prev) =>
                              prev.map((d) =>
                                d.key === draft.key
                                  ? { ...d, spotId: id, result: undefined }
                                  : d,
                              ),
                            );
                          }}
                        >
                          <option value="">{t("sync.choose")}</option>
                          {orderedSpots.map((s) => (
                            <option key={s.id} value={String(s.id)}>
                              {localizeSpotField(locale, s.slug, "name", s.name)}
                            </option>
                          ))}
                        </Select>
                      </label>
                      <p className="text-xs text-faint">
                        {spot && draft.kmAway != null && draft.kmAway <= MATCH_KM
                          ? t("sync.matched", {
                              name: localizeSpotField(locale, spot.slug, "name", spot.name),
                            })
                          : draft.matchedName
                            ? t("sync.away", {
                                n: draft.kmAway ?? "?",
                                name: draft.matchedName,
                              })
                            : t("sync.needSpot")}
                      </p>
                    </div>
                  )}
                  {status === "ok" ? (
                    <p className="mt-2 text-sm text-accent">{t("sync.ok")}</p>
                  ) : null}
                  {status === "duplicate" ? (
                    <p className="mt-2 text-sm text-muted">{t("sync.duplicate")}</p>
                  ) : null}
                  {status === "pool" ? (
                    <p className="mt-2 text-sm text-warn">{t("sync.pool")}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
        {canImport ? (
          <Button
            type="button"
            className="mt-6 w-full sm:w-auto"
            disabled={busy}
            onClick={() => void onImport()}
          >
            {busy ? t("sync.importing") : t("sync.import")}
          </Button>
        ) : null}
      </section>
    </Page>
  );
}
