import { Metadata } from "next";
import ColaboradoresPage from "@/components/colaboradores/ColaboradoresPage";

export const metadata: Metadata = {
  title: "Colaboradores - Xanael",
  description: "Únete a la red de colaboradores de Xanael. Instala, distribuye o representa XANAEL en tu territorio.",
};

export default function Page() {
  return <ColaboradoresPage />;
}
