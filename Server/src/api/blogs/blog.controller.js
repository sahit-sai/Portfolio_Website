import Blog from "./blog.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { sendMail } from "../../utils/emailService.js";

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.json(blogs);
});

// @desc    Get a single blog post
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid blog ID");
  }
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, author, tags, category, featured, trending, image } =
    req.body;

  if (!image) {
    throw new Error("Image URL is required");
  }

  const newBlog = new Blog({
    title,
    content,
    author,
    image,
    tags,
    category,
    featured,
    trending,
  });

  const createdBlog = await newBlog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, author, tags, category, featured, trending, image } =
    req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.tags = tags || blog.tags;
    blog.category = category || blog.category;
    blog.featured = featured !== undefined ? featured : blog.featured;
    blog.trending = trending !== undefined ? trending : blog.trending;
    blog.image = image || blog.image;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.deleteOne(); // Corrected from remove()
    res.json({ message: "Blog post removed" });
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

// @desc    Like a blog post
// @route   PUT /api/blogs/:id/like
// @access  Public
export const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.likes += 1;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

// @desc    Add a comment to a blog post
// @route   POST /api/blogs/:id/comments
// @access  Public
export const addCommentToBlog = asyncHandler(async (req, res) => {
  const { author, content } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const comment = {
      author,
      content,
    };

    blog.comments.push(comment);
    const updatedBlog = await blog.save();

    // Send email notification to admin
    try {
      await sendMail({
        to: process.env.EMAIL_USER,
        subject: `New Comment on Blog: ${blog.title}`,
        text: `A new comment was posted by ${author} on your blog "${blog.title}":\n\n${content}`,
        html: `<p>A new comment was posted by <strong>${author}</strong> on your blog <strong>${blog.title}</strong>:</p><p>${content}</p>`
      });
    } catch (emailError) {
      console.error('Error sending comment notification email:', emailError);
    }

    res.status(201).json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});
