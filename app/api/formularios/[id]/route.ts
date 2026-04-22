import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cacheInvalidate } from "@/lib/redis";
import { getSessionUser } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { estado, notas, syncMautic } = body;

    const data: Record<string, unknown> = {};
    if (estado !== undefined) data.estado = estado;
    if (notas !== undefined) data.notas = notas;
    if (syncMautic !== undefined) data.syncMautic = syncMautic;

    const formulario = await prisma.formSubmission.update({
      where: { id },
      data,
    });

    await cacheInvalidate("formularios:*");
    return NextResponse.json(formulario);
  } catch (error) {
    console.error("Error updating formulario:", error);
    return NextResponse.json(
      { error: "Error al actualizar formulario" },
      { status: 500 }
    );
  }
}
