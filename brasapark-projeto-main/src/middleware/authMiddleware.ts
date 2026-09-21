import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AuthenticatedRequest = Request & {
  user?: {
    id: number;
    nome: string;
    email: string;
  };
};

type TokenPayload = {
  sub: number;
  nome: string;
  email: string;
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthenticatedRequest;
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token nao informado" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ error: "JWT_SECRET nao configurado" });
    return;
  }

  try {
    const payload = jwt.verify(token, secret);

    if (
      typeof payload !== "object" ||
      typeof payload.sub !== "number" ||
      typeof payload.nome !== "string" ||
      typeof payload.email !== "string"
    ) {
      res.status(401).json({ error: "Token invalido ou expirado" });
      return;
    }

    authReq.user = {
      id: payload.sub,
      nome: payload.nome,
      email: payload.email
    };

    next();
  } catch {
    res.status(401).json({ error: "Token invalido ou expirado" });
  }
}
