import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Page } from "@/components/shell";
import { ClubCard } from "@/components/club-card";
import { Button } from "@/components/ui/button";
import {
  joinClub,
  leaveClub,
  listClubs,
  listMyClubSlugs,
} from "@/lib/tideline/api";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { usePlaceFilter, useT } from "@/lib/tideline/place-store";
import { SEA } from "@/lib/tideline/sea";
import { SeaPhoto } from "@/components/sea-photo";

export const Route = createFileRoute("/groups/")({
  component: GroupsPage,
});

function GroupsPage() {
  const t = useT();
  const filter = usePlaceFilter();
  const key = `${filter.country ?? ""}:${filter.region ?? ""}`;
  const { user, isPending } = useCurrentUserState();
  const clubs = useLoad(() => listClubs({ data: filter }), [key]);
  const mine = useLoad(async () => {
    if (isPending || !user) return [] as string[];
    try {
      return await listMyClubSlugs();
    } catch (err) {
      if (isUnauthorized(err)) return [];
      throw err;
    }
  }, [user?.id, isPending]);
  const [busyId, setBusyId] = useState<number | null>(null);

  const items = (clubs.data ?? []).map((club) => ({
    ...club,
    isMember: club.isMember || Boolean(mine.data?.includes(club.slug)),
  }));

  async function onJoin(id: number) {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setBusyId(id);
    try {
      await joinClub({ data: id });
      toast(t("toast.joined"));
      clubs.reload();
      mine.reload();
    } catch (err) {
      if (isUnauthorized(err)) window.location.href = "/login";
      else toast.error(t("toast.clubFail"));
    } finally {
      setBusyId(null);
    }
  }

  async function onLeave(id: number) {
    setBusyId(id);
    try {
      await leaveClub({ data: id });
      toast(t("toast.left"));
      clubs.reload();
      mine.reload();
    } catch {
      toast.error(t("group.cannotLeave"));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            {t("groups.kicker")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">
            {t("groups.title")}
          </h1>
          <p className="mt-2 max-w-xl text-muted">{t("groups.lead")}</p>
        </div>
        <Button asChild>
          <Link to="/groups/new">{t("groups.create")}</Link>
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            busy={busyId === club.id}
            onJoin={onJoin}
            onLeave={onLeave}
          />
        ))}
      </div>
      {items.length === 0 && !clubs.loading ? (
        <div className="mt-8 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <div className="relative aspect-[16/7] min-h-40">
            <SeaPhoto src={SEA.swimmers} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
            <p className="absolute inset-x-5 bottom-5 text-start text-sm text-fg">
              {t("groups.empty")}
            </p>
          </div>
        </div>
      ) : null}
    </Page>
  );
}
