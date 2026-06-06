import type { Metadata } from "next";
import { RecoveryClient } from "./RecoveryClient";

export const metadata: Metadata = {
  title: "Recovery — Centro Metabólico",
  description: "Recuperación activa guiada para reducir fatiga, acelerar regeneración y optimizar tu rendimiento.",
};

export default function RecoveryPage() {
  return <RecoveryClient />;
}
