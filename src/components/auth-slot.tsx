import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { initials } from "@/lib/tideline/format";
import { useT } from "@/lib/tideline/place-store";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  const [signingOut, setSigningOut] = useState(false);
  const t = useT();

  if (isPending) {
    return <div className="h-11 w-24 animate-pulse rounded-md bg-raised" />;
  }

  if (!user) {
    return (
      <Button asChild size="md" variant="primary">
        <Link to="/login">{t("auth.signIn")}</Link>
      </Button>
    );
  }

  const label = user.displayName ?? user.primaryEmail ?? "Account";

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/profile"
        className="flex h-11 items-center gap-2 rounded-md px-1.5 hover:bg-raised"
      >
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt=""
            className="size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
        ) : (
          <span className="grid size-8 place-items-center rounded-full bg-raised text-xs font-medium text-accent">
            {initials(label)}
          </span>
        )}
        <span className="hidden max-w-32 truncate text-sm text-fg sm:inline">
          {label}
        </span>
      </Link>
      <button
        type="button"
        disabled={signingOut}
        onClick={() => {
          setSigningOut(true);
          void signOut().catch(() => setSigningOut(false));
        }}
        className="hidden h-11 px-2 text-sm text-muted hover:text-fg sm:inline disabled:cursor-wait"
      >
        {signingOut ? t("auth.signingOut") : t("auth.signOut")}
      </button>
    </div>
  );
}
