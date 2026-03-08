"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Layers,
  Megaphone,
  Mail,
  AlertCircle,
  ExternalLink,
  Send,
  Eye,
  MousePointerClick,
} from "lucide-react";

interface Segment {
  id: string;
  nombre: string;
  alias: string;
  contactos: number;
}

interface EmailEntry {
  id: string;
  nombre: string;
  asunto: string;
  publicado: boolean;
  enviados: number;
  leidos: number;
  tasaApertura: number;
  clics: number;
  fechaCreacion: string;
}

interface Campaign {
  id: string;
  nombre: string;
  publicada: boolean;
  contactos: number;
}

export default function MauticPage() {
  const [totalContactos, setTotalContactos] = useState<number | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [emails, setEmails] = useState<EmailEntry[]>([]);
  const [totalEmails, setTotalEmails] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [cRes, sRes, campRes, eRes] = await Promise.all([
          fetch("/api/mautic?tipo=contactos"),
          fetch("/api/mautic?tipo=segmentos"),
          fetch("/api/mautic?tipo=campanas"),
          fetch("/api/mautic?tipo=emails"),
        ]);

        if (!cRes.ok || !sRes.ok || !campRes.ok || !eRes.ok) {
          const errData = await (cRes.ok ? sRes : cRes)
            .json()
            .catch(() => ({}));
          throw new Error(errData.error || "Error al conectar con Mautic");
        }

        const [cData, sData, campData, eData] = await Promise.all([
          cRes.json(),
          sRes.json(),
          campRes.json(),
          eRes.json(),
        ]);

        setTotalContactos(Number(cData.total) || 0);
        setSegments(sData.segments || []);
        setCampaigns(campData.campaigns || []);
        setEmails(eData.emails || []);
        setTotalEmails(
          (eData.emails || []).reduce(
            (sum: number, e: EmailEntry) => sum + e.enviados,
            0
          )
        );
      } catch (err: any) {
        setError(err.message || "Error de conexión con Mautic");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeCampaigns = campaigns.filter((c) => c.publicada);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-sm text-gray-400">Conectando con Mautic...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="rounded-md bg-white border border-gray-200 p-10 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-[#1A4A3A] mb-2">
            Error de conexión
          </h2>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <Users className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Total contactos reales</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {totalContactos ?? "—"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <Layers className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Segmentos activos</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {segments.length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <Megaphone className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Campañas activas</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {activeCampaigns.length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <Mail className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Emails enviados</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{totalEmails}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Segmentos */}
        <div className="bg-white border border-gray-200 rounded-md">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1A4A3A]">Segmentos</h2>
            <a
              href="http://116.203.230.143/s/segments"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1"
            >
              Ver en Mautic <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          {segments.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Layers className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                No hay segmentos configurados.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Nombre
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Contactos
                  </th>
                </tr>
              </thead>
              <tbody>
                {segments.map((seg) => (
                  <tr
                    key={seg.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-5 py-3 text-sm text-[#1A1A1A]">
                      {seg.nombre}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 text-right">
                      {seg.contactos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Campañas */}
        <div className="bg-white border border-gray-200 rounded-md">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1A4A3A]">Campañas</h2>
            <a
              href="http://116.203.230.143/s/campaigns"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1"
            >
              Ver en Mautic <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          {campaigns.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Megaphone className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400 mb-4">
                No hay campañas activas
              </p>
              <a
                href="http://116.203.230.143/s/campaigns/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D6A4F] text-white text-sm rounded-md hover:bg-[#245a42] transition-colors"
              >
                Crear campaña <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Nombre
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Contactos
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((camp) => (
                  <tr
                    key={camp.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-5 py-3 text-sm text-[#1A1A1A]">
                      {camp.nombre}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 text-right">
                      {camp.contactos}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-md ${
                          camp.publicada
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {camp.publicada ? "Activa" : "Borrador"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Emails - full width */}
      <div className="bg-white border border-gray-200 rounded-md mt-4">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1A4A3A]">Emails</h2>
          <a
            href="http://116.203.230.143/s/emails"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1"
          >
            Ver en Mautic <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        {emails.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Mail className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No hay emails creados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Nombre
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Asunto
                  </th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Estado
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    <span className="inline-flex items-center gap-1">
                      <Send className="w-3 h-3" /> Enviados
                    </span>
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Aperturas
                    </span>
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    <span className="inline-flex items-center gap-1">
                      <MousePointerClick className="w-3 h-3" /> Clics
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {emails.map((em) => (
                  <tr
                    key={em.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-5 py-3 text-sm text-[#1A1A1A] font-medium">
                      {em.nombre}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">
                      {em.asunto}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-md ${
                          em.publicado
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {em.publicado ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 text-right">
                      {em.enviados}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 text-right">
                      {em.leidos}{" "}
                      <span className="text-xs text-gray-400">
                        ({em.tasaApertura}%)
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 text-right">
                      {em.clics}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
