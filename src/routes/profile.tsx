import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Page } from "@/components/shell";
import { SpotCard } from "@/components/spot-card";
import { ClubCard } from "@/components/club-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  deleteSwim,
  getMyProfile,
  getMyStats,
  listMySwims,
  listSavedClubs,
  listSavedSpots,
  updateMyProfile,
} from "@/lib/tideline/api";
import { useFavorites } from "@/lib/tideline/use-favorites";
import { getOfficeAccess } from "@/lib/tideline/office";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import {
  formatDate,
  formatDuration,
  formatKm,
  formatTemp,
  sourceLabel,
} from "@/lib/tideline/format";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";
import { localizeSpotField } from "@/lib/i18n/spot-copy";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const { user, isPending } = useCurrentUserState();
  const profile = useLoad(async () => {
    if (isPending || !user) return null;
    return getMyProfile();
  }, [user?.id, isPending]);
  const stats = useLoad(async () => {
    if (isPending || !user) return null;
    return getMyStats();
  }, [user?.id, isPending]);
  const swims = useLoad(async () => {
    if (isPending || !user) return [];
    return listMySwims();
  }, [user?.id, isPending]);
  const saved = useLoad(async () => {
    if (isPending || !user) return [];
    return listSavedSpots();
  }, [user?.id, isPending]);
  const savedClubs = useLoad(async () => {
    if (isPending || !user) return [];
    try {
      return await listSavedClubs();
    } catch {
      return [];
    }
  }, [user?.id, isPending]);
  const office = useLoad(async () => {
    if (isPending || !user) return null;
    try {
      return await getOfficeAccess();
    } catch {
      return null;
    }
  }, [user?.id, isPending]);

  const fav = useFavorites();
  const [displayName, setDisplayName] = useState("");
  const [homeWater, setHomeWater] = useState("");
  const [stroke, setStroke] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile.data) return;
    setDisplayName(profile.data.displayName);
    setHomeWater(profile.data.homeWater ?? "");
    setStroke(profile.data.stroke ?? "");
    setBio(profile.data.bio ?? "");
  }, [profile.data]);

  if (isPending) {
    return (
      <Page>
        <Skeleton className="h-10 w-48" />
        <Skeleton className="mt-6 h-40 rounded-xl" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <Page>
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {t("profile.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-fg">
        {displayName || user.displayName || "Swimmer"}
      </h1>
      <p className="mt-2 text-muted">{t("profile.lead")}</p>
      {office.data?.status === "owner" ? (
        <div className="mt-4">
          <Button asChild size="sm" variant="outline">
            <Link to="/office">{t("nav.office")}</Link>
          </Button>
        </div>
      ) : null}

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label={t("profile.swims")} value={stats.data ? String(stats.data.swimCount) : "0"} />
        <Stat
          label={t("profile.km")}
          value={stats.data ? formatKm(stats.data.totalKm, locale) : formatKm(0, locale)}
        />
        <Stat
          label={t("profile.waters")}
          value={stats.data ? String(stats.data.uniqueSpots) : "0"}
        />
        <Stat
          label={t("profile.longest")}
          value={stats.data ? formatKm(stats.data.longestKm, locale) : formatKm(0, locale)}
        />
      </dl>

      <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-2xl text-fg">{t("profile.recent")}</h2>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/sync">{t("profile.sync")}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/log">{t("nav.log")}</Link>
              </Button>
            </div>
          </div>
          <ul className="mt-4 space-y-3">
            {(swims.data ?? []).length === 0 ? (
              <li className="rounded-xl bg-surface p-6 text-sm text-muted shadow-[var(--shadow-border)]">
                {t("profile.emptySwims")}
              </li>
            ) : (
              (swims.data ?? []).map((swim) => (
                <li
                  key={swim.id}
                  className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to="/spots/$slug"
                        params={{ slug: swim.spotSlug }}
                        className="font-medium text-fg hover:text-accent"
                      >
                        {localizeSpotField(locale, swim.spotSlug, "name", swim.spotName)}
                      </Link>
                      {swim.source && swim.source !== "manual" ? (
                        <span className="ms-2 inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent">
                          {sourceLabel(swim.source, locale)}
                        </span>
                      ) : null}
                      <p className="text-xs text-faint">
                        {formatDate(swim.swamOn, locale)} · {formatKm(swim.distanceKm, locale)}
                        {swim.durationMin
                          ? ` · ${formatDuration(swim.durationMin)}`
                          : ""}
                        {swim.waterTempC != null
                          ? ` · ${formatTemp(swim.waterTempC)}`
                          : ""}
                      </p>
                      {swim.notes ? (
                        <p className="mt-2 text-sm text-muted">{swim.notes}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      className="h-11 text-xs text-faint hover:text-danger"
                      onClick={async () => {
                        try {
                          await deleteSwim({ data: swim.id });
                          swims.reload();
                          stats.reload();
                        } catch (err) {
                          if (isUnauthorized(err)) window.location.href = "/login";
                        }
                      }}
                    >
                      {t("profile.remove")}
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="space-y-10">
          <form
            className="space-y-3 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              try {
                await updateMyProfile({
                  data: { displayName, homeWater, bio, stroke },
                });
                toast(t("toast.profile"));
                profile.reload();
              } catch (err) {
                if (isUnauthorized(err)) window.location.href = "/login";
                else toast.error(t("toast.profileFail"));
              } finally {
                setSaving(false);
              }
            }}
          >
            <h2 className="font-display text-2xl text-fg">{t("profile.how")}</h2>
            <Field label={t("profile.name")}>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </Field>
            <Field label={t("profile.homeWater")}>
              <Input
                value={homeWater}
                onChange={(e) => setHomeWater(e.target.value)}
                placeholder={t("profile.homeWaterPh")}
              />
            </Field>
            <Field label={t("profile.stroke")}>
              <Input
                value={stroke}
                onChange={(e) => setStroke(e.target.value)}
                placeholder={t("profile.strokePh")}
              />
            </Field>
            <Field label={t("profile.bio")}>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={t("profile.bioPh")}
              />
            </Field>
            <Button type="submit" size="sm" disabled={saving}>
              {saving ? t("profile.saving") : t("profile.save")}
            </Button>
          </form>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl text-fg">{t("fav.title")}</h2>
              <Link to="/favorites" className="text-sm text-accent">
                {t("fav.seeAll")}
              </Link>
            </div>
            <div className="mt-4 grid gap-3">
              {(saved.data ?? []).length === 0 && (savedClubs.data ?? []).length === 0 ? (
                <p className="text-sm text-muted">{t("profile.savedEmpty")}</p>
              ) : null}
              {(saved.data ?? []).map((spot) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  saved={fav.isSpotSaved(spot.id)}
                  onToggleSave={(id) => void fav.toggleSpot(id)}
                />
              ))}
              {(savedClubs.data ?? []).map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  saved={fav.isClubSaved(club.id)}
                  onToggleSave={(id) => void fav.toggleClub(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
      <dt className="text-xs uppercase tracking-widest text-faint">{label}</dt>
      <dd className="mt-1 font-display text-2xl tabular-nums text-fg">{value}</dd>
    </div>
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
