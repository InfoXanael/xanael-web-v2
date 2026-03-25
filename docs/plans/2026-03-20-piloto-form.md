# Piloto Municipal Form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create `/piloto` page with a form for municipal pilot zone requests, saving data to PostgreSQL and sending email notification to info@xanael.es.

**Architecture:** New `PilotoSubmission` Prisma model + dedicated `/api/piloto` API route that handles multipart FormData (text fields + photos). Frontend component follows the existing `app/[locale]/X/page.tsx → components/X/XPage.tsx` pattern. Design matches the contacto page style (dark green + concrete texture background).

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma (PostgreSQL), nodemailer (already installed), framer-motion (already installed).

---

## Pre-flight: Env vars needed

Add these to `.env.local` before running the API route in dev:

```env
# PostgreSQL (production Hetzner VPS)
DATABASE_URL="postgresql://USER:PASS@116.203.230.143:5432/xanael_dashboard"

# SMTP — needed for email notification
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="info@xanael.es"
SMTP_PASS="your-smtp-password"
SMTP_FROM="XANAEL <info@xanael.es>"
NOTIFICATION_EMAIL="info@xanael.es"
```

---

### Task 1: Add PilotoSubmission model to Prisma schema

**Files:**
- Modify: `prisma/schema.prisma`

**Step 1: Add model to schema**

Append this block to `prisma/schema.prisma` (after the PipelineLead model):

```prisma
model PilotoSubmission {
  id          String   @id @default(cuid())
  nombre      String
  cargo       String
  municipio   String
  zona        String
  tipo_plaga  String
  frecuencia  String
  descripcion String?
  fotos       String[] @default([])
  estado      String   @default("nuevo")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Step 2: Run migration**

```bash
npx prisma migrate dev --name add_piloto_submission
```

Expected: Migration created and applied. Prisma client regenerated automatically.

**Step 3: Verify**

```bash
npx prisma studio
```

Expected: `PilotoSubmission` table appears in Prisma Studio.

**Step 4: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat: add PilotoSubmission model for pilot zone form"
```

---

### Task 2: Implement email function in lib/mailer.ts

**Files:**
- Modify: `lib/mailer.ts`

**Step 1: Replace stub with working nodemailer implementation**

```typescript
import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export interface PilotoNotificationData {
  nombre: string;
  cargo: string;
  municipio: string;
  zona: string;
  tipo_plaga: string;
  frecuencia: string;
  descripcion?: string;
  fotos: string[];
  submissionId: string;
}

export async function sendPilotoNotification(data: PilotoNotificationData) {
  const transporter = createTransporter();
  const to = process.env.NOTIFICATION_EMAIL ?? "info@xanael.es";

  const fotosHtml = data.fotos.length > 0
    ? `<ul>${data.fotos.map((f) => `<li><a href="https://xanael.es${f}">${f}</a></li>`).join("")}</ul>`
    : "<p>Sin fotos adjuntas</p>";

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "XANAEL <info@xanael.es>",
    to,
    subject: `[PILOTO] Nueva solicitud — ${data.municipio} (${data.nombre})`,
    html: `
      <h2>Nueva solicitud de zona piloto municipal</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${data.nombre}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Cargo</td><td style="padding:8px;border:1px solid #ddd">${data.cargo}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Municipio</td><td style="padding:8px;border:1px solid #ddd">${data.municipio}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Zona / Calle</td><td style="padding:8px;border:1px solid #ddd">${data.zona}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Tipo de plaga</td><td style="padding:8px;border:1px solid #ddd">${data.tipo_plaga}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Frecuencia</td><td style="padding:8px;border:1px solid #ddd">${data.frecuencia}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Descripción</td><td style="padding:8px;border:1px solid #ddd">${data.descripcion ?? "—"}</td></tr>
      </table>
      <h3>Fotos adjuntas</h3>
      ${fotosHtml}
      <hr>
      <p style="font-size:12px;color:#666">ID: ${data.submissionId} — Dashboard: <a href="https://xanael.es/dashboard">xanael.es/dashboard</a></p>
    `,
  });
}

// Keep old stub signature for backwards compat
export async function sendConfirmationEmail() {
  // disabled
}
```

