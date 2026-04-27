import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const name = file?.originalname || "file.png";
    const ext = path.extname(name);

    cb(null, Date.now() + ext);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("FILE RECEIVED:", file?.mimetype);

  const allowed = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});