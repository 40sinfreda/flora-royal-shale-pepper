export function TideRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 12"
      fill="none"
      aria-hidden
      className={`h-3 w-full text-accent/70 ${className}`}
    >
      <path
        d="M0 7 C 20 7, 28 3, 48 3 S 76 11, 96 11 124 3, 144 3 172 11, 192 11 220 3, 240 3 268 11, 288 11 308 7, 320 7"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
