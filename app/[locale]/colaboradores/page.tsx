import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import ColaboradoresPage from "@/components/colaboradores/ColaboradoresPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Colaboradores - Xanael",
    description:
      "Únete a la red de colaboradores de Xanael. Instala, distribuye o representa XANAEL en tu territorio.",
    alternates: buildAlternates(locale, "/colaboradores"),
  };
}

export default function Page() {
  return <ColaboradoresPage />;
}
