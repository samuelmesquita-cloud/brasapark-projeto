import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main(){

 const atracao = await prisma.atracao.upsert({
  where:{id:1},
  update:{},
  create:{
   nome:"Montanha Russa",
   descricao:"Grande atração do parque",
   tipo:"Radical",
   capacidade:30,
   alturaMinima:120
  }
 });

 await prisma.cliente.upsert({
  where:{email:"cliente@email.com"},
  update:{},
  create:{
   nome:"Cliente Teste",
   email:"cliente@email.com",
   telefone:"83999999999",
   atracaoId:atracao.id
  }
 });

}

main().finally(()=>prisma.$disconnect());
