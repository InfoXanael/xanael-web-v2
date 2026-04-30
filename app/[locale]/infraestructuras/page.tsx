import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import SolucionesPage from "@/components/soluciones/SolucionesPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Infraestructuras - Xanael",
    description:
      "Bordillo técnico antirroedores. Infraestructura prefabricada de hormigón integrada en el viario urbano.",
    alternates: buildAlternates(locale, "/infraestructuras"),
  };
}

export default function Page() {
  return <SolucionesPage />;
}
