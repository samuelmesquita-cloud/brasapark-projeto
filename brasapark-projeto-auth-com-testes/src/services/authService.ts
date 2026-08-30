import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

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

    if (!nome || !email || !data.senha) {
      return { status: 400, body: { error: "Nome, email e senha sao obrigatorios" } };
    }

    if (data.senha.length < 6) {
      return { status: 400, body: { error: "A senha deve ter pelo menos 6 caracteres" } };
    }

    const exists = await prisma.usuario.findUnique({ where: { email } });

    if (exists) {
      return { status: 409, body: { error: "Email ja cadastrado" } };
    }

    const senhaHash = await bcrypt.hash(data.senha, SALT_ROUNDS);

    const user = await prisma.usuario.create({
      data: { nome, email, senhaHash },
      select: { id: true, nome: true, email: true }
    });

    return {
      status: 201,
      body: {
        user,
        token: createToken(user)
      }
    };
  },

  login: async (data: LoginInput) => {
    const email = sanitizeEmail(data.email || "");

    if (!email || !data.senha) {
      return { status: 400, body: { error: "Email e senha sao obrigatorios" } };
    }

    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      return { status: 401, body: { error: "Credenciais invalidas" } };
    }

    const validPassword = await bcrypt.compare(data.senha, user.senhaHash);

    if (!validPassword) {
      return { status: 401, body: { error: "Credenciais invalidas" } };
    }

    const safeUser = {
      id: user.id,
      nome: user.nome,
      email: user.email
    };

    return {
      status: 200,
      body: {
        user: safeUser,
        token: createToken(safeUser)
      }
    };
  }
};
