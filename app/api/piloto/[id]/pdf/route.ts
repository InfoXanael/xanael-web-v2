import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { PilotoPDF, type PilotoSubmission } from "@/components/dashboard/PilotoPDF";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const raw = await prisma.pilotoSubmission.findUnique({
    where: { id: params.id },
  });

  if (!raw) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const submission = raw as unknown as PilotoSubmission;

  const buffer = await renderToBuffer(PilotoPDF({ submission }));
  const uint8 = new Uint8Array(buffer);

  const filename = `piloto_${submission.municipio.replace(/\s+/g, "_")}_${submission.id.slice(-6)}.pdf`;

  return new NextResponse(uint8, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
