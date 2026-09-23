import { z } from "zod";

const clienteBody = z.object({
  nome: z.string({ required_error: "O nome e obrigatorio" }).trim().min(3, "O nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string({ required_error: "O email e obrigatorio" }).trim().email("Informe um email valido").max(120).transform((value) => value.toLowerCase()),
  telefone: z.string({ required_error: "O telefone e obrigatorio" }).trim().regex(/^\+?[0-9 ()-]{8,20}$/, "Informe um telefone valido"),
  atracaoId: z.coerce.number().int("O ID da atracao deve ser inteiro").positive("O ID da atracao deve ser positivo")
});

export const createClienteSchema = z.object({ body: clienteBody.strict("Campo nao permitido") });
export const updateClienteSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive("O ID deve ser positivo") }),
  body: clienteBody.partial().refine((data) => Object.keys(data).length > 0, "Informe ao menos um campo")
});
