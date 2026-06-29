"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.ClienteService = {
    findAll: () => prisma_1.default.cliente.findMany({ include: { atracao: true } }),
    create: (data) => prisma_1.default.cliente.create({ data }),
    update: (id, data) => prisma_1.default.cliente.update({ where: { id }, data }),
    delete: (id) => prisma_1.default.cliente.delete({ where: { id } })
};
