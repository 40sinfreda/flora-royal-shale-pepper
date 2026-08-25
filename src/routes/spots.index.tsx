import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import { Atlas } from "@/components/atlas";
import { SpotCard } from "@/components/spot-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { listSpots } from "@/lib/tideline/api";
import { useFavorites } from "@/lib/tideline/use-favorites";
import { DIFFICULTIES, WATER_TYPES } from "@/lib/tideline/types";
import { usePlaceFilter, useT } from "@/lib/tideline/place-store";
import { useLoad } from "@/lib/tideline/use-load";
import { cn } from "@/lib/utils";
import type { MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/spots/")({
  component: SpotsPage,
});

function SpotsPage() {
  const t = useT();
  const filter = usePlaceFilter();
  const fav = useFavorites();
  const key = `${filter.country ?? ""}:${filter.region ?? ""}`;
  const loaded = useLoad(() => listSpots({ data: filter }), [key]);
  const data = loaded.data ?? [];
  const [water, setWater] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");

  const filtered = useMemo(() => {
    return data.filter((s) => {
      if (water !== "all" && s.waterType !== water) return false;
      if (difficulty !== "all" && s.difficulty !== difficulty) return false;
      return true;
    });
  }, [data, water, difficulty]);

  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            {t("spots.kicker")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">
            {t("spots.title")}
          </h1>
          <p className="mt-2 max-w-xl text-muted">{t("spots.lead")}</p>
        </div>
        <Button asChild>
          <Link to="/spots/new">{t("spots.add")}</Link>
        </Button>
      </div>

      <div className="mt-8">
        {loaded.loading && !loaded.data ? (
          <Skeleton className="aspect-[2/1] w-full rounded-xl" />
        ) : (
          <Atlas spots={filtered.length ? filtered : data} />
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <FilterRow
          label={t("spots.filterWater")}
          value={water}
          onChange={setWater}
          options={["all", ...WATER_TYPES]}
          t={t}
          kind="water"
        />
        <FilterRow
          label={t("spots.filterGrade")}
          value={difficulty}
          onChange={setDifficulty}
          options={["all", ...DIFFICULTIES]}
          t={t}
          kind="grade"
        />
      </div>

      <p className="mt-8 text-sm text-faint">
        {filtered.length === 1
          ? t("spots.countOne")
          : t("spots.count", { n: filtered.length })}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {filtered.map((spot) => (
          <SpotCard
            key={spot.id}
            spot={spot}
            saved={fav.isSpotSaved(spot.id)}
            onToggleSave={(id) => void fav.toggleSpot(id)}
          />
        ))}
      </div>
      {filtered.length === 0 && !loaded.loading ? (
        <p className="mt-8 text-sm text-muted">{t("spots.empty")}</p>
      ) : null}
    </Page>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
  t,
  kind,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  t: (key: MessageKey) => string;
  kind: "water" | "grade";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 shrink-0 text-xs uppercase tracking-widest text-faint">
        {label}
      </span>
      {options.map((opt) => {
        const text =
          opt === "all"
            ? t("spots.filterAll")
            : kind === "water"
              ? t(`water.${opt}` as MessageKey)
              : t(`grade.${opt}` as MessageKey);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "h-11 rounded-full px-3.5 text-sm capitalize transition-colors duration-150",
              value === opt
                ? "bg-accent text-accent-fg"
                : "bg-raised text-muted hover:text-fg",
            )}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}
