"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.get = void 0;
const AppError_1 = require("../errors/AppError");
const userImageService_1 = require("../services/userImageService");
function getAuthenticatedUserId(req) {
    const userId = req.user?.id;
    if (!userId)
        throw new AppError_1.AppError(401, "Usuario nao autenticado");
    return userId;
}
const get = async (req, res) => {
    const image = await userImageService_1.UserImageService.findByUserId(getAuthenticatedUserId(req));
    res.json({ image });
};
exports.get = get;
const upload = async (req, res) => {
    if (!req.file)
        throw new AppError_1.AppError(400, "Envie uma imagem no campo image");
    const result = await userImageService_1.UserImageService.save(getAuthenticatedUserId(req), req.file);
    res.status(201).json({
        message: result.replaced ? "Imagem atualizada com sucesso" : "Imagem enviada com sucesso",
        path: result.image.caminho,
        image: result.image,
        replaced: result.replaced
    });
};
exports.upload = upload;
