"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const TIPOS = [
  "sensor_pir", "camara", "trampa_mecanica", "trampa_co2", "cebo_inteligente",
  "sensor_temperatura", "sensor_humedad", "telemetria", "otro",
];

export function DispositivosFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`?${params.toString()}`));
  }

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <select
        defaultValue={searchParams.get("tipo") ?? ""}
        onChange={(e) => setFilter("tipo", e.target.value)}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] bg-white"
      >
        <option value="">Todos los tipos</option>
        {TIPOS.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
      </select>
      <select
        defaultValue={searchParams.get("estado") ?? ""}
        onChange={(e) => setFilter("estado", e.target.value)}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] bg-white"
      >
        <option value="">Todos los estados</option>
        <option value="activo">Activo</option>
        <option value="retirado">Retirado</option>
        <option value="averiado">Averiado</option>
        <option value="en_revision">En revisión</option>
      </select>
      {isPending && <span className="text-xs text-gray-400 self-center">Filtrando...</span>}
    </div>
  );
}
