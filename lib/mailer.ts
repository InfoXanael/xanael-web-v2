import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

interface ZonaData {
  zona: string;
  tipo_plaga: string;
  frecuencia: string;
  descripcion?: string;
  fotos: string[];
}

export interface PilotoNotificationData {
  nombre: string;
  cargo: string;
  municipio: string;
  zonas: ZonaData[];
  submissionId: string;
}

export async function sendPilotoNotification(data: PilotoNotificationData) {
  const transporter = createTransporter();
  const to = process.env.SMTP_TO ?? "info@xanael.es";

  const zonasHtml = data.zonas
    .map(
      (z, i) => `
      <h3 style="color:#1A4A3A;margin-top:20px">Zona ${i + 1}</h3>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Calle / Zona</td><td style="padding:8px;border:1px solid #ddd">${z.zona}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Tipo de plaga</td><td style="padding:8px;border:1px solid #ddd">${z.tipo_plaga}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Frecuencia</td><td style="padding:8px;border:1px solid #ddd">${z.frecuencia}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Descripción</td><td style="padding:8px;border:1px solid #ddd">${z.descripcion ?? "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Fotos</td><td style="padding:8px;border:1px solid #ddd">${
          z.fotos.length > 0
            ? z.fotos.map((f) => `<a href="https://xanael.es${f}">${f}</a>`).join("<br>")
            : "Sin fotos"
        }</td></tr>
      </table>`
    )
    .join("");

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "XANAEL <info@xanael.es>",
    to,
    subject: `[PILOTO] Nueva solicitud — ${data.municipio} · ${data.zonas.length} zona${data.zonas.length > 1 ? "s" : ""} (${data.nombre})`,
    html: `
      <h2 style="color:#1A4A3A">Nueva solicitud de zona piloto municipal</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Nombre</td><td style="padding:8px;border:1px solid #ddd">${data.nombre}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Cargo</td><td style="padding:8px;border:1px solid #ddd">${data.cargo}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Municipio</td><td style="padding:8px;border:1px solid #ddd">${data.municipio}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Nº de zonas</td><td style="padding:8px;border:1px solid #ddd">${data.zonas.length}</td></tr>
      </table>
      ${zonasHtml}
      <hr style="margin-top:24px">
      <p style="font-size:12px;color:#666">
        ID de solicitud: <code>${data.submissionId}</code><br>
        Ver en el dashboard: <a href="https://xanael.es/dashboard">xanael.es/dashboard</a>
      </p>
    `,
  });
}

// Legacy stub — kept for backwards compatibility
export async function sendConfirmationEmail() {
  // disabled
}
