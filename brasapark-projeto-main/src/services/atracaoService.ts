import prisma from "../config/prisma";

type AtracaoInput = {
  nome: string;
  descricao?: string;
  tipo?: string;
  alturaMin?: number;
  capacidade?: number;
  status?: string;
};

export const AtracaoService = {
  findAll: (filters: { status?: string; limit?: number } = {}) =>
    prisma.atracao.findMany({
      where: filters.status ? { status: filters.status } : undefined,
      take: filters.limit,
      include: { clientes: true }
    }),

  create: (data: AtracaoInput) =>
    prisma.atracao.create({
      data: {
        nome: data.nome,
        descricao: data.descricao || null,
        tipo: data.tipo || "Familiar",
        alturaMin: Number(data.alturaMin) || 0,
        capacidade: Number(data.capacidade) || 0,
        status: data.status || "Ativa"
      }
    }),

  update: (id: number, data: Partial<AtracaoInput>) =>
    prisma.atracao.update({
      where: { id },
      data: {
        ...data,
        alturaMin: data.alturaMin === undefined ? undefined : Number(data.alturaMin),
        capacidade: data.capacidade === undefined ? undefined : Number(data.capacidade)
      }
    }),

  delete: (id: number) =>
    prisma.atracao.delete({ where: { id } })
};
