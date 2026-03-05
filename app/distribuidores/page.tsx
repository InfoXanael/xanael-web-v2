import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribuidores - Xanael",
  description: "Unete a la red de distribuidores de Xanael.",
};

export default function DistribuidoresPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold text-xanael-dark tracking-tight">
          Distribuidores
        </h1>
        <p className="mt-6 text-lg text-xanael-text/80 max-w-2xl">
          Contenido de distribuidores pendiente de desarrollar.
        </p>
      </div>
    </div>
  );
}
