"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(status, message, field) {
        super(message);
        this.status = status;
        this.field = field;
        this.name = "AppError";
    }
}
exports.AppError = AppError;
