import { Link } from "@tanstack/react-router";
import { MessageCircle, Users } from "lucide-react";
import type { Club } from "@/lib/tideline/types";
import { Button } from "@/components/ui/button";
import { FavoriteHeart } from "@/components/favorite-heart";
import { SeaPhoto } from "@/components/sea-photo";
import { useT } from "@/lib/tideline/place-store";
import { countryLabel } from "@/lib/i18n";
import { usePlaceStore } from "@/lib/tideline/place-store";
import { SEA, spotPhoto } from "@/lib/tideline/sea";

export function ClubCard({
  club,
  busy,
  saved = false,
  onJoin,
  onLeave,
  onToggleSave,
}: {
  club: Club;
  busy?: boolean;
  saved?: boolean;
  onJoin?: (id: number) => void;
  onLeave?: (id: number) => void;
  onToggleSave?: (id: number) => void;
}) {
  const t = useT();
  const locale = usePlaceStore((s) => s.locale);
  const photo = club.spotSlug ? spotPhoto(club.spotSlug, "sea") : SEA.swimmers;

  return (
    <article className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="relative h-24">
        <SeaPhoto src={photo} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        {onToggleSave ? (
          <FavoriteHeart
            on={saved}
            label={saved ? t("fav.added") : t("fav.add")}
            onToggle={() => onToggleSave(club.id)}
            className="absolute top-3 end-3 z-10"
          />
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              {countryLabel(locale, club.country)}
              {club.isAdmin ? ` · ${t("groups.admin")}` : ""}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-fg">
              <Link
                to="/groups/$slug"
                params={{ slug: club.slug }}
                className="hover:text-accent"
              >
                {club.name}
              </Link>
            </h3>
            {club.spotName && club.spotSlug ? (
              <p className="mt-1 text-sm text-muted">
                <Link
                  to="/spots/$slug"
                  params={{ slug: club.spotSlug }}
                  className="hover:text-fg"
                >
                  {club.spotName}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
        {club.description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{club.description}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-xs text-faint">
            <Users className="size-3.5" />
            {club.memberCount === 1
              ? t("groups.memberOne")
              : t("groups.members", { n: club.memberCount })}
          </span>
          <div className="flex flex-wrap gap-2">
            {club.isMember && club.whatsappUrl ? (
              <Button asChild size="sm" variant="outline">
                <a href={club.whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  {t("groups.whatsapp")}
                </a>
              </Button>
            ) : null}
            {onJoin && onLeave ? (
              club.isMember && !club.isAdmin ? (
                <Button
                  size="sm"
                  variant="subtle"
                  disabled={busy}
                  onClick={() => onLeave(club.id)}
                >
                  {t("groups.leave")}
                </Button>
              ) : club.isAdmin ? (
                <Button asChild size="sm" variant="subtle">
                  <Link to="/groups/$slug" params={{ slug: club.slug }}>
                    {t("group.manage")}
                  </Link>
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={busy}
                  onClick={() => onJoin(club.id)}
                >
                  {busy ? t("groups.joining") : t("groups.join")}
                </Button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
