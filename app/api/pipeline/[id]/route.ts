import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cacheInvalidate } from "@/lib/redis";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { etapa, notas, nombre, empresa, email, telefono, ultimoContacto } =
      body;

    const data: Record<string, unknown> = {};
    if (etapa !== undefined) data.etapa = etapa;
    if (notas !== undefined) data.notas = notas;
    if (nombre !== undefined) data.nombre = nombre;
    if (empresa !== undefined) data.empresa = empresa;
    if (email !== undefined) data.email = email;
    if (telefono !== undefined) data.telefono = telefono;
    if (ultimoContacto !== undefined) data.ultimoContacto = ultimoContacto;

    const lead = await prisma.pipelineLead.update({
      where: { id },
      data,
    });

    await cacheInvalidate("pipeline:all");
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error updating pipeline lead:", error);
    return NextResponse.json(
      { error: "Error al actualizar lead del pipeline" },
      { status: 500 }
    );
  }
}
