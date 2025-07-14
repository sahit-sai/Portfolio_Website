import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("=== Multer Storage Destination ===");
    console.log("File fieldname:", file.fieldname);
    console.log("File originalname:", file.originalname);
    console.log("File mimetype:", file.mimetype);
    
    let uploadPath = "uploads/";

    // Determine upload path based on fieldname
    switch (file.fieldname) {
      case "image": // Accept 'image' for testimonials
      case "testimonialImage":
        uploadPath += "testimonials/";
        break;
      case "projectImage":
        uploadPath += "projects/";
        break;
      case "blogImage":
        uploadPath += "blogs/";
        break;
      default:
        uploadPath += "misc/";
    }

    console.log("Upload path determined:", uploadPath);
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log("=== Multer Filename Generation ===");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + ext;
    console.log("Generated filename:", filename);
    cb(null, filename);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  console.log("=== Multer File Filter ===");
  console.log("File:", file);
  
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  console.log("Extension valid:", extname);
  console.log("Mimetype valid:", mimetype);

  if (mimetype && extname) {
    console.log("File filter: ACCEPTED");
    return cb(null, true);
  } else {
    console.log("File filter: REJECTED");
    cb(new Error("Only image files (jpeg, jpg, png, gif, webp) are allowed!"));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Maximum size is 5MB." });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json({ message: "Unexpected field name for file upload." });
    }
  }

  if (err.message.includes("Only image files")) {
    return res.status(400).json({ message: err.message });
  }

  next(err);
};

export { upload, handleMulterError };
