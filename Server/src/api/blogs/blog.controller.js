import Blog from "./blog.model.js";
import asyncHandler from "express-async-handler";

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
  const blog = await Blog.findById(req.params.id);

  if (blog) {
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
  const { title, content, author, tags } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Image is required");
  }

  const imageUrl = `/uploads/blogs/${req.file.filename}`;

  const blog = new Blog({
    title,
    content,
    author,
    imageUrl,
    tags,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, author, tags } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.tags = tags || blog.tags;

    if (req.file) {
      blog.imageUrl = `/uploads/blogs/${req.file.filename}`;
    }

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
