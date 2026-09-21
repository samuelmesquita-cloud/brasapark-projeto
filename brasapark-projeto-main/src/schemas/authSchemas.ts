import { z } from "zod";

const email = z.string({ required_error: "O email e obrigatorio" })
  .trim()
  .email("Informe um email valido")
  .max(120, "O email deve ter no maximo 120 caracteres")
  .transform((value) => value.toLowerCase());

export const registerSchema = z.object({
  body: z.object({
    nome: z.string({ required_error: "O nome e obrigatorio" })
      .trim()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(100, "O nome deve ter no maximo 100 caracteres"),
    email,
    senha: z.string({ required_error: "A senha e obrigatoria" })
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(72, "A senha deve ter no maximo 72 caracteres")
  }).strict("Campo nao permitido no cadastro")
});

export const loginSchema = z.object({
  body: z.object({
    email,
    senha: z.string({ required_error: "A senha e obrigatoria" }).min(1, "A senha e obrigatoria")
  }).strict("Campo nao permitido no login")
});
