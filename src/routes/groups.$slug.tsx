import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Page } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  deleteClub,
  getClub,
  getMyClubAccess,
  joinClub,
  leaveClub,
  listClubMembers,
  listSpots,
  removeClubMember,
  updateClub,
} from "@/lib/tideline/api";
import { isWhatsappUrl } from "@/lib/tideline/place";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { useFavorites } from "@/lib/tideline/use-favorites";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { usePlaceFilter, usePlaceStore, useT } from "@/lib/tideline/place-store";
import { cn } from "@/lib/utils";
import { countryLabel } from "@/lib/i18n";
import { localizeSpotField } from "@/lib/i18n/spot-copy";

export const Route = createFileRoute("/groups/$slug")({
  loader: async ({ params }) => {
    try {
      return await getClub({ data: params.slug });
    } catch {
      return null;
    }
  },
  component: GroupPage,
});

function GroupPage() {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const loaded = Route.useLoaderData();
  const { slug } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const access = useLoad(async () => {
    if (isPending || !user) return null;
    try {
      return await getMyClubAccess({ data: slug });
    } catch (err) {
      if (isUnauthorized(err)) return null;
      throw err;
    }
  }, [slug, user?.id, isPending]);

  const club = access.data ?? loaded;
  const [busy, setBusy] = useState(false);
  const fav = useFavorites();
  const isSaved = Boolean(club && fav.isClubSaved(club.id));

  if (!loaded && !access.loading) {
    return (
      <Page>
        <h1 className="font-display text-3xl text-fg">{t("group.notFound")}</h1>
        <Link to="/groups" className="mt-4 inline-block text-accent">
          {t("group.back")}
        </Link>
      </Page>
    );
  }

  if (!club) {
    return (
      <Page>
        <Skeleton className="h-12 w-64" />
        <Skeleton className="mt-6 h-40 rounded-xl" />
      </Page>
    );
  }

  const clubId = club.id;

  async function onJoin() {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setBusy(true);
    try {
      await joinClub({ data: clubId });
      toast(t("toast.joined"));
      access.reload();
    } catch (err) {
      if (isUnauthorized(err)) window.location.href = "/login";
    } finally {
      setBusy(false);
    }
  }

  async function onLeave() {
    setBusy(true);
    try {
      await leaveClub({ data: clubId });
      toast(t("toast.left"));
      access.reload();
    } catch {
      toast.error(t("group.cannotLeave"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page>
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {countryLabel(locale, club.country)}
        {club.isAdmin ? ` · ${t("groups.youAdmin")}` : ""}
      </p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight text-fg">
            {club.name}
          </h1>
          {club.spotName && club.spotSlug ? (
            <p className="mt-2 text-muted">
              {t("group.homeWater")}:{" "}
              <Link
                to="/spots/$slug"
                params={{ slug: club.spotSlug }}
                className="text-accent hover:underline"
              >
                {localizeSpotField(locale, club.spotSlug, "name", club.spotName)}
              </Link>
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              if (club) void fav.toggleClub(club.id);
            }}
          >
            <Heart className={cn("size-4", isSaved && "fill-current")} />
            {isSaved ? t("fav.added") : t("fav.add")}
          </Button>
          {club.isMember && club.whatsappUrl ? (
            <Button asChild>
              <a href={club.whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                {t("groups.whatsapp")}
              </a>
            </Button>
          ) : null}
          {!club.isMember ? (
            <Button onClick={() => void onJoin()} disabled={busy}>
              {busy ? t("groups.joining") : t("groups.join")}
            </Button>
          ) : club.isAdmin ? null : (
            <Button variant="subtle" onClick={() => void onLeave()} disabled={busy}>
              {t("groups.leave")}
            </Button>
          )}
        </div>
      </div>
      {club.description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          {club.description}
        </p>
      ) : null}
      {club.isMember && !club.whatsappUrl ? (
        <p className="mt-4 text-sm text-faint">{t("groups.whatsappMissing")}</p>
      ) : null}

      {club.isAdmin ? (
        <AdminPanel
          club={club}
          onSaved={access.reload}
          onDeleted={() => void navigate({ to: "/groups" })}
        />
      ) : (
        <p className="mt-10 text-sm text-faint">{t("groups.onlyAdminManages")}</p>
      )}
    </Page>
  );
}

function AdminPanel({
  club,
  onSaved,
  onDeleted,
}: {
  club: NonNullable<Awaited<ReturnType<typeof getClub>>>;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const filter = usePlaceFilter();
  const spots = useLoad(() => listSpots({ data: filter }), [
    `${filter.country ?? ""}:${filter.region ?? ""}`,
  ]);
  const members = useLoad(() => listClubMembers({ data: club.id }), [club.id]);
  const [name, setName] = useState(club.name);
  const [description, setDescription] = useState(club.description);
  const [whatsappUrl, setWhatsappUrl] = useState(club.whatsappUrl ?? "");
  const [spotId, setSpotId] = useState(club.spotId ? String(club.spotId) : "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setName(club.name);
    setDescription(club.description);
    setWhatsappUrl(club.whatsappUrl ?? "");
    setSpotId(club.spotId ? String(club.spotId) : "");
  }, [club.id, club.name, club.description, club.whatsappUrl, club.spotId]);

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
        onSubmit={async (e) => {
          e.preventDefault();
          if (whatsappUrl && !isWhatsappUrl(whatsappUrl)) {
            toast.error(t("groupNew.badWa"));
            return;
          }
          setBusy(true);
          try {
            await updateClub({
              data: {
                clubId: club.id,
                name,
                description,
                whatsappUrl,
                spotId: spotId ? Number(spotId) : null,
              },
            });
            toast(t("toast.clubSaved"));
            onSaved();
          } catch {
            toast.error(t("toast.clubFail"));
          } finally {
            setBusy(false);
          }
        }}
      >
        <h2 className="font-display text-2xl text-fg">{t("group.manage")}</h2>
        <Field label={t("group.name")}>
          <Input required value={name} onChange={(e) => setName(e.target.value)} />
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
          <p className="text-xs text-faint">{t("group.whatsappHelp")}</p>
        </Field>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={busy}>
            {busy ? t("group.saving") : t("group.save")}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={async () => {
              setBusy(true);
              try {
                await deleteClub({ data: club.id });
                toast(t("toast.clubDeleted"));
                onDeleted();
              } catch {
                toast.error(t("toast.clubFail"));
                setBusy(false);
              }
            }}
          >
            {t("group.delete")}
          </Button>
        </div>
      </form>

      <div>
        <h2 className="font-display text-2xl text-fg">{t("group.members")}</h2>
        <ul className="mt-4 space-y-2">
          {(members.data ?? []).map((m) => (
            <li
              key={m.userId}
              className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
            >
              <span className="text-sm text-fg">
                {m.displayName}
                {m.isAdmin ? ` · ${t("groups.admin")}` : ""}
              </span>
              {!m.isAdmin ? (
                <button
                  type="button"
                  className="h-11 px-2 text-xs text-faint hover:text-danger"
                  onClick={async () => {
                    try {
                      await removeClubMember({
                        data: { clubId: club.id, userId: m.userId },
                      });
                      members.reload();
                      onSaved();
                    } catch {
                      toast.error(t("toast.clubFail"));
                    }
                  }}
                >
                  {t("group.remove")}
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
