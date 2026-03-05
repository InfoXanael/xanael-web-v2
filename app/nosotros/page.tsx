import { Metadata } from "next";
import NosotrosPage from "@/components/nosotros/NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros - Xanael",
  description: "Conoce la historia, el equipo y la innovación detrás de XANAEL.",
};

export default function Page() {
  return <NosotrosPage />;
}
