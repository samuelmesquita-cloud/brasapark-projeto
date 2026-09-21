import nodemailer from "nodemailer";
import { getMailTransporter } from "../config/mail";

type WelcomeMailInput = {
  nome: string;
  email: string;
};

function withTimeout<T>(promise: Promise<T>, milliseconds: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Tempo limite excedido ao conectar ao SMTP")),
      milliseconds
    );

    promise.then(
      (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    );
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character] || character);
}

export async function sendWelcomeEmail({ nome, email }: WelcomeMailInput) {
  const send = async () => {
    const transporter = await getMailTransporter();
    const safeName = escapeHtml(nome);

    return transporter.sendMail({
      from: process.env.MAIL_FROM || '"Brasa Park" <nao-responda@brasapark.com>',
      to: email,
      subject: "Bem-vindo ao Brasa Park!",
      text: `Ola, ${nome}! Seu cadastro no Brasa Park foi realizado com sucesso.`,
      html: `<h1>Bem-vindo ao Brasa Park!</h1><p>Ola, <strong>${safeName}</strong>!</p><p>Seu cadastro foi realizado com sucesso.</p>`
    });
  };

  const info = await withTimeout(send(), 5000);

  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log(previewUrl
    ? `[email] Boas-vindas enviadas. Previa: ${previewUrl}`
    : `[email] Boas-vindas enviadas para ${email}`);
}
