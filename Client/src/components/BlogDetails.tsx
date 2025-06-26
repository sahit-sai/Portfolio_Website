"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getBlogById, likeBlog, addComment } from "../redux/slices/blogsSlice"
import type { RootState, AppDispatch } from "../redux/store"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Eye,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  ChevronUp,
  Hash,
  Send,
} from "lucide-react"
import { Comment, Blog } from "../types"
import { SERVER_BASE_URL } from "../api"

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { currentBlog, isLoading, relatedBlogs } = useSelector((state: RootState) => state.blogs)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [commentAuthor, setCommentAuthor] = useState("")
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; title: string; level: number }>>([])

  useEffect(() => {
    if (id) {
      dispatch(getBlogById(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(progress)
      setShowScrollTop(scrollTop > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Generate table of contents from blog content
    if (currentBlog?.content) {
      const headings = currentBlog.content.match(/#{1,6}\s.+/g) || []
      const toc = headings.map((heading, index) => {
        const level = heading.match(/^#+/)?.[0].length || 1
        const title = heading.replace(/^#+\s/, "")
        return {
          id: `heading-${index}`,
          title,
          level,
        }
      })
      setTableOfContents(toc)
    }
  }, [currentBlog])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const shareUrl = window.location.href
  const shareTitle = currentBlog?.title || ""

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
      // Show toast notification
      return
    }

    window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    setShowShareMenu(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLike = () => {
    if (id) {
      dispatch(likeBlog(id))
      setLiked(!liked)
    }
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && id) {
      dispatch(
        addComment({
          blogId: id,
          commentData: { author: commentAuthor || "Anonymous", content: newComment },
        })
      )
      setNewComment("")
      setCommentAuthor("")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blog not found</h2>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/#blogs">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={liked ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {currentBlog.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
                className={bookmarked ? "text-blue-500" : ""}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
              </Button>
              <div className="relative">
                <Button variant="ghost" size="sm" onClick={() => setShowShareMenu(!showShareMenu)}>
                  <Share2 className="w-4 h-4" />
                </Button>
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[200px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Share on Twitter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Share on Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Share on LinkedIn
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare("copy")}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              {currentBlog.category && (
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {currentBlog.category}
                </Badge>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(currentBlog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentBlog.readTime || 5} min read</span>
                </div>
                {currentBlog.views && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{currentBlog.views} views</span>
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {currentBlog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {currentBlog.author || "Krishna Chavan"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer & Tech Enthusiast</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <img
                src={currentBlog.image?.startsWith("/uploads") ? `${SERVER_BASE_URL}${currentBlog.image}` : currentBlog.image}
                alt={currentBlog.title}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=800"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${item.level > 1 ? "ml-4" : ""
                            }`}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </Card>
                </div>
              </div>
            )}

            {/* Article Content */}
            <article className={`${tableOfContents.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}`}>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentBlog.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {currentBlog.tags && currentBlog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentBlog.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div id="comments" className="mt-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <MessageCircle className="w-8 h-8 mr-3 text-blue-600" />
                  Comments ({currentBlog.comments?.length || 0})
                </h3>
                <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                      <Avatar className="w-12 h-12 border-2 border-blue-500">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${commentAuthor || "Anonymous"}`} />
                        <AvatarFallback>AU</AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <Input
                          placeholder="Your name"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="mb-2 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                        />
                        <Textarea
                          placeholder="Write a thoughtful comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="mb-2 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                          rows={3}
                        />
                        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6">
                          <Send className="w-4 h-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </form>
                    <div className="space-y-6">
                      {currentBlog.comments && currentBlog.comments.length > 0 ? (
                        currentBlog.comments.map((comment) => (
                          <div key={comment._id} className="flex items-start gap-4">
                            <Avatar className="w-10 h-10 border-2 border-gray-300 dark:border-gray-600">
                              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-bold text-blue-600 dark:text-blue-400">{comment.author}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(comment.createdAt)}
                                </p>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">Be the first to comment!</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </article>
          </div>

          {/* Related Blogs */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <section className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.slice(0, 3).map((blog: Blog) => (
                  <Card key={blog._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`http://localhost:3001/uploads/blogs/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(blog.createdAt)}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                        {blog.content.substring(0, 100)}...
                      </p>
                      <Link to={`/blog/${blog._id}`}>
                        <Button variant="ghost" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                          Read More
                          <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}

export default BlogDetail
