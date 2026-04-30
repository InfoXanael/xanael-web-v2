import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { dispositivoId: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const evaluacion = await prisma.testEvaluacion.findUnique({
    where: { dispositivoId: params.dispositivoId },
  });

  return NextResponse.json(evaluacion);
}

export async function PUT(request: NextRequest, { params }: { params: { dispositivoId: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const {
    fiabilidadDeteccion,
    resistenciaClimatica,
    facilidadInstalacion,
    facilidadMantenimiento,
    autonomiaBateria,
    calidadDatos,
    relacionCalidadPrecio,
    compatibilidadXanael,
    recomendado,
    notas,
  } = body;

  // Calcular puntuación total como media de los criterios con valor
  const criterios = [
    fiabilidadDeteccion,
    resistenciaClimatica,
    facilidadInstalacion,
    facilidadMantenimiento,
    autonomiaBateria,
    calidadDatos,
    relacionCalidadPrecio,
    compatibilidadXanael,
  ].filter((v) => v !== null && v !== undefined) as number[];

  const puntuacionTotal = criterios.length > 0
    ? criterios.reduce((a, b) => a + b, 0) / criterios.length
    : null;

  const evaluacion = await prisma.testEvaluacion.upsert({
    where: { dispositivoId: params.dispositivoId },
    update: {
      fiabilidadDeteccion: fiabilidadDeteccion ?? null,
      resistenciaClimatica: resistenciaClimatica ?? null,
      facilidadInstalacion: facilidadInstalacion ?? null,
      facilidadMantenimiento: facilidadMantenimiento ?? null,
      autonomiaBateria: autonomiaBateria ?? null,
      calidadDatos: calidadDatos ?? null,
      relacionCalidadPrecio: relacionCalidadPrecio ?? null,
      compatibilidadXanael: compatibilidadXanael ?? null,
      puntuacionTotal,
      recomendado: recomendado ?? false,
      notas: notas ?? null,
    },
    create: {
      dispositivoId: params.dispositivoId,
      fiabilidadDeteccion: fiabilidadDeteccion ?? null,
      resistenciaClimatica: resistenciaClimatica ?? null,
      facilidadInstalacion: facilidadInstalacion ?? null,
      facilidadMantenimiento: facilidadMantenimiento ?? null,
      autonomiaBateria: autonomiaBateria ?? null,
      calidadDatos: calidadDatos ?? null,
      relacionCalidadPrecio: relacionCalidadPrecio ?? null,
      compatibilidadXanael: compatibilidadXanael ?? null,
      puntuacionTotal,
      recomendado: recomendado ?? false,
      notas: notas ?? null,
    },
  });

  return NextResponse.json(evaluacion);
}
