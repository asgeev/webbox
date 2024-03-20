import express from "express";
import multer from "multer";
import { MIME_TYPE_MAP } from "./mimesWhiteList";

const maxFileSize = 10 * 1000 * 1000;

const storage = multer.diskStorage({
  destination: function (req: express.Request, file: Express.Multer.File, cb) {
    cb(null, "./uploads");
  },
  filename: (req: express.Request, file: Express.Multer.File, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
  fileFilter: async (
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    if (MIME_TYPE_MAP.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
