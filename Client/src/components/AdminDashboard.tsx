import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FolderOpen,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  FileText
} from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { getProjects, deleteProject } from "@/redux/slices/projectsSlice";
import { fetchTestimonials, deleteTestimonial } from "@/redux/slices/testimonialsSlice";
import { getBlogs, deleteBlog } from "@/redux/slices/blogsSlice";
import { AddProjectModal } from "./AddProjectModal";
import { AddTestimonialModal } from "./AddTestimonialModal";
import { AddBlogModal } from "./AddBlogModal";
import { toast } from "sonner";

export const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("overview");

  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTestimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [isBlogModalOpen, setBlogModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { projects, isLoading: isLoadingProjects, isError: isErrorProjects, message: projectMessage } = useSelector((state: RootState) => state.projects);
  const { testimonials, isLoading: isLoadingTestimonials, isError: isErrorTestimonials, message: testimonialMessage } = useSelector((state: RootState) => state.testimonials);
  const { blogs, isLoading: isLoadingBlogs, isError: isErrorBlogs, message: blogMessage } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    if (isErrorProjects) {
      toast.error(projectMessage);
    }
    if (isErrorTestimonials) {
      toast.error(testimonialMessage);
    }
    if (isErrorBlogs) {
      toast.error(blogMessage);
    }

    dispatch(getProjects());
    dispatch(fetchTestimonials());
    dispatch(getBlogs());

  }, [dispatch, isErrorProjects, isErrorTestimonials, isErrorBlogs, projectMessage, testimonialMessage, blogMessage]);

  const handleOpenProjectModal = (project = null) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    setProjectModalOpen(false);
  }

  const handleOpenTestimonialModal = (testimonial = null) => {
    setSelectedTestimonial(testimonial);
    setTestimonialModalOpen(true);
  };

  const handleCloseTestimonialModal = () => {
    setSelectedTestimonial(null);
    setTestimonialModalOpen(false);
  }

  const handleOpenBlogModal = (blog = null) => {
    setSelectedBlog(blog);
    setBlogModalOpen(true);
  };

  const handleCloseBlogModal = () => {
    setSelectedBlog(null);
    setBlogModalOpen(false);
  }

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      dispatch(deleteTestimonial(id));
    }
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  const stats = {
    totalProjects: projects.length,
    totalTestimonials: testimonials.length,
    totalBlogs: blogs.length,
    totalMessages: 24, // Mock data
    totalViews: 1250, // Mock data
  };

  const recentMessages = [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Project Inquiry" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", subject: "Collaboration" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your portfolio content and monitor site activity</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Projects</CardTitle>
                <FolderOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{isLoadingProjects ? '...' : stats.totalProjects}</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Testimonials</CardTitle>
                <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">{isLoadingTestimonials ? '...' : stats.totalTestimonials}</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Messages</CardTitle>
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.totalMessages}</div>
                <p className="text-xs text-purple-600 dark:text-purple-400">+5 from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Page Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.totalViews}</div>
                <p className="text-xs text-orange-600 dark:text-orange-400">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBlogs}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      Recent Projects
                    </CardTitle>
                    <CardDescription>Your latest project updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoadingProjects ? <p>Loading...</p> : projects.slice(0, 3).map((project: any) => (
                      <div key={project._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full mt-4" variant="outline" onClick={() => setActiveTab("projects")}>
                      View All Projects
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Recent Messages
                    </CardTitle>
                    <CardDescription>Latest client inquiries</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{message.name}</h4>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{message.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{message.email}</p>
                      </div>
                    ))}
                    <Button className="w-full mt-4" variant="outline" onClick={() => setActiveTab("messages")}>
                      View All Messages
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Project Management</CardTitle>
                      <CardDescription>Add, edit, and manage your portfolio projects</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenProjectModal()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingProjects ? <p>Loading projects...</p> : (
                    <div className="space-y-4">
                      {projects.map((project: any) => (
                        <div key={project._id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleOpenProjectModal(project)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteProject(project._id)}>
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

            <TabsContent value="testimonials" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Testimonial Management</CardTitle>
                      <CardDescription>Manage client testimonials and reviews</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenTestimonialModal()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingTestimonials ? <p>Loading testimonials...</p> : (
                    <div className="space-y-4">
                      {testimonials.map((testimonial: any) => (
                        <div key={testimonial._id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleOpenTestimonialModal(testimonial)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteTestimonial(testimonial._id)}>
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

            <TabsContent value="blogs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Blogs</CardTitle>
                      <CardDescription>Manage your blog posts.</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenBlogModal()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Blog
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingBlogs ? <div>Loading...</div> : blogs.map((blog: any) => (
                    <div key={blog._id} className="flex items-center justify-between p-4 border-b">
                      <div>
                        <h3 className="font-semibold">{blog.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleOpenBlogModal(blog)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteBlog(blog._id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {isProjectModalOpen && (
        <AddProjectModal
          isOpen={isProjectModalOpen}
          onClose={handleCloseProjectModal}
          project={selectedProject}
        />
      )}

      {isTestimonialModalOpen && (
        <AddTestimonialModal
          isOpen={isTestimonialModalOpen}
          onClose={handleCloseTestimonialModal}
          testimonial={selectedTestimonial}
        />
      )}

      {isBlogModalOpen && (
        <AddBlogModal
          isOpen={isBlogModalOpen}
          onClose={handleCloseBlogModal}
          blog={selectedBlog}
        />
      )}
    </>
  );
};
