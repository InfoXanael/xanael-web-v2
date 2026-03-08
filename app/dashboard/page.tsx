"use client";

import { useEffect, useState } from "react";
import { FileText, Users, Send, Mail } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FormSubmission {
  id: string;
  tipo: string;
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  sector?: string;
  mensaje: string;
  estado: string;
  notas?: string;
  syncMautic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PipelineLead {
  id: string;
  nombre: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  origen?: string;
  etapa: string;
  notas?: string;
  ultimoContacto?: string;
  createdAt: string;
  updatedAt: string;
}

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const ESTADO_COLORS: Record<string, string> = {
  nuevo: "bg-blue-500",
  leido: "bg-gray-400",
  gestion: "bg-yellow-500",
  cerrado: "bg-green-500",
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "hace un momento";
  if (diffMin < 60) return `hace ${diffMin} min`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;

  const diffDays = Math.floor(diffHours / 24);
  return `hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
}

function getLast7DaysChartData(forms: FormSubmission[]) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const days: { label: string; date: string; count: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10);
    days.push({
      label: DAY_NAMES[d.getDay()],
      date: dateKey,
      count: 0,
    });
  }

  for (const form of forms) {
    const formDate = new Date(form.createdAt).toISOString().slice(0, 10);
    const match = days.find((d) => d.date === formDate);
    if (match) {
      match.count++;
    }
  }

  return days.map((d) => ({ name: d.label, formularios: d.count }));
}

export default function DashboardPage() {
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [newForms, setNewForms] = useState<FormSubmission[]>([]);
  const [leads, setLeads] = useState<PipelineLead[]>([]);

  useEffect(() => {
    fetch("/api/formularios")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setForms(data);
      })
      .catch(() => {});

    fetch("/api/formularios?estado=nuevo")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setNewForms(data);
      })
      .catch(() => {});

    fetch("/api/pipeline")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setLeads(data);
      })
      .catch(() => {});
  }, []);

  const chartData = getLast7DaysChartData(forms);
  const recentForms = forms.slice(0, 5);

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Formularios nuevos */}
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <FileText className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Formularios nuevos</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{newForms.length}</p>
        </div>

        {/* Leads en pipeline */}
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <Users className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Leads en pipeline</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{leads.length}</p>
        </div>

        {/* Contactos Mautic */}
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <Send className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Contactos Mautic</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">&mdash;</p>
        </div>

        {/* Tasa apertura emails */}
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <Mail className="w-5 h-5 text-[#2D6A4F] mb-3" />
          <p className="text-sm text-gray-500">Tasa apertura emails</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">&mdash;</p>
        </div>
      </div>

      {/* Two-column layout: Chart + Activity Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Bar Chart — Formularios últimos 7 días */}
        <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col">
          <h2 className="text-lg font-semibold text-[#1A4A3A] mb-4">
            Formularios recibidos
          </h2>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 13, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 13, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                  cursor={{ fill: "#F0F4F2" }}
                />
                <Bar
                  dataKey="formularios"
                  fill="#2D6A4F"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed — Últimos 5 formularios */}
        <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col">
          <h2 className="text-lg font-semibold text-[#1A4A3A] mb-4">
            Actividad reciente
          </h2>
          {recentForms.length === 0 ? (
            <p className="text-sm text-gray-400">No hay formularios recientes.</p>
          ) : (
            <ul className="flex-1">
              {recentForms.map((form, i) => (
                <li
                  key={form.id}
                  className={`flex items-center gap-3 py-3 ${
                    i < recentForms.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      ESTADO_COLORS[form.estado] || "bg-gray-300"
                    }`}
                  />
                  <span className="text-sm text-[#1A1A1A] flex-1 min-w-0 truncate">
                    {form.nombre} &mdash; {form.tipo}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {timeAgo(form.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
