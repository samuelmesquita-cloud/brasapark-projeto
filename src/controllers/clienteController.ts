import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";

export const getAll = async (req: Request, res: Response) => {
  const data = await ClienteService.findAll();
  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Dados obrigatórios" });
  }

  const data = await ClienteService.create(req.body);
  res.status(201).json(data);
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

export const remove = async (req, res) => {

   try{

      await atracaoService.remove(Number(req.params.id));

      return res.sendStatus(204);

   }catch(error){

      return res.status(404).json({
         message:"Atração não encontrada."
      });

   }

}
