import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const dispositivo = await prisma.testDispositivo.findUnique({
    where: { id: params.id },
    include: {
      site: { select: { id: true, nombre: true, municipio: true } },
      evaluacion: true,
      mediciones: { orderBy: { fecha: "desc" }, take: 100 },
      fotos: { orderBy: { fecha: "desc" } },
      incidencias: { orderBy: { fecha: "desc" } },
    },
  });

  if (!dispositivo) return NextResponse.json({ error: "Dispositivo no encontrado" }, { status: 404 });
  return NextResponse.json(dispositivo);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const { nombre, fabricante, modelo, tipo, conectividad, numeroSerie, posicionBordillo, fechaInstalacion, fechaRetirada, estado, notas } = body;

  const data: Record<string, unknown> = {};
  if (nombre !== undefined) data.nombre = nombre;
  if (fabricante !== undefined) data.fabricante = fabricante;
  if (modelo !== undefined) data.modelo = modelo;
  if (tipo !== undefined) data.tipo = tipo;
  if (conectividad !== undefined) data.conectividad = conectividad;
  if (numeroSerie !== undefined) data.numeroSerie = numeroSerie;
  if (posicionBordillo !== undefined) data.posicionBordillo = posicionBordillo;
  if (fechaInstalacion !== undefined) data.fechaInstalacion = new Date(fechaInstalacion);
  if (fechaRetirada !== undefined) data.fechaRetirada = fechaRetirada ? new Date(fechaRetirada) : null;
  if (estado !== undefined) data.estado = estado;
  if (notas !== undefined) data.notas = notas;

  const dispositivo = await prisma.testDispositivo.update({ where: { id: params.id }, data });
  return NextResponse.json(dispositivo);
}
