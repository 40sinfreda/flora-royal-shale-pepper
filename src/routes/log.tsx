import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Page } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { listSpots, logSwim } from "@/lib/tideline/api";
import { CONDITIONS, FEELINGS } from "@/lib/tideline/types";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { format } from "date-fns";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";
import { localizeCity, localizeSpotField } from "@/lib/i18n/spot-copy";
import type { MessageKey } from "@/lib/i18n";

type LogSearch = { spot?: string };

export const Route = createFileRoute("/log")({
  validateSearch: (search: Record<string, unknown>): LogSearch => ({
    spot: typeof search.spot === "string" ? search.spot : undefined,
  }),
  component: LogPage,
});

function LogPage() {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const place = usePlaceStore((s) => s.place);
  const { user, isPending } = useCurrentUserState();
  const { spot: preset } = Route.useSearch();
  const spots = useLoad(
    () =>
      place?.country
        ? listSpots({ data: { country: place.country } })
        : Promise.resolve([]),
    [place?.country],
  );
  const [spotId, setSpotId] = useState("");
  const [swamOn, setSwamOn] = useState(format(new Date(), "yyyy-MM-dd"));
  const [distanceKm, setDistanceKm] = useState("2");
  const [durationMin, setDurationMin] = useState("");
  const [waterTempC, setWaterTempC] = useState("");
  const [conditions, setConditions] = useState("glass");
  const [feeling, setFeeling] = useState("solid");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!spots.data) return;
    if (preset) {
      const match = spots.data.find((s) => s.slug === preset);
      if (match) {
        setSpotId(String(match.id));
        return;
      }
    }
    if (!spotId && spots.data[0]) {
      setSpotId(String(spots.data[0].id));
    }
  }, [spots.data, preset, spotId]);

  if (isPending) {
    return (
      <Page>
        <Skeleton className="h-11 w-48" />
        <Skeleton className="mt-6 h-80 w-full rounded-xl" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const ordered = [...(spots.data ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <Page className="max-w-xl">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {t("log.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-fg">
        {t("log.title")}
      </h1>
      <p className="mt-2 text-muted">{t("log.lead")}</p>
      <Link
        to="/sync"
        className="mt-3 inline-flex h-11 items-center text-sm text-accent hover:underline"
      >
        {t("log.syncCta")}
      </Link>

      <form
        className="mt-8 space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!spotId) {
            toast.error(t("log.needSpot"));
            return;
          }
          setBusy(true);
          try {
            await logSwim({
              data: {
                spotId: Number(spotId),
                swamOn,
                distanceKm: Number(distanceKm),
                durationMin: durationMin ? Number(durationMin) : null,
                waterTempC: waterTempC ? Number(waterTempC) : null,
                conditions,
                feeling,
                notes: notes.trim() || null,
                displayName: user.displayName ?? undefined,
              },
            });
            toast(t("toast.swim"));
            setNotes("");
            window.location.href = "/profile";
          } catch (err) {
            if (isUnauthorized(err)) window.location.href = "/login";
            else toast.error(t("toast.swimFail"));
            setBusy(false);
          }
        }}
      >
        <Field label={t("log.spot")}>
          <Select
            required
            value={spotId}
            onChange={(e) => setSpotId(e.target.value)}
          >
            <option value="">{t("log.choose")}</option>
            {ordered.map((s) => (
              <option key={s.id} value={s.id}>
                {localizeSpotField(locale, s.slug, "name", s.name)}, {localizeCity(locale, s.city)}
              </option>
            ))}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("log.date")}>
            <Input
              type="date"
              required
              value={swamOn}
              onChange={(e) => setSwamOn(e.target.value)}
            />
          </Field>
          <Field label={t("log.km")}>
            <Input
              type="number"
              required
              min={0.1}
              step={0.1}
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("log.time")}>
            <Input
              type="number"
              min={1}
              placeholder={t("log.optional")}
              value={durationMin}
              onChange={(e) => setDurationMin(e.target.value)}
            />
          </Field>
          <Field label={t("log.temp")}>
            <Input
              type="number"
              step={0.5}
              placeholder={t("log.optional")}
              value={waterTempC}
              onChange={(e) => setWaterTempC(e.target.value)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("log.conditions")}>
            <Select
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {t(`cond.${c}` as MessageKey)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t("log.feeling")}>
            <Select
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
            >
              {FEELINGS.map((c) => (
                <option key={c} value={c}>
                  {t(`feel.${c}` as MessageKey)}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label={t("log.notes")}>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("log.notesPh")}
          />
        </Field>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? t("log.saving") : t("log.submit")}
        </Button>
      </form>
    </Page>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