**Step 2: Commit**

```bash
git add lib/mailer.ts
git commit -m "feat: implement sendPilotoNotification email function"
```

---

### Task 3: Create /api/piloto API route

**Files:**
- Create: `app/api/piloto/route.ts`

**Note:** This route uses `multipart/form-data` (not JSON) to support file uploads. It saves uploaded photos to `public/uploads/piloto/` (served statically by Next.js).

**Step 1: Create directory**

```bash
mkdir -p app/api/piloto
mkdir -p public/uploads/piloto
```

**Step 2: Create the route**

```typescript
// app/api/piloto/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { sendPilotoNotification } from "@/lib/mailer";

// Allow large multipart bodies (up to 20MB for 5 photos)
export const config = {
  api: { bodyParser: false },
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_FILES = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB per file

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // --- Extract text fields ---
    const nombre = (formData.get("nombre") as string | null)?.trim() ?? "";
    const cargo = (formData.get("cargo") as string | null)?.trim() ?? "";
    const municipio = (formData.get("municipio") as string | null)?.trim() ?? "";
    const zona = (formData.get("zona") as string | null)?.trim() ?? "";
    const tipo_plaga = (formData.get("tipo_plaga") as string | null)?.trim() ?? "";
    const frecuencia = (formData.get("frecuencia") as string | null)?.trim() ?? "";
    const descripcion = (formData.get("descripcion") as string | null)?.trim() || undefined;

    // --- Validate required fields ---
    if (!nombre || !cargo || !municipio || !zona || !tipo_plaga || !frecuencia) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // --- Handle file uploads ---
    const fotoPaths: string[] = [];
    const files = formData.getAll("fotos") as File[];
    const validFiles = files.filter((f) => f && f.size > 0).slice(0, MAX_FILES);

    for (const file of validFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Tipo de archivo no permitido: ${file.type}` },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Archivo demasiado grande (máx 4MB por foto)` },
          { status: 400 }
        );
      }

      const ext = file.name.split(".").pop() ?? "jpg";
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = path.join(process.cwd(), "public", "uploads", "piloto", uniqueName);
      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      fotoPaths.push(`/uploads/piloto/${uniqueName}`);
    }

    // --- Save to DB ---
    const submission = await prisma.pilotoSubmission.create({
      data: {
        nombre,
        cargo,
        municipio,
        zona,
        tipo_plaga,
        frecuencia,
        descripcion,
        fotos: fotoPaths,
      },
    });

    // --- Send email (non-blocking) ---
    sendPilotoNotification({
      nombre,
      cargo,
      municipio,
      zona,
      tipo_plaga,
      frecuencia,
      descripcion,
      fotos: fotoPaths,
      submissionId: submission.id,
    }).catch((err) => console.error("[piloto] Email failed:", err));

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("[piloto] Error:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
```

**Step 3: Commit**

```bash
git add app/api/piloto/route.ts public/uploads/piloto/.gitkeep
git commit -m "feat: add /api/piloto route with file upload support"
```

---

### Task 4: Create PilotoPage component

**Files:**
- Create: `components/piloto/PilotoPage.tsx`

