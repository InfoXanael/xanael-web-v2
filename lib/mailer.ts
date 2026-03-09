// Email confirmation is currently disabled.
// To re-enable: restore nodemailer transporter and sendConfirmationEmail implementation,
// and uncomment the call in app/api/formularios/route.ts

export async function sendConfirmationEmail(_data: {
  nombre: string;
  email: string;
  tipo: string;
  locale: string;
}): Promise<void> {
  // disabled
}
