"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addBlog, updateBlog } from "../redux/slices/blogsSlice"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import type { AppDispatch } from "../redux/store"
import { FileText, ImageIcon, Sparkles, PenTool } from "lucide-react"
import { Label } from "./ui/label"

interface AddBlogModalProps {
  isOpen: boolean
  blog?: any
  onClose: () => void
}

export const AddBlogModal = ({ isOpen, blog, onClose }: AddBlogModalProps) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (blog) {
      setTitle(blog.title)
      setContent(blog.content)
      setImage(blog.image)
    } else {
      setTitle("")
      setContent("")
      setImage("")
    }
  }, [blog])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const blogData = { title, content, image }

    if (blog) {
      dispatch(updateBlog({ id: blog._id, blogData }))
    } else {
      dispatch(addBlog(blogData))
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                {blog ? "Edit Blog Post" : "Create New Blog"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">
                {blog ? "Update your blog post content." : "Write and publish a new blog post."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <PenTool className="h-4 w-4 text-rose-500" />
                Blog Title
              </Label>
              <Input
                id="title"
                placeholder="Enter blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-purple-500" />
                Blog Content
              </Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <ImageIcon className="h-4 w-4 text-blue-500" />
                Featured Image URL
              </Label>
              <Input
                id="image"
                placeholder="https://example.com/featured-image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {blog ? "Update Blog" : "Publish Blog"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
