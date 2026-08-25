import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SeaPhoto } from "@/components/sea-photo";
import type { Spot } from "@/lib/tideline/types";
import {
  difficultyLabel,
  formatKm,
  formatTemp,
  localizedSpot,
  waterLabel,
} from "@/lib/tideline/format";
import { spotPhoto } from "@/lib/tideline/sea";
import { usePlaceStore } from "@/lib/tideline/place-store";
import { regionLabel, countryLabel } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SpotCard({
  spot,
  featured = false,
}: {
  spot: Spot;
  featured?: boolean;
}) {
  const locale = usePlaceStore((s) => s.locale);
  const s = localizedSpot(spot, locale);
  const photo = spotPhoto(spot.slug, spot.waterType);

  return (
    <Link
      to="/spots/$slug"
      params={{ slug: spot.slug }}
      className={cn(
        "group block overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[transform,background-color] duration-200 ease-out hover:bg-raised",
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "aspect-[16/8]" : "aspect-[16/9]")}>
        <SeaPhoto
          src={photo}
          alt=""
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
      </div>
      <div className={cn("p-5", featured && "p-6")}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              {regionLabel(locale, s.region)}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-fg">
              {s.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-3.5" />
              {s.city}, {countryLabel(locale, spot.country)}
            </p>
          </div>
          <Badge>{difficultyLabel(s.difficulty, locale)}</Badge>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {s.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-faint">
          <span>{waterLabel(s.waterType, locale)}</span>
          {s.typicalKm != null ? <span>· {formatKm(s.typicalKm, locale)}</span> : null}
          {s.typicalTempC != null ? <span>· {formatTemp(s.typicalTempC)}</span> : null}
        </div>
      </div>
    </Link>
  );
}
