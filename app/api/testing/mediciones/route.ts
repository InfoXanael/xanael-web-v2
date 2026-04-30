import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");
  const dispositivoId = searchParams.get("dispositivoId");
  const tipo = searchParams.get("tipo");
  const desde = searchParams.get("desde");
  const hasta = searchParams.get("hasta");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "100");

  const where: Record<string, unknown> = {};
  if (siteId) where.siteId = siteId;
  if (dispositivoId) where.dispositivoId = dispositivoId;
  if (tipo) where.tipo = tipo;
  if (desde || hasta) {
    where.fecha = {};
    if (desde) (where.fecha as Record<string, unknown>).gte = new Date(desde);
    if (hasta) (where.fecha as Record<string, unknown>).lte = new Date(hasta);
  }

  const [mediciones, total] = await Promise.all([
    prisma.testMedicion.findMany({
      where,
      orderBy: { fecha: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        dispositivo: { select: { nombre: true, tipo: true } },
        site: { select: { nombre: true } },
      },
    }),
    prisma.testMedicion.count({ where }),
  ]);

  return NextResponse.json({ mediciones, total, page, limit });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();

  // Soporte para batch (array) o single (objeto)
  if (Array.isArray(body)) {
    const invalid = body.findIndex((item) => !item.siteId || !item.fecha || !item.tipo);
    if (invalid !== -1) {
      return NextResponse.json(
        { error: `Ítem ${invalid} inválido: siteId, fecha y tipo son obligatorios` },
        { status: 400 }
      );
    }
    const items = body.map((item) => ({
      siteId: item.siteId,
      dispositivoId: item.dispositivoId || null,
      fecha: new Date(item.fecha),
      tipo: item.tipo,
      valor: item.valor ?? null,
      unidad: item.unidad || null,
      descripcion: item.descripcion || null,
      confianza: item.confianza ?? null,
      fuenteDatos: item.fuenteDatos || "manual",
    }));
    await prisma.testMedicion.createMany({ data: items });
    return NextResponse.json({ created: items.length }, { status: 201 });
  }

  const { siteId, dispositivoId, fecha, tipo, valor, unidad, descripcion, confianza, fuenteDatos } = body;
  if (!siteId || !fecha || !tipo) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const medicion = await prisma.testMedicion.create({
    data: {
      siteId,
      dispositivoId: dispositivoId || null,
      fecha: new Date(fecha),
      tipo,
      valor: valor ?? null,
      unidad: unidad || null,
      descripcion: descripcion || null,
      confianza: confianza ?? null,
      fuenteDatos: fuenteDatos || "manual",
    },
  });

  return NextResponse.json(medicion, { status: 201 });
}
