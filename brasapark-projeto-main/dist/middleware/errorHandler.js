"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = asyncHandler;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const AppError_1 = require("../errors/AppError");
function asyncHandler(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: "Dados invalidos",
            issues: err.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message
            }))
        });
        return;
    }
    if (err instanceof AppError_1.AppError) {
        res.status(err.status).json({
            error: err.message,
            ...(err.field ? { field: err.field } : {})
        });
        return;
    }
    if (err?.code === "P2025") {
        res.status(404).json({ error: "Registro nao encontrado" });
        return;
    }
    if (err?.code === "P2002") {
        res.status(409).json({ error: "Registro duplicado", field: "email" });
        return;
    }
    if (err?.code === "P2003") {
        res.status(400).json({ error: "Referencia invalida" });
        return;
    }
    console.error("Erro nao tratado:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
}
