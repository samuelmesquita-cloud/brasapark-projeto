"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.UPLOAD_DIR = void 0;
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const AppError_1 = require("../errors/AppError");
const image_1 = require("../utils/image");
exports.UPLOAD_DIR = path_1.default.resolve(process.cwd(), "uploads");
fs_1.default.mkdirSync(exports.UPLOAD_DIR, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => callback(null, exports.UPLOAD_DIR),
    filename: (_req, file, callback) => {
        const extension = (0, image_1.getImageExtension)(file.mimetype);
        callback(null, `${(0, crypto_1.randomUUID)()}${extension}`);
    }
});
exports.uploadImage = (0, multer_1.default)({
    storage,
    limits: { fileSize: image_1.MAX_IMAGE_SIZE, files: 1 },
    fileFilter: (_req, file, callback) => {
        if (!(0, image_1.getImageExtension)(file.mimetype)) {
            callback(new AppError_1.AppError(400, "Tipo de arquivo nao permitido. Use JPEG, PNG ou GIF."));
            return;
        }
        callback(null, true);
    }
});
