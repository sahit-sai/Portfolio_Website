import Subscriber from "./subscriber.model.js";
import { sendMail } from "../../utils/emailService.js";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: "You are already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send a confirmation email
    try {
      await sendMail({
        to: email,
        subject: "Subscription Confirmation",
        text: "Thank you for subscribing to our newsletter!",
        html: "<b>Thank you for subscribing to our newsletter!</b>",
      });
    } catch (error) {
      console.error("Error sending subscription email:", error);
      // We can decide if we want to fail the request if the email fails
      // For now, we'll just log it and continue
    }

    res.status(201).json({
      message:
        "Subscription successful! Please check your email for confirmation.",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during subscription.",
      error: error.message,
    });
  }
};
