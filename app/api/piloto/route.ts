import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { sendPilotoNotification } from "@/lib/mailer";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_FILES = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const nombre = ((formData.get("nombre") as string | null) ?? "").trim();
    const cargo = ((formData.get("cargo") as string | null) ?? "").trim();
    const municipio = ((formData.get("municipio") as string | null) ?? "").trim();
    const zona = ((formData.get("zona") as string | null) ?? "").trim();
    const tipo_plaga = ((formData.get("tipo_plaga") as string | null) ?? "").trim();
    const frecuencia = ((formData.get("frecuencia") as string | null) ?? "").trim();
    const descripcion = ((formData.get("descripcion") as string | null) ?? "").trim() || undefined;

    if (!nombre || !cargo || !municipio || !zona || !tipo_plaga || !frecuencia) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Handle file uploads
    const fotoPaths: string[] = [];
    const files = (formData.getAll("fotos") as File[])
      .filter((f) => f && f.size > 0)
      .slice(0, MAX_FILES);

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Tipo de archivo no permitido: ${file.name}` },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `El archivo ${file.name} supera el límite de 4 MB` },
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

    const submission = await prisma.pilotoSubmission.create({
      data: { nombre, cargo, municipio, zona, tipo_plaga, frecuencia, descripcion, fotos: fotoPaths },
    });

    sendPilotoNotification({
      nombre, cargo, municipio, zona, tipo_plaga, frecuencia, descripcion,
      fotos: fotoPaths,
      submissionId: submission.id,
    }).catch((err) => console.error("[piloto] Email error:", err));

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("[piloto] Error:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
