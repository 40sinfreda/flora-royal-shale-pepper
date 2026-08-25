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
import { createSpot } from "@/lib/tideline/api";
import { COUNTRIES } from "@/lib/tideline/place";
import { DIFFICULTIES, WATER_TYPES } from "@/lib/tideline/types";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";
import { countryLabel } from "@/lib/i18n";
import { isUnauthorized } from "@/lib/tideline/use-load";
import type { MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/spots/new")({
  component: NewSpotPage,
});

function NewSpotPage() {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const place = usePlaceStore((s) => s.place);
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(place?.country ?? "Israel");
  const [waterType, setWaterType] = useState("sea");
  const [difficulty, setDifficulty] = useState("gentle");
  const [typicalKm, setTypicalKm] = useState("");
  const [typicalTempC, setTypicalTempC] = useState("");
  const [bestSeason, setBestSeason] = useState("");
  const [hazards, setHazards] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
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
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {t("spotNew.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-fg">
        {t("spotNew.title")}
      </h1>
      <p className="mt-2 text-muted">{t("spotNew.lead")}</p>

      <form
        className="mt-8 space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            const res = await createSpot({
              data: {
                name,
                city,
                country,
                waterType: waterType as "sea" | "ocean" | "lake" | "river",
                difficulty: difficulty as
                  | "gentle"
                  | "moderate"
                  | "challenging"
                  | "extreme",
                typicalKm: typicalKm ? Number(typicalKm) : null,
                typicalTempC: typicalTempC ? Number(typicalTempC) : null,
                bestSeason,
                hazards,
                description,
                lat: lat ? Number(lat) : null,
                lng: lng ? Number(lng) : null,
              },
            });
            void navigate({ to: "/spots/$slug", params: { slug: res.slug } });
          } catch (err) {
            if (isUnauthorized(err)) window.location.href = "/login";
            else {
              const msg = err instanceof Error ? err.message : String(err);
              toast.error(/pool|בריכ/i.test(msg) ? t("spotNew.poolErr") : t("spotNew.err"));
            }
            setBusy(false);
          }
        }}
      >
        <Field label={t("spotNew.name")}>
          <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("spotNew.namePh")} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("spotNew.city")}>
            <Input required value={city} onChange={(e) => setCity(e.target.value)} />
          </Field>
          <Field label={t("spotNew.country")}>
            <Select value={country} onChange={(e) => setCountry(e.target.value)}>
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {countryLabel(locale, c.name)}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("spotNew.water")}>
            <Select value={waterType} onChange={(e) => setWaterType(e.target.value)}>
              {WATER_TYPES.map((w) => (
                <option key={w} value={w}>
                  {t(`water.${w}` as MessageKey)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t("spotNew.grade")}>
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {t(`grade.${d}` as MessageKey)}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("spotNew.km")}>
            <Input type="number" min={0.1} step={0.1} value={typicalKm} onChange={(e) => setTypicalKm(e.target.value)} />
          </Field>
          <Field label={t("spotNew.temp")}>
            <Input type="number" step={0.5} value={typicalTempC} onChange={(e) => setTypicalTempC(e.target.value)} />
          </Field>
        </div>
        <Field label={t("spotNew.season")}>
          <Input value={bestSeason} onChange={(e) => setBestSeason(e.target.value)} />
        </Field>
        <Field label={t("spotNew.hazards")}>
          <Input value={hazards} onChange={(e) => setHazards(e.target.value)} />
        </Field>
        <Field label={t("spotNew.desc")}>
          <Textarea required value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("spotNew.lat")}>
            <Input type="number" step="0.0001" value={lat} onChange={(e) => setLat(e.target.value)} />
          </Field>
          <Field label={t("spotNew.lng")}>
            <Input type="number" step="0.0001" value={lng} onChange={(e) => setLng(e.target.value)} />
          </Field>
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? t("spotNew.saving") : t("spotNew.submit")}
        </Button>
      </form>
    </Page>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
