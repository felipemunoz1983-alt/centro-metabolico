import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar — Centro Metabólico",
  description: "Agenda tu consulta médica, nutricional o evaluación en Centro Metabólico.",
};

export default function AgendarPage() {
  return (
    <div style={{ backgroundColor: "#03080F", minHeight: "100vh" }}>

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
