import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getPipelineLeads } from "@/lib/db-queries";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const leads = await getPipelineLeads();
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
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { nombre, empresa, email, telefono, origen, etapa, notas } = body;

    const lead = await prisma.pipelineLead.create({
      data: { nombre, empresa, email, telefono, origen, etapa, notas },
    });

    revalidateTag("pipeline");
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Error creating pipeline lead:", error);
    return NextResponse.json(
      { error: "Error al crear lead del pipeline" },
      { status: 500 }
    );
  }
}
