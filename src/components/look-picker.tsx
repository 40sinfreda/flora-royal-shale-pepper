import { cn } from "@/lib/utils";
import { LOOKS, type Look } from "@/lib/tideline/look";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";
import type { MessageKey } from "@/lib/i18n";

const SWATCH: Record<Look, string> = {
  night: "#06151c",
  bright: "#ff6b4a",
  day: "#f4f1e6",
};

const LABEL: Record<Look, MessageKey> = {
  night: "look.night",
  bright: "look.bright",
  day: "look.day",
};

export function LookDots({ className }: { className?: string }) {
  const t = useT();
  const look = usePlaceStore((s) => s.look);
  const setLook = usePlaceStore((s) => s.setLook);

  return (
    <div
      role="radiogroup"
      aria-label={t("look.label")}
      className={cn("flex items-center gap-1", className)}
    >
      {LOOKS.map((id) => {
        const on = look === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={t(LABEL[id])}
            title={t(LABEL[id])}
            onClick={() => setLook(id)}
            className={cn(
              "size-6 rounded-full transition-transform duration-150",
              on ? "scale-110 ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-80 hover:opacity-100",
            )}
            style={{
              background: SWATCH[id],
              boxShadow: "0 0 0 1px color-mix(in oklab, var(--tide-fg) 35%, transparent)",
            }}
          />
        );
      })}
    </div>
  );
}

export function LookChips({ className }: { className?: string }) {
  const t = useT();
  const look = usePlaceStore((s) => s.look);
  const setLook = usePlaceStore((s) => s.setLook);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="self-center text-xs uppercase tracking-widest text-fg/70">
        {t("look.label")}
      </span>
      {LOOKS.map((id) => {
        const on = look === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setLook(id)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-150",
              on ? "bg-accent text-accent-fg" : "bg-raised text-fg hover:bg-surface",
            )}
          >
            <span
              className="size-3.5 rounded-full"
              style={{
                background: SWATCH[id],
                boxShadow: "0 0 0 1px color-mix(in oklab, currentColor 40%, transparent)",
              }}
            />
            {t(LABEL[id])}
          </button>
        );
      })}
    </div>
  );
}
