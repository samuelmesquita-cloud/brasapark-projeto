import { Request, Response, NextFunction, RequestHandler } from "express";

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
  console.error(err);

  if (err?.code === "P2025") {
    res.status(404).json({ error: "Registro nao encontrado" });
    return;
  }

  if (err?.code === "P2002") {
    res.status(409).json({ error: "Registro duplicado" });
    return;
  }

  if (err?.code === "P2003") {
    res.status(400).json({ error: "Referencia invalida" });
    return;
  }

  res.status(500).json({ error: "Erro interno do servidor" });
}
