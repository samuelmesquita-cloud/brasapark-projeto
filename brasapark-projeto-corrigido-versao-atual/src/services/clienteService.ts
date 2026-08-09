import prisma from "../config/prisma";

type ClienteInput = {
  nome: string;
  email: string;
  telefone: string;
  atracaoId: number;
};

export const ClienteService = {
  findAll: () =>
    prisma.cliente.findMany({ include: { atracao: true } }),

  create: (data: ClienteInput) =>
    prisma.cliente.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        atracaoId: Number(data.atracaoId)
      }
    }),

  update: (id: number, data: Partial<ClienteInput>) =>
    prisma.cliente.update({
      where: { id },
      data: {
        ...data,
        atracaoId: data.atracaoId === undefined ? undefined : Number(data.atracaoId)
      }
    }),

  delete: (id: number) =>
    prisma.cliente.delete({ where: { id } })
};
