import path from "path";
import { ApiError } from "@/utils/api-error";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

export function assertAllowedImage(mimeType: string) {
  if (!allowedMimeTypes.includes(mimeType)) {
    throw new ApiError(400, "Only jpg, png, and webp uploads are allowed", "INVALID_UPLOAD_TYPE");
  }
}

export function safeUploadName(originalName: string) {
  const extension = path.extname(originalName).toLowerCase();
  const base = path
    .basename(originalName, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `${base || "upload"}-${Date.now()}${extension}`;
}
