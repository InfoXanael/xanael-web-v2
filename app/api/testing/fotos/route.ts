import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { uploadToVPS } from "@/lib/vps-upload";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");
  const dispositivoId = searchParams.get("dispositivoId");
  const tipo = searchParams.get("tipo");

  const where: Record<string, unknown> = {};
  if (siteId) where.siteId = siteId;
  if (dispositivoId) where.dispositivoId = dispositivoId;
  if (tipo) where.tipo = tipo;

  const fotos = await prisma.testFoto.findMany({
    where,
    orderBy: { fecha: "desc" },
    include: {
      dispositivo: { select: { nombre: true } },
      site: { select: { nombre: true } },
    },
  });

  return NextResponse.json(fotos);
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const siteId = formData.get("siteId") as string;
  const dispositivoId = formData.get("dispositivoId") as string | null;
  const tipo = formData.get("tipo") as string;
  const descripcion = formData.get("descripcion") as string | null;
  const autor = formData.get("autor") as string | null;

  if (!file || !siteId || !tipo) {
    return NextResponse.json({ error: "Faltan campos obligatorios: file, siteId y tipo son requeridos" }, { status: 400 });
  }

  let url: string;
  try {
    url = await uploadToVPS(file, "testing");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido al subir al VPS";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  try {
    const foto = await prisma.testFoto.create({
      data: {
        siteId,
        dispositivoId: dispositivoId || null,
        url,
        tipo,
        descripcion: descripcion || null,
        autor: autor || user.name || user.email || "desconocido",
        fecha: new Date(),
      },
    });
    return NextResponse.json(foto, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error guardando en base de datos";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
