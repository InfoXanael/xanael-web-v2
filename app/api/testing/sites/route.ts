import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const estado = searchParams.get("estado");
  const municipio = searchParams.get("municipio");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "50");

  const where: Record<string, unknown> = {};
  if (estado) where.estado = estado;
  if (municipio) where.municipio = { contains: municipio, mode: "insensitive" };

  const [sites, total] = await Promise.all([
    prisma.testSite.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: { select: { dispositivos: true, mediciones: true, incidencias: true } },
      },
    }),
    prisma.testSite.count({ where }),
  ]);

  return NextResponse.json({ sites, total, page, limit });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const { nombre, municipio, provincia, direccion, coordenadas, descripcion, fechaInicio, fechaFin, estado } = body;

  if (!nombre || !municipio || !provincia || !fechaInicio) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const site = await prisma.testSite.create({
    data: {
      nombre,
      municipio,
      provincia,
      direccion: direccion || null,
      coordenadas: coordenadas || null,
      descripcion: descripcion || null,
      fechaInicio: new Date(fechaInicio),
      fechaFin: fechaFin ? new Date(fechaFin) : null,
      estado: estado || "activo",
    },
  });

  return NextResponse.json(site, { status: 201 });
}
