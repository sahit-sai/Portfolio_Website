import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./project.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProjects)
  .post(protect, createProject);

router
  .route("/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