**Design notes:**
- Same page structure as ContactPage: white bg (#F0F4F2), breadcrumb, header, then form
- Form card uses dark green + concrete texture overlay (same as ContactPage form area)
- White-on-dark inputs matching the existing form style
- File upload area with drag hint and preview
- 3 columns: plaga + frecuencia on one row (2-col grid)
- Success state with green checkmark

```typescript
"use client";

import { useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Bug, Camera, CheckCircle, X } from "lucide-react";

const inputClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

const selectClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors appearance-none";

const labelClass = "block text-xs font-medium text-white/60 mb-1";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function PilotoPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fotos, setFotos] = useState<File[]>([]);
  const [fotoPreviews, setFotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const combined = [...fotos, ...files].slice(0, 5);
    setFotos(combined);
    setFotoPreviews(combined.map((f) => URL.createObjectURL(f)));
  }

  function removePhoto(index: number) {
    const next = fotos.filter((_, i) => i !== index);
    setFotos(next);
    setFotoPreviews(next.map((f) => URL.createObjectURL(f)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    fotos.forEach((f) => fd.append("fotos", f));

    try {
      const res = await fetch("/api/piloto", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-24 bg-[#F0F4F2] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">Zonas Piloto</span>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-md bg-[#2D6A4F] flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium text-[#2D6A4F] uppercase tracking-wider">
            Programa Municipal
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A4A3A] tracking-tight">
          Solicitud de Zona Piloto
        </h1>
        <p className="mt-4 text-gray-500 text-lg max-w-2xl">
          Propón tu municipio para el programa piloto XANAEL. Instalamos el bordillo técnico en zonas con incidencia de plagas registrada, sin coste para el ayuntamiento.
        </p>

        {/* Value props */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: MapPin, title: "Sin coste inicial", desc: "Instalación gratuita en la zona piloto seleccionada" },
            { icon: Bug, title: "Monitoreo continuo", desc: "Datos de actividad de plagas en tiempo real" },
            { icon: CheckCircle, title: "Informe técnico", desc: "Resultado del piloto con métricas y recomendaciones" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-md p-5 border border-gray-100">
                <Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                <h3 className="mt-3 text-sm font-semibold text-[#1A4A3A]">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </header>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            backgroundImage: "url('/images/textura-hormigon.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1A4A3A]/[0.92]" />
          <div className="relative p-8 md:p-12 max-w-2xl">
            <h2 className="text-white font-semibold text-lg mb-6">
              Datos de la solicitud
            </h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="py-8"
                >
                  <CheckCircle className="w-10 h-10 text-white/80" strokeWidth={1.5} />
                  <p className="mt-4 text-white text-lg font-semibold">
                    Solicitud recibida correctamente
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Nos pondremos en contacto contigo en un plazo de 5 días hábiles para valorar la zona propuesta.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors"
                  >
                    Enviar otra solicitud
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                >
                  {status === "error" && (
                    <div className="mb-4 bg-red-500/20 border border-red-400/30 text-white text-sm rounded-md p-3">
                      Ha ocurrido un error. Por favor, inténtalo de nuevo.
                    </div>
                  )}

                  {/* Nombre + Cargo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className={labelClass}>Nombre completo <span className="text-red-400">*</span></label>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        required
                        placeholder="Tu nombre completo"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cargo" className={labelClass}>Cargo <span className="text-red-400">*</span></label>
                      <input
                        id="cargo"
                        type="text"
                        name="cargo"
                        required
                        placeholder="Ej: Técnico de medio ambiente"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Municipio */}
                  <div className="mt-4">
                    <label htmlFor="municipio" className={labelClass}>Municipio <span className="text-red-400">*</span></label>
                    <input
                      id="municipio"
                      type="text"
                      name="municipio"
                      required
                      placeholder="Nombre del municipio"
                      className={inputClass}
                    />
                  </div>

                  {/* Zona */}
                  <div className="mt-4">
                    <label htmlFor="zona" className={labelClass}>Zona / Calle propuesta <span className="text-red-400">*</span></label>
                    <input
                      id="zona"
                      type="text"
                      name="zona"
                      required
                      placeholder="Ej: Calle Mayor, parque central..."
                      className={inputClass}
                    />
                  </div>

                  {/* Plaga + Frecuencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="tipo_plaga" className={labelClass}>Tipo de plaga detectada <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <select
                          id="tipo_plaga"
                          name="tipo_plaga"
                          required
                          defaultValue=""
                          className={selectClass}
                        >
                          <option value="" disabled className="text-gray-900">Selecciona</option>
                          <option value="Roedores" className="text-gray-900">Roedores</option>
                          <option value="Cucarachas" className="text-gray-900">Cucarachas</option>
                          <option value="Hormigas" className="text-gray-900">Hormigas</option>
                          <option value="Otras" className="text-gray-900">Otras</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="frecuencia" className={labelClass}>Frecuencia de incidencias <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <select
                          id="frecuencia"
                          name="frecuencia"
                          required
                          defaultValue=""
                          className={selectClass}
                        >
                          <option value="" disabled className="text-gray-900">Selecciona</option>
                          <option value="Diaria" className="text-gray-900">Diaria</option>
                          <option value="Semanal" className="text-gray-900">Semanal</option>
                          <option value="Mensual" className="text-gray-900">Mensual</option>
                          <option value="Ocasional" className="text-gray-900">Ocasional</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mt-4">
                    <label htmlFor="descripcion" className={labelClass}>Descripción adicional</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      rows={4}
                      placeholder="Describe la situación de la zona, histórico de incidencias, accesibilidad..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Fotos */}
                  <div className="mt-4">
                    <label className={labelClass}>
                      <Camera className="inline w-3.5 h-3.5 mr-1" />
                      Fotos de la zona (opcional, máx. 5)
                    </label>

                    {fotoPreviews.length < 5 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border border-dashed border-white/25 rounded-md px-4 py-4 text-sm text-white/50 hover:border-white/40 hover:text-white/70 transition-colors text-center"
                      >
                        + Añadir fotos
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    {fotoPreviews.length > 0 && (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {fotoPreviews.map((src, i) => (
                          <div key={i} className="relative group aspect-square">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Foto ${i + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(i)}
                              className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RGPD */}
                  <label className="flex items-start gap-3 mt-6 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rgpd"
                      required
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent accent-white shrink-0"
                    />
                    <span className="text-xs text-white/60 leading-relaxed">
                      Acepto la{" "}
                      <Link href="/politica-privacidad" className="underline hover:text-white/80">
                        política de privacidad
                      </Link>{" "}
                      y consiento el tratamiento de mis datos para la gestión de esta solicitud.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar solicitud"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/piloto/PilotoPage.tsx
git commit -m "feat: add PilotoPage component with form UI and file upload"
```

---

### Task 5: Create the page route

**Files:**
- Create: `app/[locale]/piloto/page.tsx`

```typescript
import { Metadata } from "next";
import PilotoPage from "@/components/piloto/PilotoPage";

export const metadata: Metadata = {
  title: "Zonas Piloto - Xanael",
  description:
    "Solicita incluir tu municipio en el programa piloto XANAEL de infraestructura urbana sanitaria preventiva.",
};

export default function Page() {
  return <PilotoPage />;
}
```

**Step 2: Commit**

```bash
git add app/[locale]/piloto/page.tsx
git commit -m "feat: add /piloto page route"
```

---

### Task 6: Add .gitkeep for uploads directory

**Files:**
- Create: `public/uploads/piloto/.gitkeep`

**Step 1: Create the file and add to .gitignore**

```bash
touch public/uploads/piloto/.gitkeep
```

Add to `.gitignore`:
```
# Uploaded files
public/uploads/piloto/*.jpg
public/uploads/piloto/*.jpeg
public/uploads/piloto/*.png
public/uploads/piloto/*.webp
public/uploads/piloto/*.heic
```

**Step 2: Commit**

```bash
git add public/uploads/piloto/.gitkeep .gitignore
git commit -m "chore: add uploads directory structure and gitignore rules"
```

---

## Testing checklist

1. `npm run dev` — page loads at `http://localhost:3000/es/piloto`
2. Submit form without required fields — browser validation blocks it
3. Submit valid form without photos — data saved in DB, email sent
4. Submit with 5 photos — photos saved to `public/uploads/piloto/`, paths stored in DB
5. Submit with 6 photos — only first 5 are kept
6. Check `prisma studio` — PilotoSubmission record visible with correct data
7. Check email inbox for info@xanael.es — notification received

## Known limitations / follow-ups

- File uploads are stored on the filesystem. On Vercel/serverless, use object storage (e.g. S3, Cloudflare R2) instead.
- No dashboard view for PilotoSubmission yet — needs a new route in `/dashboard/piloto`.
- SMTP credentials need to be added to the production environment on the Hetzner VPS.
- `public/uploads/` directory must exist and be writable on the server.
