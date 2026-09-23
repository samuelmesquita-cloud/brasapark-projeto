import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { sendWelcomeEmail } from "../services/SendMail";

export const register = async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  if (process.env.NODE_ENV !== "test") {
    try {
      await sendWelcomeEmail(result.user);
    } catch (error) {
      console.error("[email] Falha ao enviar boas-vindas; cadastro mantido:", error);
    }
  }

  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.status(200).json(result);
};

export const me = async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  res.json({ user: authReq.user });
};
