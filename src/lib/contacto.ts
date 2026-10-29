/**
 * Destinos de los CTA de entrenamiento.
 *
 * Antes todos apuntaban a `/reservar?cat=Entrenamiento`, la pantalla que vende
 * las bolsas de créditos. Como el sitio pasó a planes por compromiso, esas
 * bolsas se retiran del catálogo y esa pantalla queda vacía: hay que separar
 * las dos intenciones que el botón "Agendar" mezclaba.
 *
 *   · Quien todavía no es alumno quiere un PLAN  → compra online con Webpay, y
 *     WhatsApp queda como salida secundaria para quien prefiera conversarlo.
 *   · Quien ya tiene plan quiere RESERVAR CLASE  → /clases, su área privada.
 */

export const WHATSAPP = "https://wa.me/56991377915";

/** Área "Mis clases" del SaaS: login del paciente y reserva con sus créditos. */
export const CLASES_URL =
  "https://centro-metabolico-agendamiento.vercel.app/clases";

/** WhatsApp con la disciplina ya escrita, para que nadie tenga que explicarla. */
export function waPlan(disciplina: string): string {
  const texto = `Hola, quiero empezar ${disciplina}. ¿Me cuentas los planes?`;
  return `${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

/** Base del SaaS, para armar enlaces sin repetir el dominio. */
const SAAS = "https://centro-metabolico-agendamiento.vercel.app";

export type CompromisoSlug = "mensual" | "trimestral" | "semestral" | "anual";

/**
 * Compra directa de UN plan, con Webpay.
 *
 * Abre la pantalla de compra del SaaS ya filtrada a ese plan, así nadie tiene
 * que volver a elegir entre doce. El identificador es compromiso + clases al
 * mes: por número de créditos sería ambiguo, porque el Mensual de 12 clases y
 * el Trimestral de 4 otorgan ambos 12 créditos y cuestan $80.000 y $139.500.
 *
 * Se cobra el PERÍODO COMPLETO por adelantado: Webpay Plus no tiene suscripción
 * ni débito automático, así que un trimestral son los tres meses de una vez.
 */
export function comprarPlan(compromiso: CompromisoSlug, clasesMes: number): string {
  return `${SAAS}/reservar?cat=Entrenamiento&plan=${compromiso}-${clasesMes}`;
}
