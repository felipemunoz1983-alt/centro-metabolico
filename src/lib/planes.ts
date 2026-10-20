/**
 * Planes por compromiso — fuente única de precios del centro.
 *
 * Reemplaza al sistema de créditos (bolsa sin vencimiento). La lógica comercial:
 * el precio por clase baja con el volumen Y con la duración del compromiso, y
 * cada tramo suma beneficios clínicos que un gimnasio no puede igualar (InBody,
 * calorimetría, nutricionista). Esa es la diferenciación: no competimos por
 * precio de sala, competimos por lo que medimos.
 *
 * Las tres palancas de apego están en los beneficios, no en el precio:
 *   · congelamiento  → evita la baja cuando el socio se lesiona o viaja
 *   · arrastre       → evita la culpa (y la fuga) del mes que se usó poco
 *   · precio fijo    → evita que vuelva a cotizar al año siguiente
 */

export type CompromisoId = "mensual" | "trimestral" | "semestral" | "anual";

export const VOLUMENES = [4, 8, 12, 16] as const;
export type Volumen = (typeof VOLUMENES)[number];

export type Compromiso = {
  id: CompromisoId;
  label: string;
  meses: number;
  hint: string;
  destacado?: boolean;
  /** Beneficios que suma este tramo por sobre el anterior. */
  suma: string[];
};

export const COMPROMISOS: Compromiso[] = [
  {
    id: "mensual",
    label: "Mensual",
    meses: 1,
    hint: "Sin compromiso",
    suma: ["Todas las disciplinas incluidas", "Reserva online de cada clase"],
  },
  {
    id: "trimestral",
    label: "Trimestral",
    meses: 3,
    hint: "3 meses",
    suma: ["1 evaluación InBody por trimestre", "Congela hasta 1 semana"],
  },
  {
    id: "semestral",
    label: "Semestral",
    meses: 6,
    hint: "6 meses",
    suma: [
      "InBody todos los meses",
      "1 evaluación metabólica (calorimetría)",
      "Arrastra hasta 2 clases al mes siguiente",
      "Congela hasta 2 semanas",
    ],
  },
  {
    id: "anual",
    label: "Anual",
    meses: 12,
    hint: "12 meses · mejor precio",
    destacado: true,
    suma: [
      "InBody todos los meses",
      "2 evaluaciones metabólicas al año",
      "1 consulta nutricional por semestre",
      "Arrastra hasta 4 clases al mes siguiente",
      "Congela hasta 1 mes",
      "Precio fijo garantizado por 12 meses",
    ],
  },
];

/** Valor mensual en CLP. Todos los tramos se pagan mes a mes. */
export const PRECIOS: Record<CompromisoId, Record<Volumen, number>> = {
  mensual:    { 4: 44000, 8: 72000, 12: 92000, 16: 108000 },
  trimestral: { 4: 41000, 8: 67000, 12: 86000, 16: 101000 },
  semestral:  { 4: 38000, 8: 62000, 12: 80000, 16:  94000 },
  anual:      { 4: 35000, 8: 58000, 12: 75000, 16:  88000 },
};

export const clp = (n: number) => `$${n.toLocaleString("es-CL")}`;

/** Precio por clase, para mostrar el valor real de subir de tramo. */
export const porClase = (c: CompromisoId, v: Volumen) =>
  Math.round(PRECIOS[c][v] / v);

/** Ahorro mensual contra el plan Mensual del mismo volumen. */
export const ahorroMensual = (c: CompromisoId, v: Volumen) =>
  PRECIOS.mensual[v] - PRECIOS[c][v];

/** Beneficios acumulados hasta un tramo (cada tramo incluye los anteriores). */
export function beneficios(id: CompromisoId): string[] {
  const hasta = COMPROMISOS.findIndex((c) => c.id === id);
  return COMPROMISOS.slice(0, hasta + 1).flatMap((c) => c.suma);
}

export const PLANES_FAQ = [
  {
    q: "¿Qué pasa si un mes no alcanzo a usar todas mis clases?",
    a: "Desde el plan Semestral arrastras hasta 2 clases al mes siguiente, y en el Anual hasta 4. No se pierde todo lo que no usaste: ese es el punto.",
  },
  {
    q: "¿Puedo congelar mi plan si me lesiono o viajo?",
    a: "Sí. Trimestral congela hasta 1 semana, Semestral hasta 2 y Anual hasta 1 mes al año. El congelamiento corre la fecha de término, no se pierde.",
  },
  {
    q: "¿Puedo usar mis clases en cualquier disciplina?",
    a: "Sí. Tu plan sirve para Pilates, Fuerza, Funcional e Híbrido indistintamente. Combínalas como quieras dentro de tu cupo mensual.",
  },
  {
    q: "¿Hay un máximo de clases por semana?",
    a: "No. Distribuye tus clases del mes como te acomode, incluso varias en la misma semana. Tú defines el ritmo.",
  },
  {
    q: "¿Por qué el plan Anual es tan conveniente?",
    a: "Porque el compromiso largo nos permite planificar cupos y profesores. Ese ahorro te lo devolvemos en precio (hasta 20% menos por clase) y en evaluaciones incluidas.",
  },
  {
    q: "¿Las evaluaciones InBody y metabólicas tienen costo extra?",
    a: "No. Vienen incluidas según tu plan. Por separado, una evaluación metabólica vale $60.000 y un InBody $15.000: en el plan Anual eso solo ya supera los $300.000 al año.",
  },
  {
    q: "¿Se cobra matrícula?",
    a: "No. No cobramos matrícula ni inscripción en ningún plan.",
  },
];
