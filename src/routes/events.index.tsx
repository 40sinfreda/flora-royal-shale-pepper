import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Page } from "@/components/shell";
import { GatheringCard } from "@/components/gathering-card";
import { SeaPhoto } from "@/components/sea-photo";
import { Button } from "@/components/ui/button";
import { listGatherings, listMyRsvpIds, toggleRsvp } from "@/lib/tideline/api";
import { isUnauthorized, useLoad } from "@/lib/tideline/use-load";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { usePlaceFilter, useT } from "@/lib/tideline/place-store";
import type { Gathering } from "@/lib/tideline/types";
import { SEA } from "@/lib/tideline/sea";

export const Route = createFileRoute("/events/")({
  component: EventsPage,
});

function EventsPage() {
  const t = useT();
  const filter = usePlaceFilter();
  const key = `${filter.country ?? ""}:${filter.region ?? ""}`;
  const { user, isPending } = useCurrentUserState();
  const gatherings = useLoad(() => listGatherings({ data: filter }), [key]);
  const itemsBase = gatherings.data ?? [];
  const rsvps = useLoad(async () => {
    if (isPending || !user) return [] as number[];
    try {
      return await listMyRsvpIds();
    } catch (err) {
      if (isUnauthorized(err)) return [];
      throw err;
    }
  }, [user?.id, isPending]);
  const [busyId, setBusyId] = useState<number | null>(null);

  const items: Gathering[] = itemsBase.map((event) => ({
    ...event,
    going: Boolean(rsvps.data?.includes(event.id)),
  }));

  async function onToggle(id: number) {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setBusyId(id);
    try {
      const res = await toggleRsvp({ data: id });
      toast(res.going ? t("toast.rsvpYes") : t("toast.rsvpNo"));
      rsvps.reload();
      gatherings.reload();
    } catch (err) {
      if (isUnauthorized(err)) window.location.href = "/login";
      else toast.error(t("toast.rsvpFail"));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            {t("events.kicker")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">
            {t("events.title")}
          </h1>
          <p className="mt-2 max-w-xl text-muted">{t("events.lead")}</p>
        </div>
        <Button asChild>
          <Link to="/events/new" search={{ spotId: undefined }}>
            {t("events.create")}
          </Link>
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((event) => (
          <GatheringCard
            key={event.id}
            event={event}
            busy={busyId === event.id}
            onToggle={onToggle}
          />
        ))}
      </div>
      {items.length === 0 && !gatherings.loading ? (
        <div className="mt-8 overflow-hidden rounded-xl">
          <div className="relative h-40">
            <SeaPhoto src={SEA.sunset} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
            <p className="absolute inset-x-5 bottom-5 text-sm text-fg">
              {t("events.empty")}{" "}
              <Link to="/events/new" search={{ spotId: undefined }} className="text-accent">
                {t("events.create")}
              </Link>
            </p>
          </div>
        </div>
      ) : null}
    </Page>
  );
}
