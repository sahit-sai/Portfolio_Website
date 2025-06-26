"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getBlogs } from "../redux/slices/blogsSlice"
import type { RootState, AppDispatch } from "../redux/store"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Calendar, Clock, ArrowRight, User, Eye, Heart, Share2, Bookmark, TrendingUp, Star, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import apiClient, { SERVER_BASE_URL } from "../api"

interface Blog {
  _id: string
  title: string
  content: string
  image: string
  author?: string
  createdAt: string
  tags?: string[]
  readTime?: number
  views?: number
  category?: string
  featured?: boolean
  likes?: number
  trending?: boolean
}

const staticBlogs: Blog[] = [
  {
    _id: 'static-1',
    title: 'The Ultimate Guide to Modern Web Development',
    content: 'Discover the latest trends and technologies in web development. This guide covers everything from frontend frameworks like React to backend solutions with Node.js. Perfect for both beginners and experienced developers looking to stay ahead of the curve.',
    image: 'data:image/webp;base64,UklGRh4BAABXRUJQVlA4IBIBAACQHgCdASraAQEBPp1OpE4lpCOiICgAsBOJaW7hd2EbQAnsA99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkN4AP7/1hgAAAAAAAAAAAAAAAAAAAAA',
    author: 'Krishna Chavan',
    createdAt: new Date().toISOString(),
    tags: ['WebDev', 'React', 'Node.js', 'JavaScript'],
    readTime: 10,
    views: 1500,
    category: 'Technology',
    featured: true,
    likes: 120,
    trending: true,
  },
  {
    _id: 'static-2',
    title: 'Mastering CSS Grid for Complex Layouts',
    content: 'Tired of fighting with floats and flexbox for complex layouts? CSS Grid is here to save the day. This tutorial will walk you through the fundamentals and advanced techniques for creating responsive and intricate designs with ease.',
    image: 'data:image/webp;base64,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',
    author: 'Krishna Chavan',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    tags: ['CSS', 'Frontend', 'Web Design'],
    readTime: 8,
    views: 800,
    category: 'Design',
    featured: false,
    likes: 75,
  },
  {
    _id: 'static-3',
    title: 'A Deep Dive into React Hooks',
    content: 'React Hooks have revolutionized how we write components. Move beyond useState and useEffect and explore the power of custom hooks, useReducer, and useContext to write cleaner, more maintainable React applications.',
    image: 'data:image/webp;base64,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',
    author: 'Krishna Chavan',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: 12,
    views: 2200,
    category: 'Programming',
    featured: false,
    likes: 250,
  },
  {
    _id: 'static-4',
    title: 'Building a RESTful API with Express and MongoDB',
    content: 'Learn how to build a robust and scalable RESTful API from scratch using Node.js, Express, and MongoDB. We will cover everything from setting up the server to authentication and deployment.',
    image: 'https://th.bing.com/th/id/OIP.mZT8AjvI0uo99HqPapYtvgHaDH?w=334&h=146&c=7&r=0&o=7&dpr=1.6&pid=1.7&rm=3',
    author: 'Krishna Chavan',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    tags: ['Node.js', 'Express', 'MongoDB', 'Backend'],
    readTime: 15,
    views: 3000,
    category: 'Backend',
    featured: false,
    likes: 300,
  }
];

const Blogs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs, isLoading, isError } = useSelector((state: RootState) => state.blogs)
  const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set())
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<Set<string>>(new Set())
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: "" });

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const toggleLike = (blogId: string) => {
    setLikedBlogs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(blogId)) {
        newSet.delete(blogId)
      } else {
        newSet.add(blogId)
      }
      return newSet
    })
  }

  const toggleBookmark = (blogId: string) => {
    setBookmarkedBlogs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(blogId)) {
        newSet.delete(blogId)
      } else {
        newSet.add(blogId)
      }
      return newSet
    })
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribeStatus({ loading: true, message: "" })

    if (!email || !/\S+@\S+\.\S+$/.test(email)) {
      setSubscribeStatus({
        loading: false,
        message: "Please enter a valid email address.",
      })
      return
    }

    try {
      const response = await apiClient.post("/subscribe", { email })
      setSubscribeStatus({ loading: false, message: response.data.message })
      setEmail("")
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      setSubscribeStatus({ loading: false, message })
    }
  }

  const blogsToRender = isError ? staticBlogs : blogs;
  const featuredBlog = blogsToRender.find((blog: Blog) => blog.featured)
  const regularBlogs = blogsToRender.filter((blog: Blog) => !blog.featured)

  const getImageUrl = (image: string) => {
    if (!image) return "/placeholder.svg";
    if (image.startsWith("/uploads")) {
      return `${SERVER_BASE_URL}${image}`;
    }
    if (image.startsWith("http")) {
      return image;
    }
    return image;
  }

  if (isLoading) {
    return (
      <section id="blogs" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Creative Blogs
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dive into a world of creativity, innovation, and cutting-edge insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <CardHeader className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blogs" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-400/10 rounded-full blur-xl animate-float-slow"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl animate-float"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Creative Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Content</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            Creative Blogs
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Dive into a world of creativity, innovation, and cutting-edge insights that will inspire your next project
          </p>
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-16">
            <Card className="relative overflow-hidden rounded-3xl border-0 shadow-2xl group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={getImageUrl(featuredBlog.image)}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Featured Badge */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-4 py-2 text-sm font-bold">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30"
                    onClick={() => toggleLike(featuredBlog._id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${likedBlogs.has(featuredBlog._id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30"
                    onClick={() => toggleBookmark(featuredBlog._id)}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarkedBlogs.has(featuredBlog._id) ? "fill-blue-500 text-blue-500" : ""}`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-blue-500/20 backdrop-blur-sm text-blue-200 border-blue-400/30">
                      {featuredBlog.category}
                    </Badge>
                    {featuredBlog.trending && (
                      <Badge className="bg-red-500/20 backdrop-blur-sm text-red-200 border-red-400/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{featuredBlog.title}</h3>

                  <p className="text-gray-200 text-lg mb-6 line-clamp-2">{featuredBlog.content.substring(0, 200)}...</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-gray-300">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredBlog.author || "Krishna Chavan"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredBlog.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredBlog.readTime || calculateReadTime(featuredBlog.content)} min</span>
                      </div>
                    </div>

                    <Link to={`/blogs/${featuredBlog._id}`} className="inline-flex items-center font-semibold text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                      Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Blogs Grid */}
        {regularBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <Eye className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">No blogs found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category or check back later for new content.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((blog: Blog) => (
              <Card
                key={blog._id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={getImageUrl(blog.image)}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=400"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {blog.category && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                      {blog.category}
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{blog.readTime || calculateReadTime(blog.content)} min</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {blog.content.substring(0, 150)}...
                  </p>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <User size={14} className="text-white" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {blog.author || "Krishna Chavan"}
                      </span>
                    </div>
                    <Link to={`/blogs/${blog._id}`} className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {blogs.length > 0 && (
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Ready for More Amazing Content?</h3>
                <p className="text-xl mb-8 opacity-90">
                  Subscribe to get the latest blogs, tutorials, and insights delivered to your inbox
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribeStatus.loading}
                    className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
                  />
                  <Button type="submit" disabled={subscribeStatus.loading} className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold whitespace-nowrap disabled:opacity-50">
                    {subscribeStatus.loading ? "Subscribing..." : "Subscribe Now"}
                  </Button>
                </form>
                {subscribeStatus.message && (
                  <p className={`mt-4 text-sm ${subscribeStatus.message.includes("successful") ? "text-green-300" : "text-red-300"}`}>
                    {subscribeStatus.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Blogs
