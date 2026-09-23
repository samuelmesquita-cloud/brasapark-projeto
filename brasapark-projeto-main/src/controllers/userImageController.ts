import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { UserImageService } from "../services/userImageService";

function getAuthenticatedUserId(req: Request) {
  const userId = (req as AuthenticatedRequest).user?.id;
  if (!userId) throw new AppError(401, "Usuario nao autenticado");
  return userId;
}

export const get = async (req: Request, res: Response) => {
  const image = await UserImageService.findByUserId(getAuthenticatedUserId(req));
  res.json({ image });
};

export const upload = async (req: Request, res: Response) => {
  if (!req.file) throw new AppError(400, "Envie uma imagem no campo image");

  const result = await UserImageService.save(getAuthenticatedUserId(req), req.file);
  res.status(201).json({
    message: result.replaced ? "Imagem atualizada com sucesso" : "Imagem enviada com sucesso",
    path: result.image.caminho,
    image: result.image,
    replaced: result.replaced
  });
};
