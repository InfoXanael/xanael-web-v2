import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Endpoint autenticado por API key para recibir datos de dispositivos IoT
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.TESTING_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return NextResponse.json({ error: "API key inválida" }, { status: 401 });
  }

  const body = await request.json();
  const items = Array.isArray(body) ? body : [body];

  const data = items.map((item) => ({
    siteId: item.siteId,
    dispositivoId: item.dispositivoId || null,
    fecha: new Date(item.fecha ?? Date.now()),
    tipo: item.tipo,
    valor: item.valor ?? null,
    unidad: item.unidad || null,
    descripcion: item.descripcion || null,
    confianza: item.confianza ?? null,
    fuenteDatos: "automatico_dispositivo",
  }));

  if (data.some((d) => !d.siteId || !d.tipo)) {
    return NextResponse.json({ error: "Cada medición necesita siteId y tipo" }, { status: 400 });
  }

  await prisma.testMedicion.createMany({ data });
  return NextResponse.json({ ingested: data.length }, { status: 201 });
}
