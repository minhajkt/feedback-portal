import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = function (req: Request, file:Express.Multer.File, cb: FileFilterCallback) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, 
  },
  fileFilter: fileFilter,
});
