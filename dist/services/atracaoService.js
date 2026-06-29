"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtracaoService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.AtracaoService = {
    findAll: () => prisma_1.default.atracao.findMany({ include: { clientes: true } }),
    create: (data) => prisma_1.default.atracao.create({ data }),
    update: (id, data) => prisma_1.default.atracao.update({ where: { id }, data }),
    delete: (id) => prisma_1.default.atracao.delete({ where: { id } })
};
