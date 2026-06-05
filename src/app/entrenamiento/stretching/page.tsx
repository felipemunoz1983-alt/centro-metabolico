import type { Metadata } from "next";
import { StretchingClient } from "./StretchingClient";

export const metadata: Metadata = {
  title: "Stretching FNP — Centro Metabólico",
  description: "Sesiones de stretching FNP en grupos reducidos. Flexibilidad real, reducción de tensión muscular y bienestar corporal duradero.",
};

export default function StretchingPage() {
  return <StretchingClient />;
}
