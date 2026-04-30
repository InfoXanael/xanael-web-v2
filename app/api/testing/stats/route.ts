import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const [sitiosActivos, dispositivosInstalados, totalMediciones, incidenciasAbiertas] = await Promise.all([
    prisma.testSite.count({ where: { estado: "activo" } }),
    prisma.testDispositivo.count({ where: { estado: "activo" } }),
    prisma.testMedicion.count(),
    prisma.testIncidencia.count({ where: { resuelta: false } }),
  ]);

  return NextResponse.json({
    sitiosActivos,
    dispositivosInstalados,
    totalMediciones,
    incidenciasAbiertas,
  });
}
