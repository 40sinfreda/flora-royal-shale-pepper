import { useEffect, type ReactNode } from "react";
import { usePlaceStore } from "@/lib/tideline/place-store";
import { getMyProfile, saveMyPlace } from "@/lib/tideline/api";
import { countryDef } from "@/lib/tideline/place";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { isUnauthorized } from "@/lib/tideline/use-load";

export function PlaceProvider({ children }: { children: ReactNode }) {
  const setHydrated = usePlaceStore((s) => s.setHydrated);
  const applyFromProfile = usePlaceStore((s) => s.applyFromProfile);
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    const persist = usePlaceStore.persist;
    const result = persist.rehydrate();
    void Promise.resolve(result).then(() => {
      usePlaceStore.getState().setHydrated();
    });
  }, [setHydrated]);

  useEffect(() => {
    if (isPending || !user) return;
    let alive = true;
    void getMyProfile()
      .then((profile) => {
        if (!alive) return;
        if (profile.country) {
          const def = countryDef(profile.country);
          applyFromProfile({
            country: profile.country,
            locale: profile.locale,
            placeScope: profile.placeScope,
            region: def?.region ?? null,
          });
        } else {
          const place = usePlaceStore.getState().place;
          const locale = usePlaceStore.getState().locale;
          if (place) {
            void saveMyPlace({
              data: {
                country: place.country,
                region: place.region,
                scope: place.scope,
                locale,
              },
            }).catch(() => undefined);
          }
        }
      })
      .catch((err) => {
        if (isUnauthorized(err)) return;
      });
    return () => {
      alive = false;
    };
  }, [user?.id, isPending, applyFromProfile]);

  return children;
}
