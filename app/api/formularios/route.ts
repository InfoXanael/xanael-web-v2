import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo");
    const estado = searchParams.get("estado");

    const where: Record<string, string> = {};
    if (tipo) where.tipo = tipo;
    if (estado) where.estado = estado;

    const formularios = await prisma.formSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

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
      data: {
        tipo,
        nombre,
        email,
        telefono,
        empresa,
        sector,
        mensaje,
      },
    });

    return NextResponse.json(formulario, { status: 201 });
  } catch (error) {
    console.error("Error creating formulario:", error);
    return NextResponse.json(
      { error: "Error al crear formulario" },
      { status: 500 }
    );
  }
}
