import { Request, Response } from "express";
import { AtracaoService } from "../services/atracaoService";

export const getAll = async (req: Request, res: Response) => {
  const data = await AtracaoService.findAll();
  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  if (!req.body.nome) {
    return res.status(400).json({ error: "Nome obrigatório" });
  }

  const result = await AtracaoService.create(req.body);
  res.status(201).json(result);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await AtracaoService.update(id, req.body);
  res.json(result);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await AtracaoService.delete(id);
  res.sendStatus(204);
};
