"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAtracoesSchema = exports.updateAtracaoSchema = exports.createAtracaoSchema = void 0;
const zod_1 = require("zod");
const atracaoBody = zod_1.z.object({
    nome: zod_1.z.string({ required_error: "O nome e obrigatorio" }).trim().min(3, "O nome deve ter pelo menos 3 caracteres").max(100),
    descricao: zod_1.z.string().trim().max(500, "A descricao deve ter no maximo 500 caracteres").optional().default(""),
    tipo: zod_1.z.string({ required_error: "O tipo e obrigatorio" }).trim().min(3, "O tipo deve ter pelo menos 3 caracteres").max(50),
    alturaMin: zod_1.z.coerce.number().int("A altura minima deve ser inteira").nonnegative("A altura minima nao pode ser negativa"),
    capacidade: zod_1.z.coerce.number().int("A capacidade deve ser inteira").positive("A capacidade deve ser positiva"),
    status: zod_1.z.enum(["Ativa", "Manutencao", "Inativa"], { errorMap: () => ({ message: "Status invalido" }) })
});
exports.createAtracaoSchema = zod_1.z.object({ body: atracaoBody.strict("Campo nao permitido") });
exports.updateAtracaoSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.coerce.number().int().positive("O ID deve ser positivo") }),
    body: atracaoBody.partial().refine((data) => Object.keys(data).length > 0, "Informe ao menos um campo")
});
exports.listAtracoesSchema = zod_1.z.object({
    query: zod_1.z.object({
        status: zod_1.z.enum(["Ativa", "Manutencao", "Inativa"]).optional(),
        limit: zod_1.z.coerce.number().int().positive("O limite deve ser positivo").max(100, "O limite maximo e 100").optional()
    }).strict("Parametro de consulta invalido")
});
