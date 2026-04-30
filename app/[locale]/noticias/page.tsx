import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import NoticiasPage from "@/components/noticias/NoticiasPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Noticias - Xanael",
    description: "Últimas novedades y noticias sobre Xanael.",
    alternates: buildAlternates(locale, "/noticias"),
  };
}

export default function Page() {
  return <NoticiasPage />;
}
