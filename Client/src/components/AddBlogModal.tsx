"use client"

import type React from "react"
import axios from "axios"
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
import { SERVER_BASE_URL } from "../api"

interface AddBlogModalProps {
  isOpen: boolean
  blog?: any
  onClose: () => void
}

export const AddBlogModal = ({ isOpen, blog, onClose }: AddBlogModalProps) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (blog) {
      setTitle(blog.title)
      setContent(blog.content)
      setImage(blog.image)
      setCategory(blog.category || "")
    } else {
      setTitle("")
      setContent("")
      setImage("")
      setCategory("")
    }
  }, [blog])

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      // Use SERVER_BASE_URL for correct backend upload URL
      const { data } = await axios.post(`${SERVER_BASE_URL}/api/upload`, formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const blogData = {
      title,
      content,
      image: image?.replace(SERVER_BASE_URL, ""),
      category,
    }

    if (blog) {
      dispatch(updateBlog({ id: blog._id, blogData }))
    } else {
      dispatch(addBlog(blogData))
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl overflow-y-auto">
        <DialogHeader className="space-y-3 sm:space-y-4 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                {blog ? "Edit Blog Post" : "Create New Blog"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                {blog ? "Update your blog post content." : "Write and publish a new blog post."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6">
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
                className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
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
                className="min-h-[150px] sm:min-h-[200px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label
                htmlFor="image-file"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <ImageIcon className="h-4 w-4 text-blue-500" />
                Featured Image
              </Label>
              <Input
                id="image-file"
                type="file"
                onChange={uploadFileHandler}
                className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm sm:text-base"
                required={!blog}
              />
              {uploading && <div className="text-sm text-blue-600 dark:text-blue-400 animate-pulse">Uploading...</div>}
              {image && (
                <div className="flex justify-center">
                  <img
                    src={image.startsWith("/uploads") ? `${SERVER_BASE_URL}${image}` : image}
                    alt="Blog"
                    className="max-h-32 sm:max-h-40 mt-2 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <span className="inline-block w-4 h-4 bg-blue-400 rounded-full" />
                Blog Category
              </Label>
              <Input
                id="category"
                placeholder="Enter blog category..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              {blog ? "Update Blog" : "Publish Blog"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
