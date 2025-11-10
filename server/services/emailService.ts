export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  async sendEmail(payload: EmailPayload): Promise<void> {
    // TODO: Integrate with SendGrid/Resend
    console.log('📧 EMAIL SENT:');
    console.log(`To: ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`Body:\n${payload.body}`);
    console.log('─'.repeat(60));
  }

  async sendCredentials(email: string, username: string, password: string, companyName: string): Promise<void> {
    const subject = 'Bienvenido a SICREP - Credenciales de Acceso';
    const body = `
Estimado/a,

Su solicitud de certificación REP para ${companyName} ha sido aprobada.

A continuación encontrará sus credenciales de acceso a la plataforma SICREP:

Usuario: ${username}
Contraseña temporal: ${password}

Por favor inicie sesión en https://sicrep.cl y cambie su contraseña temporal.

Una vez dentro del sistema, podrá:
- Ver el estado de su certificación
- Descargar el manual de evaluación completo
- Cargar documentos adicionales
- Consultar el avance en el workflow de certificación

Si tiene alguna pregunta, no dude en contactarnos.

Saludos cordiales,
Equipo SICREP
    `.trim();

    await this.sendEmail({ to: email, subject, body });
  }

  async sendRejectionNotice(email: string, companyName: string, reason: string): Promise<void> {
    const subject = 'SICREP - Solicitud de Certificación Rechazada';
    const body = `
Estimado/a,

Lamentamos informarle que su solicitud de certificación REP para ${companyName} no ha sido aprobada.

Motivo del rechazo:
${reason}

Puede revisar los requisitos de certificación en nuestro manual y presentar una nueva solicitud cuando haya cumplido con todos los criterios necesarios.

Si tiene alguna pregunta sobre el motivo del rechazo o necesita más información, no dude en contactarnos.

Saludos cordiales,
Equipo SICREP
    `.trim();

    await this.sendEmail({ to: email, subject, body });
  }
}

export const emailService = new EmailService();
