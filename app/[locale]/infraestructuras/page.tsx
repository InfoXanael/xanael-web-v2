import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import SolucionesPage from "@/components/soluciones/SolucionesPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Infraestructuras - Xanael",
    description:
      "Bordillo técnico para el control de roedores. Infraestructura prefabricada de hormigón integrada en el viario urbano con cámara interior accesible.",
    alternates: buildAlternates(locale, "/infraestructuras"),
  };
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Bordillo Técnico XANAEL para Control de Roedores",
  description:
    "Bordillo técnico prefabricado de hormigón con cavidad interior diseñado para el control permanente de roedores y plagas en perímetros urbanos. Se integra en el viario urbano existente.",
  image: "https://xanael.es/images/infrastructure/standard_model/bordillo_1.webp",
  brand: {
    "@type": "Brand",
    name: "XANAEL",
  },
  category: "Infraestructura urbana sanitaria",
  manufacturer: {
    "@type": "Organization",
    name: "XANAEL",
    url: "https://xanael.es",
  },
  url: "https://xanael.es/es/infraestructuras",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <SolucionesPage />
    </>
  );
}
