import { getFormularios } from "@/lib/db-queries";
import FormulariosClient from "@/components/dashboard/FormulariosClient";

export default async function FormulariosPage() {
  const [comercial, instalador, general, incidencia] = await Promise.all([
    getFormularios("comercial"),
    getFormularios("instalador"),
    getFormularios("general"),
    getFormularios("incidencia"),
  ]);

  return (
    <FormulariosClient
      allForms={{ comercial, instalador, general, incidencia }}
    />
  );
}
