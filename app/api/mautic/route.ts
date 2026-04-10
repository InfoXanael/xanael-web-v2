import { NextRequest, NextResponse } from "next/server";

interface MauticContact {
  id: number;
  dateAdded: string;
  fields?: { all?: { firstname?: string; lastname?: string; email?: string } };
}

interface MauticSegment {
  id: number;
  name: string;
  alias: string;
  leadCount?: number;
}

interface MauticCampaign {
  id: number;
  name: string;
  isPublished: boolean;
  dateAdded: string;
  dateModified: string;
  leadCount?: number;
}

interface MauticEmail {
  id: number;
  name: string;
  subject: string;
  isPublished: boolean;
  dateAdded: string;
  sentCount?: number;
  readCount?: number;
  clickCount?: number;
  clickThroughCount?: number;
}

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

export async function POST(request: NextRequest) {
  if (!MAUTIC_URL) {
    return NextResponse.json({ error: "MAUTIC_URL no configurada" }, { status: 500 });
  }

  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const res = await fetch(`${MAUTIC_URL}/api/contacts/new`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error(`Mautic ${res.status}: ${res.statusText}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error Mautic POST:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
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
        const contacts = Object.values(data.contacts || {} as Record<string, MauticContact>).map((c) => {
          const contact = c as MauticContact;
          return {
            id: contact.id,
            nombre: `${contact.fields?.all?.firstname || ""} ${contact.fields?.all?.lastname || ""}`.trim(),
            email: contact.fields?.all?.email || "",
            fechaAlta: contact.dateAdded,
          };
        });
        return NextResponse.json({ total: totalData.total || 0, contacts });
      }

      case "segmentos": {
        const data = await mauticFetch("/segments?limit=50");
        const segments = Object.values(data.lists || {} as Record<string, MauticSegment>).map((s) => {
          const seg = s as MauticSegment;
          return {
            id: seg.id,
            nombre: seg.name,
            alias: seg.alias,
            contactos: Number(seg.leadCount ?? 0),
          };
        });
        return NextResponse.json({ total: segments.length, segments });
      }

      case "campañas":
      case "campanas": {
        const data = await mauticFetch("/campaigns?limit=50");
        const campaigns = Object.values(data.campaigns || {} as Record<string, MauticCampaign>).map((c) => {
          const camp = c as MauticCampaign;
          return {
            id: camp.id,
            nombre: camp.name,
            publicada: camp.isPublished,
            fechaCreacion: camp.dateAdded,
            fechaModificacion: camp.dateModified,
            contactos: Number(camp.leadCount ?? 0),
          };
        });
        return NextResponse.json({ total: campaigns.length, campaigns });
      }

      case "emails": {
        const data = await mauticFetch("/emails?limit=20&orderBy=id&orderByDir=desc");
        const emails = Object.values(data.emails || {} as Record<string, MauticEmail>).map((e) => {
          const em = e as MauticEmail;
          return {
            id: em.id,
            nombre: em.name,
            asunto: em.subject,
            publicado: em.isPublished,
            fechaCreacion: em.dateAdded,
            enviados: Number(em.sentCount ?? 0),
            leidos: Number(em.readCount ?? 0),
            tasaApertura:
              Number(em.sentCount) > 0
                ? Math.round((Number(em.readCount) / Number(em.sentCount)) * 100)
                : 0,
            clics: Number(em.clickCount ?? em.clickThroughCount ?? 0),
          };
        });
        return NextResponse.json({ total: data.total || 0, emails });
      }

      default:
        return NextResponse.json(
          { error: "Parámetro tipo requerido: contactos, segmentos, campanas, emails" },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error Mautic API:", message);
    return NextResponse.json(
      { error: `No se pudo conectar con Mautic: ${message}` },
      { status: 502 }
    );
  }
}
