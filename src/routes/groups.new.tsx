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
import { createClub, listSpots } from "@/lib/tideline/api";
import { COUNTRIES, isWhatsappUrl } from "@/lib/tideline/place";
import { usePlaceFilter, usePlaceStore, useT } from "@/lib/tideline/place-store";
import { countryLabel } from "@/lib/i18n";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { localizeSpotField } from "@/lib/i18n/spot-copy";

export const Route = createFileRoute("/groups/new")({
  component: NewGroupPage,
});

function NewGroupPage() {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const place = usePlaceStore((s) => s.place);
  const filter = usePlaceFilter();
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const spots = useLoad(() => listSpots({ data: filter }), [
    `${filter.country ?? ""}:${filter.region ?? ""}`,
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState(place?.country ?? "Israel");
  const [spotId, setSpotId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
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
        {t("groupNew.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-fg">
        {t("groupNew.title")}
      </h1>
      <p className="mt-2 text-muted">{t("groupNew.lead")}</p>

      <form
        className="mt-8 space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          if (whatsappUrl && !isWhatsappUrl(whatsappUrl)) {
            toast.error(t("groupNew.badWa"));
            return;
          }
          setBusy(true);
          try {
            const res = await createClub({
              data: {
                name,
                description,
                country,
                spotId: spotId ? Number(spotId) : null,
                whatsappUrl,
              },
            });
            if (!res?.slug) throw new Error("missing slug");
            void navigate({ to: "/groups/$slug", params: { slug: res.slug } });
          } catch (err) {
            if (isUnauthorized(err)) window.location.href = "/login";
            else {
              const msg = err instanceof Error ? err.message : "";
              toast.error(/whatsapp/i.test(msg) ? t("groupNew.badWa") : t("groupNew.err"));
            }
            setBusy(false);
          }
        }}
      >
        <Field label={t("group.name")}>
          <Input
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <Field label={t("group.spot")}>
          <Select value={spotId} onChange={(e) => setSpotId(e.target.value)}>
            <option value="">{t("group.spotNone")}</option>
            {(spots.data ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {localizeSpotField(locale, s.slug, "name", s.name)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t("group.desc")}>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <Field label={t("group.whatsapp")}>
          <Input
            value={whatsappUrl}
            onChange={(e) => setWhatsappUrl(e.target.value)}
            placeholder={t("group.whatsappPh")}
          />
          <p className="text-xs text-faint">{t("groupNew.whatsappOpt")}. {t("group.whatsappHelp")}</p>
        </Field>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? t("group.saving") : t("groupNew.submit")}
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
