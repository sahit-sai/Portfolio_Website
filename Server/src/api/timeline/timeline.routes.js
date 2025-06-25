import express from 'express';
import {
  getTimelineItems,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
} from './timeline.controller.js';
import { protect as authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getTimelineItems);
router.post('/', authMiddleware, createTimelineItem);
router.put('/:id', authMiddleware, updateTimelineItem);
router.delete('/:id', authMiddleware, deleteTimelineItem);

export default router;
