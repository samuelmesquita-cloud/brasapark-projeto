"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const email = zod_1.z.string({ required_error: "O email e obrigatorio" })
    .trim()
    .email("Informe um email valido")
    .max(120, "O email deve ter no maximo 120 caracteres")
    .transform((value) => value.toLowerCase());
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        nome: zod_1.z.string({ required_error: "O nome e obrigatorio" })
            .trim()
            .min(3, "O nome deve ter pelo menos 3 caracteres")
            .max(100, "O nome deve ter no maximo 100 caracteres"),
        email,
        senha: zod_1.z.string({ required_error: "A senha e obrigatoria" })
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(72, "A senha deve ter no maximo 72 caracteres")
    }).strict("Campo nao permitido no cadastro")
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email,
        senha: zod_1.z.string({ required_error: "A senha e obrigatoria" }).min(1, "A senha e obrigatoria")
    }).strict("Campo nao permitido no login")
});
