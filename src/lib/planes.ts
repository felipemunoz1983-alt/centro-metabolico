/**
 * Planes por compromiso — fuente única de precios del centro.
 *
 * Reemplaza al sistema de créditos (bolsa sin vencimiento). La lógica comercial:
 * el precio por clase baja con el volumen Y con la duración del compromiso, y
 * cada tramo suma beneficios que un gimnasio no puede igualar (InBody incluido,
 * nutricionista). Esa es la diferenciación: no competimos por precio de sala,
 * competimos por lo que medimos.
 *
 * Las dos palancas de apego están en los beneficios, no en el precio:
 *   · arrastre     → evita la culpa (y la fuga) del mes que se usó poco
 *   · precio fijo  → evita que vuelva a cotizar al año siguiente
 */

export type CompromisoId = "mensual" | "trimestral" | "semestral" | "anual";

export const VOLUMENES = [4, 8, 12] as const;
export type Volumen = (typeof VOLUMENES)[number];

export type Compromiso = {
  id: CompromisoId;
  label: string;
  meses: number;
  hint: string;
  destacado?: boolean;
  /** Beneficios que suma este tramo por sobre el anterior. */
  suma: string[];
  /**
   * Beneficios de tramos anteriores que este deja obsoletos. Sin esto, el
   * Anual heredaba "Arrastra hasta 2" y mostraba las dos versiones de la
   * misma promesa, contradiciendose.
   */
  reemplaza?: string[];
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
    suma: ["1 evaluación InBody por trimestre"],
  },
  {
    id: "semestral",
    label: "Semestral",
    meses: 6,
    hint: "6 meses",
    suma: [
      "InBody todos los meses",
      "Arrastra hasta 2 clases al mes siguiente",
    ],
    reemplaza: ["1 evaluación InBody por trimestre"],
  },
  {
    id: "anual",
    label: "Anual",
    meses: 12,
    hint: "12 meses · mejor precio",
    destacado: true,
    suma: [
      "Arrastra hasta 4 clases al mes siguiente",
      "Precio fijo garantizado por 12 meses",
    ],
    reemplaza: ["Arrastra hasta 2 clases al mes siguiente"],
  },
];

/**
 * Valor mensual en CLP. Todos los tramos se pagan mes a mes.
 *
 * El tramo Mensual son los precios de siempre (los de la bolsa de creditos:
 * 4 = $50.000, 8 = $70.000, 12 = $80.000), para que nadie que ya compra
 * sienta un alza. Sobre esa base baja la escala por compromiso:
 * Trimestral -7%, Semestral -13%, Anual -19%, redondeado a miles o medios
 * miles. El descuento crece con el plazo pero nunca de golpe: el salto
 * grande esta al final, que es donde queremos el compromiso.
 */
export const PRECIOS: Record<CompromisoId, Record<Volumen, number>> = {
  mensual:    { 4: 50000, 8: 70000, 12: 80000 },
  trimestral: { 4: 46500, 8: 65000, 12: 74000 },
  semestral:  { 4: 43500, 8: 61000, 12: 70000 },
  anual:      { 4: 40500, 8: 57000, 12: 65000 },
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
  const tramos = COMPROMISOS.slice(0, hasta + 1);
  const obsoletos = new Set(tramos.flatMap((c) => c.reemplaza ?? []));
  const out: string[] = [];
  for (const b of tramos.flatMap((c) => c.suma)) {
    if (obsoletos.has(b) || out.includes(b)) continue;
    out.push(b);
  }
  return out;
}

export const PLANES_FAQ = [
  {
    q: "¿Qué pasa si un mes no alcanzo a usar todas mis clases?",
    a: "Desde el plan Semestral arrastras hasta 2 clases al mes siguiente, y en el Anual hasta 4. No se pierde todo lo que no usaste: ese es el punto.",
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
    a: "Porque el compromiso largo nos permite planificar cupos y profesores. Ese ahorro te lo devolvemos en precio (hasta 19% menos por clase) y en evaluaciones incluidas.",
  },
  {
    q: "¿La evaluación InBody tiene costo extra?",
    a: "No. Viene incluida según tu plan. Por separado un InBody vale $15.000, así que en el plan Anual, con una evaluación mensual, son $180.000 al año que no pagas.",
  },
  {
    q: "¿Se cobra matrícula?",
    a: "No. No cobramos matrícula ni inscripción en ningún plan.",
  },
];
