import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cacheInvalidate } from "@/lib/redis";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { estado } = await request.json();

    if (!estado) {
      return NextResponse.json({ error: "Campo 'estado' requerido" }, { status: 400 });
    }

    const updated = await prisma.pilotoSubmission.update({
      where: { id: params.id },
      data: { estado },
    });

    await cacheInvalidate("piloto:all");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[piloto] PATCH error:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
