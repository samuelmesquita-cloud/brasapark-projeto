"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const text_1 = require("../utils/text");
function authMiddleware(req, res, next) {
    const authReq = req;
    const token = (0, text_1.parseBearerToken)(req.headers.authorization);
    if (!token) {
        res.status(401).json({ error: "Token nao informado" });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json({ error: "JWT_SECRET nao configurado" });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (typeof payload !== "object" ||
            typeof payload.sub !== "number" ||
            typeof payload.nome !== "string" ||
            typeof payload.email !== "string") {
            res.status(401).json({ error: "Token invalido ou expirado" });
            return;
        }
        authReq.user = {
            id: payload.sub,
            nome: payload.nome,
            email: payload.email
        };
        next();
    }
    catch {
        res.status(401).json({ error: "Token invalido ou expirado" });
    }
}
