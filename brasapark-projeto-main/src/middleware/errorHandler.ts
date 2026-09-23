import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import multer from "multer";

export function asyncHandler(handler: RequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof multer.MulterError) {
    const message = err.code === "LIMIT_FILE_SIZE"
      ? "A imagem deve ter no maximo 2 MB"
      : err.code === "LIMIT_UNEXPECTED_FILE"
        ? "Use apenas o campo image para enviar uma imagem"
        : "Arquivo invalido";

    res.status(400).json({ error: message, code: err.code });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Dados invalidos",
      issues: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.status).json({
      error: err.message,
      ...(err.field ? { field: err.field } : {})
    });
    return;
  }

  if (err?.code === "P2025") {
    res.status(404).json({ error: "Registro nao encontrado" });
    return;
  }

  if (err?.code === "P2002") {
    res.status(409).json({ error: "Registro duplicado", field: "email" });
    return;
  }

  if (err?.code === "P2003") {
    res.status(400).json({ error: "Referencia invalida" });
    return;
  }

  console.error("Erro nao tratado:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
}
