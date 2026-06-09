import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import SurfaceSection from "@/components/home/SurfaceSection";
import ProductSection from "@/components/home/ProductSection";
// import DossierDownload from "@/components/home/DossierDownload";
import NewsSection from "@/components/home/NewsSection";
import PartnerCard from "@/components/home/PartnerCard";
import Newsletter from "@/components/home/Newsletter";
import ManifestoSection from "@/components/home/ManifestoSection";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Xanael - Infraestructura Urbana Sanitaria Preventiva",
    description:
      "Infraestructura urbana sanitaria preventiva que prepara la ciudad frente a plagas en superficie. Prevén, monitoriza y actúa de forma segura y sostenible.",
    alternates: buildAlternates(locale, ""),
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es XANAEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "XANAEL es una infraestructura urbana sanitaria preventiva: un bordillo técnico prefabricado de hormigón con cavidad interior que se integra en el viario urbano para controlar de forma permanente la presencia de roedores y plagas en superficie.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo funciona el bordillo técnico de XANAEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El bordillo XANAEL incorpora una cavidad interior accesible que permite instalar cebos, trampas o sensores de monitorización. Al estar integrado en el bordillo del viario, actúa de forma continua y discreta sin alterar la estética del espacio público.",
      },
    },
    {
      "@type": "Question",
      name: "¿Para quién está diseñado XANAEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "XANAEL está dirigido a ayuntamientos, gestores municipales, empresas de control de plagas y promotores de obra urbana que necesiten soluciones preventivas integradas en la propia infraestructura de la ciudad.",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué se diferencia XANAEL del control de plagas tradicional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A diferencia del control de plagas reactivo, XANAEL es una solución preventiva y permanente integrada en el mobiliario urbano. No requiere intervenciones puntuales visibles y permite la monitorización continua del perímetro urbano sin alterar la vía pública.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde está disponible XANAEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "XANAEL opera desde Tudela (Navarra), España, y está disponible para ayuntamientos y entidades de toda España. Para distribución internacional, contacta con info@xanael.es.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <FeaturesStrip />
      <SurfaceSection />
      <ProductSection />
      {/* <DossierDownload /> */}
      <NewsSection />
      <PartnerCard />
      <ManifestoSection />
      <Newsletter />
    </>
  );
}
