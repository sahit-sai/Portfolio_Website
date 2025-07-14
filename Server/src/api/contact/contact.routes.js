import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
} from './contact.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Debug middleware to log all contact requests
router.use((req, res, next) => {
  console.log("=== Contact Route Debug ===");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Full URL:", req.originalUrl);
  console.log("Content-Type:", req.headers['content-type']);
  next();
});

// @route   POST /api/contact
// @desc    Create a new contact message
// @access  Public
router.post('/', createContactMessage);

// Test route to verify contact routes are working
router.get('/test', (req, res) => {
  console.log("Contact test route hit!");
  res.json({ message: 'Contact routes are working!' });
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private
router.get('/', protect, getContactMessages);

// @route   DELETE /api/contact/:id
// @desc    Delete a contact message
// @access  Private
router.delete('/:id', protect, deleteContactMessage);

export default router;
