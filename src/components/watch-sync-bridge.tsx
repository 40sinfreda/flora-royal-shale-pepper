import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listWatchLinks } from "@/lib/tideline/api";
import { isUnauthorized } from "@/lib/tideline/use-load";
import { useT } from "@/lib/tideline/place-store";
import {
  isWatchSource,
  markSessionPull,
  pullAndImport,
  shouldSessionPull,
} from "@/lib/tideline/watch-sync";

/** Pulls linked watch feeds when the swimmer opens the club. Silent if nothing new. */
export function WatchSyncBridge() {
  const { user, isPending } = useCurrentUserState();
  const t = useT();
  const running = useRef(false);

  useEffect(() => {
    if (isPending || !user) return;
    if (running.current) return;
    if (!shouldSessionPull(user.id)) return;
    running.current = true;

    void (async () => {
      try {
        const links = await listWatchLinks();
        const sources = links.map((l) => l.source).filter(isWatchSource);
        if (!sources.length) {
          running.current = false;
          return;
        }
        markSessionPull(user.id);
        const summary = await pullAndImport(sources);
        if (summary.ok === 1) toast(t("toast.pulledOne"));
        else if (summary.ok > 1) toast(t("toast.pulled", { n: summary.ok }));
      } catch (err) {
        running.current = false;
        if (isUnauthorized(err)) return;
      }
    })();
  }, [user?.id, isPending, t]);

  return null;
}
