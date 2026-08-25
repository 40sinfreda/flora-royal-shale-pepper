import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/tideline/place-store";

export function TideMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="13.2" cy="9.1" r="4.35" className="fill-fg" />
      <path
        d="M10.2 12.6c-1.7 1.6-3.3 3.6-4.1 5.8"
        className="stroke-fg"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <path
        d="M16.6 11.8c2.5.15 4.9 1.05 6.9 2.45"
        className="stroke-fg"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <circle cx="24.1" cy="14.55" r="1.05" className="fill-fg" />
      <path
        d="M2 19.2c3.4-3.6 6.8-.15 10.2-.15s6.9-3.7 10.4-.1 4.2 2.1 6.2.2"
        className="stroke-accent"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M2 23.15c3.4-2.7 6.8.2 10.2.1s6.9-2.85 10.4.1 4.15 1.7 6.2.15"
        className="stroke-accent/45"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  const t = useT();
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5 text-fg", className)}
      aria-label={t("brand.home")}
    >
      <span className="grid size-10 place-items-center rounded-xl bg-raised shadow-[var(--shadow-border)] transition-transform duration-150 group-hover:scale-[1.04]">
        <TideMark className="size-8" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Tideline
      </span>
    </Link>
  );
}
