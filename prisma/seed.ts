import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.cliente.deleteMany();
  await prisma.atracao.deleteMany();

  const atracao = await prisma.atracao.create({
    data: {
      nome: "Montanha Flamejante",
      descricao: "Montanha-russa radical",
      tipo: "Radical",
      alturaMin: 140,
      capacidade: 30,
      status: "Ativa"
    }
  });

  await prisma.cliente.create({
    data: {
      nome: "Sarah",
      email: "sarah@email.com",
      telefone: "99999-9999",
      atracaoId: atracao.id
    }
  });

  console.log("Seed OK");
}

main().finally(() => prisma.$disconnect());
