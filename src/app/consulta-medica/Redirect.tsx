"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Redirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/asesoria#medica");
  }, [router]);

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
        <Link href="/asesoria#medica" style={{ color: "var(--brand)", fontWeight: 600 }}>
          Consulta Médica
        </Link>
        …
      </p>
    </main>
  );
}
