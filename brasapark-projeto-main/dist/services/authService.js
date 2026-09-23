"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = require("../errors/AppError");
const SALT_ROUNDS = 10;
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET nao configurado");
    }
    return secret;
}
function sanitizeEmail(email) {
    return email.trim().toLowerCase();
}
function createToken(user) {
    return jsonwebtoken_1.default.sign({
        sub: user.id,
        nome: user.nome,
        email: user.email
    }, getJwtSecret(), { expiresIn: "2h" });
}
exports.AuthService = {
    register: async (data) => {
        const nome = data.nome.trim();
        const email = sanitizeEmail(data.email);
        const exists = await prisma_1.default.usuario.findUnique({ where: { email } });
        if (exists) {
            throw new AppError_1.AppError(409, "Email ja cadastrado", "email");
        }
        const senhaHash = await bcryptjs_1.default.hash(data.senha, SALT_ROUNDS);
        const user = await prisma_1.default.usuario.create({
            data: { nome, email, senhaHash },
            select: { id: true, nome: true, email: true }
        });
        return { user, token: createToken(user) };
    },
    login: async (data) => {
        const email = sanitizeEmail(data.email || "");
        const user = await prisma_1.default.usuario.findUnique({ where: { email } });
        if (!user) {
            throw new AppError_1.AppError(401, "Credenciais invalidas");
        }
        const validPassword = await bcryptjs_1.default.compare(data.senha, user.senhaHash);
        if (!validPassword) {
            throw new AppError_1.AppError(401, "Credenciais invalidas");
        }
        const safeUser = {
            id: user.id,
            nome: user.nome,
            email: user.email
        };
        return { user: safeUser, token: createToken(safeUser) };
    }
};
