import type { ReactNode } from "react";

export function Mark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" className="fill-ink" />
      <path
        d="M21.2 5.6 10.8 26.4"
        className="stroke-amber"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-md border border-line bg-raised px-1.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </kbd>
  );
}
