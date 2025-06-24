import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
} from './contact.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Create a new contact message
// @access  Public
router.post('/', createContactMessage);

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private
router.get('/', protect, getContactMessages);

// @route   DELETE /api/contact/:id
// @desc    Delete a contact message
// @access  Private
router.delete('/:id', protect, deleteContactMessage);

export default router;
