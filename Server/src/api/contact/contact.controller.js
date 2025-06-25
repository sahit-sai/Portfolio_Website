import Contact from './contact.model.js';
import { sendMail } from '../../utils/emailService.js';

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const contact = await newContact.save();

    // Send email notification
    try {
      await sendMail({
        to: process.env.EMAIL_USER, // Your email address
        from: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
        html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't block the response to the user if the email fails
    }

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
export const getContactMessages = async (req, res, next) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContactMessage = async (req, res, next) => {
    try {
        const message = await Contact.findById(req.params.id);

        if (!message) {
            res.status(404);
            throw new Error('Message not found');
        }

        await message.deleteOne();
        res.json({ message: 'Message removed' });
    } catch (error) {
        next(error);
    }
};
