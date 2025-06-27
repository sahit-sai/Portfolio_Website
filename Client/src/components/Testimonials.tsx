"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTestimonials } from "@/redux/slices/testimonialsSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Star, Quote, Sparkles } from "lucide-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
console.log("API_BASE_URL", API_BASE_URL);

// Static fallback data
const staticTestimonials = [
  {
    _id: "1",
    name: "Sarah Johnson",
    company: "Innovatech Solutions",
    quote:
      "Krishna is a brilliant developer who brought our vision to life with precision and creativity. The final product exceeded our expectations, and the entire process was seamless. A true professional!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sarahjohnson",
  },
  {
    _id: "2",
    name: "Michael Chen",
    company: "QuantumLeap AI",
    quote:
      "The level of technical expertise and dedication to our project was outstanding. Krishna tackled complex challenges with ease and delivered a robust, scalable solution. I would hire him again in a heartbeat.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=michaelchen",
  },
  {
    _id: "3",
    name: "Emily Rodriguez",
    company: "Creative Minds Agency",
    quote:
      "Working with Krishna was an absolute pleasure. He is not only a talented developer but also a great communicator. He kept us updated throughout the project and was always open to feedback.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=emilyrodriguez",
  },
  {
    _id: "4",
    name: "David Lee",
    company: "NextGen Gaming",
    quote:
      "The quality of the work delivered was exceptional. Krishna has a keen eye for detail and a deep understanding of modern web technologies. Our new platform is fast, responsive, and user-friendly.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=davidlee",
  },
]

export const Testimonials = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { testimonials, status } = useSelector((state: RootState) => state.testimonials)

  useEffect(() => {
    dispatch(fetchTestimonials())
  }, [dispatch])

  const testimonialsToDisplay = status === "failed" || testimonials.length === 0 ? staticTestimonials : testimonials

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return ""
    if (imagePath.startsWith("http")) return imagePath
    return `${API_BASE_URL}${imagePath}`
  }

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Quote className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Client Testimonials
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Don't just take my word for it - here's what my clients have to say about working with me.
            </p>
            <Sparkles className="h-5 w-5 text-purple-500" />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {status === "loading" ? (
            <div className="col-span-2 flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading testimonials...</p>
              </div>
            </div>
          ) : (
            testimonialsToDisplay.map((testimonial: any, index) => (
              <div
                key={testimonial._id}
                className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 overflow-hidden ${index % 2 === 0 ? "md:translate-y-8" : ""
                  }`}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-3xl" />

                <div className="relative p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="h-16 w-16 text-blue-500" />
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                      <div
                        key={starIndex}
                        className="relative group-hover:scale-110 transition-transform duration-300"
                        style={{ transitionDelay: `${starIndex * 50}ms` }}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-current drop-shadow-sm" />
                      </div>
                    ))}
                    <div className="ml-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full">
                      <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                        {testimonial.rating || 5}.0
                      </span>
                    </div>
                  </div>

                  {/* Quote Text */}
                  <div className="relative mb-8">
                    <div className="absolute -left-2 -top-2 text-4xl text-blue-500/30 font-serif">"</div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium italic pl-6 pr-4">
                      {testimonial.quote}
                    </p>
                    <div className="absolute -right-2 -bottom-2 text-4xl text-purple-500/30 font-serif">"</div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <img
                        src={getImageUrl(testimonial.image) || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="relative w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Trusted by {testimonialsToDisplay.length}+ satisfied clients
            </span>
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          </div>
        </div>
      </div>
    </section>
  )
}
