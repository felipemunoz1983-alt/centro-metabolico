import { ReactNode } from "react";

interface EyebrowBadgeProps {
  children: ReactNode;
  dot?: boolean;
}

export function EyebrowBadge({ children, dot = true }: EyebrowBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm"
      style={{
        border: "1px solid rgba(0,174,239,0.25)",
        backgroundColor: "rgba(0,174,239,0.08)",
      }}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
          style={{ backgroundColor: "var(--brand)" }}
        />
      )}
      <span
        className="text-[11px] font-medium tracking-widest uppercase"
        style={{ color: "var(--brand-light)" }}
      >
        {children}
      </span>
    </span>
  );
}
