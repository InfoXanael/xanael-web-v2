import { getAllFormularios } from "@/lib/db-queries";
import FormulariosClient from "@/components/dashboard/FormulariosClient";

export default async function FormulariosPage() {
  const all = await getAllFormularios();
  return (
    <FormulariosClient
      allForms={{
        comercial: all.filter((f) => f.tipo === "comercial"),
        instalador: all.filter((f) => f.tipo === "instalador"),
        general: all.filter((f) => f.tipo === "general"),
        incidencia: all.filter((f) => f.tipo === "incidencia"),
      }}
    />
  );
}
