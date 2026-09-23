export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const imageExtensions: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif"
};

export function getImageExtension(mimeType: string | undefined) {
  return mimeType ? imageExtensions[mimeType] || null : null;
}

export function isImageSizeAllowed(size: number) {
  return Number.isFinite(size) && size > 0 && size <= MAX_IMAGE_SIZE;
}
