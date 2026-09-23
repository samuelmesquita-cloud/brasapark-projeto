import { z } from "zod";

export const idParamsSchema = z.object({
  params: z.object({
    id: z.coerce
      .number({ invalid_type_error: "O ID deve ser numerico" })
      .int("O ID deve ser inteiro")
      .positive("O ID deve ser positivo")
  })
});

export const emptyQuerySchema = z.object({
  query: z.object({}).strict("A consulta nao aceita parametros")
});
