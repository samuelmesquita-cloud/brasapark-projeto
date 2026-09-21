"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = sendWelcomeEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_1 = require("../config/mail");
function withTimeout(promise, milliseconds) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Tempo limite excedido ao conectar ao SMTP")), milliseconds);
        promise.then((value) => {
            clearTimeout(timeout);
            resolve(value);
        }, (error) => {
            clearTimeout(timeout);
            reject(error);
        });
    });
}
function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    })[character] || character);
}
async function sendWelcomeEmail({ nome, email }) {
    const send = async () => {
        const transporter = await (0, mail_1.getMailTransporter)();
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
    const previewUrl = nodemailer_1.default.getTestMessageUrl(info);
    console.log(previewUrl
        ? `[email] Boas-vindas enviadas. Previa: ${previewUrl}`
        : `[email] Boas-vindas enviadas para ${email}`);
}
