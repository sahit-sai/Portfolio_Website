"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FolderOpen,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  FileText,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react"
import type { AppDispatch, RootState } from "@/redux/store"
import { getProjects, deleteProject } from "@/redux/slices/projectsSlice"
import { fetchTestimonials, deleteTestimonial } from "@/redux/slices/testimonialsSlice"
import { getBlogs, deleteBlog } from "@/redux/slices/blogsSlice"
import { AddProjectModal } from "./AddProjectModal"
import { AddTestimonialModal } from "./AddTestimonialModal"
import { AddBlogModal } from "./AddBlogModal"
import TimelineManager from "./TimelineManager"
import { toast } from "sonner"

export const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState("overview")

  const [isProjectModalOpen, setProjectModalOpen] = useState(false)
  const [isTestimonialModalOpen, setTestimonialModalOpen] = useState(false)
  const [isBlogModalOpen, setBlogModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)

  const {
    projects,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    message: projectMessage,
  } = useSelector((state: RootState) => state.projects)
  const {
    testimonials,
    isLoading: isLoadingTestimonials,
    isError: isErrorTestimonials,
    message: testimonialMessage,
  } = useSelector((state: RootState) => state.testimonials)
  const {
    blogs,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    message: blogMessage,
  } = useSelector((state: RootState) => state.blogs)

  useEffect(() => {
    dispatch(getProjects())
    dispatch(fetchTestimonials())
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    if (isErrorProjects) {
      toast.error(`Projects Error: ${projectMessage}`)
    }
  }, [isErrorProjects, projectMessage])

  useEffect(() => {
    if (isErrorTestimonials) {
      toast.error(`Testimonials Error: ${testimonialMessage}`)
    }
  }, [isErrorTestimonials, testimonialMessage])

  useEffect(() => {
    if (isErrorBlogs) {
      toast.error(`Blogs Error: ${blogMessage}`)
    }
  }, [isErrorBlogs, blogMessage])

  const handleOpenProjectModal = (project = null) => {
    setSelectedProject(project)
    setProjectModalOpen(true)
  }

  const handleCloseProjectModal = () => {
    setSelectedProject(null)
    setProjectModalOpen(false)
  }

  const handleOpenTestimonialModal = (testimonial = null) => {
    setSelectedTestimonial(testimonial)
    setTestimonialModalOpen(true)
  }

  const handleCloseTestimonialModal = () => {
    setSelectedTestimonial(null)
    setTestimonialModalOpen(false)
  }

  const handleOpenBlogModal = (blog = null) => {
    setSelectedBlog(blog)
    setBlogModalOpen(true)
  }

  const handleCloseBlogModal = () => {
    setSelectedBlog(null)
    setBlogModalOpen(false)
  }

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id))
    }
  }

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      dispatch(deleteTestimonial(id))
    }
  }

  const handleDeleteBlog = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id))
    }
  }

  const stats = {
    totalProjects: projects.length,
    totalTestimonials: testimonials.length,
    totalBlogs: blogs.length,
    totalMessages: 24,
    totalViews: 1250,
  }

  const recentMessages = [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Project Inquiry" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", subject: "Collaboration" },
  ]

  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your portfolio content and monitor site activity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-700/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Projects</CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
                  <FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                  {isLoadingProjects ? "..." : stats.totalProjects}
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>Active projects</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:via-emerald-800/20 dark:to-emerald-700/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  Testimonials
                </CardTitle>
                <div className="p-2 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-colors duration-300">
                  <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-1">
                  {isLoadingTestimonials ? "..." : stats.totalTestimonials}
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>Client reviews</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-purple-700/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Messages</CardTitle>
                <div className="p-2 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">
                  {stats.totalMessages}
                </div>
                <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5 from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 dark:from-orange-900/30 dark:via-orange-800/20 dark:to-orange-700/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">Page Views</CardTitle>
                <div className="p-2 bg-orange-500/20 rounded-xl group-hover:bg-orange-500/30 transition-colors duration-300">
                  <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-1">{stats.totalViews}</div>
                <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>+15% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 dark:from-rose-900/30 dark:via-rose-800/20 dark:to-rose-700/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-rose-700 dark:text-rose-300">Total Blogs</CardTitle>
                <div className="p-2 bg-rose-500/20 rounded-xl group-hover:bg-rose-500/30 transition-colors duration-300">
                  <FileText className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-rose-900 dark:text-rose-100 mb-1">{stats.totalBlogs}</div>
                <div className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>Published posts</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-2 shadow-lg">
              <TabsTrigger
                value="overview"
                className="rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Testimonials
              </TabsTrigger>
              <TabsTrigger
                value="blogs"
                className="rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Blogs
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Enhanced Recent Projects */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                        <FolderOpen className="h-5 w-5 text-white" />
                      </div>
                      Recent Projects
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Your latest project updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoadingProjects ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    ) : (
                      projects.slice(0, 3).map((project: any) => (
                        <div
                          key={project._id}
                          className="group p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                {project.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {project.category}
                                </Badge>
                              </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setActiveTab("projects")}
                    >
                      View All Projects
                    </Button>
                  </CardContent>
                </Card>

                {/* Enhanced Recent Messages */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      Recent Messages
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Latest client inquiries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentMessages.map((message) => (
                      <div
                        key={message.id}
                        className="group p-4 bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-emerald-50 hover:to-teal-50 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                            {message.name}
                          </h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{message.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{message.email}</p>
                      </div>
                    ))}
                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setActiveTab("messages")}
                    >
                      View All Messages
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-8 mt-8">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Project Management
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Add, edit, and manage your portfolio projects
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => handleOpenProjectModal()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingProjects ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project: any) => (
                        <div
                          key={project._id}
                          className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:shadow-lg border border-gray-200/50 dark:border-gray-600/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              {project.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              >
                                {project.category}
                              </Badge>
                            </p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleOpenProjectModal(project)}
                              className="h-10 w-10 p-0 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-xl"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteProject(project._id)}
                              className="h-10 w-10 p-0 hover:bg-red-100 dark:hover:bg-red-900 rounded-xl text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-8 mt-8">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Testimonial Management
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage client testimonials and reviews
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => handleOpenTestimonialModal()}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingTestimonials ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testimonials.map((testimonial: any) => (
                        <div
                          key={testimonial._id}
                          className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-emerald-50 hover:to-teal-50 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:shadow-lg border border-gray-200/50 dark:border-gray-600/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              <Badge
                                variant="secondary"
                                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                              >
                                {testimonial.company}
                              </Badge>
                            </p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleOpenTestimonialModal(testimonial)}
                              className="h-10 w-10 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-xl"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteTestimonial(testimonial._id)}
                              className="h-10 w-10 p-0 hover:bg-red-100 dark:hover:bg-red-900 rounded-xl text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blogs" className="space-y-8 mt-8">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Blog Management
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage your blog posts and articles
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => handleOpenBlogModal()}
                      className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Blog
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingBlogs ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {blogs.map((blog: any) => (
                        <div
                          key={blog._id}
                          className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-rose-50 hover:to-pink-50 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:shadow-lg border border-gray-200/50 dark:border-gray-600/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
                              {blog.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">Published article</p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleOpenBlogModal(blog)}
                              className="h-10 w-10 p-0 hover:bg-rose-100 dark:hover:bg-rose-900 rounded-xl"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteBlog(blog._id)}
                              className="h-10 w-10 p-0 hover:bg-red-100 dark:hover:bg-red-900 rounded-xl text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="mt-8">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Timeline Management
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Manage your career timeline and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TimelineManager />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {isProjectModalOpen && (
        <AddProjectModal isOpen={isProjectModalOpen} onClose={handleCloseProjectModal} project={selectedProject} />
      )}

      {isTestimonialModalOpen && (
        <AddTestimonialModal
          isOpen={isTestimonialModalOpen}
          onClose={handleCloseTestimonialModal}
          testimonial={selectedTestimonial}
        />
      )}

      {isBlogModalOpen && <AddBlogModal isOpen={isBlogModalOpen} onClose={handleCloseBlogModal} blog={selectedBlog} />}
    </>
  )
}
