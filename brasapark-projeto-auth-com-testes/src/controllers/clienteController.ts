import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";

export const getAll = async (req: Request, res: Response) => {
  const data = await ClienteService.findAll();
  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  const { nome, email, telefone, atracaoId } = req.body;

  if (!nome || !email || !telefone || !atracaoId) {
    return res.status(400).json({ error: "Dados obrigatorios" });
  }

  const data = await ClienteService.create(req.body);
  res.status(201).json(data);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID invalido" });
  }

  const data = await ClienteService.update(id, req.body);
  res.json(data);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID invalido" });
  }

  await ClienteService.delete(id);
  res.sendStatus(204);
};
