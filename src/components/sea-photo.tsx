import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SeaPhoto({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
      decoding="async"
    />
  );
}

export function SeaBackdrop({
  src,
  className,
  children,
  priority = false,
}: {
  src: string;
  className?: string;
  children: ReactNode;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
      <div className="sea-scrim pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}
