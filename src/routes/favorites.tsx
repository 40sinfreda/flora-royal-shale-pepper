import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";
import { SpotCard } from "@/components/spot-card";
import { ClubCard } from "@/components/club-card";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listSavedClubs, listSavedSpots } from "@/lib/tideline/api";
import { useFavorites } from "@/lib/tideline/use-favorites";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { useT } from "@/lib/tideline/place-store";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const t = useT();
  const { user, isPending } = useCurrentUserState();
  const fav = useFavorites();
  const spots = useLoad(async () => {
    if (isPending || !user) return [];
    try {
      return await listSavedSpots();
    } catch (err) {
      if (isUnauthorized(err)) return [];
      throw err;
    }
  }, [user?.id, isPending, fav.spotIds.join(",")]);
  const clubs = useLoad(async () => {
    if (isPending || !user) return [];
    try {
      return await listSavedClubs();
    } catch (err) {
      if (isUnauthorized(err)) return [];
      throw err;
    }
  }, [user?.id, isPending, fav.clubIds.join(",")]);

  if (isPending) {
    return (
      <Page>
        <Skeleton className="h-11 w-48" />
        <Skeleton className="mt-6 h-40 rounded-xl" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const beachItems = spots.data ?? [];
  const groupItems = clubs.data ?? [];

  return (
    <Page>
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {t("fav.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">
        {t("fav.title")}
      </h1>
      <p className="mt-2 max-w-xl text-muted">{t("fav.lead")}</p>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-fg">{t("fav.beaches")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {beachItems.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              saved
              onToggleSave={(id) => void fav.toggleSpot(id)}
            />
          ))}
        </div>
        {beachItems.length === 0 && !spots.loading ? (
          <p className="mt-4 text-sm text-muted">
            {t("fav.emptyBeaches")}{" "}
            <Link to="/spots" className="text-accent">
              {t("nav.spots")}
            </Link>
          </p>
        ) : null}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-fg">{t("fav.groups")}</h2>
        <div className="mt-4 flex flex-col gap-4">
          {groupItems.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              saved
              onToggleSave={(id) => void fav.toggleClub(id)}
            />
          ))}
        </div>
        {groupItems.length === 0 && !clubs.loading ? (
          <p className="mt-4 text-sm text-muted">
            {t("fav.emptyGroups")}{" "}
            <Link to="/groups" className="text-accent">
              {t("nav.groups")}
            </Link>
          </p>
        ) : null}
      </section>
    </Page>
  );
}
