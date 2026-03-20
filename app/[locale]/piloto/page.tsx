import { Metadata } from "next";
import PilotoPage from "@/components/piloto/PilotoPage";

export const metadata: Metadata = {
  title: "Zonas Piloto - Xanael",
  description:
    "Solicita incluir tu municipio en el programa piloto XANAEL de infraestructura urbana sanitaria preventiva. Sin coste inicial.",
};

export default function Page() {
  return <PilotoPage />;
}
