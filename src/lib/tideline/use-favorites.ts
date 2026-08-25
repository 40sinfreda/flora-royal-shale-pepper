import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  listSavedClubIds,
  listSavedSpotIds,
  toggleSaveClub,
  toggleSaveSpot,
} from "@/lib/tideline/api";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { useT } from "@/lib/tideline/place-store";

export function useFavorites() {
  const t = useT();
  const { user, isPending } = useCurrentUserState();
  const spots = useLoad(async () => {
    if (isPending || !user) return [] as number[];
    try {
      return await listSavedSpotIds();
    } catch (err) {
      if (isUnauthorized(err)) return [];
      throw err;
    }
  }, [user?.id, isPending]);
  const clubs = useLoad(async () => {
    if (isPending || !user) return [] as number[];
    try {
      return await listSavedClubIds();
    } catch (err) {
      if (isUnauthorized(err)) return [];
      throw err;
    }
  }, [user?.id, isPending]);

  function needAuth() {
    window.location.href = "/login";
  }

  async function toggleSpot(id: number) {
    if (!user) {
      needAuth();
      return;
    }
    try {
      const res = await toggleSaveSpot({ data: id });
      toast(res.saved ? t("toast.favSpot") : t("toast.unfavSpot"));
      spots.reload();
    } catch (err) {
      if (isUnauthorized(err)) needAuth();
      else toast.error(t("toast.saveFail"));
    }
  }

  async function toggleClub(id: number) {
    if (!user) {
      needAuth();
      return;
    }
    try {
      const res = await toggleSaveClub({ data: id });
      toast(res.saved ? t("toast.favClub") : t("toast.unfavClub"));
      clubs.reload();
    } catch (err) {
      if (isUnauthorized(err)) needAuth();
      else toast.error(t("toast.saveFail"));
    }
  }

  return {
    spotIds: spots.data ?? [],
    clubIds: clubs.data ?? [],
    isSpotSaved: (id: number) => Boolean(spots.data?.includes(id)),
    isClubSaved: (id: number) => Boolean(clubs.data?.includes(id)),
    toggleSpot,
    toggleClub,
    reloadSpots: spots.reload,
    reloadClubs: clubs.reload,
  };
}
