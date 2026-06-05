import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agendar — Centro Metabólico",
  description: "Agenda tu consulta médica, nutricional o evaluación en Centro Metabólico.",
};

export default function AgendarPage() {
  return (
    <div style={{ backgroundColor: "#03080F", minHeight: "100vh" }}>

      {/* Navbar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
        style={{ backgroundColor: "rgba(3,8,15,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,174,239,0.1)" }}
      >
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-70">
          <span className="text-lg font-bold leading-none" style={{ color: "#00AEEF", fontFamily: "var(--font-display)" }}>C</span>
          <div className="h-5 w-px mx-[3px]" style={{ backgroundColor: "#00AEEF" }} />
          <span className="text-lg font-bold leading-none" style={{ color: "#00AEEF", fontFamily: "var(--font-display)" }}>M</span>
          <div className="ml-2 flex flex-col leading-none">
            <span className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color: "rgba(148,163,184,0.7)" }}>Centro</span>
            <span className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: "#00AEEF" }}>Metabólico</span>
          </div>
        </Link>
        <Link href="/" className="text-sm transition-colors" style={{ color: "rgba(148,163,184,0.7)" }}>
          ← Volver al inicio
        </Link>
      </header>

      {/* Hero */}
      <div className="px-6 py-12 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#00AEEF" }}>
          Reserva tu hora
        </p>
        <h1
          className="mb-3 text-4xl text-white md:text-5xl"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
        >
          Agenda tu consulta
        </h1>
        <p className="text-sm" style={{ color: "rgba(148,163,184,0.65)" }}>
          Selecciona el servicio y el horario que mejor se adapte a ti.
        </p>
      </div>

      {/* iframe container */}
      <div className="mx-auto px-4 pb-16" style={{ maxWidth: "860px" }}>
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(0,174,239,0.15)", backgroundColor: "#ffffff" }}
        >
          <iframe
            src="https://agendapro.com/iframe/overview/51643841-fc06-42db-bcb5-78232dc5802a"
            width="100%"
            style={{ minHeight: "700px", border: "none", display: "block" }}
            scrolling="yes"
            title="Agendar en Centro Metabólico"
          />
        </div>
      </div>
    </div>
  );
}
