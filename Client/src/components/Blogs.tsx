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

const Blogs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs, isLoading, isError } = useSelector((state: RootState) => state.blogs)
  const [activeFilter, setActiveFilter] = useState("all")
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
    e.preventDefault();
    setSubscribeStatus({ loading: true, message: "" });

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribeStatus({
        loading: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubscribeStatus({ loading: false, message: data.message });
      setEmail("");
    } catch (error: any) {
      setSubscribeStatus({ loading: false, message: error.message });
    }
  };

  const categories = ["all", "web development", "react", "javascript", "tutorial", "tips"]
  const filteredBlogs =
    activeFilter === "all" ? blogs : blogs.filter((blog: Blog) => blog.category?.toLowerCase() === activeFilter)

  const featuredBlog = blogs.find((blog: Blog) => blog.featured)
  const regularBlogs = blogs.filter((blog: Blog) => !blog.featured)

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

  if (isError) {
    return (
      <section id="blogs" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Oops! Something went wrong</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't load the amazing content. Let's try again!
            </p>
            <Button
              onClick={() => dispatch(getBlogs())}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full"
            >
              <Zap className="w-4 h-4 mr-2" />
              Reload Blogs
            </Button>
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

          Category Filter
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-6 py-3 transition-all duration-300 ${activeFilter === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "hover:scale-105 hover:shadow-md"
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-16">
            <Card className="relative overflow-hidden rounded-3xl border-0 shadow-2xl group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={`http://localhost:3001/uploads/blogs/${featuredBlog.image}`}
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

                    <Link to={`/blogs/${featuredBlog._id}`} className="absolute inset-0 z-10">
                      <span className="sr-only">View blog</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Blogs Grid */}
        {filteredBlogs.length === 0 ? (
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
                    src={`http://localhost:3001/uploads/blogs/${blog.image}`}
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
                    <Link to={`/blogs/${blog._id}`} className="absolute inset-0 z-10">
                      <span className="sr-only">View blog</span>
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
