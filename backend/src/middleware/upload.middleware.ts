import fs from "fs";
import path from "path";
import multer from "multer";
import { config } from "@/config";
import { assertAllowedImage, safeUploadName } from "@/utils/file-upload";

const uploadPath = path.resolve(process.cwd(), config.UPLOAD_DIR);
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadPath),
  filename: (_req, file, callback) => callback(null, safeUploadName(file.originalname))
});

export const upload = multer({
  storage,
  limits: {
    fileSize: config.maxUploadSizeBytes
  },
  fileFilter: (_req, file, callback) => {
    try {
      assertAllowedImage(file.mimetype);
      callback(null, true);
    } catch (error) {
      callback(error as Error);
    }
  }
});
