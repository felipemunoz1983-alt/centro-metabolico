import type { Metadata } from "next";
import { RedirectTo } from "@/components/ui/RedirectTo";

export const metadata: Metadata = {
  title: "Recovery",
  description:
    "Recuperación activa: reducción de fatiga, regeneración muscular y optimización del rendimiento en Centro Metabólico.",
  alternates: { canonical: "/centro-metabolico/recovery/presoterapia/" },
  robots: { index: false, follow: true },
};

export default function RecoveryEntrenamientoRedirect() {
  return <RedirectTo to="/recovery/presoterapia" label="Presoterapia" />;
}
