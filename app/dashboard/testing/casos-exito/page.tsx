import Link from "next/link";
import { Camera, MapPin, ChevronRight } from "lucide-react";
import { getCasosExito } from "@/lib/testing-queries";

function formatDate(d: Date | string) {
  return new Date(d as string).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function CasosExitoPage() {
  const sites = await getCasosExito();
  const casos = sites.filter((s) => s.fotos.length > 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A4A3A]">Casos de éxito</h1>
          <p className="text-sm text-gray-500 mt-0.5">Sitios con documentación fotográfica de resultados</p>
        </div>
      </div>

      {casos.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-md px-5 py-16 text-center">
          <Camera size={36} className="mx-auto text-gray-200 mb-3" />
          <p className="text-sm font-medium text-gray-500">No hay casos de éxito documentados</p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Sube fotos de tipo <strong className="font-medium text-gray-500">caso_exito</strong> desde el detalle de un sitio para que aparezcan aquí.
          </p>
          <Link href="/dashboard/testing/fotos/subir" className="mt-4 inline-block text-sm text-[#2D6A4F] hover:underline">
            Subir fotos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {casos.map((caso) => (
            <Link
              key={caso.id}
              href={`/dashboard/testing/sites/${caso.id}`}
              className="group bg-white border border-gray-200 rounded-md overflow-hidden hover:border-[#2D6A4F]/40 hover:shadow-sm transition-all"
            >
              {/* Galería */}
              <div className={`grid gap-0.5 h-44 ${caso.fotos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                {caso.fotos.slice(0, 4).map((foto, i) => (
                  <div
                    key={foto.id}
                    className={`relative bg-gray-100 overflow-hidden ${
                      caso.fotos.length === 1 ? "row-span-2" :
                      caso.fotos.length === 3 && i === 0 ? "row-span-2" : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto.url}
                      alt={foto.descripcion ?? "caso de éxito"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {i === 3 && caso.fotos.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-semibold">
                        +{caso.fotos.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-[#1A4A3A] truncate group-hover:text-[#2D6A4F] transition-colors">{caso.nombre}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <MapPin size={11} /> {caso.municipio}, {caso.provincia}
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-[#2D6A4F] flex-shrink-0 mt-0.5 transition-colors" />
                </div>
                {caso.descripcion && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{caso.descripcion}</p>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                  <span>{caso._count.dispositivos} dispositivos</span>
                  <span>{caso._count.mediciones} mediciones</span>
                  <span>Desde {formatDate(caso.fechaInicio)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
