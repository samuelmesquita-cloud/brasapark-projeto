import { z } from "zod";

const atracaoBody = z.object({
  nome: z.string({ required_error: "O nome e obrigatorio" }).trim().min(3, "O nome deve ter pelo menos 3 caracteres").max(100),
  descricao: z.string().trim().max(500, "A descricao deve ter no maximo 500 caracteres").optional().default(""),
  tipo: z.string({ required_error: "O tipo e obrigatorio" }).trim().min(3, "O tipo deve ter pelo menos 3 caracteres").max(50),
  alturaMin: z.coerce.number().int("A altura minima deve ser inteira").nonnegative("A altura minima nao pode ser negativa"),
  capacidade: z.coerce.number().int("A capacidade deve ser inteira").positive("A capacidade deve ser positiva"),
  status: z.enum(["Ativa", "Manutencao", "Inativa"], { errorMap: () => ({ message: "Status invalido" }) })
});

export const createAtracaoSchema = z.object({ body: atracaoBody.strict("Campo nao permitido") });
export const updateAtracaoSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive("O ID deve ser positivo") }),
  body: atracaoBody.partial().refine((data) => Object.keys(data).length > 0, "Informe ao menos um campo")
});

export const listAtracoesSchema = z.object({
  query: z.object({
    status: z.enum(["Ativa", "Manutencao", "Inativa"]).optional(),
    limit: z.coerce.number().int().positive("O limite deve ser positivo").max(100, "O limite maximo e 100").optional()
  }).strict("Parametro de consulta invalido")
});
