import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import multer from "multer";
import { AppError } from "../errors/AppError";

export const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const allowedMimeTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/gif", ".gif"]
]);

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, UPLOAD_DIR),
  filename: (_req, file, callback) => {
    const extension = allowedMimeTypes.get(file.mimetype);
    callback(null, `${randomUUID()}${extension}`);
  }
});

export const uploadImage = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new AppError(400, "Tipo de arquivo nao permitido. Use JPEG, PNG ou GIF."));
      return;
    }

    callback(null, true);
  }
});
