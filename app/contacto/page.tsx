import { Metadata } from "next";
import ContactPage from "@/components/contacto/ContactPage";

export const metadata: Metadata = {
  title: "Contacto - Xanael",
  description: "Contacta con Xanael para más información sobre nuestras soluciones.",
};

export default function ContactoPage() {
  return <ContactPage />;
}
