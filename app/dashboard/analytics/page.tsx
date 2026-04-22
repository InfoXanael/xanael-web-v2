import { getDossierStats } from "@/lib/db-queries";
import { FileDown, Globe } from "lucide-react";

const COUNTRY_NAMES: Record<string, string> = {
  ES: "España", FR: "Francia", DE: "Alemania", IT: "Italia",
  PT: "Portugal", GB: "Reino Unido", US: "Estados Unidos",
  MX: "México", AR: "Argentina", CL: "Chile", CO: "Colombia",
  NL: "Países Bajos", BE: "Bélgica", CH: "Suiza", BR: "Brasil",
};

const FLAG: Record<string, string> = {
  ES: "🇪🇸", FR: "🇫🇷", DE: "🇩🇪", IT: "🇮🇹", PT: "🇵🇹",
  GB: "🇬🇧", US: "🇺🇸", MX: "🇲🇽", AR: "🇦🇷", CL: "🇨🇱",
  CO: "🇨🇴", NL: "🇳🇱", BE: "🇧🇪", CH: "🇨🇭", BR: "🇧🇷",
};

export default async function AnalyticsPage() {
  const stats = await getDossierStats();

  const esCount = stats.byLocale.find((l) => l.locale === "es")?.count ?? 0;
  const enCount = stats.byLocale.find((l) => l.locale === "en")?.count ?? 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Analytics</h1>
      <p className="text-sm text-gray-500 mb-6">Datos en tiempo real de xanael.es</p>

      {/* Dossier stats card */}
      <div className="bg-white border border-gray-200 rounded-md p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FileDown className="w-4 h-4 text-[#2D6A4F]" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-[#1A1A1A]">Descargas del dossier corporativo</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <div>
            <p className="text-2xl font-bold text-[#2D6A4F]">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total descargas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#2D6A4F]">{stats.unique}</p>
            <p className="text-xs text-gray-500 mt-0.5">Visitantes únicos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#2D6A4F]">{esCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Versión ES</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#2D6A4F]">{enCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Versión EN</p>
          </div>
        </div>

        {stats.byCountry.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Globe className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Por país</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.byCountry.map((c) => (
                <div
                  key={c.country}
                  className="flex items-center gap-1.5 bg-[#F0F4F2] rounded px-2.5 py-1.5"
                >
                  {FLAG[c.country] && (
                    <span className="text-sm">{FLAG[c.country]}</span>
                  )}
                  <span className="text-xs text-[#1A1A1A]">
                    {COUNTRY_NAMES[c.country] ?? c.country}
                  </span>
                  <span className="text-xs font-semibold text-[#2D6A4F]">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {stats.total === 0 && (
          <p className="text-xs text-gray-400 italic">
            Aún no hay descargas registradas. Se empezarán a contar desde el próximo deploy.
          </p>
        )}
      </div>

      {/* Plausible embed */}
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <iframe
          plausible-embed=""
          src="https://analytics.xanael.es/share/xanael.es?auth=4SOjY56Mn9STP3tIQ6DVF&embed=true&theme=light"
          scrolling="no"
          frameBorder={0}
          loading="lazy"
          style={{ width: "1px", minWidth: "100%", height: "1600px" }}
        />
      </div>
      <script async src="https://analytics.xanael.es/js/embed.host.js" />
    </div>
  );
}
