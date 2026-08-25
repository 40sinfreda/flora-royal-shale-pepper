import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
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
import { createGathering, listSpots } from "@/lib/tideline/api";
import { usePlaceFilter, usePlaceStore, useT } from "@/lib/tideline/place-store";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { localizeSpotField } from "@/lib/i18n/spot-copy";

export const Route = createFileRoute("/events/new")({
  validateSearch: (raw: Record<string, unknown>) => {
    const n = Number(raw.spotId);
    return { spotId: Number.isFinite(n) && n > 0 ? n : undefined };
  },
  component: NewGatheringPage,
});

function defaultStarts() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(6, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInput(value: string) {
  return new Date(value).toISOString();
}

function NewGatheringPage() {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const filter = usePlaceFilter();
  const search = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const spots = useLoad(() => listSpots({ data: filter }), [
    `${filter.country ?? ""}:${filter.region ?? ""}`,
  ]);
  const [title, setTitle] = useState("");
  const [spotId, setSpotId] = useState(search.spotId ? String(search.spotId) : "");
  const [startsAt, setStartsAt] = useState(defaultStarts);
  const [distanceKm, setDistanceKm] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return (
      <Page>
        <Skeleton className="h-11 w-48" />
        <Skeleton className="mt-6 h-80 w-full rounded-xl" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <Page className="max-w-xl">
      <p className="text-xs font-medium tracking-wide text-accent">
        {t("eventNew.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-fg">
        {t("eventNew.title")}
      </h1>
      <p className="mt-2 text-muted">{t("eventNew.lead")}</p>

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
            const res = await createGathering({
              data: {
                title,
                spotId: Number(spotId),
                startsAt: fromLocalInput(startsAt),
                distanceKm: distanceKm ? Number(distanceKm) : null,
                notes,
              },
            });
            if (!res?.id) throw new Error("missing id");
            toast.success(t("toast.gathering"));
            void navigate({ to: "/events" });
          } catch (err) {
            if (isUnauthorized(err)) window.location.href = "/login";
            else toast.error(t("eventNew.err"));
            setBusy(false);
          }
        }}
      >
        <Field label={t("eventNew.name")}>
          <Input
            required
            minLength={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("eventNew.namePh")}
          />
        </Field>
        <Field label={t("log.spot")}>
          <Select required value={spotId} onChange={(e) => setSpotId(e.target.value)}>
            <option value="">{t("log.choose")}</option>
            {(spots.data ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {localizeSpotField(locale, s.slug, "name", s.name)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t("eventNew.starts")}>
          <Input
            required
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
          />
        </Field>
        <Field label={t("log.km")}>
          <Input
            type="number"
            min={0.1}
            step={0.1}
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
          />
        </Field>
        <Field label={t("eventNew.notes")}>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("eventNew.notesPh")}
          />
        </Field>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? t("eventNew.saving") : t("eventNew.submit")}
        </Button>
      </form>
    </Page>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
