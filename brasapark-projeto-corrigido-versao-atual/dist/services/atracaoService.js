"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtracaoService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.AtracaoService = {
    findAll: () => prisma_1.default.atracao.findMany({ include: { clientes: true } }),
    create: (data) => prisma_1.default.atracao.create({
        data: {
            nome: data.nome,
            descricao: data.descricao || null,
            tipo: data.tipo || "Familiar",
            alturaMin: Number(data.alturaMin) || 0,
            capacidade: Number(data.capacidade) || 0,
            status: data.status || "Ativa"
        }
    }),
    update: (id, data) => prisma_1.default.atracao.update({
        where: { id },
        data: {
            ...data,
            alturaMin: data.alturaMin === undefined ? undefined : Number(data.alturaMin),
            capacidade: data.capacidade === undefined ? undefined : Number(data.capacidade)
        }
    }),
    delete: (id) => prisma_1.default.atracao.delete({ where: { id } })
};
