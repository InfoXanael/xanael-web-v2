"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies_accepted");
    if (!accepted) setVisible(true);
  }, []);

  function accept(value: string) {
    localStorage.setItem("cookies_accepted", value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#2D6A4F] bg-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-[#1A1A1A] flex-1">
          🍪 Esta web utiliza cookies para mejorar tu experiencia de navegación.
          Al continuar, aceptas su uso.{" "}
          <Link href="/cookies" className="text-[#2D6A4F] underline">
            Más información
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => accept("all")}
            className="px-4 py-2 bg-[#2D6A4F] text-white text-sm font-medium rounded-md hover:bg-[#245a42] transition-colors"
          >
            Aceptar todas
          </button>
          <button
            onClick={() => accept("essential")}
            className="px-4 py-2 bg-gray-200 text-[#1A1A1A] text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            Solo necesarias
          </button>
        </div>
      </div>
    </div>
  );
}
