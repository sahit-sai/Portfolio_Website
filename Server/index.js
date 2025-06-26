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
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL.split(",").map((origin) =>
  origin.trim()
);
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

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
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/upload", uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
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
