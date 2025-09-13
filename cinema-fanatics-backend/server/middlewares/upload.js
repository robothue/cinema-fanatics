// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Decide storage type from env
const driver = process.env.UPLOAD_DRIVER || "local";

let storage;

if (driver === "cloudinary") {
  // ☁️ Cloudinary storage
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "cinema-fanatics/avatars",
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  });
} else {
  // 💾 Local storage
  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  });
}

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only .jpeg, .jpg and .png allowed!"));
  },
});

module.exports = upload;
