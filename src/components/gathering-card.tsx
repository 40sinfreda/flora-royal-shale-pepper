import { Link } from "@tanstack/react-router";
import { MapPin, Users, Waves } from "lucide-react";
import type { Gathering } from "@/lib/tideline/types";
import { formatDateTime, formatKm, placeLine } from "@/lib/tideline/format";
import { Button } from "@/components/ui/button";
import { SeaPhoto } from "@/components/sea-photo";
import { spotPhoto } from "@/lib/tideline/sea";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";
import { localizeEventField, localizeSpotField } from "@/lib/i18n/spot-copy";

export function GatheringCard({
  event,
  onToggle,
  busy,
}: {
  event: Gathering;
  onToggle?: (id: number) => void;
  busy?: boolean;
}) {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const spotName = localizeSpotField(locale, event.spotSlug, "name", event.spotName);
  const title = localizeEventField(locale, event.title, "title", event.title);
  const notes = localizeEventField(locale, event.title, "notes", event.notes ?? "");
  const organizer = localizeEventField(
    locale,
    event.title,
    "organizer",
    event.organizer,
  );

  return (
    <article className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="relative h-28">
        <SeaPhoto src={spotPhoto(event.spotSlug, "sea")} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          {formatDateTime(event.startsAt, locale)}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-fg">{title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-3.5" />
          <Link
            to="/spots/$slug"
            params={{ slug: event.spotSlug }}
            className="hover:text-fg"
          >
            {spotName}
          </Link>
          <span className="text-faint">
            · {placeLine(event.city, event.country, locale)}
          </span>
        </p>
        {notes ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{notes}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-faint">
            {event.distanceKm != null ? (
              <span className="inline-flex items-center gap-1">
                <Waves className="size-3.5" />
                {formatKm(event.distanceKm, locale)}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" />
              {t("gather.goingCount", { n: event.rsvpCount })}
            </span>
            <span>{organizer}</span>
          </div>
          {onToggle ? (
            <Button
              size="sm"
              variant={event.going ? "subtle" : "primary"}
              disabled={busy}
              onClick={() => onToggle(event.id)}
            >
              {event.going ? t("gather.leave") : t("gather.going")}
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
