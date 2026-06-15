import prisma from "../config/prisma";

export const AtracaoService = {
  findAll: () =>
    prisma.atracao.findMany({ include: { clientes: true } }),

  create: (data: any) =>
    prisma.atracao.create({ data }),

  update: (id: number, data: any) =>
    prisma.atracao.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.atracao.delete({ where: { id } })
};
