"use client";

import { useState } from "react";
import {
  COMPROMISOS,
  PRECIOS,
  VOLUMENES,
  ahorroMensual,
  beneficios,
  clp,
  porClase,
  type CompromisoId,
  type Volumen,
} from "@/lib/planes";

const BRAND = "#00AEEF";

const t = {
  bg: "#ffffff",
  bgSoft: "#F0F9FF",
  border: "#E2E8F0",
  text: "#0F172A",
  textMid: "#475569",
  textMuted: "#94A3B8",
};

const WA = "https://wa.me/56991377915";

/** El SaaS aún no cobra planes recurrentes, así que el cierre es por WhatsApp
 *  con el plan ya escrito en el mensaje: el equipo no tiene que adivinar nada. */
function waHref(compromiso: string, vol: number, precio: number, disciplina?: string) {
  const texto =
    `Hola, quiero el plan ${compromiso} de ${vol} clases al mes` +
    (disciplina ? ` para ${disciplina}` : "") +
    ` (${clp(precio)} mensuales).`;
  return `${WA}?text=${encodeURIComponent(texto)}`;
}

export function PlanesPricing({
  disciplina,
  titulo = "Elige tu plan",
  bajada = "Mientras más largo el compromiso, menor el valor por clase y más evaluaciones incluidas.",
}: {
  /** Si viene, el mensaje de WhatsApp queda atado a esa disciplina. */
  disciplina?: string;
  titulo?: string;
  bajada?: string;
}) {
  const [vol, setVol] = useState<Volumen>(8);

  return (
    <section id="planes" className="px-6 py-16 md:px-10 md:py-24" style={{ backgroundColor: t.bgSoft }}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>
            Planes
          </p>
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ color: t.text, fontFamily: "var(--font-display)" }}
          >
            {titulo}
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-base" style={{ color: t.textMid }}>
            {bajada}
          </p>
        </div>

        {/* Selector de volumen: una sola decisión a la vez. Primero cuántas
            clases quiero; después, cuánto me conviene comprometerme. */}
        <div className="mb-3 flex justify-center">
          <div
            className="inline-flex flex-wrap justify-center gap-1 rounded-2xl p-1.5"
            style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}
          >
            {VOLUMENES.map((v) => {
              const on = v === vol;
              return (
                <button
                  key={v}
                  onClick={() => setVol(v)}
                  aria-pressed={on}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold transition-all sm:px-5"
                  style={{
                    backgroundColor: on ? t.text : "transparent",
                    color: on ? "#fff" : t.textMid,
                  }}
                >
                  {v} clases<span className="hidden sm:inline"> / mes</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mb-10 text-center text-sm" style={{ color: t.textMuted }}>
          Los valores son mensuales · No se cobra matrícula
        </p>

        {/* Columnas de compromiso */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMPROMISOS.map((c) => {
            const precio = PRECIOS[c.id][vol];
            const ahorro = ahorroMensual(c.id, vol);
            const destacado = !!c.destacado;
            return (
              <div
                key={c.id}
                className="relative flex flex-col rounded-3xl p-6"
                style={
                  destacado
                    ? { backgroundColor: t.text, boxShadow: "0 20px 50px rgba(0,0,0,0.18)" }
                    : { backgroundColor: t.bg, border: `1px solid ${t.border}` }
                }
              >
                {destacado && (
                  <span
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    Mejor valor
                  </span>
                )}

                <p
                  className="text-xl font-bold"
                  style={{ color: destacado ? "#fff" : t.text, fontFamily: "var(--font-display)" }}
                >
                  {c.label}
                </p>
                <p
                  className="mt-0.5 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: destacado ? "rgba(255,255,255,0.55)" : t.textMuted }}
                >
                  {c.hint}
                </p>

                <div className="mt-5 flex items-end gap-1.5">
                  <span
                    className="text-4xl font-extrabold leading-none"
                    style={{ color: destacado ? "#fff" : t.text }}
                  >
                    {clp(precio)}
                  </span>
                  <span
                    className="mb-0.5 text-sm"
                    style={{ color: destacado ? "rgba(255,255,255,0.6)" : t.textMuted }}
                  >
                    / mes
                  </span>
                </div>
                <p className="mt-1.5 text-sm" style={{ color: destacado ? "rgba(255,255,255,0.75)" : t.textMid }}>
                  {clp(porClase(c.id, vol))} por clase
                </p>

                <p className="mt-3 min-h-[1.5rem] text-sm font-bold" style={{ color: ahorro > 0 ? "#16A34A" : "transparent" }}>
                  {ahorro > 0 ? `Ahorras ${clp(ahorro)} al mes` : "·"}
                </p>

                <a
                  href={waHref(c.label, vol, precio, disciplina)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded-2xl py-3.5 text-center text-sm font-bold text-white transition-all"
                  style={{ backgroundColor: destacado ? BRAND : t.text }}
                >
                  Quiero que me contacten
                </a>

                <ul className="mt-6 space-y-2.5">
                  {beneficios(c.id).map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm leading-snug"
                      style={{ color: destacado ? "rgba(255,255,255,0.85)" : t.textMid }}
                    >
                      <span className="mt-0.5 shrink-0" style={{ color: BRAND }}>
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: t.textMuted }}>
          Todos los planes sirven para Pilates, Fuerza, Funcional e Híbrido. Combínalas como quieras.
        </p>
      </div>
    </section>
  );
}
