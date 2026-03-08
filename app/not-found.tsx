import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F0F4F2] flex flex-col items-center justify-center px-4">
      <Image
        src="/images/logo/logo.svg"
        alt="XANAEL"
        width={160}
        height={48}
        className="mb-8"
      />
      <h1 className="text-6xl font-bold text-[#1A4A3A] mb-2">404</h1>
      <p className="text-lg text-[#1A1A1A] mb-6">Página no encontrada</p>
      <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[#2D6A4F] text-white text-sm font-medium rounded-md hover:bg-[#245a42] transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
