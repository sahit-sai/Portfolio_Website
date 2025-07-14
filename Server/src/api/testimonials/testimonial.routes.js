import express from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "./testimonial.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

// Debug middleware to log all requests
router.use((req, res, next) => {
  console.log("=== Testimonial Route Debug ===");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Content-Type:", req.headers['content-type']);
  console.log("Authorization:", req.headers.authorization ? "Present" : "Missing");
  next();
});

router
  .route("/")
  .get(getTestimonials)
  .post(protect, upload.single("image"), createTestimonial);

router
  .route("/:id")
  .put(protect, upload.single("image"), updateTestimonial)
  .delete(protect, deleteTestimonial);

export default router;
