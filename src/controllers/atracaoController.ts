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

export const update = async (req, res) => {
  try {
    const atracao = await atracaoService.update(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(atracao);

  } catch (error) {

    return res.status(404).json({
      message: "Atração não encontrada."
    });

  }
}

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await AtracaoService.delete(id);
  res.sendStatus(204);
};
