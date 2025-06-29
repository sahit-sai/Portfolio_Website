"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addProject, updateProject } from "@/redux/slices/projectsSlice"
import type { AppDispatch } from "@/redux/store"
import { toast } from "sonner"
import { FolderOpen, ImageIcon, Link, Github, Tag, Sparkles } from "lucide-react"

export const AddProjectModal = ({ isOpen, onClose, project }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [technologies, setTechnologies] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    if (project) {
      setTitle(project.title)
      setDescription(project.description)
      setCategory(project.category)
      setLiveUrl(project.liveUrl)
      setGithubUrl(project.githubUrl)
      setTechnologies(project.tags ? project.tags.join(", ") : "")
      setImage(project.image)
    } else {
      setTitle("")
      setDescription("")
      setCategory("")
      setLiveUrl("")
      setGithubUrl("")
      setTechnologies("")
      setImage("")
    }
  }, [project])

  const handleSubmit = (e) => {
    e.preventDefault()
    const projectData = {
      title,
      description,
      category,
      liveUrl,
      githubUrl,
      technologies,
      image,
    }

    if (project) {
      dispatch(updateProject({ id: project._id, projectData }))
      toast.success("Project updated successfully!")
    } else {
      dispatch(addProject(projectData))
      toast.success("Project added successfully!")
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl overflow-y-auto">
        <DialogHeader className="space-y-3 sm:space-y-4 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                {project ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                {project ? "Update the details of your project." : "Add a new project to your portfolio."}
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
                <Sparkles className="h-4 w-4 text-blue-500" />
                Project Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter project title..."
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px] sm:min-h-[100px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                placeholder="Describe your project..."
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <ImageIcon className="h-4 w-4 text-purple-500" />
                Image URL
              </Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-emerald-500" />
                Category
              </Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 sm:px-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX">UI/UX</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="liveUrl"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Link className="h-4 w-4 text-blue-500" />
                  Live URL
                </Label>
                <Input
                  id="liveUrl"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="https://project-demo.com"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="githubUrl"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  GitHub URL
                </Label>
                <Input
                  id="githubUrl"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <Label htmlFor="technologies" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Technologies
              </Label>
              <Input
                id="technologies"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="React, Node.js, MongoDB (comma separated)"
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
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              {project ? "Update Project" : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
