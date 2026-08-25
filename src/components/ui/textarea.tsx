import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-24 w-full rounded-lg bg-raised px-3 py-2.5 text-sm text-fg placeholder:text-faint",
      "shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent)]",
      "transition-[box-shadow] duration-150 ease-out",
      "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-accent)]",
      "disabled:opacity-40",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
