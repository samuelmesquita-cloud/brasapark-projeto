"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailTransporter = getMailTransporter;
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporterPromise;
async function createMailTransporter() {
    if (process.env.SMTP_HOST) {
        return nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: process.env.SMTP_USER && process.env.SMTP_PASS
                ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
                : undefined
        });
    }
    const account = await nodemailer_1.default.createTestAccount();
    console.log(`[email] Conta Ethereal de teste criada para ${account.user}`);
    return nodemailer_1.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass }
    });
}
function getMailTransporter() {
    transporterPromise ?? (transporterPromise = createMailTransporter());
    return transporterPromise;
}
