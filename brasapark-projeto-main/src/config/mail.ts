import nodemailer, { Transporter } from "nodemailer";

let transporterPromise: Promise<Transporter> | undefined;

async function createMailTransporter(): Promise<Transporter> {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined
    });
  }

  const account = await nodemailer.createTestAccount();
  console.log(`[email] Conta Ethereal de teste criada para ${account.user}`);

  return nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: { user: account.user, pass: account.pass }
  });
}

export function getMailTransporter() {
  transporterPromise ??= createMailTransporter();
  return transporterPromise;
}
