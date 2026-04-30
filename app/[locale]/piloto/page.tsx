import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import PilotoPage from "@/components/piloto/PilotoPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Zonas Piloto - Xanael",
    description:
      "Solicita incluir tu municipio en el programa piloto XANAEL de infraestructura urbana sanitaria preventiva. Sin coste inicial.",
    alternates: buildAlternates(locale, "/piloto"),
  };
}

export default function Page() {
  return <PilotoPage />;
}
