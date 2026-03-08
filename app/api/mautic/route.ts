import { NextRequest, NextResponse } from "next/server";

const MAUTIC_URL = process.env.MAUTIC_URL || "";
const MAUTIC_USER = process.env.MAUTIC_USER || "";
const MAUTIC_PASSWORD = process.env.MAUTIC_PASSWORD || "";

const AUTH_HEADER =
  "Basic " + Buffer.from(`${MAUTIC_USER}:${MAUTIC_PASSWORD}`).toString("base64");

async function mauticFetch(endpoint: string) {
  const url = `${MAUTIC_URL}/api${endpoint}`;
  const res = await fetch(url, {
    headers: { Authorization: AUTH_HEADER },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Mautic ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function GET(request: NextRequest) {
  const tipo = request.nextUrl.searchParams.get("tipo");

  if (!MAUTIC_URL) {
    return NextResponse.json(
      { error: "MAUTIC_URL no configurada" },
      { status: 500 }
    );
  }

  try {
    switch (tipo) {
      case "contactos": {
        const [data, totalData] = await Promise.all([
          mauticFetch("/contacts?limit=10&search=!is:anonymous&orderBy=date_added&orderByDir=desc"),
          mauticFetch("/contacts?limit=1&search=!is:anonymous"),
        ]);
        const contacts = Object.values(data.contacts || {}).map((c: any) => ({
          id: c.id,
          nombre: `${c.fields?.all?.firstname || ""} ${c.fields?.all?.lastname || ""}`.trim(),
          email: c.fields?.all?.email || "",
          fechaAlta: c.dateAdded,
        }));
        return NextResponse.json({ total: totalData.total || 0, contacts });
      }

      case "segmentos": {
        const data = await mauticFetch("/segments?limit=50");
        const segments = Object.values(data.lists || {}).map((s: any) => ({
          id: s.id,
          nombre: s.name,
          alias: s.alias,
          contactos: Number(s.leadCount ?? 0),
        }));
        return NextResponse.json({ total: segments.length, segments });
      }

      case "campañas":
      case "campanas": {
        const data = await mauticFetch("/campaigns?limit=50");
        const campaigns = Object.values(data.campaigns || {}).map((c: any) => ({
          id: c.id,
          nombre: c.name,
          publicada: c.isPublished,
          fechaCreacion: c.dateAdded,
          fechaModificacion: c.dateModified,
          contactos: Number(c.leadCount ?? 0),
        }));
        return NextResponse.json({ total: campaigns.length, campaigns });
      }

      case "emails": {
        const data = await mauticFetch("/emails?limit=20&orderBy=id&orderByDir=desc");
        const emails = Object.values(data.emails || {}).map((e: any) => ({
          id: e.id,
          nombre: e.name,
          asunto: e.subject,
          publicado: e.isPublished,
          fechaCreacion: e.dateAdded,
          enviados: Number(e.sentCount ?? 0),
          leidos: Number(e.readCount ?? 0),
          tasaApertura:
            Number(e.sentCount) > 0
              ? Math.round((Number(e.readCount) / Number(e.sentCount)) * 100)
              : 0,
          clics: Number(e.clickCount ?? e.clickThroughCount ?? 0),
        }));
        return NextResponse.json({ total: data.total || 0, emails });
      }

      default:
        return NextResponse.json(
          { error: "Parámetro tipo requerido: contactos, segmentos, campanas, emails" },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error("Error Mautic API:", error.message);
    return NextResponse.json(
      { error: `No se pudo conectar con Mautic: ${error.message}` },
      { status: 502 }
    );
  }
}
