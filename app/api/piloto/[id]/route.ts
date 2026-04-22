import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    const submission = await prisma.pilotoSubmission.findUnique({ where: { id: params.id } });
    if (!submission) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(submission);
  } catch (error) {
    console.error("[piloto] GET by id error:", error);
    return NextResponse.json({ error: "Error al obtener solicitud" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    const { estado } = await request.json();
    if (!estado) return NextResponse.json({ error: "Campo 'estado' requerido" }, { status: 400 });

    const updated = await prisma.pilotoSubmission.update({
      where: { id: params.id },
      data: { estado },
    });

    revalidateTag("piloto");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[piloto] PATCH error:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
