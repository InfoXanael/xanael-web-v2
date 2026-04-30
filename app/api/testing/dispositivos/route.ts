import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");
  const tipo = searchParams.get("tipo");
  const estado = searchParams.get("estado");
  const fabricante = searchParams.get("fabricante");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "50");

  const where: Record<string, unknown> = {};
  if (siteId) where.siteId = siteId;
  if (tipo) where.tipo = tipo;
  if (estado) where.estado = estado;
  if (fabricante) where.fabricante = { contains: fabricante, mode: "insensitive" };

  const [dispositivos, total] = await Promise.all([
    prisma.testDispositivo.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        site: { select: { nombre: true, municipio: true } },
        evaluacion: true,
        _count: { select: { mediciones: true, incidencias: true } },
      },
    }),
    prisma.testDispositivo.count({ where }),
  ]);

  return NextResponse.json({ dispositivos, total, page, limit });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const { siteId, nombre, fabricante, modelo, tipo, conectividad, numeroSerie, posicionBordillo, fechaInstalacion, estado, notas } = body;

  if (!siteId || !nombre || !tipo || !fechaInstalacion) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const dispositivo = await prisma.testDispositivo.create({
    data: {
      siteId,
      nombre,
      fabricante: fabricante || null,
      modelo: modelo || null,
      tipo,
      conectividad: conectividad || null,
      numeroSerie: numeroSerie || null,
      posicionBordillo: posicionBordillo || null,
      fechaInstalacion: new Date(fechaInstalacion),
      estado: estado || "activo",
      notas: notas || null,
    },
  });

  return NextResponse.json(dispositivo, { status: 201 });
}
