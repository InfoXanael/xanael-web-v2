import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getFormularios } from "@/lib/db-queries";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo") ?? undefined;
    const estado = searchParams.get("estado") ?? undefined;
    const formularios = await getFormularios(tipo, estado);
    return NextResponse.json(formularios);
  } catch (error) {
    console.error("Error fetching formularios:", error);
    return NextResponse.json(
      { error: "Error al obtener formularios" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, nombre, email, telefono, empresa, sector, mensaje } = body;

    const formulario = await prisma.formSubmission.create({
      data: { tipo, nombre, email, telefono, empresa, sector, mensaje },
    });

    revalidateTag("formularios");
    return NextResponse.json(formulario, { status: 201 });
  } catch (error) {
    console.error("Error creating formulario:", error);
    return NextResponse.json(
      { error: "Error al crear formulario" },
      { status: 500 }
    );
  }
}
