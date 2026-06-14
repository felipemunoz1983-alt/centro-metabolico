import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark";
}

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Native logo asset is 840×531 (aspect ratio ≈ 1.58:1).
const LOGO_W = 840;
const LOGO_H = 531;

const heights = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function BrandLogo({ size = "md", variant = "full" }: BrandLogoProps) {
  const h = heights[size];
  const w = Math.round((LOGO_W / LOGO_H) * h);

  return (
    <Image
      src={`${BP}/logo-cm.png`}
      alt="Centro Metabólico"
      width={variant === "mark" ? h : w}
      height={h}
      style={{
        height: `${h}px`,
        width: "auto",
        objectFit: "contain",
        // 'mark' variant focuses on the C|M glyph — crop out the wordmark.
        ...(variant === "mark"
          ? { objectPosition: "center top", clipPath: "inset(0 0 28% 0)" }
          : {}),
      }}
      priority
    />
  );
}
