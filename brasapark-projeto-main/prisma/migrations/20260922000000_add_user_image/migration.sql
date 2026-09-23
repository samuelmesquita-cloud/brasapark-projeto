CREATE TABLE "UserImage" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "caminho" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "tamanho" INTEGER NOT NULL,
  "nomeOriginal" TEXT NOT NULL,
  "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "atualizadoEm" DATETIME NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  CONSTRAINT "UserImage_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "UserImage_usuarioId_key" ON "UserImage"("usuarioId");
