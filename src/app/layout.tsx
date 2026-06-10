import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/sections/Navbar";
import { AgendaModal } from "@/components/ui/AgendaModal";

const BASE_URL = "https://felipemunoz1983-alt.github.io";
const BASE_PATH = "/centro-metabolico";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-reto",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
    template: "%s | Centro Metabólico",
  },
  description:
    "Evaluaciones metabólicas avanzadas, nutrición de precisión y entrenamiento personalizado basado en evidencia científica. Agenda tu consulta en Santiago, Chile.",
  keywords: [
    "nutricionista",
    "nutricionista deportivo",
    "evaluación metabólica",
    "entrenamiento personalizado",
    "nutrición de precisión",
    "composición corporal",
    "InBody",
    "VO2 max",
    "reto 21 días",
    "consulta médica",
    "Santiago",
    "Chile",
    "centro metabólico",
  ],
  authors: [{ name: "Centro Metabólico" }],
  creator: "Centro Metabólico",
  publisher: "Centro Metabólico",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${BASE_PATH}/`,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${BASE_URL}${BASE_PATH}/`,
    siteName: "Centro Metabólico",
    title: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
    description:
      "Evaluaciones metabólicas avanzadas, nutrición de precisión y entrenamiento personalizado basado en evidencia científica.",
    images: [
      {
        url: `${BASE_PATH}/energy.webp`,
        width: 1200,
        height: 630,
        alt: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
    description:
      "Evaluaciones metabólicas avanzadas, nutrición de precisión y entrenamiento personalizado.",
    images: [`${BASE_PATH}/energy.webp`],
  },
  other: {
    "theme-color": "#00AEEF",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": `${BASE_URL}${BASE_PATH}/#organization`,
      name: "Centro Metabólico",
      url: `${BASE_URL}${BASE_PATH}/`,
      logo: `${BASE_URL}${BASE_PATH}/favicon.ico`,
      description:
        "Centro especializado en evaluación metabólica avanzada, nutrición de precisión, entrenamiento personalizado y medicina deportiva en Santiago, Chile.",
      telephone: "+56991377915",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Condes",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      areaServed: "Santiago, Chile",
      sameAs: [],
      openingHoursSpecification: [],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios Centro Metabólico",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Consulta Médica y Nutricional" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entrenamiento Personalizado" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Programa Metabólico" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reto 21 Días" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recovery" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}${BASE_PATH}/#website`,
      url: `${BASE_URL}${BASE_PATH}/`,
      name: "Centro Metabólico",
      publisher: { "@id": `${BASE_URL}${BASE_PATH}/#organization` },
      inLanguage: "es-CL",
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}${BASE_PATH}/#webpage`,
      url: `${BASE_URL}${BASE_PATH}/`,
      name: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
      isPartOf: { "@id": `${BASE_URL}${BASE_PATH}/#website` },
      about: { "@id": `${BASE_URL}${BASE_PATH}/#organization` },
      description:
        "Evaluaciones metabólicas avanzadas, nutrición de precisión y entrenamiento personalizado basado en evidencia científica.",
      inLanguage: "es-CL",
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}${BASE_PATH}/#valeska-vidal`,
      name: "Valeska Vidal",
      jobTitle: "Nutricionista Clínica y Deportiva",
      worksFor: { "@id": `${BASE_URL}${BASE_PATH}/#organization` },
      description:
        "Especialista en evaluación metabólica avanzada y nutrición de precisión con más de 8 años de experiencia.",
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}${BASE_PATH}/#felipe-munoz`,
      name: "Felipe Muñoz Zambrano",
      jobTitle: "Nutricionista Deportivo",
      worksFor: { "@id": `${BASE_URL}${BASE_PATH}/#organization` },
      description:
        "Nutricionista deportivo titulado de la Universidad Mayor con más de 15 años de experiencia clínica.",
    },
    {
      "@type": "Physician",
      "@id": `${BASE_URL}${BASE_PATH}/#barbara-plass`,
      name: "Dra. Bárbara Plass Villanueva",
      jobTitle: "Médico Cirujano · Nutrición Clínica",
      worksFor: { "@id": `${BASE_URL}${BASE_PATH}/#organization` },
      description:
        "Médico Cirujano egresada con distinción máxima de la Universidad del Desarrollo, cursando Magíster en Nutrición Humana en INTA.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${bebasNeue.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <AgendaModal />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
