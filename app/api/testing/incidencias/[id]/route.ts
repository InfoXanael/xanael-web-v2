import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const incidencia = await prisma.testIncidencia.findUnique({
    where: { id: params.id },
    include: {
      dispositivo: { select: { nombre: true, tipo: true } },
      site: { select: { nombre: true } },
    },
  });

  if (!incidencia) return NextResponse.json({ error: "Incidencia no encontrada" }, { status: 404 });
  return NextResponse.json(incidencia);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const { tipo, severidad, descripcion, accionTomada, resuelta } = body;

  const data: Record<string, unknown> = {};
  if (tipo !== undefined) data.tipo = tipo;
  if (severidad !== undefined) data.severidad = severidad;
  if (descripcion !== undefined) data.descripcion = descripcion;
  if (accionTomada !== undefined) data.accionTomada = accionTomada;
  if (resuelta !== undefined) data.resuelta = resuelta;

  const incidencia = await prisma.testIncidencia.update({ where: { id: params.id }, data });
  return NextResponse.json(incidencia);
}
