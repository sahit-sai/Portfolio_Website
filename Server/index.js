import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/api/auth/auth.routes.js";
import projectRoutes from "./src/api/projects/project.routes.js";
import testimonialRoutes from "./src/api/testimonials/testimonial.routes.js";
import contactRoutes from "./src/api/contact/contact.routes.js";
import blogRoutes from "./src/api/blogs/blog.routes.js";
import subscriberRoutes from "./src/api/subscribers/subscriber.routes.js";
import timelineRoutes from "./src/api/timeline/timeline.routes.js";
import uploadRoutes from "./src/api/upload/upload.routes.js";
import { handleMulterError } from "./src/middleware/upload.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:8080",
  "https://portfolio-website-pi-drab-56.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.options("*", cors());

// Static folder for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
console.log("Registering API routes...");
app.use("/api/auth", authRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
console.log("Contact routes registered at /api/contact");
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/upload", uploadRoutes);

// Add multer error handling
app.use(handleMulterError);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("=== ERROR MIDDLEWARE ===");
  console.error("Error:", err);
  console.error("Error stack:", err.stack);
  console.error("Request URL:", req.url);
  console.error("Request method:", req.method);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something broke!";
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
