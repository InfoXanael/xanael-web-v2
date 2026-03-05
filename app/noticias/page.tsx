import { Metadata } from "next";
import NoticiasPage from "@/components/noticias/NoticiasPage";

export const metadata: Metadata = {
  title: "Noticias - Xanael",
  description: "Últimas novedades y noticias sobre Xanael.",
};

export default function Page() {
  return <NoticiasPage />;
}
