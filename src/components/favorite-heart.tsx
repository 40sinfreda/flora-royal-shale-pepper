import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function FavoriteHeart({
  on,
  busy,
  onToggle,
  label,
  className,
}: {
  on: boolean;
  busy?: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={label}
      disabled={busy}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        "grid size-10 place-items-center rounded-full backdrop-blur-sm transition-colors duration-150",
        on ? "bg-accent/20 text-accent" : "bg-bg/70 text-fg hover:text-accent",
        className,
      )}
    >
      <Heart className={cn("size-4", on && "fill-current")} />
    </button>
  );
}
