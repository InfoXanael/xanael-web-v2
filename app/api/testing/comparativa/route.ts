import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const dispositivos = await prisma.testDispositivo.findMany({
    include: {
      evaluacion: true,
      site: { select: { nombre: true, municipio: true } },
      _count: { select: { mediciones: true, incidencias: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(dispositivos);
}
