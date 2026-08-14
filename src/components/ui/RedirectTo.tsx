"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RedirectTo({ to, label }: { to: string; label: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 1.5rem",
        textAlign: "center",
        backgroundColor: "var(--bg)",
      }}
    >
      <p style={{ color: "rgba(200,230,255,0.7)", fontSize: "0.95rem" }}>
        Esta página se movió. Redirigiendo a{" "}
        <Link href={to} style={{ color: "var(--brand)", fontWeight: 600 }}>
          {label}
        </Link>
        …
      </p>
    </main>
  );
}
