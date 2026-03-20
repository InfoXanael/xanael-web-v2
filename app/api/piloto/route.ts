import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { sendPilotoNotification } from "@/lib/mailer";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_FILES_PER_ZONE = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

interface ZonaMeta {
  zona: string;
  tipo_plaga: string;
  frecuencia: string;
  descripcion?: string;
}

interface ZonaFull extends ZonaMeta {
  fotos: string[];
}

async function saveFiles(files: File[]): Promise<string[]> {
  const paths: string[] = [];
  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`Tipo no permitido: ${file.name}`);
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Archivo demasiado grande: ${file.name}`);
    }
    const ext = file.name.split(".").pop() ?? "jpg";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", "piloto", uniqueName);
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    paths.push(`/uploads/piloto/${uniqueName}`);
  }
  return paths;
}

export async function GET() {
  try {
    const submissions = await prisma.pilotoSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("[piloto] GET error:", error);
    return NextResponse.json({ error: "Error al obtener solicitudes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const nombre = ((formData.get("nombre") as string | null) ?? "").trim();
    const cargo = ((formData.get("cargo") as string | null) ?? "").trim();
    const municipio = ((formData.get("municipio") as string | null) ?? "").trim();
    const zonas_meta_str = (formData.get("zonas_meta") as string | null) ?? "";

    if (!nombre || !cargo || !municipio || !zonas_meta_str) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    let zonas_meta: ZonaMeta[];
    try {
      zonas_meta = JSON.parse(zonas_meta_str);
    } catch {
      return NextResponse.json({ error: "Formato de zonas inválido" }, { status: 400 });
    }

    if (!Array.isArray(zonas_meta) || zonas_meta.length === 0) {
      return NextResponse.json({ error: "Se requiere al menos una zona" }, { status: 400 });
    }

    // Validate each zone and process files
    const zonas: ZonaFull[] = [];
    for (let i = 0; i < zonas_meta.length; i++) {
      const meta = zonas_meta[i];
      if (!meta.zona || !meta.tipo_plaga || !meta.frecuencia) {
        return NextResponse.json(
          { error: `Zona ${i + 1}: faltan campos obligatorios` },
          { status: 400 }
        );
      }

      const rawFiles = (formData.getAll(`zona_${i}_fotos`) as File[])
        .filter((f) => f && f.size > 0)
        .slice(0, MAX_FILES_PER_ZONE);

      let fotoPaths: string[] = [];
      try {
        fotoPaths = await saveFiles(rawFiles);
      } catch (err) {
        return NextResponse.json(
          { error: err instanceof Error ? err.message : "Error subiendo archivo" },
          { status: 400 }
        );
      }

      zonas.push({
        zona: meta.zona,
        tipo_plaga: meta.tipo_plaga,
        frecuencia: meta.frecuencia,
        descripcion: meta.descripcion || undefined,
        fotos: fotoPaths,
      });
    }

    const submission = await prisma.pilotoSubmission.create({
      data: { nombre, cargo, municipio, zonas: zonas as object[] },
    });

    sendPilotoNotification({
      nombre,
      cargo,
      municipio,
      zonas,
      submissionId: submission.id,
    }).catch((err) => console.error("[piloto] Email error:", err));

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("[piloto] Error:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
