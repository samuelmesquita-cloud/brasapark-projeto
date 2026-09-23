import fs from "fs/promises";
import path from "path";
import prisma from "../config/prisma";
import { UPLOAD_DIR } from "../config/upload";

async function removeUploadedFile(publicPath: string) {
  const filename = path.basename(publicPath);
  await fs.unlink(path.join(UPLOAD_DIR, filename)).catch(() => undefined);
}

export const UserImageService = {
  findByUserId: (usuarioId: number) =>
    prisma.userImage.findUnique({ where: { usuarioId } }),

  save: async (usuarioId: number, file: Express.Multer.File) => {
    const caminho = `/uploads/${file.filename}`;
    const previous = await prisma.userImage.findUnique({ where: { usuarioId } });

    try {
      const image = await prisma.userImage.upsert({
        where: { usuarioId },
        create: {
          usuarioId,
          caminho,
          mimeType: file.mimetype,
          tamanho: file.size,
          nomeOriginal: file.originalname
        },
        update: {
          caminho,
          mimeType: file.mimetype,
          tamanho: file.size,
          nomeOriginal: file.originalname
        }
      });

      if (previous && previous.caminho !== caminho) {
        await removeUploadedFile(previous.caminho);
      }

      return { image, replaced: Boolean(previous) };
    } catch (error) {
      await removeUploadedFile(caminho);
      throw error;
    }
  }
};
