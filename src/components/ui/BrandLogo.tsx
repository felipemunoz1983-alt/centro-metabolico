interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark";
}

export function BrandLogo({ size = "md", variant = "full" }: BrandLogoProps) {
  const markSizes = { sm: "text-xl", md: "text-2xl", lg: "text-4xl" };
  const subSizes = { sm: "text-[7px]", md: "text-[9px]", lg: "text-[13px]" };
  const barHeights = { sm: "h-5", md: "h-7", lg: "h-10" };

  if (variant === "mark") {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center">
          <span className={`${markSizes[size]} font-bold leading-none`} style={{ color: "var(--brand)" }}>
            C
          </span>
          <div className={`${barHeights[size]} w-px mx-1`} style={{ backgroundColor: "var(--brand)" }} />
          <span className={`${markSizes[size]} font-bold leading-none`} style={{ color: "var(--brand)" }}>
            M
          </span>
        </div>
        {variant === "mark" && (
          <span
            className={`${subSizes[size]} font-bold tracking-[0.15em] uppercase`}
            style={{ color: "var(--brand)" }}
          >
            CENTRO METABOLICO
          </span>
        )}
      </div>
    );
  }

  // Full horizontal variant for navbar
  return (
    <div className="flex items-center gap-2.5">
      {/* C|M mark */}
      <div className="flex items-center">
        <span className="text-lg font-bold leading-none" style={{ color: "var(--brand)", fontFamily: "var(--font-display)" }}>
          C
        </span>
        <div className="h-5 w-px mx-[3px]" style={{ backgroundColor: "var(--brand)" }} />
        <span className="text-lg font-bold leading-none" style={{ color: "var(--brand)", fontFamily: "var(--font-display)" }}>
          M
        </span>
      </div>
      {/* Wordmark */}
      <div className="flex flex-col -gap-0.5 leading-none">
        <span className="text-[10px] font-semibold tracking-[0.18em] text-sky-100/70 uppercase" style={{ fontFamily: "var(--font-display)" }}>
          Centro
        </span>
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: "var(--brand)", fontFamily: "var(--font-display)" }}>
          Metabólico
        </span>
      </div>
    </div>
  );
}
