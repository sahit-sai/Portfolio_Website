import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./project.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProjects)
  .post(protect, upload.single("image"), createProject);

router
  .route("/:id")
  .put(protect, upload.single("image"), updateProject)
  .delete(protect, deleteProject);

export default router;
