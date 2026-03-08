import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.pipelineLead.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Error fetching pipeline leads:", error);
    return NextResponse.json(
      { error: "Error al obtener leads del pipeline" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, empresa, email, telefono, origen, etapa, notas } = body;

    const lead = await prisma.pipelineLead.create({
      data: {
        nombre,
        empresa,
        email,
        telefono,
        origen,
        etapa,
        notas,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Error creating pipeline lead:", error);
    return NextResponse.json(
      { error: "Error al crear lead del pipeline" },
      { status: 500 }
    );
  }
}
