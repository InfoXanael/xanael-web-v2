import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
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
    const { etapa, notas, nombre, empresa, email, telefono, ultimoContacto } = body;

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

    revalidateTag("pipeline");
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error updating pipeline lead:", error);
    return NextResponse.json(
      { error: "Error al actualizar lead del pipeline" },
      { status: 500 }
    );
  }
}
