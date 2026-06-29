-- CreateTable
CREATE TABLE "Atracao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "alturaMin" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Ativa'
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "atracaoId" INTEGER NOT NULL,
    CONSTRAINT "Cliente_atracaoId_fkey" FOREIGN KEY ("atracaoId") REFERENCES "Atracao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
