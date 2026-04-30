import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");
  const dispositivoId = searchParams.get("dispositivoId");
  const resuelta = searchParams.get("resuelta");
  const severidad = searchParams.get("severidad");

  const where: Record<string, unknown> = {};
  if (siteId) where.siteId = siteId;
  if (dispositivoId) where.dispositivoId = dispositivoId;
  if (resuelta !== null) where.resuelta = resuelta === "true";
  if (severidad) where.severidad = severidad;

  const incidencias = await prisma.testIncidencia.findMany({
    where,
    orderBy: { fecha: "desc" },
    include: {
      dispositivo: { select: { nombre: true, tipo: true } },
      site: { select: { nombre: true } },
    },
  });

  return NextResponse.json(incidencias);
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const { siteId, dispositivoId, tipo, severidad, descripcion, accionTomada } = body;

  if (!siteId || !tipo || !descripcion) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const incidencia = await prisma.testIncidencia.create({
    data: {
      siteId,
      dispositivoId: dispositivoId || null,
      tipo,
      severidad: severidad || "media",
      descripcion,
      accionTomada: accionTomada || null,
    },
  });

  return NextResponse.json(incidencia, { status: 201 });
}
