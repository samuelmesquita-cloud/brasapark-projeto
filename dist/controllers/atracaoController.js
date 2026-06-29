"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = void 0;
const atracaoService_1 = require("../services/atracaoService");
const getAll = async (req, res) => {
    const data = await atracaoService_1.AtracaoService.findAll();
    res.json(data);
};
exports.getAll = getAll;
const create = async (req, res) => {
    if (!req.body.nome) {
        return res.status(400).json({ error: "Nome obrigatório" });
    }
    const result = await atracaoService_1.AtracaoService.create(req.body);
    res.status(201).json(result);
};
exports.create = create;
const update = async (req, res) => {
    const id = Number(req.params.id);
    const result = await atracaoService_1.AtracaoService.update(id, req.body);
    res.json(result);
};
exports.update = update;
const remove = async (req, res) => {
    const id = Number(req.params.id);
    await atracaoService_1.AtracaoService.delete(id);
    res.sendStatus(204);
};
exports.remove = remove;
