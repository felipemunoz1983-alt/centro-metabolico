/**
 * Destinos de los CTA de entrenamiento.
 *
 * Antes todos apuntaban a `/reservar?cat=Entrenamiento`, la pantalla que vende
 * las bolsas de créditos. Como el sitio pasó a planes por compromiso, esas
 * bolsas se retiran del catálogo y esa pantalla queda vacía: hay que separar
 * las dos intenciones que el botón "Agendar" mezclaba.
 *
 *   · Quien todavía no es alumno quiere un PLAN  → WhatsApp (el SaaS no cobra
 *     planes recurrentes, así que el cierre es conversado).
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
