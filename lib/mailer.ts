import nodemailer from "nodemailer";

/* ─────────────────────────────────────────
   TRANSPORTER
   Uses Google Workspace SMTP (ayoub@xanael.es)
   Env vars required:
     SMTP_USER   = ayoub@xanael.es
     SMTP_PASS   = app password from Google
───────────────────────────────────────── */

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */

type Locale = "es" | "en" | "fr" | "it" | "pt";
type FormType = "comercial" | "general" | "instalador" | "tecnico" | "colaborador";

interface EmailData {
  nombre: string;
  email: string;
  tipo: FormType;
  locale: Locale;
}

/* ─────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────── */

const i18n: Record<Locale, {
  greeting: string;
  footer: string;
  team: string;
  btnText: string;
  forms: Record<FormType, { subject: string; heading: string; body: string; next: string }>;
}> = {
  es: {
    greeting: "Hola",
    footer: "Este es un mensaje automático. No es necesario que respondas a este correo.",
    team: "El equipo de Xanael",
    btnText: "Visitar xanael.es",
    forms: {
      comercial: {
        subject: "Hemos recibido tu consulta comercial — Xanael",
        heading: "Gracias por contactar con Xanael",
        body: "Hemos recibido tu consulta y nos pondremos en contacto contigo en las próximas 24–48 horas para hablar sobre cómo Xanael puede adaptarse a tu proyecto.",
        next: "Si tienes alguna pregunta urgente, puedes escribirnos directamente a info@xanael.es.",
      },
      general: {
        subject: "Hemos recibido tu mensaje — Xanael",
        heading: "Tu mensaje ha llegado",
        body: "Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos a la mayor brevedad posible.",
        next: "Si necesitas atención urgente, escríbenos a info@xanael.es.",
      },
      instalador: {
        subject: "Solicitud de colaboración recibida — Xanael",
        heading: "Tu solicitud de colaboración está en camino",
        body: "Gracias por tu interés en formar parte de la red Xanael. Hemos recibido tu solicitud y uno de nuestros responsables de red se pondrá en contacto contigo en los próximos días.",
        next: "Mientras tanto, puedes conocer más sobre nuestro modelo en xanael.es.",
      },
      tecnico: {
        subject: "Incidencia técnica registrada — Xanael",
        heading: "Incidencia recibida",
        body: "Hemos registrado tu incidencia técnica. Nuestro equipo de soporte la revisará y te contactará en las próximas horas.",
        next: "Para seguimiento urgente, contacta directamente en info@xanael.es.",
      },
      colaborador: {
        subject: "Solicitud de colaboración recibida — Xanael",
        heading: "Tu solicitud de colaboración está en camino",
        body: "Gracias por tu interés en colaborar con Xanael. Hemos recibido tu solicitud y uno de nuestros responsables se pondrá en contacto contigo próximamente.",
        next: "Puedes conocer más sobre nuestro modelo de red en xanael.es.",
      },
    },
  },
  en: {
    greeting: "Hello",
    footer: "This is an automated message. You do not need to reply to this email.",
    team: "The Xanael Team",
    btnText: "Visit xanael.es",
    forms: {
      comercial: {
        subject: "We received your commercial inquiry — Xanael",
        heading: "Thank you for contacting Xanael",
        body: "We have received your inquiry and will get back to you within 24–48 hours to discuss how Xanael can fit your project.",
        next: "For urgent questions, you can write to us directly at info@xanael.es.",
      },
      general: {
        subject: "We received your message — Xanael",
        heading: "Your message has arrived",
        body: "Thank you for reaching out. We have received your message and will reply as soon as possible.",
        next: "For urgent matters, contact us at info@xanael.es.",
      },
      instalador: {
        subject: "Partnership request received — Xanael",
        heading: "Your partnership request is on its way",
        body: "Thank you for your interest in joining the Xanael network. We have received your request and one of our team members will be in touch in the coming days.",
        next: "In the meantime, you can learn more about our model at xanael.es.",
      },
      tecnico: {
        subject: "Technical issue registered — Xanael",
        heading: "Issue received",
        body: "We have registered your technical issue. Our support team will review it and contact you shortly.",
        next: "For urgent follow-up, contact us directly at info@xanael.es.",
      },
      colaborador: {
        subject: "Collaboration request received — Xanael",
        heading: "Your collaboration request is on its way",
        body: "Thank you for your interest in collaborating with Xanael. We have received your request and will be in touch soon.",
        next: "You can learn more about our network model at xanael.es.",
      },
    },
  },
  fr: {
    greeting: "Bonjour",
    footer: "Ceci est un message automatique. Vous n'avez pas besoin de répondre à cet e-mail.",
    team: "L'équipe Xanael",
    btnText: "Visiter xanael.es",
    forms: {
      comercial: {
        subject: "Nous avons reçu votre demande commerciale — Xanael",
        heading: "Merci de contacter Xanael",
        body: "Nous avons bien reçu votre demande et nous vous contacterons dans les 24 à 48 heures pour discuter de la façon dont Xanael peut s'adapter à votre projet.",
        next: "Pour toute question urgente, écrivez-nous directement à info@xanael.es.",
      },
      general: {
        subject: "Nous avons reçu votre message — Xanael",
        heading: "Votre message est bien arrivé",
        body: "Merci de nous avoir contactés. Nous avons reçu votre message et vous répondrons dans les plus brefs délais.",
        next: "Pour les urgences, contactez-nous à info@xanael.es.",
      },
      instalador: {
        subject: "Demande de partenariat reçue — Xanael",
        heading: "Votre demande de partenariat est en cours",
        body: "Merci pour votre intérêt à rejoindre le réseau Xanael. Nous avons reçu votre demande et un membre de notre équipe vous contactera dans les prochains jours.",
        next: "En attendant, découvrez notre modèle sur xanael.es.",
      },
      tecnico: {
        subject: "Incident technique enregistré — Xanael",
        heading: "Incident reçu",
        body: "Nous avons enregistré votre incident technique. Notre équipe de support le traitera et vous contactera rapidement.",
        next: "Pour un suivi urgent, contactez-nous directement à info@xanael.es.",
      },
      colaborador: {
        subject: "Demande de collaboration reçue — Xanael",
        heading: "Votre demande de collaboration est en cours",
        body: "Merci pour votre intérêt à collaborer avec Xanael. Nous avons reçu votre demande et vous contacterons prochainement.",
        next: "Découvrez notre modèle de réseau sur xanael.es.",
      },
    },
  },
  it: {
    greeting: "Ciao",
    footer: "Questo è un messaggio automatico. Non è necessario rispondere a questa email.",
    team: "Il team di Xanael",
    btnText: "Visita xanael.es",
    forms: {
      comercial: {
        subject: "Abbiamo ricevuto la tua richiesta commerciale — Xanael",
        heading: "Grazie per aver contattato Xanael",
        body: "Abbiamo ricevuto la tua richiesta e ti contatteremo entro 24–48 ore per discutere come Xanael può adattarsi al tuo progetto.",
        next: "Per domande urgenti, scrivici direttamente a info@xanael.es.",
      },
      general: {
        subject: "Abbiamo ricevuto il tuo messaggio — Xanael",
        heading: "Il tuo messaggio è arrivato",
        body: "Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.",
        next: "Per urgenze, contattaci a info@xanael.es.",
      },
      instalador: {
        subject: "Richiesta di partnership ricevuta — Xanael",
        heading: "La tua richiesta di partnership è in corso",
        body: "Grazie per il tuo interesse a entrare nella rete Xanael. Abbiamo ricevuto la tua richiesta e un membro del nostro team ti contatterà nei prossimi giorni.",
        next: "Nel frattempo, puoi saperne di più sul nostro modello su xanael.es.",
      },
      tecnico: {
        subject: "Problema tecnico registrato — Xanael",
        heading: "Segnalazione ricevuta",
        body: "Abbiamo registrato il tuo problema tecnico. Il nostro team di supporto lo esaminerà e ti contatterà a breve.",
        next: "Per un seguito urgente, contattaci direttamente a info@xanael.es.",
      },
      colaborador: {
        subject: "Richiesta di collaborazione ricevuta — Xanael",
        heading: "La tua richiesta di collaborazione è in corso",
        body: "Grazie per il tuo interesse a collaborare con Xanael. Abbiamo ricevuto la tua richiesta e ti contatteremo presto.",
        next: "Scopri il nostro modello di rete su xanael.es.",
      },
    },
  },
  pt: {
    greeting: "Olá",
    footer: "Esta é uma mensagem automática. Não é necessário responder a este e-mail.",
    team: "A equipa Xanael",
    btnText: "Visitar xanael.es",
    forms: {
      comercial: {
        subject: "Recebemos a sua consulta comercial — Xanael",
        heading: "Obrigado por contactar a Xanael",
        body: "Recebemos a sua consulta e entraremos em contacto nas próximas 24–48 horas para discutir como a Xanael pode adaptar-se ao seu projeto.",
        next: "Para questões urgentes, escreva-nos diretamente para info@xanael.es.",
      },
      general: {
        subject: "Recebemos a sua mensagem — Xanael",
        heading: "A sua mensagem chegou",
        body: "Obrigado por nos contactar. Recebemos a sua mensagem e responderemos o mais brevemente possível.",
        next: "Para urgências, contacte-nos em info@xanael.es.",
      },
      instalador: {
        subject: "Pedido de parceria recebido — Xanael",
        heading: "O seu pedido de parceria está a caminho",
        body: "Obrigado pelo seu interesse em fazer parte da rede Xanael. Recebemos o seu pedido e um membro da nossa equipa entrará em contacto nos próximos dias.",
        next: "Entretanto, pode saber mais sobre o nosso modelo em xanael.es.",
      },
      tecnico: {
        subject: "Problema técnico registado — Xanael",
        heading: "Problema recebido",
        body: "Registámos o seu problema técnico. A nossa equipa de suporte irá analisá-lo e entrar em contacto brevemente.",
        next: "Para acompanhamento urgente, contacte-nos diretamente em info@xanael.es.",
      },
      colaborador: {
        subject: "Pedido de colaboração recebido — Xanael",
        heading: "O seu pedido de colaboração está a caminho",
        body: "Obrigado pelo seu interesse em colaborar com a Xanael. Recebemos o seu pedido e entraremos em contacto em breve.",
        next: "Saiba mais sobre o nosso modelo de rede em xanael.es.",
      },
    },
  },
};

