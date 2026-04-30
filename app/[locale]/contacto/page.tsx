import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import ContactPage from "@/components/contacto/ContactPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Contacto - Xanael",
    description: "Contacta con Xanael para más información sobre nuestras soluciones.",
    alternates: buildAlternates(locale, "/contacto"),
  };
}

export default function ContactoPage() {
  return <ContactPage />;
}
