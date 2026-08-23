import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  res.status(result.status).json(result.body);
};

export const login = async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.status(result.status).json(result.body);
};

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};
