"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_IMAGE_SIZE = void 0;
exports.getImageExtension = getImageExtension;
exports.isImageSizeAllowed = isImageSizeAllowed;
exports.MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const imageExtensions = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif"
};
function getImageExtension(mimeType) {
    return mimeType ? imageExtensions[mimeType] || null : null;
}
function isImageSizeAllowed(size) {
    return Number.isFinite(size) && size > 0 && size <= exports.MAX_IMAGE_SIZE;
}
