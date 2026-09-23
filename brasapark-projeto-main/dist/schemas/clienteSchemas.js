"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClienteSchema = exports.createClienteSchema = void 0;
const zod_1 = require("zod");
const clienteBody = zod_1.z.object({
    nome: zod_1.z.string({ required_error: "O nome e obrigatorio" }).trim().min(3, "O nome deve ter pelo menos 3 caracteres").max(100),
    email: zod_1.z.string({ required_error: "O email e obrigatorio" }).trim().email("Informe um email valido").max(120).transform((value) => value.toLowerCase()),
    telefone: zod_1.z.string({ required_error: "O telefone e obrigatorio" }).trim().regex(/^\+?[0-9 ()-]{8,20}$/, "Informe um telefone valido"),
    atracaoId: zod_1.z.coerce.number().int("O ID da atracao deve ser inteiro").positive("O ID da atracao deve ser positivo")
});
exports.createClienteSchema = zod_1.z.object({ body: clienteBody.strict("Campo nao permitido") });
exports.updateClienteSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.coerce.number().int().positive("O ID deve ser positivo") }),
    body: clienteBody.partial().refine((data) => Object.keys(data).length > 0, "Informe ao menos um campo")
});
