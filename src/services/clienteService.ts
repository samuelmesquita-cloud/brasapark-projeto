import prisma from "../config/prisma";

export const ClienteService = {
  findAll: () =>
    prisma.cliente.findMany({ include: { atracao: true } }),

  create: (data: any) =>
    prisma.cliente.create({ data }),

  update: (id: number, data: any) =>
    prisma.cliente.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.cliente.delete({ where: { id } })
};
