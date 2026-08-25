import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";
import { MARKS, type MarkId } from "@/lib/tideline/mark";
import type { MessageKey } from "@/lib/i18n";

type SvgProps = { className?: string };

function Waves({ y1 = 20, y2 = 24.4 }: { y1?: number; y2?: number }) {
  return (
    <>
      <path
        d={`M2 ${y1}c3.6-4 7.2-.2 10.8-.2s7.2-4.1 11-.1 4.4 2.2 6.4.2`}
        className="stroke-accent"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d={`M2 ${y2}c3.6-2.9 7.2.2 10.8.1s7.2-3 11 .1 4.4 1.8 6.4.15`}
        className="stroke-accent/45"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </>
  );
}

function MarkCrest({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="12.4" cy="9.4" r="5" className="fill-fg" />
      <path
        d="M8.1 7.3c.7-1.7 2.4-2.9 4.4-2.9 1.6 0 3 .7 3.9 1.8"
        className="stroke-accent"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M10.3 9.35h4.2"
        className="stroke-[color:var(--tide-bg)]"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M9.4 13.6c-1.8 1.7-3.4 3.8-4.2 6.1"
        className="stroke-fg"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M16.6 12.4c2.8.2 5.4 1.2 7.6 2.7"
        className="stroke-fg"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <circle cx="24.8" cy="15.35" r="1.15" className="fill-fg" />
      <Waves y1={19.6} y2={24.1} />
    </svg>
  );
}

function MarkPace({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <g className="stroke-fg" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20.6" cy="7.6" r="3.55" className="fill-fg stroke-none" />
        <path d="M17.8 10.6c-3.6 2-7.6 5-9.8 8.6" strokeWidth="3.15" />
        <path d="M18.4 10.8c3.6-.5 6.8-.7 9.6-.4" strokeWidth="2.05" />
        <circle cx="28.3" cy="10.45" r="1.05" className="fill-fg stroke-none" />
        <path d="M16.2 12.6c-.6 2.6-1 5.1.2 7.1" strokeWidth="1.9" />
        <path d="M8.2 18.8c-2.2-.2-4.1-1.1-5.6-2.2" strokeWidth="1.95" />
        <path d="M8.4 19.2c-1.3 2.2-1.8 4.4-.8 5.8" strokeWidth="1.9" />
      </g>
      <Waves y1={22.2} y2={26.4} />
    </svg>
  );
}

function MarkLane({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <ellipse
        cx="16"
        cy="21.2"
        rx="13"
        ry="6.1"
        className="stroke-accent/40"
        strokeWidth="1.2"
      />
      <ellipse
        cx="16"
        cy="21.2"
        rx="8.4"
        ry="3.7"
        className="stroke-accent/70"
        strokeWidth="1.15"
      />
      <g className="fill-fg">
        <circle cx="16.3" cy="6.1" r="3.15" />
        <path d="M17.4 8.5 26.6 4.9a1.2 1.2 0 0 1 1.15 2.15L18 10.6z" />
        <path d="M14.6 10.1 5.1 14.8a1.2 1.2 0 0 0 .75 2.2L15.8 12z" />
        <path d="M14.15 9.1c-.35 6.2.05 11.2 2.15 14.6 2.1-3.4 2.5-8.4 2.15-14.6-.85 1.1-3.45 1.1-4.3 0z" />
        <path d="M14.7 22.6 13 27.4 16.3 24.7 19.6 27.4 17.9 22.6z" />
      </g>
    </svg>
  );
}

function MarkRing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="16" r="13.2" className="stroke-accent" strokeWidth="1.7" />
      <circle cx="16" cy="16" r="10.6" className="stroke-accent/30" strokeWidth="0.9" />
      <g className="stroke-fg" strokeLinecap="round">
        <circle cx="17.6" cy="10.4" r="2.55" className="fill-fg stroke-none" />
        <path d="M15.6 12.6c-2.3 1.3-4.8 3.3-6.1 5.5" strokeWidth="2.2" />
        <path d="M16.1 12.7c2.3-.35 4.4-.5 6.3-.25" strokeWidth="1.55" />
        <path d="M9.7 17.8c-1.5 1.6-2.1 3.3-1.3 4.4" strokeWidth="1.45" />
      </g>
      <path
        d="M6.4 20.6c2.4-2.4 4.8 0 7.2 0s4.8-2.5 7.3 0 3 1.4 4.4.1"
        className="stroke-accent"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MarkHorizon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="10.2" r="5.1" className="fill-fg" />
      <path
        d="M12.2 8.2c.6-1.6 2.2-2.7 4-2.7 1.3 0 2.5.6 3.3 1.5"
        className="stroke-accent"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M1.8 18.2c4.6-7.2 9.4 1.2 14.2 1.2s9.6-8.6 14.2 1.2"
        className="stroke-accent"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M1.8 23.4c4.6-5.2 9.4 1 14.2.9s9.6-6.2 14.2 1"
        className="stroke-accent/40"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MarkCut({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M2 22.5c4.2-6.8 8.6 0 13.2 0s9-7.2 13.6 0"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 26.6c4.2-4.8 8.6.4 13.2.3s9-5.2 13.6.3"
        className="stroke-accent/40"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <g className="stroke-fg" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="21.4" cy="8.2" r="3.4" className="fill-fg stroke-none" />
        <path d="M19 11.2c-3.2 2.6-6.8 6.2-8.2 10.4" strokeWidth="3" />
        <path d="M19.6 11c2.8-2.2 5.6-3.6 8.4-4.2" strokeWidth="2" />
        <path d="M16.8 13.4c-1.2 2.4-1.6 5 .2 7" strokeWidth="1.85" />
        <path d="M11.2 20.8c-2.4 1.4-3.8 3.6-3.4 5.6" strokeWidth="1.85" />
      </g>
    </svg>
  );
}

const MARK_DRAW: Record<MarkId, (props: SvgProps) => ReactElement> = {
  crest: MarkCrest,
  pace: MarkPace,
  lane: MarkLane,
  ring: MarkRing,
  horizon: MarkHorizon,
  cut: MarkCut,
};

const MARK_LABEL: Record<MarkId, MessageKey> = {
  crest: "mark.crest",
  pace: "mark.pace",
  lane: "mark.lane",
  ring: "mark.ring",
  horizon: "mark.horizon",
  cut: "mark.cut",
};

export function TideMark({
  className,
  mark,
}: {
  className?: string;
  mark?: MarkId;
}) {
  const stored = usePlaceStore((s) => s.mark);
  const Draw = MARK_DRAW[mark ?? stored] ?? MarkCrest;
  return <Draw className={className} />;
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

export function MarkPicker({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const mark = usePlaceStore((s) => s.mark);
  const setMark = usePlaceStore((s) => s.setMark);

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-widest text-faint">{t("mark.label")}</p>
      <div className={cn("grid gap-2", compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3")}>
        {MARKS.map((id) => {
          const on = mark === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setMark(id)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl p-2.5 transition-colors",
                on ? "bg-raised ring-2 ring-accent" : "bg-bg hover:bg-raised",
              )}
            >
              <span className="grid size-14 place-items-center rounded-xl bg-surface shadow-[var(--shadow-border)]">
                <TideMark mark={id} className="size-11" />
              </span>
              <span className="text-[11px] text-muted">{t(MARK_LABEL[id])}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
