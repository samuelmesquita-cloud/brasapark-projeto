import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { AppError } from "../errors/AppError";

const SALT_ROUNDS = 10;

type RegisterInput = {
  nome: string;
  email: string;
  senha: string;
};

type LoginInput = {
  email: string;
  senha: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET nao configurado");
  }

  return secret;
}

function sanitizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createToken(user: { id: number; nome: string; email: string }) {
  return jwt.sign(
    {
      sub: user.id,
      nome: user.nome,
      email: user.email
    },
    getJwtSecret(),
    { expiresIn: "2h" }
  );
}

export const AuthService = {
  register: async (data: RegisterInput) => {
    const nome = data.nome.trim();
    const email = sanitizeEmail(data.email);

    const exists = await prisma.usuario.findUnique({ where: { email } });

    if (exists) {
      throw new AppError(409, "Email ja cadastrado", "email");
    }

    const senhaHash = await bcrypt.hash(data.senha, SALT_ROUNDS);

    const user = await prisma.usuario.create({
      data: { nome, email, senhaHash },
      select: { id: true, nome: true, email: true }
    });

    return { user, token: createToken(user) };
  },

  login: async (data: LoginInput) => {
    const email = sanitizeEmail(data.email || "");

    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      throw new AppError(401, "Credenciais invalidas");
    }

    const validPassword = await bcrypt.compare(data.senha, user.senhaHash);

    if (!validPassword) {
      throw new AppError(401, "Credenciais invalidas");
    }

    const safeUser = {
      id: user.id,
      nome: user.nome,
      email: user.email
    };

    return { user: safeUser, token: createToken(safeUser) };
  }
};
