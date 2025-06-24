import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from './testimonial.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { upload } from '../../middleware/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(protect, upload.single('image'), createTestimonial);

router.route('/:id')
  .put(protect, upload.single('image'), updateTestimonial)
  .delete(protect, deleteTestimonial);

export default router;
