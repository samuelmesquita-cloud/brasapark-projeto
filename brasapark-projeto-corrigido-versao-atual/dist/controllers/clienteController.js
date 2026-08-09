"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = void 0;
const clienteService_1 = require("../services/clienteService");
const getAll = async (req, res) => {
    const data = await clienteService_1.ClienteService.findAll();
    res.json(data);
};
exports.getAll = getAll;
const create = async (req, res) => {
    const { nome, email, telefone, atracaoId } = req.body;
    if (!nome || !email || !telefone || !atracaoId) {
        return res.status(400).json({ error: "Dados obrigatorios" });
    }
    const data = await clienteService_1.ClienteService.create(req.body);
    res.status(201).json(data);
};
exports.create = create;
const update = async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "ID invalido" });
    }
    const data = await clienteService_1.ClienteService.update(id, req.body);
    res.json(data);
};
exports.update = update;
const remove = async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "ID invalido" });
    }
    await clienteService_1.ClienteService.delete(id);
    res.sendStatus(204);
};
exports.remove = remove;
