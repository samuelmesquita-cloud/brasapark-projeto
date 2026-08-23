import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.cliente.deleteMany();
  await prisma.atracao.deleteMany();
  await prisma.usuario.deleteMany();

  const senhaHash = await bcrypt.hash("123456", 10);

  await prisma.usuario.create({
    data: {
      nome: "Sarah Admin",
      email: "admin@brasapark.com",
      senhaHash
    }
  });

  const atracao = await prisma.atracao.create({
    data: {
      nome: "Montanha Flamejante",
      descricao: "Montanha-russa radical com curvas intensas e efeitos de fogo.",
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
  console.log("Usuario demo: admin@brasapark.com / 123456");
}

main().finally(() => prisma.$disconnect());
