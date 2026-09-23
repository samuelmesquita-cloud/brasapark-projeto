"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImageService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("../config/prisma"));
const upload_1 = require("../config/upload");
async function removeUploadedFile(publicPath) {
    const filename = path_1.default.basename(publicPath);
    await promises_1.default.unlink(path_1.default.join(upload_1.UPLOAD_DIR, filename)).catch(() => undefined);
}
exports.UserImageService = {
    findByUserId: (usuarioId) => prisma_1.default.userImage.findUnique({ where: { usuarioId } }),
    save: async (usuarioId, file) => {
        const caminho = `/uploads/${file.filename}`;
        const previous = await prisma_1.default.userImage.findUnique({ where: { usuarioId } });
        try {
            const image = await prisma_1.default.userImage.upsert({
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
        }
        catch (error) {
            await removeUploadedFile(caminho);
            throw error;
        }
    }
};
