import { type SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-11 w-full appearance-none rounded-md bg-raised bg-[length:12px] bg-no-repeat px-3 pe-9 text-sm text-fg [background-position:right_12px_center] rtl:[background-position:left_12px_center]",
      "shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent)]",
      "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-accent)]",
      "disabled:opacity-40",
      className,
    )}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%239AA8A4' d='M1 1.5 6 6.5 11 1.5'/></svg>\")",
    }}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
