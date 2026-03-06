import { Metadata } from "next";
import SolucionesPage from "@/components/soluciones/SolucionesPage";

export const metadata: Metadata = {
  title: "Soluciones - Xanael",
  description:
    "Bordillo técnico antirroedores. Infraestructura prefabricada de hormigón integrada en el viario urbano.",
};

export default function Page() {
  return <SolucionesPage />;
}
