import Testimonial from "./testimonial.model.js";
import fs from "fs";
import path from "path";

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Private
export const createTestimonial = async (req, res, next) => {
  const { name, company, quote, rating } = req.body;
  const image = req.file ? `/uploads/testimonials/${req.file.filename}` : null;

  try {
    const newTestimonial = new Testimonial({
      name,
      company,
      quote,
      rating,
      image,
    });

    // Debug log for image path and file existence
    console.log("Testimonial image field:", image);
    if (image) {
      const fsPath = path.resolve(
        "Server",
        image.replace("/uploads/", "uploads/")
      );
      console.log("Expected file system path:", fsPath);
      console.log("File exists:", fs.existsSync(fsPath));
    }

    const testimonial = await newTestimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
export const updateTestimonial = async (req, res, next) => {
  const { name, company, quote, rating } = req.body;

  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      res.status(404);
      throw new Error("Testimonial not found");
    }

    let image = testimonial.image;
    if (req.file) {
      // If there's a new image, update the path
      image = `/uploads/testimonials/${req.file.filename}`;
      // And delete the old image from the filesystem
      if (testimonial.image) {
        const oldImagePath = path.resolve(
          "Server",
          "uploads",
          "testimonials",
          path.basename(testimonial.image)
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    testimonial.name = name || testimonial.name;
    testimonial.company = company || testimonial.company;
    testimonial.quote = quote || testimonial.quote;
    testimonial.rating = rating || testimonial.rating;
    testimonial.image = image;

    testimonial = await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      res.status(404);
      throw new Error("Testimonial not found");
    }

    // Delete the image from the filesystem
    if (testimonial.image) {
      const imagePath = path.resolve(
        "Server",
        "uploads",
        "testimonials",
        path.basename(testimonial.image)
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await testimonial.deleteOne();
    res.json({ message: "Testimonial removed" });
  } catch (error) {
    next(error);
  }
};
