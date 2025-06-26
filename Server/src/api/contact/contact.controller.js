import Contact from "./contact.model.js";
import { sendMail } from "../../utils/emailService.js";

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

    // Send email notification to admin
    try {
      const emailSubject = `New Contact Form Submission: ${subject}`;

      // Enhanced text version
      const textContent = `
🔔 NEW CONTACT FORM SUBMISSION
================================

📋 CONTACT DETAILS:
Name: ${contact.name}
Email: ${contact.email}
Subject: ${contact.subject}

💬 MESSAGE:
${contact.message}

📊 SUBMISSION INFO:
Status: ${contact.status}
Priority: ${contact.priority}
Active: ${contact.isActive ? "Yes" : "No"}
Submission ID: ${contact._id}
Submitted At: ${new Date(contact.createdAt).toLocaleString()}
Last Updated: ${new Date(contact.updatedAt).toLocaleString()}

================================
This is an automated notification from your contact form.
      `.trim();

      // Enhanced HTML version with attractive styling
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">📧 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">You have received a new message from your website</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
            
            <!-- Contact Information -->
            <div style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">👤 Contact Information</h2>
                
                <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #555; display: inline-block; width: 80px;">Name:</strong>
                        <span style="color: #333; font-weight: 500;">${
                          contact.name
                        }</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #555; display: inline-block; width: 80px;">Email:</strong>
                        <a href="mailto:${
                          contact.email
                        }" style="color: #667eea; text-decoration: none;">${
        contact.email
      }</a>
                    </div>
                    <div>
                        <strong style="color: #555; display: inline-block; width: 80px;">Subject:</strong>
                        <span style="color: #333; font-weight: 500;">${
                          contact.subject
                        }</span>
                    </div>
                </div>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">💬 Message</h2>
                <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                    <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${
                      contact.message
                    }</p>
                </div>
            </div>

            <!-- Submission Details -->
            <div style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📊 Submission Details</h2>
                
                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; flex: 1; min-width: 200px; border: 1px solid #e1ecf4;">
                        <div style="font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Status</div>
                        <div style="font-size: 16px; color: #333; font-weight: 500;">
                            <span style="background-color: ${
                              contact.status === "new" ? "#28a745" : "#ffc107"
                            }; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">${
        contact.status
      }</span>
                        </div>
                    </div>
                    
                    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; flex: 1; min-width: 200px; border: 1px solid #e1ecf4;">
                        <div style="font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Priority</div>
                        <div style="font-size: 16px; color: #333; font-weight: 500;">
                            <span style="background-color: ${
                              contact.priority === "high"
                                ? "#dc3545"
                                : contact.priority === "medium"
                                ? "#ffc107"
                                : "#28a745"
                            }; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">${
        contact.priority
      }</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 15px;">
                    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; flex: 1; min-width: 200px; border: 1px solid #e1ecf4;">
                        <div style="font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Active Status</div>
                        <div style="font-size: 16px; color: #333; font-weight: 500;">
                            ${contact.isActive ? "✅ Active" : "❌ Inactive"}
                        </div>
                    </div>
                    
                    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; flex: 1; min-width: 200px; border: 1px solid #e1ecf4;">
                        <div style="font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Submission ID</div>
                        <div style="font-size: 14px; color: #666; font-family: monospace;">${
                          contact._id
                        }</div>
                    </div>
                </div>
            </div>

            <!-- Timestamps -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
                <h3 style="color: #333; font-size: 16px; margin: 0 0 15px 0;">🕒 Timestamps</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <strong style="color: #555; font-size: 14px;">Submitted:</strong><br>
                        <span style="color: #333; font-size: 14px;">${new Date(
                          contact.createdAt
                        ).toLocaleString()}</span>
                    </div>
                    <div>
                        <strong style="color: #555; font-size: 14px;">Last Updated:</strong><br>
                        <span style="color: #333; font-size: 14px;">${new Date(
                          contact.updatedAt
                        ).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0; color: #666; font-size: 12px;">
                This is an automated notification from your contact form.<br>
                Please do not reply to this email directly.
            </p>
        </div>
    </div>
</body>
</html>
      `;

      await sendMail({
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Always send to admin
        from: process.env.EMAIL_USER,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        success: false,
        message: "Contact saved, but failed to send email notification.",
        error: emailError.message,
      });
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
      throw new Error("Message not found");
    }

    await message.deleteOne();
    res.json({ message: "Message removed" });
  } catch (error) {
    next(error);
  }
};
