"use client";

import dynamic from "next/dynamic";

const HorizonHero = dynamic(
  () => import("@/components/ui/horizon-hero-section").then((m) => m.Component),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--brand)",
            animation: "pulse-dot 1.5s ease-in-out infinite",
          }}
        />
      </div>
    ),
  }
);

export function HorizonHeroWrapper() {
  return <HorizonHero />;
}
