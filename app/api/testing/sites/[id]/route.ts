import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const site = await prisma.testSite.findUnique({
    where: { id: params.id },
    include: {
      dispositivos: {
        orderBy: { fechaInstalacion: "desc" },
        include: { evaluacion: true },
      },
      mediciones: { orderBy: { fecha: "desc" }, take: 100 },
      fotos: { orderBy: { fecha: "desc" } },
      incidencias: { orderBy: { fecha: "desc" } },
    },
  });

  if (!site) return NextResponse.json({ error: "Sitio no encontrado" }, { status: 404 });
  return NextResponse.json(site);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const { nombre, municipio, provincia, direccion, coordenadas, descripcion, fechaInicio, fechaFin, estado } = body;

  const data: Record<string, unknown> = {};
  if (nombre !== undefined) data.nombre = nombre;
  if (municipio !== undefined) data.municipio = municipio;
  if (provincia !== undefined) data.provincia = provincia;
  if (direccion !== undefined) data.direccion = direccion;
  if (coordenadas !== undefined) data.coordenadas = coordenadas;
  if (descripcion !== undefined) data.descripcion = descripcion;
  if (fechaInicio !== undefined) data.fechaInicio = new Date(fechaInicio);
  if (fechaFin !== undefined) data.fechaFin = fechaFin ? new Date(fechaFin) : null;
  if (estado !== undefined) data.estado = estado;

  const site = await prisma.testSite.update({ where: { id: params.id }, data });
  return NextResponse.json(site);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  await prisma.testSite.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
