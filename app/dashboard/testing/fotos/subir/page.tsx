"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Upload, X, CheckCircle } from "lucide-react";

interface Site {
  id: string;
  nombre: string;
  municipio: string;
}

interface Dispositivo {
  id: string;
  nombre: string;
}

const TIPOS_FOTO = [
  "instalacion", "deteccion", "incidencia", "comparativa",
  "estado_dispositivo", "caso_exito", "otro",
];

function SubirFotosForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedSiteId = searchParams.get("siteId") ?? "";

  const [sites, setSites] = useState<Site[]>([]);
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    siteId: preselectedSiteId,
    dispositivoId: "",
    tipo: "instalacion",
    descripcion: "",
  });

  useEffect(() => {
    fetch("/api/testing/sites?limit=100").then((r) => r.json()).then((d) => setSites(d.sites ?? []));
  }, []);

  const fetchDispositivos = useCallback(async (siteId: string) => {
    if (!siteId) { setDispositivos([]); return; }
    const res = await fetch(`/api/testing/dispositivos?siteId=${siteId}&limit=100`);
    const data = await res.json();
    setDispositivos(data.dispositivos ?? []);
  }, []);

  useEffect(() => { fetchDispositivos(form.siteId); }, [form.siteId, fetchDispositivos]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected);
    const urls = selected.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  }

  function removeFile(i: number) {
    const newFiles = files.filter((_, idx) => idx !== i);
    const newPreviews = previews.filter((_, idx) => idx !== i);
    setFiles(newFiles);
    setPreviews(newPreviews);
  }

  async function handleUpload() {
    if (!form.siteId || files.length === 0) return;
    setUploading(true);
    setUploaded(0);
    let count = 0;
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("siteId", form.siteId);
      if (form.dispositivoId) fd.append("dispositivoId", form.dispositivoId);
      fd.append("tipo", form.tipo);
      if (form.descripcion) fd.append("descripcion", form.descripcion);
      await fetch("/api/testing/fotos", { method: "POST", body: fd });
      count++;
      setUploaded(count);
    }
    setDone(true);
    setUploading(false);
    setTimeout(() => {
      router.push(form.siteId ? `/dashboard/testing/sites/${form.siteId}` : "/dashboard/testing");
    }, 1200);
  }

  const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] transition-colors";

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-[#1A4A3A]">Subir fotos</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sitio *</label>
          <select
            value={form.siteId}
            onChange={(e) => setForm((f) => ({ ...f, siteId: e.target.value, dispositivoId: "" }))}
            className={inputClass}
          >
            <option value="">— Seleccionar sitio</option>
            {sites.map((s) => <option key={s.id} value={s.id}>{s.nombre} ({s.municipio})</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dispositivo (opcional)</label>
          <select
            value={form.dispositivoId}
            onChange={(e) => setForm((f) => ({ ...f, dispositivoId: e.target.value }))}
            className={inputClass}
            disabled={!form.siteId}
          >
            <option value="">— Sin dispositivo específico</option>
            {dispositivos.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de foto</label>
          <select
            value={form.tipo}
            onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
            className={inputClass}
          >
            {TIPOS_FOTO.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
            className={inputClass}
            placeholder="Descripción de las fotos"
          />
        </div>

        {/* Zona de carga */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fotos *</label>
          <div
            className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center cursor-pointer hover:border-[#2D6A4F]/40 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <Upload size={24} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">Haz clic para seleccionar fotos</p>
            <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP — múltiple selección</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Previsualización */}
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previews.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {uploading && (
          <div className="text-sm text-gray-500 text-center">
            Subiendo {uploaded}/{files.length}...
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleUpload}
            disabled={uploading || !form.siteId || files.length === 0 || done}
            className="flex items-center gap-2 bg-[#2D6A4F] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50"
          >
            {done
              ? <><CheckCircle size={14} /> Subidas</>
              : uploading
              ? `Subiendo ${uploaded}/${files.length}...`
              : <><Upload size={14} /> Subir {files.length > 0 ? `${files.length} foto${files.length > 1 ? "s" : ""}` : "fotos"}</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SubirFotosPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-gray-400">Cargando...</div>}>
      <SubirFotosForm />
    </Suspense>
  );
}
