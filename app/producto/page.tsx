import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Producto - Xanael",
  description: "Conoce el sistema Xanael: bordillo tecnico con infraestructura sanitaria preventiva.",
};

export default function ProductoPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold text-xanael-dark tracking-tight">
          Producto
        </h1>
        <p className="mt-6 text-lg text-xanael-text/80 max-w-2xl">
          Contenido del producto pendiente de desarrollar.
        </p>
      </div>
    </div>
  );
}
