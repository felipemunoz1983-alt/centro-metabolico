import type { Metadata } from "next";
import { EnergySection } from "@/components/sections/EnergySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

const BASE_PATH = "/centro-metabolico";

export const metadata: Metadata = {
  title: {
    absolute: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
  },
  alternates: {
    canonical: `${BASE_PATH}/`,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${BASE_PATH}/`,
    siteName: "Centro Metabólico",
    title: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
    description:
      "Evaluaciones metabólicas avanzadas, nutrición de precisión y entrenamiento personalizado en Santiago, Chile.",
    images: [{ url: `${BASE_PATH}/energy.webp`, width: 1200, height: 630, alt: "Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
    description:
      "Evaluaciones metabólicas avanzadas, nutrición de precisión y entrenamiento personalizado en Santiago.",
    images: [`${BASE_PATH}/energy.webp`],
  },
};

export default function Home() {
  return (
    <>
      <main>
        <EnergySection />
        <ServicesSection />
        <MethodologySection />
        <StatsSection />
        <TeamSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
