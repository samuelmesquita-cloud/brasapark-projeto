"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.MAX_IMAGE_SIZE = exports.UPLOAD_DIR = void 0;
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const AppError_1 = require("../errors/AppError");
exports.UPLOAD_DIR = path_1.default.resolve(process.cwd(), "uploads");
exports.MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const allowedMimeTypes = new Map([
    ["image/jpeg", ".jpg"],
    ["image/png", ".png"],
    ["image/gif", ".gif"]
]);
fs_1.default.mkdirSync(exports.UPLOAD_DIR, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => callback(null, exports.UPLOAD_DIR),
    filename: (_req, file, callback) => {
        const extension = allowedMimeTypes.get(file.mimetype);
        callback(null, `${(0, crypto_1.randomUUID)()}${extension}`);
    }
});
exports.uploadImage = (0, multer_1.default)({
    storage,
    limits: { fileSize: exports.MAX_IMAGE_SIZE, files: 1 },
    fileFilter: (_req, file, callback) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
            callback(new AppError_1.AppError(400, "Tipo de arquivo nao permitido. Use JPEG, PNG ou GIF."));
            return;
        }
        callback(null, true);
    }
});
