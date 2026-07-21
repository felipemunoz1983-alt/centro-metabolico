"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "@/components/sections/Footer";

const BRAND = "#00AEEF";

/* ─────────────────────────────────────────────────────────────
   CONFIGURACIÓN DEL GOOGLE FORM
   1) Crea un Google Form con (al menos) un campo llamado "Clase"
      (respuesta corta) además de Nombre, Teléfono, etc.
   2) Pega aquí el enlace del formulario (botón "Enviar" → icono 🔗).
      Debe terminar en /viewform
   3) (Opcional, para pre-llenar la clase) En el Form: menú ⋮ →
      "Obtener enlace con datos precargados", escribe cualquier cosa
      en el campo Clase, copia el enlace y busca el "entry.XXXXXXXX"
      del campo Clase. Pégalo en ENTRY_CLASE (ej: "entry.123456789").
      Si lo dejas vacío, el botón igual abre el formulario (sin pre-llenar).
   ───────────────────────────────────────────────────────────── */
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/REEMPLAZA_CON_TU_FORM_ID/viewform";
const ENTRY_CLASE = ""; // ej: "entry.123456789"

function inscribirseHref(clase: string): string {
  if (!ENTRY_CLASE) return GOOGLE_FORM_URL;
  const sep = GOOGLE_FORM_URL.includes("?") ? "&" : "?";
  return `${GOOGLE_FORM_URL}${sep}usp=pp_url&${ENTRY_CLASE}=${encodeURIComponent(clase)}`;
}

type Sesion = { dia: string; hora: string };
type Programa = {
  id: string;
  tipo: string;
  sigla: string;
  tagline: string;
  descripcion: string;
  sesiones: Sesion[];
};

const PROGRAMAS: Programa[] = [
  {
    id: "funcional",
    tipo: "Entrenamiento Funcional",
    sigla: "DINAFIT",
    tagline: "Velocidad, coordinación y agilidad",
    descripcion:
      "Grupos reducidos (máximo 7 personas) con tecnología de luces de acción y reacción. Alta intensidad guiada, sesión a sesión.",
    sesiones: [
      { dia: "Lunes", hora: "19:00" },
      { dia: "Miércoles", hora: "19:00" },
      { dia: "Sábado", hora: "10:00" },
    ],
  },
  {
    id: "fuerza",
    tipo: "Entrenamiento de Fuerza",
    sigla: "IRONFIT",
    tagline: "Fuerza, potencia y composición corporal",
    descripcion:
      "Entrenamiento de fuerza en grupos reducidos con profesor en cada sesión y progresión registrada desde el primer día.",
    sesiones: [
      { dia: "Lunes", hora: "19:00" },
      { dia: "Martes", hora: "19:00" },
      { dia: "Miércoles", hora: "12:30" },
      { dia: "Miércoles", hora: "19:00" },
      { dia: "Sábado", hora: "19:00" },
      { dia: "Domingo", hora: "10:00" },
    ],
  },
];

function ProgramaCard({ prog, open, onToggle }: { prog: Programa; open: boolean; onToggle: () => void }) {
  return (
    <div
      className="overflow-hidden rounded-3xl"
      style={{
        backgroundColor: "rgba(0,174,239,0.05)",
        border: open ? "1px solid rgba(0,174,239,0.4)" : "1px solid rgba(0,174,239,0.18)",
        boxShadow: open ? "0 0 40px rgba(0,174,239,0.12)" : "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Cabecera clicable */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8"
      >
        <div className="flex items-center gap-4">
          <span
            className="hidden shrink-0 rounded-2xl px-3 py-2 text-xs font-bold uppercase tracking-widest sm:inline-block"
            style={{ backgroundColor: "rgba(0,174,239,0.15)", color: BRAND, border: "1px solid rgba(0,174,239,0.35)" }}
          >
            {prog.sigla}
          </span>
          <div>
            <h2 className="text-2xl text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}>
              {prog.tipo}
            </h2>
            <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              {prog.tagline} · {prog.sesiones.length} horarios
            </p>
          </div>
        </div>
        <svg
          className="h-6 w-6 shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s", color: BRAND }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Contenido desplegable */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-8 sm:px-8">
              <p className="mb-6 max-w-[60ch] text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {prog.descripcion}
              </p>

              <ul className="space-y-3">
                {prog.sesiones.map((s) => {
                  const clase = `${prog.tipo} (${prog.sigla}) — ${s.dia} ${s.hora}`;
                  return (
                    <li
                      key={`${s.dia}-${s.hora}`}
                      className="flex flex-col gap-3 rounded-2xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold"
                          style={{ backgroundColor: "rgba(0,174,239,0.12)", color: BRAND }}
                        >
                          {s.hora}
                        </span>
                        <div>
                          <p className="text-base font-semibold text-white">{s.dia}</p>
                          <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>
                            {prog.sigla}
                          </p>
                        </div>
                      </div>
                      <a
                        href={inscribirseHref(clase)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all"
                        style={{ backgroundColor: BRAND }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = "0 0 24px rgba(0,174,239,0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Inscribirme →
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function InscripcionClient() {
  const [openId, setOpenId] = useState<string | null>("funcional");

  return (
    <>
      <main className="min-h-screen bg-[#0A0A0A] pb-24 pt-36 sm:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          {/* Encabezado */}
          <div className="mb-12 text-center">
            <span
              className="mb-5 inline-block rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: "rgba(0,174,239,0.15)", color: BRAND, border: "1px solid rgba(0,174,239,0.35)" }}
            >
              Inscripción de clases
            </span>
            <h1
              className="text-4xl text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: 1.05 }}
            >
              Anótate a tu <span style={{ color: BRAND }}>entrenamiento.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Elige tu tipo de entrenamiento, revisa los horarios disponibles e inscríbete en un clic.
              Cupos limitados por clase.
            </p>
          </div>

          {/* Acordeón por tipo de entrenamiento */}
          <div className="space-y-4">
            {PROGRAMAS.map((prog) => (
              <ProgramaCard
                key={prog.id}
                prog={prog}
                open={openId === prog.id}
                onToggle={() => setOpenId((cur) => (cur === prog.id ? null : prog.id))}
              />
            ))}
          </div>

          {/* Nota / contacto */}
          <div
            className="mt-10 rounded-2xl px-6 py-5 text-center text-sm"
            style={{ backgroundColor: "rgba(0,174,239,0.06)", border: "1px solid rgba(0,174,239,0.2)", color: "rgba(255,255,255,0.7)" }}
          >
            ¿Dudas con el horario o el cupo? Escríbenos por WhatsApp al{" "}
            <a
              href="https://wa.me/56991377915"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
              style={{ color: BRAND }}
            >
              +56 9 9137 7915
            </a>
            . Suárez Mujica 950, Ñuñoa.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