/* ─────────────────────────────────────────
   HTML TEMPLATE
───────────────────────────────────────── */

function buildHtml({
  greeting,
  nombre,
  heading,
  body,
  next,
  btnText,
  team,
  footer,
}: {
  greeting: string;
  nombre: string;
  heading: string;
  body: string;
  next: string;
  btnText: string;
  team: string;
  footer: string;
}): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${heading}</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f2;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#1a4a3a;padding:32px 40px;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">XANAEL</p>
              <p style="margin:4px 0 0;font-size:11px;color:#ffffff99;letter-spacing:0.5px;text-transform:uppercase;">Infraestructura urbana sanitaria preventiva</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:14px;color:#555;">${greeting} ${nombre},</p>
              <h1 style="margin:0 0 20px;font-size:20px;font-weight:700;color:#1a4a3a;line-height:1.3;">${heading}</h1>
              <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7;">${body}</p>
              <p style="margin:0 0 32px;font-size:14px;color:#444;line-height:1.7;">${next}</p>

              <a href="https://xanael.es"
                 style="display:inline-block;background:#1a4a3a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 24px;border-radius:6px;">
                ${btnText}
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;"><div style="height:1px;background:#e8ede9;"></div></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;">
              <p style="margin:0 0 4px;font-size:13px;color:#1a4a3a;font-weight:600;">${team}</p>
              <p style="margin:0 0 2px;font-size:12px;color:#888;">info@xanael.es &nbsp;·&nbsp; xanael.es</p>
              <p style="margin:16px 0 0;font-size:11px;color:#aaa;line-height:1.6;">${footer}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   SEND CONFIRMATION EMAIL
───────────────────────────────────────── */

export async function sendConfirmationEmail(data: EmailData): Promise<void> {
  const locale = (data.locale in i18n ? data.locale : "en") as Locale;
  const lang = i18n[locale];
  const form = lang.forms[data.tipo] ?? lang.forms["general"];

  const html = buildHtml({
    greeting: lang.greeting,
    nombre: data.nombre,
    heading: form.heading,
    body: form.body,
    next: form.next,
    btnText: lang.btnText,
    team: lang.team,
    footer: lang.footer,
  });

  await transporter.sendMail({
    from: `"Xanael" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: form.subject,
    html,
  });
}
