import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar Consulta",
  description:
    "Agenda tu consulta médica, nutricional o evaluación metabólica en Centro Metabólico. Selecciona el servicio y el horario que mejor se adapte a ti.",
  alternates: {
    canonical: "/centro-metabolico/agendar/",
  },
  openGraph: {
    title: "Agendar Consulta — Centro Metabólico",
    description:
      "Agenda tu consulta médica, nutricional o evaluación metabólica en Centro Metabólico.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/agendar/",
    images: [
      {
        url: "/centro-metabolico/energy.webp",
        width: 1200,
        height: 630,
        alt: "Agendar Consulta — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agendar Consulta — Centro Metabólico",
    description:
      "Agenda tu consulta médica, nutricional o evaluación metabólica.",
    images: ["/centro-metabolico/energy.webp"],
  },
};

export default function AgendarPage() {
  return (
    <div style={{ backgroundColor: "#03080F", minHeight: "100vh" }}>

      {/* Hero */}
      <div className="px-6 pt-24 pb-10 text-center">
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
            src="https://centro-metabolico-agendamiento.vercel.app/reservar"
            width="810"
            marginWidth={0}
            marginHeight={0}
            frameBorder={0}
            scrolling="yes"
            style={{ border: "none", display: "block", width: "100%", minHeight: "700px" }}
            title="Agendar en Centro Metabólico"
          />
        </div>
      </div>
    </div>
  );
}
