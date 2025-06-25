import express from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addCommentToBlog,
} from "./blog.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, upload.single("image"), createBlog);
router
  .route("/:id")
  .get(getBlogById)
  .put(protect, upload.single("image"), updateBlog)
  .delete(protect, deleteBlog);

router.route("/:id/like").put(likeBlog);
router.route("/:id/comments").post(addCommentToBlog);

export default router;
