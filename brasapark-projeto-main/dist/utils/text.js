"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeEmail = normalizeEmail;
exports.parseBearerToken = parseBearerToken;
exports.safeDecodeURIComponent = safeDecodeURIComponent;
function normalizeEmail(value) {
    return (value || "").trim().toLowerCase();
}
function parseBearerToken(header) {
    if (!header?.startsWith("Bearer "))
        return null;
    const token = header.slice("Bearer ".length).trim();
    return token || null;
}
function safeDecodeURIComponent(value) {
    try {
        return decodeURIComponent(value);
    }
    catch {
        return null;
    }
}
