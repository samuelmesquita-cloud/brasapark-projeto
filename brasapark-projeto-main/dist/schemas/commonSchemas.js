"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyQuerySchema = exports.idParamsSchema = void 0;
const zod_1 = require("zod");
exports.idParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.coerce
            .number({ invalid_type_error: "O ID deve ser numerico" })
            .int("O ID deve ser inteiro")
            .positive("O ID deve ser positivo")
    })
});
exports.emptyQuerySchema = zod_1.z.object({
    query: zod_1.z.object({}).strict("A consulta nao aceita parametros")
});
