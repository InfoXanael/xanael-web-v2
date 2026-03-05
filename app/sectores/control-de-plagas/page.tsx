import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control de Plagas - Xanael",
  description: "Solucion Xanael para empresas de control de plagas profesional.",
};

export default function ControlDePlagasPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold text-xanael-dark tracking-tight">
          Control de Plagas
        </h1>
        <p className="mt-6 text-lg text-xanael-text/80 max-w-2xl">
          Contenido de control de plagas pendiente de desarrollar.
        </p>
      </div>
    </div>
  );
}
