import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import NosotrosPage from "@/components/nosotros/NosotrosPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Nosotros - Xanael",
    description: "Conoce la historia, el equipo y la innovación detrás de XANAEL.",
    alternates: buildAlternates(locale, "/nosotros"),
  };
}

export default function Page() {
  return <NosotrosPage />;
}
