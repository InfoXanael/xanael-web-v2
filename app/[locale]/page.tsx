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
    {
      "@type": "Question",
      name: "¿Necesita mantenimiento el bordillo XANAEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El mantenimiento consiste en revisiones periódicas de la cámara interior para reponer cebo, sustituir trampas o revisar sensores. En el Modelo Compact, la bandeja técnica es extraíble desde la parte superior sin herramientas especiales. El acceso está restringido mediante tornillos de llave única propietaria, de modo que solo los técnicos autorizados pueden abrir el bordillo. No se requieren obras ni intervención sobre el viario para las tareas de mantenimiento habituales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es compatible con sistemas IoT de monitorización?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. La cámara interior del bordillo XANAEL tiene espacio suficiente para alojar sensores de detección y dispositivos de transmisión de datos. Esto permite integrar XANAEL en sistemas de monitorización remota para la detección temprana de presencia de roedores sin necesidad de visitas físicas al punto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué normativa cumple el bordillo XANAEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La tapa de fundición de ambos modelos cumple la norma EN124 clase B125, estándar europeo para tapas de acceso en vías peatonales y zonas de tráfico ligero. El sistema está diseñado para ser compatible con los principios de la Gestión Integrada de Plagas (IPM) establecidos por la Directiva 2009/128/CE del Parlamento Europeo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto dura el bordillo XANAEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El cuerpo del bordillo es hormigón prefabricado, con la misma vida útil que cualquier elemento de urbanización estándar. La tapa es de fundición EN124 B125, material con durabilidad indefinida en condiciones normales de uso. No existen piezas de desgaste en el cuerpo del bordillo; el mantenimiento recurrente se centra en los elementos interiores —cebo, trampas o sensores— gestionados por los técnicos de plagas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Se puede instalar en calzada existente sin obras mayores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El bordillo XANAEL puede instalarse sustituyendo bordillos convencionales existentes en cualquier obra de reposición o mantenimiento del viario, sin necesidad de obras adicionales de gran envergadura. También puede incorporarse en nuevas urbanizaciones desde la fase de ejecución del viario.",
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
